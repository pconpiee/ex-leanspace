"use client";

import { useState, useRef, useEffect } from "react";
import type { ApplicationMessageRow } from "@/lib/db-types";

export function ImproveFitChat({
  applicationId,
  initialMessages,
  starterQuestions,
}: {
  applicationId: string;
  initialMessages: ApplicationMessageRow[];
  starterQuestions: string[];
}) {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  async function send(content: string) {
    if (!content.trim() || busy) return;
    setError(null);
    setBusy(true);
    const tempUser: ApplicationMessageRow = {
      id: `temp-${Date.now()}`,
      application_id: applicationId,
      role: "user",
      content,
      created_at: new Date().toISOString(),
    };
    setMessages((m) => [...m, tempUser]);
    setInput("");
    try {
      const r = await fetch(
        `/api/applications/${applicationId}/improve-fit`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ message: content }),
        },
      );
      const json = await r.json();
      if (!r.ok) {
        setError(json.detail || json.error || "Chat failed");
      } else {
        setMessages((m) => [
          ...m,
          {
            id: `temp-a-${Date.now()}`,
            application_id: applicationId,
            role: "assistant",
            content: json.reply,
            created_at: new Date().toISOString(),
          },
        ]);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Chat failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="panel p-0 overflow-hidden flex flex-col" style={{ minHeight: 480 }}>
      <header className="px-5 py-3 border-b hairline bg-[color:var(--bg-soft)]">
        <h3 className="font-medium">Improve fit</h3>
        <p className="text-xs text-[color:var(--fg-mute)] mt-0.5">
          Claude asks one question at a time to surface skills, projects, or
          metrics that aren't on your CV yet.
        </p>
      </header>

      <div className="flex-1 overflow-auto px-5 py-4 space-y-3">
        {messages.length === 0 && starterQuestions.length > 0 && (
          <div>
            <p className="text-xs text-[color:var(--fg-mute)] mb-3">
              Suggested questions from the fit analysis. Click one to start, or
              type your own.
            </p>
            <div className="flex flex-wrap gap-2">
              {starterQuestions.map((q, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() =>
                    send(`Re: "${q.slice(0, 80)}" — let's dig into this.`)
                  }
                  className="tag tag-mute hover:tag transition text-left whitespace-normal max-w-md"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                m.role === "user"
                  ? "bg-[color:var(--accent)] text-white"
                  : "bg-[color:var(--panel)]"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}

        {busy && (
          <div className="flex justify-start">
            <div className="rounded-2xl px-4 py-2.5 text-sm bg-[color:var(--panel)] text-[color:var(--fg-mute)]">
              <span className="inline-block animate-pulse">Thinking…</span>
            </div>
          </div>
        )}

        {error && (
          <p className="text-sm" style={{ color: "var(--warn)" }}>
            {error}
          </p>
        )}

        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="border-t hairline p-3 flex gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Your reply…"
          className="input flex-1"
          disabled={busy}
        />
        <button
          type="submit"
          disabled={busy || !input.trim()}
          className="btn btn-primary"
        >
          Send
        </button>
      </form>
    </div>
  );
}
