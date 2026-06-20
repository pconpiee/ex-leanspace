import { NextResponse } from "next/server";
import { getUserOrNull } from "@/lib/auth";
import { getServerSupabase } from "@/lib/supabase-server";
import { analyzeFit } from "@/lib/ai-tasks";
import { anthropicConfigured, ConfigMissingError } from "@/lib/anthropic";
import { BudgetExceededError } from "@/lib/usage";
import type { ApplicationRow, CVRow } from "@/lib/db-types";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!anthropicConfigured) {
    return NextResponse.json(
      { error: "anthropic-missing", message: "Set ANTHROPIC_API_KEY in env." },
      { status: 503 },
    );
  }

  const { id } = await params;
  const user = await getUserOrNull();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const supabase = await getServerSupabase();
  if (!supabase)
    return NextResponse.json({ error: "supabase-missing" }, { status: 503 });

  const { data: app, error } = await supabase
    .from("applications")
    .select("*")
    .eq("id", id)
    .eq("user_email", user.email)
    .single();
  if (error || !app) {
    return NextResponse.json({ error: "not-found" }, { status: 404 });
  }
  const application = app as ApplicationRow;

  // Resolve the CV.
  let cv: CVRow | null = null;
  if (application.cv_id) {
    const { data } = await supabase
      .from("cvs")
      .select("*")
      .eq("id", application.cv_id)
      .single();
    cv = (data as CVRow) ?? null;
  }
  if (!cv) {
    const { data } = await supabase
      .from("cvs")
      .select("*")
      .eq("user_email", user.email)
      .eq("is_active", true)
      .maybeSingle();
    cv = (data as CVRow) ?? null;
  }
  if (!cv || !cv.parsed_json) {
    return NextResponse.json(
      {
        error: "no-parsed-cv",
        message:
          "Upload and parse a CV first (must include parsed structure — set ANTHROPIC_API_KEY then re-upload).",
      },
      { status: 400 },
    );
  }

  try {
    const fit = await analyzeFit({
      cv: cv.parsed_json,
      rawCvText: cv.raw_text,
      jobDescription: application.job_description,
      userEmail: user.email,
    });

    const { data: updated, error: upErr } = await supabase
      .from("applications")
      .update({
        fit_score: fit.fit_score,
        fit_analysis: fit,
        cv_id: cv.id,
      })
      .eq("id", application.id)
      .eq("user_email", user.email)
      .select()
      .single();
    if (upErr) {
      return NextResponse.json(
        { error: "update-failed", detail: upErr.message },
        { status: 500 },
      );
    }
    return NextResponse.json({ application: updated });
  } catch (e) {
    if (e instanceof BudgetExceededError) {
      return NextResponse.json(
        {
          error: "budget-exceeded",
          message:
            "You've used your $1 AI allowance for this tool. Ask Patrick to raise your limit.",
        },
        { status: 402 },
      );
    }
    if (e instanceof ConfigMissingError) {
      return NextResponse.json(
        { error: "anthropic-missing" },
        { status: 503 },
      );
    }
    return NextResponse.json(
      {
        error: "analyze-failed",
        detail: e instanceof Error ? e.message : "unknown",
      },
      { status: 500 },
    );
  }
}
