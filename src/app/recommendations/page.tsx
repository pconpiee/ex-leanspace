"use client";

import { useState } from "react";
import Link from "next/link";
import { PageHeader, Section } from "@/components/section";
import { CopyButton } from "@/components/copy-button";
import { alumni } from "@/lib/data/alumni";
import type { Alumnus } from "@/lib/data/alumni";

// ── Templates ─────────────────────────────────────────────────────────────────
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

// ── Data ───────────────────────────────────────────────────────────────────────
type AlumnusWithLinkedIn = Alumnus & { linkedIn: string };
const withLinkedIn = alumni.filter((a): a is AlumnusWithLinkedIn => !!a.linkedIn);

// ── Sub-components ─────────────────────────────────────────────────────────────
function StepBadge({ n, done, active }: { n: number; done: boolean; active: boolean }) {
  return (
    <div
      className={`w-7 h-7 rounded-full flex items-center justify-center mono text-xs font-bold flex-none transition ${
        done
          ? "bg-[color:var(--good)] text-white"
          : active
          ? "bg-[color:var(--accent)] text-white"
          : "bg-[color:var(--panel)] text-[color:var(--fg-mute)]"
      }`}
    >
      {done ? "✓" : n}
    </div>
  );
}

function PersonCard({
  a,
  selected,
  onToggle,
  given,
  onGive,
  requested,
  onRequest,
}: {
  a: AlumnusWithLinkedIn;
  selected: boolean;
  onToggle: () => void;
  given: boolean;
  onGive: () => void;
  requested: boolean;
  onRequest: () => void;
}) {
  const firstName = a.name.split(" ")[0];
  return (
    <div
      className={`panel p-4 transition-opacity ${!selected ? "opacity-40" : ""}`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <div className="font-medium text-[color:var(--fg)] leading-tight">{a.name}</div>
          <div className="text-xs text-[color:var(--fg-mute)] mt-0.5 truncate">{a.leanspaceRole}</div>
        </div>
        <button
          onClick={onToggle}
          className={`text-xs mono px-2 py-1 rounded border transition flex-none ${
            selected
              ? "border-[color:var(--accent)] text-[color:var(--accent)] bg-[color:var(--accent-soft)]"
              : "border-[color:var(--panel-border)] text-[color:var(--fg-mute)] hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
          }`}
        >
          {selected ? "✓ in list" : "+ add"}
        </button>
      </div>
      {selected && (
        <div className="space-y-2">
          <a
            href={a.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onGive}
            className={`w-full flex items-center justify-between gap-2 text-xs px-3 py-2 rounded-lg border transition ${
              given
                ? "bg-[color:var(--good)] border-[color:var(--good)] text-white"
                : "bg-[color:var(--accent)] border-[color:var(--accent)] text-white hover:opacity-90"
            }`}
          >
            <span>{given ? "✓ gave a rec" : `1 · Give ${firstName} a rec`}</span>
            <span className="opacity-70 text-[10px]">their profile → More → Recommend ↗</span>
          </a>
          <a
            href={a.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onRequest}
            className={`w-full flex items-center justify-between gap-2 text-xs px-3 py-2 rounded-lg border transition ${
              requested
                ? "bg-[color:var(--good)] border-[color:var(--good)] text-white"
                : "border-[color:var(--panel-border)] text-[color:var(--fg-soft)] hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
            }`}
          >
            <span>{requested ? "✓ requested" : `2 · Request from ${firstName}`}</span>
            <span className="opacity-70 text-[10px]">their profile → More → Request a rec ↗</span>
          </a>
        </div>
      )}
    </div>
  );
}

function CollapsibleSection({ title, sub, children }: { title: string; sub: string; children: React.ReactNode }) {
  return (
    <details className="group">
      <summary className="cursor-pointer list-none flex items-center justify-between gap-4 neu p-5">
        <div>
          <div className="font-semibold text-[color:var(--fg)] mb-0.5">{title}</div>
          <div className="text-sm text-[color:var(--fg-soft)]">{sub}</div>
        </div>
        <span className="mono text-xs text-[color:var(--accent)] flex-none group-open:hidden">expand ↓</span>
        <span className="mono text-xs text-[color:var(--accent)] flex-none hidden group-open:inline">close ↑</span>
      </summary>
      <div className="mt-4">{children}</div>
    </details>
  );
}

function RecStep({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
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

// ── Page ───────────────────────────────────────────────────────────────────────
export default function RecommendationsPage() {
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(withLinkedIn.map((a) => a.name))
  );
  const [given, setGiven] = useState<Set<string>>(new Set());
  const [requested, setRequested] = useState<Set<string>>(new Set());

  const selectedPeople = withLinkedIn.filter((a) => selected.has(a.name));
  const givenCount = selectedPeople.filter((a) => given.has(a.name)).length;
  const requestedCount = selectedPeople.filter((a) => requested.has(a.name)).length;

  const step1done = selectedPeople.length > 0;
  const step2done = givenCount > 0 && givenCount === selectedPeople.length;
  const step3done = requestedCount > 0 && requestedCount === selectedPeople.length;

  function toggleSelect(name: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }

  return (
    <>
      <PageHeader
        kicker="LinkedIn recommendations"
        title="Three moves. Twenty minutes."
        lede="Give a rec to someone first. Then ask for one back. That's it. The templates, AI prompt, and structure are below when you need them — but the action is up here."
      />

      {/* Progress bar */}
      <Section kicker="progress">
        <div className="flex items-center gap-4 flex-wrap">
          {[
            { n: 1, label: "Pick your people", done: step1done },
            { n: 2, label: "Give first", done: step2done },
            { n: 3, label: "Request back", done: step3done },
          ].map((s, i, arr) => (
            <div key={s.n} className="flex items-center gap-4">
              <div className={`flex items-center gap-2 ${s.done || i === 0 ? "" : "opacity-40"}`}>
                <StepBadge n={s.n} done={s.done} active={!s.done && (i === 0 || arr[i - 1].done)} />
                <span className="text-sm text-[color:var(--fg-soft)]">{s.label}</span>
              </div>
              {i < arr.length - 1 && <div className="w-8 h-px bg-[color:var(--panel-border)]" />}
            </div>
          ))}
        </div>
        <p className="text-xs text-[color:var(--fg-mute)] mt-3">
          {selected.size} people in your list · {givenCount} recs given · {requestedCount} requests sent
        </p>
      </Section>

      {/* Step 1 + 2+3 combined: the action grid */}
      <Section kicker="the action" title="Who are you reaching out to?" className="border-t hairline">
        <p className="text-sm text-[color:var(--fg-soft)] leading-relaxed mb-5">
          All alumni with LinkedIn profiles are listed. Remove anyone you&apos;re not reaching out to right now.
          Both buttons link to <strong className="text-[color:var(--fg)]">their LinkedIn profile</strong> — once you&apos;re there, click{" "}
          <code className="text-xs bg-[color:var(--panel)] px-1 py-0.5 rounded">More</code>{" "}
          to find <em>Recommend</em> or <em>Request a recommendation</em>.
        </p>
        <div className="panel p-4 border-l-2 border-[color:var(--accent)] mb-6 text-sm text-[color:var(--fg-soft)] leading-relaxed">
          <strong className="text-[color:var(--fg)]">Give before you ask.</strong> Reciprocity is the mechanism.
          A 10-minute recommendation for them dramatically increases the chance they&apos;ll write one for you — and you&apos;ll feel better about asking. Do steps 1 → 2 for each person.
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          {withLinkedIn.map((a) => (
            <PersonCard
              key={a.name}
              a={a}
              selected={selected.has(a.name)}
              onToggle={() => toggleSelect(a.name)}
              given={given.has(a.name)}
              onGive={() => setGiven((prev) => new Set([...prev, a.name]))}
              requested={requested.has(a.name)}
              onRequest={() => setRequested((prev) => new Set([...prev, a.name]))}
            />
          ))}
        </div>
      </Section>

      {/* Writing a rec (collapsible) */}
      <Section kicker="when you're writing" className="border-t hairline">
        <CollapsibleSection
          title="How to write a great recommendation"
          sub="5-part structure · example · AI draft prompt"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <RecStep n={1} title="Context — who you are to them">
                One sentence: how long and in what capacity. &quot;I worked alongside [Name] for two years at Leanspace, where we collaborated on the mission planning module as PM and Solutions Architect.&quot;
              </RecStep>
              <RecStep n={2} title="What they did that was hard">
                Remind the reader this wasn&apos;t a normal job — 50-person space-software scale-up, real customers, real missions, small team doing the work of many. Concrete is better than generic.
              </RecStep>
              <RecStep n={3} title="The specific moment">
                One story. One project. One outcome. &quot;When our largest customer changed requirements three weeks before delivery, [Name] reframed the scope, re-aligned three teams, and shipped on time.&quot; This is the part people remember.
              </RecStep>
              <RecStep n={4} title="The quality behind the moment">
                Name the underlying trait. Structured thinking, calm under pressure, technical depth, customer empathy, ownership. Don&apos;t list five — pick the one that&apos;s most true.
              </RecStep>
              <RecStep n={5} title="The close — who benefits from hiring them">
                &quot;Any team looking for someone who can [X] would be lucky to have [Name].&quot; Specific to a type of role or environment, not just a generic endorsement.
              </RecStep>
              <div className="panel p-4 border-l-2 border-[color:var(--warm)]">
                <div className="text-xs text-[color:var(--warm)] font-medium mb-1">Sweet spot</div>
                <p className="text-xs text-[color:var(--fg-soft)] leading-relaxed">150–200 words. LinkedIn shows &quot;See more&quot; fold at ~220 words.</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="panel p-5">
                <div className="kicker mb-3">Example</div>
                <div className="text-xs text-[color:var(--fg-soft)] leading-relaxed space-y-2">
                  <p>&quot;I worked with Chloé for over a year at Leanspace, where she managed one of our most operationally complex product streams. Leanspace was a scale-up building ground segment software for real satellite operators — technically demanding, small team, little room for hand-holding.</p>
                  <p>Chloé brought genuine structure to an environment that desperately needed it. When she took over the POMPOM project, timelines were unclear. She ran a discovery process, rebuilt the delivery plan, and got engineering and product aligned in a way that actually held.</p>
                  <p>Her ability to hold the big picture while staying on top of the details — rare in a PM. Any growing team that needs someone to create order without creating bureaucracy would be fortunate to work with Chloé.&quot;</p>
                </div>
              </div>
              <div className="panel p-5">
                <div className="kicker mb-3">AI draft prompt — paste into Claude</div>
                <div className="relative">
                  <CopyButton text={AI_PROMPT} />
                  <pre className="text-xs mono text-[color:var(--fg-soft)] leading-relaxed whitespace-pre-wrap overflow-x-auto pr-10 max-h-60 overflow-y-auto">
{AI_PROMPT}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </CollapsibleSection>
      </Section>

      {/* Ask template (collapsible) */}
      <Section kicker="when you're asking" className="border-t hairline">
        <CollapsibleSection
          title="How to ask for one back"
          sub="Message template — specific, short, easy to say yes to"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-sm text-[color:var(--fg-soft)] leading-relaxed mb-4">
                Don&apos;t send a blank LinkedIn request. Give them context, a framework, and an easy out. Offer to write a draft — this single thing dramatically increases the yes rate.
              </p>
              <div className="space-y-2 text-sm text-[color:var(--fg-soft)]">
                {[
                  "Pick someone who saw your work directly — not just a colleague you liked.",
                  "Remind them of one specific project so the memory is fresh.",
                  "Offer to write a draft — the offer alone makes it much easier to say yes.",
                  "Give 2–3 specific themes you'd love them to mention.",
                ].map((tip) => (
                  <div key={tip} className="flex gap-2">
                    <span className="text-[color:var(--accent)] flex-none mt-0.5">→</span>
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="panel p-5">
              <div className="kicker mb-3">Copy this message</div>
              <div className="relative">
                <CopyButton text={ASK_TEMPLATE} />
                <div className="text-xs text-[color:var(--fg-soft)] leading-relaxed pr-10 space-y-2">
                  <p>Hi [Name],</p>
                  <p>Hope you&apos;re doing well! I&apos;ve been thinking about our time working together at Leanspace, especially on [specific project or area].</p>
                  <p>I&apos;m now actively [exploring new roles] in [target area]. Would you be open to leaving me a LinkedIn recommendation? Happy to write a draft to make it easier — and of course I&apos;d love to return the favour.</p>
                  <p>Things I&apos;d love highlighted:<br />1. [skill or quality]<br />2. [skill or quality]</p>
                  <p>Thanks so much. [Your name]</p>
                </div>
              </div>
            </div>
          </div>
        </CollapsibleSection>
      </Section>

      {/* Bottom CTA */}
      <Section className="border-t hairline">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="kicker mb-2">Check the directory first</div>
            <p className="text-[color:var(--fg-soft)] text-sm max-w-md">
              Their latest role and LinkedIn are listed there — useful context before you write their recommendation.
            </p>
          </div>
          <Link href="/directory" className="btn btn-primary">
            Browse the directory →
          </Link>
        </div>
      </Section>
    </>
  );
}
