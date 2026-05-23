export type Prompt = {
  id: string;
  title: string;
  audience: string[];
  function: string[];
  body: string;
  notes?: string;
};

export const prompts: Prompt[] = [
  {
    id: "cv-translate-leanspace",
    title: "Translate a Leanspace role into outside-world language",
    audience: ["job search", "CV editing"],
    function: ["PM", "SA", "BDM", "Eng", "All"],
    body: `You are helping a former Leanspace employee translate their internal role into language that hiring managers OUTSIDE space-tech will understand. Leanspace is a 50-person Strasbourg-based NewSpace platform building ground-segment software for satellite operations.

Below is my Leanspace role description. Rewrite it as 4–6 CV bullet points for the target role I specify, following these rules:
- Lead with outcome (revenue, customers, products shipped), not activity.
- Quantify with numbers I provide — never invent numbers.
- Use the destination industry's vocabulary, not space-internal terms (e.g. "telemetry pipeline" → "real-time data pipeline").
- Keep one bullet that signals technical depth (protocols, scale, regulated environment).
- End with a bullet that signals scope (geographies, customer types, deal size).

Target role: [paste job title + 2-line description]

Leanspace role description:
[paste your role section here — Core Responsibilities + Projects & Accomplishments]

Numbers I can cite:
- [list of verifiable metrics, e.g. "€20K paid PoC with ST Engineering", "downselected to final 3 in Space Force SCN Block Change", "shipped 5 new product lines"]
`,
    notes:
      "Tip: run it twice — once for the destination role, once for a generic version. Compare. The differences show you what to emphasise in interviews.",
  },
  {
    id: "interview-prep-pm",
    title: "Mock interview — Senior PM at a NewSpace company",
    audience: ["interview prep"],
    function: ["PM"],
    body: `You are the hiring manager for Senior Product Manager at [target company — paste company description]. I am a former Leanspace PM applying for the role. Conduct a realistic 45-minute interview.

Round 1 — 15 minutes — Role & impact:
- Ask me to walk you through the product line I owned at Leanspace.
- Probe on the discovery process I used.
- Push on a launch that didn't go well.

Round 2 — 15 minutes — Domain fluency:
- Test my technical depth on protocols (CCSDS, PUS), orbital mechanics, mission planning concepts.
- Ask about a customer use case where I had to choose between two product directions.

Round 3 — 15 minutes — Leadership and scope:
- Probe on cross-team work (engineering, solutions, sales).
- Ask about hiring or onboarding I led.
- End with a stretch question about what I'd change in the first 90 days here.

After each round give me an interview-grade rating (Strong Hire / Hire / Mixed / No Hire) and the specific phrase or behaviour that drove it.

My Leanspace context: [paste your role section here]
`,
  },
  {
    id: "interview-prep-bd",
    title: "Mock interview — Director of BD at a European defense-tech / dual-use company",
    audience: ["interview prep"],
    function: ["BDM"],
    body: `You are the VP of Sales at [target European defense-tech / dual-use company — e.g. Helsing, Exail, Tekever, CS Group, Palantir EU, Thales DS]. I'm a former Leanspace BDM applying for Director of BD. The role requires institutional capture experience in a European defense procurement context.

Run a realistic 60-minute interview structured as:
1. (10m) Walk me through the most impressive deal I've worked on. Probe on whose voice it was — mine or my CCO's.
2. (15m) European institutional capture: ask me to describe a bid I led. Test fluency on OCCAR, EDA, ESA-STAR, DGA, BMVg, and EU Defence Fund processes. Push on how I navigated dual-use classification and export considerations (EU dual-use regulation 2021/821).
3. (15m) Partnership structuring: I've structured with Capgemini and space-sector integrators. Ask what I learned about teaming vs prime/sub dynamics in European procurement.
4. (10m) Personal motivation: why this market (defense-tech), why now (post-2022 EU rearmament), why not stay in space.
5. (10m) Negotiate: tell me what comp would make me sign and react to my number. Use European market norms (base + bonus structure, options rather than RSUs unless UK/US-listed entity).

At the end give me a written debrief — strong points, gaps, and three things I should fix before the on-site.

My Leanspace context: [paste BDM role section here]
`,
  },
  {
    id: "interview-prep-sa",
    title: "Mock interview — Solutions / Field Engineer at a European defense-tech company",
    audience: ["interview prep"],
    function: ["SA"],
    body: `You are an engineering manager hiring Solutions or Field Engineers at [Helsing | Exail | Palantir EU | CS Group | Thales Digital | Airbus DS Digital | …]. I'm a former Leanspace Solutions Architect.

Run a realistic 90-minute loop with these stages:
1. (20m) Technical depth — walk me through a customer architecture I designed. Probe on cloud, security, data sovereignty (EU GDPR, French SecNumCloud, German BSI C5), scale.
2. (20m) Customer fluency — describe a deal where customer reality contradicted the original scope. How did I handle it?
3. (15m) Code or systems exercise — ask me to whiteboard a small system based on a customer brief you invent. Relevant to a European defense or space-tech context.
4. (15m) AI fluency — I built the v0-based prototyping workflow at Leanspace. Probe on what generalises and what doesn't in a regulated European context.
5. (10m) Defense-tech motivation — why move out of pure space and into dual-use / defense.
6. (10m) Compensation and clearance — European clearance processes differ from US; probe on French habilitation, German Überprüfung, or UK DV as relevant to the company.

End with a hire / no-hire call and three rounds-of-improvement notes.

My Leanspace context: [paste SA role section here]
`,
  },
  {
    id: "networking-outreach",
    title: "Cold outreach to a hiring manager at a target company",
    audience: ["networking", "job search"],
    function: ["All"],
    body: `Write a 90–110 word LinkedIn or email message from me — a former Leanspace [role] — to [target person + role + company]. Goal: 20-minute video call this week or next.

Constraints:
- First sentence: a specific reason I'm writing to THEM (not the company). Mine their recent post / talk / blog if I paste it.
- Second sentence: one credibility line from my Leanspace work, with a real number.
- Third sentence: a specific question only they can answer (not "tell me about the company").
- Fourth sentence: a low-friction call-to-action with two time options.
- No "I'd love to learn more about your journey" — pretentious and generic.
- No long signature.

Target person's recent public output:
[paste link or paragraph]

My Leanspace context (1 paragraph):
[paste]

Target ask: [video call / coffee / async question / referral]
`,
    notes:
      "Iterate on the same outreach for 5 named targets before sending. Patterns will emerge — keep them, drop the rest.",
  },
  {
    id: "salary-negotiation",
    title: "Salary negotiation prep — base, bonus, equity, total",
    audience: ["offer stage"],
    function: ["All"],
    body: `Act as a compensation analyst who has placed candidates at NewSpace companies, European defense-tech, and prime contractors in the last 12 months. Most candidates you see are based in France, Germany, UK, Spain, or India.

Inputs:
- Current Leanspace comp: [base €X / equity Y / bonus structure / signing N/A]
- Target role: [Senior PM | Director of BD | Solutions Engineer | …]
- Target company: [name + stage + last round + headcount]
- Target geography: [Strasbourg / Paris / Munich / Berlin / London / Bangalore / Toulouse / Madrid]
- My BATNA: [other offer or current role retention case]

Output:
1. A market band (10th / 50th / 90th percentile) for the target role at that company stage and geography, citing comparable companies. Use European market data — Glassdoor EU, LinkedIn Salary EU, talent.io (French tech), levels.fyi EU coverage, Jobted, Payscale EU.
2. A specific number I should anchor on for base, signing bonus, and any variable/equity grant. Note: most European companies pay bonus not RSUs unless they're UK/US-listed or Series B+ with option pool.
3. The two leverage points I should use in the next conversation (and which to hold back).
4. Three counters the company is likely to make under European negotiation norms, and my response to each.
5. The single behaviour most likely to lose me 5–15% comp if I do it.
6. India-specific note if target geography is Bangalore: flag the CTC vs in-hand gap; probe on variable pay percentage and ESOP structure.

Be specific. Numbers only — no "depending on …" hedges.
`,
    notes: "Use talent.io (France), Glassdoor EU, LinkedIn Salary, and levels.fyi EU coverage for cross-check. For UK roles also check Totaljobs and ITJobsWatch.",
  },
  {
    id: "founder-thesis",
    title: "Pressure-test a startup thesis as a Leanspace alum",
    audience: ["founder route"],
    function: ["All"],
    body: `Act as a partner at [Seraphim | E2MC | Type One | OTB | Decisive Point]. I'm a former Leanspace [role] considering founding a company in [thesis area].

My one-paragraph thesis: [paste]

The customers I know personally who'd buy on day one: [list 3–5 with names + role + why]

The competitive set I'd face: [list]

The unfair advantage I bring: [1–2 sentences]

Critique the thesis as you would on a Friday-afternoon partner meeting:
1. Hardest question I should expect from a Series A partner.
2. The market-sizing number that will get me through the first filter.
3. Where this thesis pattern-matches to a company that already failed (and what's different now).
4. Three named cap-table targets I should approach FIRST and why.
5. The one milestone in 6 months that turns this from a thesis into a fundable company.

Hold no punches. I have spent five years building software for spacecraft. I can handle real feedback.
`,
  },
  {
    id: "leadership-transition",
    title: "First-90-days plan: IC → Manager / Lead transition",
    audience: ["leadership"],
    function: ["All"],
    body: `I'm an ex-Leanspace [role] moving into my first manager / lead role at [target company / team]. Write a first-90-days plan with these constraints:

Day 1–14:
- Three one-on-ones I MUST do (with whom + first question).
- One artifact I should produce by end of week 2.
- One commitment I should NOT make yet.

Day 15–45:
- The diagnostic I should run on the team and the artefact I should produce.
- The first decision I should make — and the two I should defer.
- The hire / fire / re-org call I should be ready to make.

Day 46–90:
- The first delivered outcome — visible to my manager and to the team.
- The narrative I should be telling about why I'm here.
- The strategic gap I should be raising up the chain.

Use what you know about Leanspace's stage-gate culture (small teams, multi-domain, no slack in the system). Be specific.
`,
  },
  {
    id: "claude-skill-cv-coach",
    title: "Claude Skill — CV Coach (project skill)",
    audience: ["Claude skill"],
    function: ["All"],
    body: `# CV Coach — ex-Leanspace edition

## When to use
The user pastes (or points Claude to) a CV draft and a target job description. The user is a former Leanspace employee whose CV is over-indexed on internal terminology.

## Procedure
1. Read the CV. Identify the 5 weakest bullets (vague, no number, no outcome, generic verb).
2. Read the job description. Identify the 3 keywords the ATS will look for.
3. Read both. Identify the 3 sentences where the user has buried a strong signal under weak phrasing.
4. Output a single before/after table:
   - Bullet (old) | Bullet (new) | Why it's better
5. Output the 3 keywords missing from the CV with the specific sentence to add them to.
6. Output one paragraph: "The story your CV tells right now is X. The story it should tell is Y."

## Style
- Direct. No "consider revising" — say "change this to that".
- Numbers only. If the user can't cite a number, tell them to get one.
- Never invent numbers. If a claim is unverifiable, drop it.

## Anti-patterns
- Don't translate Leanspace terms into other Leanspace terms.
- Don't recommend buzzwords ("synergy", "leveraged", "best-in-class").
- Don't add a "Skills" section that lists tools without context.
`,
    notes:
      "Save as `~/.claude/skills/cv-coach/SKILL.md`. Use with: 'Run cv-coach on my CV vs this JD.'",
  },
  {
    id: "claude-skill-deal-postmortem",
    title: "Claude Skill — Deal Postmortem (for BD / SA alumni)",
    audience: ["Claude skill"],
    function: ["BDM", "SA"],
    body: `# Deal Postmortem — ex-Leanspace edition

## When to use
After a closed-won or closed-lost deal in a new role. Especially useful in the first year out of Leanspace when the user is still calibrating to a new buyer profile.

## Procedure
Ask the user for, then summarise:
1. The deal: customer, ACV, length of cycle, status.
2. The buying centre: who was involved at the customer, on what timeline.
3. The narrative the customer bought (or didn't buy).
4. The two moments where the deal could have died.
5. The one thing the user did that they would not have done at Leanspace.
6. The one thing the user did out of habit from Leanspace that didn't translate.

Produce:
- A 6-bullet postmortem in CRM-paste-ready form.
- A 3-bullet "what I'm changing for the next deal".
- A 1-line "Leanspace habit to retire" or "Leanspace habit to keep".

## Style
- Honest. The user is not allowed to blame the customer.
- Specific. "We were slow" is not a postmortem — "we waited 9 days on legal between paper exchange and signature" is.
- No motivational filler.
`,
    notes:
      "Save as `~/.claude/skills/deal-postmortem/SKILL.md`. Pair with your CRM export.",
  },
  {
    id: "claude-skill-mission-storyteller",
    title: "Claude Skill — Mission Storyteller (for interviews and talks)",
    audience: ["Claude skill"],
    function: ["All"],
    body: `# Mission Storyteller — ex-Leanspace edition

## When to use
The user needs to tell a Leanspace story in an interview, a conference talk, a podcast, or a pitch. The story is technically rich but the audience is not.

## Procedure
1. Ask for the raw story (5–10 sentences) and the audience (recruiter / engineer / investor / general public).
2. Identify the 3 details that are technically interesting and the 3 details that are emotionally interesting.
3. Pick the structure: PROBLEM-CONSTRAINT-MOVE-OUTCOME (technical audiences) or HOOK-STAKES-TURN-PAYOFF (general audiences).
4. Rewrite the story in 4–6 sentences, audience-tuned.
5. Suggest the ONE follow-up question the audience is most likely to ask.
6. Suggest the ONE detail to hold back so you can deliver it as the follow-up answer.

## Style
- Concrete nouns. "A first-of-kind orbital mission" beats "an important customer".
- Cite real metrics. €20K paid PoC. Five product lines. Final 3 of 12 vendors.
- No internal terms unless you immediately define them.
- End with a question or a problem, not a humble-brag.
`,
    notes: "Save as `~/.claude/skills/mission-storyteller/SKILL.md`.",
  },
];
