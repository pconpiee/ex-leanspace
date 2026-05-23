import { Container, PageHeader, Section } from "@/components/section";
import { events, communities, playbooks } from "@/lib/data/networking";

export const metadata = {
  title: "Networking — ex-Leanspace",
  description: "Conferences, communities, and concrete playbooks for working a space-industry network without becoming a LinkedIn pest.",
};

export default function NetworkingPage() {
  return (
    <>
      <PageHeader
        kicker="networking"
        title="Working a network that already half-knows your name."
        lede={
          <>
            You worked at a small Strasbourg space-software company. The conferences are
            the same ones you used to attend with a Leanspace badge. The recruiters know
            who Leanspace is. Use the asymmetry — and don't burn it.
          </>
        }
      />

      <Section kicker="playbooks" title="Four concrete protocols.">
        <div className="space-y-6">
          {playbooks.map((p) => (
            <article key={p.title} className="panel p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-3 mb-3">
                <h3 className="text-xl">{p.title}</h3>
                <span className="tag tag-mute">{p.audience}</span>
              </div>
              <ol className="space-y-2.5 text-[15px] text-[color:var(--fg-soft)] leading-7">
                {p.steps.map((s, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mono text-xs text-[color:var(--fg-mute)] mt-1.5 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </Section>

      <Section kicker="events worth attending" title="Conferences and where they fit.">
        <div className="grid md:grid-cols-2 gap-5">
          {events.map((e) => (
            <article key={e.name} className="panel p-5">
              <div className="flex items-start justify-between gap-3 mb-1">
                <h3 className="text-lg leading-snug">{e.name}</h3>
                <span className="tag tag-warm shrink-0">{e.cost}</span>
              </div>
              <div className="mono text-xs text-[color:var(--fg-mute)] mb-3">
                {e.cadence} · {e.geography}
              </div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {e.audience.map((a) => <span key={a} className="tag tag-mute">{a}</span>)}
              </div>
              <p className="text-sm text-[color:var(--fg-soft)] leading-6">{e.worthIt}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section kicker="communities" title="Where to lurk, where to post.">
        <div className="grid md:grid-cols-2 gap-5">
          {communities.map((c) => (
            <article key={c.name} className="panel p-5">
              <div className="flex items-baseline justify-between gap-3 mb-1">
                <h3 className="text-lg">{c.name}</h3>
                <span className="mono text-xs text-[color:var(--fg-mute)]">{c.type}</span>
              </div>
              {c.link && (
                <a className="link mono text-xs" href={c.link} target="_blank" rel="noopener">{c.link}</a>
              )}
              <p className="text-sm text-[color:var(--fg-soft)] leading-6 mt-2">{c.joinNote}</p>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
