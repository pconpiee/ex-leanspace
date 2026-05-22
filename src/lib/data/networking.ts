export type NetworkingEvent = {
  name: string;
  cadence: string;
  geography: string;
  audience: string[];
  worthIt: string;
  cost: string;
};

export type Community = {
  name: string;
  type: string;
  link?: string;
  joinNote: string;
};

export type Playbook = {
  title: string;
  audience: string;
  steps: string[];
};

export const events: NetworkingEvent[] = [
  {
    name: "Space Symposium (Colorado Springs)",
    cadence: "Annual — April",
    geography: "USA",
    audience: ["Primes", "Defense", "Agencies", "NewSpace"],
    worthIt:
      "The single highest-density event for US institutional space buyers. Leanspace leadership is a known fixture — Tanier speaks. You will run into ex-colleagues there.",
    cost: "$$$ (badge + travel ~$3K)",
  },
  {
    name: "SmallSat Conference (Utah State)",
    cadence: "Annual — August",
    geography: "USA",
    audience: ["NewSpace", "Constellations", "Ground software"],
    worthIt:
      "The NewSpace event. Side meetings are where deals happen. Leanspace had a public presence at SmallSat 2023, 2024, 2025 — your story has heritage here.",
    cost: "$$ ($800 + Utah travel)",
  },
  {
    name: "Satellite (Washington DC)",
    cadence: "Annual — March",
    geography: "USA",
    audience: ["GEO operators", "Defense", "Ground software", "Comms"],
    worthIt:
      "Operator-heavy. If you are pivoting toward satellite-operator side roles, this is the room.",
    cost: "$$$ ($1.5K + DC travel)",
  },
  {
    name: "World Satellite Business Week (Paris)",
    cadence: "Annual — September",
    geography: "Europe",
    audience: ["Investors", "Operators", "Insurance", "C-suite"],
    worthIt:
      "Senior + investor-heavy. Worth it if you are at director+ level or pursuing investor / operator-in-residence paths.",
    cost: "$$$$ (€3K+)",
  },
  {
    name: "International Astronautical Congress (IAC)",
    cadence: "Annual — Sept/Oct, varying city",
    geography: "Rotating (global)",
    audience: ["Agencies", "Academia", "International primes"],
    worthIt:
      "Best for agency / institutional / international moves. Less commercial than SmallSat / Satellite.",
    cost: "$$$",
  },
  {
    name: "ESA Φ-Week / EO events (Frascati)",
    cadence: "Annual — October",
    geography: "Europe",
    audience: ["EO platforms", "ESA", "Earth observation"],
    worthIt:
      "Pivot point if you are exploring Earth-observation platforms and ESA-adjacent roles.",
    cost: "$",
  },
  {
    name: "ASCEND (AIAA)",
    cadence: "Annual — July, Las Vegas",
    geography: "USA",
    audience: ["NewSpace", "AIAA technical community", "Policy"],
    worthIt:
      "AIAA's pivot toward NewSpace. Strong technical-PM track and policy track.",
    cost: "$$",
  },
  {
    name: "Defense-tech and dual-use summits",
    cadence: "Various — DCC Demo Day, Booz Allen Velocity, DEF AGS",
    geography: "USA (mostly DC)",
    audience: ["Defense-tech", "DoD", "Dual-use VC"],
    worthIt:
      "If you are exploring Anduril / Palantir / Shield AI etc., these are the warm rooms.",
    cost: "$$",
  },
  {
    name: "ISU Annual Alumni events",
    cadence: "Several per year (online + Strasbourg)",
    geography: "Global",
    audience: ["ISU alumni network — 5,500+ across 110 countries"],
    worthIt:
      "Leanspace founder Tanier is an ISU alum. Many Leanspace teammates passed through ISU. Lowest-effort network maintenance.",
    cost: "$ or free",
  },
  {
    name: "Space-tech VC dinners / fund LP events",
    cadence: "Quarterly, invite-only",
    geography: "London, Paris, NYC, SF",
    audience: ["Investors", "Founders", "Operators"],
    worthIt:
      "Highest signal-to-noise if you get in. Use a single warm intro — do not cold-message investors at scale.",
    cost: "Free + travel; gated",
  },
];

