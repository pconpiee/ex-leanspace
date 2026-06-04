import { requireUser } from "@/lib/auth";
import { getServerSupabase } from "@/lib/supabase-server";
import type { CVRow } from "@/lib/db-types";
import { CvUploader } from "@/components/app/cv-uploader";

export const dynamic = "force-dynamic";

export default async function CvPage() {
  const user = await requireUser();
  const supabase = await getServerSupabase();
  const { data } = supabase
    ? await supabase
        .from("cvs")
        .select("*")
        .eq("user_email", user.email)
        .order("created_at", { ascending: false })
    : { data: [] };

  const cvs = (data ?? []) as CVRow[];
  const active = cvs.find((c) => c.is_active);

  return (
    <main className="px-5 md:px-10 py-8 md:py-12 max-w-4xl">
      <p className="kicker mb-2">CV</p>
      <h1 className="text-3xl font-medium mb-2">My CV</h1>
      <p className="lede mb-8">
        Upload the document Claude should compare every job posting against.
        New uploads replace the active one — older versions stay around for
        reference.
      </p>

      <CvUploader />

      {active && (
        <section className="mt-12">
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="text-lg font-medium">Active CV</h2>
            <span className="tag tag-good">in use</span>
          </div>
          <div className="panel p-6">
            <p className="font-medium">{active.filename}</p>
            <p className="text-xs text-[color:var(--fg-mute)] mb-4">
              Uploaded{" "}
              {new Date(active.created_at).toLocaleString(undefined, {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>

            {active.parsed_json ? (
              <details className="text-sm">
                <summary className="cursor-pointer text-[color:var(--fg-soft)] hover:text-[color:var(--fg)]">
                  Show parsed structure
                </summary>
                <pre className="mt-3 max-h-96 overflow-auto text-xs">
                  {JSON.stringify(active.parsed_json, null, 2)}
                </pre>
              </details>
            ) : (
              <p className="text-sm text-[color:var(--warm)]">
                Not parsed yet (Anthropic key may be missing).
              </p>
            )}

            <details className="mt-3 text-sm">
              <summary className="cursor-pointer text-[color:var(--fg-soft)] hover:text-[color:var(--fg)]">
                Show raw extracted text
              </summary>
              <pre className="mt-3 max-h-96 overflow-auto text-xs whitespace-pre-wrap">
                {active.raw_text}
              </pre>
            </details>
          </div>
        </section>
      )}

      {cvs.length > 1 && (
        <section className="mt-10">
          <h2 className="text-lg font-medium mb-3">Older uploads</h2>
          <ul className="divide-y hairline border-y hairline">
            {cvs
              .filter((c) => !c.is_active)
              .map((c) => (
                <li key={c.id} className="py-3 text-sm">
                  <span className="mono">{c.filename}</span>{" "}
                  <span className="text-[color:var(--fg-mute)]">
                    · {new Date(c.created_at).toLocaleDateString()}
                  </span>
                </li>
              ))}
          </ul>
        </section>
      )}
    </main>
  );
}
