import { USE_MOCK, fetchApi, API_BASE } from './api/client.js';
import { simulateDelay, createSearchIndex, paginateData, hydrateRelations } from './api/utils.js';
import { CURRENT_SESSION } from './api/config.js';

let mocksCache = null;
async function getMocks() {
  if (!mocksCache) {
    mocksCache = await import('./api/mocks.js');
  }
  return mocksCache;
}

export { CURRENT_SESSION };

export async function getAllDepartments(options = {}) {
  if (!USE_MOCK) return fetchApi('/departments', options);

  await simulateDelay(150);
  if (options.signal?.aborted) throw new DOMException("Aborted", "AbortError");
  const m = await getMocks();
  return m.DEPARTMENTS.map(dept => ({
    ...dept,
    description: `The Department of ${dept.name} offers cutting-edge programmes in ${dept.name.toLowerCase()}.`,
    studentCount: Math.floor(Math.random() * 300) + 100,
  }));
}

/**
 * Gets department basic info (FAST) for FCP.
 */
export async function getDepartmentBasic(slug, options = {}) {
  if (!USE_MOCK) return fetchApi(`/departments/${slug}`, options);

  await simulateDelay(150);
  if (options.signal?.aborted) throw new DOMException("Aborted", "AbortError");
  const m = await getMocks();

  const department = m.DEPARTMENTS.find((d) => d.slug === slug);
  if (!department) return null;

  const staffCount = m.STAFF_DIRECTORY.filter((s) => s.department_id === department.id).length;

  return {
    ...department,
    description: `The Department of ${department.name} at UNIOSUN offers cutting-edge programmes designed to produce industry-ready graduates.`,
    vision: `To be a world-class department in ${department.name} education, research, and innovation.`,
    programmes: [`B.Sc. ${department.name}`, `M.Sc. ${department.name}`, `Ph.D. ${department.name}`],
    staffCount: staffCount,
  };
}

/**
 * Gets department staff via relational join (SLOW) for Suspense streaming.
 */
export async function getDepartmentStaff(slug, options = {}) {
  if (!USE_MOCK) return fetchApi(`/departments/${slug}/staff`, options);

  await simulateDelay(2000); // Heavy 2-second delay to test skeleton loader
  if (options.signal?.aborted) throw new DOMException("Aborted", "AbortError");
  const m = await getMocks();

  const department = m.DEPARTMENTS.find((d) => d.slug === slug);
  if (!department) return [];

  return m.STAFF_DIRECTORY.filter((s) => s.department_id === department.id);
}

/**
 * Gets basic lecturer info (FAST) for FCP.
 */
export async function getLecturerBasic(slug, options = {}) {
  if (!USE_MOCK) return fetchApi(`/staff/${slug}/basic`, options);

  await simulateDelay(150);
  if (options.signal?.aborted) throw new DOMException("Aborted", "AbortError");
  const m = await getMocks();

  const lecturer = m.STAFF_DIRECTORY.find((s) => s.slug === slug);
  if (!lecturer) return null;

  const department = m.DEPARTMENTS.find(d => d.id === lecturer.department_id);

  return {
    id: lecturer.id,
    slug: lecturer.slug,
    name: lecturer.name,
    title: lecturer.title,
    qualifications: lecturer.qualifications,
    email: lecturer.email,
    departmentName: department ? department.name : "Unknown Department",
    departmentSlug: department ? department.slug : ""
  };
}

/**
 * Gets heavy relational lecturer details (SLOW) for Suspense streaming.
 */
export async function getLecturerDetails(slug, options = {}) {
  if (!USE_MOCK) return fetchApi(`/staff/${slug}/details`, options);

  await simulateDelay(2000);
  if (options.signal?.aborted) throw new DOMException("Aborted", "AbortError");
  const m = await getMocks();

  const lecturer = m.STAFF_DIRECTORY.find((s) => s.slug === slug);
  if (!lecturer) return null;

  return {
    bio: lecturer.bio,
    researchInterests: lecturer.researchInterests,
    courses: lecturer.courses,
    publications: lecturer.publications
  };
}

