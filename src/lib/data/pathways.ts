export type Seniority = "IC" | "Senior IC" | "Lead" | "Manager" | "Director" | "VP" | "C-suite";

export type Pathway = {
  slug: string;
  function: string;
  short: string;
  oneLine: string;
  reportingChain: string[];
  whatYouActuallyDid: string[];
  skillsAcquired: { area: string; items: string[] }[];
  artifactsToCollect: string[];
  signalToBroadcast: string[];
  nextRoles: { title: string; where: string; why: string }[];
  pitfalls: string[];
};

export const pathways: Pathway[] = [
  {
    slug: "product-manager",
    function: "Product Manager",
    short: "PM",
    oneLine:
      "Owned a product line end-to-end — discovery, roadmap, delivery, customer success — for one of three Leanspace product domains (Mission Control, Mission Planning & Flight Dynamics, or Assembly Integration & Testing).",
    reportingChain: ["CEO/CPO (Guillaume Tanier)", "CTO (initially Gaurav Lanjekar, later Gert Villemos)"],
    whatYouActuallyDid: [
      "Launched whole product lines (e.g. Orbits, Resources, Plans, MPS Lite for Mission Planning) — not features inside someone else's product.",
      "Discovery with FDS engineers, mission planners, and operators across EO constellations, IOD, SatCom, IOT, hosted-payload missions.",
      "Wrote technical proposals for grants (Umbrella €10.5M France 2030 won; Japetus €70K CNES led; Constellation contributed).",
      "Retained at-risk customers by demoing prototypes — turned churn risk into renewal.",
      "Onboarded customers through their first orbital missions on Leanspace software (e.g. Prométhée, Quantum Space).",
      "Public presence at SmallSat, Satellite, Space Symposium — delivered live demos and side-meeting talks.",
    ],
    skillsAcquired: [
      {
        area: "Space domain",
        items: [
          "CCSDS, CSP, PUS protocols",
          "Orbital mechanics — TLE/SPS propagation, ephemeris, visibilities, eclipses",
          "Mission planning concepts — templates, replanning, master timelines, resource propagation",
          "Hosted-payload workflows (both buyer and seller sides)",
          "Constellation operations and ground-segment-as-a-service orchestration",
        ],
      },
      {
        area: "Product craft",
        items: [
          "Full lifecycle ownership — discovery → prototyping → launch → scaling",
          "Agile delivery with engineering teams across geographies",
          "Roadmap and success-metric definition with executive accountability",
          "Customer-success motions for first-of-kind missions (live ops, not demo software)",
          "Grant/RFP technical authoring — translating product to institutional language",
        ],
      },
      {
        area: "Commercial-adjacent",
        items: [
          "Sales enablement: training material, demo scripts, objection handling",
          "Pricing input on modular product lines (per-product vs platform)",
          "Public speaking and live-demo authority at industry events",
        ],
      },
    ],
    artifactsToCollect: [
      "List of products you launched, with launch date + first-customer milestone",
      "Grant submissions where you authored technical sections — name them",
      "Customers you onboarded to first orbital ops — these are flight-heritage references",
      "Demo videos / conference talks — get the recording before you leave",
      "Pricing decisions and the data you used to justify them",
    ],
    signalToBroadcast: [
      "\"I shipped a flight-proven product line in a 50-person company\" — most PMs at primes never get this.",
      "\"I authored technical sections for a €10M+ won grant\" — translates to RFP capture experience.",
      "\"I spoke at SmallSat / Satellite / Space Symposium\" — industry voice, not just internal.",
    ],
    nextRoles: [
      {
        title: "Senior PM / Group PM",
        where: "Other NewSpace ground software (Kubos, Major Tom, Cognitive Space, Antaris, ATLAS Space Operations)",
        why: "Modular ground-segment products are a small market — your domain depth is rare and immediately useful.",
      },
      {
        title: "Product Lead / Head of Product",
        where: "Earlier-stage NewSpace startups (seed–Series A)",
        why: "Going one level up at a smaller company is the textbook \"founder-PM\" jump.",
      },
      {
        title: "Product Manager",
        where: "Primes building new products (Airbus DS Connected Intelligence, Thales Alenia Space digital, Telespazio NextGen, Lockheed/Northrop space software groups)",
        why: "Primes need NewSpace velocity. Your flight-heritage + grant authorship clears their procurement bar.",
      },
      {
        title: "Mission Manager / Mission Operations Lead",
        where: "Satellite operators (Hispasat, SES, Eutelsat, Telesat) or constellation owners",
        why: "Operator side of the table — you already know what they wanted from you.",
      },
      {
        title: "Founder / co-founder",
        where: "Adjacent gaps — ground automation, FDS-as-a-service, mission ops AI",
        why: "You've seen what customers couldn't get from Leanspace — that gap is a company.",
      },
    ],
    pitfalls: [
      "Don't undersell as \"PM in a startup\" — quantify scope (3 product lines, X customers, Y grants).",
      "Don't drop the technical depth on your CV to look more commercial — it's your moat against generic PMs.",
      "Avoid taking a feature-PM role at a large prime — you'll lose the lifecycle ownership that defined this role.",
    ],
  },
  {
    slug: "solutions-architect",
    function: "Solutions Architect",
    short: "SA",
    oneLine:
      "The technical bridge between Commercial and Engineering — qualified deals, designed PoCs, owned the technical handover into delivery, and stayed embedded with strategic accounts.",
    reportingChain: ["CCO (Alvaro Alonso Ruiz)", "CTO (Gert Villemos)"],
    whatYouActuallyDid: [
      "Designed space-system architectures mapping customer missions onto Leanspace's three product lines (MP, MCS, SST).",
      "Defined and scoped PoCs that customers actually paid for — not free pilots.",
      "Led technical handover from presales into Solutions Engineering delivery.",
      "Stayed in the customer relationship long after signing — surfaced expansion and product-feedback signals to PM.",
      "Wore extra hats: AI lead (vetted tools, built the v0-based prototyping workflow that spawned 5 new products), Head of Culture.",
      "Supported grants, marketing, and RFP responses requiring credible technical voice.",
    ],
    skillsAcquired: [
      {
        area: "Technical",
        items: [
          "Cloud-native API-first architectures for mission ops",
          "MCS, planning, FDS, AIT, ground-station network orchestration — full ground segment",
          "Cybersecurity for space-ground (NIST, ISO 27001, data sovereignty constraints)",
          "AI prototyping workflows — Vercel v0, customer-validated clickable demos → PM handoff",
        ],
      },
      {
        area: "Commercial",
        items: [
          "Technical qualification — saying \"no, this won't fit\" with credibility",
          "PoC scoping that maps to revenue, not vanity engineering",
          "Pricing input on engineering-heavy deals (NRE, custom integration)",
          "RFP/RFI technical sections, defensible against incumbent vendors",
        ],
      },
      {
        area: "Cross-cutting",
        items: [
          "Customer lifecycle ownership: presales → onboarding → success → expansion",
          "Internal AI strategy — adoption, vetting, literacy training across engineering and commercial",
          "Cultural and career-development work — visible internal-leadership signal",
        ],
      },
    ],
    artifactsToCollect: [
      "PoCs you scoped and the revenue they generated (paid PoCs > unpaid demos).",
      "Architecture diagrams you produced — sanitised for portfolio use.",
      "AI prototyping case study: v0 process → 5 products (IOS Mission Manager, GS Orchestrator, GS M&C, Pass Orchestrator, Radar M&C).",
      "Named accounts where you stayed embedded through delivery.",
      "Internal training material you produced — concrete \"Head of Culture\" output.",
    ],
    signalToBroadcast: [
      "\"I close-the-loop from sales call to flight ops\" — most SAs don't follow through to delivery.",
      "\"I built the AI prototyping workflow that now feeds product discovery\" — AI fluency with a shipped artifact.",
      "\"I was the technical authority external customers trusted\" — references on demand.",
    ],
    nextRoles: [
      {
        title: "Solutions Architect / Principal SA",
        where: "Larger NewSpace platforms (Planet, Maxar, Capella, ICEYE, Spire) or ground-as-a-service (AWS Ground Station, Azure Orbital, KSAT, ATLAS)",
        why: "SA roles scale with platform complexity — bigger systems, bigger deals.",
      },
      {
        title: "Customer Engineer / Forward Deployed Engineer",
        where: "Defense-tech & dual-use (Anduril, Palantir, Shield AI, Hadrian, Saronic, Apex)",
        why: "FDE roles want exactly your profile: technical depth + commercial fluency + comfort in chaos.",
      },
      {
        title: "Pre-Sales / Sales Engineering Lead",
        where: "Mid-stage SaaS adjacent to space (geospatial, EO analytics, mil-aero simulation)",
        why: "Your protocol fluency (CCSDS, PUS) is overkill for these markets — and they pay for it.",
      },
      {
        title: "Director of Solutions / Head of Customer Engineering",
        where: "Earlier-stage NewSpace where you'd be the first SA hire",
        why: "Build the function instead of plug into someone else's.",
      },
      {
        title: "Product Manager (returning to PM, more senior)",
        where: "Companies that need a PM who's been on the front line",
        why: "Your discovery-from-real-customers fluency is the rarest PM skill.",
      },
    ],
    pitfalls: [
      "Don't accept a pure pre-sales role with no post-sales involvement — you'll lose the half of the job that made you good.",
      "Don't take the title \"Sales Engineer\" if the company actually means \"demo monkey\" — read the comp plan.",
      "Defense roles can lock you into clearance paths — opt-in only if you want that lock-in.",
    ],
  },
  {
    slug: "business-development-manager",
    function: "Business Development Manager",
    short: "BDM",
    oneLine:
      "Owned a geography (US or Rest of World) end-to-end — pipeline, partnerships, capture, and institutional engagement — at a 50-person platform competing with primes for $M+ deals.",
    reportingChain: ["CCO (Alvaro Alonso Ruiz)"],
    whatYouActuallyDid: [
      "Built a country-level GTM from a zero-pipeline start (US: NewSpace operators, primes, integrators, DoD, NASA, Space Force).",
      "Closed paid PoCs (ST Engineering €20K C2 Pro + IMAQ Planner) and downselect rounds (USEI Diamondlink final round).",
      "Got shortlisted in a US Space Force SCN Block Change study as the only non-US vendor in the final three.",
      "Structured partnerships with Qwaltec and Capgemini Federal as teaming vehicles into federal contracting.",
      "Drove product discovery: customer insight → Vercel v0 prototype → 5 new product lines into the roadmap.",
      "Represented the company at major industry events and government forums as the institutional voice.",
    ],
    skillsAcquired: [
      {
        area: "Capture & Sales",
        items: [
          "End-to-end ownership: prospecting → discovery → proposal → negotiation → close",
          "RFP / RFI / SBIR / STTR response leadership",
          "Pipeline forecasting and executive reporting under European reporting cadence",
          "Multi-stakeholder selling: program managers + engineers + procurement + executives",
        ],
      },
      {
        area: "Partnership development",
        items: [
          "Teaming agreements with primes and integrators (Qwaltec, Capgemini Federal)",
          "Joint pursuit strategy and revenue-share structuring",
          "Channel governance under multiple commercial models",
        ],
      },
      {
        area: "Market & institutional",
        items: [
          "US space ecosystem fluency: NewSpace, primes, integrators, DoD, NASA, Space Force, DIU, SpaceWERX",
          "Federal procurement cycles and compliance basics",
          "Conference and forum representation — the company's face in-market",
        ],
      },
    ],
    artifactsToCollect: [
      "Named deals you closed or downselected on — with size and stage.",
      "Partnership agreements you structured (sanitised, headline terms only).",
      "Federal opportunities you ran capture for — even unwon ones are signal.",
      "AI-prototyping case study (shared with SA role) — five products spawned from your discovery loop.",
      "Conference speaker slots, panel appearances, podcast features.",
    ],
    signalToBroadcast: [
      "\"I built the US pipeline for a European NewSpace platform from zero\" — country-launch credibility.",
      "\"I was downselected to final-3 in a Space Force study as the only non-US vendor\" — institutional capture, not just commercial selling.",
      "\"I closed paid PoCs with primes (ST Engineering)\" — paid-pilot to revenue is the BD bar.",
    ],
    nextRoles: [
      {
        title: "Director of Business Development / VP BD",
        where: "Other NewSpace platforms entering the US market, or US-based NewSpace expanding internationally",
        why: "Geography-launch experience is the rare and reusable bit.",
      },
      {
        title: "Capture Manager / Capture Lead",
        where: "Defense primes and integrators (Capgemini Federal, Booz Allen, SAIC, Leidos, Peraton)",
        why: "Federal RFP/SBIR experience translates directly; primes pay more.",
      },
      {
        title: "Head of US Operations / Country Manager",
        where: "European space-tech with no US footprint yet — your exact playbook works",
        why: "You've done it once. Doing it again at a competitor is the highest-leverage move.",
      },
      {
        title: "Founder",
        where: "Space-tech, dual-use, defense-adjacent",
        why: "You've seen the buying patterns from inside three customer segments. Founder-market fit is real here.",
      },
      {
        title: "VC / Operator-in-Residence",
        where: "Space-focused funds (Seraphim, E2MC, OTB, Type One, Space Capital, Decisive Point)",
        why: "Operator profile + market fluency = direct diligence value.",
      },
    ],
    pitfalls: [
      "Don't take a quota-only sales role — you'll lose the partnership and capture muscle that made you valuable.",
      "Defense roles can require US clearance — opt in deliberately.",
      "Title inflation traps: \"VP\" at a 10-person startup vs \"Director\" at a 1000-person prime is the same comp, different signal.",
    ],
  },
  {
    slug: "software-engineering",
    function: "Software Engineering",
    short: "Eng",
    oneLine:
      "Frontend, backend, full-stack, or QA on a cloud-native, API-first platform that runs live spacecraft operations — flight heritage on your CV from a 50-person company.",
    reportingChain: ["Tech Leads (Olivier Coutin BE, Yannick Lohse FE) → VP Engineering (Stan Kaethler) → CTO (Gert Villemos)"],
    whatYouActuallyDid: [
      "Shipped code that runs in real satellite operations — not demos, not internal tools.",
      "Worked across the C2, planning, FDS, and AIT product lines depending on team rotation.",
      "Stack: Java/Kotlin backends, modern TypeScript/React frontends, AWS-heavy cloud infra, REST + event-driven APIs.",
      "Operated under ISO 27001 / NIST-influenced security constraints, with data-sovereignty pressure from European customers.",
      "QA: validated software that flew — a higher bar than typical SaaS QA.",
    ],
    skillsAcquired: [
      {
        area: "Tech",
        items: [
          "API-first platform engineering for mission-critical systems",
          "Cloud-native deployment (public, private, hybrid) for regulated customers",
          "Event-driven and streaming architectures for spacecraft telemetry",
          "Frontend complexity: dense data UIs, real-time updates, multi-role permissions",
        ],
      },
      {
        area: "Space-specific",
        items: [
          "CCSDS / PUS / CSP protocol exposure",
          "Mission data models (telemetry, commands, plans, orbits, events)",
          "Operating under live-mission pressure — production incidents on actual spacecraft",
        ],
      },
      {
        area: "Workplace",
        items: [
          "Working across European + multi-timezone teams",
          "Tight loop with product, design, solutions, and customer-success roles",
          "Translating customer requirements that arrive as PowerPoints into shippable software",
        ],
      },
    ],
    artifactsToCollect: [
      "Public conference talks if you spoke (SmallSat side-meetings, Space Symposium demos).",
      "Open-source contributions you made on company time, if any — get permission before leaving.",
      "Architecture decisions you owned — diagrams sanitised for portfolio use.",
      "Performance / scale numbers you can cite without breaching NDA.",
      "Incident postmortems you led — these are gold for senior interviews.",
    ],
    signalToBroadcast: [
      "\"I shipped production software that flew\" — bypasses 80% of generic SaaS interviews.",
      "\"I worked under ISO 27001 / regulated-customer constraints\" — relevant to defense, fintech, health.",
      "\"My PMs were ex-Telespazio/NASA/ESA\" — your domain exposure is real, not buzzword.",
    ],
    nextRoles: [
      {
        title: "Senior / Staff Engineer",
        where: "Other NewSpace ground software, satellite operators, or EO platforms",
        why: "Your protocol + flight-heritage signal moves you up a level in the same market.",
      },
      {
        title: "Tech Lead / Engineering Manager",
        where: "Smaller NewSpace startups where you'd lead a 3–6 person team",
        why: "You've worked under good tech leads — the jump is plausible and well-paid.",
      },
      {
        title: "Customer Engineer / Forward Deployed",
        where: "Defense-tech (Anduril, Palantir) or space-defense crossover",
        why: "Backend + customer empathy + protocol fluency = highly-paid FDE profile.",
      },
      {
        title: "Backend/Platform at adjacent dual-use",
        where: "Geospatial, EO analytics, mil-aero simulation, autonomy",
        why: "Same depth, broader market, often higher comp.",
      },
      {
        title: "Founding Engineer",
        where: "Seed-stage space-tech",
        why: "You've seen the early version of the playbook from inside; founding-eng comp + equity is the upside.",
      },
    ],
    pitfalls: [
      "Don't take a pure web SaaS role unless you want to leave space — domain depth depreciates fast.",
      "Avoid \"Senior Engineer\" titles that are actually mid-level comp — benchmark via levels.fyi + space-specific recruiters.",
      "Watch the clearance path if you go US-defense — irreversible for non-US passports.",
    ],
  },
  {
    slug: "domain-expert",
    function: "Domain Expert / Solutions Engineer",
    short: "SE/DE",
    oneLine:
      "Embedded subject-matter expert (launchers, AIT, FDS, or ground stations) inside the Solutions team — designed and delivered the technical reality of what was sold.",
    reportingChain: ["Solutions team leads → CTO (Gert Villemos) / CCO (Alvaro Alonso Ruiz)"],
    whatYouActuallyDid: [
      "Lent deep domain credibility to sales motions where customers tested the vendor's literacy.",
      "Co-owned NRE delivery with Solutions Architects on signed contracts.",
      "Trained customer engineering teams during early operations and rollout.",
      "Acted as the long-term technical-relationship anchor for delivery accounts.",
    ],
    skillsAcquired: [
      {
        area: "Domain depth",
        items: [
          "Launchers / AIT / FDS / Ground Station Networks — one+ chosen lane",
          "Vendor-landscape literacy in your domain — legacy and modern players",
          "Mission-specific edge cases — what breaks at integration time",
        ],
      },
      {
        area: "Delivery",
        items: [
          "Non-recurring engineering scoping and execution",
          "Customer training and onboarding documentation",
          "Cross-team coordination between product, engineering, and account ownership",
        ],
      },
    ],
    artifactsToCollect: [
      "List of delivery projects — with mission and customer when public.",
      "Training material you produced for customers.",
      "Domain-specific publications or talks you gave externally.",
    ],
    signalToBroadcast: [
      "\"I am the technical reference for [your lane] in mission ops software\".",
      "\"I delivered NRE that flew\" — outcome, not just consulting.",
    ],
    nextRoles: [
      { title: "Mission Systems Engineer", where: "Operators, primes, agencies", why: "Senior IC track on the operator side." },
      { title: "Senior Solutions Engineer", where: "Other ground software or EO platforms", why: "Same role, larger surface area." },
      { title: "Field Engineering Lead", where: "Constellation owners or GSaaS providers", why: "Build out the function as it scales." },
      { title: "Technical Product Manager", where: "Platforms wanting a PM with field credibility", why: "Lateral to PM with deeper authority." },
    ],
    pitfalls: [
      "Don't drift into pure customer-success roles — your depth depreciates without engineering work.",
      "Negotiate retention of public-speaking rights when moving — your conference profile is leverage.",
    ],
  },
  {
    slug: "design-marketing-pm",
    function: "Design / Marketing / Project Management",
    short: "GTM",
    oneLine:
      "The lateral functions that made the Leanspace brand legible to a buying audience that didn't believe NewSpace could sell to primes.",
    reportingChain: ["Marketing → CCO (Alvaro Alonso Ruiz)", "Design → CTO / Product", "Project Mgmt → CEO/CPO"],
    whatYouActuallyDid: [
      "Design: built dense, technical UIs that operators actually used in live missions (not marketing fluff).",
      "Marketing: produced credible technical content for a buyer audience of engineers and procurement officers.",
      "Project management: ran multi-stakeholder, multi-timezone delivery on signed NRE contracts and grants.",
    ],
    skillsAcquired: [
      {
        area: "Cross-cutting",
        items: [
          "Technical-audience content (whitepapers, datasheets, RFP collateral)",
          "Information design for dense operational dashboards",
          "Stage-gated project execution across procurement-heavy customers",
          "Multi-language, multi-culture team coordination",
        ],
      },
    ],
    artifactsToCollect: [
      "Portfolio of UI work — operations UIs, not marketing pages.",
      "Whitepapers, datasheets, customer case studies you authored.",
      "Project plans and delivery retros you can sanitise.",
    ],
    signalToBroadcast: [
      "\"I designed / wrote / managed for an audience of mission operators and procurement officers\" — not consumer, not generic B2B SaaS.",
    ],
    nextRoles: [
      { title: "Senior Designer / Product Designer", where: "Operations-heavy SaaS (logistics, defense ops, GIS, industrial)", why: "Dense-data UI is its own discipline." },
      { title: "Product Marketing Manager", where: "B2B platforms selling into regulated industries", why: "Your credibility-with-engineers translates." },
      { title: "Technical Program Manager", where: "Larger primes or space agencies", why: "Stage-gate fluency + cross-team coordination is in demand." },
      { title: "Founder / freelance practice", where: "B2B technical content or design studio", why: "Your network of buyers is your moat." },
    ],
    pitfalls: [
      "Don't generalise back to consumer / marketing SaaS — you'll lose the salary premium your technical audience pays.",
    ],
  },
  {
    slug: "operations-finance",
    function: "Finance / Operations / Executive Assistant",
    short: "Ops",
    oneLine:
      "The invisible scaffolding that lets a 50-person platform compete with primes — international payroll, multi-currency contracts, board reporting, scheduling across founders, customers, and investors.",
    reportingChain: ["Head of Finance & Business Ops (Léa Raiche-Marsden) → CEO (Guillaume Tanier)"],
    whatYouActuallyDid: [
      "Ran finance for a VC-backed scale-up: grant accounting (CNES, France 2030), Series A reporting, multi-entity setup (FR + US).",
      "Ops: vendor management, office and remote-team operations across Strasbourg + Denver.",
      "Executive assistant: directly enabled C-suite throughput on a calendar full of customer travel and board meetings.",
    ],
    skillsAcquired: [
      {
        area: "Finance",
        items: [
          "Grant accounting — CNES, France 2030, ESA-adjacent funding",
          "Series A close + post-funding reporting cadence",
          "Multi-currency and multi-entity (EUR / USD, FR-SAS / US-Inc)",
          "Investor reporting (42CAP, Karista, ISAI Cap Venture, Capgemini Ventures, Qwaltec)",
        ],
      },
      {
        area: "Ops",
        items: [
          "International payroll and contractor management",
          "Tooling stack ownership (HR, billing, CRM integrations)",
          "Vendor procurement under audit constraints",
        ],
      },
    ],
    artifactsToCollect: [
      "Funding rounds you supported — Seed + Series A reporting is rare to have on a CV before age 30.",
      "Audits you survived — first audit cycle is a credible artifact.",
      "Tooling migrations you led — name the systems and the savings.",
    ],
    signalToBroadcast: [
      "\"I built the finance / ops scaffolding for a Series A NewSpace company\" — that compresses 5 years of generic experience.",
    ],
    nextRoles: [
      { title: "Head of Finance / FP&A Lead", where: "Next-stage Series A/B NewSpace or deep-tech", why: "Plug-and-play domain fluency." },
      { title: "VC operations / Platform team", where: "Space-focused funds and accelerators", why: "Your founder-empathy is the rare skill." },
      { title: "Founder", where: "Vertical SaaS for VC-backed deep-tech ops", why: "You've felt the pain. That's the company." },
    ],
    pitfalls: [
      "Don't accept a generic accountant role — your scale-up experience deserves an FP&A or Finance Lead step-up.",
    ],
  },
  {
    slug: "leadership-c-suite",
    function: "Founders / C-Suite",
    short: "Exec",
    oneLine:
      "The founders, CCO, CTO, VP Engineering — the layer that defines what \"the company\" means and absorbs the risk when it doesn't.",
    reportingChain: ["Board (42CAP, Karista, ISAI, Capgemini Ventures, Qwaltec, angels)"],
    whatYouActuallyDid: [
      "Set strategy: which markets, which products, which institutional contracts to bid.",
      "Raised €6M seed (2022) and €10M Series A (Nov 2025) with strategic investors including Capgemini Ventures and Qwaltec.",
      "Built the team: 50+ people across Strasbourg + Denver, across French / Spanish / Indian / Canadian co-founder cultures.",
      "Signed 7+ institutional contracts (Airbus DS, Hispasat, ESA, etc.) since 2024.",
    ],
    skillsAcquired: [
      {
        area: "Executive",
        items: [
          "Fundraising — Seed → Series A from credible space investors",
          "Board management with multi-strategic cap-table",
          "Institutional sales motion design — not just commercial",
          "Hiring + retaining international engineering and commercial talent",
        ],
      },
    ],
    artifactsToCollect: [
      "Pitch deck history (revs you can share or describe in interviews).",
      "Cap-table evolution — who came in at what stage and why.",
      "Public talks and category-defining content you authored.",
    ],
    signalToBroadcast: [
      "Category leadership — the founders defined \"software-defined satellite operations\" as a category, not just a product.",
    ],
    nextRoles: [
      { title: "Founder again", where: "Adjacent space-tech / dual-use category", why: "Founder-market fit compounds." },
      { title: "Operating partner", where: "Space-focused VC or deep-tech fund", why: "Operator + brand + thesis = direct deal flow value." },
      { title: "C-suite at larger NewSpace", where: "Series B/C NewSpace needing institutional credibility", why: "Trade upside for scale." },
      { title: "Board portfolio", where: "Early-stage space-tech", why: "Brand + network = repeatable board work." },
    ],
    pitfalls: [
      "Don't get pulled into prime corp-dev roles unless the equity is real.",
      "Watch the burnout cliff after a Series A close — founder roles compound stress.",
    ],
  },
];
