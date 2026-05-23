import Link from "next/link";
import { Container, PageHeader, Section } from "@/components/section";
import { leadershipGuides } from "@/lib/data/leadership";

export const metadata = {
  title: "Leadership transitions — ex-Leanspace",
  description: "Concrete guides for IC→manager, manager→director, IC→founder, and IC→academic transitions, written from inside a NewSpace platform.",
};

export default function LeadershipPage() {
  return (
    <>
      <PageHeader
        kicker="leadership"
        title="Transitions, concretely."
        lede={
          <>
            Four common transitions for Leanspace alumni — what to keep, what to retire,
            and what to put on paper in the first 90 days. Each guide is short on
            philosophy, long on artefacts.
          </>
        }
      />
      <Section>
        <div className="grid md:grid-cols-2 gap-5">
          {leadershipGuides.map((g) => (
            <Link
              key={g.slug}
              href={`/leadership/${g.slug}`}
              className="panel p-6 hover:border-[color:var(--accent)] transition group"
            >
              <h3 className="text-xl mb-2 group-hover:text-[color:var(--accent)] transition">{g.title}</h3>
              <p className="text-sm text-[color:var(--fg-soft)] mb-3">{g.framing}</p>
              <div className="mono text-xs text-[color:var(--fg-mute)]">{g.forWho}</div>
              <div className="mt-4 mono text-xs text-[color:var(--accent)]">open guide →</div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
