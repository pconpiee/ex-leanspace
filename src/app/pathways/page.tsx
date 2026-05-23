import Link from "next/link";
import { Container, PageHeader, Section } from "@/components/section";
import { pathways } from "@/lib/data/pathways";

export const metadata = {
  title: "Pathways — ex-Leanspace",
  description: "Career pathways out of Leanspace by function: PM, Solutions Architect, BDM, Engineering, Domain Expert, Design/Marketing/PM, Ops, and Executive.",
};

export default function PathwaysPage() {
  return (
    <>
      <PageHeader
        kicker="pathways"
        title="Roles inside Leanspace — and what each one becomes."
        lede={
          <>
            The function you held at Leanspace shapes the next role more than the company
            you go to. Pick yours; each page covers the skills you acquired, the artefacts
            to collect before leaving, the signal to broadcast, five next-step roles, and
            the typical pitfalls.
          </>
        }
      />
      <Section>
        <div className="grid md:grid-cols-2 gap-5">
          {pathways.map((p) => (
            <Link
              key={p.slug}
              href={`/pathways/${p.slug}`}
              className="panel p-6 hover:border-[color:var(--accent)] transition group"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="tag">{p.short}</span>
                <span className="mono text-xs text-[color:var(--fg-mute)]">{p.nextRoles.length} next-step roles · {p.pitfalls.length} pitfalls</span>
              </div>
              <h2 className="text-2xl mb-2 group-hover:text-[color:var(--accent)] transition">{p.function}</h2>
              <p className="text-sm text-[color:var(--fg-soft)] mb-4">{p.oneLine}</p>
              <div className="text-xs mono text-[color:var(--fg-mute)] mb-2">Reports into</div>
              <ul className="text-xs text-[color:var(--fg-soft)] space-y-0.5">
                {p.reportingChain.map((r) => <li key={r}>· {r}</li>)}
              </ul>
              <div className="mt-5 mono text-xs text-[color:var(--accent)]">open pathway →</div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
