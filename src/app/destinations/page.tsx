import { Container, PageHeader, Section } from "@/components/section";
import { destinations } from "@/lib/data/destinations";
import Link from "next/link";

export const metadata = {
  title: "Destinations — ex-Leanspace",
  description: "Where Leanspace alumni go: NewSpace startups, primes, government, defense-tech, operators, founder, investor, academic.",
};

export default function DestinationsPage() {
  return (
    <>
      <PageHeader
        kicker="destinations"
        title="Where Leanspace alumni actually go."
        lede={
          <>
            Nine sector categories with concrete company names, comp expectations, and the
            yellow flags to watch for. Pair this page with the pathway for your function.
          </>
        }
      />
      <Section>
        <nav className="panel p-5 mb-10">
          <div className="kicker mb-3">jump to</div>
          <ul className="flex flex-wrap gap-2">
            {destinations.map((d) => (
              <li key={d.slug}>
                <a href={`#${d.slug}`} className="tag tag-mute hover:text-[color:var(--accent)] hover:border-[color:var(--accent)]">
                  {d.category}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-10">
          {destinations.map((d) => (
            <article key={d.slug} id={d.slug} className="panel p-6 md:p-8 scroll-mt-24">
              <div className="flex flex-wrap items-baseline gap-3 mb-2">
                <h2 className="text-2xl md:text-3xl">{d.category}</h2>
                <span className="tag tag-warm">{d.comp}</span>
              </div>
              <p className="lede max-w-3xl">{d.oneLine}</p>

              <div className="grid md:grid-cols-2 gap-7 mt-6">
                <div>
                  <div className="kicker mb-2">what it hires</div>
                  <ul className="text-sm text-[color:var(--fg-soft)] space-y-1.5 mb-5">
                    {d.whatItHires.map((w) => <li key={w}>· {w}</li>)}
                  </ul>
                  <div className="kicker mb-2">examples</div>
                  <ul className="text-sm text-[color:var(--fg-soft)] space-y-1.5">
                    {d.examples.map((e) => <li key={e}>· {e}</li>)}
                  </ul>
                </div>
                <div>
                  <div className="kicker mb-2">why Leanspace works here</div>
                  <p className="text-sm text-[color:var(--fg-soft)] leading-6 mb-5">{d.whyLeanspaceWorks}</p>
                  <div className="kicker mb-2 text-[color:var(--warn)]">yellow flags</div>
                  <ul className="text-sm text-[color:var(--fg-soft)] space-y-1.5">
                    {d.yellowFlags.map((y) => <li key={y}>! {y}</li>)}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
