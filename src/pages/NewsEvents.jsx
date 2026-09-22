import { useLoaderData, useSearchParams, Link } from "react-router-dom";
import { Calendar, Clock, MapPin, User, ArrowRight } from "lucide-react";
import { getNewsAndEvents } from "../services/api";
import { cn } from "../lib/utils";

// --- LOADER ---

export async function newsEventsLoader({ request }) {
  const url = new URL(request.url);
  const type = url.searchParams.get("type") || "all";
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  
  const result = await getNewsAndEvents({ type, page, limit: 12 }, { signal: request.signal });
  return { ...result, filters: { type, page } };
}

// --- SUB-COMPONENTS (STRATEGY PATTERN) ---

function NewsMetadata({ metadata }) {
  return (
    <div className="flex items-center text-sm text-slate-500 mt-4 space-x-4">
      <div className="flex items-center space-x-1">
        <User className="h-4 w-4" />
        <span>{metadata.author}</span>
      </div>
      <div className="flex items-center space-x-1">
        <Clock className="h-4 w-4" />
        <span>{metadata.readTimeMins} min read</span>
      </div>
    </div>
  );
}

function EventMetadata({ metadata }) {
  const startDate = new Date(metadata.startTime);
  const endDate = new Date(metadata.endTime);
  
  return (
    <div className="mt-4 space-y-2">
      <div className="flex items-center text-sm text-slate-700">
        <Calendar className="h-4 w-4 mr-2 text-indigo-600" />
        <span>
          {startDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - {endDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </span>
      </div>
      <div className="flex items-center text-sm text-slate-700">
        <MapPin className="h-4 w-4 mr-2 text-indigo-600" />
        <span>{metadata.venue}</span>
      </div>
      {metadata.registrationLink && (
        <a 
          href={metadata.registrationLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full"
        >
          Register Now
          <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      )}
    </div>
  );
}

// --- POLYMORPHIC WRAPPER ---

function FeedCard({ item }) {
  const isEvent = item.type === "event";
  
  return (
    <div className="flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-48 w-full">
        <img 
          src={item.coverImage} 
          alt={item.title} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4">
          <span className={cn(
            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
            isEvent ? "bg-amber-100 text-amber-800" : "bg-indigo-100 text-indigo-800"
          )}>
            {isEvent ? "Event" : "News"}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        {/* Relational Tags stitched by api.js */}
        <div className="flex flex-wrap gap-2 mb-3">
          {item.tags.map((tag) => (
            <Link
              key={tag.slug}
              to={`/departments/${tag.slug}`}
              className={cn(
                "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium hover:underline border border-slate-200 text-slate-700 bg-slate-50"
              )}
            >
              {tag.name}
            </Link>
          ))}
        </div>
        
        <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight">
          {item.title}
        </h3>
        
        <p className="text-slate-600 text-sm mb-4 flex-grow">
          {item.summary}
        </p>
        
        <div className="pt-4 border-t border-slate-100 mt-auto">
          {isEvent ? (
            <EventMetadata metadata={item.metadata} />
          ) : (
            <NewsMetadata metadata={item.metadata} />
          )}
        </div>
      </div>
    </div>
  );
}

// --- MAIN PAGE ---

export default function NewsEvents() {
  const { data, meta, filters } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const handleTypeChange = (e) => {
    setSearchParams(prev => {
      if (e.target.value === "all") {
        prev.delete("type");
      } else {
        prev.set("type", e.target.value);
      }
      prev.set("page", "1"); // Reset pagination
      return prev;
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-10 md:flex md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
              News & Events
            </h1>
            <p className="mt-2 text-lg text-slate-600">
              Stay up to date with the latest from the Faculty of Computing & Information Technology.
            </p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <select
              value={filters.type}
              onChange={handleTypeChange}
              className="block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="all">All Updates</option>
              <option value="news">News Only</option>
              <option value="event">Events Only</option>
            </select>
          </div>
        </div>

        {data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((item) => (
              <FeedCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl border border-slate-200">
            <h3 className="text-lg font-medium text-slate-900">No items found</h3>
            <p className="mt-1 text-slate-500">Try adjusting your filters.</p>
          </div>
        )}

        {meta.last_page > 1 && (
          <div className="mt-12 flex justify-center space-x-2">
            {Array.from({ length: meta.last_page }).map((_, i) => (
              <button
                key={i}
                onClick={() => setSearchParams(prev => { prev.set("page", String(i + 1)); return prev; })}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-md",
                  meta.current_page === i + 1
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50"
                )}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
