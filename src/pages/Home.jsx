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
      <section className="relative bg-slate-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1600&auto=format&fit=crop"
            alt="University Campus"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 drop-shadow-lg font-heading">
            Faculty of Computing <br/> <span className="text-indigo-400">& Information Technology</span>
          </h1>
          <p className="mt-4 text-xl max-w-3xl mx-auto text-slate-300 mb-10 drop-shadow">
            Osun State University (UNIOSUN) — "Livingspring of Knowledge and Culture". 
            Empowering the next generation of global tech leaders.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/explore"
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-full shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 hover:scale-105 transition-all"
            >
              Explore Faculty
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/admissions"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-base font-bold rounded-full text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all"
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

      {/* QUICK LINKS SECTION */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="p-4 bg-indigo-100 text-indigo-600 rounded-2xl mb-6 transform rotate-3">
                <Laptop className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Modern Infrastructure</h3>
              <p className="text-slate-600 mb-6">Experience hands-on learning in our 5 specialized laboratories equipped with industry-standard technologies.</p>
              <Link to="/explore" className="text-indigo-600 font-bold hover:text-indigo-800 flex items-center mt-auto uppercase tracking-wide text-sm">
                View Facilities <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="flex flex-col items-center text-center p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="p-4 bg-amber-100 text-amber-600 rounded-2xl mb-6 transform -rotate-3">
                <GraduationCap className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Alumni Network</h3>
              <p className="text-slate-600 mb-6">Connect with graduates, find mentorship, and give back to the next generation of tech talent.</p>
              <Link to="/alumni" className="text-amber-600 font-bold hover:text-amber-800 flex items-center mt-auto uppercase tracking-wide text-sm">
                Join Network <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="flex flex-col items-center text-center p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="p-4 bg-teal-100 text-teal-600 rounded-2xl mb-6 transform rotate-3">
                <BookOpen className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Research Repository</h3>
              <p className="text-slate-600 mb-6">Browse our open-access repository of faculty research publications and outstanding student capstone projects.</p>
              <Link to="/research" className="text-teal-600 font-bold hover:text-teal-800 flex items-center mt-auto uppercase tracking-wide text-sm">
                Access Papers <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
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
              <div className="flex items-center justify-between mb-8 pb-4 border-b-2 border-indigo-100">
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-heading">Latest News & Events</h2>
                <Link to="/news" className="text-indigo-600 font-bold hover:text-indigo-800 flex items-center">
                  See all <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              
              <div className="space-y-6">
                {latestFeed.map(item => (
                  <div key={item.id} className="flex flex-col sm:flex-row bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                    <div className="sm:w-56 h-56 sm:h-auto flex-shrink-0 relative">
                      <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover" />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-md text-xs font-bold text-indigo-900 shadow-sm">
                        {new Date(item.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                    <div className="p-6 flex flex-col justify-center">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {item.tags.map(tag => (
                          <span key={tag.slug} className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border border-slate-200 text-slate-700 bg-slate-50`}>
                            {tag.name}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight">{item.title}</h3>
                      <p className="text-slate-600 text-sm mb-4 line-clamp-2">{item.summary}</p>
                      <Link to="/news" className="text-indigo-600 font-bold text-sm hover:underline mt-auto inline-flex items-center">
                        Read more <ChevronRight className="h-4 w-4 ml-1" />
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
                    <Link to="/focitsa" className="mt-4 inline-flex justify-center w-full px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors">
                      View Union Portal
                    </Link>
                  </ProfileCard>
                )}
              </div>

            </div>
            
          </div>
        </div>
      </section>
      
      {/* MOCK VISITOR STATS (Plausible/Umami UI Integration) */}
      {/* Defensive Implementation: Section gracefully collapses if 3rd-party stats fail */}
      <section className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={visitorStatsRef}>
          <div className="text-center mb-8">
            <h3 className="text-sm font-bold tracking-widest uppercase text-slate-500 mb-2">Analytics Dashboard</h3>
            <p className="text-lg text-slate-100 font-heading">Live Faculty Traffic</p>
          </div>
          
          {visitorStats ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 flex flex-col items-center justify-center text-center">
                  <Eye className="h-6 w-6 text-indigo-400 mb-3" />
                  <div className="text-3xl font-bold text-white mb-1 h-10 flex items-center justify-center">
                    <AnimatedCounter value={visitorStats.totalPageViews} start={animateVisitorStats} />
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Page Views</div>
                </div>

                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 flex flex-col items-center justify-center text-center">
                  <Calendar className="h-6 w-6 text-teal-400 mb-3" />
                  <div className="text-3xl font-bold text-white mb-1 h-10 flex items-center justify-center">
                    <AnimatedCounter value={visitorStats.monthlyVisitors} start={animateVisitorStats} />
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Monthly Visitors</div>
                </div>

                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 flex flex-col items-center justify-center text-center">
                  <MousePointerClick className="h-6 w-6 text-amber-400 mb-3" />
                  <div className="text-3xl font-bold text-white mb-1 h-10 flex items-center justify-center">
                    <AnimatedCounter value={visitorStats.todaysVisits} start={animateVisitorStats} />
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Today's Visits</div>
                </div>
              </div>
              <div className="text-center mt-6 text-xs text-slate-600">
                Powered by privacy-friendly analytics. Last updated: {new Date(visitorStats.lastUpdated).toLocaleTimeString()}
              </div>
            </>
          ) : (
            /* Defensive Fallback UI */
            <div className="max-w-2xl mx-auto bg-slate-800/30 rounded-xl p-8 border border-slate-700/50 text-center">
              <AlertCircle className="h-8 w-8 text-slate-500 mx-auto mb-4 opacity-50" />
              <p className="text-slate-400 text-sm">
                Live analytics are currently synchronizing. Please check back later.
              </p>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
