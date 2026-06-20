import { NextResponse } from "next/server";
import { z } from "zod";
import { getUserOrNull } from "@/lib/auth";
import { getServerSupabase } from "@/lib/supabase-server";
import { improveFitTurn, type ChatTurn } from "@/lib/ai-tasks";
import { anthropicConfigured, ConfigMissingError } from "@/lib/anthropic";
import { BudgetExceededError } from "@/lib/usage";
import type {
  ApplicationMessageRow,
  ApplicationRow,
  CVRow,
} from "@/lib/db-types";

export const runtime = "nodejs";
export const maxDuration = 60;

const Body = z.object({ message: z.string().min(1) });

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!anthropicConfigured) {
    return NextResponse.json({ error: "anthropic-missing" }, { status: 503 });
  }

  const { id } = await params;
  const user = await getUserOrNull();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const supabase = await getServerSupabase();
  if (!supabase)
    return NextResponse.json({ error: "supabase-missing" }, { status: 503 });

  let body: z.infer<typeof Body>;
  try {
    body = Body.parse(await request.json());
  } catch (e) {
    return NextResponse.json(
      { error: "invalid-body", detail: e instanceof Error ? e.message : "" },
      { status: 400 },
    );
  }

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
      { error: "no-parsed-cv" },
      { status: 400 },
    );
  }

  // Load chat history.
  const { data: msgs } = await supabase
    .from("application_messages")
    .select("*")
    .eq("application_id", application.id)
    .order("created_at", { ascending: true });
  const history: ChatTurn[] = ((msgs ?? []) as ApplicationMessageRow[]).map(
    (m) => ({ role: m.role, content: m.content }),
  );
  history.push({ role: "user", content: body.message });

  try {
    const reply = await improveFitTurn({
      cv: cv.parsed_json,
      rawCvText: cv.raw_text,
      jobDescription: application.job_description,
      fitAnalysis: application.fit_analysis,
      history,
      userEmail: user.email,
    });

    // Persist both turns.
    await supabase.from("application_messages").insert([
      {
        application_id: application.id,
        role: "user",
        content: body.message,
      },
      {
        application_id: application.id,
        role: "assistant",
        content: reply,
      },
    ]);

    return NextResponse.json({ reply });
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
        error: "chat-failed",
        detail: e instanceof Error ? e.message : "unknown",
      },
      { status: 500 },
    );
  }
}
