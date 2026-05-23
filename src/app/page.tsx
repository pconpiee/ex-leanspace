import Link from "next/link";
import { Container, Section } from "@/components/section";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative">
        <Container className="pt-16 md:pt-24 pb-14">
          <div className="kicker mb-5">for alumni of leanspace.io</div>
          <h1 className="text-4xl md:text-6xl font-medium tracking-tight max-w-3xl leading-[1.05]">
            Your Leanspace network
            <br />
            <span className="text-[color:var(--accent)]">is your unfair advantage.</span>
          </h1>
          <p className="lede mt-6 max-w-lg">
            20 people who know what you built there — and will tell hiring managers.
          </p>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 items-baseline">
            <Stat n="20" label="alumni" />
            <Stat n="5" label="career paths" />
            <Stat n="20+" label="AI prompts" />
            <span className="mono text-xs text-[color:var(--accent)]">free · no signup</span>
          </div>
          <div className="mt-8">
            <Link href="#paths" className="btn btn-primary">Where should I start? →</Link>
          </div>
        </Container>
      </section>

      {/* Guided paths */}
      <Section id="paths" kicker="your situation" title="Pick where you are." className="border-t hairline">
        <div className="grid md:grid-cols-3 gap-5 mt-2">
          <PathCard
            n="01"
            title="I need someone to vouch for me."
            desc="Find the right person in the directory. Then ask them the right way."
            primary={{ href: "/directory", label: "Browse the directory" }}
            secondary={{ href: "/recommendations", label: "How to ask" }}
          />
          <PathCard
            n="02"
            title="I'm figuring out my next move."
            desc="Where do Leanspace PMs, engineers, and BDMs land? How do you position what you did there?"
            primary={{ href: "/pathways", label: "Career pathways" }}
            secondary={{ href: "/skills", label: "Grab an AI prompt" }}
          />
          <PathCard
            n="03"
            title="I want to get in front of people."
            desc="Conferences, communities, and four outreach protocols for getting into rooms where people are hiring."
            primary={{ href: "/networking", label: "Networking guide" }}
          />
        </div>
      </Section>

      {/* Browse all */}
      <Section kicker="or browse on your own" title="Everything in one place.">
        <div className="grid md:grid-cols-2 gap-5">
          <NavCard href="/directory" title="Alumni directory" desc="20 Leanspacers — where they landed, what they do now, and how to reach them." />
          <NavCard href="/recommendations" title="Recommendation templates" desc="How to ask for a LinkedIn rec, how to write one, and a ready-to-paste AI prompt." />
          <NavCard href="/pathways" title="Career pathways" desc="By function — PM, SA, BDM, Engineer. Where Leanspace experience translates." />
          <NavCard href="/skills" title="AI prompts" desc="Copy-paste prompts for cover letters, interviews, salary negotiation, and profile rewrites." />
        </div>
      </Section>
    </>
  );
}

function PathCard({
  n,
  title,
  desc,
  primary,
  secondary,
}: {
  n: string;
  title: string;
  desc: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <div className="neu p-6 flex flex-col gap-4">
      <div className="mono text-[10px] tracking-widest text-[color:var(--accent)] opacity-60 uppercase">{n}</div>
      <div className="flex-1">
        <h3 className="text-base font-medium leading-snug mb-2">{title}</h3>
        <p className="text-sm text-[color:var(--fg-soft)] leading-relaxed">{desc}</p>
      </div>
      <div className="flex flex-col gap-2">
        <Link href={primary.href} className="btn btn-primary text-center w-full">{primary.label} →</Link>
        {secondary && (
          <Link href={secondary.href} className="text-center mono text-xs text-[color:var(--fg-mute)] hover:text-[color:var(--accent)] transition py-1">
            {secondary.label} →
          </Link>
        )}
      </div>
    </div>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <span className="flex items-baseline gap-1.5">
      <strong className="text-xl font-medium text-[color:var(--fg)]">{n}</strong>
      <span className="text-sm text-[color:var(--fg-mute)]">{label}</span>
    </span>
  );
}

function NavCard({ href, title, desc }: { href: string; title: string; desc: string }) {
  return (
    <Link href={href} className="neu p-5 transition-shadow hover:shadow-[8px_8px_18px_rgba(148,163,184,0.46),-5px_-5px_14px_rgba(255,255,255,0.96)] group">
      <h3 className="text-base mb-1 group-hover:text-[color:var(--accent)] transition">{title}</h3>
      <p className="text-sm text-[color:var(--fg-soft)]">{desc}</p>
      <div className="mt-3 mono text-xs text-[color:var(--fg-mute)]">open →</div>
    </Link>
  );
}
