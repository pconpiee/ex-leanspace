// The Leanspace org map as visible from inside, May 2025 snapshot,
// drawn from team descriptions provided by alumni + public LinkedIn/SpaceNews sources.
// Listed for educational purposes (career-pathway documentation) — only public-domain info.

export type Person = {
  name: string;
  role: string;
  team: string;
  publicLinks?: string[];
};

export type Team = {
  id: string;
  label: string;
  description: string;
  members: Person[];
};

export const leadership: Person[] = [
  {
    name: "Guillaume Tanier",
    role: "Co-founder, CEO & CPO",
    team: "Executive",
    publicLinks: ["https://www.linkedin.com/in/guillaume-tanier/", "https://www.spacesymposium.org/speaker/guillaume-tanier/"],
  },
  {
    name: "Alban de la Bretèche",
    role: "Co-founder",
    team: "Executive",
  },
  {
    name: "Alvaro Alonso Ruiz",
    role: "Chief Commercial Officer",
    team: "Commercial",
    publicLinks: ["https://www.linkedin.com/in/alvaro-alonso-ruiz/"],
  },
  {
    name: "Gert Kryger Villemos",
    role: "Chief Technical Officer",
    team: "Engineering",
  },
  {
    name: "Stan Kaethler",
    role: "VP of Engineering",
    team: "Engineering",
  },
  {
    name: "Léa Raiche-Marsden",
    role: "Head of Finance & Business Ops",
    team: "Operations",
  },
];

export const teams: Team[] = [
  {
    id: "commercial",
    label: "Commercial",
    description:
      "Owns pipeline, partnerships, capture, and the institutional voice in-market. The user's BDM role was here.",
    members: [
      { name: "Alvaro Alonso Ruiz", role: "Chief Commercial Officer", team: "Commercial" },
      { name: "Peter Healy", role: "Business Development Manager — US Operations", team: "Commercial" },
      { name: "Abirami Mahiera", role: "Business Development Manager — Rest of World", team: "Commercial", publicLinks: ["https://www.linkedin.com/in/abirami-mahiera/"] },
      { name: "Ipek Dogan", role: "Sales Engineer", team: "Commercial" },
    ],
  },
  {
    id: "solutions",
    label: "Solutions",
    description:
      "Pre-sales architecture, PoC scoping, NRE delivery, and the long-term technical relationship for strategic accounts.",
    members: [
      { name: "Ezequiel González", role: "Solutions Architect", team: "Solutions" },
      { name: "Peter Healy", role: "Solutions Architect — Mission Planning (prior role)", team: "Solutions" },
      { name: "Marion Pigassou", role: "Domain Expert — Launchers & AIT", team: "Solutions" },
      { name: "Jérôme Boeglin", role: "Solutions Engineer", team: "Solutions" },
      { name: "Harry A. Tabi Ndip", role: "Solutions Engineer", team: "Solutions" },
      { name: "Emirhan Eser Gül", role: "Solutions Engineer", team: "Solutions" },
      { name: "André Maklakoff", role: "Customer Success / Account Manager", team: "Solutions" },
    ],
  },
  {
    id: "product",
    label: "Product",
    description:
      "Three product lines (Mission Control, Mission Planning & Flight Dynamics, Assembly Integration & Testing) owned by domain PMs.",
    members: [
      { name: "Roberto Travaglini", role: "Product Manager — Mission Control Systems", team: "Product" },
      { name: "Stuart Gill", role: "Product Manager — Assembly, Integration & Testing", team: "Product" },
      { name: "Kateryna Dvornichenko", role: "Product Manager — Mission Planning (and previously Product Owner Backend)", team: "Product" },
      { name: "Chloé Grimmer", role: "Product Owner — Frontend", team: "Product" },
    ],
  },
  {
    id: "engineering",
    label: "Engineering",
    description:
      "Backend, frontend, full-stack, QA, and tech leadership across the platform.",
    members: [
      { name: "Olivier Coutin", role: "Tech Lead — Backend", team: "Engineering" },
      { name: "Yannick Lohse", role: "Tech Lead — Frontend", team: "Engineering" },
      { name: "Elodie Tinland", role: "Backend Engineer", team: "Engineering" },
      { name: "Marc Majewski", role: "Backend / Full Stack Engineer", team: "Engineering" },
      { name: "Rohit Dobariya", role: "Backend Engineer", team: "Engineering" },
      { name: "Vivien Le Grand", role: "Backend Engineer", team: "Engineering" },
      { name: "Quentin Brohan", role: "Frontend Engineer", team: "Engineering" },
      { name: "Daniel de Sales", role: "Frontend Engineer", team: "Engineering" },
      { name: "Alexander Talavera Karslake", role: "Frontend Engineer", team: "Engineering" },
      { name: "Aurélien Pasteau", role: "Full Stack Engineer", team: "Engineering" },
      { name: "Cyrin Makhbouch", role: "Quality Assurance", team: "Engineering" },
      { name: "Dennis Liang", role: "Quality Assurance", team: "Engineering" },
      { name: "Dakshita Dhaundiyal", role: "Quality Assurance", team: "Engineering" },
    ],
  },
  {
    id: "design-marketing-pm",
    label: "Design / Marketing / PM",
    description:
      "Brand, marketing collateral, dense-data UI design, and cross-team project coordination.",
    members: [
      { name: "Bhushan Lanjekar", role: "Designer", team: "Design" },
      { name: "Inderpal Singh", role: "Marketing", team: "Marketing" },
      { name: "Ayman Nadaf", role: "Marketing", team: "Marketing" },
      { name: "Grace Li", role: "Marketing", team: "Marketing" },
      { name: "Géraud \"Jay\" Gaillard", role: "Project Manager", team: "Project Management" },
    ],
  },
  {
    id: "operations",
    label: "Finance & Operations",
    description:
      "Finance, executive enablement, and operational scaffolding for a multi-entity Series A scale-up.",
    members: [
      { name: "Léa Raiche-Marsden", role: "Head of Finance & Business Ops", team: "Operations" },
      { name: "Marianne Nowak", role: "Finance", team: "Operations" },
      { name: "Jade Vatin", role: "Executive Assistant", team: "Operations" },
    ],
  },
];

export const companyFacts = {
  founded: "2020",
  hq: "Strasbourg, France",
  usOffice: "Denver, Colorado",
  headcount: "51–100 (May 2026)",
  rounds: [
    { label: "Seed", amount: "€6M", year: "2022", investors: ["42CAP", "Karista", "angels"] },
    {
      label: "Series A",
      amount: "€10M",
      year: "November 2025",
      investors: ["ISAI Cap Venture", "Capgemini Ventures", "Qwaltec", "42CAP", "Karista", "Arnaud Guérin (Preligens co-founder)"],
    },
  ],
  customers: [
    "Airbus Defence and Space (France)",
    "Hispasat (Spain)",
    "European Space Agency",
    "ST Engineering",
    "Prométhée",
    "Quantum Space",
    "US Space Force (SCN Block Change study downselect)",
    "USEI Diamondlink (downselect)",
  ],
  founderBackgrounds: [
    "Thales",
    "NASA",
    "Airbus Defence & Space",
    "CGI",
    "Telespazio",
    "EUMETSAT",
    "ESA (SCOS-2000 architecture)",
    "EADS / Astrium / ArianeGroup",
    "International Space University (ISU)",
  ],
};
