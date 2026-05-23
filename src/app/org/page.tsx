import Link from "next/link";
import { PageHeader, Section } from "@/components/section";

export const metadata = {
  title: "What we built — ex-Leanspace",
  description: "The work worth name-dropping, translated per role. Plus the customer and partner network that's a warm call waiting to happen.",
};

// ── Project data ──────────────────────────────────────────────────────────────
const projects = [
  {
    id: "mps",
    name: "Mission Planning Suite (MPS Lite)",
    what: "Leanspace's first shipped product. Orbital mission planning software — timeline planning, resource allocation, link budget management — used in production by real satellite operators.",
    bullets: {
      "PM / SA": [
        "Shipped a 0→1 orbital mission planning product used in production by paying customers",
        "Defined requirements with no formal spec handoff — translated operator workflows into features",
        "Managed delivery across a distributed FR/US team against real mission timelines",
      ],
      "BD / Sales": [
        "Positioned a new product category (cloud-native MPS) into a market of legacy tools",
        "Closed early adopter deals while product was still in development",
        "Built the competitive narrative against incumbent tools costing 10× the price",
      ],
      "Engineering": [
        "Built cloud-native mission planning infrastructure used in production for orbital operations",
        "Delivered multi-tenant SaaS architecture handling mission-critical timing constraints",
        "Maintained sub-second UI performance for planning scenarios with hundreds of orbit passes",
      ],
      "Marketing": [
        "Launched a category-defining product with no prior market awareness — built the category first",
        "Created conference presence and technical content at SmallSat 2023–2025",
        "Generated inbound pipeline through content targeting constellation operators",
      ],
    },
  },
  {
    id: "mcs",
    name: "Mission Control System (MCS)",
    what: "Real-time telemetry, commanding, and event management for live satellite operations. Not a simulation, not a prototype — actual missions, actual orbit.",
    bullets: {
      "PM / SA": [
        "Defined ops workflows for live satellite commanding — zero tolerance for ambiguity",
        "Collaborated with flight dynamics engineers on safety-critical UI requirements",
        "Delivered against mission-locked milestones for first orbital customers",
      ],
      "BD / Sales": [
        "Sold into space agencies and NewSpace operators through 9–18 month procurement cycles",
        "Managed stakeholder relationships at mission director level across ESA-heritage organisations",
        "Won competitive evaluations against Kratos, GMV, and other established MCS vendors",
      ],
      "Engineering": [
        "Built real-time telemetry processing pipeline for production satellite operations",
        "Implemented fault-tolerant commanding architecture for live orbital missions",
        "Designed APIs consumed directly by satellite operator ground segments",
      ],
      "Ops / CoS": [
        "Coordinated customer onboarding for live mission deployments — scope, timeline, risk",
        "Ran cross-functional delivery reviews for safety-critical software releases",
      ],
    },
  },
  {
    id: "promethe",
    name: "Prométhée IOD Mission Onboarding",
    what: "The first customer to go live on Leanspace for an in-orbit demonstration mission. Real satellite, real orbit, real operations team. The reference case that unlocked subsequent deals.",
    bullets: {
      "PM / SA": [
        "Onboarded the first customer for a live IOD mission on Leanspace software",
        "Built the reusable playbook for all subsequent customer onboardings",
        "Translated operator requirements into deliverables against a hard launch date",
      ],
      "BD / Sales": [
        "Converted Prométhée from prospect to first orbital customer",
        "Used as the marquee reference case to open the next four customer conversations",
        "Navigated procurement with a French space agency-heritage team",
      ],
      "Engineering": [
        "Delivered mission-specific configuration for a live IOD customer on a launch-locked timeline",
        "Resolved integration issues across customer ground segment and Leanspace cloud platform",
      ],
    },
  },
  {
    id: "quantum",
    name: "Quantum Space (US Customer Onboarding)",
    what: "US deep-space startup — Leanspace's first American customer and the proof point for transatlantic expansion.",
    bullets: {
      "BD / Sales": [
        "Closed Leanspace's first US customer — Quantum Space, a deep space mission operator",
        "Navigated US procurement and export control considerations for space software",
        "Built the US market entry case that supported the Series A commercial narrative",
      ],
      "PM / SA": [
        "Ran transatlantic customer onboarding across timezone and compliance constraints",
        "Documented the reusable US-customer onboarding playbook",
      ],
    },
  },
  {
    id: "grants",
    name: "France 2030 Umbrella Grant + Japetus (CNES)",
    what: "Two competitive public grants: France 2030 Umbrella (€10.5M, 2023) and Japetus via CNES (~€70K). Both required full technical proposals, consortium management, and multi-year reporting.",
    bullets: {
      "PM / SA": [
        "Led technical proposal and delivery management for a competitive €10.5M national grant",
        "Managed consortium stakeholders and reporting obligations across the grant period",
      ],
      "BD / Sales": [
        "Won France 2030 Umbrella (€10.5M) through competitive application — material contribution to ARR narrative",
        "Led Japetus CNES grant (~€70K): built the technical and commercial case from scratch",
        "Used grant validation as independent proof of technical credibility in enterprise sales",
      ],
      "Ops / CoS": [
        "Coordinated grant reporting and compliance across product, engineering, and finance",
        "Managed deliverable tracking for the multi-year €10.5M programme",
      ],
      "Marketing": [
        "Drafted public-facing content for the France 2030 announcement — picked up by French space press",
      ],
    },
  },
  {
    id: "series-a",
    name: "Series A — €10M (November 2025)",
    what: "Leanspace's Series A. €10M closed with Capgemini Ventures, 42CAP, Karista, and ISAI. You were in the building when this happened — and that's on your LinkedIn.",
    bullets: {
      "BD / Sales": [
        "Contributed customer evidence and commercial traction data to investor due diligence",
        "Built and maintained investor relationships through the Series A process",
      ],
      "PM / SA": [
        "Supported product roadmap and technical narrative for investor materials",
        "Ran customer reference interviews and case studies used in the pitch deck",
      ],
      "Ops / CoS": [
        "Managed data room, diligence requests, and cross-functional Series A coordination",
        "Supported financial modelling and KPI reporting for investor materials",
      ],
      "Engineering": [
        "Contributed to technical due diligence documentation and architecture review",
        "Built the platform reliability track record referenced in investor materials",
      ],
      "Marketing": [
        "Created investor-facing materials: pitch deck support, press release, brand positioning",
        "Managed announcement communications — SpaceNews, press, LinkedIn amplification",
      ],
    },
  },
];

