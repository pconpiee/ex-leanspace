import Link from "next/link";
import { PageHeader, Section } from "@/components/section";
import { pathways } from "@/lib/data/pathways";

export const metadata = {
  title: "Objectives — ex-Leanspace",
  description: "O — What are we trying to do? What is keeping us from doing it? What are the steps to get there? The second phase of the ROW framework.",
};

const projects = [
  {
    name: "MPS Lite (Mission Planning & Scheduling)",
    what: "Leanspace\'s mission planning app — the flagship of the MPS product line, used in production by paying satellite operators.",
    bullets: {
      "PM / SA": ["Shipped MPS Lite — the flagship app of the MPS product line (services: Plans, Resources, Orbits) — into production with paying operators", "Defined requirements with no formal spec handoff — translated operator workflows into features", "Managed delivery across a distributed FR/US team against real mission timelines"],
      "BD / Sales": ["Positioned a new product category (cloud-native MPS) into a market of legacy tools", "Closed early adopter deals while product was still in development", "Built the competitive narrative against incumbent tools costing 10× the price"],
      "Engineering": ["Built cloud-native mission planning infrastructure used in production for orbital operations", "Delivered multi-tenant SaaS architecture handling mission-critical timing constraints", "Maintained sub-second UI performance for planning scenarios with hundreds of orbit passes"],
      "Marketing": ["Launched a category-defining product with no prior market awareness — built the category first", "Created conference presence and technical content at SmallSat 2023–2025", "Generated inbound pipeline through content targeting constellation operators"],
    },
  },
  {
    name: "Mission Control System (MCS)",
    what: "Real-time telemetry, commanding, and event management for live satellite operations. Actual missions. Actual orbit.",
    bullets: {
      "PM / SA": ["Defined ops workflows for live satellite commanding — zero tolerance for ambiguity", "Collaborated with flight dynamics engineers on safety-critical UI requirements", "Delivered against mission-locked milestones for first orbital customers"],
      "BD / Sales": ["Sold into space agencies and NewSpace operators through 9–18 month procurement cycles", "Managed stakeholder relationships at mission director level across ESA-heritage organisations", "Won competitive evaluations against Kratos, GMV, and other established MCS vendors"],
      "Engineering": ["Built real-time telemetry processing pipeline for production satellite operations", "Implemented fault-tolerant commanding architecture for live orbital missions", "Designed APIs consumed directly by satellite operator ground segments"],
      "Ops / CoS": ["Coordinated customer onboarding for live mission deployments — scope, timeline, risk", "Ran cross-functional delivery reviews for safety-critical software releases"],
    },
  },
  {
    name: "Prométhée IOD Onboarding",
    what: "First customer live on Leanspace for an in-orbit demonstration. Real satellite. The reference case that unlocked subsequent deals.",
    bullets: {
      "PM / SA": ["Onboarded the first customer for a live IOD mission on Leanspace software", "Built the reusable playbook for all subsequent customer onboardings", "Translated operator requirements into deliverables against a hard launch date"],
      "BD / Sales": ["Converted Prométhée from prospect to first orbital customer", "Used as marquee reference case to open the next four customer conversations", "Navigated procurement with a French space agency-heritage team"],
      "Engineering": ["Delivered mission-specific configuration for a live IOD customer on a launch-locked timeline", "Resolved integration issues across customer ground segment and Leanspace cloud platform"],
    },
  },
  {
    name: "Quantum Space (US Customer)",
    what: "Leanspace\'s first American customer — a deep-space mission operator and proof point for transatlantic expansion. Required AWS GovCloud delivery and US compliance.",
    bullets: {
      "BD / Sales": ["Closed Leanspace\'s first US customer — Quantum Space, a deep space mission operator", "Navigated US procurement and export control considerations for space software", "Built the US market entry case that supported the Series A commercial narrative"],
      "PM / SA": ["Ran transatlantic customer onboarding across timezone and compliance constraints", "Documented the reusable US-customer onboarding playbook", "Translated US compliance requirements (GovCloud, data residency) into product specs"],
      "Engineering": ["Delivered AWS GovCloud deployment to meet US data residency requirements — a new infrastructure target for the platform", "Configured multi-region architecture to support a deep-space customer with mission-critical uptime requirements"],
      "Ops / CoS": ["Coordinated US compliance review across legal, engineering, and product for the GovCloud delivery"],
    },
  },
  {
    name: "France 2030 + Japetus (CNES) Grants",
    what: "Two competitive public grants: France 2030 Umbrella (€10.5M, 2023) and Japetus via CNES (~€70K). Full proposals, consortium management, multi-year reporting.",
    bullets: {
      "PM / SA": ["Led technical proposal and delivery management for a competitive €10.5M national grant", "Managed consortium stakeholders and reporting obligations across the grant period"],
      "BD / Sales": ["Won France 2030 Umbrella (€10.5M) through competitive application — material contribution to ARR narrative", "Led Japetus CNES grant (~€70K): built the technical and commercial case from scratch"],
      "Ops / CoS": ["Coordinated grant reporting and compliance across product, engineering, and finance", "Managed deliverable tracking for the multi-year €10.5M programme"],
    },
  },
  {
    name: "Series A — €10M (2023)",
    what: "A €10M Series A round. You were part of the company that raised it — that's in your story.",
    bullets: {
      "BD / Sales": ["Contributed to the commercial narrative and customer evidence base for a €10M Series A", "Built relationships with 42CAP, Karista, and ISAI-aligned contacts during the raise process"],
      "Ops / CoS": ["Supported investor due diligence: data room management, financial modelling, board preparation", "Coordinated across legal, finance, and product teams through the close"],
      "PM / SA": ["Contributed to the product roadmap and customer traction narrative used in investor materials"],
    },
  },
];

