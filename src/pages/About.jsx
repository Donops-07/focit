import staticContent from "../data/staticContent.json";
import { ProfileCard } from "../components/ui/ProfileCard";

// --- SEO META ---
export const meta = () => {
  return [
    { title: "About Us | Faculty of Computing & Information Technology - UNIOSUN" },
    { name: "description", content: "Learn about the history, vision, and mission of the Faculty of Computing & Information Technology at Osun State University." },
    { property: "og:title", content: "About Us | FOCITSA UNIOSUN" }
  ];
};

// --- MAIN PAGE ---
export default function About() {
  const { about } = staticContent;

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl mb-4">
            About the Faculty
          </h1>
          <div className="w-24 h-1 bg-indigo-600 mx-auto rounded-full"></div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          
          <div className="relative h-64 sm:h-80 w-full">
            <img 
              src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1200&auto=format&fit=crop" 
              alt="University building" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end">
              <div className="p-8 text-white">
                <h2 className="text-2xl font-bold">Livingspring of Knowledge and Culture</h2>
                <p className="text-slate-200 mt-2">Osun State University, Osogbo, Nigeria</p>
              </div>
            </div>
          </div>

          <div className="p-8 sm:p-12">
            
            <section className="mb-12">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <span className="w-8 h-8 rounded bg-indigo-100 text-indigo-600 flex items-center justify-center mr-3 text-sm">01</span>
                Our History
              </h3>
              <div className="prose prose-slate max-w-none text-slate-600 space-y-4">
                {about.history.map((paragraph, index) => (
                  <p key={index} className="text-lg leading-relaxed">{paragraph}</p>
                ))}
              </div>
            </section>

            <hr className="border-slate-100 mb-12" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <section>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                  <span className="w-8 h-8 rounded bg-amber-100 text-amber-600 flex items-center justify-center mr-3 text-sm">02</span>
                  Our Vision
                </h3>
                <p className="text-lg text-slate-600 leading-relaxed bg-amber-50 p-6 rounded-xl border border-amber-100">
                  {about.vision}
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                  <span className="w-8 h-8 rounded bg-teal-100 text-teal-600 flex items-center justify-center mr-3 text-sm">03</span>
                  Our Mission
                </h3>
                <p className="text-lg text-slate-600 leading-relaxed bg-teal-50 p-6 rounded-xl border border-teal-100">
                  {about.mission}
                </p>
              </section>
            </div>

            <hr className="border-slate-100 my-12" />

            {/* LEADERSHIP SECTION */}
            <section>
              <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">
                Faculty Leadership
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                {about.leadership && Object.values(about.leadership).map((leader, idx) => (
                  <ProfileCard
                    key={idx}
                    name={leader.name}
                    subtitle={leader.title}
                    image={leader.photo}
                  />
                ))}
              </div>
            </section>

          </div>
        </div>

      </div>
    </div>
  );
}
