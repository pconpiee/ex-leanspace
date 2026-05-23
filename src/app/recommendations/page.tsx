import Link from "next/link";
import { PageHeader, Section } from "@/components/section";
import { CopyButton } from "@/components/copy-button";

const ASK_TEMPLATE = `Hi [Name],

Hope you're doing well! I've been thinking about our time working together at Leanspace, especially on [specific project or area — e.g., "the mission planning module rollout" / "the Series A pitch materials" / "the AIT integration sprint"].

I'm now actively [exploring new roles / open to opportunities / building my profile] in [target area — e.g., "space software PM roles" / "B2B SaaS sales" / "DevOps and SRE"].

Would you be open to leaving me a LinkedIn recommendation? I know it's a big ask — happy to write a draft to make it easier, or give you a few bullet points to work from. And of course I'd love to return the favour.

If it's helpful, some of the things I'd love highlighted:
1. [skill or quality — e.g., "cross-functional collaboration across engineering and ops"]
2. [skill or quality — e.g., "ability to translate customer needs into specs"]
3. [skill or quality — e.g., "ownership and initiative in ambiguous situations"]

Thanks so much — really appreciate it.

[Your name]`;

const AI_PROMPT = `Write a LinkedIn recommendation for [Name].

Context:
- I worked with them at Leanspace, a Series A space-software 
  scale-up (~50 people) building mission planning and ground 
  segment software for real satellite operators.
- My role: [your role]
- Their role: [their role]
- Duration: [how long you worked together]

Their strengths:
- [Strength 1 — be specific]
- [Strength 2]
- [Strength 3 — optional]

A specific moment or project to highlight:
[Describe one real example: what the challenge was, 
what they did, what the outcome was]

Target audience:
The recommendation will be read by hiring managers at 
[type of company / role — e.g., "B2B SaaS startups 
hiring PMs" / "space companies hiring engineers"].

Guidelines:
- 150–200 words
- Specific and concrete, not generic praise
- First-person, warm but professional
- One clear quality that emerges from the example
- End with a specific close about who would benefit
  from working with them`;

// ── Copy block component ──────────────────────────────────────────────────────
function CopyBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="panel p-5 md:p-6">
      <div className="kicker mb-3">{label}</div>
      {children}
    </div>
  );
}

