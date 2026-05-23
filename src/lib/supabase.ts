import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabaseConfigured =
  url.startsWith("https://") && key.length > 20;

export const supabase = supabaseConfigured
  ? createClient(url, key, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;

export type DB_Alumnus = {
  id: string;
  name: string;
  linkedin: string | null;
  leanspace_role: string;
  domain: string;
  tenure: string | null;
  current_role: string | null;
  current_company: string | null;
  sector: string | null;
  location: string | null;
  status: "employed" | "freelance" | "searching" | "unknown";
  claimed_by: string | null;
  added_by: string | null;
  approved: boolean;
  removed: boolean;
  created_at: string;
};

export type DB_JobPosting = {
  id: string;
  company: string;
  role: string;
  url: string | null;
  description: string | null;
  sector: string | null;
  posted_by: string | null;
  active: boolean;
  created_at: string;
};