const warmCalls = [
  { company: "ISU (International Space University)", sector: "Institutional", why: "4+ ex-Leanspacers already there", angle: "You know the team. Use it directly." },
  { company: "Constellr", sector: "NewSpace · Earth observation", why: "Direct sector overlap — thermal EO constellation", angle: "Ground segment + ops experience translates immediately." },
  { company: "D-Orbit", sector: "NewSpace · in-orbit logistics", why: "EU space scale-up with active hiring", angle: "Startup-to-startup: same intensity, new domain." },
  { company: "Open Cosmos", sector: "NewSpace · end-to-end missions", why: "Known in the Leanspace orbit; flight-heritage overlap", angle: "Your MCS/MPS context is a direct match." },
  { company: "Capgemini (Space & Defense)", sector: "Prime · consulting", why: "Major presence in the France 2030 ecosystem", angle: "Grant and proposal experience is real value here." },
  { company: "42CAP / Karista / ISAI", sector: "VC · deep-tech investors", why: "Backed Leanspace Series A", angle: "You're a known entity. Warm email, not cold." },
  { company: "Upsun (Platform.sh)", sector: "B2B SaaS · cloud infrastructure", why: "Strasbourg-connected, Series B-stage", angle: "Technical SaaS experience in a new domain." },
  { company: "Criteo", sector: "AdTech · public company", why: "Strong Strasbourg engineering presence", angle: "Software-at-scale, very different domain — intentional pivot play." },
];

