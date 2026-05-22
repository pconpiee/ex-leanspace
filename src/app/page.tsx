import Link from "next/link";
import { Container, Section } from "@/components/section";
import { pathways } from "@/lib/data/pathways";
import { destinations } from "@/lib/data/destinations";
import { companyFacts } from "@/lib/data/org";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative">
        <Container className="pt-16 md:pt-24 pb-12">
          <div className="kicker mb-5">v0.1 · for alumni of leanspace.io</div>
          <h1 className="text-4xl md:text-6xl font-medium tracking-tight max-w-4xl leading-[1.05]">
            You spent years building software that flies.
            <br />
            <span className="text-[color:var(--accent)]">Now build a career that compounds.</span>
          </h1>
          <p className="lede mt-6 max-w-2xl">
            An unofficial career helper for former employees of <a className="link" href="https://leanspace.io" target="_blank" rel="noopener">Leanspace</a> —
            the Strasbourg-based NewSpace ground-segment platform. Career pathways, AI prompts,
            Claude skills, networking playbooks, and leadership transitions. Written by an alum, free, no signup.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/pathways" className="btn btn-primary">Find your pathway →</Link>
            <Link href="/skills" className="btn">Get the AI prompts</Link>
            <Link href="/org" className="btn">See the org map</Link>
          </div>
        </Container>
      </section>

      {/* The promise */}
      <Section kicker="what this is" title="A career compass for people who don't fit a generic mould.">
        <div className="grid md:grid-cols-3 gap-5">
          <Panel
            title="You shipped, not just talked."
            body="You flew on someone's spacecraft. You know what CCSDS, PUS and PoCs are. You've heard 'institutional procurement' said aloud. This site assumes all of that — and starts from there."
          />
          <Panel
            title="Five paths, ten destinations."
            body="Pathways by function (PM, SA, BDM, Eng, more). Destinations by sector (NewSpace, primes, government, defense-tech, operators, founder, investor, academia). Pick yours."
          />
          <Panel
            title="Tools, not just words."
            body="Concrete Claude prompts. Three skills to drop into ~/.claude/skills. Conference cheat sheets. Negotiation tools. First-90-days plans. Not a self-help book."
          />
        </div>
      </Section>

      {/* Pathways teaser */}
      <Section kicker="pathways" title="Roles inside Leanspace — and what each one becomes.">
        <p className="lede mb-7 max-w-2xl">
          The same role at a 50-person space-software company carries different career
          weight depending on what you actually did. Here is the map by function.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {pathways.map((p) => (
            <Link
              key={p.slug}
              href={`/pathways/${p.slug}`}
              className="panel p-5 hover:border-[color:var(--accent)] transition group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="tag">{p.short}</span>
                <span className="mono text-xs text-[color:var(--fg-mute)]">{p.nextRoles.length} next-step roles</span>
              </div>
              <h3 className="text-xl mb-1 group-hover:text-[color:var(--accent)] transition">{p.function}</h3>
              <p className="text-sm text-[color:var(--fg-soft)] line-clamp-3">{p.oneLine}</p>
              <div className="mt-4 mono text-xs text-[color:var(--fg-mute)]">read pathway →</div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Destinations teaser */}
      <Section kicker="destinations" title="Where Leanspace alumni actually go.">
        <p className="lede mb-7 max-w-2xl">
          Nine destination categories with concrete company examples, comp expectations,
          and what each one filters for in your CV.
        </p>
        <div className="grid md:grid-cols-2 gap-5">
          {destinations.slice(0, 6).map((d) => (
            <Link
              key={d.slug}
              href={`/destinations#${d.slug}`}
              className="panel p-5 hover:border-[color:var(--accent)] transition group"
            >
              <h3 className="text-lg mb-1 group-hover:text-[color:var(--accent)] transition">{d.category}</h3>
              <p className="text-sm text-[color:var(--fg-soft)]">{d.oneLine}</p>
              <div className="mt-3 mono text-xs text-[color:var(--fg-mute)]">{d.comp}</div>
            </Link>
          ))}
        </div>
        <div className="mt-6">
          <Link href="/destinations" className="btn">See all 9 destinations →</Link>
        </div>
      </Section>

      {/* Why this exists */}
      <Section kicker="why this exists" title="Because the answers aren't in a search bar.">
        <div className="grid md:grid-cols-2 gap-6 items-start">
          <div className="prose-narrow text-[color:var(--fg-soft)] text-[15px] leading-7 space-y-4">
            <p>
              Leanspace is small. Strasbourg-based. Series A. Around 50–60 people split
              between France and Denver. Most career advice on the internet is built for
              FAANG engineers or US-only fresh graduates.
            </p>
            <p>
              The people leaving Leanspace have unusual signal. Flight heritage. Multi-product
              experience at company scale. Customer fluency across operators, primes, and
              agencies. That signal needs different framing than the generic resume-coach
              market provides.
            </p>
            <p>
              This site assumes you have it. It does not assume you know what to do with it.
            </p>
            <p>
              <Link href="/pathways/product-manager" className="link">Start with your function</Link>,
              then jump to <Link href="/destinations" className="link">destinations</Link> and{" "}
              <Link href="/skills" className="link">AI prompts</Link>. Take what works. Skip what doesn't.
            </p>
          </div>
          <div className="panel p-6">
            <div className="kicker mb-3">leanspace, in numbers</div>
            <ul className="text-sm space-y-2.5">
              <Stat label="Founded" value={companyFacts.founded} />
              <Stat label="HQ" value={`${companyFacts.hq} · ${companyFacts.usOffice}`} />
              <Stat label="Headcount" value={companyFacts.headcount} />
              <Stat label="Latest round" value={`${companyFacts.rounds[1].label} ${companyFacts.rounds[1].amount} (${companyFacts.rounds[1].year})`} />
              <Stat label="Known customers" value={`${companyFacts.customers.length}+ (ESA, Airbus DS, Hispasat …)`} />
              <Stat label="Founder backgrounds" value="Thales, NASA, Airbus, ESA, Telespazio, ISU" />
            </ul>
          </div>
        </div>
      </Section>

      {/* Quick links */}
      <Section kicker="explore" title="Where to go from here">
        <div className="grid md:grid-cols-3 gap-5">
          <NavCard href="/pathways" title="Pathways" desc="By function — PM, SA, BDM, Eng, Domain, GTM, Ops, Exec." />
          <NavCard href="/destinations" title="Destinations" desc="By sector — primes, NewSpace, government, defense-tech, founder, investor, academia." />
          <NavCard href="/skills" title="AI Skills & Prompts" desc="Copy-paste Claude prompts and three Claude skills to drop in ~/.claude/skills/." />
          <NavCard href="/networking" title="Networking" desc="Events, communities, and four concrete playbooks for working a network without becoming a pest." />
          <NavCard href="/leadership" title="Leadership transitions" desc="IC → manager → director, IC → founder, IC → academic. Concrete first-90-day plans." />
          <NavCard href="/org" title="The Leanspace org map" desc="Who's on which team. Public-info only; useful for reference and outreach." />
        </div>
      </Section>
    </>
  );
}

function Panel({ title, body }: { title: string; body: string }) {
  return (
    <div className="panel p-6">
      <h3 className="text-lg mb-2">{title}</h3>
      <p className="text-sm text-[color:var(--fg-soft)] leading-6">{body}</p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex justify-between gap-4 border-b hairline pb-2 last:border-0">
      <span className="text-[color:var(--fg-mute)]">{label}</span>
      <span className="text-right">{value}</span>
    </li>
  );
}

function NavCard({ href, title, desc }: { href: string; title: string; desc: string }) {
  return (
    <Link href={href} className="panel p-5 hover:border-[color:var(--accent)] transition group">
      <h3 className="text-lg mb-1 group-hover:text-[color:var(--accent)] transition">{title}</h3>
      <p className="text-sm text-[color:var(--fg-soft)]">{desc}</p>
      <div className="mt-3 mono text-xs text-[color:var(--fg-mute)]">open →</div>
    </Link>
  );
}
