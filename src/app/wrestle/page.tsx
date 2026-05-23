import Link from "next/link";
import { PageHeader, Section } from "@/components/section";
import { playbooks } from "@/lib/data/networking";

export const metadata = {
  title: "Wrestle — ex-Leanspace",
  description: "W — Have a plan. Know that work and suffering will occur. Persevere. Look for opportunities. Be bold. The third phase of the ROW framework.",
};

export default function WrestlePage() {
  return (
    <>
      <PageHeader
        kicker="W — Wrestle"
        title="Have the plan. Do the work. Be bold."
        lede="The job search is uncomfortable. Applications get ignored. Interviews go sideways. Offers feel low. This phase is where you work through all of it — with a plan, without flinching."
      />

      {/* ── HAVE A PLAN ─────────────────────────────────────────── */}
      <Section kicker="have a plan">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-3">Build a 20–40 company target list. Work it weekly.</h2>
            <p className="text-[color:var(--fg-soft)] text-sm leading-relaxed mb-4">
              Don&apos;t apply to everything on LinkedIn Jobs. Build a focused list of 20–40 companies
              in your target destination, and work it systematically — not reactively.
            </p>
            <div className="space-y-2 text-sm text-[color:var(--fg-soft)]">
              {[
                "Column A: companies you'd take immediately if they called tomorrow",
                "Column B: companies you'd seriously consider with the right role",
                "Column C: companies for practice and benchmarking",
                "For each: one contact at the company, one opening angle",
                "Weekly: 3 outreach touches, 1 follow-up, 1 new conversation to keep warm",
              ].map((tip) => (
                <div key={tip} className="flex gap-2">
                  <span className="text-[color:var(--accent)] flex-none mt-0.5">→</span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="panel p-5">
            <div className="kicker mb-3">The numbers (so you&apos;re not surprised)</div>
            <div className="space-y-3">
              {[
                { stat: "80–150", label: "avg applications before an offer at knowledge-work companies" },
                { stat: "3–6 months", label: "typical search duration for senior roles" },
                { stat: "20–25%", label: "of roles filled by cold applications" },
                { stat: "75–80%", label: "of roles filled through referrals and networks" },
                { stat: "5–10×", label: "response rate uplift from a warm intro vs cold application" },
              ].map(({ stat, label }) => (
                <div key={label} className="flex items-baseline gap-3">
                  <div className="mono text-base font-bold text-[color:var(--accent)] flex-none">{stat}</div>
                  <div className="text-sm text-[color:var(--fg-soft)]">{label}</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-[color:var(--fg-mute)] mt-4">
              These aren&apos;t here to discourage you. They&apos;re here so rejection doesn&apos;t feel like a signal about you.
              It&apos;s a numbers game. The plan is to improve the numbers.
            </p>
          </div>
        </div>
      </Section>

      {/* ── WORK AND SUFFERING ──────────────────────────────────── */}
      <Section kicker="know that work and suffering will occur" className="border-t hairline">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-3">Rejection is data. Not a verdict.</h2>
            <p className="text-[color:var(--fg-soft)] text-sm leading-relaxed mb-4">
              You will be ignored. You will get to final rounds and lose. You will get offers below what you expected.
              That&apos;s the job search. It&apos;s not a reflection of the quality of your work at Leanspace —
              it&apos;s a function of timing, fit, and luck.
            </p>
            <p className="text-[color:var(--fg-soft)] text-sm leading-relaxed mb-4">
              What you can control: your story, your targeting, your preparation, and your follow-through.
              What you can&apos;t: the hiring manager&apos;s internal candidate, the company&apos;s budget freeze, the timing.
            </p>
            <div className="panel p-4 border-l-2 border-[color:var(--warm)]">
              <div className="text-xs text-[color:var(--warm)] font-medium mb-1">What keeps people going</div>
              <div className="space-y-2 text-xs text-[color:var(--fg-soft)]">
                {[
                  "One real conversation is worth 20 applications. Prioritise conversations.",
                  "Track your pipeline. Momentum is visible when you can see the numbers.",
                  "Tell people you trust what you're looking for. You never know who knows who.",
                  "The network here is genuinely warm. Use it — people want to help.",
                ].map((tip) => (
                  <div key={tip} className="flex gap-2">
                    <span className="text-[color:var(--accent)] flex-none">·</span>
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-3">The four networking plays.</h2>
            <p className="text-[color:var(--fg-soft)] text-sm leading-relaxed mb-4">
              Pick the one that matches your situation. Not all four at once — that&apos;s how you burn out in week two.
            </p>
            <div className="space-y-3">
              {playbooks.map((p, i) => (
                <details key={p.title} className="group panel p-0 overflow-hidden">
                  <summary className="cursor-pointer list-none flex items-center gap-3 p-4 hover:bg-[color:var(--bg-soft)] transition">
                    <span className="w-7 h-7 rounded-full bg-[color:var(--accent)] text-white mono text-xs font-bold flex items-center justify-center flex-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-[color:var(--fg)] truncate">{p.title}</div>
                      <div className="tag text-[10px]">{p.audience}</div>
                    </div>
                    <span className="mono text-xs text-[color:var(--accent)] flex-none group-open:hidden">↓</span>
                    <span className="mono text-xs text-[color:var(--accent)] flex-none hidden group-open:inline">↑</span>
                  </summary>
                  <div className="border-t hairline p-4">
                    <ol className="space-y-2">
                      {p.steps.map((s, si) => (
                        <li key={si} className="flex gap-3 text-xs text-[color:var(--fg-soft)]">
                          <span className="text-[color:var(--accent)] font-medium flex-none">{si + 1}.</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ── LOOK FOR OPPORTUNITIES ──────────────────────────────── */}
      <Section kicker="look for opportunities" className="border-t hairline">
        <h2 className="text-xl font-semibold mb-6">Where the opportunities actually are.</h2>
        <div className="grid md:grid-cols-3 gap-5">
          <div className="panel p-5">
            <div className="kicker mb-3">Events worth going to</div>
            <ul className="space-y-2 text-sm text-[color:var(--fg-soft)]">
              {[
                { name: "SmallSat Europe", note: "Amsterdam · NewSpace ecosystem" },
                { name: "IAC (Int. Astronautical Congress)", note: "Annual · every major player attends" },
                { name: "Space Tech Expo Europe", note: "Bremen · supply chain + primes" },
                { name: "EUCASS / AMOS", note: "Technical · engineering-focused" },
                { name: "Startup Battlefield / VivaTech", note: "Paris · for the SaaS/scale-up pivot" },
                { name: "DSEI", note: "London · defense-tech specific" },
              ].map(({ name, note }) => (
                <li key={name}>
                  <div className="font-medium text-[color:var(--fg)] text-xs">{name}</div>
                  <div className="text-xs text-[color:var(--fg-mute)]">{note}</div>
                </li>
              ))}
            </ul>
          </div>
          <div className="panel p-5">
            <div className="kicker mb-3">Communities worth joining</div>
            <ul className="space-y-2 text-sm text-[color:var(--fg-soft)]">
              {[
                { name: "Space Talent Network", note: "Job board + community for space careers" },
                { name: "Founding Sales (slack)", note: "For BDMs/AEs going into early-stage sales" },
                { name: "Lenny's Newsletter / Slack", note: "Product community — if you're going PM" },
                { name: "Mind the Product", note: "PM-focused events and community" },
                { name: "SpaceTech UK / SpaceTech FR", note: "National network hubs" },
                { name: "LinkedIn Space community", note: "Curate your feed — follow the hiring managers" },
              ].map(({ name, note }) => (
                <li key={name}>
                  <div className="font-medium text-[color:var(--fg)] text-xs">{name}</div>
                  <div className="text-xs text-[color:var(--fg-mute)]">{note}</div>
                </li>
              ))}
            </ul>
          </div>
          <div className="panel p-5">
            <div className="kicker mb-3">The alumni directory</div>
            <p className="text-sm text-[color:var(--fg-soft)] leading-relaxed mb-3">
              20 ex-Leanspacers with current roles. The most underused resource on this site.
              A message that starts with &quot;we worked together on MPS at Leanspace&quot; gets opened.
            </p>
            <Link href="/directory" className="btn btn-primary w-full text-center text-sm">
              Browse the directory →
            </Link>
          </div>
        </div>
      </Section>

      {/* ── BE BOLD ─────────────────────────────────────────────── */}
      <Section kicker="be bold" className="border-t hairline">
        <h2 className="text-xl font-semibold mb-6">The three places where boldness pays off most.</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {/* Interview */}
          <div className="panel p-5">
            <div className="kicker mb-3">Interview — tell the story, don&apos;t recite the CV</div>
            <div className="space-y-2 text-sm text-[color:var(--fg-soft)]">
              {[
                "You have 30 seconds to make Leanspace land — practice your context-setting sentence.",
                "Use STAR for every story: Situation, Task, Action, Result. Always ends with a number or outcome.",
                "Prepare 4–5 Leanspace stories that flex across different competency questions.",
                "'Why Leanspace ended' will come up — have a clean, honest, forward-facing answer.",
                "Prepare questions that show you've done serious research on the company.",
              ].map((tip) => (
                <div key={tip} className="flex gap-2">
                  <span className="text-[color:var(--accent)] flex-none mt-0.5">→</span>
                  <span className="text-xs">{tip}</span>
                </div>
              ))}
            </div>
            <Link href="/skills#interview" className="mono text-xs text-[color:var(--accent)] hover:underline mt-4 block">
              Interview prep prompts →
            </Link>
          </div>

          {/* Negotiate */}
          <div className="panel p-5">
            <div className="kicker mb-3">Negotiate — never accept the first offer</div>
            <div className="space-y-2 text-sm text-[color:var(--fg-soft)]">
              {[
                "Always negotiate, even if the offer feels good. Silence costs you nothing.",
                "Research comp first: levels.fyi, Compa.io, LinkedIn Salary, Glassdoor.",
                "Negotiate the full package: base, bonus, equity, remote days, title, start date.",
                "Counter in writing — less uncomfortable and easier to track.",
                "If base is fixed, negotiate non-cash: training budget, extra leave, earlier review.",
              ].map((tip) => (
                <div key={tip} className="flex gap-2">
                  <span className="text-[color:var(--accent)] flex-none mt-0.5">→</span>
                  <span className="text-xs">{tip}</span>
                </div>
              ))}
            </div>
            <div className="panel p-3 border-l-2 border-[color:var(--warm)] mt-4">
              <p className="text-xs text-[color:var(--fg-mute)]">
                Bowles &amp; Babcock (HKS): negotiating at offer stage earns 7–14% more in year one
                and compounds across every role after. The discomfort is real. The asymmetry is worse.
              </p>
            </div>
            <Link href="/skills#networking" className="mono text-xs text-[color:var(--accent)] hover:underline mt-3 block">
              Salary negotiation prompt →
            </Link>
          </div>

          {/* Give back */}
          <div className="panel p-5">
            <div className="kicker mb-3">Give back — the network compounds when you contribute</div>
            <div className="space-y-2 text-sm text-[color:var(--fg-soft)]">
              {[
                "Write a LinkedIn recommendation for a Leanspace colleague — takes 10 minutes, lasts years.",
                "When you land a role, tell us. Someone else will want to know where you went.",
                "Make a warm intro when you see a fit — most people never ask, so just do it.",
                "Post an opening on the directory when you're hiring.",
              ].map((tip) => (
                <div key={tip} className="flex gap-2">
                  <span className="text-[color:var(--accent)] flex-none mt-0.5">→</span>
                  <span className="text-xs">{tip}</span>
                </div>
              ))}
            </div>
            <div className="panel p-3 border-l-2 border-[color:var(--warm)] mt-4">
              <p className="text-xs text-[color:var(--fg-mute)]">
                Grant (2013): givers outperform takers and matchers long-term in network-dependent
                industries. The space sector is small. Your reputation travels. Act accordingly.
              </p>
            </div>
            <Link href="/recommendations" className="mono text-xs text-[color:var(--accent)] hover:underline mt-3 block">
              Recommendations exchange →
            </Link>
          </div>
        </div>
      </Section>

      {/* ── BACK TO THE MAP ─────────────────────────────────────── */}
      <Section className="border-t hairline">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="kicker mb-2">You&apos;ve rowed. You&apos;re landing.</div>
            <p className="text-[color:var(--fg-soft)] text-sm max-w-md">
              The other shore. That&apos;s what this was all for.
              When you land, come back to the directory — update your entry, post an opening, make an intro.
              The network is only worth what the people in it put into it.
            </p>
          </div>
          <Link href="/directory" className="btn btn-primary flex-none">
            Browse the network →
          </Link>
        </div>
      </Section>
    </>
  );
}
