"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { AppStatus } from "@/lib/db-types";
import { STATUS_COLUMNS } from "@/lib/db-types";

// Tolerate non-JSON error bodies (e.g. a gateway 504 returns an HTML page,
// which would otherwise throw a SyntaxError and swallow the failure).
async function readJson(r: Response): Promise<Record<string, string> | null> {
  try {
    return await r.json();
  } catch {
    return null;
  }
}

type Props = {
  applicationId: string;
  status: AppStatus;
  hasFitAnalysis: boolean;
  hasResearch: boolean;
};

export function AppActions({
  applicationId,
  status,
  hasFitAnalysis,
  hasResearch,
}: Props) {
  const router = useRouter();
  const [analyzing, setAnalyzing] = useState(false);
  const [researching, setResearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function runAnalyze() {
    setError(null);
    setAnalyzing(true);
    try {
      const r = await fetch(`/api/applications/${applicationId}/analyze`, {
        method: "POST",
      });
      const json = await readJson(r);
      if (!r.ok)
        setError(
          json?.message ||
            json?.detail ||
            json?.error ||
            `Request failed (${r.status}). The analysis may have timed out — try again.`,
        );
      else router.refresh();
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Network error — please try again.",
      );
    } finally {
      setAnalyzing(false);
    }
  }

  async function runResearch() {
    setError(null);
    setResearching(true);
    try {
      const r = await fetch(`/api/applications/${applicationId}/research`, {
        method: "POST",
      });
      const json = await readJson(r);
      if (!r.ok)
        setError(
          json?.message ||
            json?.detail ||
            json?.error ||
            `Request failed (${r.status}). The research may have timed out — try again.`,
        );
      else router.refresh();
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Network error — please try again.",
      );
    } finally {
      setResearching(false);
    }
  }

  async function changeStatus(next: AppStatus) {
    await fetch(`/api/applications/${applicationId}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    router.refresh();
  }

  async function remove() {
    if (!confirm("Delete this application?")) return;
    await fetch(`/api/applications/${applicationId}`, { method: "DELETE" });
    router.push("/app/applications");
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={runAnalyze}
          disabled={analyzing}
          className="btn btn-primary text-sm"
        >
          {analyzing
            ? "Analysing…"
            : hasFitAnalysis
              ? "Re-run fit analysis"
              : "Run fit analysis"}
        </button>
        <button
          type="button"
          onClick={runResearch}
          disabled={researching}
          className="btn text-sm"
        >
          {researching
            ? "Researching…"
            : hasResearch
              ? "Refresh company research"
              : "Research company"}
        </button>
      </div>

      <div className="flex items-center gap-2 text-sm">
        <label className="text-[color:var(--fg-mute)] text-xs">Status</label>
        <select
          value={status}
          onChange={(e) => changeStatus(e.target.value as AppStatus)}
          className="input"
          style={{ width: "auto" }}
        >
          {STATUS_COLUMNS.map((c) => (
            <option key={c.key} value={c.key}>
              {c.label}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={remove}
          className="text-xs text-[color:var(--fg-mute)] hover:text-[color:var(--warn)] ml-auto underline"
        >
          Delete
        </button>
      </div>

      {error && (
        <p className="text-sm" style={{ color: "var(--warn)" }}>
          {error}
        </p>
      )}
    </div>
  );
}
