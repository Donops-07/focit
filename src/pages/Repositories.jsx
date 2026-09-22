import { useLoaderData, useNavigation } from "react-router-dom";
import DataGrid from "../components/ui/DataGrid";
import { getResearchPapers, getStudentProjects } from "../services/api";
import { DEPARTMENTS } from "../data/navigation";

// --- SHARED FILTER DEFINITIONS ---

const departmentFilter = {
  key: "department",
  label: "Department",
  type: "select",
  options: DEPARTMENTS.map((d) => ({ label: d.name, value: d.slug })),
};

const yearFilter = {
  key: "year",
  label: "Year",
  type: "select",
  options: [
    { label: "2025", value: "2025" },
    { label: "2024", value: "2024" },
    { label: "2023", value: "2023" },
    { label: "2022", value: "2022" },
  ],
};

// ============================================================================
// RESEARCH REPOSITORY
// ============================================================================

export async function researchLoader({ request }) {
  const url = new URL(request.url);
  const searchParams = Object.fromEntries(url.searchParams.entries());

  try {
    const data = await getResearchPapers(searchParams, {
      signal: request.signal,
    });
    return data;
  } catch (err) {
    if (err.name === "AbortError") throw err; // Let React Router handle aborts naturally
    console.error("Failed to load research papers:", err);
    return { error: { message: "Failed to load research papers. Please try again later." } };
  }
}

const researchColumns = [
  {
    key: "title",
    label: "Publication",
    className: "w-full max-w-[500px]",
    render: (item) => (
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-green-primary text-base leading-snug">
          {item.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2">{item.abstract}</p>
        <div className="flex flex-wrap gap-1 mt-1">
          {item.keywords?.slice(0, 3).map((keyword) => (
            <span
              key={keyword}
              className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
            >
              {keyword}
            </span>
          ))}
          {item.keywords?.length > 3 && (
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
              +{item.keywords.length - 3}
            </span>
          )}
        </div>
      </div>
    ),
  },
  {
    key: "authors",
    label: "Authors",
    className: "whitespace-nowrap min-w-[200px]",
    render: (item) => (
      <span className="text-sm text-gray-800">
        {item.authors?.join(", ")}
      </span>
    ),
  },
  {
    key: "department",
    label: "Department",
    render: (item) => {
      const dept = DEPARTMENTS.find((d) => d.slug === item.department);
      return (
        <span className="text-sm px-2 py-1 bg-green-lightest text-green-dark rounded-md whitespace-nowrap">
          {dept?.shortName || item.department}
        </span>
      );
    },
  },
  {
    key: "year",
    label: "Year",
    className: "text-center",
    render: (item) => <span className="text-sm font-medium">{item.year}</span>,
  },
];

const researchFilters = [departmentFilter, yearFilter];

export function ResearchRepository() {
  const loaderData = useLoaderData();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  // Safely extract data and meta, defaulting to empty if error exists
  const data = loaderData?.data || [];
  const meta = loaderData?.meta;
  const error = loaderData?.error;

  return (
    <div className="container section">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-primary mb-2 font-heading">
          Research Repository
        </h1>
        <p className="text-gray-600 max-w-2xl">
          Explore the academic publications, patents, and research outputs from the
          faculty and staff of the Faculty of Computing and Information Technology.
        </p>
      </div>

      <DataGrid
        data={data}
        meta={meta}
        error={error}
        columns={researchColumns}
        filters={researchFilters}
        isLoading={isLoading}
      />
    </div>
  );
}

// ============================================================================
// STUDENT PROJECT REPOSITORY
// ============================================================================

export async function studentProjectsLoader({ request }) {
  const url = new URL(request.url);
  const searchParams = Object.fromEntries(url.searchParams.entries());

  try {
    const data = await getStudentProjects(searchParams, {
      signal: request.signal,
    });
    return data;
  } catch (err) {
    if (err.name === "AbortError") throw err;
    console.error("Failed to load student projects:", err);
    return { error: { message: "Failed to load student projects. Please try again later." } };
  }
}

const projectColumns = [
  {
    key: "title",
    label: "Project Details",
    className: "w-full max-w-[500px]",
    render: (item) => (
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-green-primary text-base leading-snug">
          {item.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2">{item.abstract}</p>
        <div className="text-xs text-gray-500 mt-1">
          By <span className="font-medium text-gray-700">{item.student}</span> ({item.matricNo})
        </div>
      </div>
    ),
  },
  {
    key: "supervisor",
    label: "Supervisor",
    className: "whitespace-nowrap min-w-[150px]",
    render: (item) => (
      <span className="text-sm text-gray-800 font-medium">
        {item.supervisor}
      </span>
    ),
  },
  {
    key: "department",
    label: "Department",
    render: (item) => {
      const dept = DEPARTMENTS.find((d) => d.slug === item.department);
      return (
        <span className="text-sm px-2 py-1 bg-purple-lightest text-purple-dark rounded-md whitespace-nowrap">
          {dept?.shortName || item.department}
        </span>
      );
    },
  },
  {
    key: "year",
    label: "Year",
    className: "text-center",
    render: (item) => <span className="text-sm font-medium">{item.year}</span>,
  },
];

const projectFilters = [departmentFilter, yearFilter];

export function StudentProjectRepository() {
  const loaderData = useLoaderData();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  // Safely extract data and meta, defaulting to empty if error exists
  const data = loaderData?.data || [];
  const meta = loaderData?.meta;
  const error = loaderData?.error;

  return (
    <div className="container section">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-primary mb-2 font-heading">
          Student Project Archive
        </h1>
        <p className="text-gray-600 max-w-2xl">
          Browse final year capstone projects and research work completed by
          undergraduate students across all computing departments.
        </p>
      </div>

      <DataGrid
        data={data}
        meta={meta}
        error={error}
        columns={projectColumns}
        filters={projectFilters}
        isLoading={isLoading}
      />
    </div>
  );
}
