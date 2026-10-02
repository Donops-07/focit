// Simulating UUIDs
export const DEPT_CS_ID = "uuid-dept-cs";
export const DEPT_CYB_ID = "uuid-dept-cyb";
export const DEPT_SWE_ID = "uuid-dept-swe";
export const DEPT_DSC_ID = "uuid-dept-dsc";
export const DEPT_INS_ID = "uuid-dept-ins";
export const DEPT_INT_ID = "uuid-dept-int";
export const DEPT_LIS_ID = "uuid-dept-lis";



// --- MOCK DATA ---

export const DEPARTMENTS = [
  { id: DEPT_CS_ID, name: "Computer Science", shortName: "CSC", slug: "computer-science", icon: "Monitor", color: "blue", studentCount: 320, description: "Students learn how computers work from the ground up — from writing instructions that make software run, to understanding how systems store, sort, and process information. Graduates go on to work as software developers, tech consultants, and researchers." },
  { id: DEPT_CYB_ID, name: "Cyber Security", shortName: "CYB", slug: "cyber-security", icon: "ShieldAlert", color: "red", studentCount: 215, description: "This department trains students to protect computers, networks, and sensitive data from hackers and online threats. Graduates are in high demand at banks, government agencies, and tech companies as security analysts and digital forensics specialists." },
  { id: DEPT_SWE_ID, name: "Software Engineering", shortName: "SWE", slug: "software-engineering", icon: "Code", color: "purple", studentCount: 280, description: "Students learn to plan, build, and maintain the apps and systems people use every day — from mobile apps to banking platforms. The focus is on teamwork, project management, and building software that is reliable and easy to use." },
  { id: DEPT_INS_ID, name: "Information Systems", shortName: "INS", slug: "information-systems", icon: "Database", color: "amber", studentCount: 190, description: "This department teaches students how businesses use technology to run their daily operations — from managing records and customer data to making better decisions with digital tools. Graduates often work as IT managers, business analysts, and system administrators." },
  { id: DEPT_INT_ID, name: "Information Technology", shortName: "IFT", slug: "information-technology", icon: "Network", color: "teal", studentCount: 240, description: "Focused on the practical side of technology — setting up computer networks, managing servers, and keeping an organisation's tech running smoothly. Graduates work as network engineers, IT support specialists, and cloud administrators." },
  { id: DEPT_DSC_ID, name: "Data Science", shortName: "DSC", slug: "data-science", icon: "LineChart", color: "indigo", studentCount: 160, description: "Students learn how to collect, organise, and make sense of large amounts of data to help organisations spot trends and make smarter decisions. Think of it as turning raw numbers into useful knowledge. Graduates work as data analysts, research scientists, and AI specialists." },
  { id: DEPT_LIS_ID, name: "Library & Information Science", shortName: "LIS", slug: "library-and-information-science", icon: "BookOpen", color: "orange", studentCount: 120, description: "This department trains students in organising, storing, and sharing knowledge — both in traditional libraries and modern digital archives. Graduates work as librarians, records managers, knowledge officers, and digital archivists." }
];

export const MOCK_LABS = [
  { id: "lab-1", name: "Advanced AI & Robotics Lab", shortName: "AI Lab", description: "State-of-the-art facility for machine learning models and robotic automation research.", icon: "Cpu", relatedDept: DEPT_CS_ID },
  { id: "lab-2", name: "Cyber Defense Command Center", shortName: "Cyber Lab", description: "Simulated network environments for penetration testing and threat analysis.", icon: "Shield", relatedDept: DEPT_CYB_ID },
  { id: "lab-3", name: "Software Development Studio", shortName: "Dev Studio", description: "Collaborative workspace for agile software engineering and system design.", icon: "TerminalSquare", relatedDept: DEPT_SWE_ID },
  { id: "lab-4", name: "Data Analytics & Big Data Lab", shortName: "Data Lab", description: "High-performance computing cluster for processing massive datasets.", icon: "Database", relatedDept: DEPT_DSC_ID },
  { id: "lab-5", name: "Networking & IoT Hub", shortName: "IoT Lab", description: "Hardware testing facility for Internet of Things and advanced network protocols.", icon: "Wifi", relatedDept: DEPT_INT_ID }
];