export async function getResearchPapers(filters = {}, options = {}) {
  if (!USE_MOCK) {
    const q = new URLSearchParams(filters).toString();
    return fetchApi(`/research?${q}`, options);
  }

  await simulateDelay(300);
  if (options.signal?.aborted) throw new DOMException("Aborted", "AbortError");
  const m = await getMocks();

  const { department, year, search, page = 1, limit = 12 } = filters;
  let filtered = [...m.MOCK_RESEARCH];

  if (department) filtered = filtered.filter(i => i.department === department);
  if (year) filtered = filtered.filter(i => i.year === Number(year));
  if (search && search.trim() !== '') {
    const tokens = search.toLowerCase().split(/\s+/);
    filtered = filtered.filter(i => tokens.every(t => createSearchIndex(i).includes(t)));
  }

  return paginateData(filtered, Number(page), Number(limit));
}

export async function getStudentProjects(filters = {}, options = {}) {
  if (!USE_MOCK) {
    const q = new URLSearchParams(filters).toString();
    return fetchApi(`/projects?${q}`, options);
  }

  await simulateDelay(300);
  if (options.signal?.aborted) throw new DOMException("Aborted", "AbortError");
  const m = await getMocks();

  const { department, year, search, supervisor, page = 1, limit = 12 } = filters;
  let filtered = [...m.MOCK_PROJECTS];

  if (department) filtered = filtered.filter(i => i.department === department);
  if (year) filtered = filtered.filter(i => i.year === Number(year));
  if (supervisor) filtered = filtered.filter(i => i.supervisor.toLowerCase().includes(supervisor.toLowerCase()));
  if (search && search.trim() !== '') {
    const tokens = search.toLowerCase().split(/\s+/);
    filtered = filtered.filter(i => tokens.every(t => createSearchIndex(i).includes(t)));
  }

  return paginateData(filtered, Number(page), Number(limit));
}

export async function getNewsAndEvents(filters = {}, options = {}) {
  if (!USE_MOCK) {
    const q = new URLSearchParams(filters).toString();
    return fetchApi(`/feed?${q}`, options);
  }

  await simulateDelay(300);
  if (options.signal?.aborted) throw new DOMException("Aborted", "AbortError");
  const m = await getMocks();

  const { type, page = 1, limit = 12 } = filters;
  let filtered = [...m.MOCK_FEED];

  if (type && type !== 'all') {
    filtered = filtered.filter(i => i.type === type);
  }

  // Sort by publish date descending
  filtered.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));

  const hydrated = hydrateRelations(filtered, m.DEPARTMENTS);
  return paginateData(hydrated, Number(page), Number(limit));
}

export async function getHomeDashboard(options = {}) {
  if (!USE_MOCK) return fetchApi('/home/dashboard', options);

  await simulateDelay(200);
  if (options.signal?.aborted) throw new DOMException("Aborted", "AbortError");
  const m = await getMocks();

  // Get top 3 latest news/events
  const sortedFeed = [...m.MOCK_FEED].sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
  const topFeed = hydrateRelations(sortedFeed.slice(0, 3), m.DEPARTMENTS);

  // Get top 3 projects
  const topProjects = [...m.MOCK_PROJECTS].reverse().slice(0, 3).map(p => ({
    id: p.id,
    title: p.title,
    student: p.student,
    department: p.department,
    year: p.year,
    abstract: p.abstract,
    matricNo: p.matricNo,
    supervisor: p.supervisor
  }));

  // Get current FOCITSA President
  const leaders = await getStudentLeaders({ branch: "executive" }, options);
  const currentPresident = leaders.find(l => l.role.toLowerCase() === "president");

  // Get Best Graduating Students (Faculty + Departments)
  const allRoh = await getRollOfHonour({}, options);
  const hallOfFameWithDupes = allRoh.filter(r => r.award === "Best Graduating Student");
  
  // Deduplicate by matricNo (prioritizing faculty level)
  const hallOfFame = [];
  hallOfFameWithDupes.forEach(bgs => {
    const existingIndex = hallOfFame.findIndex(e => e.matricNo === bgs.matricNo);
    if (existingIndex === -1) {
      hallOfFame.push(bgs);
    } else if (bgs.level === 'faculty') {
      hallOfFame[existingIndex] = bgs;
    }
  });

  // Mock Analytics Data (Simulating response from Plausible/Umami API via our BFF)
  // We simulate a 10% chance of the 3rd-party vendor failing or rate-limiting us.
  const visitorStats = Math.random() > 0.1 ? {
    totalPageViews: 12847,
    monthlyVisitors: 1203,
    todaysVisits: 87,
    lastUpdated: new Date().toISOString()
  } : null;

  return {
    latestFeed: topFeed,
    featuredProjects: topProjects,
    currentPresident,
    hallOfFame,
    visitorStats,
    facultyMetrics: {
      students: 1524,
      departments: m.DEPARTMENTS.length,
      labs: m.MOCK_LABS.length,
      staff: m.STAFF_DIRECTORY.length,
      researchPapers: 54
    }
  };
}

