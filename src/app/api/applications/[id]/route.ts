import { NextResponse } from "next/server";
import { z } from "zod";
import { getUserOrNull } from "@/lib/auth";
import { getServerSupabase } from "@/lib/supabase-server";

export const runtime = "nodejs";

const Patch = z.object({
  status: z
    .enum(["saved", "applied", "interview", "offer", "closed"])
    .optional(),
  column_position: z.number().int().optional(),
  notes: z.string().optional(),
  job_title: z.string().optional(),
  company: z.string().optional(),
});

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const user = await getUserOrNull();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const supabase = await getServerSupabase();
  if (!supabase)
    return NextResponse.json({ error: "supabase-missing" }, { status: 503 });

  let body: z.infer<typeof Patch>;
  try {
    body = Patch.parse(await request.json());
  } catch (e) {
    return NextResponse.json(
      { error: "invalid-body", detail: e instanceof Error ? e.message : "" },
      { status: 400 },
    );
  }

  const { data, error } = await supabase
    .from("applications")
    .update(body)
    .eq("id", id)
    .eq("user_email", user.email)
    .select()
    .single();
  if (error) {
    return NextResponse.json(
      { error: "update-failed", detail: error.message },
      { status: 500 },
    );
  }
  return NextResponse.json({ application: data });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const user = await getUserOrNull();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const supabase = await getServerSupabase();
  if (!supabase)
    return NextResponse.json({ error: "supabase-missing" }, { status: 503 });

  const { error } = await supabase
    .from("applications")
    .delete()
    .eq("id", id)
    .eq("user_email", user.email);
  if (error) {
    return NextResponse.json(
      { error: "delete-failed", detail: error.message },
      { status: 500 },
    );
  }
  return NextResponse.json({ ok: true });
}
