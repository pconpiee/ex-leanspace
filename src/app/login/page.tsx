"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { createBrowserClient } from "@supabase/ssr";
import { supabaseConfigured } from "@/lib/supabase";

function LoginContent() {
  const sp = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (sp.get("denied")) {
      setError(
        "You signed in successfully, but your email isn't on the access list. " +
          "Contact the site owner.",
      );
    } else if (sp.get("missing") === "config") {
      setError(
        "Supabase isn't configured on the server. " +
          "Set NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel.",
      );
    } else if (sp.get("error")) {
      setError(`Sign-in failed: ${sp.get("error")}`);
    }
  }, [sp]);

  async function signIn() {
    if (!supabaseConfigured) {
      setError("Supabase config missing.");
      return;
    }
    setLoading(true);
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabase = createBrowserClient(url, key);
    const { error: err } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/app`,
      },
    });
    if (err) {
      setError(err.message);
      setLoading(false);
    }
    // On success the browser is redirected to Google → /auth/callback → /app.
  }

  return (
    <>
      {error && (
        <div className="panel p-4 mb-6 text-sm" style={{ borderColor: "var(--warn)" }}>
          {error}
        </div>
      )}

      <button
        type="button"
        onClick={signIn}
        disabled={loading || !supabaseConfigured}
        className="btn btn-primary w-full justify-center"
      >
        {loading ? "Redirecting…" : "Continue with Google"}
      </button>
    </>
  );
}

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md px-5 py-20">
      <p className="kicker mb-3">Sign in</p>
      <h1 className="text-3xl font-medium mb-4">Career app</h1>
      <p className="lede mb-8">
        Private workspace to track job applications, score fit, and improve
        your CV against specific roles.
      </p>

      <Suspense
        fallback={
          <button disabled className="btn btn-primary w-full justify-center">
            Loading…
          </button>
        }
      >
        <LoginContent />
      </Suspense>

      <p className="text-xs text-[color:var(--fg-mute)] mt-6">
        Access is restricted to allowlisted emails. If you're not on the list,
        you'll be turned away after sign-in.
      </p>

      <div className="mt-12 text-sm">
        <Link href="/" className="link">
          ← Back to the public site
        </Link>
      </div>
    </div>
  );
}
