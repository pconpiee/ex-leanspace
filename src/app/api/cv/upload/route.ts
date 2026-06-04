import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { getServerSupabase, getAdminSupabase } from "@/lib/supabase-server";
import { getUserOrNull } from "@/lib/auth";
import { extractCVText } from "@/lib/cv-parse";
import { parseCV } from "@/lib/ai-tasks";
import { anthropicConfigured, ConfigMissingError } from "@/lib/anthropic";

export const runtime = "nodejs";
export const maxDuration = 120;

export async function POST(request: Request) {
  const user = await getUserOrNull();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const supabase = await getServerSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "supabase-missing" }, { status: 503 });
  }

  let buffer: ArrayBuffer;
  let filename: string;
  let mimeType: string;
  let pasted: string | null = null;

  const ct = request.headers.get("content-type") ?? "";
  if (ct.includes("multipart/form-data")) {
    const form = await request.formData();
    const file = form.get("file");
    const pastedText = form.get("text");
    if (file instanceof File && file.size > 0) {
      if (file.size > 10 * 1024 * 1024) {
        return NextResponse.json(
          { error: "file-too-large", limit_bytes: 10 * 1024 * 1024 },
          { status: 413 },
        );
      }
      buffer = await file.arrayBuffer();
      filename = file.name || "cv.bin";
      mimeType = file.type || "application/octet-stream";
    } else if (typeof pastedText === "string" && pastedText.trim().length > 100) {
      pasted = pastedText.trim();
      buffer = new TextEncoder().encode(pasted).buffer as ArrayBuffer;
      filename = "pasted-cv.txt";
      mimeType = "text/plain";
    } else {
      return NextResponse.json(
        { error: "no-file-or-text" },
        { status: 400 },
      );
    }
  } else {
    return NextResponse.json(
      { error: "expected-multipart" },
      { status: 400 },
    );
  }

  // 1. Extract text.
  let extracted;
  try {
    extracted = pasted
      ? { text: pasted, warnings: [] as string[] }
      : await extractCVText(buffer, mimeType, filename);
  } catch (e) {
    return NextResponse.json(
      {
        error: "extract-failed",
        detail: e instanceof Error ? e.message : "unknown",
      },
      { status: 400 },
    );
  }
  if (!extracted.text || extracted.text.length < 50) {
    return NextResponse.json(
      { error: "empty-extract", warnings: extracted.warnings },
      { status: 400 },
    );
  }

  // 2. Upload original file to storage (under user-email-prefixed folder, RLS).
  const blobPath = `${user.email}/${nanoid()}-${filename.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
  const { error: uploadErr } = await supabase.storage
    .from("cvs")
    .upload(blobPath, buffer, {
      contentType: mimeType,
      upsert: false,
    });
  if (uploadErr) {
    return NextResponse.json(
      { error: "storage-upload-failed", detail: uploadErr.message },
      { status: 500 },
    );
  }

  // 3. Run Claude to structure it (if API key set; otherwise skip).
  let parsedJson = null;
  let parseWarning: string | null = null;
  if (anthropicConfigured) {
    try {
      parsedJson = await parseCV(extracted.text);
    } catch (e) {
      if (e instanceof ConfigMissingError) {
        parseWarning = "Anthropic API key missing — saved raw text only.";
      } else {
        parseWarning =
          "Claude failed to structure the CV. Saved raw text. " +
          (e instanceof Error ? e.message : "");
      }
    }
  } else {
    parseWarning =
      "ANTHROPIC_API_KEY not set — saved raw text. Set the key and re-upload to enable fit analysis.";
  }

  // 4. Mark any existing CV inactive, then insert new one as active.
  const admin = getAdminSupabase() ?? supabase;
  await admin
    .from("cvs")
    .update({ is_active: false })
    .eq("user_email", user.email)
    .eq("is_active", true);

  const { data: row, error: insertErr } = await admin
    .from("cvs")
    .insert({
      user_email: user.email,
      filename,
      mime_type: mimeType,
      blob_path: blobPath,
      raw_text: extracted.text,
      parsed_json: parsedJson,
      is_active: true,
    })
    .select()
    .single();
  if (insertErr) {
    return NextResponse.json(
      { error: "db-insert-failed", detail: insertErr.message },
      { status: 500 },
    );
  }

  return NextResponse.json({
    cv: row,
    warnings: extracted.warnings,
    parse_warning: parseWarning,
  });
}
