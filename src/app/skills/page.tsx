import { Container, PageHeader, Section } from "@/components/section";
import { prompts } from "@/lib/data/prompts";
import { CopyButton } from "@/components/copy-button";

export const metadata = {
  title: "AI Skills & Prompts — ex-Leanspace",
  description: "Claude prompts and skills for CV editing, interview prep, salary negotiation, founder thesis pressure-testing, and leadership transitions.",
};

const sections = [
  { label: "Job search & CV", filter: (p: typeof prompts[number]) => p.audience.includes("CV editing") || p.audience.includes("job search") },
  { label: "Interview prep", filter: (p: typeof prompts[number]) => p.audience.includes("interview prep") },
  { label: "Networking & negotiation", filter: (p: typeof prompts[number]) => p.audience.includes("networking") || p.audience.includes("offer stage") },
  { label: "Founder & leadership", filter: (p: typeof prompts[number]) => p.audience.includes("founder route") || p.audience.includes("leadership") },
  { label: "Claude skills (~/.claude/skills/)", filter: (p: typeof prompts[number]) => p.audience.includes("Claude skill") },
];

export default function SkillsPage() {
  return (
    <>
      <PageHeader
        kicker="ai skills & prompts"
        title="Copy-paste prompts and Claude skills, tuned to what you already know."
        lede={
          <>
            Ten prompts and three Claude skills. Each one assumes you have Leanspace context
            and skips the obvious. Paste into Claude.ai, Claude Desktop, or save the skills
            to <code className="mono text-[color:var(--fg)]">~/.claude/skills/</code>.
          </>
        }
      />

      {sections.map((s) => {
        const matches = prompts.filter(s.filter);
        if (matches.length === 0) return null;
        return (
          <Section key={s.label} kicker={s.label} className="border-t hairline">
            <div className="space-y-6">
              {matches.map((p) => (
                <article key={p.id} className="panel p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-3 mb-3">
                    <h3 className="text-xl">{p.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {p.function.map((f) => <span key={f} className="tag tag-mute">{f}</span>)}
                    </div>
                  </div>
                  {p.notes && (
                    <p className="text-sm text-[color:var(--fg-soft)] mb-4">{p.notes}</p>
                  )}
                  <div className="relative">
                    <CopyButton text={p.body} />
                    <pre>{p.body}</pre>
                  </div>
                </article>
              ))}
            </div>
          </Section>
        );
      })}

      <Section kicker="how to use" title="On Claude skills, briefly.">
        <div className="grid md:grid-cols-2 gap-5">
          <div className="panel p-6">
            <h3 className="text-lg mb-2">User-level Claude skills</h3>
            <p className="text-sm text-[color:var(--fg-soft)] leading-6 mb-3">
              Skills are bits of structured guidance Claude loads on demand. Save them under
              <code className="mono text-[color:var(--fg)]"> ~/.claude/skills/&lt;name&gt;/SKILL.md</code> on your machine.
              Reference them with <code className="mono text-[color:var(--fg)]">/&lt;name&gt;</code> or just by mentioning them in a Claude Code session.
            </p>
            <p className="text-sm text-[color:var(--fg-soft)] leading-6">
              The three skills above (<span className="mono">cv-coach</span>, <span className="mono">deal-postmortem</span>, <span className="mono">mission-storyteller</span>) are tuned for the ex-Leanspace context — they already know your reporting chain, products, and customer types. Edit them to match your specific role.
            </p>
          </div>
          <div className="panel p-6">
            <h3 className="text-lg mb-2">Project-level skills</h3>
            <p className="text-sm text-[color:var(--fg-soft)] leading-6 mb-3">
              If you're building a job-search workflow, drop skills into a project root
              under <code className="mono text-[color:var(--fg)]">.claude/skills/</code>. They only load in that project. Useful for
              keeping CV variants, target-company research, and interview notes scoped together.
            </p>
            <p className="text-sm text-[color:var(--fg-soft)] leading-6">
              See <a className="link" href="https://docs.claude.com/" target="_blank" rel="noopener">docs.claude.com</a> for the canonical reference.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
