import { Container, PageHeader, Section } from "@/components/section";
import { leadership, teams, companyFacts } from "@/lib/data/org";

export const metadata = {
  title: "The Leanspace org — ex-Leanspace",
  description: "An organisational map of Leanspace (Strasbourg + Denver) from May 2026, drawn from public information and alumni-shared role descriptions.",
};

export default function OrgPage() {
  return (
    <>
      <PageHeader
        kicker="the org"
        title="Leanspace, from inside."
        lede={
          <>
            An organisational map of Leanspace from May 2026 — drawn from public information
            and alumni-shared role descriptions. Useful for outreach, reference checks, and
            seeing who else worked the same problems as you. Public-info only.
          </>
        }
      />

      <Section kicker="company facts">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="panel p-6">
            <div className="kicker mb-3">at a glance</div>
            <ul className="text-sm space-y-2.5">
              <Row label="Founded" value={companyFacts.founded} />
              <Row label="HQ" value={companyFacts.hq} />
              <Row label="US office" value={companyFacts.usOffice} />
              <Row label="Headcount" value={companyFacts.headcount} />
            </ul>
          </div>
          <div className="panel p-6">
            <div className="kicker mb-3">funding</div>
            <ul className="text-sm space-y-3">
              {companyFacts.rounds.map((r) => (
                <li key={r.label}>
                  <div className="flex justify-between font-medium"><span>{r.label}</span><span>{r.amount} · {r.year}</span></div>
                  <div className="mono text-xs text-[color:var(--fg-mute)] mt-1">{r.investors.join(" · ")}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="panel p-6">
            <div className="kicker mb-3">known customers</div>
            <ul className="text-sm text-[color:var(--fg-soft)] space-y-1.5">
              {companyFacts.customers.map((c) => <li key={c}>· {c}</li>)}
            </ul>
          </div>
          <div className="panel p-6">
            <div className="kicker mb-3">where the founders came from</div>
            <ul className="text-sm text-[color:var(--fg-soft)] space-y-1.5">
              {companyFacts.founderBackgrounds.map((b) => <li key={b}>· {b}</li>)}
            </ul>
          </div>
        </div>
      </Section>

      <Section kicker="leadership" title="The C-suite and founders.">
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

function Row({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex justify-between gap-4 border-b hairline pb-2 last:border-0">
      <span className="text-[color:var(--fg-mute)]">{label}</span>
      <span className="text-right">{value}</span>
    </li>
  );
}
