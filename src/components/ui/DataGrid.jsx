import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, ChevronLeft, ChevronRight, SlidersHorizontal, X } from "lucide-react";
import { cn } from "../../lib/utils";

/**
 * A highly reusable, data-agnostic grid component with built-in
 * filtering, debounced search, pagination, and responsive layout swapping.
 *
 * @param {Array} data - The array of data items to render for the current page
 * @param {Object} meta - Laravel-style pagination metadata (current_page, last_page, per_page, total)
 * @param {Array} columns - Column definition array: { key, label, render(item), className? }
 * @param {Array} filters - Filter definition array: { key, label, type, options? }
 * @param {boolean} isLoading - Whether data is currently fetching
 */
export default function DataGrid({ data = [], meta, columns = [], filters = [], isLoading = false, error = null }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Local state for debounced search to avoid history bloat
  const [localSearch, setLocalSearch] = useState(searchParams.get("search") || "");

  // Debounce the text search input and sync to URL
  useEffect(() => {
    const handler = setTimeout(() => {
      const currentSearch = searchParams.get("search") || "";
      if (localSearch !== currentSearch) {
        setSearchParams(
          (prev) => {
            const newParams = new URLSearchParams(prev);
            if (localSearch.trim()) {
              newParams.set("search", localSearch.trim());
            } else {
              newParams.delete("search");
            }
            // CRITICAL: Any filter change must reset page to 1
            newParams.set("page", "1");
            return newParams;
          },
          { replace: true } // Avoid history bloat
        );
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [localSearch, searchParams, setSearchParams]);

  // Sync external URL changes (e.g., back button) back to local state
  useEffect(() => {
    setLocalSearch(searchParams.get("search") || "");
  }, [searchParams.get("search")]);

  // Handle select filter changes
  const handleFilterChange = (key, value) => {
    setSearchParams(
      (prev) => {
        const newParams = new URLSearchParams(prev);
        if (value) {
          newParams.set(key, value);
        } else {
          newParams.delete(key);
        }
        // CRITICAL: Any filter change must reset page to 1
        newParams.set("page", "1");
        return newParams;
      },
      { replace: true }
    );
  };

  const handleClearFilters = () => {
    setLocalSearch("");
    setSearchParams(new URLSearchParams(), { replace: true });
  };

  const handlePageChange = (newPage) => {
    if (!meta || newPage < 1 || newPage > meta.last_page) return;
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("page", newPage.toString());
      return newParams;
    });
    // Scroll to top of grid when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const activeFilterCount = Array.from(searchParams.keys()).filter((k) => k !== "page").length;

  return (
    <div className="data-grid">
      {/* FILTER BAR */}
      <div className="data-grid__toolbar">
        <div className="data-grid__search">
          <Search size={18} className="data-grid__search-icon" />
          <input
            type="text"
            placeholder="Search by keywords, titles, names..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="data-grid__search-input"
          />
        </div>

        {/* Filter Toggle */}
        {filters.length > 0 && (
          <button
            className="btn btn-outline data-grid__filter-btn"
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          >
            <SlidersHorizontal size={16} />
            Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          </button>
        )}

        {/* Filters Overlay */}
        {filters.length > 0 && (
          <div
            className={cn(
              "data-grid__filters",
              isFiltersOpen && "data-grid__filters--open"
            )}
          >
            <div className="data-grid__filters-header">
              <span className="font-semibold">Filters</span>
              <button onClick={() => setIsFiltersOpen(false)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="data-grid__filters-list">
              {filters.map((filter) => {
                if (filter.type === "select") {
                  return (
                    <div key={filter.key} className="data-grid__filter-group">
                      <label htmlFor={`filter-${filter.key}`} className="sr-only">
                        {filter.label}
                      </label>
                      <select
                        id={`filter-${filter.key}`}
                        value={searchParams.get(filter.key) || ""}
                        onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                        className="data-grid__filter-select"
                      >
                        <option value="">All {filter.label}s</option>
                        {filter.options.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                }
                return null;
              })}
              
              {activeFilterCount > 0 && (
                <button
                  className="data-grid__clear-filters"
                  onClick={handleClearFilters}
                >
                  Clear All
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* DATA AREA */}
      <div className="data-grid__content">
        {error ? (
          <div className="data-grid__empty border-red-200 bg-red-50 text-red-800">
            <h3 className="data-grid__empty-title text-red-900">Something went wrong</h3>
            <p className="data-grid__empty-desc text-red-700">
              {error.message || "An unexpected error occurred while loading the data."}
            </p>
            <button
              className="btn btn-primary mt-4 bg-red-600 hover:bg-red-700 border-red-600"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        ) : isLoading ? (
          <div className="data-grid__loading">
            <div className="data-grid__spinner" />
            <p>Loading data...</p>
          </div>
        ) : data.length === 0 ? (
          <div className="data-grid__empty">
            <Search size={48} className="data-grid__empty-icon" />
            <h3 className="data-grid__empty-title">No results found</h3>
            <p className="data-grid__empty-desc">
              We couldn't find anything matching your current filters. Try adjusting your search or clearing filters.
            </p>
            {activeFilterCount > 0 && (
              <button
                className="btn btn-primary mt-4"
                onClick={handleClearFilters}
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <>
            {/* DESKTOP TABLE (hidden on mobile) */}
            <div className="data-grid__table-wrapper hidden lg:block">
              <table className="data-grid__table">
                <thead>
                  <tr>
                    {columns.map((col) => (
                      <th key={col.key} className={cn("data-grid__th", col.className)}>
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={item.id || index} className="data-grid__tr">
                      {columns.map((col) => (
                        <td key={col.key} className={cn("data-grid__td", col.className)}>
                          {col.render(item)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* MOBILE CARDS (hidden on desktop) */}
            <div className="data-grid__cards lg:hidden">
              {data.map((item, index) => (
                <div key={item.id || index} className="data-grid__card">
                  {columns.map((col) => (
                    <div key={col.key} className={cn("data-grid__card-row", col.className)}>
                      <span className="data-grid__card-label">{col.label}</span>
                      <div className="data-grid__card-value">{col.render(item)}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* PAGINATION CONTROLS */}
      {meta && meta.last_page > 1 && !isLoading && data.length > 0 && (
        <div className="data-grid__pagination">
          <div className="data-grid__pagination-info">
            Showing {((meta.current_page - 1) * meta.per_page) + 1} to {Math.min(meta.current_page * meta.per_page, meta.total)} of {meta.total} results
          </div>
          <div className="data-grid__pagination-controls">
            <button
              className="data-grid__page-btn"
              onClick={() => handlePageChange(meta.current_page - 1)}
              disabled={meta.current_page <= 1}
              aria-label="Previous page"
            >
              <ChevronLeft size={16} />
              <span>Prev</span>
            </button>
            <div className="data-grid__page-numbers">
              <span className="data-grid__page-current">Page {meta.current_page}</span>
              <span className="data-grid__page-total">of {meta.last_page}</span>
            </div>
            <button
              className="data-grid__page-btn"
              onClick={() => handlePageChange(meta.current_page + 1)}
              disabled={meta.current_page >= meta.last_page}
              aria-label="Next page"
            >
              <span>Next</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
