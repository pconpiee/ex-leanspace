import { NextResponse } from "next/server";
import { z } from "zod";
import { getUserOrNull } from "@/lib/auth";
import { getServerSupabase } from "@/lib/supabase-server";
import { fetchJobFromURL } from "@/lib/job-fetch";
import { extractJobMeta } from "@/lib/ai-tasks";
import { anthropicConfigured } from "@/lib/anthropic";

export const runtime = "nodejs";
export const maxDuration = 60;

const Body = z.object({
  job_url: z.string().url().optional(),
  job_text: z.string().optional(),
  job_title: z.string().optional(),
  company: z.string().optional(),
  location: z.string().optional(),
  cv_id: z.string().uuid().optional(),
});

export async function POST(request: Request) {
  const user = await getUserOrNull();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const supabase = await getServerSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "supabase-missing" }, { status: 503 });
  }

  let body: z.infer<typeof Body>;
  try {
    body = Body.parse(await request.json());
  } catch (e) {
    return NextResponse.json(
      { error: "invalid-body", detail: e instanceof Error ? e.message : "" },
      { status: 400 },
    );
  }

  let description = body.job_text?.trim() ?? "";
  let source: "url" | "paste" = "paste";
  let fallbackReason: string | null = null;

  if (!description && body.job_url) {
    const fetched = await fetchJobFromURL(body.job_url);
    if (fetched.ok) {
      description = fetched.text;
      source = "url";
    } else {
      fallbackReason = fetched.fallbackReason ?? "fetch-failed";
    }
  } else if (description && body.job_url) {
    source = "url";
  }

  if (!description || description.length < 100) {
    return NextResponse.json(
      {
        error: "need-job-text",
        fallback_reason: fallbackReason,
        message:
          "Couldn't fetch enough text from that URL. Paste the job description into the text box instead.",
      },
      { status: 400 },
    );
  }

  // Optional Claude pass to extract job_title/company/location if not given.
  let title = body.job_title?.trim() || "";
  let company = body.company?.trim() || "";
  let location = body.location?.trim() || "";

  if (anthropicConfigured && (!title || !company)) {
    try {
      const meta = await extractJobMeta(description);
      if (!title) title = meta.job_title;
      if (!company) company = meta.company;
      if (!location && meta.location) location = meta.location;
    } catch {
      // fall through — user will fix manually
    }
  }
  if (!title) title = "Untitled role";
  if (!company) company = "Unknown company";

  // Pick the active CV (or the explicit one) to attach.
  let cvId = body.cv_id ?? null;
  if (!cvId) {
    const { data: cv } = await supabase
      .from("cvs")
      .select("id")
      .eq("user_email", user.email)
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (cv) cvId = cv.id;
  }

  // Position at top of the 'saved' column.
  const { data: max } = await supabase
    .from("applications")
    .select("column_position")
    .eq("user_email", user.email)
    .eq("status", "saved")
    .order("column_position", { ascending: false })
    .limit(1)
    .maybeSingle();
  const position = (max?.column_position ?? -1) + 1;

  const { data: row, error } = await supabase
    .from("applications")
    .insert({
      user_email: user.email,
      cv_id: cvId,
      job_url: body.job_url ?? null,
      job_title: title,
      company,
      location: location || null,
      job_description: description.slice(0, 80_000),
      job_source: source,
      status: "saved",
      column_position: position,
    })
    .select()
    .single();
  if (error) {
    return NextResponse.json(
      { error: "insert-failed", detail: error.message },
      { status: 500 },
    );
  }

  return NextResponse.json({
    application: row,
    fallback_reason: fallbackReason,
  });
}
