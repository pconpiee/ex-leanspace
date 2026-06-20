import { NextResponse } from "next/server";
import { getUserOrNull } from "@/lib/auth";
import { getServerSupabase } from "@/lib/supabase-server";
import { researchCompany } from "@/lib/ai-tasks";
import { anthropicConfigured, ConfigMissingError } from "@/lib/anthropic";
import { BudgetExceededError } from "@/lib/usage";
import type { ApplicationRow } from "@/lib/db-types";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!anthropicConfigured) {
    return NextResponse.json(
      { error: "anthropic-missing" },
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

  try {
    const research = await researchCompany({
      company: application.company,
      jobTitle: application.job_title,
      jobDescription: application.job_description,
      userEmail: user.email,
    });
    const { data, error: upErr } = await supabase
      .from("applications")
      .update({ company_research: research })
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
    return NextResponse.json({ application: data });
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
        error: "research-failed",
        detail: e instanceof Error ? e.message : "unknown",
      },
      { status: 500 },
    );
  }
}
