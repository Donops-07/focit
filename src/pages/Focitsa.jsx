import { useLoaderData, useSearchParams } from "react-router-dom";
import { Users, BookOpen, CheckCircle2 } from "lucide-react";
import { getStudentLeaders, CURRENT_SESSION } from "../services/api";
import { ProfileCard } from "../components/ui/ProfileCard";
import staticContent from "../data/staticContent.json";

// --- SEO META ---
export const meta = () => {
  return [
    { title: "FOCITSA Student Union | Faculty of Computing & Information Technology" },
    { name: "description", content: "Meet the executive and legislative leaders of the Faculty of Computing and Information Technology Student Association (FOCITSA)." },
    { property: "og:title", content: "FOCITSA Student Union | UNIOSUN" }
  ];
};

// --- LOADER ---
export async function focitsaLoader({ request }) {
  const url = new URL(request.url);
  const session = url.searchParams.get("session") || CURRENT_SESSION;
  
  const [executives, legislative] = await Promise.all([
    getStudentLeaders({ session, branch: "executive" }, { signal: request.signal }),
    getStudentLeaders({ session, branch: "legislative" }, { signal: request.signal })
  ]);
  
  return { executives, legislative, session, currentSession: CURRENT_SESSION };
}

// --- MAIN PAGE ---
export default function Focitsa() {
  const { executives, legislative, session, currentSession } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSessionChange = (e) => {
    setSearchParams({ session: e.target.value });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-full mb-4">
            <Users className="h-8 w-8 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl mb-4">
            FOCITSA Student Union
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
            The Faculty of Computing and Information Technology Student Association representing the interests, welfare, and academic progress of all students.
          </p>

          <div className="flex justify-center items-center space-x-4">
            <label htmlFor="session-select" className="text-sm font-medium text-slate-700">
              Academic Session:
            </label>
            <select
              id="session-select"
              value={session}
              onChange={handleSessionChange}
              className="mt-1 block w-48 pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm bg-white"
            >
              <option value={currentSession}>{currentSession} (Current)</option>
              <option value="2025/2026">2025/2026</option>
              <option value="2024/2025">2024/2025</option>
            </select>
          </div>
        </div>

        {/* ABOUT FOCITSA (CONSTITUTION AIMS) */}
        <section className="mb-16 bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center mb-6">
            <BookOpen className="h-8 w-8 text-indigo-600 mr-3" />
            <h2 className="text-3xl font-bold text-slate-900">About FOCITSA</h2>
          </div>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            {staticContent.focitsa.about}
          </p>
          
          <h3 className="text-xl font-bold text-slate-900 mb-4">Aims and Objectives</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {staticContent.focitsa.aimsAndObjectives.map((aim, idx) => (
              <div key={idx} className="flex items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                <CheckCircle2 className="h-5 w-5 text-indigo-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">{aim}</span>
              </div>
            ))}
          </div>
        </section>

        {/* EXECUTIVES */}
        <section className="mb-16">
          <div className="border-b border-slate-200 pb-4 mb-8">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center">
              Executive Council
              <span className="ml-3 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                {executives.length} Members
              </span>
            </h2>
          </div>

          {executives.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {executives.map(leader => {
                let variant = "default";
                if (leader.role.toLowerCase() === "president") variant = "president";
                if (leader.role.toLowerCase() === "vice president") variant = "vice-president";

                return (
                  <div key={leader.id} className={`${variant === "president" ? "sm:col-span-2 lg:col-span-4 flex justify-center mb-4" : ""}`}>
                    <div className={`${variant === "president" ? "w-full max-w-sm" : "w-full"}`}>
                      <ProfileCard 
                        name={leader.name}
                        subtitle={leader.role}
                        image={leader.photo}
                        badge={leader.department}
                        variant={variant}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
              <Users className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-1">No Executives Found</h3>
              <p className="text-slate-500">There are no executive records for the {session} academic session.</p>
            </div>
          )}
        </section>

        {/* LEGISLATIVE */}
        <section>
          <div className="border-b border-slate-200 pb-4 mb-8">
            <h2 className="text-3xl font-bold text-slate-900">Legislative Council</h2>
            <p className="text-slate-500 mt-2">The parliamentary representatives from all 7 departments.</p>
          </div>
          
          {legislative.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {legislative.map(leader => (
                <ProfileCard 
                  key={leader.id}
                  name={leader.name}
                  subtitle={leader.role}
                  image={leader.photo}
                  badge={leader.department}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
              <p className="text-slate-500">No legislative records found for the {session} session.</p>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
