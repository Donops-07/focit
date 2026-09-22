/**
 * API Service Layer
 *
 * This module abstracts all data fetching behind a consistent interface.
 * Returns mock data from local JSON structures.
 */

// Simulating UUIDs
const DEPT_CS_ID = "uuid-dept-cs";
const DEPT_CYB_ID = "uuid-dept-cyb";
const DEPT_SWE_ID = "uuid-dept-swe";
const DEPT_DSC_ID = "uuid-dept-dsc";
const DEPT_INS_ID = "uuid-dept-ins";
const DEPT_INT_ID = "uuid-dept-int";
const DEPT_LIS_ID = "uuid-dept-lis";

// Global Session Configuration
export const CURRENT_SESSION = "2026/2027";

// Environment Configuration
const USE_MOCK = import.meta.env.VITE_USE_MOCK_API === 'true' || import.meta.env.VITE_USE_MOCK_API === undefined;
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

async function fetchApi(endpoint, options = {}) {
  const res = await fetch(`${API_BASE}${endpoint}`, { signal: options.signal });
  if (!res.ok) throw new Error(`API Fetch failed: ${res.statusText}`);
  return res.json();
}

// --- MOCK DATA ---

const DEPARTMENTS = [
  { id: DEPT_CS_ID, name: "Computer Science", shortName: "CSC", slug: "computer-science", icon: "Monitor", color: "blue" },
  { id: DEPT_CYB_ID, name: "Cyber Security", shortName: "CYB", slug: "cyber-security", icon: "ShieldAlert", color: "red" },
  { id: DEPT_SWE_ID, name: "Software Engineering", shortName: "SWE", slug: "software-engineering", icon: "Code", color: "purple" },
  { id: DEPT_INS_ID, name: "Information Systems", shortName: "INS", slug: "information-systems", icon: "Database", color: "amber" },
  { id: DEPT_INT_ID, name: "Information Technology", shortName: "INT", slug: "information-technology", icon: "Network", color: "teal" },
  { id: DEPT_DSC_ID, name: "Data Science", shortName: "DSC", slug: "data-science", icon: "LineChart", color: "indigo" },
  { id: DEPT_LIS_ID, name: "Library & Information Science", shortName: "LIS", slug: "library-and-information-science", icon: "BookOpen", color: "orange" }
];

const STAFF_DIRECTORY = [
  // Computer Science Staff
  {
    id: "uuid-staff-1",
    department_id: DEPT_CS_ID,
    slug: "s-m-adebayo",
    name: "Prof. S. M. Adebayo",
    title: "Professor & Head of Department",
    qualifications: "B.Sc., M.Sc., Ph.D. (Computer Science)",
    email: "s.adebayo@uniosun.edu.ng",
    researchInterests: ["Distributed Systems", "Cloud Computing", "Algorithm Design"],
    bio: "Prof. Adebayo has over 20 years of experience in academia and industry. He leads the Distributed Systems research lab.",
    courses: ["CSC 301: Data Structures", "CSC 411: Operating Systems II"],
    publications: [
      "Optimizing Resource Allocation in Cloud Computing using Genetic Algorithms (2023)"
    ]
  },
  {
    id: "uuid-staff-2",
    department_id: DEPT_CS_ID,
    slug: "a-k-ola",
    name: "Dr. A. K. Ola",
    title: "Senior Lecturer",
    qualifications: "B.Sc., M.Sc., Ph.D. (Computer Science)",
    email: "a.ola@uniosun.edu.ng",
    researchInterests: ["Artificial Intelligence", "Machine Learning"],
    bio: "Dr. Ola specializes in deep learning architectures and their application to natural language processing.",
    courses: ["CSC 405: Artificial Intelligence", "CSC 202: Object-Oriented Programming"],
    publications: []
  },
  
  // Cyber Security Staff
  {
    id: "uuid-staff-3",
    department_id: DEPT_CYB_ID,
    slug: "a-o-bello",
    name: "Dr. A. O. Bello",
    title: "Associate Professor",
    qualifications: "B.Tech., M.Sc., Ph.D. (Cyber Security)",
    email: "a.bello@uniosun.edu.ng",
    researchInterests: ["Network Security", "Applied Cryptography"],
    bio: "Dr. Bello is an expert in IoT network security and holds multiple patents in intrusion detection systems.",
    courses: ["CYB 302: Cryptography", "CYB 401: Ethical Hacking"],
    publications: [
      "Deep Learning for Early Detection of Cybersecurity Threats in IoT Networks (2024)"
    ]
  },

  // Software Engineering Staff
  {
    id: "uuid-staff-4",
    department_id: DEPT_SWE_ID,
    slug: "c-i-okeke",
    name: "Dr. C. I. Okeke",
    title: "Senior Lecturer",
    qualifications: "B.Eng., M.Sc., Ph.D. (Software Engineering)",
    email: "c.okeke@uniosun.edu.ng",
    researchInterests: ["Agile Methodologies", "Software Quality Assurance"],
    bio: "Dr. Okeke bridges the gap between industry software engineering practices and academic theory.",
    courses: ["SWE 305: Software Architecture", "SWE 409: Software Testing"],
    publications: [
      "Agile Methodologies in Global Software Development (2024)"
    ]
  }
];

