import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { RootErrorBoundary, NotFoundPage } from "./pages/ErrorPages";
import DepartmentTemplate, { departmentLoader } from "./pages/DepartmentTemplate";
import DepartmentsIndex, { departmentsIndexLoader } from "./pages/DepartmentsIndex";
import LecturerProfile, { lecturerLoader } from "./pages/LecturerProfile";
import { ResearchRepository, researchLoader, StudentProjectRepository, studentProjectsLoader } from "./pages/Repositories";
import NewsEvents, { newsEventsLoader } from "./pages/NewsEvents";
import AlumniPortal, { alumniLoader } from "./pages/AlumniPortal";
import Home, { homeLoader } from "./pages/Home";
import FacultyExplorer, { explorerLoader } from "./pages/FacultyExplorer";
import About from "./pages/About";
import Admissions from "./pages/Admissions";
import Focitsa, { focitsaLoader } from "./pages/Focitsa";
import "./index.css";

/**
 * Router configuration using createBrowserRouter.
 *
 * Key architectural decisions:
 * 1. Root route uses Layout as the element (Navbar + Footer wrap all pages)
 * 2. errorElement at root catches all unhandled errors
 * 3. Department route uses a loader for data fetching + 404 validation
 * 4. Splat route (*) catches undefined URLs and renders 404
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <RootErrorBoundary />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: homeLoader,
        errorElement: <RootErrorBoundary />,
      },
      {
        path: "explore",
        element: <FacultyExplorer />,
        loader: explorerLoader,
        errorElement: <RootErrorBoundary />,
      },
      {
        path: "about",
        element: <About />,
        errorElement: <RootErrorBoundary />,
      },
      {
        path: "departments",
        children: [
          {
            index: true,
            element: <DepartmentsIndex />,
            loader: departmentsIndexLoader,
            errorElement: <RootErrorBoundary />,
          },
          {
            path: ":slug",
            element: <DepartmentTemplate />,
            loader: departmentLoader,
            errorElement: <RootErrorBoundary />,
          },
          {
            path: ":slug/staff/:staffSlug",
            element: <LecturerProfile />,
            loader: lecturerLoader,
            errorElement: <RootErrorBoundary />,
          },
        ],
      },
      {
        path: "research",
        element: <ResearchRepository />,
        loader: researchLoader,
        errorElement: <RootErrorBoundary />,
      },
      {
        path: "projects",
        element: <StudentProjectRepository />,
        loader: studentProjectsLoader,
        errorElement: <RootErrorBoundary />,
      },
      {
        path: "news",
        element: <NewsEvents />,
        loader: newsEventsLoader,
        errorElement: <RootErrorBoundary />,
      },
      {
        path: "alumni",
        element: <AlumniPortal />,
        loader: alumniLoader,
        errorElement: <RootErrorBoundary />,
      },
      {
        path: "focitsa",
        element: <Focitsa />,
        loader: focitsaLoader,
        errorElement: <RootErrorBoundary />,
      },
      {
        path: "admissions",
        element: <Admissions />,
        errorElement: <RootErrorBoundary />,
      },
      {
        // Catch-all splat route for undefined URLs
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