export const communities: Community[] = [
  {
    name: "ISU Alumni Network",
    type: "Alumni — Strasbourg-rooted",
    link: "https://www.isunet.edu/",
    joinNote: "Email ISU alumni office. The Strasbourg base means many in-person meetups overlap with the Leanspace office.",
  },
  {
    name: "Space Talent (Space Capital)",
    type: "Job board + career community",
    link: "https://www.spacetalent.org/",
    joinNote: "Subscribe to the newsletter; the spotlight series is a good intro to senior alumni profiles.",
  },
  {
    name: "Space-Careers.com",
    type: "European space-focused jobs board",
    link: "https://www.space-careers.com/",
    joinNote: "Set alerts for Strasbourg, Toulouse, Munich, Bremen, Darmstadt. The institutional roles you want are listed here, not on LinkedIn.",
  },
  {
    name: "newspacetechnical.com / Zero G Talent / SpaceCrew",
    type: "Specialist recruiters",
    joinNote: "Multiple. Build a relationship with one in each market (EU + US). They know what's coming before it's posted.",
  },
  {
    name: "Space Insider",
    type: "Industry newsletter + community",
    joinNote: "Daily-newsletter level fluency; helpful for staying current on funded competitors and ex-colleague moves.",
  },
  {
    name: "Slack / Discord groups",
    type: "Communities",
    joinNote: "Search: \"NewSpace\", \"Aerospace Engineers\", \"Space Builders\", \"Founders Space\". Note: most discord noise; use as job-board not chat.",
  },
  {
    name: "Substacks worth reading",
    type: "Newsletters",
    joinNote: "Payload (general industry), Space Ambition (deal flow + investor view), Orbit Report (deep dives), The Orbital Index (technical).",
  },
];

export const playbooks: Playbook[] = [
  {
    title: "The 'first 30 days after leaving' protocol",
    audience: "Anyone who just left Leanspace",
    steps: [
      "Week 1 — Capture artifacts. Pull every CV-relevant artifact you can legally take (sanitised diagrams, talk recordings, public proposals).",
      "Week 1 — Write the 'leaving' message. One paragraph: what I did, what I'm proud of, what I'm looking for next, how people can help.",
      "Week 2 — Tell 20 people first, post publicly second. Direct DMs to the 20 strongest contacts give you intel before the public market reacts.",
      "Week 2 — LinkedIn post once, then quiet. Long-running 'on the market' posts smell desperate. One post, then your timeline goes back to value-add content.",
      "Week 3 — Run 10 informational conversations. Goal: calibrate your CV language to what each segment hires for, not get a job.",
      "Week 4 — Decide on 3 destination categories from the destinations list. Apply to roles in only those 3 categories. Reject the rest, even if recruiters reach out.",
    ],
  },
  {
    title: "Maintaining the network without becoming a LinkedIn pest",
    audience: "Anyone in role + thinking about the next one",
    steps: [
      "Pick 30 names: 10 ex-colleagues, 10 customers/partners, 10 industry-adjacent.",
      "Tag in a Notion / Sheets system with last-contacted date + reason-to-reach-out.",
      "One outreach per week — value-first (article they'd care about, intro to someone they'd want to meet, a question only they can answer).",
      "Refuse coffee chats with no agenda. Refuse 'pick your brain' requests with no specific question.",
      "Every 6 months: a 1-paragraph status note to all 30, by group BCC or direct DM. Drop the names that don't reciprocate after 2 cycles.",
    ],
  },
  {
    title: "Customer references — extracting them before you leave",
    audience: "PM, SA, BDM who worked with customers",
    steps: [
      "Two weeks before notice: identify 3 customer-side individuals who'd vouch.",
      "On your last day in role: ask explicitly, by email, with a specific phrase. 'Would you be willing to act as a professional reference for me?' Save the reply.",
      "Connect on LinkedIn before your access to the work email drops.",
      "Send a follow-up message 2 weeks after leaving — purely personal, no asks.",
      "Drop a value-add update every 3 months. References stale fast; warmth is the difference between yes and 'I don't really remember them well'.",
    ],
  },
  {
    title: "Conference attendance — how to get value if you only do one a year",
    audience: "Mid-career individual contributors and managers",
    steps: [
      "Pick the right one — see events list. Match audience to your destination, not your present.",
      "8 weeks before: list 20 named people you want to meet. Connect on LinkedIn now.",
      "4 weeks before: book 5 specific 30-minute meetings from that list of 20.",
      "1 week before: write a 50-word pitch of yourself, ready to deliver on demand.",
      "At the event: skip the keynotes. They're recorded. Spend the time in side rooms and hallway tracks.",
      "1 week after: send 20 follow-ups with a specific next step (intro, meeting, link).",
      "1 month after: count the meetings that turned into a second conversation. That's the only metric that matters.",
    ],
  },
];
