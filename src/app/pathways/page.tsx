import Link from "next/link";
import { PageHeader, Section } from "@/components/section";
import { pathways } from "@/lib/data/pathways";

export const metadata = {
  title: "Pathways — ex-Leanspace",
  description: "The full post-Leanspace journey: from getting clear on what you want to landing the role, negotiating well, and helping the people who come after you.",
};

// ── Destination data ──────────────────────────────────────────────────────────
const destinations = [
  {
    id: "newspace",
    label: "Stay in the mission",
    tag: "NewSpace · ground segment · constellation ops",
    where: "Open Cosmos · D-Orbit · Kognia · leaf space · HEO · Exotrail · Unseenlabs · Major Tom",
    comp: "€55K–€180K",
    for: "PMs · SAs · Engineers",
    note: "The easiest translation — your domain vocabulary lands without explanation. The market is genuinely small; the Leanspace badge travels fast. Flight-heritage software on a CV clears most screens before you open your mouth.",
    accentClass: "border-[color:var(--blue)] text-[color:var(--blue)]",
  },
  {
    id: "defense",
    label: "Follow the money",
    tag: "Defense-tech · dual-use · sovereign AI",
    where: "Helsing (EU) · Exail · Palantir EU · Anduril EU · Quantum Systems · HEO · Tekever · CS Group · Thales defense · Airbus DS defense",
    comp: "€80K–€280K+ (EU) · $120K–$350K+ (US roles)",
    for: "SAs · BDMs · Engineers · PMs",
    note: "EU defense-tech budgets doubled post-2022. Helsing, Exail, and the sovereign-AI primes are hiring fast. Your 'regulated environment + fast delivery + real missions' story is the entry ticket in both geographies. Clearance is a plus but rarely a hard requirement at first.",
    accentClass: "border-[color:var(--accent)] text-[color:var(--accent)]",
  },
  {
    id: "prime",
    label: "Trade speed for stability",
    tag: "Prime contractors · agencies",
    where: "Airbus DS · Thales · OHB · GMV · Telespazio · ESA-adjacent programmes",
    comp: "€50K–€120K",
    for: "all functions",
    note: "Slower. Safer. More bureaucracy than Leanspace — and that's saying something. Good if you want to stay in space without startup risk. Your flight heritage and software-on-real-missions track record clears their procurement bars.",
    accentClass: "border-[color:var(--good)] text-[color:var(--good)]",
  },
  {
    id: "saas",
    label: "Run it back in a new domain",
    tag: "B2B SaaS · Series A–C · platform companies",
    where: "Any sector — you pick. The pattern is the same.",
    comp: "€65K–€220K + equity",
    for: "PMs · BDMs · SAs",
    note: "You know how this works. Regulated customer, complex product, constrained team, shipping anyway. The domain changes. The playbook doesn't. Series A–C companies want exactly this experience and most of them have never heard of Leanspace, which means your story lands fresh.",
    accentClass: "border-[color:var(--warm)] text-[color:var(--warm)]",
  },
  {
    id: "founder",
    label: "Start the thing you saw was missing",
    tag: "Spinout · NewSpace · dual-use · deep-tech",
    where: "VC-backed or bootstrapped — you pick the cap table",
    comp: "Founding equity · ramen for a bit",
    for: "anyone with an itch",
    note: "You saw the gap. You know what customers couldn't get. That gap might be a company — or it might be someone else's company to build. The AI prompts page has a pressure-test prompt. Use it before you commit.",
    accentClass: "border-[color:var(--warn)] text-[color:var(--warn)]",
  },
  {
    id: "institutional",
    label: "Go deep, not fast",
    tag: "Agencies · higher ed · research",
    where: "ESA · CNES · DLR · ASI · ISU · national space agencies",
    comp: "€45K–€110K",
    for: "domain experts · PMs · Marketing",
    note: "Four ex-Leanspacers are already at ISU alone. Institutional cycles are long and the pay doesn't win competitions. But the work is meaningful, the job doesn't disappear in the next VC downturn, and the network is surprisingly warm.",
    accentClass: "border-[color:var(--fg-mute)] text-[color:var(--fg-mute)]",
  },
];

// ── Components ────────────────────────────────────────────────────────────────
function StageBadge({ n }: { n: number }) {
  return (
    <div className="w-9 h-9 rounded-full bg-[color:var(--accent)] text-white flex items-center justify-center mono text-sm font-bold flex-none">
      {n}
    </div>
  );
}