const MOCK_RESEARCH = [
  { id: 1, title: "Deep Learning for Early Detection of Cybersecurity Threats in IoT Networks", authors: ["Dr. A. O. Bello", "T. K. Ojo"], department: "cyber-security", year: 2024, keywords: ["IoT", "Deep Learning", "Threat Detection", "Neural Networks"], researchArea: "Network Security", abstract: "This paper proposes a novel deep learning architecture for real-time anomaly detection in IoT environments." },
  { id: 2, title: "Optimizing Resource Allocation in Cloud Computing using Genetic Algorithms", authors: ["Prof. S. M. Adebayo", "F. E. Nwachukwu"], department: "computer-science", year: 2023, keywords: ["Cloud Computing", "Genetic Algorithms", "Resource Allocation"], researchArea: "Distributed Systems", abstract: "We present a genetic algorithm-based approach to dynamic resource allocation in cloud data centers." }
];

const MOCK_PROJECTS = [
  { id: 1, title: "Development of a Blockchain-Based Certificate Verification System", student: "Adebisi Olawale", matricNo: "2020/40001", supervisor: "Prof. S. M. Adebayo", department: "computer-science", year: 2024, abstract: "This project implements a decentralized application (DApp) using Ethereum smart contracts." },
  { id: 2, title: "Design and Implementation of an Intrusion Detection System using Random Forest", student: "Ogunmola Titi", matricNo: "2020/40042", supervisor: "Dr. A. O. Bello", department: "cyber-security", year: 2024, abstract: "An intrusion detection system developed using Python and Scikit-learn." }
];

const MOCK_FEED = [
  {
    id: "feed-1",
    type: "news",
    title: "Faculty Receives Grant for AI Lab",
    publishDate: "2026-09-10T10:00:00Z",
    coverImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=600&auto=format&fit=crop",
    summary: "A 50 million Naira grant has been awarded to establish a state-of-the-art Artificial Intelligence laboratory.",
    relatedDepartmentIds: [DEPT_CS_ID, DEPT_DSC_ID],
    metadata: {
      author: "Dean's Office",
      readTimeMins: 4
    }
  },
  {
    id: "feed-2",
    type: "event",
    title: "Cyber Security Dept Hosts Hackathon",
    publishDate: "2026-09-15T09:00:00Z",
    coverImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop",
    summary: "Join us for a 48-hour cybersecurity challenge covering penetration testing and cryptography.",
    relatedDepartmentIds: [DEPT_CYB_ID],
    metadata: {
      startTime: "2026-10-20T08:00:00Z",
      endTime: "2026-10-22T17:00:00Z",
      venue: "Main Auditorium",
      registrationLink: "https://register.example.com/hackathon"
    }
  },
  {
    id: "feed-3",
    type: "news",
    title: "New Software Engineering Curriculum Approved",
    publishDate: "2026-09-18T14:30:00Z",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop",
    summary: "The Senate has approved the revised curriculum focusing on cloud-native development and DevSecOps.",
    relatedDepartmentIds: [DEPT_SWE_ID],
    metadata: {
      author: "Academic Board",
      readTimeMins: 3
    }
  },
  {
    id: "feed-4",
    type: "event",
    title: "Tech Innovation Summit 2026",
    publishDate: "2026-09-20T11:00:00Z",
    coverImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop",
    summary: "Annual faculty summit featuring industry leaders, student exhibitions, and alumni networking.",
    relatedDepartmentIds: [DEPT_CS_ID, DEPT_SWE_ID, DEPT_INT_ID],
    metadata: {
      startTime: "2026-11-05T09:00:00Z",
      endTime: "2026-11-06T18:00:00Z",
      venue: "Faculty Complex",
      registrationLink: "https://register.example.com/summit"
    }
  }
];

