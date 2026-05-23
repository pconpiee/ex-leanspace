import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, PageHeader, Section } from "@/components/section";
import { pathways } from "@/lib/data/pathways";

export function generateStaticParams() {
  return pathways.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = pathways.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: `${p.function} — Pathway · ex-Leanspace`,
    description: p.oneLine,
  };
}

export default async function PathwayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = pathways.find((x) => x.slug === slug);
  if (!p) notFound();

  return (
    <>
      <PageHeader
        kicker={`pathway · ${p.short}`}
        title={p.function}
        lede={p.oneLine}
      />

      <Section kicker="reporting chain">
        <div className="panel p-5 mono text-sm text-[color:var(--fg-soft)] flex flex-wrap items-center gap-3">
          {p.reportingChain.map((r, i) => (
            <span key={r} className="flex items-center gap-3">
              <span>{r}</span>
              {i < p.reportingChain.length - 1 && <span className="text-[color:var(--fg-mute)]">↑</span>}
            </span>
          ))}
        </div>
      </Section>

      <Section kicker="what you actually did" title="In a sentence — and then concretely.">
        <ul className="space-y-3 max-w-3xl">
          {p.whatYouActuallyDid.map((item, i) => (
            <li key={i} className="flex gap-3">
              <span className="mono text-xs text-[color:var(--fg-mute)] mt-1.5">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-[color:var(--fg-soft)] leading-7">{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section kicker="skills acquired" title="What this role taught you that travels.">
        <div className="grid md:grid-cols-3 gap-5">
          {p.skillsAcquired.map((g) => (
            <div key={g.area} className="panel p-5">
              <div className="kicker mb-3">{g.area}</div>
              <ul className="space-y-2 text-sm text-[color:var(--fg-soft)]">
                {g.items.map((s) => (
                  <li key={s} className="flex gap-2"><span className="text-[color:var(--accent)]">·</span> <span>{s}</span></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section kicker="artefacts to collect" title="Before you leave — the receipts.">
        <div className="grid md:grid-cols-2 gap-6">
          <ul className="space-y-2.5 text-[color:var(--fg-soft)] text-[15px] leading-7">
            {p.artifactsToCollect.map((a) => (
              <li key={a} className="flex gap-2"><span className="text-[color:var(--warm)]">▸</span><span>{a}</span></li>
            ))}
          </ul>
          <div className="panel p-5 text-sm">
            <div className="kicker mb-3">signal to broadcast</div>
            <ul className="space-y-3">
              {p.signalToBroadcast.map((s) => (
                <li key={s} className="text-[color:var(--fg-soft)] leading-6">{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section kicker="next-step roles" title="Five plausible next moves.">
        <div className="grid md:grid-cols-2 gap-5">
          {p.nextRoles.map((n, i) => (
            <div key={i} className="panel p-5">
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="text-lg">{n.title}</h3>
                <span className="mono text-xs text-[color:var(--fg-mute)]">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="text-xs mono text-[color:var(--accent)] mb-2">{n.where}</div>
              <p className="text-sm text-[color:var(--fg-soft)] leading-6">{n.why}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section kicker="pitfalls" title="Don't.">
        <div className="panel p-6">
          <ul className="space-y-3">
            {p.pitfalls.map((pit) => (
              <li key={pit} className="flex gap-3 text-[color:var(--fg-soft)] leading-7">
                <span className="text-[color:var(--warn)] mt-1.5">!</span>
                <span>{pit}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section>
        <div className="panel p-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="kicker mb-2">what's next</div>
            <p className="text-sm text-[color:var(--fg-soft)]">Get the AI prompts and Claude skills for this function, or move on to destinations.</p>
          </div>
          <div className="flex gap-2">
            <Link className="btn" href="/skills">AI skills →</Link>
            <Link className="btn" href="/destinations">Destinations →</Link>
            <Link className="btn" href="/pathways">All pathways</Link>
          </div>
        </div>
      </Section>
    </>
  );
}
