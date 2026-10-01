import React, { Suspense } from "react";
import { useLoaderData, Await, Link } from "react-router-dom";
import { getDepartmentBasic, getDepartmentStaff, getRollOfHonour } from "../services/api";
import { ChevronRight, Users, BookOpen, FlaskConical, Award, X, ExternalLink } from "lucide-react";
import { ProfileCard } from "../components/ui/ProfileCard";
import { cn } from "../lib/utils";

// No external hero image assets needed; using inline SVG for zero-payload LCP

// ============================================================================
// LOADER & DEFERRED DATA
// ============================================================================

export async function departmentLoader({ params, request }) {
  // Await the critical path basic data for instant FCP
  const department = await getDepartmentBasic(params.slug, {
    signal: request.signal,
  });

  if (!department) {
    throw new Response("Department not found", { status: 404 });
  }

  // Do NOT await the slow relational join, pass the promise directly for streaming
  const staffPromise = getDepartmentStaff(params.slug, {
    limit: 8,
    signal: request.signal,
  });

  const rollOfHonourPromise = getRollOfHonour({ level: "department", departmentId: department.id }, {
    signal: request.signal,
  });

  // RR v7 removed defer(). Returning a plain object with an unresolved
  // promise is enough — the framework auto-detects it and streams to <Await>.
  return {
    department,
    staffPromise,
    rollOfHonourPromise,
  };
}

// ============================================================================
// COMPOSABLE SUB-COMPONENTS
// ============================================================================

