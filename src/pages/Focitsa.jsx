import { useLoaderData, useSearchParams, useNavigation, Link } from "react-router-dom";
import { Users, BookOpen, CheckCircle2, LifeBuoy, FileText, Loader2, ChevronRight } from "lucide-react";
import { getStudentLeaders, getRollOfHonour, CURRENT_SESSION } from "../services/api";
import { ProfileCard } from "../components/ui/ProfileCard";
import staticContent from "../data/staticContent.json";

// --- SANITIZATION PIPELINE ---
function extractInitials(name) {
  if (!name) return "";
  const cleanName = name
    .replace(/(?:Prof\.|Dr\.|Mr\.|Mrs\.|Ms\.|Rt\.\s?Hon\.|Sen\.|Comrade)\s+/gi, "")
    .replace(/\([^)]*\)/g, "")
    .trim();
  const tokens = cleanName.split(/\s+/);
  const first = tokens[0] ? tokens[0].charAt(0).toUpperCase() : "";
  const second = tokens[1] ? tokens[1].charAt(0).toUpperCase() : "";
  return first + second;
}

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
  
  const [executives, legislative, roh] = await Promise.all([
    getStudentLeaders({ session, branch: "executive" }, { signal: request.signal }),
    getStudentLeaders({ session, branch: "legislative" }, { signal: request.signal }),
    getRollOfHonour({ level: "faculty" }, { signal: request.signal })
  ]);

  const mapLeader = (leader) => ({
    ...leader,
    initials: extractInitials(leader.name),
    assistant: leader.assistant ? { ...leader.assistant, initials: extractInitials(leader.assistant.name) } : null
  });
  
  return { 
    executives: executives.map(mapLeader), 
    legislative: legislative.map(mapLeader), 
    session, 
    currentSession: CURRENT_SESSION 
  };
}

