import { useLoaderData, Link } from "react-router-dom";
import { ArrowRight, BookOpen, GraduationCap, Laptop, ChevronRight } from "lucide-react";
import { getHomeDashboard } from "../services/api";
import { ProfileCard } from "../components/ui/ProfileCard";
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
  const { latestFeed, featuredProjects, currentPresident, bestGraduatingStudent } = useLoaderData();

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* HERO SECTION */}
      <section className="relative bg-slate-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1600&auto=format&fit=crop"
            alt="University Campus"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 drop-shadow-lg">
            Faculty of Computing <br/> <span className="text-indigo-400">& Information Technology</span>
          </h1>
          <p className="mt-4 text-xl max-w-3xl mx-auto text-slate-300 mb-10 drop-shadow">
            Osun State University (UNIOSUN) — "Livingspring of Knowledge and Culture". 
            Empowering the next generation of global tech leaders.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/departments"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Explore Departments
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/admissions"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm"
            >
              Admissions
            </Link>
          </div>
        </div>
      </section>

      {/* QUICK LINKS SECTION */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-xl border border-slate-100 hover:shadow-md transition-shadow">
              <div className="p-3 bg-indigo-100 text-indigo-600 rounded-full mb-4">
                <Laptop className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">7 Departments</h3>
              <p className="text-slate-600 mb-4">From Computer Science to Cyber Security and Data Science, explore our specialized IT programs.</p>
              <Link to="/departments" className="text-indigo-600 font-medium hover:text-indigo-800 flex items-center mt-auto">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-xl border border-slate-100 hover:shadow-md transition-shadow">
              <div className="p-3 bg-amber-100 text-amber-600 rounded-full mb-4">
                <GraduationCap className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Alumni Network</h3>
              <p className="text-slate-600 mb-4">Connect with graduates, find mentorship, and give back to the next generation of tech talent.</p>
              <Link to="/alumni" className="text-amber-600 font-medium hover:text-amber-800 flex items-center mt-auto">
                Join Network <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-xl border border-slate-100 hover:shadow-md transition-shadow">
              <div className="p-3 bg-teal-100 text-teal-600 rounded-full mb-4">
                <BookOpen className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Research & Projects</h3>
              <p className="text-slate-600 mb-4">Browse our repository of faculty research publications and outstanding student capstone projects.</p>
              <Link to="/research" className="text-teal-600 font-medium hover:text-teal-800 flex items-center mt-auto">
                View Repository <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT FACULTY SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-indigo-900 rounded-3xl overflow-hidden shadow-xl">
            <div className="grid md:grid-cols-2">
              <div className="p-10 md:p-16 flex flex-col justify-center text-white">
                <div className="mb-4 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-800 text-indigo-100 uppercase tracking-wide">
                  Who We Are
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold mb-6 font-heading">About the Faculty</h2>
                <p className="text-indigo-100 text-lg leading-relaxed mb-8 font-light">
                  {staticContent.about.history[0]} {staticContent.about.vision}
                </p>
                <div>
                  <Link
                    to="/about"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-bold rounded-md text-indigo-900 bg-white hover:bg-indigo-50 transition-colors shadow-sm"
                  >
                    Read Full History <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
              <div className="relative h-64 md:h-auto hidden md:block">
                <img 
                  src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop" 
                  alt="Faculty Building" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-indigo-900/40 mix-blend-multiply"></div>
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
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Latest News & Events</h2>
                <Link to="/news" className="text-indigo-600 font-medium hover:text-indigo-800 flex items-center">
                  See all <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              
              <div className="space-y-6">
                {latestFeed.map(item => (
                  <div key={item.id} className="flex flex-col sm:flex-row bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200">
                    <div className="sm:w-48 h-48 sm:h-auto flex-shrink-0 relative">
                      <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-6 flex flex-col justify-center">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {item.tags.map(tag => (
                          <span key={tag.slug} className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border border-slate-200 text-slate-700 bg-slate-50`}>
                            {tag.name}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                      <p className="text-slate-600 text-sm mb-4 line-clamp-2">{item.summary}</p>
                      <Link to="/news" className="text-indigo-600 font-medium text-sm hover:underline mt-auto">
                        Read more
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Projects (1 column) */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-slate-900">Featured Projects</h2>
                <Link to="/projects" className="text-indigo-600 font-medium hover:text-indigo-800 text-sm flex items-center">
                  See all
                </Link>
              </div>
              
              <div className="space-y-4">
                {featuredProjects.map(project => (
                  <div key={project.id} className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 hover:border-indigo-300 transition-colors">
                    <h3 className="font-bold text-slate-900 mb-1 leading-tight">{project.title}</h3>
                    <p className="text-sm text-slate-500 mb-3">By {project.student} • {project.year}</p>
                    <span className="inline-block bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded">
                      {project.department.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                ))}
                
                <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 text-center mt-6">
                  <h4 className="font-bold text-indigo-900 mb-2">Student Projects Portal</h4>
                  <p className="text-sm text-indigo-700 mb-4">Browse hundreds of final year projects and capstone research papers.</p>
                  <Link to="/projects" className="inline-flex justify-center w-full px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700">
                    Browse Repository
                  </Link>
                </div>
              </div>

              {/* FOCITSA Snippet */}
              <div className="mt-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-slate-900">Student Union</h2>
                </div>
                {currentPresident && (
                  <ProfileCard 
                    name={currentPresident.name}
                    subtitle={`FOCITSA ${currentPresident.role}`}
                    image={currentPresident.photo}
                    badge={currentPresident.department}
                    variant="student-frame"
                  >
                    <Link to="/focitsa" className="mt-2 inline-flex justify-center w-full px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors">
                      View Union Portal
                    </Link>
                  </ProfileCard>
                )}
              </div>

              {/* Best Graduating Student */}
              <div className="mt-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-slate-900">Academic Excellence</h2>
                </div>
                {bestGraduatingStudent && (
                  <ProfileCard 
                    name={bestGraduatingStudent.name}
                    subtitle={`${bestGraduatingStudent.award} (${bestGraduatingStudent.year})`}
                    image={bestGraduatingStudent.photo}
                    badge={bestGraduatingStudent.department}
                    variant="student-frame"
                  >
                    <div className="mt-2 text-center text-sm font-medium text-slate-700 bg-slate-50 py-2 rounded-lg border border-slate-100 mb-2">
                      CGPA: {bestGraduatingStudent.cgpa}
                    </div>
                  </ProfileCard>
                )}
              </div>

            </div>
            
          </div>
        </div>
      </section>
      
    </div>
  );
}