export async function getFacultyLabs(options = {}) {
  if (!USE_MOCK) return fetchApi('/labs', options);

  await simulateDelay(150);
  if (options.signal?.aborted) throw new DOMException("Aborted", "AbortError");
  const m = await getMocks();

  return m.MOCK_LABS;
}

/**
 * Mock POST endpoints for Forms
 */

export async function submitAlumniRegistration(data) {
  if (!USE_MOCK) {
    const res = await fetch(`${API_BASE}/alumni/register`, { method: "POST", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } });
    if (!res.ok) throw new Error("Network Error: Failed to connect to registration server.");
    return res.json();
  }

  await simulateDelay(1500); // 1.5s network delay

  // Randomly fail 20% of the time to demonstrate error handling
  if (Math.random() < 0.2) {
    throw new Error("Network Error: Failed to connect to registration server.");
  }

  return { success: true, message: "Registration successful. Welcome to the Alumni Network!", data };
}

export async function submitDonation(data) {
  if (!USE_MOCK) {
    const res = await fetch(`${API_BASE}/donate`, { method: "POST", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } });
    if (!res.ok) throw new Error("Payment Gateway Error: The transaction could not be processed.");
    return res.json();
  }

  await simulateDelay(1500); // 1.5s network delay

  if (Math.random() < 0.2) {
    throw new Error("Payment Gateway Error: The transaction could not be processed.");
  }

  return { success: true, message: `Thank you for your generous donation of ₦${data.amount}!`, data };
}

export async function getStudentLeaders(filters = {}, options = {}) {
  if (!USE_MOCK) {
    const q = new URLSearchParams(filters).toString();
    return fetchApi(`/leaders?${q}`, options);
  }

  await simulateDelay(200);
  if (options.signal?.aborted) throw new DOMException("Aborted", "AbortError");
  const m = await getMocks();

  const session = filters.session || CURRENT_SESSION;
  const branch = filters.branch; // 'executive' or 'legislative'

  let filtered = m.MOCK_STUDENT_LEADERS.filter(l => l.academicSession === session);
  if (branch) {
    filtered = filtered.filter(l => l.branch === branch);
  }

  // Hydrate department info for badge display
  return filtered.map(l => {
    const dept = m.DEPARTMENTS.find(d => d.id === l.departmentId);
    return {
      ...l,
      department: dept ? { name: dept.name, slug: dept.slug, color: dept.color } : null
    };
  });
}

export async function getRollOfHonour(filters = {}, options = {}) {
  if (!USE_MOCK) {
    const q = new URLSearchParams(filters).toString();
    return fetchApi(`/roll-of-honour?${q}`, options);
  }

  await simulateDelay(200);
  if (options.signal?.aborted) throw new DOMException("Aborted", "AbortError");
  const m = await getMocks();

  const { level, departmentId } = filters;

  let filtered = [...m.MOCK_ROLL_OF_HONOUR];
  if (level) {
    filtered = filtered.filter(roh => roh.level === level);
  }
  if (departmentId) {
    filtered = filtered.filter(roh => roh.departmentId === departmentId);
  }

  return filtered.map(roh => {
    const dept = m.DEPARTMENTS.find(d => d.id === roh.departmentId);
    return {
      ...roh,
      department: dept ? { name: dept.name, slug: dept.slug, color: dept.color } : null
    };
  });
}
