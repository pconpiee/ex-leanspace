import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader, Section } from "@/components/section";
import { leadershipGuides } from "@/lib/data/leadership";

export function generateStaticParams() {
  return leadershipGuides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = leadershipGuides.find((x) => x.slug === slug);
  if (!g) return {};
  return { title: `${g.title} — Leadership · ex-Leanspace`, description: g.framing };
}

export default async function LeadershipGuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = leadershipGuides.find((x) => x.slug === slug);
  if (!g) notFound();

  return (
    <>
      <PageHeader kicker={`leadership · ${g.forWho}`} title={g.title} lede={g.framing} />
      <Section>
        <div className="space-y-7 max-w-3xl">
          {g.body.map((b) => (
            <div key={b.heading} className="panel p-6">
              <div className="kicker mb-3">{b.heading}</div>
              <ul className="space-y-2.5 text-[15px] text-[color:var(--fg-soft)] leading-7">
                {b.lines.map((l) => (
                  <li key={l} className="flex gap-2">
                    <span className="text-[color:var(--accent)] mt-1">·</span>
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex gap-2">
          <Link href="/leadership" className="btn">← all guides</Link>
          <Link href="/skills" className="btn">AI skills →</Link>
        </div>
      </Section>
    </>
  );
}
