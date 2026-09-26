import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  HeartHandshake, 
  Lightbulb, 
  Dumbbell, 
  BookOpen, 
  Code,
  ArrowRight,
  ShieldCheck,
  Zap,
  Coffee
} from "lucide-react";

export const meta = () => {
  return [
    { title: "Student Affairs & Welfare | FOCITSA - UNIOSUN" },
    { name: "description", content: "Discover the resources, support, and activities provided by the FOCITSA Student Affairs Unit, including welfare, social, sports, academic, and software development." },
  ];
};

export default function StudentAffairs() {
  const [activeTab, setActiveTab] = useState("welfare");

  const services = {
    welfare: {
      title: "Welfare & Amenities",
      icon: <HeartHandshake className="w-8 h-8 text-rose-500" />,
      director: "Welfare Director",
      description: "Dedicated to ensuring a conducive environment for learning and living on campus.",
      benefits: [
        "Adequate supply of water, electricity, and good food on campus",
        "Reliable campus transportation logistics",
        "Environmental sanitation and basic medical health care",
        "Maintenance of the FOCIT Building and facilities",
        "Monitoring of faculty mini-marts and business ventures for fair pricing",
      ]
    },
    social: {
      title: "Social & Cultural Life",
      icon: <Coffee className="w-8 h-8 text-amber-500" />,
      director: "Social Director",
      description: "Promoting social interaction, cultural heritage, and recreational balance.",
      benefits: [
        "Organization of all faculty social activities and events",
        "Provision and maintenance of recreational facilities",
        "Custodian and promoter of the faculty's cultural heritage",
        "Safety and security coordination at all social functions",
        "Faculty Week planning and execution"
      ]
    },
    sports: {
      title: "Sports & Athletics",
      icon: <Dumbbell className="w-8 h-8 text-emerald-500" />,
      director: "Sports Director",
      description: "Fostering physical fitness, teamwork, and healthy competition.",
      benefits: [
        "Annual Intra-Faculty & Departmental Football Tournaments",
        "Competitions in Volleyball, Basketball, and Table Tennis",
        "Custodian of all faculty sporting facilities and equipment",
        "Representation in the University Sport Council",
        "Provision of modern sporting equipment"
      ]
    },
    academic: {
      title: "Academic Support",
      icon: <BookOpen className="w-8 h-8 text-blue-500" />,
      director: "Academic Director",
      description: "Providing the academic backbone to help every student achieve excellence.",
      benefits: [
        "Coordination of Faculty Tutorial classes across all levels",
        "Collation and distribution of past questions and study materials",
        "Direct guidance and mentorship for academic challenges",
        "Advocacy for conducive academic environments",
        "Representation of student academic problems to faculty committees"
      ]
    },
    software: {
      title: "Tech & Software Development",
      icon: <Code className="w-8 h-8 text-indigo-500" />,
      director: "Software Director",
      description: "Equipping students with industry-ready tech skills and opportunities.",
      benefits: [
        "Organizing hands-on coding training and bootcamps",
        "Facilitating tech programs, hackathons, and seminars",
        "Connecting students with external tech internships and opportunities",
        "Development of software solutions for the faculty",
        "Peer-to-peer code review and mentorship networks"
      ]
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative bg-[#070c2e] text-white overflow-hidden py-24">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#040617] to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-500/20 backdrop-blur-md rounded-2xl mb-6 border border-indigo-500/30">
            <ShieldCheck className="w-8 h-8 text-indigo-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 font-heading">
            Student <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-300">Affairs & Welfare</span>
          </h1>
          <p className="mt-4 text-xl max-w-3xl mx-auto text-slate-300">
            FOCITSA is committed to your holistic development. Discover the resources, support, and activities provided by your Student Union Executive Council.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Sidebar Navigation */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-2 pl-4">FOCITSA Services</h3>
              {Object.entries(services).map(([key, service]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`flex items-center text-left p-4 rounded-xl transition-all duration-200 border ${
                    activeTab === key 
                      ? "bg-white shadow-md border-indigo-200" 
                      : "bg-transparent border-transparent hover:bg-slate-100"
                  }`}
                >
                  <div className={`p-2 rounded-lg mr-4 ${activeTab === key ? "bg-slate-50" : "bg-white shadow-sm"}`}>
                    {service.icon}
                  </div>
                  <div>
                    <div className={`font-bold ${activeTab === key ? "text-indigo-900" : "text-slate-700"}`}>
                      {service.title}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">Via {service.director}</div>
                  </div>
                  {activeTab === key && <ArrowRight className="w-5 h-5 ml-auto text-indigo-400" />}
                </button>
              ))}
            </div>

            {/* Active Content Display */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-12 transition-all duration-500 animate-in slide-in-from-right-4 fade-in">
                <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-100">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    {services[activeTab].icon}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900 font-heading mb-2">
                      {services[activeTab].title}
                    </h2>
                    <p className="text-slate-600 text-lg">
                      {services[activeTab].description}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber-500" /> 
                    What you get from the {services[activeTab].director}:
                  </h3>
                  <ul className="space-y-4">
                    {services[activeTab].benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center mt-0.5 mr-4">
                          <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                        </div>
                        <span className="text-slate-700 text-lg leading-relaxed">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-12 p-6 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Need to reach the {services[activeTab].director}?</h4>
                    <p className="text-sm text-slate-600">Contact the FOCITSA Secretariat or visit the Faculty Office.</p>
                  </div>
                  <Link to="/focitsa" className="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors whitespace-nowrap">
                    View Executives
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