export default function ObjectivesPage() {
  return (
    <>
      <PageHeader
        kicker="O — Objectives"
        title="Define the target. Clear the obstacles. Take the steps."
        lede="Most people start here — and then wonder why the job search feels directionless. This phase only works if you've done R first."
      />

      {/* ── WHAT ARE WE TRYING TO DO ────────────────────────────── */}
      <Section kicker="what are we trying to do">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-3">Define the specific target.</h2>
            <p className="text-[color:var(--fg-soft)] text-sm leading-relaxed mb-4">
              Not "a product manager role at a tech company." That&apos;s not an objective — that&apos;s a direction.
              An objective is specific enough to tell you when you&apos;ve hit it.
            </p>
            <div className="panel p-4 border-l-2 border-[color:var(--accent)] mb-4">
              <div className="text-xs text-[color:var(--accent)] font-medium mb-1">Example</div>
              <p className="text-xs text-[color:var(--fg-soft)] leading-relaxed">
                &quot;Senior PM at a Series A–B defense-tech or NewSpace company in France, Germany, or UK. Min €90K base. In-person 2–3 days/week. Offer in hand by September.&quot;
              </p>
            </div>
            <div className="space-y-2 text-sm text-[color:var(--fg-soft)]">
              {[
                "Role and seniority: what's the title and level you're going for?",
                "Company type: stage, sector, geography — be specific",
                "Comp floor: what's the minimum you'd accept?",
                "Timeline: when do you need an offer?",
                "Deal-breakers: what would make you say no to an otherwise good offer?",
              ].map((tip) => (
                <div key={tip} className="flex gap-2">
                  <span className="text-[color:var(--accent)] flex-none mt-0.5">→</span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-3">Research before you apply.</h2>
            <p className="text-[color:var(--fg-soft)] text-sm leading-relaxed mb-4">
              Spend 2–3 weeks researching actual job postings in your target category before sending a single application.
              You&apos;ll learn what words they use, what they actually care about, and whether your CV speaks their language.
            </p>
            <div className="space-y-2">
              {[
                { label: "LinkedIn Jobs", url: null, note: "Filter by company stage and sector, not just keyword" },
                { label: "SpaceCrew", url: "https://spacecrew.com", note: "Space-specific board — good for NewSpace and institutional" },
                { label: "Wellfound / AngelList", url: null, note: "Startup-focused — Series A–C roles" },
                { label: "Company career pages", url: null, note: "Most good roles aren't on job boards at all" },
                { label: "VC portfolio pages", url: null, note: "42CAP, Karista, ISAI, Capgemini Ventures — companies they back" },
              ].map(({ label, url, note }) => (
                <div key={label} className="flex gap-3 panel p-3 text-xs">
                  {url ? (
                    <a href={url} target="_blank" rel="noopener noreferrer" className="font-medium text-[color:var(--accent)] hover:underline flex-none w-32">{label} ↗</a>
                  ) : (
                    <span className="font-medium text-[color:var(--fg)] flex-none w-32">{label}</span>
                  )}
                  <span className="text-[color:var(--fg-soft)]">{note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ── WHAT IS KEEPING US ──────────────────────────────────── */}
      <Section kicker="what is keeping us from doing it" className="border-t hairline">
        <h2 className="text-xl font-semibold mb-3">The three obstacles. Be honest about which is yours.</h2>
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {[
            {
              title: "Unclear story",
              desc: "You know what you did, but you can't explain it in a way that lands for someone who's never heard of Leanspace. The bullet bank below fixes this.",
              fix: "Use the project bullets",
              anchor: "#bullet-bank",
            },
            {
              title: "Generic CV",
              desc: "Same CV sent everywhere. No translation for the destination. A defense-tech hiring manager and a Series A SaaS PM need to hear completely different things from the same experience.",
              fix: "Use the function guides",
              anchor: "#function-guides",
            },
            {
              title: "Unactivated network",
              desc: "You have 20 people who know exactly what you built — and most of them are at interesting companies. You haven't activated that yet.",
              fix: "Use the warm calls list",
              anchor: "#warm-calls",
            },
          ].map((item) => (
            <div key={item.title} className="panel p-5">
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-[color:var(--fg-soft)] leading-relaxed mb-3">{item.desc}</p>
              <a href={item.anchor} className="mono text-xs text-[color:var(--accent)] hover:underline">
                {item.fix} ↓
              </a>
            </div>
          ))}
        </div>
      </Section>

      {/* ── WHAT ARE THE STEPS ─────────────────────────────────── */}
      <Section kicker="what are the steps" className="border-t hairline">
        <h2 className="text-xl font-semibold mb-1">Build your story. Translate it. Sharpen it.</h2>
        <p className="text-[color:var(--fg-soft)] text-sm mb-8 max-w-2xl">
          These three resources are the mechanics of the Objectives phase. Use them in order.
        </p>

        {/* Step 1: Project bullet bank */}
        <div id="bullet-bank" className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-7 h-7 rounded-full bg-[color:var(--accent)] text-white mono text-xs font-bold flex items-center justify-center flex-none">1</div>
            <h3 className="font-semibold text-lg">Project bullet bank — pick what you worked on</h3>
          </div>
          <p className="text-sm text-[color:var(--fg-soft)] leading-relaxed mb-5 max-w-2xl">
            Pick the projects you contributed to. Open the function that matches where you&apos;re going (not where you were).
            Copy the bullets. These are written to land with hiring managers who&apos;ve never heard of Leanspace.
          </p>
          <div className="space-y-3">
            {projects.map((proj) => (
              <details key={proj.name} className="group panel p-0 overflow-hidden">
                <summary className="cursor-pointer list-none flex items-center justify-between gap-4 p-4 hover:bg-[color:var(--bg-soft)] transition">
                  <div>
                    <div className="font-medium text-[color:var(--fg)]">{proj.name}</div>
                    <div className="text-xs text-[color:var(--fg-mute)] mt-0.5">{proj.what}</div>
                  </div>
                  <span className="mono text-xs text-[color:var(--accent)] flex-none group-open:hidden">expand ↓</span>
                  <span className="mono text-xs text-[color:var(--accent)] flex-none hidden group-open:inline">close ↑</span>
                </summary>
                <div className="border-t hairline p-4 grid md:grid-cols-2 gap-4">
                  {Object.entries(proj.bullets).map(([fn, bullets]) => (
                    <div key={fn}>
                      <div className="tag text-[10px] mb-2">{fn}</div>
                      <ul className="space-y-1.5">
                        {bullets.map((b: string) => (
                          <li key={b} className="flex gap-2 text-xs text-[color:var(--fg-soft)]">
                            <span className="text-[color:var(--accent)] flex-none mt-0.5">·</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* Step 2: Function guides */}
        <div id="function-guides" className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-7 h-7 rounded-full bg-[color:var(--accent)] text-white mono text-xs font-bold flex items-center justify-center flex-none">2</div>
            <h3 className="font-semibold text-lg">Translate by function — open your guide</h3>
          </div>
          <p className="text-sm text-[color:var(--fg-soft)] leading-relaxed mb-5 max-w-2xl">
            Each guide covers what skills transfer, what artefacts to collect before you lose access, the signals
            to broadcast, and five concrete next-step roles with the right framing.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {pathways.map((p) => (
              <Link
                key={p.slug}
                href={`/pathways/${p.slug}`}
                className="panel p-5 hover:border-[color:var(--accent)] transition group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="tag">{p.short}</span>
                  <span className="mono text-xs text-[color:var(--fg-mute)]">{p.nextRoles.length} next roles · {p.pitfalls.length} pitfalls</span>
                </div>
                <h4 className="font-semibold mb-1 group-hover:text-[color:var(--accent)] transition">{p.function}</h4>
                <p className="text-xs text-[color:var(--fg-soft)] leading-relaxed mb-2">{p.oneLine}</p>
                <div className="mono text-xs text-[color:var(--accent)]">open guide →</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Step 3: Warm calls */}
        <div id="warm-calls" className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-7 h-7 rounded-full bg-[color:var(--accent)] text-white mono text-xs font-bold flex items-center justify-center flex-none">3</div>
            <h3 className="font-semibold text-lg">Warm calls — companies where the door is already open</h3>
          </div>
          <p className="text-sm text-[color:var(--fg-soft)] leading-relaxed mb-5 max-w-2xl">
            These companies have a Leanspace connection — either alumni landed there, or there&apos;s a business relationship.
            A message that references the connection converts 5–10× better than cold outreach.
          </p>
          <div className="grid md:grid-cols-2 gap-3">
            {warmCalls.map((wc) => (
              <div key={wc.company} className="panel p-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="font-medium text-[color:var(--fg)] text-sm">{wc.company}</div>
                  <span className="tag text-[10px] flex-none">{wc.sector}</span>
                </div>
                <p className="text-xs text-[color:var(--fg-mute)] mb-1">{wc.why}</p>
                <p className="text-xs text-[color:var(--fg-soft)]"><span className="text-[color:var(--accent)]">Angle:</span> {wc.angle}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Step 4: AI prompts */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-7 h-7 rounded-full bg-[color:var(--accent)] text-white mono text-xs font-bold flex items-center justify-center flex-none">4</div>
            <h3 className="font-semibold text-lg">Sharpen with AI — prompts pre-loaded with Leanspace context</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { label: "CV bullet refinement", desc: "Turn your raw bullets into STAR-format, impact-first lines that clear ATS screens and land with hiring managers.", href: "/skills#cv" },
              { label: "Interview prep", desc: "Mock interview prompts with Leanspace context built in. Generate competency questions for your target role and practice your answers.", href: "/skills#interview" },
              { label: "Founder pressure test", desc: "If you're considering starting something — use this before committing. It asks the uncomfortable questions.", href: "/skills#founder" },
            ].map((item) => (
              <Link key={item.label} href={item.href} className="panel p-4 hover:border-[color:var(--accent)] transition group">
                <div className="font-medium mb-1 group-hover:text-[color:var(--accent)] transition text-sm">{item.label}</div>
                <p className="text-xs text-[color:var(--fg-soft)] leading-relaxed mb-2">{item.desc}</p>
                <div className="mono text-xs text-[color:var(--accent)]">open prompt →</div>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      {/* ── NEXT STEP ───────────────────────────────────────────── */}
      <Section className="border-t hairline">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="kicker mb-2">Story built. Now go use it.</div>
            <p className="text-[color:var(--fg-soft)] text-sm max-w-md">
              You know what you&apos;re going for and how to describe it. Now: have the plan, do the work, be bold.
            </p>
          </div>
          <Link href="/wrestle" className="btn btn-primary flex-none">
            W — Wrestle →
          </Link>
        </div>
      </Section>
    </>
  );
}