// ── Step ──────────────────────────────────────────────────────────────────────
function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="flex-none w-7 h-7 rounded-full bg-[color:var(--accent-soft)] flex items-center justify-center mono text-xs text-[color:var(--accent)] font-bold mt-0.5">
        {n}
      </div>
      <div>
        <div className="font-medium text-[color:var(--fg)] mb-1">{title}</div>
        <div className="text-sm text-[color:var(--fg-soft)] leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function RecommendationsPage() {
  return (
    <>
      <PageHeader
        kicker="LinkedIn recommendations"
        title="Ask. Give. Amplify."
        lede="A LinkedIn recommendation from a former Leanspace colleague is worth more than you think. Here's how to ask, how to write one, and a ready-to-use AI prompt."
      />

      {/* Why it matters */}
      <Section kicker="Why bother">
        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              icon: "🔍",
              title: "Hiring managers actually read them",
              body: "Recruiters scan recommendations for signal. A specific, technical endorsement from someone who worked on real satellite software stands out.",
            },
            {
              icon: "🌐",
              title: "Your Leanspace context is rare",
              body: "Working on production ground segment, mission planning, or flight dynamics for paying customers is a genuine differentiator. A colleague can make that concrete.",
            },
            {
              icon: "🔁",
              title: "Give one to get one",
              body: "The easiest way to get a recommendation is to give one first. A 10-minute write-up for a colleague often triggers a reciprocal one within days.",
            },
          ].map((item) => (
            <div key={item.title} className="panel p-5">
              <div className="text-2xl mb-3">{item.icon}</div>
              <div className="font-medium mb-2">{item.title}</div>
              <div className="text-sm text-[color:var(--fg-soft)] leading-relaxed">{item.body}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* How to ask */}
      <Section kicker="How to ask" title="The ask template" className="border-t hairline">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-[color:var(--fg-soft)] text-sm leading-relaxed mb-6">
              Short, specific, and easy to say yes to. Don&apos;t just send a blank LinkedIn request — give the person a clear context and a light framework. This is a real message sent between Leanspace alumni that led to a strong recommendation.
            </p>
            <div className="space-y-3 text-sm text-[color:var(--fg-soft)]">
              <div className="flex gap-2">
                <span className="text-[color:var(--accent)] mt-0.5">→</span>
                <span>Pick someone who saw your work directly — not just a colleague you liked.</span>
              </div>
              <div className="flex gap-2">
                <span className="text-[color:var(--accent)] mt-0.5">→</span>
                <span>Remind them of one specific project or outcome so the memory is fresh.</span>
              </div>
              <div className="flex gap-2">
                <span className="text-[color:var(--accent)] mt-0.5">→</span>
                <span>Offer to draft a starting point — it makes it much easier for them to say yes.</span>
              </div>
              <div className="flex gap-2">
                <span className="text-[color:var(--accent)] mt-0.5">→</span>
                <span>Give them 2–3 specific themes or skills you&apos;d love them to mention.</span>
              </div>
            </div>
          </div>

          <CopyBlock label="Copy this message">
            <div className="relative">
              <CopyButton text={ASK_TEMPLATE} />
              <div className="space-y-3 text-sm text-[color:var(--fg-soft)] leading-relaxed pr-16">
                <p>Hi [Name],</p>
                <p>
                  Hope you&apos;re doing well! I&apos;ve been thinking about our time working together at
                  Leanspace, especially on [specific project or area — e.g., &quot;the mission planning
                  module rollout&quot; / &quot;the Series A pitch materials&quot; / &quot;the AIT integration
                  sprint&quot;].
                </p>
                <p>
                  I&apos;m now actively [exploring new roles / open to opportunities / building
                  my profile] in [target area — e.g., &quot;space software PM roles&quot; / &quot;B2B
                  SaaS sales&quot; / &quot;DevOps and SRE&quot;].
                </p>
                <p>
                  Would you be open to leaving me a LinkedIn recommendation? I know it&apos;s a big ask
                  — happy to write a draft to make it easier, or give you a few bullet points to
                  work from. And of course I&apos;d love to return the favour.
                </p>
                <p>
                  If it&apos;s helpful, some of the things I&apos;d love highlighted:
                  <br />
                  1. [skill or quality — e.g., &quot;cross-functional collaboration across engineering and ops&quot;]
                  <br />
                  2. [skill or quality — e.g., &quot;ability to translate customer needs into specs&quot;]
                  <br />
                  3. [skill or quality — e.g., &quot;ownership and initiative in ambiguous situations&quot;]
                </p>
                <p>Thanks so much — really appreciate it.</p>
                <p>[Your name]</p>
              </div>
            </div>
          </CopyBlock>
        </div>
      </Section>

      {/* How to write */}
      <Section kicker="How to write one" title="The 5-part recommendation structure" className="border-t hairline">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Step n={1} title="Context — who you are to them">
              One sentence on your relationship: how long, in what capacity. &quot;I worked alongside [Name] for two years at Leanspace, where we collaborated on the mission planning module as PM and Solutions Architect.&quot;
            </Step>
            <Step n={2} title="What they did that was hard">
              The role context at Leanspace. This is where you remind the reader that this wasn&apos;t a normal job — it was a 50-person space-software scale-up with real customers, real missions, and a small team doing the work of many. Concrete is better than generic.
            </Step>
            <Step n={3} title="The specific moment that stands out">
              One story. One project. One outcome. The more specific the better: &quot;When our largest customer changed requirements three weeks before delivery, [Name] reframed the scope, re-aligned three teams, and shipped on time.&quot; This is the part people remember.
            </Step>
            <Step n={4} title="The quality behind the moment">
              Name the underlying trait: structured thinking, calm under pressure, technical depth, customer empathy, ownership. Don&apos;t list five — pick the one that&apos;s most true.
            </Step>
            <Step n={5} title="The close — who would benefit from hiring them">
              &quot;Any team looking for someone who can [X] would be lucky to have [Name].&quot; Keep it specific to a type of role or environment, not just a generic endorsement.
            </Step>
          </div>

          <div>
            <div className="panel p-5 md:p-6 mb-5">
              <div className="kicker mb-3">Example recommendation</div>
              <div className="text-sm text-[color:var(--fg-soft)] leading-relaxed space-y-3">
                <p>
                  &quot;I worked with Chloé for over a year at Leanspace, where she managed one of our most
                  operationally complex product streams. Leanspace was a scale-up building ground segment
                  software for real satellite operators — the work was technically demanding, and the pace
                  left little room for hand-holding.
                </p>
                <p>
                  Chloé brought genuine structure to an environment that desperately needed it. When she
                  took over the POMPOM project, timelines were unclear and stakeholder expectations were
                  misaligned. She ran a discovery process, rebuilt the delivery plan, and got engineering
                  and product aligned in a way that actually held.
                </p>
                <p>
                  What I remember most is her ability to hold the big picture while staying on top of the
                  details — rare in a PM. She didn&apos;t need to be chased; she was the one chasing others
                  in the best possible way.
                </p>
                <p>
                  Any growing team that needs someone to create order without creating bureaucracy would
                  be fortunate to work with Chloé.&quot;
                </p>
              </div>
            </div>

            <div className="panel p-4 border-l-2 border-[color:var(--warm)]">
              <div className="text-xs text-[color:var(--warm)] font-medium mb-1">Pro tip</div>
              <p className="text-xs text-[color:var(--fg-soft)] leading-relaxed">
                150–200 words hits the sweet spot. Long enough to be credible, short enough to actually get read. LinkedIn&apos;s UI shows a &quot;See more&quot; fold at around 220 words.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* AI prompt */}
      <Section kicker="AI-assisted drafting" title="Draft it with Claude or ChatGPT" className="border-t hairline">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-[color:var(--fg-soft)] text-sm leading-relaxed mb-4">
              Paste this prompt into Claude or ChatGPT. Fill in the brackets, then use the output as a starting point — edit it in your own voice before sending.
            </p>
            <p className="text-[color:var(--fg-soft)] text-sm leading-relaxed">
              The goal is a draft, not a final. The AI version will be generic until you add the specific detail that only you know — the moment, the project, the quality.
            </p>

            <div className="mt-6 space-y-3">
              <div className="kicker">Useful Leanspace phrases to include</div>
              <ul className="space-y-1.5 text-sm text-[color:var(--fg-soft)]">
                {[
                  "mission planning software for satellite operators",
                  "ground segment platform used in production",
                  "Series A-stage scale-up (€10M, Nov 2025)",
                  "50-person team, Strasbourg + US presence",
                  "customers including established space agencies and NewSpace operators",
                  "real-time mission control, telemetry, commanding",
                  "working across ESA-heritage teams and modern cloud infrastructure",
                ].map((phrase) => (
                  <li key={phrase} className="flex gap-2">
                    <span className="text-[color:var(--fg-mute)]">·</span>
                    <span className="mono text-xs">{phrase}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <div className="kicker mb-3">Prompt to copy</div>
            <div className="relative">
              <CopyButton text={AI_PROMPT} />
              <pre className="panel p-5 text-xs mono text-[color:var(--fg-soft)] leading-relaxed whitespace-pre-wrap overflow-x-auto">
{AI_PROMPT}
              </pre>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="border-t hairline">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="kicker mb-2">Ready to reach out?</div>
            <p className="text-[color:var(--fg-soft)] text-sm max-w-md">
              Check who&apos;s in the directory first — a mutual Leanspace connection makes any ask warmer.
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Link href="/directory" className="btn btn-primary">
              Browse the directory →
            </Link>
            <Link href="/networking" className="btn">
              Networking playbooks
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
