import { Link, useRouteError, isRouteErrorResponse } from "react-router-dom";
import { Home, ArrowLeft, AlertTriangle, SearchX } from "lucide-react";

/**
 * NotFoundPage — renders when a loader throws a 404 Response
 * or when the splat route catches an undefined URL.
 */
export function NotFoundPage() {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <SearchX size={80} strokeWidth={1} className="not-found-icon" />
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Page Not Found</h2>
        <p className="not-found-description">
          The page you're looking for doesn't exist or has been moved.
          This could be an invalid department, a broken link, or a mistyped URL.
        </p>
        <div className="not-found-actions">
          <Link to="/" className="btn btn-primary">
            <Home size={18} />
            Back to Home
          </Link>
          <Link to="/departments" className="btn btn-outline">
            <ArrowLeft size={18} />
            View Departments
          </Link>
        </div>
      </div>
    </div>
  );
}

/**
 * RootErrorBoundary — catches any unhandled error at the router root.
 * Handles both Response errors (like 404s) and unexpected JS errors.
 */
export function RootErrorBoundary() {
  const error = useRouteError();

  // If it's a route error response (e.g., our 404 throw), show NotFoundPage
  if (isRouteErrorResponse(error) && error.status === 404) {
    return <NotFoundPage />;
  }

  // For unexpected errors, show a generic error UI
  return (
    <div className="error-page">
      <div className="error-content">
        <AlertTriangle size={80} strokeWidth={1} className="error-icon" />
        <h1 className="error-title">Something Went Wrong</h1>
        <p className="error-description">
          An unexpected error occurred. Please try refreshing the page
          or navigating back to the homepage.
        </p>
        {import.meta.env.DEV && error?.message && (
          <pre className="error-debug">
            <code>{error.message}</code>
            {error.stack && <code>{"\n\n"}{error.stack}</code>}
          </pre>
        )}
        <div className="error-actions">
          <Link to="/" className="btn btn-primary">
            <Home size={18} />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
