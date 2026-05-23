"use client";

import { useState } from "react";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {
          // fallback: select the previous element
        }
      }}
      className="absolute top-2 right-2 z-10 mono text-xs px-2.5 py-1 rounded-md border border-[color:var(--panel-border)] bg-[color:var(--panel)]/80 backdrop-blur hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] transition"
      aria-label="Copy prompt to clipboard"
    >
      {copied ? "copied ✓" : "copy"}
    </button>
  );
}
