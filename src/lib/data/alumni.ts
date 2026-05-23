// Alumni directory — ex-Leanspace community
// Data sourced from LinkedIn profiles, May 2026.
// Only public information included.

export type AlumniStatus = "employed" | "freelance" | "searching" | "unknown";
export type LeanspaceDomain = "Product" | "Engineering" | "BD & Sales" | "Solutions" | "Marketing" | "Ops & Leadership";

export type Alumnus = {
  name: string;
  linkedIn?: string;
  leanspaceRole: string;
  domain: LeanspaceDomain;
  tenure: string;
  currentRole?: string;
  currentCompany?: string;
  sector?: string;
  location?: string;
  status: AlumniStatus;
};

export const alumni: Alumnus[] = [
  // ── Product ─────────────────────────────────────────────────────────────────
  {
    name: "Patrick Connolly",
    leanspaceRole: "PM / Solutions Architect / BDM",
    domain: "Product",
    tenure: "2022–2025",
    currentRole: "Director & Faculty",
    currentCompany: "International Space University",
    sector: "Higher Ed / Space",
    location: "Strasbourg, France",
    status: "employed",
  },
  {
    name: "Kateryna Dvornichenko",
    linkedIn: "https://linkedin.com/in/katerynadvornichenko",
    leanspaceRole: "PM — Mission Planning & Flight Dynamics",
    domain: "Product",
    tenure: "Jun 2022 – Oct 2025",
    currentRole: "Product Manager",
    currentCompany: "Upsun (formerly Platform.sh)",
    sector: "Cloud PaaS",
    location: "Paris, France",
    status: "employed",
  },
  {
    name: "Stuart Gill",
    linkedIn: "https://linkedin.com/in/stuartajgill",
    leanspaceRole: "PM — MCS & AIT",
    domain: "Product",
    tenure: "Jan 2021 – Dec 2024",
    currentRole: "Senior Product Manager",
    currentCompany: "Constellr",
    sector: "Earth Observation / NewSpace",
    location: "France",
    status: "employed",
  },
  {
    name: "Travis Hodson",
    linkedIn: "https://linkedin.com/in/travishodson",
    leanspaceRole: "PM — Cloud Infrastructure & Security",
    domain: "Product",
    tenure: "Mar 2024 – Mar 2025",
    currentRole: undefined,
    currentCompany: undefined,
    sector: "SaaS / Satellite",
    location: "Pittsburgh, PA, USA",
    status: "searching",
  },
  {
    name: "Roberto Travaglini",
    linkedIn: "https://linkedin.com/in/roberto-travaglini-347a29b7",
    leanspaceRole: "PM — Mission Control Systems",
    domain: "Product",
    tenure: "Jul 2023 – Mar 2025",
    currentRole: "Ground Systems Engineer",
    currentCompany: "D-Orbit",
    sector: "In-Orbit Services",
    location: "Como, Italy",
    status: "employed",
  },
  {
    name: "Marion Pigassou",
    linkedIn: "https://linkedin.com/in/marion-pigassou",
    leanspaceRole: "Domain Analyst → SA — Launchers & AIT",
    domain: "Product",
    tenure: "Aug 2022 – Dec 2024",
    currentRole: "Mission Operations Engineer",
    currentCompany: "Open Cosmos",
    sector: "Small Sat Operations",
    location: "Athens, Greece",
    status: "employed",
  },
  {
    name: "Chloé Grimmer",
    linkedIn: "https://linkedin.com/in/chloe-grimmer",
    leanspaceRole: "Project Manager",
    domain: "Product",
    tenure: "Jan 2023 – Jul 2024",
    currentRole: "Freelance Manager de Transition / PMO",
    currentCompany: undefined,
    sector: "Consulting",
    location: "Strasbourg, France",
    status: "freelance",
  },

  // ── BD & Sales ───────────────────────────────────────────────────────────────
  {
    name: "Peter Healy",
    linkedIn: "https://linkedin.com/in/peter-healy-7434b816b",
    leanspaceRole: "Sales Engineer → BDM",
    domain: "BD & Sales",
    tenure: "Nov 2022 – Jun 2025",
    currentRole: "Air quality (undisclosed)",
    currentCompany: undefined,
    sector: "CleanTech",
    location: "Cork, Ireland",
    status: "employed",
  },
  {
    name: "Jay Gaillard",
    linkedIn: "https://linkedin.com/in/geraudworld",
    leanspaceRole: "Projects Director",
    domain: "BD & Sales",
    tenure: "Feb 2023 – Dec 2024",
    currentRole: "Assistant Professor of Practice — Space Policy & Innovation",
    currentCompany: "International Space University",
    sector: "Higher Ed / Space",
    location: "Strasbourg, France",
    status: "employed",
  },
  {
    name: "Andrei Maklakoff",
    linkedIn: "https://linkedin.com/in/andremaklakov",
    leanspaceRole: "Account Exec → Customer Ops Mgr → Senior Account & Growth Mgr",
    domain: "BD & Sales",
    tenure: "Aug 2022 – 2026",
    currentRole: undefined,
    currentCompany: undefined,
    sector: undefined,
    location: "Strasbourg, France",
    status: "unknown",
  },

  // ── Solutions ────────────────────────────────────────────────────────────────
  {
    name: "Eser Gül",
    linkedIn: "https://linkedin.com/in/emirhan-eser-g%C3%BCl-326a24159",
    leanspaceRole: "Flight Dynamics Specialist & Software Developer",
    domain: "Solutions",
    tenure: "Oct 2022 – Jun 2025",
    currentRole: "Mission Operations Software Engineer",
    currentCompany: "Constellr",
    sector: "Earth Observation / NewSpace",
    location: "Strasbourg, France",
    status: "employed",
  },

  // ── Engineering ──────────────────────────────────────────────────────────────
  {
    name: "Andrea Rodriguez",
    linkedIn: "https://linkedin.com/in/andrea-rodriguez-2ba49117b",
    leanspaceRole: "DevOps Engineer",
    domain: "Engineering",
    tenure: "Mar 2022 – Aug 2024",
    currentRole: "Site Reliability Engineer II (Security)",
    currentCompany: "Criteo",
    sector: "AdTech / Cloud",
    location: "Paris, France",
    status: "employed",
  },
  {
    name: "Jaikant Dangi",
    linkedIn: "https://linkedin.com/in/jaikant-dangi",
    leanspaceRole: "Senior QA Automation Engineer",
    domain: "Engineering",
    tenure: "Dec 2020 – Dec 2022",
    currentRole: "Senior SDET Consultant",
    currentCompany: "Freelance",
    sector: "QA / Automation",
    location: "Gurugram, India",
    status: "freelance",
  },
  {
    name: "Cyrin Makhbouch",
    linkedIn: "https://linkedin.com/in/cyrine-makhbouche-721985144",
    leanspaceRole: "QA Automation Engineer",
    domain: "Engineering",
    tenure: "Aug 2024 – 2026",
    currentRole: undefined,
    currentCompany: undefined,
    sector: undefined,
    location: "France",
    status: "unknown",
  },

  // ── Marketing ────────────────────────────────────────────────────────────────
  {
    name: "Inderpal Singh",
    linkedIn: "https://linkedin.com/in/inderpal-singh-puar",
    leanspaceRole: "Marketing Lead",
    domain: "Marketing",
    tenure: "2021 – 2024",
    currentRole: "Marketing Strategist",
    currentCompany: "Freelance",
    sector: "Tech Marketing",
    location: "Darmstadt, Germany",
    status: "freelance",
  },
  {
    name: "Goda Šiugždinytė",
    linkedIn: "https://linkedin.com/in/goda-siugzdinyte-0099b313b",
    leanspaceRole: "Marketing Communications Specialist",
    domain: "Marketing",
    tenure: "Jan 2022 – Mar 2023",
    currentRole: "Marketing Manager",
    currentCompany: "Wolt",
    sector: "Consumer Tech",
    location: "Vilnius, Lithuania",
    status: "employed",
  },

  // ── Ops & Leadership ─────────────────────────────────────────────────────────
  {
    name: "Justine Engel",
    linkedIn: "https://linkedin.com/in/justine-engel",
    leanspaceRole: "Executive Assistant",
    domain: "Ops & Leadership",
    tenure: "Sep 2021 – Jul 2025",
    currentRole: "Chief of Staff",
    currentCompany: "International Space University",
    sector: "Higher Ed / Space",
    location: "Strasbourg, France",
    status: "employed",
  },
  {
    name: "Alistair Gray",
    linkedIn: "https://linkedin.com/in/grayalistair",
    leanspaceRole: "Technical Writer → AI Implementation Lead",
    domain: "Ops & Leadership",
    tenure: "Sep 2022 – Jul 2025",
    currentRole: "AI Change Manager & Guest Lecturer",
    currentCompany: "ISU / Freelance",
    sector: "AI Consulting / Higher Ed",
    location: "Strasbourg, France",
    status: "freelance",
  },
];

// Clusters — notable destination patterns
export const clusters = [
  {
    label: "International Space University",
    members: ["Patrick Connolly", "Jay Gaillard", "Justine Engel", "Alistair Gray"],
    note: "4 ex-Leanspacers now at ISU — faculty, CoS, guest lecturer.",
  },
  {
    label: "Constellr",
    members: ["Stuart Gill", "Eser Gül"],
    note: "2 ex-Leanspacers at the German EO startup.",
  },
];

export const domainOrder: LeanspaceDomain[] = [
  "Product",
  "BD & Sales",
  "Solutions",
  "Engineering",
  "Marketing",
  "Ops & Leadership",
];