const MOCK_STUDENT_LEADERS = [
  { id: "ldr-1", name: "Oluwaseun Adeyemi", role: "President", branch: "executive", academicSession: "2026/2027", departmentId: DEPT_CS_ID, photo: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=400&q=80" },
  { id: "ldr-2", name: "Fatima Bello", role: "Vice President", branch: "executive", academicSession: "2026/2027", departmentId: DEPT_CYB_ID, photo: "https://images.unsplash.com/photo-1531123897727-8f129e1bf98c?w=400&q=80" },
  { id: "ldr-6", name: "David Akinola", role: "General Secretary", branch: "executive", academicSession: "2026/2027", departmentId: DEPT_SWE_ID, photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80" },
  { id: "ldr-7", name: "Kemi Ojo", role: "Financial Secretary", branch: "executive", academicSession: "2026/2027", departmentId: DEPT_INS_ID, photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80" },
  { id: "ldr-8", name: "Victor Eze", role: "Public Relations Officer", branch: "executive", academicSession: "2026/2027", departmentId: DEPT_INT_ID, photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
  { id: "ldr-9", name: "Sarah Daniels", role: "Academic Director", branch: "executive", academicSession: "2026/2027", departmentId: DEPT_DSC_ID, photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80" },
  { id: "ldr-10", name: "Tunde Bakare", role: "Welfare Director", branch: "executive", academicSession: "2026/2027", departmentId: DEPT_LIS_ID, photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80" },
  { id: "ldr-11", name: "Grace Edet", role: "Social Director", branch: "executive", academicSession: "2026/2027", departmentId: DEPT_CS_ID, photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80" },
  { id: "ldr-12", name: "Ibrahim Musa", role: "Sport Director", branch: "executive", academicSession: "2026/2027", departmentId: DEPT_CYB_ID, photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80" },
  { id: "ldr-13", name: "Nnamdi Kalu", role: "Software Director", branch: "executive", academicSession: "2026/2027", departmentId: DEPT_SWE_ID, photo: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400&q=80" },
  { id: "ldr-3", name: "Chinedu Okeke", role: "Speaker", branch: "legislative", academicSession: "2026/2027", departmentId: DEPT_SWE_ID, photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80" },
  { id: "ldr-4", name: "Aisha Musa", role: "Clerk", branch: "legislative", academicSession: "2026/2027", departmentId: DEPT_INS_ID, photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80" },
  { id: "ldr-5", name: "Emeka John", role: "President", branch: "executive", academicSession: "2025/2026", departmentId: DEPT_CS_ID, photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80" }
];

const MOCK_ROLL_OF_HONOUR = [
  { id: "roh-1", level: "faculty", name: "David Olanrewaju", award: "Best Graduating Student", year: "2025", departmentId: DEPT_CS_ID, cgpa: "4.92", matricNo: "2021/40001", photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80" },
  { id: "roh-2", level: "faculty", name: "Grace Folorunsho", award: "Best Female Graduate", year: "2025", departmentId: DEPT_CYB_ID, cgpa: "4.85", matricNo: "2021/40042", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80" },
  { id: "roh-3", level: "department", name: "John Doe", award: "Best Graduating Student", year: "2025", departmentId: DEPT_SWE_ID, cgpa: "4.78", matricNo: "2021/40055", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80" },
  { id: "roh-4", level: "department", name: "Jane Smith", award: "Best Graduating Student", year: "2025", departmentId: DEPT_CS_ID, cgpa: "4.80", matricNo: "2021/40012", photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80" }
];

// --- UTILS ---

const simulateDelay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

function createSearchIndex(item) {
  return Object.values(item)
    .map(val => (Array.isArray(val) ? val.join(" ") : String(val)))
    .join(" ")
    .toLowerCase();
}

function paginateData(data, page, limit) {
  const total = data.length;
  const totalPages = Math.ceil(total / limit);
  const offset = (page - 1) * limit;
  return {
    data: data.slice(offset, offset + limit),
    meta: { current_page: page, last_page: totalPages, per_page: limit, total: total }
  };
}

function hydrateRelations(items) {
  return items.map(item => {
    const tags = (item.relatedDepartmentIds || []).map(deptId => {
      const dept = DEPARTMENTS.find(d => d.id === deptId);
      if (dept) {
        return { slug: dept.slug, name: dept.name, color: dept.color };
      }
      return null;
    }).filter(Boolean);

    return { ...item, tags };
  });
}

// --- EXPORTED API ---

export { DEPARTMENTS };

export async function getAllDepartments(options = {}) {
  if (!USE_MOCK) return fetchApi('/departments', options);

  await simulateDelay(150);
  if (options.signal?.aborted) throw new DOMException("Aborted", "AbortError");
  return DEPARTMENTS.map(dept => ({
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

  const department = DEPARTMENTS.find((d) => d.slug === slug);
  if (!department) return null;

  const staffCount = STAFF_DIRECTORY.filter((s) => s.department_id === department.id).length;

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

  const department = DEPARTMENTS.find((d) => d.slug === slug);
  if (!department) return [];

  return STAFF_DIRECTORY.filter((s) => s.department_id === department.id);
}

/**
 * Gets basic lecturer info (FAST) for FCP.
 */
export async function getLecturerBasic(slug, options = {}) {
  if (!USE_MOCK) return fetchApi(`/staff/${slug}/basic`, options);

  await simulateDelay(150);
  if (options.signal?.aborted) throw new DOMException("Aborted", "AbortError");

  const lecturer = STAFF_DIRECTORY.find((s) => s.slug === slug);
  if (!lecturer) return null;

  const department = DEPARTMENTS.find(d => d.id === lecturer.department_id);

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

  const lecturer = STAFF_DIRECTORY.find((s) => s.slug === slug);
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

  const { department, year, search, page = 1, limit = 12 } = filters;
  let filtered = [...MOCK_RESEARCH];

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

  const { department, year, search, supervisor, page = 1, limit = 12 } = filters;
  let filtered = [...MOCK_PROJECTS];

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

  const { type, page = 1, limit = 12 } = filters;
  let filtered = [...MOCK_FEED];

  if (type && type !== 'all') {
    filtered = filtered.filter(i => i.type === type);
  }

  // Sort by publish date descending
  filtered.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));

  const hydrated = hydrateRelations(filtered);
  return paginateData(hydrated, Number(page), Number(limit));
}

export async function getHomeDashboard(options = {}) {
  if (!USE_MOCK) return fetchApi('/home/dashboard', options);

  await simulateDelay(200);
  if (options.signal?.aborted) throw new DOMException("Aborted", "AbortError");

  // Get top 3 latest news/events
  const sortedFeed = [...MOCK_FEED].sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
  const topFeed = hydrateRelations(sortedFeed.slice(0, 3));

  // Get top 2 projects (strip heavy fields like abstract for payload optimization)
  const topProjects = MOCK_PROJECTS.slice(0, 2).map(p => ({
    id: p.id,
    title: p.title,
    student: p.student,
    department: p.department,
    year: p.year
  }));

  // Get current FOCITSA President
  const leaders = await getStudentLeaders({ branch: "executive" }, options);
  const currentPresident = leaders.find(l => l.role.toLowerCase() === "president");

  return {
    latestFeed: topFeed,
    featuredProjects: topProjects,
    currentPresident
  };
}

/**
 * Mock POST endpoints for Forms
 */

export async function submitAlumniRegistration(data) {
  if (!USE_MOCK) {
    const res = await fetch(`${API_BASE}/alumni/register`, { method: "POST", body: JSON.stringify(data), headers: {"Content-Type": "application/json"} });
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
    const res = await fetch(`${API_BASE}/donate`, { method: "POST", body: JSON.stringify(data), headers: {"Content-Type": "application/json"} });
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

  const session = filters.session || CURRENT_SESSION;
  const branch = filters.branch; // 'executive' or 'legislative'
  
  let filtered = MOCK_STUDENT_LEADERS.filter(l => l.academicSession === session);
  if (branch) {
    filtered = filtered.filter(l => l.branch === branch);
  }

  // Hydrate department info for badge display
  return filtered.map(l => {
    const dept = DEPARTMENTS.find(d => d.id === l.departmentId);
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

  const { level, departmentId } = filters;
  
  let filtered = [...MOCK_ROLL_OF_HONOUR];
  if (level) {
    filtered = filtered.filter(roh => roh.level === level);
  }
  if (departmentId) {
    filtered = filtered.filter(roh => roh.departmentId === departmentId);
  }

  return filtered.map(roh => {
    const dept = DEPARTMENTS.find(d => d.id === roh.departmentId);
    return {
      ...roh,
      department: dept ? { name: dept.name, slug: dept.slug, color: dept.color } : null
    };
  });
}
