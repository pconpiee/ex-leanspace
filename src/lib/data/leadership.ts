export type LeadershipGuide = {
  slug: string;
  title: string;
  framing: string;
  forWho: string;
  body: { heading: string; lines: string[] }[];
};

export const leadershipGuides: LeadershipGuide[] = [
  {
    slug: "ic-to-lead",
    title: "From senior IC to first-time manager",
    framing:
      "You delivered alone at Leanspace and got promoted. Now you have 3–6 reports and your output is somebody else's calendar.",
    forWho: "PMs, SAs, Tech Leads, BDM moving to Director.",
    body: [
      {
        heading: "The mental flip",
        lines: [
          "Your job is no longer to ship work — it's to make your team ship better than you would have alone.",
          "The first six months feel like a step backward. That's because they are. Endure it.",
          "Reject one IC task per week to make room for management. Don't sneak ICing in at night.",
        ],
      },
      {
        heading: "First-90 hygiene",
        lines: [
          "One-on-ones 30 minutes weekly. Same time. No skipping. Use a shared doc.",
          "Team meeting 45 minutes weekly. Status is async (writing); the meeting is decision-making only.",
          "Skip-levels every 6 weeks. Lunch or walk, no slides.",
          "Manager 1:1 — write your manager's first question for them. They will appreciate it.",
        ],
      },
      {
        heading: "The Leanspace habits to keep",
        lines: [
          "Stage-gate thinking. You learned to ask 'what would have to be true for this to ship by date X' — keep it.",
          "Cross-team empathy. You worked with engineering, design, sales, customer-success in close quarters. Most large-org managers don't have this.",
          "Customer-evidence in decisions. Take a hypothesis to data, not to opinion.",
        ],
      },
      {
        heading: "The Leanspace habits to retire",
        lines: [
          "'I'll just do it' — at scale that means your team never grows.",
          "Hero on-call. If you are the single point of failure, you have failed at management.",
          "Slack as the operating system. Move important conversations to documents.",
        ],
      },
    ],
  },
  {
    slug: "lead-to-director",
    title: "From lead / manager to director",
    framing:
      "The director job is to design the system that runs the work — not to run the work. Different muscle, often paid more, often hated more.",
    forWho: "Managers stepping into Director / Head of [function] roles.",
    body: [
      {
        heading: "Three artifacts you must produce in the first 90 days",
        lines: [
          "Your function's operating model — one page, what we do and how we measure it.",
          "Your hiring plan — who, when, why, and the role spec drafted not crowdsourced.",
          "Your year-one strategy — three things the function will be famous for at year-end.",
        ],
      },
      {
        heading: "The Leanspace mindset that helps",
        lines: [
          "Resource constraint. You're used to 1.5 FTE doing the work of 5. Build the system that scales with that constraint, not around it.",
          "OPORD-style execution docs. Lift the form into your new org. Most large orgs have nothing this concrete.",
          "Public artifacts. The architecture document the user wrote at ISU is the model — write the equivalent for your function.",
        ],
      },
      {
        heading: "The trap most Leanspace alumni fall into",
        lines: [
          "Hiring too slow because 'we did it with fewer at Leanspace'. The Leanspace cadence was unsustainable. Don't replicate it.",
          "Refusing process because Leanspace was lean. The org you're joining is not Leanspace; their problem is different.",
          "Speaking only to ex-Leanspace colleagues. Build trust with the people who hired you, fast.",
        ],
      },
    ],
  },
  {
    slug: "ic-to-founder",
    title: "From IC at Leanspace to first-time founder",
    framing:
      "You have founder-market fit on three sides (operators, primes, agencies). Most space founders only have one. Use the asymmetry.",
    forWho: "PMs, SAs, BDMs, senior engineers considering starting up.",
    body: [
      {
        heading: "Before you incorporate",
        lines: [
          "Validate the thesis with 25 named customer conversations. Not 5. Not 50. Twenty-five.",
          "Lock the co-founder problem. Two people with overlapping skills + non-overlapping authority. Equal equity unless someone is taking massively asymmetric risk.",
          "Decide if you want VC or not. The answer changes the company you build.",
          "Pre-commit to a 5-year runway in your head. Founder regret usually means you quit at year 4.",
        ],
      },
      {
        heading: "Investor conversations as a Leanspace alum",
        lines: [
          "Lead with the customer signal, not the team bio. Investors meet 5 ex-NewSpace founder teams a week.",
          "Name-drop with consent. Customers + partners + agencies = your network's investment thesis.",
          "Bring a Leanspace pitch deck history if you have one. Investors love to triangulate.",
          "Don't compete head-on with Leanspace. Either they'll squash you or they'll buy you cheap.",
        ],
      },
      {
        heading: "Operational hygiene from day zero",
        lines: [
          "Stage-gate decision making. You learned this at Leanspace; apply ruthlessly to your own runway.",
          "Public artefacts. Architecture docs, principles docs, hiring docs — write them before the team is 5 people.",
          "Founder coaching. Get one from week one. Pay for it.",
        ],
      },
    ],
  },
  {
    slug: "ic-to-academic",
    title: "From IC to faculty / programme director (e.g. ISU)",
    framing:
      "Operator credibility is the rarest asset in space-industry training. Don't let it depreciate by going fully academic.",
    forWho: "Senior alumni considering ISU, Spaceport Alliance, exec-ed.",
    body: [
      {
        heading: "Make sure you build, not just teach",
        lines: [
          "Refuse a pure-teaching role. Negotiate a programme-director seat where you build the curriculum, not just deliver someone else's.",
          "Hybrid is the model — keep one consulting or product role alive to maintain operator credibility.",
          "Set a 3-year review point. Re-evaluate whether the academic role is compounding or insulating you.",
        ],
      },
      {
        heading: "The Leanspace artefacts that translate",
        lines: [
          "Customer-led discovery — most academic programme design is institution-led.",
          "Stage-gate execution — academic programmes are notoriously over-scoped and under-shipped.",
          "Public talks at SmallSat / Symposium — your existing speaker profile is the differentiator.",
        ],
      },
    ],
  },
];