export const STAFF_DIRECTORY = [
  // Computer Science Staff
  {
    id: "uuid-staff-1",
    department_id: DEPT_CS_ID,
    slug: "s-m-adebayo",
    name: "Prof. S. M. Adebayo",
    title: "Professor & Head of Department",
    qualifications: "B.Sc., M.Sc., Ph.D. (Computer Science)",
    email: "sadebayo@uniosun.edu.ng",
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

export const MOCK_RESEARCH = [
  { id: 1, title: "Deep Learning for Early Detection of Cybersecurity Threats in IoT Networks", authors: ["Dr. A. O. Bello", "T. K. Ojo"], department: "cyber-security", year: 2024, keywords: ["IoT", "Deep Learning", "Threat Detection", "Neural Networks"], researchArea: "Network Security", abstract: "This paper proposes a novel deep learning architecture for real-time anomaly detection in IoT environments." },
  { id: 2, title: "Optimizing Resource Allocation in Cloud Computing using Genetic Algorithms", authors: ["Prof. S. M. Adebayo", "F. E. Nwachukwu"], department: "computer-science", year: 2023, keywords: ["Cloud Computing", "Genetic Algorithms", "Resource Allocation"], researchArea: "Distributed Systems", abstract: "We present a genetic algorithm-based approach to dynamic resource allocation in cloud data centers." }
];

export const MOCK_PROJECTS = [
  { id: 1, title: "Development of a Blockchain-Based Certificate Verification System", student: "Adebisi Olawale", matricNo: "2020/40001", supervisor: "Prof. S. M. Adebayo", department: "computer-science", year: 2024, abstract: "This project implements a decentralized application (DApp) using Ethereum smart contracts." },
  { id: 2, title: "Design and Implementation of an Intrusion Detection System using Random Forest", student: "Ogunmola Titi", matricNo: "2020/40042", supervisor: "Dr. A. O. Bello", department: "cyber-security", year: 2024, abstract: "An intrusion detection system developed using Python and Scikit-learn." },
  { id: 3, title: "Development of an Automated Codebase Architectural Mapping and Documentation System", student: "Omekam Lauretta Obiamaka", matricNo: "2022/42061", supervisor: "Dr. C. I. Okeke", department: "software-engineering", year: 2026, abstract: "The project aimed to provide a visual representation of a system codebase architecture and also automate the code documentation for easier and faster program comprehension during software maintenance." },
  { id: 4, title: "Proactive Cybersecurity Framework for Secure Network Configuration Management and Automated Deployment", student: "Mubarak Adedeji Shittu", matricNo: "2022/41169", supervisor: "Dr. A. O. Bello", department: "cyber-security", year: 2026, abstract: "Designed and developed a proactive cybersecurity framework for secure network configuration management and automated deployment. The framework utilizes Python as a proactive security engine to inspect and validate network configuration files before they are deployed to network devices. It integrates Ansible for automated configuration deployment, GitOps as the single source of truth for configuration management, and CI/CD workflows to introduce automated security validation into the deployment lifecycle." },
  { id: 5, title: "Use of TikTok by Pregnant Women Attending Anti-Natal at Teaching Hospitals in Osun and Oyo States", student: "Hannah Oluwasunmisola Fadebi", matricNo: "2023/50617", supervisor: "Dr. M.O. Aborisade", department: "library-and-information-science", year: 2026, abstract: "This study examined the use of TikTok by pregnant women attending UNIOSUN Teaching Hospital, Osun State, and LAUTECH Teaching Hospital, Oyo State. The study specifically determined the frequency and pattern of respondents’ TikTok use; the most trusted and most consulted sources of pregnancy-related information and the place of TikTok among them; and the challenges they encounter in using TikTok for pregnancy-related information. A descriptive survey research design of the cross-sectional type was adopted. The population of the study comprised an estimated 480 pregnant women attending antenatal clinics at the two hospitals. Findings showed high passive engagement with pregnancy-related TikTok content, with a significant challenge being the inability to tell true information from false." }
];

export const MOCK_FEED = [
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

export const MOCK_STUDENT_LEADERS = [
  { id: "ldr-1", name: "Akingbehin Oluwadarasimi", role: "President", branch: "executive", academicSession: "2026/2027", departmentId: DEPT_CS_ID, photo: "/faculty-president.jpeg" },
  { id: "ldr-2", name: "Ayodeji Ayofe", role: "Vice President", branch: "executive", academicSession: "2026/2027", departmentId: DEPT_SWE_ID, photo: "/vice-president.jpeg" },
  { id: "ldr-6", name: "Adeniji Daniel", role: "General Secretary", branch: "executive", academicSession: "2026/2027", departmentId: DEPT_CS_ID, photo: "/general-secretary.jpeg", assistant: { name: "Okechukwu Eloghosa Praise", department: "Cybersecurity", photo: "/general-secretary-2.jpeg" } },
  { id: "ldr-7", name: "Opeyemi Oluwasegun Ogunleye", role: "Financial Secretary", branch: "executive", academicSession: "2026/2027", departmentId: DEPT_CYB_ID, photo: "/financial-secretary.jpeg" },
  { id: "ldr-8", name: "Adekunle Sodiq Gbolahan", role: "Public Relations Officer", branch: "executive", academicSession: "2026/2027", departmentId: DEPT_CS_ID, photo: "/public-relation-officer.jpeg" },
  { id: "ldr-9", name: "Aishat Bukunmi", role: "Academic Director", branch: "executive", academicSession: "2026/2027", departmentId: DEPT_LIS_ID, photo: "/academic-director.jpeg", assistant: { name: "Ogunshina Opeyemi Alabi", department: "Computer Science", photo: "/academic-director-2.jpeg" } },
  { id: "ldr-10", name: "Akinsola Helen Olajumoke", role: "Welfare Director", branch: "executive", academicSession: "2026/2027", departmentId: DEPT_CS_ID, photo: "/welfare-director.jpeg", assistant: { name: "Taofeek Faiqah Moradeyo", department: "Computer Science", photo: "/welfare-director-2.jpeg" } },
  { id: "ldr-11", name: "Oyegoke Ayanfeoluwa (20.10)", role: "Social Director", branch: "executive", academicSession: "2026/2027", departmentId: DEPT_CS_ID, photo: "/social-director.jpeg", assistant: { name: "Oyekunle Oluwadamilre", department: "Computer Science", photo: "/social-director-2.jpeg" } },
  { id: "ldr-12", name: "Ayomide Balogun", role: "Sport Director", branch: "executive", academicSession: "2026/2027", departmentId: DEPT_DSC_ID, photo: "/sport-director.jpeg", assistant: { name: "Adeleke Muiz", department: "Computer Science", photo: "/sport-director-2.jpeg" } },
  { id: "ldr-13", name: "Rabiu Adam Akorede", role: "Software Director", branch: "executive", academicSession: "2026/2027", departmentId: DEPT_CS_ID, photo: "/software-director.jpeg", assistant: { name: "Musari Oluwasegun Peter", department: "Software Engineering", photo: "/software-director-2.jpeg" } },
  { id: "ldr-3", name: "Rt. Hon. Adeseyitan Emmanuel Ilerioluwa", role: "Speaker", branch: "legislative", academicSession: "2026/2027", departmentId: DEPT_SWE_ID, photo: "/faculty-speaker.jpeg" },
  { id: "ldr-20", name: "Ige Timileyin Oladimeji", role: "Deputy Speaker", branch: "legislative", academicSession: "2026/2027", departmentId: DEPT_CS_ID, photo: "/deputy-speaker.jpeg" },
  // { id: "ldr-4", name: "Aisha Musa", role: "Clerk", branch: "legislative", academicSession: "2026/2027", departmentId: DEPT_INS_ID, photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80" },
  { id: "ldr-5", name: "Emeka John", role: "President", branch: "executive", academicSession: "2025/2026", departmentId: DEPT_SWE_ID, photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80" },
  { id: "ldr-14", name: "Hannah Oluwasunmisola Fadebi", role: "Honorable Member", branch: "legislative", academicSession: "2024/2025", departmentId: DEPT_LIS_ID, photo: "/lis-bgs.jpeg" },
  { id: "ldr-15", name: "Osuntasa Oluwashinaayomi Simon", role: "Chief Whip", branch: "legislative", academicSession: "2026/2027", departmentId: DEPT_CS_ID, photo: "/chip-whip-csc.jpeg" },
  { id: "ldr-16", name: "Lukman Umar Olatunde (Ayoola)", role: "Honorable Member", branch: "legislative", academicSession: "2026/2027", departmentId: DEPT_INT_ID, photo: "/member-ift.jpeg" },
  { id: "ldr-17", name: "Akinboyewa Ayomide Emmanuel", role: "Honorable Member", branch: "legislative", academicSession: "2026/2027", departmentId: DEPT_INS_ID, photo: "/member-ins.jpeg" },
  { id: "ldr-18", name: "Oladejo Ayomide Elijah", role: "Honorable Member", branch: "legislative", academicSession: "2026/2027", departmentId: DEPT_SWE_ID, photo: "/member-sen.jpeg" },
  { id: "ldr-19", name: "Paul Oluwaseyi Ishola", role: "Honorable Member", branch: "legislative", academicSession: "2026/2027", departmentId: DEPT_SWE_ID, photo: "/member-sen-2.jpeg" },
  { id: "ldr-21", name: "Opabiyi Philip Adedotun(Philip Smart)", role: "Honorable Member", branch: "legislative", academicSession: "2026/2027", departmentId: DEPT_CYB_ID, photo: "/member-cyb.jpeg" },
  { id: "ldr-22", name: "Owolabi Bashit Ayomide", role: "Honorable Member", branch: "legislative", academicSession: "2026/2027", departmentId: DEPT_DSC_ID, photo: "/member-data-science.jpeg" },
  { id: "ldr-23", name: "Bamgbose Olumide Chidiebere", role: "Honorable Member", branch: "legislative", academicSession: "2026/2027", departmentId: DEPT_DSC_ID, photo: "/member-data-science-2.jpeg" },
  { id: "ldr-24", name: "Oni Emmanuel Kayode", role: "Honorable Member", branch: "legislative", academicSession: "2026/2027", departmentId: DEPT_INT_ID, photo: "/member-ift-2.jpeg" }
];

export const MOCK_ROLL_OF_HONOUR = [
  {
    id: "roh-1",
    level: "faculty",
    name: "Lawal Abdulmuiz Opeyemi",
    award: "Best Graduating Student",
    year: "2026",
    departmentId: DEPT_CS_ID,
    cgpa: "4.68",
    matricNo: "2022/40950",
    photo: "/focit-best-graduating-student.jpg",
    bio: "Lawal Abdulmuiz Opeyemi is a Computer Science graduate who graduated as the Best Student in both his Department and the Faculty, achieving an outstanding CGPA of 4.68. A dedicated peer mentor, he served as an MSSN tutor from his first year through his third year. His commitment to academic leadership culminated in his roles as the Departmental Academic Director for Computer Science (2024/2025) and subsequently the Faculty Academic Director (2025/2026). During his tenure, he successfully drove technical excellence among his peers by organizing numerous tutorial sessions, inter-departmental competitions, and a specialized Agentic AI Workshop."
  },
  { id: "roh-2", level: "faculty", name: "Grace Folorunsho", award: "Best Female Graduate", year: "2024", departmentId: DEPT_CYB_ID, cgpa: "4.85", matricNo: "2021/56042", photo: "" },
  {
    id: "roh-3",
    level: "department",
    name: "Omekam Lauretta Obiamaka",
    award: "Best Graduating Student",
    year: "2026",
    departmentId: DEPT_SWE_ID,
    cgpa: "4.64",
    matricNo: "2022/42061",
    photo: "/software-engineering-bgs.jpeg",
    bio: `Omekam Lauretta Obiamaka is a First Class Honors graduate of Osun State University, emerging as the Best Graduating Student of the Department of Software Engineering for the year 2026.

She interned at the National Centre for Artificial Intelligence and Robotics (NCAIR), a branch under the National Information Technology Development Agency (NITDA) during her Student Industrial Work Experience Scheme. During her internship, she gained valuable skills in Python Programming, Product Design (UI/UX), Data Science, and Embedded Systems.

A passionate Machine Learning enthusiast, Lauretta demonstrated her technical excellence as the First Runner-up (2nd position) at the NITDA Innovation Challenge 1.0, representing Team Sentinel.`
  },
  {
    id: "roh-4",
    level: "department",
    name: "Lawal Abdulmuiz Opeyemi",
    award: "Best Graduating Student",
    year: "2026",
    departmentId: DEPT_CS_ID,
    cgpa: "4.68",
    matricNo: "2022/40950",
    photo: "/focit-best-graduating-student.jpg",
    bio: "Lawal Abdulmuiz Opeyemi is a Computer Science graduate who graduated as the Best Student in both his Department and the Faculty, achieving an outstanding CGPA of 4.68. A dedicated peer mentor, he served as an MSSN tutor from his first year through his third year. His commitment to academic leadership culminated in his roles as the Departmental Academic Director for Computer Science (2024/2025) and subsequently the Faculty Academic Director (2025/2026). During his tenure, he successfully drove technical excellence among his peers by organizing numerous tutorial sessions, inter-departmental competitions, and a specialized Agentic AI Workshop."
  },
  {
    id: "roh-5",
    level: "department",
    name: "Mubarak Adedeji Shittu",
    award: "Best Graduating Student",
    year: "2026",
    departmentId: DEPT_CYB_ID,
    cgpa: "4.51",
    matricNo: "2022/41169",
    photo: "/cyb-bgs.jpeg",
    bio: `Mubarak Adedeji Shittu is a Cybersecurity graduate of Osun State University (UNIOSUN) who distinguished himself academically as the Best Graduating Student in the Department of Cybersecurity. His academic journey reflects a strong commitment to excellence, continuous learning, and the practical application of cybersecurity principles.

Beyond academics, Mubarak demonstrated a strong commitment to leadership and student development. He served as the Speaker of the Legislative Council of the Nigeria Association of Cybersecurity Students (NACSS) for both the 2024/2025 and 2025/2026 sessions, providing legislative leadership, facilitating student representation, and contributing to effective governance within the association.

His passion for cybersecurity extends into professional practice. Mubarak is a Network Security Engineer and Security Analyst with experience working on numerous cybersecurity projects and engagements, applying his knowledge to practical security challenges.

As part of his final-year research and development work, he designed and developed a proactive cybersecurity framework for secure network configuration management and automated deployment. The framework utilizes Python as a proactive security engine to inspect and validate network configuration files before they are deployed to network devices. It integrates Ansible for automated configuration deployment, GitOps as the single source of truth for configuration management, and CI/CD workflows to introduce automated security validation into the deployment lifecycle. The project demonstrates his ability to combine cybersecurity, network engineering, automation, DevOps, and secure software practices to address real-world infrastructure security challenges.

Mubarak is also actively involved in technology communities. He is a member of the Google Developer Student Club, UNIOSUN Chapter, where he engaged with a community focused on technical learning, collaboration, and innovation. He is also a member of the global Blacks In Technology community, connecting with a broader network of technology professionals and contributing to the advancement of Black representation and participation in the technology industry.

Through his combination of academic excellence, cybersecurity expertise, technical innovation, leadership, and community engagement, Mubarak Adedeji Shittu represents a promising emerging professional in the cybersecurity and technology ecosystem. His journey reflects not only a pursuit of academic distinction but also a commitment to developing practical solutions and creating value within the communities he serves.`
  },
  {
    id: "roh-6",
    level: "department",
    name: "Hannah Oluwasunmisola Fadebi",
    award: "Best Graduating Student",
    year: "2026",
    departmentId: DEPT_LIS_ID,
    cgpa: "4.58",
    matricNo: "2023/50617",
    photo: "/lis-bgs.jpeg",
    bio: "Hannah Oluwasunmisola Fadebi, a graduate of the department of library and information science, served as an honorable member in the faculty of computing and information technology students association legislative house in the 2024/2025 Administration and also, the president of the Nigerian Library and information students association (N-LISSA) in the 2025/2026 Administrations. Hannah is an advocate for Academic excellence and outstanding academic culture."
  }
];

