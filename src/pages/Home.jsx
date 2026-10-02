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
  AlertCircle,
  X,
  Award,
  ExternalLink
} from "lucide-react";
import { getHomeDashboard } from "../services/api";
import { ProfileCard } from "../components/ui/ProfileCard";
import { AnimatedCounter } from "../components/ui/AnimatedCounter";
import staticContent from "../data/staticContent.json";

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
    hallOfFame,
    facultyMetrics,
    visitorStats
  } = useLoaderData();

  // Unified Intersection Observer State
  const [animateFacultyStats, setAnimateFacultyStats] = useState(false);
  const [animateVisitorStats, setAnimateVisitorStats] = useState(false);
  
  // Modal States
  const [selectedBGS, setSelectedBGS] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  
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

      {/* HERO SECTION - Strictly Scoped Component Architecture */}
      <section id="hero-section" className="relative bg-[#070c2e] min-h-[85vh] flex items-center overflow-hidden">
        
        {/* LAYER 0: The Bitmap Payload (Preloaded via document head outside this component) */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/focit-main-building.png" 
            alt="FOCIT Main Building" 
            className="w-full h-full object-cover opacity-90"
            // Important: In a production build, this would be .webp or .avif
            // and we'd inject <link rel="preload" as="image" href="..." fetchpriority="high"> in the <head>
          />
        </div>

        {/* LAYER 1: The Scrim (Mathematical Contrast Floor) */}
        {/* Uses Tailwind gradient classes to replace the ::before pseudo-element for encapsulation */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#070c2e]/95 via-[#070c2e]/80 to-[#070c2e]/40 pointer-events-none" />

        {/* LAYER 2: The Document Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <div className="w-full md:w-[60%] flex flex-col items-start text-left">
            
            {/* Statically rendered, CDN-invalidated Badge */}
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#FFB81C] mb-8 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-black animate-pulse mr-2"></span>
              <span className="text-xs font-bold tracking-wide text-black uppercase">
                [New] Fall 2026 Admissions Open
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-white font-heading leading-tight drop-shadow-md">
              Faculty of Computing & Information Technology
            </h1>
            
            <p className="mt-4 text-lg md:text-xl text-slate-200 mb-10 leading-relaxed max-w-2xl drop-shadow">
              Osun State University (UNIOSUN). Empowering the next generation of global tech leaders through rigorous academia, research, and industry-standard engineering.
            </p>
            
            {/* Intent-Based Routing: Segmenting the Funnel */}
            <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
              
              {/* Primary Conversion (Internal SPA Routing) */}
              {/* Solid visual mass ensures zero camouflage against background noise */}
              <Link
                to="/admissions"
                className="group inline-flex items-center justify-center px-8 py-4 bg-[#FFB81C] text-black text-base font-extrabold rounded-lg hover:bg-amber-400 hover:-translate-y-1 transition-all duration-300 shadow-lg"
              >
                Apply to Programs
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              {/* Secondary Utility (External Legacy Routing) */}
              {/* Uses a native <a> tag to prevent React Router from hijacking external history state */}
              {/* Uses backdrop-filter to mathematically blur background architectural noise */}
              <a
                href="https://portal.uniosun.edu.ng"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 border border-white/30 backdrop-blur-md text-white text-base font-bold rounded-lg hover:bg-white/20 hover:border-white/50 transition-all duration-300 group"
              >
                Current Student Portal
                <ExternalLink className="ml-2 h-5 w-5 opacity-70 group-hover:opacity-100 transition-opacity" />
              </a>
              
            </div>
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

      {/* DEAN'S WELCOME SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/3 flex justify-center px-4 sm:px-0">
              <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-none">
                <div className="absolute inset-0 bg-[#FFB81C] rounded-2xl transform translate-x-3 translate-y-3 lg:translate-x-4 lg:translate-y-4"></div>
                <img 
                  src={staticContent.about.leadership.dean.photo} 
                  alt={staticContent.about.leadership.dean.name} 
                  className="relative z-10 w-full h-80 sm:h-96 lg:h-96 object-cover rounded-2xl border-4 border-white shadow-xl"
                />
              </div>
            </div>
            <div className="w-full lg:w-2/3">
              <div className="inline-flex items-center space-x-2 mb-4">
                <span className="h-px w-8 bg-indigo-600"></span>
                <span className="text-indigo-600 font-bold uppercase tracking-wider text-sm">Welcome Address</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 font-heading leading-tight">
                {staticContent.about.leadership.dean.name}
              </h2>
              <p className="text-xl text-indigo-700 font-medium mb-6">
                {staticContent.about.leadership.dean.title}
              </p>
              <div className="prose prose-lg text-slate-600 mb-8">
                <p className="leading-relaxed">
                  {staticContent.about.leadership.dean.welcomeAddress}
                </p>
              </div>
              <Link 
                to="/about"
                className="inline-flex items-center px-6 py-3 border border-indigo-600 text-indigo-600 font-bold rounded-lg hover:bg-indigo-50 hover:-translate-y-1 transition-all duration-300"
              >
                Read More About The Dean <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
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
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:auto-rows-[250px]">
            {/* Main Bento Card */}
            <div className="group md:col-span-2 md:row-span-2 flex flex-col p-8 bg-white rounded-3xl border border-slate-200 hover:border-indigo-400/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-indigo-500/10 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                <Laptop className="w-64 h-64 text-indigo-900" />
              </div>
              <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl mb-6 w-fit z-10 border border-indigo-100">
                <Laptop className="h-8 w-8" />
              </div>
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
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-heading">Faculty News & Events</h2>
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
                        Read Article <ChevronRight className="h-4 w-4 ml-1" />
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
                    <div 
                      key={project.id} 
                      onClick={() => setSelectedProject(project)}
                      className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 hover:border-indigo-300 transition-colors cursor-pointer group"
                    >
                      <h3 className="font-bold text-slate-900 mb-1 leading-tight group-hover:text-indigo-700 transition-colors">{project.title}</h3>
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



              {/* Project Modal */}
              {selectedProject && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pt-16 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
                  <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 mt-8 sm:mt-0">
                    <div className="flex items-center justify-between p-6 border-b border-slate-100">
                      <h3 className="text-xl font-bold font-heading text-slate-900">Project Details</h3>
                      <button 
                        onClick={() => setSelectedProject(null)}
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    <div className="p-6 overflow-y-auto max-h-[60vh]">
                      <div className="mb-4">
                        <h4 className="text-xl font-bold text-slate-900 mb-2">{selectedProject.title}</h4>
                        <p className="text-indigo-600 font-medium text-sm">By {selectedProject.student}</p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded">Year: {selectedProject.year}</span>
                          <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded">Matric No: {selectedProject.matricNo}</span>
                          <span className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded">{selectedProject.department.replace('-', ' ').toUpperCase()}</span>
                        </div>
                      </div>
                      <div className="prose prose-slate prose-sm text-slate-600 mt-6">
                        <h5 className="text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide">Abstract</h5>
                        <p className="leading-relaxed text-justify">{selectedProject.abstract}</p>
                      </div>
                      {selectedProject.supervisor && (
                        <div className="mt-6 pt-4 border-t border-slate-100">
                          <p className="text-sm text-slate-500"><span className="font-semibold text-slate-700">Supervisor:</span> {selectedProject.supervisor}</p>
                        </div>
                      )}
                    </div>
                    <div className="p-4 bg-slate-50 border-t border-slate-100 text-right">
                      <button 
                        onClick={() => setSelectedProject(null)}
                        className="px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}



            </div>
            
          </div>
        </div>
      </section>

      {/* STUDENT UNION SECTION */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center space-x-2 mb-4">
                <Users className="h-5 w-5 text-indigo-600" />
                <span className="text-indigo-600 font-bold uppercase tracking-wider text-sm">FOCITSA</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold font-heading text-slate-900 tracking-tight mb-6">
                Student Union Leadership
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                The Faculty of Computing and Information Technology Students Association (FOCITSA) is the vibrant student body dedicated to fostering academic excellence, innovation, and unity among students. Led by passionate individuals, the union organizes tech summits, hackathons, and social events that shape the campus experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/focitsa" className="inline-flex justify-center px-8 py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-colors shadow-sm">
                  View Union Portal
                </Link>
                <Link to="/student-affairs" className="inline-flex justify-center px-8 py-3 bg-white text-slate-900 border border-slate-200 rounded-lg font-bold hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm">
                  Student Affairs
                </Link>
              </div>
            </div>
            
            <div className="lg:w-1/2 flex justify-center lg:justify-end">
              {currentPresident && (
                <div className="w-full max-w-sm">
                  <ProfileCard 
                    name={currentPresident.name}
                    subtitle={`FOCITSA ${currentPresident.role}`}
                    image={currentPresident.photo}
                    badge={currentPresident.department}
                    variant="student-frame"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* HALL OF FAME SECTION */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center max-w-3xl mx-auto flex flex-col gap-6 items-center">
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center">
              <Award size={32} />
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold font-heading text-slate-900 tracking-tight">
              Hall of Fame
            </h2>
            <p className="text-slate-600 leading-[1.7] text-lg">
              Welcome to the Hall of Fame. We are extremely proud to showcase the brilliant minds and amazing people who have redefined the technology landscape of Osun State University. Meet our Best Graduating Students!
            </p>
          </div>

          {hallOfFame && hallOfFame.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
              {hallOfFame.map(bgs => (
                <ProfileCard 
                  key={bgs.id}
                  name={bgs.name}
                  subtitle={bgs.level === 'faculty' ? `Overall Best Graduating Student (${bgs.year})` : `Best Graduating Student, ${bgs.department?.shortName || bgs.department?.name || 'Department'} (${bgs.year})`}
                  image={bgs.photo}
                  imagePosition="object-cover object-top"
                  badge={bgs.department}
                  variant={bgs.level === "faculty" ? "student-frame" : "default"}
                >
                  <div className="text-sm text-slate-600 space-y-2 mt-2">
                    <p><span className="font-semibold text-slate-900">CGPA:</span> <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">{bgs.cgpa}</span></p>
                    <p><span className="font-semibold text-slate-900">Matric No:</span> {bgs.matricNo}</p>
                    {bgs.bio && (
                      <button 
                        onClick={() => setSelectedBGS(bgs)}
                        className="w-full mt-3 inline-flex items-center justify-center px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-200 transition-colors"
                      >
                        Read more
                      </button>
                    )}
                  </div>
                </ProfileCard>
              ))}
            </div>
          )}
        </div>

        {/* BGS Modal */}
        {selectedBGS && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pt-16 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 mt-8 sm:mt-0">
              <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <h3 className="text-xl font-bold font-heading text-slate-900">About the BGS</h3>
                <button 
                  onClick={() => setSelectedBGS(null)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
                  <img 
                    src={selectedBGS.photo || "/default-avatar.jpg"} 
                    alt={selectedBGS.name} 
                    className="w-24 h-24 rounded-full object-cover object-top border-4 border-indigo-100 shadow-sm"
                  />
                  <div className="text-center sm:text-left">
                    <h4 className="text-lg font-bold text-slate-900 mb-1">{selectedBGS.name}</h4>
                    <p className="text-indigo-600 font-medium text-sm">{selectedBGS.award}</p>
                    <div className="flex flex-wrap gap-2 justify-center sm:justify-start mt-2">
                      <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded">CGPA: {selectedBGS.cgpa}</span>
                      <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded">{selectedBGS.department?.shortName || selectedBGS.department?.name || "Department"}</span>
                    </div>
                  </div>
                </div>
                <div className="prose prose-slate prose-sm text-slate-600">
                  <p className="leading-relaxed text-justify whitespace-pre-line">{selectedBGS.bio}</p>
                </div>
              </div>
              <div className="p-4 bg-slate-50 border-t border-slate-100 text-right">
                <button 
                  onClick={() => setSelectedBGS(null)}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* LIVE ANALYTICS (Plausible/Umami UI Integration) */}
      {/* Defensive Implementation: Section gracefully collapses if 3rd-party stats fail */}
      {visitorStats && (
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
            
            <div className="grid grid-cols-3 gap-2 md:gap-6 max-w-4xl mx-auto">
              <div className="bg-[#0a1142]/80 backdrop-blur-sm rounded-2xl p-4 md:p-8 border border-indigo-500/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] flex flex-col items-center justify-center text-center group hover:border-indigo-400/40 transition-colors">
                <Eye className="h-6 w-6 md:h-8 md:w-8 text-indigo-400 mb-2 md:mb-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                <div className="text-xl md:text-4xl font-mono font-bold text-white mb-1 md:mb-2 h-8 md:h-10 flex items-center justify-center">
                  <AnimatedCounter value={visitorStats.totalPageViews} start={animateVisitorStats} />
                </div>
                <div className="text-[10px] md:text-xs font-mono font-medium tracking-widest text-slate-400">TOTAL_VIEWS</div>
              </div>

              <div className="bg-[#0a1142]/80 backdrop-blur-sm rounded-2xl p-4 md:p-8 border border-teal-500/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] flex flex-col items-center justify-center text-center group hover:border-teal-400/40 transition-colors">
                <Calendar className="h-6 w-6 md:h-8 md:w-8 text-teal-400 mb-2 md:mb-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                <div className="text-xl md:text-4xl font-mono font-bold text-white mb-1 md:mb-2 h-8 md:h-10 flex items-center justify-center">
                  <AnimatedCounter value={visitorStats.monthlyVisitors} start={animateVisitorStats} />
                </div>
                <div className="text-[10px] md:text-xs font-mono font-medium tracking-widest text-slate-400">MONTHLY</div>
              </div>

              <div className="bg-[#0a1142]/80 backdrop-blur-sm rounded-2xl p-4 md:p-8 border border-amber-500/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] flex flex-col items-center justify-center text-center group hover:border-amber-400/40 transition-colors">
                <MousePointerClick className="h-6 w-6 md:h-8 md:w-8 text-amber-400 mb-2 md:mb-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                <div className="text-xl md:text-4xl font-mono font-bold text-white mb-1 md:mb-2 h-8 md:h-10 flex items-center justify-center">
                  <AnimatedCounter value={visitorStats.todaysVisits} start={animateVisitorStats} />
                </div>
                <div className="text-[10px] md:text-xs font-mono font-medium tracking-widest text-slate-400">TODAY</div>
              </div>
            </div>
            <div className="text-center mt-8 text-xs text-slate-400 font-medium tracking-wide">
              Metrics last updated: {new Date(visitorStats.lastUpdated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
