import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { getServerSupabase } from "@/lib/supabase-server";
import type { ApplicationRow, CVRow } from "@/lib/db-types";
import { STATUS_COLUMNS } from "@/lib/db-types";

export default async function AppDashboardPage() {
  const user = await requireUser();
  const supabase = await getServerSupabase();
  if (!supabase) {
    return (
      <main className="px-5 md:px-10 py-10">
        <p>Supabase not configured.</p>
      </main>
    );
  }

  const [{ data: cvs }, { data: apps }] = await Promise.all([
    supabase
      .from("cvs")
      .select("*")
      .eq("user_email", user.email)
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("applications")
      .select("*")
      .eq("user_email", user.email)
      .order("updated_at", { ascending: false })
      .limit(8),
  ]);

  const cvList = (cvs ?? []) as CVRow[];
  const apList = (apps ?? []) as ApplicationRow[];
  const activeCv = cvList.find((c) => c.is_active) ?? cvList[0];

  const counts = new Map<string, number>();
  for (const a of apList) counts.set(a.status, (counts.get(a.status) ?? 0) + 1);

  return (
    <main className="px-5 md:px-10 py-8 md:py-12 max-w-6xl">
      <p className="kicker mb-2">Career app</p>
      <h1 className="text-3xl md:text-4xl font-medium mb-2">Welcome back.</h1>
      <p className="lede mb-10">
        Track jobs, score fit against your CV, and use Claude to surface
        experiences you forgot to mention.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <section className="panel p-6">
          <h2 className="text-lg font-medium mb-3">Your CV</h2>
          {activeCv ? (
            <>
              <p className="text-sm text-[color:var(--fg-soft)] mb-1">
                <span className="mono">{activeCv.filename}</span>
              </p>
              <p className="text-xs text-[color:var(--fg-mute)] mb-4">
                Uploaded{" "}
                {new Date(activeCv.created_at).toLocaleDateString(undefined, {
                  dateStyle: "medium",
                })}
              </p>
              <Link href="/app/cv" className="btn text-xs">
                Manage CV →
              </Link>
            </>
          ) : (
            <>
              <p className="text-sm text-[color:var(--fg-soft)] mb-4">
                No CV yet. Upload one so fit analysis can run against it.
              </p>
              <Link href="/app/cv" className="btn btn-primary text-xs">
                Upload CV →
              </Link>
            </>
          )}
        </section>

        <section className="panel p-6">
          <h2 className="text-lg font-medium mb-3">Pipeline</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {STATUS_COLUMNS.map((c) => (
              <span key={c.key} className="tag tag-mute">
                {counts.get(c.key) ?? 0} {c.label.toLowerCase()}
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <Link href="/app/applications" className="btn text-xs">
              Open board →
            </Link>
            <Link href="/app/applications/new" className="btn btn-primary text-xs">
              + New application
            </Link>
          </div>
        </section>
      </div>

      <section>
        <h2 className="text-lg font-medium mb-4">Recent applications</h2>
        {apList.length === 0 ? (
          <p className="text-sm text-[color:var(--fg-mute)]">
            Nothing yet. <Link href="/app/applications/new" className="link">Add the first one →</Link>
          </p>
        ) : (
          <ul className="divide-y hairline border-y hairline">
            {apList.map((a) => (
              <li key={a.id}>
                <Link
                  href={`/app/applications/${a.id}`}
                  className="flex items-baseline gap-3 py-3 hover:bg-[color:var(--bg-soft)] px-2 -mx-2 rounded transition"
                >
                  <span className="mono text-xs text-[color:var(--fg-mute)] w-16 shrink-0">
                    {a.fit_score != null ? `${a.fit_score}/100` : "—"}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{a.job_title}</div>
                    <div className="text-xs text-[color:var(--fg-mute)] truncate">
                      {a.company} {a.location ? `· ${a.location}` : ""}
                    </div>
                  </div>
                  <span className="tag tag-mute capitalize">{a.status}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
