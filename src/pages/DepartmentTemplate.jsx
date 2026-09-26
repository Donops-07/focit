import React, { Suspense } from "react";
import { useLoaderData, Await, Link } from "react-router-dom";
import { getDepartmentBasic, getDepartmentStaff, getRollOfHonour } from "../services/api";
import { ChevronRight, Users, BookOpen, FlaskConical, Award } from "lucide-react";
import { ProfileCard } from "../components/ui/ProfileCard";
import { cn } from "../lib/utils";

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
      className="animate-slide-up-fade w-full pt-44 pb-28 md:pt-48 md:pb-32 relative overflow-hidden text-white"
    >
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/focit-main-building.png")' }}
      ></div>
      
      {/* Blue overlay — translucent so the building image shows through */}
      <div className="absolute inset-0 bg-blue-900/70 mix-blend-multiply"></div>
      <div className="absolute inset-0 bg-[#0a1142]/60"></div>
      
      {/* Inner wrapper: constrained to match navbar/footer alignment */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center gap-2 text-sm text-blue-lightest mb-8 opacity-70">
          <Link to="/departments" className="hover:text-white transition-colors">Departments</Link>
          <ChevronRight size={14} />
          <span>{department.shortName}</span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6">
          Department of {department.name}
        </h1>
        <p className="text-xl md:text-2xl text-blue-lightest max-w-3xl font-light leading-relaxed">
          {department.vision}
        </p>
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
            <ul className="list-disc pl-6 flex flex-col gap-3 text-gray-700 leading-[1.7] text-lg">
              {department.programmes.map((prog, idx) => (
                <li key={idx}>{prog}</li>
              ))}
            </ul>
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

function StaffGrid({ staff, departmentSlug }) {
  if (!staff || staff.length === 0) {
    return (
      <div className="text-center py-16 bg-surface-alt rounded-2xl border border-border">
        <p className="text-gray-500 text-lg">No staff members found for this department.</p>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {staff.map((member) => (
        <a
          key={member.id}
          href={`https://uniosun.edu.ng/staff/${member.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-surface border border-border rounded-2xl overflow-hidden hover:border-blue-light hover:shadow-xl hover:-translate-y-1 transition-all duration-300 block"
        >
          <div className="aspect-square sm:aspect-[4/3] bg-gray-100 relative overflow-hidden group-hover:bg-blue-50 transition-colors">
            {/* Fallback avatar block */}
            <div className="absolute inset-0 flex items-center justify-center bg-blue-lightest/50 text-blue-primary text-5xl font-bold group-hover:scale-110 transition-transform duration-500">
              {member.name.charAt(0)}
            </div>
          </div>
          <div className="p-8">
            <h4 className="font-bold text-gray-900 text-xl group-hover:text-blue-primary transition-colors line-clamp-1 mb-2">
              {member.name}
            </h4>
            <p className="text-sm text-blue-primary/80 font-semibold mb-5">{member.title}</p>
            <div className="text-sm text-gray-500 line-clamp-3 leading-relaxed">
              <span className="font-semibold text-gray-700">Interests:</span> {member.researchInterests?.join(", ")}
            </div>
          </div>
        </a>
      ))}
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
  if (!rollOfHonour || rollOfHonour.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-white border-t border-border py-20 md:py-24">
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
              </div>
            </ProfileCard>
          ))}
        </div>
      </div>
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
              {(staff) => <StaffGrid staff={staff} departmentSlug={department.slug} />}
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
