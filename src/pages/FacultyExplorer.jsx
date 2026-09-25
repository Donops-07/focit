import { useLoaderData, Link } from "react-router-dom";
import { 
  Building2, 
  FlaskConical, 
  Users, 
  GraduationCap, 
  FileText,
  ArrowRight,
  Cpu,
  Shield,
  TerminalSquare,
  Database,
  Wifi,
  Monitor
} from "lucide-react";
import { getAllDepartments, getFacultyLabs } from "../services/api";
import staticContent from "../data/staticContent.json";

export const meta = () => {
  return [
    { title: "Explore the Faculty | FOCITSA - UNIOSUN" },
    { name: "description", content: "Discover our departments, cutting-edge labs, and vibrant academic ecosystem." }
  ];
};

export async function explorerLoader({ request }) {
  const [departments, labs] = await Promise.all([
    getAllDepartments({ signal: request.signal }),
    getFacultyLabs({ signal: request.signal })
  ]);
  
  return { departments, labs };
}

// Icon mapper for dynamic icons from data
const IconMapper = ({ name, className }) => {
  const icons = {
    Cpu, Shield, TerminalSquare, Database, Wifi, Monitor,
    ShieldAlert: Shield, Code: TerminalSquare, LineChart: Database, BookOpen: FileText, Network: Wifi
  };
  const IconComponent = icons[name] || Building2;
  return <IconComponent className={className} />;
};

export default function FacultyExplorer() {
  const { departments, labs } = useLoaderData();
  const leadership = staticContent.about.leadership.dean;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      
      {/* Hero Header */}
      <section className="bg-slate-900 text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight font-heading">
            Campus <span className="text-indigo-400">Explorer</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto font-light">
            Navigate through our 7 specialized departments and 5 cutting-edge research laboratories.
          </p>
        </div>
      </section>

      {/* Departments Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-3 bg-indigo-100 text-indigo-700 rounded-lg">
              <Building2 className="h-6 w-6" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 font-heading">Academic Departments</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {departments.map(dept => (
              <Link 
                key={dept.id} 
                to={`/departments/${dept.slug}`}
                className="group flex flex-col bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-indigo-300 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-${dept.color}-50 text-${dept.color}-600 group-hover:bg-${dept.color}-100 transition-colors`}>
                    <IconMapper name={dept.icon} className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-bold text-slate-400 group-hover:text-indigo-600 transition-colors">
                    {dept.shortName}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-700 transition-colors">
                  {dept.name}
                </h3>
                <p className="text-slate-500 text-sm mt-auto">
                  {dept.studentCount} Active Students
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Laboratories Section */}
      <section className="py-16 md:py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-3 bg-teal-100 text-teal-700 rounded-lg">
              <FlaskConical className="h-6 w-6" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 font-heading">Research Laboratories</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {labs.map(lab => (
              <div key={lab.id} className="bg-slate-50 border border-slate-100 rounded-2xl p-8 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-white rounded-xl shadow-sm text-teal-600">
                    <IconMapper name={lab.icon} className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-slate-900">{lab.name}</h3>
                    <span className="text-sm font-medium text-teal-600">{lab.shortName}</span>
                  </div>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {lab.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership & Ecosystem Links */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* Leadership Profile */}
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100">
              <div className="flex items-center gap-2 text-amber-600 font-bold mb-6 text-sm uppercase tracking-wider">
                <Users className="h-4 w-4" /> Faculty Leadership
              </div>
              <div className="flex flex-col sm:flex-row gap-8 items-start">
                <img 
                  src={leadership.photo} 
                  alt={leadership.name} 
                  className="w-32 h-32 rounded-2xl object-cover shadow-md border-4 border-white"
                />
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-1">{leadership.name}</h3>
                  <p className="text-indigo-600 font-medium mb-4">{leadership.title}</p>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {leadership.bio}
                  </p>
                </div>
              </div>
            </div>

            {/* Ecosystem Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link to="/admissions" className="group flex items-center p-6 bg-white border border-slate-200 rounded-2xl hover:border-indigo-600 hover:shadow-md transition-all">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-lg mr-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900">Admissions</h4>
                  <p className="text-xs text-slate-500">Join the faculty</p>
                </div>
                <ArrowRight className="h-5 w-5 text-slate-300 group-hover:text-indigo-600 transition-colors" />
              </Link>
              
              <Link to="/research" className="group flex items-center p-6 bg-white border border-slate-200 rounded-2xl hover:border-indigo-600 hover:shadow-md transition-all">
                <div className="p-3 bg-purple-50 text-purple-600 rounded-lg mr-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <FileText className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900">Research</h4>
                  <p className="text-xs text-slate-500">Publications</p>
                </div>
                <ArrowRight className="h-5 w-5 text-slate-300 group-hover:text-indigo-600 transition-colors" />
              </Link>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
