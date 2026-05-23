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
            Find the role that was
            <br />
            <span className="text-[color:var(--accent)]">worth leaving for.</span>
          </h1>
          <p className="lede mt-6 max-w-xl">
            One goal: land your next job — better pay, better fit, a real arc for the next five years.
            The framework is <span className="font-medium text-[color:var(--fg)]">ROW</span>.
            Three phases. Everything you need is here.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link href="/reorient" className="btn btn-primary">Start with R — Reorient →</Link>
            <Link href="/directory" className="btn">Browse the alumni →</Link>
          </div>
        </Container>
      </section>

      {/* ROW intro */}
      <Section className="border-t hairline" kicker="the framework">
        <div className="panel p-5 md:p-6 border-l-2 border-[color:var(--accent)] max-w-2xl">
          <p className="text-[color:var(--fg-soft)] leading-relaxed">
            How do you get a boat from one shore to another? You <strong className="text-[color:var(--fg)]">ROW</strong>.
            Leanspace is the shore you left. Your next role is the other side.
            The water between is confusing, sometimes frustrating, and has no map.
            ROW is the map.
          </p>
        </div>
      </Section>

      {/* The three phases */}
      <Section kicker="three phases, in order" className="border-t hairline">
        <div className="grid md:grid-cols-3 gap-5">
          <PhaseCard
            letter="R"
            label="Reorient"
            href="/reorient"
            sub="Where are we coming from? Where are we at now? Where are we going next?"
            bullets={[
              "What Leanspace actually gave you",
              "The post-startup transition (nobody talks about this)",
              "Six destinations — pick one or two",
            ]}
          />
          <PhaseCard
            letter="O"
            label="Objectives"
            href="/objectives"
            sub="What are we trying to do? What is keeping us from doing it? What are the steps?"
            bullets={[
              "Define the specific target — role, company type, comp",
              "Build your story from the projects you worked on",
              "Translate your function for where you're going",
            ]}
          />
          <PhaseCard
            letter="W"
            label="Wrestle"
            href="/wrestle"
            sub="Have a plan. Know it will be hard. Persevere. Look for opportunities. Be bold."
            bullets={[
              "Network with intention — four plays",
              "Interview prep and STAR stories from Leanspace",
              "Negotiate. Give recs. Help who comes after you.",
            ]}
          />
        </div>
      </Section>

      {/* Network CTA */}
      <Section kicker="the network" className="border-t hairline">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-lg">
            <h2 className="text-xl font-semibold mb-2">20 alumni. Current roles. LinkedIn handles.</h2>
            <p className="text-[color:var(--fg-soft)] text-sm leading-relaxed">
              The directory is where the network becomes concrete — who&apos;s where, what they do now, and how to reach them.
              A warm intro from here is worth more than forty cold applications.
            </p>
          </div>
          <Link href="/directory" className="btn btn-primary flex-none">
            Browse the directory →
          </Link>
        </div>
      </Section>
    </>
  );
}

function PhaseCard({
  letter,
  label,
  href,
  sub,
  bullets,
}: {
  letter: string;
  label: string;
  href: string;
  sub: string;
  bullets: string[];
}) {
  return (
    <Link href={href} className="neu p-6 flex flex-col gap-4 hover:shadow-lg transition group">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[color:var(--accent)] text-white flex items-center justify-center mono text-lg font-bold flex-none group-hover:scale-110 transition">
          {letter}
        </div>
        <div>
          <div className="font-semibold text-[color:var(--fg)]">{label}</div>
          <div className="mono text-xs text-[color:var(--fg-mute)]">{href}</div>
        </div>
      </div>
      <p className="text-xs text-[color:var(--fg-mute)] leading-relaxed italic">{sub}</p>
      <ul className="space-y-1.5 mt-auto">
        {bullets.map((b) => (
          <li key={b} className="flex gap-2 text-sm text-[color:var(--fg-soft)]">
            <span className="text-[color:var(--accent)] flex-none mt-0.5">·</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <div className="mono text-xs text-[color:var(--accent)] group-hover:underline">
        Open {label} →
      </div>
    </Link>
  );
}
