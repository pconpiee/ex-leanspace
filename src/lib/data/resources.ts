export type Resource = {
  title: string;
  type: "Book" | "Newsletter" | "Podcast" | "Tool" | "Website" | "Course";
  audience: string[];
  link?: string;
  why: string;
};

export const resources: Resource[] = [
  {
    title: "Space Capital — Quarterly Report + Newsletter",
    type: "Newsletter",
    audience: ["Industry overview", "Investors"],
    link: "https://www.spacecapital.com/",
    why: "Quarterly category map and funding data. Best baseline reading for understanding where money is flowing.",
  },
  {
    title: "Payload",
    type: "Newsletter",
    audience: ["Industry overview"],
    link: "https://payloadspace.com/",
    why: "Daily-ish industry summary. Useful for staying in the loop on competitor / customer / ex-colleague moves.",
  },
  {
    title: "SpaceNews",
    type: "Website",
    audience: ["Industry overview"],
    link: "https://spacenews.com/",
    why: "Source of record for funding, programmes, and policy. Leanspace's own funding rounds were announced here.",
  },
  {
    title: "The Orbital Index",
    type: "Newsletter",
    audience: ["Technical depth"],
    link: "https://orbitalindex.com/",
    why: "Engineering-deep weekly. Use to maintain technical fluency outside your own domain.",
  },
  {
    title: "Space Ambition",
    type: "Newsletter",
    audience: ["Investors", "Founders"],
    why: "Investor-angle deep dives. Useful if you are looking at founder or VC routes.",
  },
  {
    title: "Orbit Report",
    type: "Newsletter",
    audience: ["Founders", "Operators"],
    why: "Long-form analysis of specific space-tech companies and category dynamics.",
  },
  {
    title: "Levels.fyi",
    type: "Tool",
    audience: ["Negotiation"],
    link: "https://www.levels.fyi/",
    why: "Comp benchmarks. Filter by space-adjacent (Lockheed, Northrop, Maxar, Palantir, Anduril) — bands are surprisingly visible.",
  },
  {
    title: "Carta — Total Comp Studies",
    type: "Tool",
    audience: ["Negotiation"],
    link: "https://carta.com/",
    why: "Startup-stage equity benchmarks. The signal-to-noise is better than crowdsourced sites at Series A–B stages.",
  },
  {
    title: "Pave",
    type: "Tool",
    audience: ["Negotiation"],
    link: "https://www.pave.com/",
    why: "Comp data by stage and function. Cross-reference against levels.fyi.",
  },
  {
    title: "Space Cadets — podcast",
    type: "Podcast",
    audience: ["Industry overview"],
    why: "Operator and founder interviews — useful for tone, language, and pitch patterns.",
  },
  {
    title: "Main Engine Cut Off (MECO)",
    type: "Podcast",
    audience: ["Industry overview"],
    link: "https://mainenginecutoff.com/",
    why: "Long-running industry podcast. Best for catching mood + sentiment shifts between events.",
  },
  {
    title: "Pathfinder by Payload",
    type: "Podcast",
    audience: ["Industry overview"],
    why: "Conversation-format interviews with founders and operators in the funded NewSpace tier.",
  },
  {
    title: "Crucial Conversations — Patterson et al.",
    type: "Book",
    audience: ["Leadership"],
    why: "Conversation framework that translates directly to customer escalations, internal disagreements, and partnership negotiations.",
  },
  {
    title: "The Hard Thing About Hard Things — Ben Horowitz",
    type: "Book",
    audience: ["Founder", "Leadership"],
    why: "Operating philosophy for the parts of the job nobody teaches at ISU. Read once when you take a leadership role; again two years in.",
  },
  {
    title: "Working Backwards — Bryar / Carr",
    type: "Book",
    audience: ["PM", "Founder"],
    why: "Amazon's operating mechanisms (PR-FAQ, narratives, six-pagers) are directly usable inside a 50-person company.",
  },
  {
    title: "The Trusted Advisor — Maister / Green / Galford",
    type: "Book",
    audience: ["SA", "BD", "Account roles"],
    why: "The classic on customer-side credibility. Read before any move into customer-engineering or BD director roles.",
  },
  {
    title: "Selling to Big Companies — Jill Konrath",
    type: "Book",
    audience: ["BD", "Capture"],
    why: "Practical playbook for institutional sales. Read before transitioning into defense or prime-side capture.",
  },
  {
    title: "Inspired & Empowered — Marty Cagan",
    type: "Book",
    audience: ["PM", "Product Lead"],
    why: "If you only read two books for product leadership, read these two. Skip his blog.",
  },
  {
    title: "The Manager's Path — Camille Fournier",
    type: "Book",
    audience: ["Engineering Lead"],
    why: "The cleanest framing of the IC → manager → director → VP progression in software.",
  },
  {
    title: "Negotiating the Impossible — Deepak Malhotra",
    type: "Book",
    audience: ["Negotiation"],
    why: "Strategy-level negotiation thinking. Pairs well with Carta + levels.fyi data work for offer stage.",
  },
  {
    title: "Claude Code documentation",
    type: "Website",
    audience: ["AI fluency"],
    link: "https://docs.claude.com/",
    why: "Official docs for the CLI + Skills + Agent SDK. Build your own skills (this site's /skills page is a starter) inside ~/.claude/skills/.",
  },
  {
    title: "Anthropic — Building Effective Agents",
    type: "Website",
    audience: ["AI fluency"],
    link: "https://www.anthropic.com/research",
    why: "Patterns paper + research notes on agent architectures — directly applicable to building career-helper or capture-support tools yourself.",
  },
];
