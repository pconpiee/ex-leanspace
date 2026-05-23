import { Container, PageHeader, Section } from "@/components/section";
import { resources } from "@/lib/data/resources";

export const metadata = {
  title: "Resources — ex-Leanspace",
  description: "Newsletters, podcasts, books, and tools that move ex-Leanspace alumni forward.",
};

const groups = ["Newsletter", "Website", "Podcast", "Tool", "Book", "Course"] as const;

export default function ResourcesPage() {
  return (
    <>
      <PageHeader
        kicker="resources"
        title="Newsletters, podcasts, books, and tools."
        lede={
          <>
            Curated — not exhaustive. Each entry includes <em>why</em> a Leanspace alum
            would care, not a generic blurb.
          </>
        }
      />

      {groups.map((type) => {
        const list = resources.filter((r) => r.type === type);
        if (list.length === 0) return null;
        return (
          <Section key={type} kicker={type === "Tool" ? "tools" : type.toLowerCase()}>
            <div className="grid md:grid-cols-2 gap-5">
              {list.map((r) => (
                <article key={r.title} className="panel p-5">
                  <div className="flex items-baseline justify-between gap-3 mb-1">
                    <h3 className="text-lg leading-snug">{r.title}</h3>
                    <span className="tag tag-mute shrink-0">{r.type}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {r.audience.map((a) => <span key={a} className="tag">{a}</span>)}
                  </div>
                  {r.link && (
                    <a className="link mono text-xs" href={r.link} target="_blank" rel="noopener">{r.link.replace(/^https?:\/\//, "")} ↗</a>
                  )}
                  <p className="text-sm text-[color:var(--fg-soft)] leading-6 mt-2">{r.why}</p>
                </article>
              ))}
            </div>
          </Section>
        );
      })}
    </>
  );
}
