import Link from "next/link";
import { Container, Section } from "@/components/section";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative">
        <Container className="pt-16 md:pt-24 pb-12">
          <div className="kicker mb-5">for alumni of leanspace.io</div>
          <h1 className="text-4xl md:text-6xl font-medium tracking-tight max-w-4xl leading-[1.05]">
            Land your next role.
            <br />
            <span className="text-[color:var(--accent)]">With the people who know your work.</span>
          </h1>
          <p className="lede mt-6 max-w-xl">
            A job-search toolkit built by and for Leanspace alumni —
            20 people you can reach out to, recommendation templates, AI prompts for every stage of the search.
            Free, no signup.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link href="/directory" className="btn btn-primary">Browse the directory →</Link>
            <Link href="/recommendations" className="btn">Get a reference template</Link>
          </div>
        </Container>
      </section>

      {/* Community teaser */}
      <Section kicker="the network" title="20 alumni. A denser network than it looks." className="border-t hairline">
        <p className="text-[color:var(--fg-soft)] max-w-2xl leading-relaxed mb-6">
          Product managers, engineers, BDMs, solutions architects, marketing leads — 
          scattered across NewSpace, cloud, consulting, and academia.
          Four now at ISU, two at Constellr. Someone in the directory can vouch for you.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/directory" className="btn btn-primary">Browse the directory →</Link>
          <Link href="/recommendations" className="btn">Recommendation templates</Link>
        </div>
      </Section>

      {/* Tools */}
      <Section kicker="tools" title="What's in here">
        <div className="grid md:grid-cols-2 gap-5">
          <NavCard href="/directory" title="Alumni directory" desc="20 Leanspacers — where they landed, what they do now, and how to reach them for references or intros." />
          <NavCard href="/recommendations" title="Recommendation templates" desc="How to ask for a LinkedIn rec, how to write one, and a ready-to-paste AI prompt." />
          <NavCard href="/pathways" title="Career pathways" desc="By function — PM, SA, BDM, Engineer. Where Leanspace experience translates and how to position it." />
          <NavCard href="/skills" title="AI prompts for job search" desc="Copy-paste prompts for cover letters, interview prep, salary negotiation, and profile rewrites." />
        </div>
      </Section>
    </>
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
