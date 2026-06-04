// Database row types for the career-app tables.
// Mirror supabase/career-app.sql.

export type CVRow = {
  id: string;
  user_email: string;
  filename: string;
  mime_type: string;
  blob_path: string;
  raw_text: string;
  parsed_json: ParsedCV | null;
  is_active: boolean;
  created_at: string;
};

export type ParsedCV = {
  summary?: string;
  headline?: string;
  experiences?: ParsedExperience[];
  skills?: string[];
  education?: { institution: string; degree?: string; dates?: string }[];
  links?: { label: string; url: string }[];
  raw_excerpt?: string;
};

export type ParsedExperience = {
  company: string;
  role: string;
  dates?: string;
  location?: string;
  responsibilities?: string[];
  achievements?: string[];
  metrics?: string[];
};

export type AppStatus = "saved" | "applied" | "interview" | "offer" | "closed";

export type ApplicationRow = {
  id: string;
  user_email: string;
  cv_id: string | null;
  job_url: string | null;
  job_title: string;
  company: string;
  location: string | null;
  job_description: string;
  job_source: "url" | "paste";
  status: AppStatus;
  column_position: number;
  fit_score: number | null;
  fit_analysis: FitAnalysis | null;
  company_research: CompanyResearch | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type FitAnalysis = {
  fit_score: number;
  headline: string;
  strengths: { quote_from_cv: string; why_relevant: string }[];
  gaps: { job_requirement: string; where_im_weak: string; how_to_close: string }[];
  suggested_resume_edits: string[];
  cover_letter_outline: string[];
  questions_for_improve_fit: string[];
};

export type CompanyResearch = {
  summary: string;
  mission: string;
  recent_news: { title: string; detail: string }[];
  culture_signals: string[];
  what_to_emphasize: string[];
  sources: string[];
};

export type ApplicationMessageRow = {
  id: string;
  application_id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
};

export const STATUS_COLUMNS: { key: AppStatus; label: string }[] = [
  { key: "saved", label: "Saved" },
  { key: "applied", label: "Applied" },
  { key: "interview", label: "Interview" },
  { key: "offer", label: "Offer" },
  { key: "closed", label: "Closed" },
];
