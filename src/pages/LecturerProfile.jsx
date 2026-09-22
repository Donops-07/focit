import { Suspense } from "react";
import { useLoaderData, Await, Link } from "react-router-dom";
import { getLecturerBasic, getLecturerDetails } from "../services/api";
import { ChevronLeft, Mail, BookOpen, GraduationCap, Award, FileText } from "lucide-react";

// ============================================================================
// LOADER
// ============================================================================

export async function lecturerLoader({ params, request }) {
  // 1. Await the fast, critical data to guarantee the Hero renders instantly (FCP)
  const basicInfo = await getLecturerBasic(params.staffSlug, {
    signal: request.signal,
  });

  if (!basicInfo) {
    throw new Response("Lecturer not found", { status: 404 });
  }

  // 2. Stream the slow, heavy relational data
  const detailsPromise = getLecturerDetails(params.staffSlug, {
    signal: request.signal,
  });

  return {
    basicInfo,
    detailsPromise,
  };
}

// ============================================================================
// SKELETON
// ============================================================================

function LecturerDetailsSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-3 gap-10 animate-pulse">
        {/* Main Content (Bio & Publications) */}
        <div className="lg:col-span-2 space-y-10">
          <div>
            <div className="h-8 bg-gray-200 rounded w-48 mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-11/12"></div>
              <div className="h-4 bg-gray-200 rounded w-4/5"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
          
          <div>
            <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
            <div className="space-y-4">
              <div className="h-20 bg-gray-200 rounded-lg w-full"></div>
              <div className="h-20 bg-gray-200 rounded-lg w-full"></div>
              <div className="h-20 bg-gray-200 rounded-lg w-full"></div>
            </div>
          </div>
        </div>

        {/* Sidebar (Interests & Courses) */}
        <div className="space-y-8">
          <div className="bg-gray-100 rounded-2xl h-48 w-full border border-gray-200"></div>
          <div className="bg-gray-100 rounded-2xl h-64 w-full border border-gray-200"></div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function LecturerProfile() {
  const { basicInfo: lecturer, detailsPromise } = useLoaderData();

  return (
    <div className="min-h-screen pb-28 bg-surface">
      
      {/* -------------------------------------------------------------
          CRITICAL PATH: Synchronous Render for FCP
          ------------------------------------------------------------- */}
          
      {/* Header / Back Link */}
      <div className="bg-surface-alt border-b border-border py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to={`/departments/${lecturer.departmentSlug}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-primary transition-colors"
          >
            <ChevronLeft size={16} />
            Back to {lecturer.departmentName}
          </Link>
        </div>
      </div>

      {/* Profile Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16">
        <div className="bg-white rounded-2xl shadow-sm border border-border p-8 md:p-14">
          <div className="flex flex-col md:flex-row gap-10 items-start">
            {/* Avatar */}
            <div className="shrink-0">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-2xl bg-blue-lightest text-blue-primary flex items-center justify-center text-5xl md:text-7xl font-bold">
                {lecturer.name.charAt(0)}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="inline-block px-3 py-1 rounded-full bg-blue-lightest text-blue-dark text-xs font-bold uppercase tracking-wider mb-4">
                {lecturer.departmentName}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-2">
                {lecturer.name}
              </h1>
              <p className="text-xl text-gray-600 font-medium mb-6">
                {lecturer.title}
              </p>

              <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
                <div className="flex items-center gap-3">
                  <GraduationCap className="text-blue-primary shrink-0" size={18} />
                  <span>{lecturer.qualifications}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="text-blue-primary shrink-0" size={18} />
                  <a href={`mailto:${lecturer.email}`} className="hover:text-blue-primary hover:underline transition-all">
                    {lecturer.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------
          DEFERRED PATH: Streamed Relational Data
          ------------------------------------------------------------- */}
          
      <Suspense fallback={<LecturerDetailsSkeleton />}>
        <Await
          resolve={detailsPromise}
          errorElement={
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-red-50 border border-red-200 text-red-700 p-8 rounded-2xl text-center shadow-sm">
                <h3 className="font-bold text-xl mb-2">Data Unavailable</h3>
                <p>Failed to load the lecturer's extended profile details. Please try refreshing.</p>
              </div>
            </div>
          }
        >
          {(details) => {
            if (!details) return null;
            
            return (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in duration-500">
                <div className="grid lg:grid-cols-3 gap-10">
                  {/* Main Content (Bio & Publications) */}
                  <div className="lg:col-span-2 space-y-10">
                    <section>
                      <h2 className="text-2xl font-bold font-heading text-blue-dark flex items-center gap-2 mb-4">
                        <FileText className="text-blue-primary" /> Biography
                      </h2>
                      <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed">
                        <p>{details.bio}</p>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-2xl font-bold font-heading text-blue-dark flex items-center gap-2 mb-4">
                        <Award className="text-blue-primary" /> Selected Publications
                      </h2>
                      {details.publications && details.publications.length > 0 ? (
                        <ul className="space-y-4">
                          {details.publications.map((pub, idx) => (
                            <li key={idx} className="p-4 rounded-lg bg-surface-alt border border-border">
                              <p className="text-gray-800">{pub}</p>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-500 italic">No publications listed yet.</p>
                      )}
                    </section>
                  </div>

                  {/* Sidebar (Interests & Courses) */}
                  <div className="space-y-8">
                    <div className="bg-surface-alt rounded-2xl p-8 border border-border">
                      <h3 className="text-lg font-bold font-heading text-gray-900 mb-4 flex items-center gap-2">
                        <FlaskConical className="text-blue-primary shrink-0" size={20} />
                        Research Interests
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {details.researchInterests?.map((interest, idx) => (
                          <span key={idx} className="px-3 py-1 bg-white border border-border rounded-full text-sm text-gray-700 shadow-sm">
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-surface-alt rounded-2xl p-8 border border-border">
                      <h3 className="text-lg font-bold font-heading text-gray-900 mb-4 flex items-center gap-2">
                        <BookOpen className="text-blue-primary shrink-0" size={20} />
                        Courses Taught
                      </h3>
                      <ul className="space-y-3">
                        {details.courses?.map((course, idx) => (
                          <li key={idx} className="flex gap-3 text-sm text-gray-700 items-start">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-primary mt-1.5 shrink-0"></span>
                            <span>{course}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
}

// Simple internal icon fallback since FlaskConical wasn't imported from lucide-react in this file
function FlaskConical(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M10 2v7.31M14 9.31V2M8.5 2h7M14 9.31l6.4 9.6A2 2 0 0 1 18.73 22H5.27a2 2 0 0 1-1.66-3.09L10 9.31M5 16h14"/>
    </svg>
  );
}
