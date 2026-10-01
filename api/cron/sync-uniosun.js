export const config = {
  // Configured to run every hour via Vercel Cron
  runtime: 'edge', 
};

/**
 * CRON JOB: Legacy System Data Synchronization
 * 
 * ARCHITECTURE:
 * Instead of forcing the client or the edge rendering path to wait for the slow 
 * 6-second legacy UNIOSUN REST endpoint, this cron job runs asynchronously in the background.
 * It fetches the bloated data, sanitizes it, and writes a highly optimized JSON payload 
 * directly into our fast Edge KV store (Redis). 
 * 
 * The client then reads from Redis in <10ms, completely decoupled from the legacy system's latency.
 */
export default async function handler(req) {
  try {
    // 1. Fetch from the slow legacy monolithic system
    const startTime = Date.now();
    const legacyResponse = await fetch('https://uniosun.edu.ng/api/v1/news/legacy-endpoint', {
      // Enforce a hard timeout so it doesn't hang our worker indefinitely
      signal: AbortSignal.timeout(10000) 
    });

    if (!legacyResponse.ok) {
      throw new Error(`Legacy API responded with status: ${legacyResponse.status}`);
    }

    const rawData = await legacyResponse.json();
    
    // 2. Data Sanitization & Normalization
    // The legacy system returns a massive unpaginated array of 5,000 articles.
    // We only need the latest 5 for the FOCITSA homepage ticker/feed.
    const optimizedPayload = rawData
      .slice(0, 5)
      .map(article => ({
        id: article.ArticleID,
        title: article.HeadingText.trim(),
        // Strip out legacy HTML tags that might cause XSS or layout breaks
        summary: article.BodyHtml.replace(/<[^>]*>?/gm, '').substring(0, 120) + '...',
        url: `https://uniosun.edu.ng/news/${article.Slug}`,
        date: new Date(article.PublishDate).toISOString()
      }));

    // 3. Write to our Fast Edge Store (Upstash Redis)
    // The client will hit this Redis key instead of the legacy endpoint.
    const redisResponse = await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/set/uniosun_latest_news`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(optimizedPayload)
    });

    if (!redisResponse.ok) {
      throw new Error('Failed to write to Redis KV store');
    }

    // 4. (Optional) Invalidate the CDN Cache
    // If the site is statically generated, fire a webhook to purge the cache
    // await fetch('https://focit-rouge.vercel.app/api/revalidate?tag=news-feed', { method: 'POST' });

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Legacy sync complete', 
      executionTimeMs: Date.now() - startTime 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    // We log the failure silently. The client simply continues serving the last 
    // successful cache from Redis. TTI is entirely protected.
    console.error('[CRON_SYNC_ERROR] Failed to synchronize legacy data:', error.message);
    
    return new Response(JSON.stringify({ success: false, error: error.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
