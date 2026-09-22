import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  GraduationCap,
} from "lucide-react";
import { NAV_LINKS, FACULTY_INFO } from "../../data/navigation";
import { cn } from "../../lib/utils";

/**
 * Navbar — Responsive navigation with department dropdown.
 * Mirrors UNIOSUN aesthetic: utility bar on top, main nav below.
 */
export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  // Close mobile nav and dropdowns on route change
  useEffect(() => {
    setIsMobileOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  // Track scroll for navbar background effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(e.target) &&
        !e.target.closest(".mobile-drawer")
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const toggleDropdown = (label) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  return (
    <header className={cn("site-header", isScrolled && "site-header--scrolled")}>
      {/* Utility Bar */}
      <div className="utility-bar">
        <div className="utility-bar__inner">
          <div className="utility-bar__contact">
            <a href={`mailto:${FACULTY_INFO.email}`} className="utility-link">
              <Mail size={14} />
              <span>{FACULTY_INFO.email}</span>
            </a>
            <a href={`tel:${FACULTY_INFO.phone}`} className="utility-link">
              <Phone size={14} />
              <span>{FACULTY_INFO.phone}</span>
            </a>
            <span className="utility-link utility-link--static">
              <MapPin size={14} />
              <span>{FACULTY_INFO.address}</span>
            </span>
          </div>
          <div className="utility-bar__actions">
            <a
              href="https://uniosun.edu.ng"
              target="_blank"
              rel="noopener noreferrer"
              className="utility-link"
            >
              <GraduationCap size={14} />
              <span>UNIOSUN Main Site</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="main-nav" ref={dropdownRef}>
        <div className="main-nav__inner">
          {/* Logo / Brand */}
          <Link to="/" className="nav-brand">
            <div className="nav-brand__icon overflow-hidden flex items-center justify-center bg-transparent">
              <img src="/faculty-logo.jpg" alt="FOCITSA Logo" className="w-full h-full object-contain" />
            </div>
            <div className="nav-brand__text">
              <span className="nav-brand__name">{FACULTY_INFO.shortName}</span>
              <span className="nav-brand__sub">{FACULTY_INFO.university}</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="nav-links">
            {NAV_LINKS.map((item) => (
              <li
                key={item.label}
                className={cn(
                  "nav-links__item",
                  item.children && "nav-links__item--has-dropdown"
                )}
              >
                {item.children ? (
                  <>
                    <button
                      className={cn(
                        "nav-links__trigger",
                        openDropdown === item.label && "nav-links__trigger--active"
                      )}
                      onClick={() => toggleDropdown(item.label)}
                      aria-expanded={openDropdown === item.label}
                      aria-haspopup="true"
                    >
                      {item.label}
                      <ChevronDown
                        size={16}
                        className={cn(
                          "nav-links__chevron",
                          openDropdown === item.label && "nav-links__chevron--open"
                        )}
                      />
                    </button>
                    <ul
                      className={cn(
                        "nav-dropdown",
                        openDropdown === item.label && "nav-dropdown--open"
                      )}
                    >
                      {item.children.map((child) => (
                        <li key={child.path}>
                          <NavLink
                            to={child.path}
                            className={({ isActive }) =>
                              cn(
                                "nav-dropdown__link",
                                isActive && "nav-dropdown__link--active"
                              )
                            }
                          >
                            {child.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      cn(
                        "nav-links__link",
                        isActive && "nav-links__link--active"
                      )
                    }
                    end={item.path === "/"}
                  >
                    {item.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="mobile-toggle"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileOpen}
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div
        className={cn("mobile-overlay", isMobileOpen && "mobile-overlay--open")}
        onClick={() => setIsMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Drawer */}
      <aside
        className={cn("mobile-drawer", isMobileOpen && "mobile-drawer--open")}
        aria-label="Mobile navigation"
      >
        <div className="mobile-drawer__header">
          <Link
            to="/"
            className="nav-brand"
            onClick={() => setIsMobileOpen(false)}
          >
            <div className="nav-brand__icon overflow-hidden flex items-center justify-center bg-transparent">
              <img src="/faculty-logo.jpg" alt="FOCITSA Logo" className="w-full h-full object-contain" />
            </div>
            <div className="nav-brand__text">
              <span className="nav-brand__name">{FACULTY_INFO.shortName}</span>
              <span className="nav-brand__sub">{FACULTY_INFO.university}</span>
            </div>
          </Link>
          <button
            className="mobile-toggle"
            onClick={() => setIsMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="mobile-drawer__nav">
          <ul className="mobile-nav-list">
            {NAV_LINKS.map((item) => (
              <li key={item.label} className="mobile-nav-list__item">
                {item.children ? (
                  <>
                    <button
                      className={cn(
                        "mobile-nav-list__trigger",
                        openDropdown === item.label &&
                          "mobile-nav-list__trigger--active"
                      )}
                      onClick={() => toggleDropdown(item.label)}
                      aria-expanded={openDropdown === item.label}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        size={18}
                        className={cn(
                          "mobile-nav-list__chevron",
                          openDropdown === item.label &&
                            "mobile-nav-list__chevron--open"
                        )}
                      />
                    </button>
                    <ul
                      className={cn(
                        "mobile-nav-list__dropdown",
                        openDropdown === item.label &&
                          "mobile-nav-list__dropdown--open"
                      )}
                    >
                      {item.children.map((child) => (
                        <li key={child.path}>
                          <NavLink
                            to={child.path}
                            className={({ isActive }) =>
                              cn(
                                "mobile-nav-list__link",
                                isActive && "mobile-nav-list__link--active"
                              )
                            }
                            onClick={() => setIsMobileOpen(false)}
                          >
                            {child.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      cn(
                        "mobile-nav-list__link",
                        isActive && "mobile-nav-list__link--active"
                      )
                    }
                    end={item.path === "/"}
                    onClick={() => setIsMobileOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </header>
  );
}
