import { CheckCircle2, ChevronRight, FileText } from "lucide-react";
import staticContent from "../data/staticContent.json";

// --- SEO META ---
export const meta = () => {
  return [
    { title: "Admissions | Faculty of Computing & Information Technology - UNIOSUN" },
    { name: "description", content: "Review UTME and Direct Entry admission requirements for the Faculty of Computing & Information Technology." },
    { property: "og:title", content: "Admissions | FOCITSA UNIOSUN" }
  ];
};

// --- MAIN PAGE ---
export default function Admissions() {
  const { admissions } = staticContent;

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl mb-4">
            Admissions
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Join the next generation of tech innovators. Review our requirements and application procedures.
          </p>
        </div>

        <div className="space-y-12">

          {/* UTME Requirements */}
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
              <CheckCircle2 className="h-6 w-6 text-indigo-600 mr-2" />
              UTME Requirements
            </h2>
            <ul className="space-y-4">
              {admissions.utmeRequirements.map((req, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-slate-600 text-lg leading-relaxed">{req}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Direct Entry Requirements */}
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
              <CheckCircle2 className="h-6 w-6 text-indigo-600 mr-2" />
              Direct Entry Requirements
            </h2>
            <ul className="space-y-4">
              {admissions.directEntryRequirements.map((req, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-slate-600 text-lg leading-relaxed">{req}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Application Procedure */}
          <section className="bg-indigo-50 p-8 rounded-2xl shadow-sm border border-indigo-100">
            <h2 className="text-2xl font-bold text-indigo-900 mb-6 flex items-center">
              <FileText className="h-6 w-6 text-indigo-600 mr-2" />
              Application Procedure
            </h2>
            <div className="space-y-6">
              {admissions.applicationProcedure.map((step, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold mr-4">
                    {index + 1}
                  </div>
                  <p className="text-indigo-900 text-lg leading-relaxed pt-1">{step}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center sm:text-left">
              <a
                href="https://admissions.uniosun.edu.ng/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Go to Admissions Portal
                <ChevronRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