function StageCard({
  n,
  title,
  sub,
  children,
}: {
  n: number;
  title: string;
  sub: string;
  children: React.ReactNode;
}) {
  return (
    <div className="panel p-0 overflow-hidden">
      <div className="p-5 md:p-6 border-b hairline flex items-start gap-4">
        <StageBadge n={n} />
        <div>
          <h3 className="font-semibold text-[color:var(--fg)] text-lg leading-tight">{title}</h3>
          <p className="text-sm text-[color:var(--fg-soft)] mt-0.5">{sub}</p>
        </div>
      </div>
      <div className="p-5 md:p-6">{children}</div>
    </div>
  );
}

function Resource({
  label,
  href,
  note,
}: {
  label: string;
  href: string;
  note: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-start gap-3 panel p-3 hover:border-[color:var(--accent)] transition group"
    >
      <span className="mono text-xs text-[color:var(--accent)] group-hover:underline flex-none mt-0.5">
        {label} →
      </span>
      <span className="text-xs text-[color:var(--fg-soft)]">{note}</span>
    </Link>
  );
}

function DestCard({ d }: { d: (typeof destinations)[number] }) {
  return (
    <div className={`neu p-5 border-l-2 ${d.accentClass.split(" ")[0]}`}>
      <div className={`kicker mb-1 ${d.accentClass.split(" ")[1]}`}>{d.tag}</div>
      <h4 className="text-base font-semibold mb-2">{d.label}</h4>
      <p className="text-xs text-[color:var(--fg-mute)] mono mb-3 leading-relaxed">{d.where}</p>
      <p className="text-sm text-[color:var(--fg-soft)] leading-relaxed mb-3">{d.note}</p>
      <div className="text-xs">
        <span className="font-medium text-[color:var(--fg)]">{d.comp}</span>
        <span className="text-[color:var(--fg-mute)] ml-2">· {d.for}</span>
      </div>
    </div>
  );
}

