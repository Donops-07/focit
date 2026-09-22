import { useLoaderData, Link } from "react-router-dom";
import { getAllDepartments } from "../services/api";
import { ArrowRight } from "lucide-react";

// --- SEO META ---
export const meta = () => {
  return [
    { title: "Departments | Faculty of Computing & Information Technology" },
    { name: "description", content: "Explore the 7 academic departments of the Faculty of Computing & Information Technology." }
  ];
};

// --- LOADER ---
export async function departmentsIndexLoader({ request }) {
  const departments = await getAllDepartments({ signal: request.signal });
  return { departments };
}

// --- MAIN PAGE ---
export default function DepartmentsIndex() {
  const { departments } = useLoaderData();

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl mb-4">
            Our Departments
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Discover our seven specialized departments designed to equip you with the skills for the digital future.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {departments.map((dept) => (
            <div key={dept.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
              <div className={`h-2 bg-${dept.color}-500 w-full`}></div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{dept.name}</h3>
                <span className={`inline-block px-2 py-1 bg-${dept.color}-100 text-${dept.color}-800 text-xs font-semibold rounded mb-4 w-max`}>
                  {dept.shortName}
                </span>
                <p className="text-slate-600 flex-grow mb-6">{dept.description}</p>
                <div className="mt-auto">
                  <Link 
                    to={`/departments/${dept.slug}`} 
                    className={`inline-flex items-center text-${dept.color}-600 font-medium hover:text-${dept.color}-800`}
                  >
                    View Department <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
