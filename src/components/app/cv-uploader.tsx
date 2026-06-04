"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function CvUploader() {
  const router = useRouter();
  const [mode, setMode] = useState<"file" | "paste">("file");
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setWarning(null);
    setBusy(true);
    try {
      const fd = new FormData();
      if (mode === "file" && file) {
        fd.append("file", file);
      } else if (mode === "paste" && text.trim().length > 100) {
        fd.append("text", text);
      } else {
        setError("Provide a file or paste at least a paragraph.");
        setBusy(false);
        return;
      }
      const r = await fetch("/api/cv/upload", { method: "POST", body: fd });
      const json = await r.json();
      if (!r.ok) {
        setError(json.detail || json.error || "Upload failed");
      } else {
        if (json.parse_warning) setWarning(json.parse_warning);
        router.refresh();
        setFile(null);
        setText("");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="panel p-6">
      <div className="flex gap-2 mb-4">
        <button
          type="button"
          onClick={() => setMode("file")}
          className={`btn text-xs ${mode === "file" ? "btn-primary" : ""}`}
        >
          Upload file
        </button>
        <button
          type="button"
          onClick={() => setMode("paste")}
          className={`btn text-xs ${mode === "paste" ? "btn-primary" : ""}`}
        >
          Paste text
        </button>
      </div>

      {mode === "file" ? (
        <div>
          <label className="block text-sm mb-2 text-[color:var(--fg-soft)]">
            CV file (PDF, DOCX, or plain text — max 10MB)
          </label>
          <input
            type="file"
            accept=".pdf,.docx,.doc,.txt,.md,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,text/markdown"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="block text-sm"
          />
        </div>
      ) : (
        <div>
          <label className="block text-sm mb-2 text-[color:var(--fg-soft)]">
            Paste your CV / job history as plain text
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={14}
            className="input"
            placeholder="Paste your CV text here…"
          />
        </div>
      )}

      {error && (
        <p className="mt-4 text-sm" style={{ color: "var(--warn)" }}>
          {error}
        </p>
      )}
      {warning && (
        <p className="mt-4 text-sm" style={{ color: "var(--warm)" }}>
          {warning}
        </p>
      )}

      <div className="mt-6 flex items-center gap-3">
        <button type="submit" disabled={busy} className="btn btn-primary">
          {busy ? "Uploading…" : "Upload & parse with Claude"}
        </button>
        <span className="text-xs text-[color:var(--fg-mute)]">
          Replaces your active CV. Old ones stay accessible.
        </span>
      </div>
    </form>
  );
}