function Insight({ children }: { children: React.ReactNode }) {
  return (
    <div className="panel p-4 border-l-2 border-[color:var(--warm)] mt-4">
      <div className="text-xs text-[color:var(--warm)] font-medium mb-1">Research says</div>
      <p className="text-xs text-[color:var(--fg-soft)] leading-relaxed">{children}</p>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function PathwaysPage() {
  return (
    <>
      <PageHeader
        kicker="the full journey"
        title="Six stages. Most people skip the first two."
        lede="The job search is the least interesting part of this. Before you update your CV, you need to know where it's going. And before that, you need to know what you actually want. That's what this page is for."
      />

      {/* Jump links */}
      <div className="border-b hairline bg-[color:var(--bg-soft)]">
        <div className="mx-auto max-w-6xl px-5 py-3 flex items-center gap-1 overflow-x-auto flex-nowrap">
          {[
            { href: "#ground", label: "1 · Ground" },
            { href: "#direction", label: "2 · Direction" },
            { href: "#story", label: "3 · Story" },
            { href: "#search", label: "4 · Search" },
            { href: "#convert", label: "5 · Convert" },
            { href: "#give", label: "6 · Give back" },
          ].map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="mono text-xs text-[color:var(--fg-soft)] hover:text-[color:var(--accent)] whitespace-nowrap px-2 py-1 rounded hover:bg-[color:var(--panel)] transition"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>

      <Section id="ground">
        <StageCard
          n={1}
          title="Ground yourself"
          sub="The chapter just closed. This is the part nobody tells you about."
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-[color:var(--fg-soft)] leading-relaxed mb-4">
                Post-startup transitions have a distinct emotional shape — and most people rush through it. The badge is gone, the daily structure is gone, the team is scattered. That&apos;s disorienting even if you wanted to leave.
              </p>
              <p className="text-sm text-[color:var(--fg-soft)] leading-relaxed mb-4">
                Spend some time here before you pivot to job applications. The people who skip this stage tend to land somewhere that replicates what they just left — same intensity, same misfit, 18-month cycle, repeat.
              </p>
              <div className="space-y-2 text-sm text-[color:var(--fg-soft)]">
                {[
                  "What drained you at Leanspace? What energised you?",
                  "What do you need more of — mission, autonomy, stability, comp, connection?",
                  "What kind of environment actually suits how you work?",
                  "What would you regret NOT trying in the next 3 years?",
                ].map((q) => (
                  <div key={q} className="flex gap-2">
                    <span className="text-[color:var(--accent)] flex-none mt-0.5">?</span>
                    <span>{q}</span>
                  </div>
                ))}
              </div>
              <Insight>
                Super&apos;s Career Development Theory (1980): career stages have emotional components. People who skip the &quot;consolidation&quot; phase after a role ends often make reactive decisions that don&apos;t fit their values. Prochaska&apos;s Stages of Change (1983) shows the same — readiness precedes effective action.
              </Insight>
            </div>
            <div className="space-y-3">
              <Resource
                label="AI prompts"
                href="/skills"
                note="There's a self-reflection and founder-pressure-test prompt in here. Use the reflection one now, before you start applying."
              />
              <div className="panel p-4">
                <div className="kicker mb-2">What Leanspace actually gave you</div>
                <ul className="space-y-1.5 text-sm text-[color:var(--fg-soft)]">
                  {[
                    "You shipped real software on real spacecraft. That's rare.",
                    "You worked in a multi-national, multi-timezone, multi-discipline team under genuine pressure.",
                    "You saw a full product lifecycle — from pitch to flight heritage.",
                    "You navigated space-sector procurement and regulatory constraints.",
                    "You have mission credibility that most PM/BD/Engineer CVs don't.",
                  ].map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-[color:var(--accent)] flex-none mt-0.5">·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </StageCard>
      </Section>

      <Section id="direction" className="border-t hairline">
        <StageCard
          n={2}
          title="Pick your direction"
          sub="Before you update your CV, know where it's going."
        >
          <p className="text-sm text-[color:var(--fg-soft)] leading-relaxed mb-6 max-w-2xl">
            The biggest mistake in a job search is updating your CV before you know the destination. Different destinations require completely different positioning, different language, and different networks. Pick a direction first — then build the story.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {destinations.map((d) => (
              <DestCard key={d.id} d={d} />
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="panel p-4">
              <div className="kicker mb-2">How to pick</div>
              <div className="space-y-2 text-sm text-[color:var(--fg-soft)]">
                {[
                  "Pick 1-2 destinations — not all six. Focus beats breadth.",
                  "Research actual job postings in those categories for 2–3 weeks before applying.",
                  "Talk to one person already doing the job you want — 20 minutes, honest conversation.",
                  "The destination shapes everything downstream: CV language, network targets, interview stories.",
                ].map((tip) => (
                  <div key={tip} className="flex gap-2">
                    <span className="text-[color:var(--accent)] flex-none mt-0.5">→</span>
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
            <Insight>
              Holland&apos;s RIASEC theory (1959) and Social Cognitive Career Theory (Lent et al., 1994) both confirm: people who align their environment with their personality type and self-efficacy beliefs have higher job satisfaction and longer tenure. The destination matters more than the specific company. Comp ranges above are 2025–2026 European market data; geography shifts by ±20–30%.
            </Insight>
          </div>
        </StageCard>
      </Section>

      <Section id="story" className="border-t hairline">
        <StageCard
          n={3}
          title="Build your story"
          sub="You did more than you think. But you probably describe it wrong."
        >
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <p className="text-sm text-[color:var(--fg-soft)] leading-relaxed mb-4">
                The common failure: describing the role you had at Leanspace, not the impact you had. A hiring manager at a defense-tech company or a Series A SaaS doesn&apos;t know what a Solutions Architect at a space software scale-up does. You have to translate it for them.
              </p>
              <div className="space-y-2 text-sm text-[color:var(--fg-soft)]">
                {[
                  "Start with what Leanspace was and what it built — give context before specifics.",
                  "Pick 2-3 projects you owned or contributed to meaningfully.",
                  "For each: what was the problem, what did you do, what was the outcome (measurable if possible).",
                  "Then translate that story for your destination — different words, same truth.",
                  "One CV. One version per destination. Not the same CV sent everywhere.",
                ].map((tip) => (
                  <div key={tip} className="flex gap-2">
                    <span className="text-[color:var(--accent)] flex-none mt-0.5">→</span>
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
              <Insight>
                Signaling theory (Spence, 1973): a CV doesn&apos;t show what you did — it shows what you&apos;re claiming to have done. Specificity (named projects, real numbers, measurable outcomes) is the only credible signal. Generic descriptions are filtered out because they look like everyone else&apos;s generic descriptions.
              </Insight>
            </div>
            <div className="space-y-3">
              <Resource
                label="The work we did"
                href="/org"
                note="Project bullet bank — MPS, MCS, Prométhée, Quantum Space, France 2030 grant, Series A. Pick your projects. Bullets per role."
              />
              <Resource
                label="Function translation guides"
                href="#function-guides"
                note="Eight guides below — PM, SA, BDM, Engineering, and more. Each covers what skills transfer, what artefacts to collect, and five next-step roles."
              />
              <Resource
                label="AI prompts"
                href="/skills"
                note="CV bullet refinement and interview story prep prompts — pre-loaded with Leanspace context."
              />
            </div>
          </div>

          {/* Function pathway cards */}
          <div id="function-guides">
            <div className="kicker mb-4">Translate by function</div>
            <div className="grid md:grid-cols-2 gap-4">
              {pathways.map((p) => (
                <Link
                  key={p.slug}
                  href={`/pathways/${p.slug}`}
                  className="panel p-5 hover:border-[color:var(--accent)] transition group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="tag">{p.short}</span>
                    <span className="mono text-xs text-[color:var(--fg-mute)]">
                      {p.nextRoles.length} next roles · {p.pitfalls.length} pitfalls
                    </span>
                  </div>
                  <h4 className="font-semibold mb-1 group-hover:text-[color:var(--accent)] transition">
                    {p.function}
                  </h4>
                  <p className="text-xs text-[color:var(--fg-soft)] leading-relaxed mb-2">{p.oneLine}</p>
                  <div className="mono text-xs text-[color:var(--accent)]">open guide →</div>
                </Link>
              ))}
            </div>
          </div>
        </StageCard>
      </Section>

      <Section id="search" className="border-t hairline">
        <StageCard
          n={4}
          title="Get in the room"
          sub="Applications without networking fill 20–25% of roles. Networks fill the rest."
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-[color:var(--fg-soft)] leading-relaxed mb-4">
                Cold applications at knowledge-work companies are a lottery. The referral is the path. Not because the system is unfair (though it is), but because referred candidates are pre-screened by someone who knows the role and the company — the hiring manager&apos;s risk goes down. Work the difference.
              </p>
              <div className="space-y-2 text-sm text-[color:var(--fg-soft)]">
                {[
                  "Build a target list of 20–40 companies — not just whatever's on LinkedIn Jobs.",
                  "Map which companies have an ex-Leanspacer who can vouch for you.",
                  "Reach out for a 20-min call before you apply, not as part of applying.",
                  "Ask them: 'What are they actually looking for? Does my background fit?'",
                  "Then apply and ask if they'll put your name forward to the hiring manager.",
                ].map((tip) => (
                  <div key={tip} className="flex gap-2">
                    <span className="text-[color:var(--accent)] flex-none mt-0.5">→</span>
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
              <Insight>
                Granovetter (1973) &quot;The Strength of Weak Ties&quot;: 56% of jobs are found through weak ties — people you know but don&apos;t work with daily. Your ISU connections, former customers, and conference contacts are more valuable leads than your closest colleagues. Warm introductions increase response rates 5–10× over cold applications (LinkedIn Economic Graph, 2023).
              </Insight>
            </div>
            <div className="space-y-3">
              <Resource
                label="Warm calls"
                href="/org"
                note="Companies where ex-Leanspacers have landed — sorted by sector, with opening angle and who to contact."
              />
              <Resource
                label="Networking playbooks"
                href="/networking"
                note="Coffee chat protocols, event strategy, cold outreach sequences, LinkedIn DM scripts."
              />
              <Resource
                label="Directory"
                href="/directory"
                note="The full alumni list — their current roles, sectors, and LinkedIn handles. This is your warm network."
              />
              <div className="panel p-4">
                <div className="kicker mb-2">Where to find the jobs</div>
                <ul className="space-y-1 text-xs text-[color:var(--fg-soft)]">
                  {[
                    "LinkedIn Jobs (filtered by company stage, not just keyword)",
                    "SpaceJobs.global — space-specific board",
                    "Wellfound / AngelList — startup-focused",
                    "Company career pages directly (most aren't on job boards)",
                    "Conference programmes — if you're presenting, you're meeting hiring managers",
                    "VC portfolio pages — 42CAP, Karista, ISAI, Capgemini Ventures",
                  ].map((s) => (
                    <li key={s} className="flex gap-2">
                      <span className="text-[color:var(--fg-mute)] flex-none">·</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </StageCard>
      </Section>

      <Section id="convert" className="border-t hairline">
        <StageCard
          n={5}
          title="Convert the opportunity"
          sub="You're in the room. Don't leave money and clarity on the table."
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-[color:var(--fg-soft)] leading-relaxed mb-4">
                Two things kill good candidates at this stage: poor story translation in interviews, and failing to negotiate the offer. Both are fixable with preparation.
              </p>
              <div className="kicker mb-2">Interview</div>
              <div className="space-y-2 text-sm text-[color:var(--fg-soft)] mb-5">
                {[
                  "Your interviewer has probably never heard of Leanspace. You have 30 seconds to make it land — practice your context-setting sentence.",
                  "Use STAR format for every story (Situation → Task → Action → Result). Every story ends with a number or an outcome.",
                  "Prepare 4–5 Leanspace stories that can flex across different competency questions.",
                  "The 'why Leanspace ended' question will come up — have a clean, honest, forward-facing answer.",
                ].map((tip) => (
                  <div key={tip} className="flex gap-2">
                    <span className="text-[color:var(--accent)] flex-none mt-0.5">→</span>
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
              <div className="kicker mb-2">Negotiate</div>
              <div className="space-y-2 text-sm text-[color:var(--fg-soft)]">
                {[
                  "Never accept the first offer. Always negotiate — even if the offer is good.",
                  "Research comp before the conversation: levels.fyi, Glassdoor, LinkedIn Salary, Compa.",
                  "Negotiate the full package: base, bonus, equity, remote days, title, start date.",
                  "Counter in writing. It's less uncomfortable and easier to track.",
                  "If the range is non-negotiable, negotiate non-cash terms — training budget, extra leave, earlier review.",
                ].map((tip) => (
                  <div key={tip} className="flex gap-2">
                    <span className="text-[color:var(--accent)] flex-none mt-0.5">→</span>
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <Resource
                label="AI prompts"
                href="/skills"
                note="Interview prep and mock-interview prompts pre-loaded with Leanspace context — use these before every interview."
              />
              <div className="panel p-4">
                <div className="kicker mb-2">Comp research sources</div>
                <ul className="space-y-1.5 text-xs text-[color:var(--fg-soft)]">
                  {[
                    "levels.fyi — tech roles by company and level (US-heavy but expanding EU)",
                    "LinkedIn Salary — good for European markets",
                    "Glassdoor — entry and mid-level, useful for benchmarks",
                    "Compa (compa.io) — EU startup-focused comp data",
                    "The Pragmatic Engineer newsletter — engineering comp deep dives",
                  ].map((s) => (
                    <li key={s} className="flex gap-2">
                      <span className="text-[color:var(--fg-mute)] flex-none">·</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Insight>
                Bowles &amp; Babcock (Harvard Kennedy School): people who negotiate comp at offer stage earn 7–14% more in their first year and set a higher base for every future role. The cost of not negotiating compounds over a career. The discomfort is real; the asymmetry is worse.
              </Insight>
            </div>
          </div>
        </StageCard>
      </Section>

      <Section id="give" className="border-t hairline">
        <StageCard
          n={6}
          title="Give back"
          sub="The network holds value long after the badge fades. Help the people who come after you."
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-[color:var(--fg-soft)] leading-relaxed mb-4">
                The ex-Leanspace network is small enough to be warm and specific enough to be useful. The people who make it more valuable are the ones who give without keeping score — make intros, write recs, post jobs, share what worked.
              </p>
              <div className="space-y-2 text-sm text-[color:var(--fg-soft)]">
                {[
                  "Write a LinkedIn recommendation for a former colleague — takes 10 minutes.",
                  "When you're settled in a new role, post the opening on the directory.",
                  "Make a warm intro when you see a fit — most people never ask, so just do it.",
                  "Tell the community what actually worked in your search. That intelligence is valuable.",
                ].map((tip) => (
                  <div key={tip} className="flex gap-2">
                    <span className="text-[color:var(--accent)] flex-none mt-0.5">→</span>
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
              <Insight>
                Grant (2013) Give and Take: givers — people who contribute more than they extract — outperform matchers and takers over time, especially in network-dependent industries. The mechanisms are referrals, trust, and information flow. The space sector is small; your reputation travels. Act accordingly.
              </Insight>
            </div>
            <div className="space-y-3">
              <Resource
                label="Recommendations"
                href="/recommendations"
                note="The guided exchange: give a rec to someone first, then request one back. Three moves, twenty minutes."
              />
              <Resource
                label="Directory"
                href="/directory"
                note="Post a job opening, add a partner, or flag something as outdated. Keep the resource current."
              />
              <Resource
                label="Networking"
                href="/networking"
                note="Making an intro is just one step of a broader reciprocity practice — the protocols are in here."
              />
            </div>
          </div>
        </StageCard>
      </Section>
    </>
  );
}
