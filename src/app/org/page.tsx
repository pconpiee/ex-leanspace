import { PageHeader, Section } from "@/components/section";
import { leadership, teams } from "@/lib/data/org";

export const metadata = {
  title: "People at Leanspace — ex-Leanspace",
  description: "Who's still at Leanspace — useful for reference checks and outreach. Drawn from public LinkedIn profiles.",
};

export default function OrgPage() {
  return (
    <>
      <PageHeader
        kicker="contacts"
        title="Who's still at Leanspace."
        lede={
          <>
            Useful for reference checks and outreach. Names drawn from public LinkedIn profiles —
            treat this as a snapshot, not a live org chart. Roles move fast at scale-up stage.
          </>
        }
      />


      <Section kicker="leadership" title="Founders & C-suite.">
        <div className="grid md:grid-cols-3 gap-5">
          {leadership.map((p) => (
            <article key={p.name} className="panel p-5">
              <div className="kicker mb-2">{p.team}</div>
              <h3 className="text-lg">{p.name}</h3>
              <p className="text-sm text-[color:var(--fg-soft)] mt-1">{p.role}</p>
              {p.publicLinks && (
                <ul className="mt-3 mono text-xs text-[color:var(--accent)] space-y-1">
                  {p.publicLinks.map((l) => (
                    <li key={l}>
                      <a href={l} target="_blank" rel="noopener" className="hover:underline">{l.replace(/^https?:\/\//, "")} ↗</a>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </Section>

      <Section kicker="teams" title="By function.">
        <div className="space-y-8">
          {teams.map((t) => (
            <article key={t.id} className="panel p-6">
              <h3 className="text-xl mb-1">{t.label}</h3>
              <p className="text-sm text-[color:var(--fg-soft)] mb-5 max-w-3xl">{t.description}</p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {t.members.map((m) => (
                  <div key={`${t.id}-${m.name}`} className="border hairline rounded-lg p-3.5 bg-[color:var(--bg-soft)]">
                    <div className="font-medium">{m.name}</div>
                    <div className="text-sm text-[color:var(--fg-soft)] mt-0.5">{m.role}</div>
                    {m.publicLinks && (
                      <a className="mono text-xs text-[color:var(--accent)] mt-1.5 inline-block hover:underline" href={m.publicLinks[0]} target="_blank" rel="noopener">linkedin ↗</a>
                    )}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <div className="panel p-6 text-sm text-[color:var(--fg-soft)] leading-7">
          <div className="kicker mb-2">a note on this page</div>
          <p>
            This is alumni-curated, not official. Roles and people shift fast at scale-up
            stage — treat this as a snapshot of when you'd recognise the team, not as a
            current org chart. Names are listed where they are visible on public profiles,
            conference programmes, or shared role descriptions. If something is wrong or
            you'd rather not appear here, mail the maintainer.
          </p>
        </div>
      </Section>
    </>
  );
}
