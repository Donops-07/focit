import { useLoaderData, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { 
  ArrowRight, 
  BookOpen, 
  GraduationCap, 
  Laptop, 
  ChevronRight, 
  Building2, 
  FlaskConical, 
  Users,
  Eye,
  Calendar,
  MousePointerClick,
  AlertCircle
} from "lucide-react";
import { getHomeDashboard } from "../services/api";
import { ProfileCard } from "../components/ui/ProfileCard";
import { AnimatedCounter } from "../components/ui/AnimatedCounter";

// --- SEO META ---
export const meta = () => {
  return [
    { title: "Home | Faculty of Computing & Information Technology - UNIOSUN" },
    { name: "description", content: "Welcome to the Faculty of Computing & Information Technology at Osun State University. Discover our departments, news, and student projects." },
    { property: "og:title", content: "Faculty of Computing & Information Technology - UNIOSUN" },
    { property: "og:description", content: "Explore the digital academic ecosystem of FOCITSA." }
  ];
};

// --- LOADER ---
export async function homeLoader({ request }) {
  return await getHomeDashboard({ signal: request.signal });
}

// --- MAIN PAGE ---
export default function Home() {
  const { 
    latestFeed, 
    featuredProjects, 
    currentPresident, 
    facultyMetrics,
    visitorStats
  } = useLoaderData();

  // Unified Intersection Observer State
  const [animateFacultyStats, setAnimateFacultyStats] = useState(false);
  const [animateVisitorStats, setAnimateVisitorStats] = useState(false);
  
  const facultyStatsRef = useRef(null);
  const visitorStatsRef = useRef(null);

  // Single observer instance watching multiple sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (entry.target === facultyStatsRef.current) {
              setAnimateFacultyStats(true);
              observer.unobserve(entry.target);
            } else if (entry.target === visitorStatsRef.current) {
              setAnimateVisitorStats(true);
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (facultyStatsRef.current) observer.observe(facultyStatsRef.current);
    if (visitorStatsRef.current) observer.observe(visitorStatsRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* ANNOUNCEMENTS MARQUEE (UNIOSUN Inspired) */}
      <div className="bg-indigo-600 text-white py-2 overflow-hidden flex items-center border-b border-indigo-700">
        <div className="px-4 font-bold text-sm bg-indigo-800 py-1 mr-4 rounded-r-md z-10 shadow-[10px_0_15px_-3px_rgba(79,70,229,1)]">
          LATEST:
        </div>
        <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite]">
          <span className="mx-4 text-sm font-medium">✨ Admissions for 2026/2027 Session now open!</span>
          <span className="mx-4 text-sm font-medium">🏆 FOCIT wins National Hackathon 2026</span>
          <span className="mx-4 text-sm font-medium">📅 Tech Innovation Summit: Nov 5-6</span>
          <span className="mx-4 text-sm font-medium">✨ Admissions for 2026/2027 Session now open!</span>
        </div>
      </div>

      {/* HERO SECTION */}
      <section id="hero-section" className="relative bg-[#070c2e] text-white overflow-hidden">
        {/* Cyber grid background */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTAgMTBoNDBNMTAgMHY0ME0wIDIwaDQwTTIwIDB2NDBNMCAzMGg0ME0zMCAwdjQwIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNykiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3N2Zz4=')] opacity-50"></div>
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop"
            alt="Digital Network Campus"
            className="w-full h-full object-cover opacity-20 mix-blend-screen"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#040617] via-[#070c2e]/80 to-transparent"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36 flex flex-col items-center text-center">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-md mb-8">
            <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-pulse mr-2"></span>
            <span className="text-xs font-mono font-medium tracking-wider text-indigo-300">SYSTEM.ONLINE // ACADEMIC_HUB</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 drop-shadow-lg font-heading">
            Faculty of Computing <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-300">& Information Technology</span>
          </h1>
          <p className="mt-6 text-xl max-w-2xl mx-auto text-slate-300 mb-12 drop-shadow leading-relaxed">
            Osun State University (UNIOSUN). Empowering the next generation of global tech leaders through innovation, code, and data.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <Link
              to="/explore"
              className="group inline-flex items-center justify-center px-8 py-4 border border-indigo-400/50 text-base font-bold rounded-lg shadow-[0_0_20px_rgba(79,70,229,0.3)] text-white bg-indigo-600/80 backdrop-blur-md hover:bg-indigo-500 hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] hover:-translate-y-1 transition-all duration-300"
            >
              Initialize Exploration
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/admissions"
              className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-base font-bold rounded-lg text-white bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/40 hover:-translate-y-1 transition-all duration-300"
            >
              Admissions Portal
            </Link>
          </div>
        </div>
      </section>

      {/* DYNAMIC STATS SECTION (UNIOSUN Inspired) */}
      <section className="bg-gradient-to-br from-[#0a1142] to-[#040617] text-white py-16 border-y-4 border-[#FFB81C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={facultyStatsRef}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
            <div className="flex flex-col items-center px-4">
              <Users className="h-10 w-10 text-[#FFB81C] mb-4 opacity-90" />
              <div className="text-4xl md:text-5xl font-bold text-white mb-2 h-14 flex items-center justify-center">
                <AnimatedCounter value={facultyMetrics.students} suffix="+" start={animateFacultyStats} />
              </div>
              <div className="text-sm md:text-base text-blue-200 uppercase tracking-wider font-semibold">Active Students</div>
            </div>
            
            <div className="flex flex-col items-center px-4">
              <Building2 className="h-10 w-10 text-[#FFB81C] mb-4 opacity-90" />
              <div className="text-4xl md:text-5xl font-bold text-white mb-2 h-14 flex items-center justify-center">
                <AnimatedCounter value={facultyMetrics.departments} start={animateFacultyStats} />
              </div>
              <div className="text-sm md:text-base text-blue-200 uppercase tracking-wider font-semibold">Departments</div>
            </div>

            <div className="flex flex-col items-center px-4">
              <FlaskConical className="h-10 w-10 text-[#FFB81C] mb-4 opacity-90" />
              <div className="text-4xl md:text-5xl font-bold text-white mb-2 h-14 flex items-center justify-center">
                <AnimatedCounter value={facultyMetrics.labs} start={animateFacultyStats} />
              </div>
              <div className="text-sm md:text-base text-blue-200 uppercase tracking-wider font-semibold">Research Labs</div>
            </div>

            <div className="flex flex-col items-center px-4">
              <BookOpen className="h-10 w-10 text-[#FFB81C] mb-4 opacity-90" />
              <div className="text-4xl md:text-5xl font-bold text-white mb-2 h-14 flex items-center justify-center">
                <AnimatedCounter value={facultyMetrics.researchPapers} suffix="+" start={animateFacultyStats} />
              </div>
              <div className="text-sm md:text-base text-blue-200 uppercase tracking-wider font-semibold">Publications</div>
            </div>
          </div>
        </div>
      </section>

      {/* BENTO GRID QUICK LINKS */}
      <section id="bento-grid" className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-heading">Digital Infrastructure</h2>
            <p className="text-slate-500 mt-2">Explore our core facilities and academic networks.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[250px]">
            {/* Main Bento Card */}
            <div className="group md:col-span-2 md:row-span-2 flex flex-col p-8 bg-white rounded-3xl border border-slate-200 hover:border-indigo-400/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-indigo-500/10 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                <Laptop className="w-64 h-64 text-indigo-900" />
              </div>
              <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl mb-6 w-fit z-10 border border-indigo-100">
                <Laptop className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 z-10">Modern Infrastructure</h3>
              <p className="text-slate-600 mb-8 z-10 max-w-md text-lg">Experience hands-on learning in our 5 specialized laboratories equipped with industry-standard technologies and high-performance computing clusters.</p>
              <Link to="/explore" className="text-indigo-600 font-bold hover:text-indigo-800 flex items-center mt-auto uppercase tracking-wide text-sm z-10 w-fit group/link">
                View Facilities <ArrowRight className="h-4 w-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Secondary Bento Cards */}
            <div className="group md:col-span-2 flex flex-col justify-between p-8 bg-white rounded-3xl border border-slate-200 hover:border-amber-400/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-amber-500/10 transition-all duration-300 relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                <GraduationCap className="w-40 h-40 text-amber-900" />
              </div>
              <div className="flex justify-between items-start z-10">
                <div className="p-3 bg-amber-50 text-amber-600 rounded-xl border border-amber-100">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <Link to="/alumni" className="text-amber-600 font-bold hover:text-amber-800 flex items-center text-sm group/link">
                  Join Network <ArrowRight className="h-4 w-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="z-10 mt-4">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Alumni Network</h3>
                <p className="text-slate-600">Connect with graduates, find mentorship, and give back to the next generation of tech talent.</p>
              </div>
            </div>

            <div className="group md:col-span-2 flex flex-col justify-between p-8 bg-slate-900 rounded-3xl border border-slate-800 hover:border-teal-400/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.1)] hover:shadow-teal-500/20 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-1/2 right-4 -translate-y-1/2 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                <BookOpen className="w-40 h-40 text-teal-400" />
              </div>
              <div className="flex justify-between items-start z-10">
                <div className="p-3 bg-teal-500/10 text-teal-400 rounded-xl border border-teal-500/20">
                  <BookOpen className="h-6 w-6" />
                </div>
                <Link to="/research" className="text-teal-400 font-bold hover:text-teal-300 flex items-center text-sm group/link">
                  Access Papers <ArrowRight className="h-4 w-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="z-10 mt-4">
                <h3 className="text-xl font-bold text-white mb-2">Research Repository</h3>
                <p className="text-slate-400">Browse our open-access repository of faculty research publications and outstanding student capstone projects.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DYNAMIC DASHBOARD SECTION */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Latest News (2 columns) */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-heading">Event Telemetry</h2>
                <Link to="/news" className="text-indigo-600 font-bold hover:text-indigo-800 flex items-center group/link">
                  View full log <ArrowRight className="h-4 w-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
              
              <div className="space-y-6">
                {latestFeed.map(item => (
                  <div key={item.id} className="group flex flex-col sm:flex-row bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-md hover:border-indigo-200 transition-all">
                    <div className="sm:w-56 h-56 sm:h-auto flex-shrink-0 relative overflow-hidden">
                      <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur px-3 py-1.5 rounded text-xs font-mono font-bold text-indigo-300 border border-indigo-500/30">
                        {new Date(item.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-')}
                      </div>
                    </div>
                    <div className="p-6 flex flex-col justify-center flex-1">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {item.tags.map(tag => (
                          <span key={tag.slug} className={`inline-flex items-center px-2 py-1 rounded bg-slate-100 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-600 border border-slate-200`}>
                            #{tag.slug}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight group-hover:text-indigo-700 transition-colors">{item.title}</h3>
                      <p className="text-slate-600 text-sm mb-4 line-clamp-2">{item.summary}</p>
                      <Link to="/news" className="text-indigo-600 font-bold text-sm hover:underline mt-auto inline-flex items-center">
                        Execute read <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar (1 column) */}
            <div className="space-y-12">
              
              {/* Featured Projects */}
              <div>
                <div className="flex items-center justify-between mb-6 pb-2 border-b-2 border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-900 font-heading">Featured Projects</h2>
                </div>
                <div className="space-y-4">
                  {featuredProjects.map(project => (
                    <div key={project.id} className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 hover:border-indigo-300 transition-colors">
                      <h3 className="font-bold text-slate-900 mb-1 leading-tight">{project.title}</h3>
                      <p className="text-sm text-slate-500 mb-3">By {project.student} • {project.year}</p>
                      <span className="inline-block bg-slate-100 text-slate-700 text-xs font-semibold px-2 py-1 rounded">
                        {project.department.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                  ))}
                  <Link to="/projects" className="block text-center w-full px-4 py-3 bg-indigo-50 text-indigo-700 rounded-xl text-sm font-bold hover:bg-indigo-100 transition-colors">
                    Browse All Projects
                  </Link>
                </div>
              </div>

              {/* Leadership Spotlight */}
              <div>
                <div className="flex items-center justify-between mb-6 pb-2 border-b-2 border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-900 font-heading">Student Union</h2>
                </div>
                {currentPresident && (
                  <ProfileCard 
                    name={currentPresident.name}
                    subtitle={`FOCITSA ${currentPresident.role}`}
                    image={currentPresident.photo}
                    badge={currentPresident.department}
                    variant="student-frame"
                  >
                    <div className="mt-4 flex flex-col gap-2">
                      <Link to="/focitsa" className="inline-flex justify-center w-full px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors">
                        View Union Portal
                      </Link>
                      <Link to="/student-affairs" className="inline-flex justify-center w-full px-4 py-2 bg-[#FFB81C] text-[#070c2e] rounded-md text-sm font-bold hover:bg-amber-400 transition-colors">
                        Student Affairs Dashboard
                      </Link>
                    </div>
                  </ProfileCard>
                )}
              </div>

            </div>
            
          </div>
        </div>
      </section>
      
      {/* MOCK VISITOR STATS (Plausible/Umami UI Integration) */}
      {/* Defensive Implementation: Section gracefully collapses if 3rd-party stats fail */}
      <section id="analytics-dashboard" className="bg-[#040617] text-slate-300 py-16 border-t border-indigo-900/30 relative overflow-hidden">
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTAgMTBoNDBNMTAgMHY0ME0wIDIwaDQwTTIwIDB2NDBNMCAzMGg0ME0zMCAwdjQwIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3N2Zz4=')]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={visitorStatsRef}>
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center space-x-2 mb-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <h3 className="text-xs font-mono font-bold tracking-[0.2em] text-emerald-400">LIVE SYSTEM ANALYTICS</h3>
            </div>
            <p className="text-2xl text-white font-heading font-bold">Faculty Traffic Matrix</p>
          </div>
          
          {visitorStats ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="bg-[#0a1142]/80 backdrop-blur-sm rounded-2xl p-8 border border-indigo-500/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] flex flex-col items-center justify-center text-center group hover:border-indigo-400/40 transition-colors">
                  <Eye className="h-8 w-8 text-indigo-400 mb-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                  <div className="text-4xl font-mono font-bold text-white mb-2 h-10 flex items-center justify-center">
                    <AnimatedCounter value={visitorStats.totalPageViews} start={animateVisitorStats} />
                  </div>
                  <div className="text-xs font-mono font-medium tracking-widest text-slate-400">TOTAL_PAGE_VIEWS</div>
                </div>

                <div className="bg-[#0a1142]/80 backdrop-blur-sm rounded-2xl p-8 border border-teal-500/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] flex flex-col items-center justify-center text-center group hover:border-teal-400/40 transition-colors">
                  <Calendar className="h-8 w-8 text-teal-400 mb-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                  <div className="text-4xl font-mono font-bold text-white mb-2 h-10 flex items-center justify-center">
                    <AnimatedCounter value={visitorStats.monthlyVisitors} start={animateVisitorStats} />
                  </div>
                  <div className="text-xs font-mono font-medium tracking-widest text-slate-400">MONTHLY_VISITORS</div>
                </div>

                <div className="bg-[#0a1142]/80 backdrop-blur-sm rounded-2xl p-8 border border-amber-500/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] flex flex-col items-center justify-center text-center group hover:border-amber-400/40 transition-colors">
                  <MousePointerClick className="h-8 w-8 text-amber-400 mb-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                  <div className="text-4xl font-mono font-bold text-white mb-2 h-10 flex items-center justify-center">
                    <AnimatedCounter value={visitorStats.todaysVisits} start={animateVisitorStats} />
                  </div>
                  <div className="text-xs font-mono font-medium tracking-widest text-slate-400">TODAYS_VISITS</div>
                </div>
              </div>
              <div className="text-center mt-8 text-xs font-mono text-slate-500">
                DATA_SOURCE: <span className="text-slate-400">PLAUSIBLE_EDGE</span> | LAST_SYNC: <span className="text-indigo-300">{new Date(visitorStats.lastUpdated).toLocaleDateString()} {new Date(visitorStats.lastUpdated).toLocaleTimeString()}</span>
              </div>
            </>
          ) : (
            /* Defensive Fallback UI */
            <div className="max-w-2xl mx-auto bg-[#0a1142]/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 text-center">
              <AlertCircle className="h-8 w-8 text-slate-500 mx-auto mb-4 opacity-50" />
              <p className="text-slate-400 text-sm font-mono">
                &gt; SYNC_ERROR: Live analytics are currently synchronizing. Please check back later.
              </p>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
