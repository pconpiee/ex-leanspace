import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { getServerSupabase } from "@/lib/supabase-server";
import type {
  ApplicationMessageRow,
  ApplicationRow,
} from "@/lib/db-types";
import { AppActions } from "@/components/app/app-actions";
import { ImproveFitChat } from "@/components/app/improve-fit-chat";

export const dynamic = "force-dynamic";

export default async function ApplicationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await requireUser();
  const supabase = await getServerSupabase();
  if (!supabase) notFound();

  const { data: app } = await supabase
    .from("applications")
    .select("*")
    .eq("id", id)
    .eq("user_email", user.email)
    .maybeSingle();
  if (!app) notFound();
  const application = app as ApplicationRow;

  const { data: msgs } = await supabase
    .from("application_messages")
    .select("*")
    .eq("application_id", application.id)
    .order("created_at", { ascending: true });
  const messages = (msgs ?? []) as ApplicationMessageRow[];

  const fit = application.fit_analysis;
  const research = application.company_research;
  const starterQuestions = fit?.questions_for_improve_fit ?? [];

  return (
    <main className="px-5 md:px-10 py-8 md:py-12 max-w-6xl">
      <Link
        href="/app/applications"
        className="text-xs text-[color:var(--fg-mute)] hover:text-[color:var(--fg)] mb-4 inline-block"
      >
        ← Back to board
      </Link>

      <div className="flex flex-wrap items-baseline gap-3 mb-2">
        <h1 className="text-3xl font-medium">{application.job_title}</h1>
        <span className="tag tag-mute capitalize">{application.status}</span>
        {application.fit_score != null && (
          <span
            className="tag"
            style={{
              background:
                application.fit_score >= 70
                  ? "rgba(22,163,74,0.1)"
                  : application.fit_score >= 50
                    ? "rgba(249,115,22,0.1)"
                    : "rgba(217,119,6,0.1)",
              color:
                application.fit_score >= 70
                  ? "var(--good)"
                  : application.fit_score >= 50
                    ? "var(--accent)"
                    : "var(--warm)",
            }}
          >
            Fit {application.fit_score}/100
          </span>
        )}
      </div>
      <p className="text-[color:var(--fg-soft)] mb-1">
        {application.company}
        {application.location ? ` · ${application.location}` : ""}
      </p>
      {application.job_url && (
        <a
          href={application.job_url}
          target="_blank"
          rel="noreferrer"
          className="link text-xs"
        >
          Original posting ↗
        </a>
      )}

      <div className="mt-6 mb-8">
        <AppActions
          applicationId={application.id}
          status={application.status}
          hasFitAnalysis={!!fit}
          hasResearch={!!research}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <section className="space-y-6">
          {fit ? (
            <div className="panel p-6">
              <p className="kicker mb-2">Fit analysis</p>
              <p className="text-base font-medium mb-4">{fit.headline}</p>

              <Detail title="Strengths">
                <ul className="space-y-3 text-sm">
                  {fit.strengths.map((s, i) => (
                    <li key={i}>
                      <p className="text-[color:var(--fg)]">{s.why_relevant}</p>
                      <p className="text-xs text-[color:var(--fg-mute)] mt-1 italic">
                        “{s.quote_from_cv}”
                      </p>
                    </li>
                  ))}
                </ul>
              </Detail>

              <Detail title="Gaps">
                <ul className="space-y-3 text-sm">
                  {fit.gaps.map((g, i) => (
                    <li key={i}>
                      <p className="font-medium">{g.job_requirement}</p>
                      <p className="text-[color:var(--fg-soft)] text-xs mt-1">
                        Weak spot: {g.where_im_weak}
                      </p>
                      <p className="text-[color:var(--fg-soft)] text-xs">
                        How to close: {g.how_to_close}
                      </p>
                    </li>
                  ))}
                </ul>
              </Detail>

              <Detail title="Suggested résumé edits">
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  {fit.suggested_resume_edits.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </Detail>

              <Detail title="Cover letter outline">
                <ol className="list-decimal pl-5 space-y-1 text-sm">
                  {fit.cover_letter_outline.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ol>
              </Detail>
            </div>
          ) : (
            <div className="panel p-6 text-sm">
              <p className="kicker mb-2">Fit analysis</p>
              <p className="text-[color:var(--fg-soft)]">
                Not run yet — click "Run fit analysis" above.
              </p>
            </div>
          )}

          {research ? (
            <div className="panel p-6">
              <p className="kicker mb-2">Company research</p>
              <p className="text-sm mb-4">{research.summary}</p>
              <Detail title="Mission">
                <p className="text-sm">{research.mission}</p>
              </Detail>
              {research.recent_news.length > 0 && (
                <Detail title="Recent news">
                  <ul className="space-y-2 text-sm">
                    {research.recent_news.map((n, i) => (
                      <li key={i}>
                        <p className="font-medium">{n.title}</p>
                        <p className="text-[color:var(--fg-soft)] text-xs">
                          {n.detail}
                        </p>
                      </li>
                    ))}
                  </ul>
                </Detail>
              )}
              {research.culture_signals.length > 0 && (
                <Detail title="Culture signals">
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    {research.culture_signals.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </Detail>
              )}
              {research.what_to_emphasize.length > 0 && (
                <Detail title="Emphasise in your app">
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    {research.what_to_emphasize.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </Detail>
              )}
              {research.sources.length > 0 && (
                <Detail title="Sources">
                  <ul className="text-xs space-y-0.5">
                    {research.sources.map((u, i) => (
                      <li key={i}>
                        <a className="link" href={u} target="_blank" rel="noreferrer">
                          {u}
                        </a>
                      </li>
                    ))}
                  </ul>
                </Detail>
              )}
            </div>
          ) : (
            <div className="panel p-6 text-sm">
              <p className="kicker mb-2">Company research</p>
              <p className="text-[color:var(--fg-soft)]">
                Not run yet — click "Research company" above to fetch fresh
                context with Claude's web search.
              </p>
            </div>
          )}
        </section>

        <section className="space-y-6">
          <ImproveFitChat
            applicationId={application.id}
            initialMessages={messages}
            starterQuestions={starterQuestions}
          />

          <details className="panel p-6">
            <summary className="cursor-pointer text-sm font-medium">
              Job description ({application.job_description.length.toLocaleString()} chars)
            </summary>
            <pre className="mt-4 max-h-96 overflow-auto text-xs whitespace-pre-wrap text-[color:var(--fg-soft)]">
              {application.job_description}
            </pre>
          </details>
        </section>
      </div>
    </main>
  );
}

function Detail({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-5">
      <p className="kicker mb-2">{title}</p>
      {children}
    </div>
  );
}
