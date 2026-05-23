import Link from "next/link";
import { Container, Section } from "@/components/section";
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
          <p className="lede mt-6 max-w-xl">
            Unofficial career tools for <a className="link" href="https://leanspace.io" target="_blank" rel="noopener">Leanspace</a> alumni — free, no signup.
            Pathways, AI prompts, and a directory of where everyone landed.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link href="/directory" className="btn btn-primary">Browse the directory →</Link>
            <Link href="/pathways" className="btn">Find your pathway</Link>
          </div>
        </Container>
      </section>



      {/* Company context */}
      <Section kicker="the company" className="border-t hairline">
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
      </Section>

      {/* Community teaser */}
      <Section kicker="community" title="Who we are now" className="border-t hairline">
        <p className="text-[color:var(--fg-soft)] max-w-2xl leading-relaxed mb-6">
          19 named alumni across six functions — from Strasbourg to Pittsburgh to Vilnius.
          Four now at ISU, two at Constellr. The network is denser than it looks.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/directory" className="btn btn-primary">Browse the directory →</Link>
          <Link href="/recommendations" className="btn">Recommendation templates</Link>
        </div>
      </Section>

      {/* Quick links */}
      <Section kicker="explore" title="Where to go from here">
        <div className="grid md:grid-cols-3 gap-5">
          <NavCard href="/directory" title="Alumni directory" desc="19 known Leanspacers — where they are, what they do now, and how to reach them." />
          <NavCard href="/recommendations" title="Recommendations" desc="How to ask for a LinkedIn rec, how to write one, and a ready-to-paste AI prompt." />
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