// --- MAIN PAGE ---
export default function Focitsa() {
  const { executives, legislative, session, currentSession } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigation = useNavigation();
  const isNavigating = navigation.state === "loading" || navigation.state === "submitting";

  const handleCtaClick = (actionName) => {
    const payload = JSON.stringify({ event: 'union_cta_click', action: actionName, timestamp: Date.now() });
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/telemetry', payload);
    } else {
      fetch('/api/telemetry', { method: 'POST', body: payload, keepalive: true }).catch(() => {});
    }
  };

  const handleSessionChange = (e) => {
    setSearchParams({ session: e.target.value });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-10">
          <ol className="flex items-center gap-2 text-sm text-slate-500">
            <li><Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link></li>
            <li><ChevronRight size={14} className="text-slate-300" /></li>
            <li aria-current="page" className="text-slate-900 font-semibold">Student Union</li>
          </ol>
        </nav>

        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full overflow-hidden mb-6 border-2 border-indigo-100 shadow-sm bg-white">
            <img src="/faculty-logo.jpg" alt="FOCITSA Crest" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl mb-4">
            FOCITSA Student Union
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
            The Faculty of Computing and Information Technology Student Association — representing the interests, welfare, and academic progress of all students.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
            <a 
              href="#executives" 
              onClick={() => handleCtaClick('meet_leaders')}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full sm:w-auto transition-colors shadow-sm"
            >
              <Users className="w-5 h-5 mr-2" />
              Meet Your Leaders
            </a>
            <a 
              href="#executives" 
              onClick={() => handleCtaClick('contact_welfare_support')}
              className="inline-flex items-center justify-center px-6 py-3 border border-slate-300 text-base font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full sm:w-auto transition-colors shadow-sm"
            >
              <LifeBuoy className="w-5 h-5 mr-2 text-slate-400" />
              Welfare & Support
            </a>
          </div>
        </div>

        {/* ABOUT FOCITSA (CONSTITUTION AIMS) */}
        <section id="constitution" className="mb-16 bg-white p-8 rounded-2xl shadow-sm border border-slate-200 scroll-mt-24">
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
        <section id="executives" className="mb-16 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-4 mb-8 gap-4">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center">
              Executive Council
              <span className="ml-3 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                {executives.length} Members
              </span>
            </h2>
            <div className="flex items-center bg-slate-50 rounded-lg p-1 border border-slate-200">
              <label htmlFor="session-select" className="sr-only">Academic Session</label>
              <select
                id="session-select"
                value={session}
                onChange={handleSessionChange}
                className="block w-full py-2 pl-3 pr-8 text-sm font-medium text-slate-700 bg-transparent border-transparent focus:ring-0 focus:border-transparent cursor-pointer"
              >
                <option value={currentSession}>{currentSession} (Current)</option>
                <option value="2025/2026">2025/2026</option>
                <option value="2024/2025">2024/2025</option>
              </select>
            </div>
          </div>

          <div className="relative min-h-[400px]">
            {isNavigating && (
              <div className="absolute inset-0 z-50 flex items-start justify-center pt-12 bg-slate-50/50 backdrop-blur-[2px] rounded-2xl transition-all duration-300">
                <div className="bg-white px-4 py-2 rounded-full shadow-lg border border-slate-200 flex items-center gap-3">
                  <Loader2 className="w-5 h-5 text-indigo-600 animate-spin" />
                  <span className="text-sm font-medium text-slate-700">Updating records...</span>
                </div>
              </div>
            )}
            
            {executives.length > 0 ? (
              <div className={`flex overflow-x-auto pb-8 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 snap-x snap-mandatory sm:overflow-visible [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] sm:items-start transition-opacity duration-300 ${isNavigating ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
                {executives.map(leader => {
                  let variant = "default";
                  if (leader.role.toLowerCase() === "president") variant = "president";
                  if (leader.role.toLowerCase() === "vice president") variant = "vice-president";

                  return (
                    <div key={leader.id} className={`w-[85vw] sm:w-auto flex-shrink-0 snap-center sm:snap-align-none ${variant === "president" ? "sm:col-span-2 lg:col-span-3 xl:col-span-4 sm:flex sm:justify-center sm:mb-4" : ""}`}>
                      <div className={`flex flex-col justify-start gap-4 h-full ${variant === "president" ? "w-full sm:max-w-sm" : "w-full"}`}>
                        <ProfileCard 
                          name={leader.name}
                          subtitle={leader.role}
                          image={leader.photo}
                          imagePosition="object-cover object-top"
                          badge={leader.department}
                          variant={variant}
                          initials={leader.initials}
                        />
                        {leader.assistant && (
                          <ProfileCard 
                            name={leader.assistant.name}
                            subtitle={`Assistant ${leader.role}`}
                            image={leader.assistant.photo}
                            imagePosition="object-cover object-top"
                            badge={leader.assistant.department || leader.department}
                            initials={leader.assistant.initials}
                            isAssistant={true}
                          />
                        )}
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
          </div>
        </section>

        {/* LEGISLATIVE */}
        <section>
          <div className="border-b border-slate-200 pb-4 mb-8">
            <h2 className="text-3xl font-bold text-slate-900">Legislative Council</h2>
            <p className="text-slate-500 mt-2">The parliamentary representatives from all 7 departments.</p>
          </div>
          
          <div className="relative min-h-[400px]">
            {isNavigating && (
              <div className="absolute inset-0 z-50 bg-slate-50/50 backdrop-blur-[2px] rounded-2xl transition-all duration-300 pointer-events-none" />
            )}
            {legislative.length > 0 ? (
              <div className={`flex overflow-x-auto pb-8 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 snap-x snap-mandatory sm:overflow-visible [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] sm:items-start transition-opacity duration-300 ${isNavigating ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
                {legislative.map(leader => (
                  <div key={leader.id} className="w-[85vw] sm:w-auto flex-shrink-0 snap-center sm:snap-align-none">
                    <ProfileCard 
                      name={leader.name}
                      subtitle={leader.role}
                      image={leader.photo}
                      imagePosition="object-cover object-top"
                      badge={leader.department}
                      initials={leader.initials}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
                <p className="text-slate-500">No legislative records found for the {session} session.</p>
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
