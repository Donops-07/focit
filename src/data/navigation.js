/**
 * Navigation data structure for the FOCITSA Faculty Website.
 *
 * This is the single source of truth for all navigation links.
 * The Navbar component consumes this array to render top-level items
 * and department dropdown menus.
 *
 * Structure:
 * - label: Display text for the nav link
 * - path: React Router path (absolute)
 * - children: Optional array of sub-links (renders as dropdown)
 */

export const DEPARTMENTS = [
  {
    name: "Computer Science",
    slug: "computer-science",
    shortName: "CSC",
  },
  {
    name: "Cyber Security",
    slug: "cyber-security",
    shortName: "CYB",
  },
  {
    name: "Software Engineering",
    slug: "software-engineering",
    shortName: "SEN",
  },
  {
    name: "Information Systems",
    slug: "information-systems",
    shortName: "INS",
  },
  {
    name: "Information Technology",
    slug: "information-technology",
    shortName: "INT",
  },
  {
    name: "Data Science",
    slug: "data-science",
    shortName: "DSC",
  },
  {
    name: "Library and Information Science",
    slug: "library-and-information-science",
    shortName: "LIS",
  },
];

export const NAV_LINKS = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Explore",
    path: "/explore",
  },
  {
    label: "About",
    path: "/about",
  },
  {
    label: "Departments",
    path: "/departments",
    children: DEPARTMENTS.map((dept) => ({
      label: dept.name,
      path: `/departments/${dept.slug}`,
    })),
  },
  {
    label: "Research",
    path: "/research",
  },
  {
    label: "Projects",
    path: "/projects",
  },
  {
    label: "News & Events",
    path: "/news",
  },
  {
    label: "Student Union",
    path: "/focitsa",
  },
  {
    label: "Student Affairs",
    path: "/student-affairs",
  },
  {
    label: "Alumni",
    path: "/alumni",
  },
  {
    label: "Admissions",
    path: "/admissions",
  },
];

/**
 * Footer link groups — organized by section.
 */
export const FOOTER_LINKS = [
  {
    heading: "Quick Links",
    links: [
      { label: "Home", path: "/" },
      { label: "About the Faculty", path: "/about" },
      { label: "Admissions", path: "/admissions" },
      { label: "News & Events", path: "/news" },
    ],
  },
  {
    heading: "Academics",
    links: [
      { label: "Research Repository", path: "/research" },
      { label: "Student Projects", path: "/projects" },
      { label: "Student Union (FOCITSA)", path: "/focitsa" },
      { label: "Alumni Network", path: "/alumni" },
    ],
  },
  {
    heading: "Departments",
    links: DEPARTMENTS.slice(0, 4).map((dept) => ({
      label: dept.name,
      path: `/departments/${dept.slug}`,
    })),
  },
];

/**
 * Social media links for the footer.
 */
export const SOCIAL_LINKS = [
  {
    label: "Twitter",
    url: "https://twitter.com/unaborofficial",
    icon: "twitter",
  },
  {
    label: "Facebook",
    url: "https://facebook.com",
    icon: "facebook",
  },
  {
    label: "LinkedIn",
    url: "https://linkedin.com",
    icon: "linkedin",
  },
  {
    label: "Instagram",
    url: "https://instagram.com",
    icon: "instagram",
  },
];

/**
 * Faculty metadata — used across the site header, footer, and SEO tags.
 */
export const FACULTY_INFO = {
  name: "Faculty of Computing and Information Technology",
  shortName: "FOCITSA",
  university: "Osun State University",
  universityShort: "UNIOSUN",
  address: "Osogbo, Osun State, Nigeria",
  email: "focit@uniosun.edu.ng",
  phone: "+234 800 000 0000",
  website: "https://focit.uniosun.edu.ng",
};
