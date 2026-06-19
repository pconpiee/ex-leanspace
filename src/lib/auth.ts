import { redirect } from "next/navigation";
import { getServerSupabase } from "./supabase-server";

function allowedEmails(): Set<string> {
  const raw = process.env.ALLOWED_EMAILS ?? process.env.ALLOWED_EMAIL ?? "";
  return new Set(
    raw
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean),
  );
}

export function isAllowed(email: string | null | undefined): boolean {
  const set = allowedEmails();
  // Open mode: ALLOWED_EMAILS="*" lets any signed-in Google account in —
  // each user still gets their own private, isolated workspace (RLS by email).
  if (set.has("*")) return !!email;
  if (set.size === 0) return false;
  return !!email && set.has(email.toLowerCase());
}

export type AuthedUser = {
  email: string;
  id: string;
};

// For server components / route handlers — redirects to /login if not signed
// in, or to /login?denied=1 if signed in but not in allowlist.
export async function requireUser(): Promise<AuthedUser> {
  const supabase = await getServerSupabase();
  if (!supabase) redirect("/login?missing=config");

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.email) redirect("/login");
  if (!isAllowed(user.email)) redirect("/login?denied=1");

  return { email: user.email, id: user.id };
}

// Same as requireUser but returns null instead of redirecting — for API routes
// that want to return a JSON error.
export async function getUserOrNull(): Promise<AuthedUser | null> {
  const supabase = await getServerSupabase();
  if (!supabase) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.email) return null;
  if (!isAllowed(user.email)) return null;

  return { email: user.email, id: user.id };
}
