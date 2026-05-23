export type Destination = {
  slug: string;
  category: string;
  oneLine: string;
  whatItHires: string[];
  examples: string[];
  whyLeanspaceWorks: string;
  yellowFlags: string[];
  comp: string;
};

export const destinations: Destination[] = [
  {
    slug: "newspace-startups",
    category: "NewSpace startups (seed → Series B)",
    oneLine:
      "Earlier-stage space companies that need someone who has already shipped flight-proven software at a startup speed.",
    whatItHires: [
      "Senior PMs / Heads of Product",
      "Solutions Architects + Customer Engineers",
      "Founding / Senior Engineers",
      "First commercial hires for new geographies",
    ],
    examples: [
      "Ground & mission ops: Kubos, Major Tom, Cognitive Space, Antaris, Hubble Network, Quindar, ATLAS Space Operations",
      "Constellations: ICEYE, Capella, Planet, Spire, Albedo, Muon Space, Hydrosat",
      "Launch & in-space: K2 Space, Apex, Impulse, True Anomaly, Stoke, Astranis",
      "Geo-EO platforms: Picterra, Earthdaily, Sylvera, Planet Labs",
    ],
    whyLeanspaceWorks:
      "These companies are buying what Leanspace was building. Leanspace alumni walk in with shipped product, customer language, and a network in three buying audiences (operators, primes, agencies).",
    yellowFlags: [
      "Pre-seed companies with no funded contracts — fun but precarious.",
      "Founders without space-domain credibility — exhausting to evangelise from inside.",
      "Equity-heavy compensation without revenue traction — model the downside carefully.",
    ],
    comp: "Cash typically flat or modestly up vs Leanspace senior bands; equity is the upside, with realistic outcomes 4–7 years out.",
  },
  {
    slug: "primes-and-integrators",
    category: "Space primes & system integrators",
    oneLine:
      "Large established players (Airbus DS, Thales Alenia, Telespazio, Lockheed, Northrop, Maxar, L3Harris) building NewSpace-velocity products inside slower organisations.",
    whatItHires: [
      "Product Managers for digital / cloud product groups",
      "Capture Managers for institutional pursuits",
      "Solutions Architects for emerging-product divisions",
      "Senior Engineers for new-build (not legacy) platforms",
    ],
    examples: [
      "Europe: Airbus Defence and Space, Thales Alenia Space, Telespazio, OHB, GMV, Sener, Indra",
      "USA: Lockheed Martin, Northrop Grumman, Raytheon, L3Harris, Maxar, Booz Allen, SAIC, Leidos, Peraton",
      "Capgemini Federal (existing Leanspace partner — warm intro available)",
    ],
    whyLeanspaceWorks:
      "Primes want NewSpace muscle without the NewSpace risk. Your customers and partners (Hispasat, ESA, Airbus DS) already exist inside their order book.",
    yellowFlags: [
      "Process drag — what took you two weeks at Leanspace will take two quarters.",
      "Title-grade mismatch — your scope of ownership is rare at primes; recruiters underprice it.",
      "Clearance traps for US roles — opt-in deliberately, not by accident.",
    ],
    comp: "Cash up, equity gone, bonus structures real. Total comp can rise 20–40% with worse autonomy.",
  },
  {
    slug: "government-defense",
    category: "Government & defense (US + EU)",
    oneLine:
      "Space agencies and defense buyers wanting commercial-velocity people inside their own buildings.",
    whatItHires: [
      "Technical advisors / programme managers (ESA, CNES, DLR, UKSA, ASI, SSA, SCA)",
      "Capture and BD officers at defense primes",
      "Civil-servant track at NewSpace-adjacent agencies (DIU, SpaceWERX, SCO, NATO ACT)",
    ],
    examples: [
      "Europe: ESA (ESTEC, ESOC, ESRIN), CNES, DLR, ASI, UKSA, EUSPA, Bundeswehr Space Command",
      "USA: NASA, USSF Space Systems Command, SDA, DIU, SpaceWERX, AFRL, NRO (clearance-gated)",
      "International: NATO ACT, NATO STO, Five Eyes-adjacent partner programmes",
    ],
    whyLeanspaceWorks:
      "You've sold to or partnered with these institutions already. You speak their procurement language and you know what \"institutional-grade\" actually means.",
    yellowFlags: [
      "Citizenship requirements — most government roles are gated by citizenship + clearance, not just skills.",
      "Pay bands are public — you can model salary precisely before you apply.",
      "Slow hiring loops — measure in months, not weeks.",
    ],
    comp: "Cash typically lower than NewSpace senior bands; benefits + pension + mission stability are the trade.",
  },
  {
    slug: "defense-tech-dual-use",
    category: "Defense-tech & dual-use",
    oneLine:
      "VC-backed defense and dual-use startups paying NewSpace-plus rates for forward-deployed engineers and capture leads.",
    whatItHires: [
      "Forward-Deployed / Customer Engineers",
      "Capture and BD with federal experience",
      "Product Managers for defense product lines",
      "Solutions Architects with security clearances or willingness to obtain them",
    ],
    examples: [
      "USA: Anduril, Palantir USG, Shield AI, Hadrian, Saronic, Apex Space, True Anomaly, Sift, Vannevar Labs",
      "Europe: Helsing, Quantum Systems, Tekever, Preligens (now Safran.AI), Comand AI",
      "Dual-use space: Slingshot Aerospace, LeoLabs, Privateer, Aalyria",
    ],
    whyLeanspaceWorks:
      "Your sales motion at Leanspace was already \"non-traditional vendor wins institutional study\" — that is exactly the defense-tech playbook.",
    yellowFlags: [
      "Clearance lock-in for non-US citizens — once you start the path it constrains future moves.",
      "Defense ethics check — some buyers and missions you may not want to be associated with.",
      "Burn rates and culture — defense-tech is intense, opt-in deliberately.",
    ],
    comp: "Comp tends to be 1.3–1.8x Leanspace bands cash + meaningful equity for senior roles.",
  },
  {
    slug: "operators-constellations",
    category: "Satellite operators & constellation owners",
    oneLine:
      "The customer side of the table — buyers of ground-segment platforms moving in-house or maturing their ops teams.",
    whatItHires: [
      "Mission managers / Mission ops leads",
      "Ground systems engineers",
      "Product owners for in-house tooling",
      "Operations transformation leads",
    ],
    examples: [
      "GEO: SES, Eutelsat, Hispasat, Intelsat, Inmarsat (Viasat), Telesat",
      "Constellations: Iridium, Globalstar, Planet, Spire, ICEYE, Capella",
      "Hosted-payload buyers: Loft, D-Orbit, EnduroSat, Hyperion, Endurosat",
    ],
    whyLeanspaceWorks:
      "You spent years understanding what these teams needed. Coming in-house compresses 5 years of role learning into the first quarter.",
    yellowFlags: [
      "Politics — internal ops teams often resent vendor-side hires who \"sold to them\".",
      "Pace — operator ops cultures are slower; manage expectations.",
      "Career ceiling — moving up inside an operator is slower than NewSpace startups.",
    ],
    comp: "Cash competitive, equity unusual unless it's a venture-backed constellation; pension and benefits real.",
  },
  {
    slug: "founder-route",
    category: "Founder / co-founder",
    oneLine:
      "You've now seen the operator gap, the prime gap, and the agency gap from inside the same company. Start something pointed at one of them.",
    whatItHires: [
      "You. Eventually employees.",
    ],
    examples: [
      "Categories with whitespace from a Leanspace-alum POV: ground-station automation, FDS-as-a-service, AI for mission planning, multi-orbit autonomy, in-orbit servicing software, regulatory-tooling for space.",
      "Investor warmth: Seraphim, E2MC, Type One Ventures, Decisive Point, Space Capital, OTB Ventures, Promus Ventures.",
    ],
    whyLeanspaceWorks:
      "You have the network on three sides (operators, primes, agencies) and a credible founder-thesis on at least one. That's the bar — most space founders only have one of those.",
    yellowFlags: [
      "Don't start the company you wish Leanspace had been — you'll just lose to Leanspace.",
      "Co-founder fit is the #1 risk factor; don't optimise for speed over fit.",
      "Burn-rate hygiene from day one — the cap-table you accept defines the company.",
    ],
    comp: "Founder cash low (€60–120K depending on round) + equity. Outcome is binary; the upside is the only reason to take this path.",
  },
  {
    slug: "investor-operator",
    category: "VC / investor / operator-in-residence",
    oneLine:
      "Space-focused funds are short on operators with platform + commercial fluency.",
    whatItHires: [
      "Operator-in-residence",
      "Investor / Principal",
      "Platform team (deal sourcing, portfolio support)",
    ],
    examples: [
      "Seraphim Space, E2MC, Type One Ventures, Promus Ventures, Space Capital, Noosphere, Decisive Point, Cantos, OTB Ventures, Karista, 42CAP",
      "Accelerators: Starburst Aerospace, ESA BIC, Y Combinator (space track), Techstars Space",
    ],
    whyLeanspaceWorks:
      "Investors triangulate from operator references. You can be the person fund partners call before deciding to invest in a ground-segment company.",
    yellowFlags: [
      "Long path to carry — non-partner roles cap your upside.",
      "Optionality is the appeal — but cycles are slow and outcomes diffuse.",
      "Demands public-profile and network maintenance work.",
    ],
    comp: "Cash 0.9–1.3x prior role; carry only matters if you stay long enough.",
  },
  {
    slug: "academic-training",
    category: "Academic / training / executive education",
    oneLine:
      "International Space University (Strasbourg), Spaceport leadership programmes, exec-ed for space and dual-use — niche but well-paid for the right operator profile.",
    whatItHires: [
      "Programme directors and instructional designers",
      "Faculty practitioners",
      "Executive-education business development",
    ],
    examples: [
      "International Space University (ISU) Strasbourg — adjacent to Leanspace HQ; alumni-friendly.",
      "Global Spaceport Alliance — credentialing programmes for spaceport executives.",
      "Forbes-Space, Space Symposium, AIAA, SmallSat Conference education programmes.",
      "Business schools with space programmes: ISAE-SUPAERO, TU Delft, Cranfield, MIT MBA Aerospace.",
    ],
    whyLeanspaceWorks:
      "Your customer-language fluency + flight-heritage credibility is rare in academia. Adult learners want to learn from someone who actually did it.",
    yellowFlags: [
      "Compensation drift if you take a pure faculty role — opt for hybrid (some product / consulting work).",
      "Academic politics differ from startup politics — different skills required.",
    ],
    comp: "Base lower than NewSpace senior bands; consulting + speaking + content side-income is the model.",
  },
];
