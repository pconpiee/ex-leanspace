-- ============================================================
-- Career app — job application tracker schema
-- Run in Supabase SQL Editor AFTER schema.sql.
-- ============================================================

-- 1. CVS — uploaded résumés / job-history docs
create table if not exists cvs (
  id              uuid primary key default gen_random_uuid(),
  user_email      text not null,
  filename        text not null,
  mime_type       text not null,
  blob_path       text not null,                    -- supabase storage object path
  raw_text        text not null,                    -- plain text extracted from file
  parsed_json     jsonb,                            -- structured: {summary, experiences, skills, …}
  is_active       boolean not null default true,    -- the one used for new analyses
  created_at      timestamptz not null default now()
);

create index if not exists cvs_user_email_idx on cvs(user_email);

-- 2. APPLICATIONS — one row per job the user is tracking
create table if not exists applications (
  id              uuid primary key default gen_random_uuid(),
  user_email      text not null,
  cv_id           uuid references cvs(id) on delete set null,
  job_url         text,
  job_title       text not null,
  company         text not null,
  location        text,
  job_description text not null,
  job_source      text not null default 'paste',    -- 'url' | 'paste'
  status          text not null default 'saved',    -- saved|applied|interview|offer|closed
  column_position int not null default 0,           -- kanban ordering within a status
  fit_score       int,                              -- 0-100
  fit_analysis    jsonb,                            -- {strengths, gaps, recommendations}
  company_research jsonb,                           -- {summary, mission, recent_news, …}
  notes           text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists applications_user_email_idx on applications(user_email);
create index if not exists applications_user_status_idx on applications(user_email, status);

drop trigger if exists applications_updated_at on applications;
create trigger applications_updated_at
  before update on applications
  for each row execute function update_updated_at();

-- 3. APPLICATION MESSAGES — improve-fit chat history per application
create table if not exists application_messages (
  id              uuid primary key default gen_random_uuid(),
  application_id  uuid not null references applications(id) on delete cascade,
  role            text not null,                    -- 'user' | 'assistant'
  content         text not null,
  created_at      timestamptz not null default now()
);

create index if not exists application_messages_application_idx
  on application_messages(application_id, created_at);

-- 4. RLS
alter table cvs enable row level security;
alter table applications enable row level security;
alter table application_messages enable row level security;

drop policy if exists "own cvs" on cvs;
create policy "own cvs" on cvs
  for all
  using (user_email = auth.email())
  with check (user_email = auth.email());

drop policy if exists "own applications" on applications;
create policy "own applications" on applications
  for all
  using (user_email = auth.email())
  with check (user_email = auth.email());

drop policy if exists "own application messages" on application_messages;
create policy "own application messages" on application_messages
  for all
  using (
    application_id in (select id from applications where user_email = auth.email())
  )
  with check (
    application_id in (select id from applications where user_email = auth.email())
  );

-- 5. STORAGE BUCKET — run in dashboard, or via SQL below.
-- create bucket 'cvs' (private). Then add a policy:
insert into storage.buckets (id, name, public)
  values ('cvs', 'cvs', false)
  on conflict (id) do nothing;

drop policy if exists "own cv files" on storage.objects;
create policy "own cv files" on storage.objects
  for all
  using (
    bucket_id = 'cvs'
    and (storage.foldername(name))[1] = auth.email()
  )
  with check (
    bucket_id = 'cvs'
    and (storage.foldername(name))[1] = auth.email()
  );
