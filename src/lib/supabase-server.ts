import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

export const supabaseConfigured =
  url.startsWith("https://") && anon.length > 20;

export async function getServerSupabase() {
  if (!supabaseConfigured) return null;
  const cookieStore = await cookies();
  return createServerClient(url, anon, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(items) {
        try {
          for (const { name, value, options } of items) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // Called from a Server Component — write-ignored is fine.
        }
      },
    },
  });
}

// Admin client (bypasses RLS) — server-side only, for writes that need to
// happen during an unauthenticated context (e.g. storage uploads with a
// server-generated path). Use sparingly.
export function getAdminSupabase() {
  if (!supabaseConfigured || !serviceRole) return null;
  return createClient(url, serviceRole, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
