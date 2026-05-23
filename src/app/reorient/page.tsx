import Link from "next/link";
import { PageHeader, Section } from "@/components/section";

export const metadata = {
  title: "Reorient — ex-Leanspace",
  description: "R — Where are we coming from? Where are we at now? Where are we going next? The first phase of the ROW framework for ex-Leanspacers.",
};

const destinations = [
  {
    id: "newspace",
    icon: "🛰️",
    label: "Stay in the mission",
    tag: "NewSpace · ground segment · constellation ops",
    companies: [
      { name: "Open Cosmos", url: "https://opencosmos.com" },
      { name: "D-Orbit", url: "https://dorbit.space" },
      { name: "Kognia Space", url: "https://kognia.com" },
      { name: "leaf space", url: "https://leaf.space" },
      { name: "HEO", url: "https://heo.com" },
      { name: "Exotrail", url: "https://exotrail.com" },
      { name: "Unseenlabs", url: "https://unseenlabs.com" },
      { name: "Major Tom", url: "https://majortom.space" },
    ],
    comp: "€55K–€180K",
    for: "PMs · SAs · Engineers",
    note: "The easiest translation — your domain vocabulary lands without explanation. The market is small; people know Leanspace. Flight-heritage software on a CV clears most screens before you open your mouth.",
    color: "var(--blue)",
  },
  {
    id: "defense",
    icon: "🎯",
    label: "Follow the money",
    tag: "Defense-tech · dual-use · sovereign AI",
    companies: [
      { name: "Helsing", url: "https://helsing.ai" },
      { name: "Exail", url: "https://www.exail.com" },
      { name: "Palantir EU", url: "https://www.palantir.com" },
      { name: "Anduril EU", url: "https://www.anduril.com" },
      { name: "Quantum Systems", url: "https://quantum-systems.com" },
      { name: "Tekever", url: "https://www.tekever.com" },
      { name: "CS Group", url: "https://www.csgroup.eu" },
      { name: "Duality AI", url: "https://duality.ai" },
    ],
    comp: "€80K–€280K+ (EU) · $120K–$350K+ (US)",
    for: "SAs · BDMs · Engineers · PMs",
    note: "EU defense budgets doubled post-2022. Your 'regulated environment + fast delivery + real missions' story is the entry ticket in both geographies. Clearance is a plus but rarely a hard requirement at first.",
    color: "var(--accent)",
  },
  {
    id: "prime",
    icon: "🏛️",
    label: "Trade speed for stability",
    tag: "Prime contractors · space agencies",
    companies: [
      { name: "Airbus DS", url: "https://www.airbus.com/en/space" },
      { name: "Thales Alenia Space", url: "https://www.thalesaleniaspace.com" },
      { name: "OHB", url: "https://www.ohb.de" },
      { name: "GMV", url: "https://www.gmv.com" },
      { name: "Telespazio", url: "https://www.telespazio.com" },
      { name: "ESA careers", url: "https://jobs.esa.int" },
    ],
    comp: "€50K–€120K",
    for: "all functions",
    note: "Slower. Safer. More process than Leanspace. Good if you want to stay in space without startup risk. Flight heritage and software-on-real-missions clears their procurement bars.",
    color: "var(--good)",
  },
  {
    id: "saas",
    icon: "🔁",
    label: "Run it back",
    tag: "B2B SaaS · Series A–C scale-ups",
    companies: [],
    comp: "€65K–€220K + equity",
    for: "PMs · BDMs · SAs",
    note: "Regulated customer, complex product, constrained team, shipping anyway. The domain changes. The playbook doesn't. Most Series A–C companies have never heard of Leanspace — your story lands fresh.",
    color: "var(--warm)",
  },
  {
    id: "founder",
    icon: "🚀",
    label: "Start the thing",
    tag: "Spinout · NewSpace · dual-use",
    companies: [
      { name: "Seraphim Capital", url: "https://seraphimcapital.com" },
      { name: "E2MC", url: "https://e2mc.space" },
      { name: "OTB Ventures", url: "https://otbventures.com" },
      { name: "Type One", url: "https://typeoneventures.com" },
    ],
    comp: "Founding equity · ramen for a bit",
    for: "anyone with an itch",
    note: "You saw the gap. You know what customers couldn't get. That gap might be a company. Use the AI prompts to pressure-test the thesis before you commit. The VCs above know the space sector.",
    color: "var(--warn)",
  },
  {
    id: "institutional",
    icon: "📡",
    label: "Go deep, not fast",
    tag: "Agencies · research · higher ed",
    companies: [
      { name: "ESA", url: "https://jobs.esa.int" },
      { name: "CNES", url: "https://cnes.fr/en/join-cnes" },
      { name: "DLR", url: "https://www.dlr.de/en/career" },
      { name: "ASI", url: "https://www.asi.it" },
      { name: "ISU", url: "https://www.isunet.edu/jobs" },
    ],
    comp: "€45K–€110K",
    for: "domain experts · PMs · Marketing",
    note: "Four ex-Leanspacers are already at ISU alone. Institutional cycles are long and the pay is modest — but the work is meaningful and the job doesn't vanish in the next downturn.",
    color: "var(--fg-mute)",
  },
];

