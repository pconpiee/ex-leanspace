import Link from "next/link";
import { PageHeader, Section } from "@/components/section";
import { pathways } from "@/lib/data/pathways";

export const metadata = {
  title: "Pathways — ex-Leanspace",
  description: "Where does your Leanspace background actually take you? A destination map + function-by-function translation guides.",
};

// ── Destination map data ──────────────────────────────────────────────────────
const destinations = [
  {
    id: "newspace",
    label: "Stay in the mission",
    tag: "NewSpace · ground segment",
    where: "Kognia, Open Cosmos, D-Orbit, Kubos, Major Tom, leaf space",
    comp: "€60K–€180K",
    for: "PMs · SAs · Engineers",
    note: "The easiest translation. The Leanspace badge means something in a market this small. Flight-heritage software on a CV clears most candidate screens before you open your mouth.",
    accentClass: "border-[color:var(--blue)] text-[color:var(--blue)]",
  },
  {
    id: "defense",
    label: "Follow the money",
    tag: "Defense-tech · dual-use",
    where: "Palantir · Anduril · Shield AI · defense primes",
    comp: "$120K–$350K+ USD",
    for: "SAs · BDMs · Engineers",
    note: "Highest comp ceiling of any path. Your 'regulated environment + fast delivery + real missions' story is the entry ticket. Clearance is a plus but rarely a hard requirement at first.",
    accentClass: "border-[color:var(--accent)] text-[color:var(--accent)]",
  },
  {
    id: "prime",
    label: "Trade speed for stability",
    tag: "Prime contractors · agencies",
    where: "Airbus DS · Thales · Lockheed · ESA-adjacent programmes",
    comp: "€55K–€120K",
    for: "all functions",
    note: "Slower. Safer. More bureaucracy than Leanspace — and that's saying something. Good if you want to stay in space without the startup risk. Flight heritage clears their procurement bars.",
    accentClass: "border-[color:var(--good)] text-[color:var(--good)]",
  },
  {
    id: "saas",
    label: "Run it back in a new domain",
    tag: "B2B SaaS · Series A–C",
    where: "Platform companies · vertical SaaS · scale-ups in any sector",
    comp: "€70K–€220K + equity",
    for: "PMs · BDMs · SAs",
    note: "You know how this works. The domain is different; the playbook isn't. Series A-C companies need people who've shipped in constrained environments. That's you.",
    accentClass: "border-[color:var(--warm)] text-[color:var(--warm)]",
  },
  {
    id: "founder",
    label: "Start the thing you saw was missing",
    tag: "Spinout · NewSpace · dual-use",
    where: "VC-backed or bootstrapped — you pick the cap table",
    comp: "Founding equity · a long few years first",
    for: "anyone with an itch",
    note: "You've seen the gap. You know what customers couldn't get. That gap is a company — or it isn't. The AI prompts page has a pressure-test prompt to help you find out.",
    accentClass: "border-[color:var(--warn)] text-[color:var(--warn)]",
  },
  {
    id: "institutional",
    label: "Go deep, not fast",
    tag: "Agencies · higher ed · research",
    where: "ESA · CNES · DLR · ISU · national space agencies",
    comp: "€50K–€100K",
    for: "domain experts · PMs · Marketing",
    note: "Four of your ex-colleagues are already at ISU alone. Institutional cycles are long and the pay won't win any awards — but the work is meaningful and the job doesn't vanish in the next downturn.",
    accentClass: "border-[color:var(--fg-mute)] text-[color:var(--fg-mute)]",
  },
];

// ── Destination card ──────────────────────────────────────────────────────────
function DestCard({ d }: { d: typeof destinations[number] }) {
  return (
    <div className={`neu p-5 border-l-2 ${d.accentClass.split(" ")[0]}`}>
      <div className={`kicker mb-1 ${d.accentClass.split(" ")[1]}`}>{d.tag}</div>
      <h3 className="text-lg font-semibold mb-2">{d.label}</h3>
      <p className="text-xs text-[color:var(--fg-mute)] mono mb-3">{d.where}</p>
      <p className="text-sm text-[color:var(--fg-soft)] leading-relaxed mb-4">{d.note}</p>
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="text-xs">
          <span className="font-medium text-[color:var(--fg)]">{d.comp}</span>
          <span className="text-[color:var(--fg-mute)] ml-2">· best for {d.for}</span>
        </div>
      </div>
    </div>
  );
}

export default function PathwaysPage() {
  return (
    <>
      <PageHeader
        kicker="pathways"
        title="Where does it take you?"
        lede="Not 'what did you do at Leanspace' — you know that. The question is: what comes next, and what does your Leanspace experience actually buy you there? Pick a destination. Then pick your function."
      />

      {/* Destination map */}
      <Section kicker="the destination map" title="Six places Leanspace experience travels well.">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
          {destinations.map((d) => <DestCard key={d.id} d={d} />)}
        </div>
        <div className="panel p-4 text-sm text-[color:var(--fg-soft)]">
          Comp ranges are 2025–2026 market data. Europe ranges in EUR; defense-tech figures in USD reflect US-market roles. Geography shifts these by ±20–30%.
        </div>
      </Section>

      {/* By function */}
      <Section kicker="by function" title="Now translate your Leanspace role." className="border-t hairline">
        <p className="text-[color:var(--fg-soft)] text-sm leading-relaxed mb-6 max-w-2xl">
          Once you know where you're going, pick your function below. Each page covers the skills that transfer, the artefacts to collect before leaving, the signal to broadcast, and five concrete next-step roles.
        </p>
        <div className="grid md:grid-cols-2 gap-5">
          {pathways.map((p) => (
            <Link
              key={p.slug}
              href={`/pathways/${p.slug}`}
              className="panel p-6 hover:border-[color:var(--accent)] transition group"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="tag">{p.short}</span>
                <span className="mono text-xs text-[color:var(--fg-mute)]">{p.nextRoles.length} next-step roles · {p.pitfalls.length} pitfalls</span>
              </div>
              <h2 className="text-2xl mb-2 group-hover:text-[color:var(--accent)] transition">{p.function}</h2>
              <p className="text-sm text-[color:var(--fg-soft)] mb-4">{p.oneLine}</p>
              <div className="text-xs mono text-[color:var(--fg-mute)] mb-2">Reports into</div>
              <ul className="text-xs text-[color:var(--fg-soft)] space-y-0.5">
                {p.reportingChain.map((r) => <li key={r}>· {r}</li>)}
              </ul>
              <div className="mt-5 mono text-xs text-[color:var(--accent)]">open pathway →</div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
