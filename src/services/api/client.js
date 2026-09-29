export const USE_MOCK = import.meta.env.VITE_USE_MOCK_API === 'true' || import.meta.env.VITE_USE_MOCK_API === undefined;
export const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

/**
 * Enhanced fetchApi with automatic retries and timeout boundaries.
 */
export async function fetchApi(endpoint, options = {}, retries = 3, backoff = 300) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), options.timeout || 8000);
  
  // Merge external signal if provided
  if (options.signal) {
    options.signal.addEventListener('abort', () => controller.abort());
  }

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, { 
      ...options,
      signal: controller.signal 
    });

    if (!res.ok) {
      if (res.status >= 500 && retries > 0) {
        throw new Error(`Server error: ${res.status}`);
      }
      throw new Error(`API Fetch failed: ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new DOMException("Request timed out or was aborted", "AbortError");
    }
    if (retries > 0 && error.name !== 'AbortError') {
      await new Promise(resolve => setTimeout(resolve, backoff));
      return fetchApi(endpoint, options, retries - 1, backoff * 2);
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}
