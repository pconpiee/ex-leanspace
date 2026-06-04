"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function NewApplicationForm() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!url.trim() && text.trim().length < 100) {
      setError("Paste a job URL or the job description text (≥100 chars).");
      return;
    }
    setBusy(true);
    try {
      const r = await fetch("/api/applications", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          job_url: url.trim() || undefined,
          job_text: text.trim() || undefined,
          job_title: title.trim() || undefined,
          company: company.trim() || undefined,
          location: location.trim() || undefined,
        }),
      });
      const json = await r.json();
      if (!r.ok) {
        setError(json.message || json.detail || json.error || "Failed");
        setBusy(false);
        return;
      }
      router.push(`/app/applications/${json.application.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm mb-1 text-[color:var(--fg-soft)]">
          Job URL <span className="text-[color:var(--fg-mute)]">(optional)</span>
        </label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://jobs.example.com/role/123"
          className="input"
        />
        <p className="text-xs text-[color:var(--fg-mute)] mt-1">
          We'll try to scrape the posting. LinkedIn and other walled boards
          will fail — paste the text below as a fallback.
        </p>
      </div>

      <div>
        <label className="block text-sm mb-1 text-[color:var(--fg-soft)]">
          Job description{" "}
          <span className="text-[color:var(--fg-mute)]">
            (paste full text — required if scraping fails)
          </span>
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={10}
          className="input"
          placeholder="Paste the job description here…"
        />
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        <div>
          <label className="block text-sm mb-1 text-[color:var(--fg-soft)]">
            Job title <span className="text-[color:var(--fg-mute)]">(optional)</span>
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input"
            placeholder="Auto-detected if blank"
          />
        </div>
        <div>
          <label className="block text-sm mb-1 text-[color:var(--fg-soft)]">
            Company <span className="text-[color:var(--fg-mute)]">(optional)</span>
          </label>
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="input"
            placeholder="Auto-detected if blank"
          />
        </div>
        <div>
          <label className="block text-sm mb-1 text-[color:var(--fg-soft)]">
            Location <span className="text-[color:var(--fg-mute)]">(optional)</span>
          </label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="input"
            placeholder="Remote / Berlin / …"
          />
        </div>
      </div>

      {error && (
        <p className="text-sm" style={{ color: "var(--warn)" }}>
          {error}
        </p>
      )}

      <button type="submit" disabled={busy} className="btn btn-primary">
        {busy ? "Saving…" : "Save application"}
      </button>
    </form>
  );
}