function DepartmentHero({ department }) {
  return (
    <section 
      key={`hero-${department.slug}`}
      className="w-full pt-40 pb-24 md:pt-48 md:pb-32 bg-blue-darker relative overflow-hidden flex flex-col justify-center min-h-[60vh] lg:min-h-[75vh]"
    >
      {/* High-Performance CSS Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900 via-[#0a1142] to-slate-950"></div>
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,_transparent_1px)] [background-size:24px_24px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center relative">
          
          {/* Text Column - Solid White for Guaranteed Visibility */}
          <div className="lg:col-span-7 flex flex-col gap-6 z-10">
            <div className="flex items-center gap-2 text-sm text-cyan-400 font-semibold tracking-wide uppercase drop-shadow-md">
              <Link to="/departments" className="hover:text-cyan-300 transition-colors">Departments</Link>
              <ChevronRight size={14} className="opacity-70" />
              <span aria-current="page">{department.shortName}</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading text-white tracking-tight leading-[1.1] drop-shadow-lg">
              Department of <br className="hidden md:block" />
              <span className="text-blue-50">{department.name}</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100/90 font-light leading-relaxed max-w-2xl mt-2 drop-shadow-md">
              {department.vision}
            </p>
          </div>
          
          {/* Scalable SVG Geometric Graphic (Watermark on Mobile, Grid Accent on Desktop) */}
          <div className="absolute lg:relative -inset-10 lg:inset-auto z-0 lg:z-10 opacity-15 lg:opacity-100 lg:col-span-5 flex items-center justify-center pointer-events-none lg:pointer-events-auto overflow-hidden lg:overflow-visible">
            <div className="w-[150%] sm:w-full lg:w-full max-w-2xl mx-auto lg:max-w-none relative group">
              {/* Ambient Cyan Glow (Desktop only) */}
              <div className="hidden lg:block absolute inset-0 bg-cyan-500/20 blur-[100px] rounded-full group-hover:bg-cyan-400/30 transition-colors duration-700"></div>
              
              <div className="relative aspect-square w-full lg:opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700">
                <svg viewBox="0 0 400 400" className="w-full h-full text-cyan-400" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Connecting Lines */}
                  <path d="M100,100 L200,50 L300,150 L100,100 Z" stroke="currentColor" strokeWidth="1" className="opacity-30" />
                  <path d="M200,50 L350,80 L300,150 Z" stroke="currentColor" strokeWidth="1" className="opacity-30" />
                  <path d="M100,100 L50,200 L200,250 L300,150" stroke="currentColor" strokeWidth="1" className="opacity-30" />
                  <path d="M50,200 L150,350 L200,250 Z" stroke="currentColor" strokeWidth="1" className="opacity-30" />
                  <path d="M200,250 L300,320 L300,150 Z" stroke="currentColor" strokeWidth="1" className="opacity-30" />
                  <path d="M100,100 L200,250" stroke="currentColor" strokeWidth="1.5" className="opacity-60" />
                  <path d="M300,150 L200,250" stroke="currentColor" strokeWidth="1.5" className="opacity-60" />
                  
                  {/* Glowing Nodes */}
                  <circle cx="100" cy="100" r="4" fill="currentColor" />
                  <circle cx="200" cy="50" r="6" className="fill-blue-400" />
                  <circle cx="300" cy="150" r="5" className="fill-cyan-300" />
                  <circle cx="50" cy="200" r="4" className="fill-blue-500" />
                  <circle cx="200" cy="250" r="8" fill="currentColor" className="drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
                  <circle cx="150" cy="350" r="5" className="fill-blue-400" />
                  <circle cx="350" cy="80" r="3" className="fill-cyan-500" />
                  <circle cx="300" cy="320" r="6" className="fill-cyan-300" />
                </svg>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

function DepartmentOverview({ department }) {
  return (
    <section key={`overview-${department.slug}`} className="animate-slide-up-fade w-full py-20 md:py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-16 lg:gap-24">
          
          {/* Main Text Content - Internal Typographic Rhythm via flex gap */}
          <div className="md:col-span-2 flex flex-col gap-6 prose prose-lg prose-blue max-w-none">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-blue-dark">
              About the Department
            </h2>
            <p className="text-gray-700 leading-[1.7] text-lg">
              {department.description}
            </p>
            
            <h3 className="text-2xl md:text-3xl font-bold font-heading text-blue-dark pt-6">
              Academic Programmes
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {department.programmes.map((prog, idx) => {
                const name = typeof prog === 'string' ? prog : prog.name;
                const handbookUrl = typeof prog === 'string' ? "#" : prog.handbookUrl;
                const reqsUrl = typeof prog === 'string' ? "https://admissions.uniosun.edu.ng" : prog.requirementsUrl;
                return (
                  <div key={idx} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col gap-4">
                    <h4 className="font-bold text-slate-900">{name}</h4>
                    <div className="flex flex-wrap gap-3 mt-auto">
                      <a href={handbookUrl} download className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1">
                        Download Handbook
                      </a>
                      <a href={reqsUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors inline-flex items-center gap-1">
                        Entry Requirements <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Quick Stats Sidebar */}
          <div className="bg-surface-alt p-10 md:p-12 rounded-2xl border border-border h-fit shadow-sm">
            <h3 className="text-xl font-bold font-heading text-blue-dark mb-8">Quick Stats</h3>
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full bg-blue-lightest text-blue-primary flex items-center justify-center shrink-0">
                  <Users size={24} />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-2xl font-bold leading-none">{department.staffCount || 0}</div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Faculty Members</div>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full bg-purple-lightest text-purple-dark flex items-center justify-center shrink-0">
                  <BookOpen size={24} />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-2xl font-bold leading-none">{department.programmes.length}</div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Programmes</div>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                  <FlaskConical size={24} />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-2xl font-bold leading-none">2</div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Laboratories</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function extractInitials(name) {
  if (!name || typeof name !== 'string') return "";
  let clean = name.replace(/\([^)]*\)/g, "");
  clean = clean.replace(/\b(?:Prof|Dr|Mr|Mrs|Ms|Rt\.\s?Hon|Sen|Comrade|Engr|Arch)\b\.?\s*/gi, "");
  const tokens = clean.trim().split(/\s+/).filter(Boolean);
  const first = tokens[0] ? tokens[0].charAt(0).toUpperCase() : "";
  const second = tokens[1] ? tokens[1].charAt(0).toUpperCase() : "";
  return first + second;
}

function StaffCard({ member, departmentSlug }) {
  const [imgStatus, setImgStatus] = React.useState('loading');
  return (
        <div className="group flex flex-col bg-surface border border-border rounded-2xl overflow-hidden hover:border-blue-light hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <Link to={`/departments/${departmentSlug}/staff/${member.slug}`} className="block relative aspect-square sm:aspect-[4/3] bg-gray-100 overflow-hidden group-hover:bg-blue-50 transition-colors">
            {imgStatus !== 'error' && (
              <img 
                src={member.profileImageUrl || "/default-avatar.jpg"} 
                alt={member.name}
                onLoad={() => setImgStatus('loaded')}
                onError={() => setImgStatus('error')}
                className={cn("absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-300", imgStatus === 'loaded' ? 'opacity-100' : 'opacity-0')}
              />
            )}
            {imgStatus !== 'loaded' && (
              <div className="absolute inset-0 flex items-center justify-center bg-blue-lightest/50 text-blue-primary text-5xl font-bold group-hover:scale-110 transition-transform duration-500" aria-hidden="true">
                {extractInitials(member.name)}
              </div>
            )}
          </Link>
          <div className="p-8 flex flex-col flex-1">
            <Link to={`/departments/${departmentSlug}/staff/${member.slug}`}>
              <h4 className="font-bold text-gray-900 text-xl group-hover:text-blue-primary transition-colors line-clamp-1 mb-2">
                {member.name}
              </h4>
            </Link>
            <p className="text-sm text-blue-primary/80 font-semibold mb-5">{member.title}</p>
            <div className="text-sm text-gray-500 line-clamp-3 leading-relaxed mb-6">
              <span className="font-semibold text-gray-700">Interests:</span> {member.researchInterests?.join(", ")}
            </div>
            <a
              href={`https://uniosun.edu.ng/staff/${member.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View official university profile of ${member.name}`}
              className="mt-auto inline-flex items-center justify-center px-4 py-2 bg-blue-50 text-blue-primary rounded-lg text-sm font-bold hover:bg-blue-100 transition-colors"
            >
              See Official Profile
            </a>
          </div>
        </div>
  );
}

function StaffGrid({ staffResponse, departmentSlug, fallbackStaffCount }) {
  // Handle both raw array (mock) or paginated envelope (API)
  const staffArray = Array.isArray(staffResponse) ? staffResponse : (staffResponse?.data || []);
  const totalCount = staffResponse?.meta?.totalCount || fallbackStaffCount || staffArray.length;

  if (!staffArray || staffArray.length === 0) {
    return (
      <div className="text-center py-16 bg-surface-alt rounded-2xl border border-border">
        <p className="text-gray-500 text-lg">No staff members found for this department.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-12">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {staffArray.map((member) => (
          <StaffCard key={member.id} member={member} departmentSlug={departmentSlug} />
        ))}
      </div>
      <div className="text-center">
        <Link 
          to={`/departments/${departmentSlug}/staff`} 
          className="inline-flex items-center justify-center px-8 py-3 bg-blue-dark text-white rounded-xl font-bold hover:bg-blue-primary transition-colors shadow-md hover:shadow-lg"
        >
          View all {totalCount} Faculty Members
        </Link>
      </div>
    </div>
  );
}

function StaffGridSkeleton() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-surface border border-border rounded-2xl overflow-hidden animate-pulse">
          <div className="aspect-square sm:aspect-[4/3] bg-gray-200"></div>
          <div className="p-8 space-y-3">
            <div className="h-5 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-3 bg-gray-200 rounded w-full mt-4"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

function DepartmentRollOfHonour({ rollOfHonour }) {
  const [selectedAlumnus, setSelectedAlumnus] = React.useState(null);

  if (!rollOfHonour || rollOfHonour.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-white border-t border-border py-20 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center max-w-2xl mx-auto flex flex-col gap-6 items-center">
          <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center">
            <Award size={32} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-blue-dark">
            Department Hall of Fame
          </h2>
          <p className="text-gray-600 leading-[1.7] text-lg">
            Celebrating the Best Graduating Students who have set the standard for academic excellence in our department.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
          {rollOfHonour.map((alumnus) => (
            <ProfileCard 
              key={alumnus.id}
              name={alumnus.name}
              subtitle={`${alumnus.award} (${alumnus.year})`}
              image={alumnus.photo}
            >
              <div className="text-sm text-slate-600 space-y-1">
                <p><span className="font-semibold text-slate-900">Matric No:</span> {alumnus.matricNo}</p>
                <p><span className="font-semibold text-slate-900">CGPA:</span> {alumnus.cgpa}</p>
                {alumnus.bio && (
                  <button 
                    onClick={() => setSelectedAlumnus(alumnus)}
                    aria-label={`Read full biography of ${alumnus.name}`}
                    className="w-full mt-3 inline-flex items-center justify-center px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-bold hover:bg-indigo-100 transition-colors"
                  >
                    Read more
                  </button>
                )}
              </div>
            </ProfileCard>
          ))}
        </div>
      </div>

      {/* BGS Modal */}
      {selectedAlumnus && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pt-16 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 mt-8 sm:mt-0">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h3 className="text-xl font-bold font-heading text-slate-900">About the BGS</h3>
              <button 
                onClick={() => setSelectedAlumnus(null)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
                <img 
                  src={selectedAlumnus.photo || "/default-avatar.jpg"} 
                  alt={selectedAlumnus.name} 
                  className="w-24 h-24 rounded-full object-cover object-top border-4 border-indigo-100 shadow-sm"
                />
                <div className="text-center sm:text-left">
                  <h4 className="text-lg font-bold text-slate-900 mb-1">{selectedAlumnus.name}</h4>
                  <p className="text-indigo-600 font-medium text-sm">{selectedAlumnus.award}</p>
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start mt-2">
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded">CGPA: {selectedAlumnus.cgpa}</span>
                  </div>
                </div>
              </div>
              <div className="prose prose-slate prose-sm text-slate-600">
                <p className="leading-relaxed text-justify whitespace-pre-line">{selectedAlumnus.bio}</p>
              </div>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100 text-right">
              <button 
                onClick={() => setSelectedAlumnus(null)}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function DepartmentTemplate() {
  const { department, staffPromise, rollOfHonourPromise } = useLoaderData();

  return (
    <div className="min-h-screen flex flex-col">
      {/* 1. Critical Path (FCP) — Hero & Overview render instantly */}
      <DepartmentHero department={department} />
      <DepartmentOverview department={department} />

      {/* 2. Staff Directory — Heavy relational join streamed via <Await> */}
      <section className="w-full bg-surface-alt border-t border-border py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center max-w-2xl mx-auto flex flex-col gap-6">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-blue-dark">
              Faculty & Staff
            </h2>
            <p className="text-gray-600 leading-[1.7] text-lg">
              Meet our distinguished professors, researchers, and dedicated staff members who drive the academic excellence of the department.
            </p>
          </div>

          <Suspense fallback={<StaffGridSkeleton />}>
            <Await 
              resolve={staffPromise}
              errorElement={<div className="text-red-600 text-center py-10 font-bold border border-red-200 bg-red-50 rounded-2xl">Failed to load staff directory.</div>}
            >
              {(staffResponse) => <StaffGrid staffResponse={staffResponse} departmentSlug={department.slug} fallbackStaffCount={department.staffCount} />}
            </Await>
          </Suspense>
        </div>
      </section>

      {/* 3. Roll of Honour — Streamed via <Await> */}
      <Suspense fallback={<div className="h-96 flex items-center justify-center bg-white border-t border-border">Loading Hall of Fame...</div>}>
        <Await 
          resolve={rollOfHonourPromise}
          errorElement={null}
        >
          {(rollOfHonour) => <DepartmentRollOfHonour rollOfHonour={rollOfHonour} />}
        </Await>
      </Suspense>

    </div>
  );
}
