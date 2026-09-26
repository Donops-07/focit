import { Outlet, useNavigation, ScrollRestoration } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Tutorial from "../ui/Tutorial";
import { cn } from "../../lib/utils";

/**
 * Layout — The root layout wrapper for the entire application.
 * Contains the Navbar, page content (via Outlet), and Footer.
 * Shows a loading indicator when React Router loaders are pending.
 */
export default function Layout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="site-wrapper">
      <ScrollRestoration />
      <Tutorial />
      <Navbar />

      {/* Loading bar — visible during route transitions */}
      <div
        className={cn(
          "route-loading-bar",
          isLoading && "route-loading-bar--active"
        )}
        aria-hidden="true"
      />

      <main className="site-main">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
