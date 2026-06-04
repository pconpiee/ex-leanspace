import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { getServerSupabase } from "@/lib/supabase-server";
import type { ApplicationRow } from "@/lib/db-types";
import { Kanban } from "@/components/app/kanban";

export const dynamic = "force-dynamic";

export default async function ApplicationsPage() {
  const user = await requireUser();
  const supabase = await getServerSupabase();
  const { data } = supabase
    ? await supabase
        .from("applications")
        .select("*")
        .eq("user_email", user.email)
        .order("column_position", { ascending: true })
    : { data: [] };
  const apps = (data ?? []) as ApplicationRow[];

  return (
    <main className="px-5 md:px-10 py-8 md:py-12">
      <div className="flex items-baseline justify-between mb-6 gap-4 flex-wrap">
        <div>
          <p className="kicker mb-2">Applications</p>
          <h1 className="text-3xl font-medium">Pipeline</h1>
        </div>
        <Link href="/app/applications/new" className="btn btn-primary">
          + New application
        </Link>
      </div>

      {apps.length === 0 ? (
        <div className="panel p-8 text-center">
          <p className="lede mb-4">No applications yet.</p>
          <Link href="/app/applications/new" className="btn btn-primary">
            Add your first one →
          </Link>
        </div>
      ) : (
        <Kanban initial={apps} />
      )}
    </main>
  );
}
