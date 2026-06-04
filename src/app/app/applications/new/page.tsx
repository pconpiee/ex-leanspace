import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { getServerSupabase } from "@/lib/supabase-server";
import { NewApplicationForm } from "@/components/app/new-app-form";

export const dynamic = "force-dynamic";

export default async function NewApplicationPage() {
  const user = await requireUser();
  const supabase = await getServerSupabase();
  const { data: cv } = supabase
    ? await supabase
        .from("cvs")
        .select("id, filename")
        .eq("user_email", user.email)
        .eq("is_active", true)
        .maybeSingle()
    : { data: null };

  return (
    <main className="px-5 md:px-10 py-8 md:py-12 max-w-3xl">
      <Link
        href="/app/applications"
        className="text-xs text-[color:var(--fg-mute)] hover:text-[color:var(--fg)] mb-4 inline-block"
      >
        ← Back to board
      </Link>
      <p className="kicker mb-2">New application</p>
      <h1 className="text-3xl font-medium mb-2">Add a job</h1>
      <p className="lede mb-8">
        Paste a job URL, the description text, or both. Claude will fill in
        the title/company/location and you'll be able to run fit analysis on
        the next page.
      </p>

      {cv ? (
        <p className="text-xs text-[color:var(--fg-mute)] mb-6">
          Will be analysed against{" "}
          <span className="mono text-[color:var(--fg-soft)]">{cv.filename}</span>.
        </p>
      ) : (
        <div className="panel p-4 mb-6 text-sm">
          You haven't uploaded a CV yet — fit analysis won't work until you do.{" "}
          <Link href="/app/cv" className="link">
            Upload a CV →
          </Link>
        </div>
      )}

      <NewApplicationForm />
    </main>
  );
}
