import { PageHeader, Section } from "@/components/section";
import { events, communities, playbooks } from "@/lib/data/networking";

export const metadata = {
  title: "Networking — ex-Leanspace",
  description: "Conferences, communities, and concrete playbooks for working a space-industry network without becoming a LinkedIn pest.",
};

function CostMeter({ cost }: { cost: string }) {
  const filled = cost.match(/^\$+/)?.[0].length ?? 0;
  if (filled === 0) {
    return (
      <span className="mono text-[10px] text-[color:var(--good)] bg-[rgba(22,163,74,0.1)] px-1.5 py-0.5 rounded-full">
        free
      </span>
    );
  }
  return (
    <span className="flex gap-0.5 items-center" title={cost}>
      {[1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className={`block w-2 h-2 rounded-full ${i <= filled ? "bg-[color:var(--accent)]" : "bg-[color:var(--panel-border)]"}`}
        />
      ))}
    </span>
  );
}

export default function NetworkingPage() {
  return (
    <>
      <PageHeader
        kicker="networking"
        title="Network like you still work there."
        lede="You built space software at a company people know. The badge is gone but the signal stays. Here's how to use it without burning it."
      />

      {/* ── PROTOCOLS ────────────────────────────────────────────── */}
      <Section kicker="protocols" title="Four plays. Pick yours.">
        <div className="grid md:grid-cols-2 gap-5">
          {playbooks.map((p, pi) => (
            <article key={p.title} className="neu p-6 relative overflow-hidden">
              {/* Decorative background number — retrofuturist mission-card feel */}
              <span className="absolute bottom-4 right-5 font-display text-[80px] leading-none text-[color:var(--accent)] opacity-[0.06] select-none pointer-events-none">
                {String(pi + 1).padStart(2, "0")}
              </span>

              <div className="flex items-center gap-2.5 mb-4">
                <span className="w-8 h-8 rounded-full bg-[color:var(--accent)] text-white mono text-xs flex items-center justify-center font-medium shrink-0">
                  {String(pi + 1).padStart(2, "0")}
                </span>
                <span className="tag text-[10px]">{p.audience}</span>
              </div>

              <h3 className="text-xl font-medium mb-5 leading-snug">{p.title}</h3>

              <ol className="space-y-3">
                {p.steps.map((s, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span className="mono text-[10px] text-[color:var(--accent)] bg-[color:var(--accent-soft)] px-1.5 py-0.5 rounded-md shrink-0 mt-[3px] leading-none font-medium">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm text-[color:var(--fg-soft)] leading-relaxed">{s}</span>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </Section>

      {/* ── EVENTS ───────────────────────────────────────────────── */}
      <Section kicker="events" title="Where to show up in person.">
        <p className="text-sm text-[color:var(--fg-mute)] mb-5 -mt-2">
          Cost meter: <span className="inline-flex gap-0.5 items-center align-middle mx-1">{[1,2,3,4].map(i => <span key={i} className={`block w-2 h-2 rounded-full ${i <= 2 ? "bg-[color:var(--accent)]" : "bg-[color:var(--panel-border)]"}`} />)}</span> = ~$$. Fill = more expensive.
        </p>
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {events.map((e) => (
            <article key={e.name} className="neu p-5 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-sm font-medium leading-snug mb-1">{e.name}</h3>
                  <p className="mono text-[10px] text-[color:var(--fg-mute)]">{e.cadence}</p>
                </div>
                <span className="tag tag-mute text-[10px] shrink-0">{e.geography}</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1">
                  {e.audience.slice(0, 2).map((a) => (
                    <span key={a} className="tag tag-mute text-[10px]">{a}</span>
                  ))}
                </div>
                <CostMeter cost={e.cost} />
              </div>
              <p className="text-xs text-[color:var(--fg-soft)] leading-relaxed pt-3 border-t border-[color:var(--panel-border)]">
                {e.worthIt}
              </p>
            </article>
          ))}
        </div>
      </Section>

      {/* ── COMMUNITIES ──────────────────────────────────────────── */}
      <Section kicker="online" title="Where to lurk and post.">
        <div className="grid md:grid-cols-2 gap-4">
          {communities.map((c) => (
            <article key={c.name} className="neu p-5">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="text-sm font-medium">{c.name}</h3>
                <span className="mono text-[10px] text-[color:var(--fg-mute)] shrink-0 text-right leading-relaxed">{c.type}</span>
              </div>
              {c.link && (
                <a
                  className="mono text-[11px] text-[color:var(--accent)] hover:underline block mb-2 truncate"
                  href={c.link}
                  target="_blank"
                  rel="noopener"
                >
                  {c.link}
                </a>
              )}
              <p className="text-sm text-[color:var(--fg-soft)] leading-relaxed">{c.joinNote}</p>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