export default function ReorientPage() {
  return (
    <>
      <PageHeader
        kicker="R — Reorient"
        title="Get your bearings before you start rowing."
        lede="Three questions. In order. Don't skip to the third one before you've sat with the first two — that's what every frustrated job seeker does."
      />

      {/* ── WHERE ARE WE COMING FROM ────────────────────────────── */}
      <Section kicker="where are we coming from">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-3">What Leanspace actually was.</h2>
            <p className="text-[color:var(--fg-soft)] text-sm leading-relaxed mb-4">
              Not just a startup. Not just a space company. A 50-person team building production ground-segment software
              used on real satellites in real orbits by real operators paying real money.
              That context matters — most hiring managers have never seen it.
            </p>
            <p className="text-[color:var(--fg-soft)] text-sm leading-relaxed">
              Your job in the next phases is to make that context land for someone who has no reference
              for what ground segment software is, why mission planning is hard, or what a Series A
              space-tech scale-up actually looks like on the inside.
            </p>
          </div>
          <div className="space-y-2">
            <div className="kicker mb-3">What it gave you</div>
            {[
              "Flight-heritage software on your CV — most candidates don't have this",
              "Real production customers: satellite operators, agencies, NewSpace missions",
              "Full product lifecycle: 0→1 build, customer onboarding, live operations",
              "Multi-national, multi-timezone, multi-discipline team under genuine pressure",
              "Space-sector procurement and regulatory experience (ESA heritage, CNES, DLR adjacency)",
              "A Series A commercial story — you were part of something that raised €10M",
            ].map((item) => (
              <div key={item} className="flex gap-2 text-sm text-[color:var(--fg-soft)]">
                <span className="text-[color:var(--accent)] flex-none mt-0.5">·</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── WHERE ARE WE AT NOW ──────────────────────────────────── */}
      <Section kicker="where are we at now" className="border-t hairline">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-3">The post-startup chapter. Nobody talks about this.</h2>
            <p className="text-[color:var(--fg-soft)] text-sm leading-relaxed mb-4">
              Post-startup transitions have a distinct emotional shape. You&apos;re left with a branded hoodie and some
              emotional whiplash. The daily structure is gone. The team is scattered. Even if you wanted to leave,
              that&apos;s disorienting.
            </p>
            <p className="text-[color:var(--fg-soft)] text-sm leading-relaxed mb-4">
              Most people rush through this phase and land somewhere that replicates what they just left —
              same intensity, same misfit, 18-month cycle, repeat. Spend some time here before
              you start sending CVs.
            </p>
            <div className="panel p-4 border-l-2 border-[color:var(--warm)]">
              <div className="text-xs text-[color:var(--warm)] font-medium mb-1">Research says</div>
              <p className="text-xs text-[color:var(--fg-soft)] leading-relaxed">
                Super&apos;s Career Development Theory (1980): career transitions have emotional stages.
                People who skip the consolidation phase after a role ends make reactive decisions
                that don&apos;t fit their values. Prochaska&apos;s Stages of Change (1983): readiness precedes
                effective action. You can&apos;t shortcut it, only rush it.
              </p>
            </div>
          </div>
          <div>
            <div className="kicker mb-3">Sit with these</div>
            <div className="space-y-3">
              {[
                { q: "What drained you at Leanspace? What energised you?", note: "Be honest. Both matter." },
                { q: "What do you need more of?", note: "Mission? Autonomy? Stability? Comp? Connection?" },
                { q: "What kind of environment actually suits how you work?", note: "Not what sounds good — what's true." },
                { q: "What would you regret NOT trying in the next 3 years?", note: "The question most people avoid." },
                { q: "What would success look like at the end of 2027?", note: "Specific. Not vague." },
              ].map(({ q, note }) => (
                <div key={q} className="panel p-3">
                  <div className="text-sm font-medium text-[color:var(--fg)] mb-0.5">{q}</div>
                  <div className="text-xs text-[color:var(--fg-mute)]">{note}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ── WHERE ARE WE GOING ──────────────────────────────────── */}
      <Section kicker="where are we going" className="border-t hairline">
        <h2 className="text-xl font-semibold mb-2">Pick a destination. One or two — not all six.</h2>
        <p className="text-[color:var(--fg-soft)] text-sm leading-relaxed mb-6 max-w-2xl">
          Different destinations need completely different positioning — different CV language, different network, different interview stories.
          Pick first. Build second. Not the other way around.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {destinations.map((d) => (
            <div key={d.id} className="neu p-5 flex flex-col" style={{ borderLeft: `3px solid ${d.color}` }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{d.icon}</span>
                <h3 className="font-semibold">{d.label}</h3>
              </div>
              <div className="mono text-[10px] uppercase tracking-widest mb-3" style={{ color: d.color }}>{d.tag}</div>
              {d.companies.length > 0 ? (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {d.companies.map((c) => (
                    <a key={c.name} href={c.url} target="_blank" rel="noopener noreferrer"
                      className="mono text-[10px] px-2 py-0.5 rounded-full border border-[color:var(--panel-border)] text-[color:var(--fg-mute)] hover:text-[color:var(--fg)] hover:border-current transition"
                      style={{ borderColor: undefined }}
                    >{c.name} ↗</a>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[color:var(--fg-mute)] mono mb-3">Any sector — the playbook transfers.</p>
              )}
              <p className="text-sm text-[color:var(--fg-soft)] leading-relaxed mb-3 flex-1">{d.note}</p>
              <div className="text-xs pt-2 border-t border-[color:var(--panel-border)]">
                <span className="font-medium text-[color:var(--fg)]">{d.comp}</span>
                <span className="text-[color:var(--fg-mute)] ml-2">· {d.for}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="panel p-4 text-xs text-[color:var(--fg-mute)]">
          Comp ranges are 2025–2026 market data. EUR for European roles, USD for US-market defense/tech. Geography shifts by ±20–30%.
        </div>
      </Section>

      {/* ── NEXT STEP ───────────────────────────────────────────── */}
      <Section className="border-t hairline">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="kicker mb-2">You&apos;ve reoriented. Now get specific.</div>
            <p className="text-[color:var(--fg-soft)] text-sm max-w-md">
              You know where you came from, where you are, and (roughly) where you&apos;re going.
              Next: define the target precisely, find out what&apos;s in the way, and map the steps.
            </p>
          </div>
          <Link href="/objectives" className="btn btn-primary flex-none">
            O — Objectives →
          </Link>
        </div>
      </Section>
    </>
  );
}