// ── Warm call data ────────────────────────────────────────────────────────────
const warmCalls = [
  {
    company: "International Space University (ISU)",
    why: "4 ex-Leanspacers are now faculty, staff, or regular guests. The warmest warm call in the directory.",
    angle: "Reference the Leanspace-ISU connection directly. Ask for an intro to the hiring manager via one of the four. ISU hires for space policy, programme management, and tech roles year-round.",
    contacts: ["Patrick Connolly", "Jay Gaillard", "Justine Engel", "Alistair Gray"],
    sector: "Higher Ed / Space",
  },
  {
    company: "Constellr",
    why: "German EO startup. 2 ex-Leanspacers there now — one on mission ops software, one as PM. They know how Leanspace worked.",
    angle: "Strong fit for ground segment, mission ops, and PM roles. Stuart and Eser can get your CV in front of the right person before you apply cold.",
    contacts: ["Stuart Gill", "Eser Gül"],
    sector: "Earth Observation / NewSpace",
  },
  {
    company: "D-Orbit",
    why: "In-orbit services company. Roberto Travaglini moved there as Ground Systems Engineer — direct line into their team.",
    angle: "Growing market. Ground systems and mission ops are their core hire. Reference Leanspace MCS work specifically.",
    contacts: ["Roberto Travaglini"],
    sector: "In-Orbit Services",
  },
  {
    company: "Open Cosmos",
    why: "UK-based small sat operator. Marion Pigassou is there as Mission Operations Engineer — she can give you the honest read on the team.",
    angle: "Ask Marion for a referral before applying. She knows who's hiring and what they actually need.",
    contacts: ["Marion Pigassou"],
    sector: "Small Sat Operations",
  },
  {
    company: "Capgemini Ventures",
    why: "Strategic investor in Leanspace's Series A. They funded you — that's a warm opening line.",
    angle: "Their space and deep tech portfolio is growing. Reference the investor relationship and Series A context. Ask about portfolio companies that might be hiring.",
    contacts: [],
    sector: "VC / Deep Tech",
  },
  {
    company: "42CAP / Karista / ISAI",
    why: "Financial investors in Leanspace's Series A. Being from a portfolio company is a credible entry point into their wider network.",
    angle: "Good for transitions into VC/investing, or for warm intros to other portfolio companies. Reference the Leanspace investment.",
    contacts: [],
    sector: "Venture Capital",
  },
  {
    company: "Upsun (formerly Platform.sh)",
    why: "Paris-based cloud PaaS. Kateryna Dvornichenko — former Leanspace PM — is a Product Manager there.",
    angle: "Good fit for PM, engineering, or product roles with a cloud/infrastructure background. Kateryna can give you the honest read on culture and hiring.",
    contacts: ["Kateryna Dvornichenko"],
    sector: "Cloud PaaS",
  },
  {
    company: "Criteo",
    why: "Global AdTech, large Paris engineering team. Andrea Rodriguez moved there as SRE II (Security).",
    angle: "Strong for DevOps, SRE, and cloud security roles. High bar, good comp. Andrea has the referral link.",
    contacts: ["Andrea Rodriguez"],
    sector: "AdTech / Cloud Engineering",
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function BulletSection({ title, bullets }: { title: string; bullets: string[] }) {
  return (
    <div className="mb-4">
      <div className="text-xs mono text-[color:var(--accent)] font-medium mb-1.5">{title}</div>
      <ul className="space-y-1.5">
        {bullets.map((b, i) => (
          <li key={i} className="text-sm text-[color:var(--fg-soft)] flex gap-2 leading-snug">
            <span className="text-[color:var(--fg-mute)] flex-none mt-0.5">·</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function OrgPage() {
  return (
    <>
      <PageHeader
        kicker="the work"
        title="What you built. What it's worth."
        lede="The Leanspace org chart is irrelevant. What matters: which projects you shipped, how to say it for the role you want next, and which companies are warm calls because someone you know already landed there."
      />

      {/* Project bullet bank */}
      <Section kicker="projects worth name-dropping" title="Six things you can put on your CV.">
        <p className="text-sm text-[color:var(--fg-soft)] leading-relaxed mb-8 max-w-2xl">
          Expand the projects you worked on. Pick two or three bullets that fit the JD you&apos;re applying for.
          Specificity beats scope — &quot;shipped mission planning software used in production for orbital missions&quot;
          beats &quot;worked on space software platform.&quot;
        </p>
        <div className="space-y-4">
          {projects.map((p) => (
            <details key={p.id} className="panel p-0 group">
              <summary className="p-5 md:p-6 cursor-pointer list-none flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-[color:var(--fg)] text-lg leading-tight mb-1">{p.name}</h3>
                  <p className="text-sm text-[color:var(--fg-soft)] leading-relaxed">{p.what}</p>
                </div>
                <span className="mono text-xs text-[color:var(--accent)] flex-none mt-1 group-open:hidden">expand ↓</span>
                <span className="mono text-xs text-[color:var(--accent)] flex-none mt-1 hidden group-open:inline">close ↑</span>
              </summary>
              <div className="border-t hairline px-5 md:px-6 py-5 grid md:grid-cols-2 gap-x-8 gap-y-2">
                {Object.entries(p.bullets).map(([role, bullets]) => (
                  <BulletSection key={role} title={role} bullets={bullets} />
                ))}
              </div>
            </details>
          ))}
        </div>
      </Section>

      {/* Warm calls */}
      <Section kicker="warm calls" title="Companies you can reach this week." className="border-t hairline">
        <p className="text-sm text-[color:var(--fg-soft)] leading-relaxed mb-8 max-w-2xl">
          Ex-colleagues landed at companies that hire for what you do.
          That&apos;s a warm intro, not a cold application — and the difference in response rate is not subtle.
          Cold applications fill maybe 20–25% of knowledge-work roles. Networks fill the rest.
        </p>
        <div className="grid md:grid-cols-2 gap-5">
          {warmCalls.map((w) => (
            <div key={w.company} className="neu p-5">
              <div className="mb-3">
                <h3 className="font-semibold text-[color:var(--fg)] leading-tight">{w.company}</h3>
                <div className="text-xs text-[color:var(--fg-mute)] mono mt-0.5">{w.sector}</div>
              </div>
              <p className="text-sm text-[color:var(--fg-soft)] leading-relaxed mb-3">{w.why}</p>
              <div className="panel p-3 mb-3">
                <div className="text-xs text-[color:var(--warm)] font-medium mb-1">Your angle</div>
                <p className="text-xs text-[color:var(--fg-soft)] leading-relaxed">{w.angle}</p>
              </div>
              {w.contacts.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-[color:var(--fg-mute)]">warm contact:</span>
                  {w.contacts.map((c) => (
                    <Link
                      key={c}
                      href="/directory"
                      className="text-xs text-[color:var(--accent)] mono hover:underline"
                    >
                      {c} →
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="panel p-5 mt-6 text-sm text-[color:var(--fg-soft)] leading-relaxed border-l-2 border-[color:var(--accent-soft)]">
          <div className="kicker mb-2">the whole playbook in four steps</div>
          <ol className="space-y-1.5">
            {[
              "Find the warm contact in the directory — their LinkedIn is listed.",
              "Message them directly (not LinkedIn \"connect with a note\" — an actual message or email).",
              "Ask for 20 minutes: \"What are they actually looking for? Does my background fit?\"",
              "Then apply — and ask if they'd be willing to mention your name to the hiring manager.",
            ].map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="mono text-xs text-[color:var(--accent)] flex-none">{i + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          <div className="mt-4">
            <Link href="/directory" className="btn btn-primary text-sm">
              Browse the directory →
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
