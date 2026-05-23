-- ============================================================
-- ex-leanspace.vercel.app  |  Supabase schema
-- Run this in the Supabase SQL editor (Dashboard → SQL Editor)
-- ============================================================

-- 1. ALUMNI TABLE
create table if not exists alumni (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  linkedin      text,
  leanspace_role text not null,
  domain        text not null,  -- 'Product' | 'Engineering' | 'BD & Sales' | 'Solutions' | 'Marketing' | 'Ops & Leadership'
  tenure        text,
  current_role  text,
  current_company text,
  sector        text,
  location      text,
  status        text not null default 'unknown', -- 'employed' | 'freelance' | 'searching' | 'unknown'
  claimed_by    text,           -- email of authenticated owner
  added_by      text,           -- email of person who submitted this entry
  approved      boolean not null default true,
  removed       boolean not null default false,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- 2. JOB POSTINGS TABLE
create table if not exists job_postings (
  id          uuid primary key default gen_random_uuid(),
  company     text not null,
  role        text not null,
  url         text,
  description text,
  sector      text,
  posted_by   text,
  active      boolean not null default true,
  created_at  timestamptz not null default now()
);

-- 3. UPDATED_AT TRIGGER
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists alumni_updated_at on alumni;
create trigger alumni_updated_at
  before update on alumni
  for each row execute function update_updated_at();

-- 4. ENABLE RLS
alter table alumni enable row level security;
alter table job_postings enable row level security;

-- 5. RLS POLICIES — ALUMNI

-- Anyone can read visible (approved, not removed) alumni
create policy "public_read_alumni"
  on alumni for select
  using (approved = true and removed = false);

-- Authenticated users can insert new alumni
create policy "auth_insert_alumni"
  on alumni for insert
  with check (auth.email() is not null);

-- Users can update only their own claimed profile
create policy "auth_update_own_alumni"
  on alumni for update
  using (claimed_by = auth.email());

-- 6. RLS POLICIES — JOB POSTINGS

-- Anyone can read active job postings
create policy "public_read_jobs"
  on job_postings for select
  using (active = true);

-- Authenticated users can insert job postings
create policy "auth_insert_jobs"
  on job_postings for insert
  with check (auth.email() is not null);

-- Users can deactivate their own postings
create policy "auth_update_own_jobs"
  on job_postings for update
  using (posted_by = auth.email());


-- ============================================================
-- SEED DATA  (run once — all existing static alumni)
-- ============================================================

insert into alumni (name, linkedin, leanspace_role, domain, tenure, current_role, current_company, sector, location, status) values
  ('Patrick Connolly', 'https://www.linkedin.com/in/j-patrick-connolly/', 'PM / Solutions Architect / BDM', 'Product', '2022–2025', 'Director & Faculty', 'International Space University', 'Higher Ed / Space', 'Strasbourg, France', 'employed'),
  ('Kateryna Dvornichenko', 'https://linkedin.com/in/katerynadvornichenko', 'PM — Mission Planning & Flight Dynamics', 'Product', 'Jun 2022 – Oct 2025', 'Product Manager', 'Upsun (formerly Platform.sh)', 'Cloud PaaS', 'Paris, France', 'employed'),
  ('Stuart Gill', 'https://linkedin.com/in/stuartajgill', 'PM — MCS & AIT', 'Product', 'Jan 2021 – Dec 2024', 'Senior Product Manager', 'Constellr', 'Earth Observation / NewSpace', 'France', 'employed'),
  ('Travis Hodson', 'https://linkedin.com/in/travishodson', 'PM — Cloud Infrastructure & Security', 'Product', 'Mar 2024 – Mar 2025', null, null, 'SaaS / Satellite', 'Pittsburgh, PA, USA', 'searching'),
  ('Roberto Travaglini', 'https://linkedin.com/in/roberto-travaglini-347a29b7', 'PM — Mission Control Systems', 'Product', 'Jul 2023 – Mar 2025', 'Ground Systems Engineer', 'D-Orbit', 'In-Orbit Services', 'Como, Italy', 'employed'),
  ('Marion Pigassou', 'https://linkedin.com/in/marion-pigassou', 'Domain Analyst → SA — Launchers & AIT', 'Product', 'Aug 2022 – Dec 2024', 'Mission Operations Engineer', 'Open Cosmos', 'Small Sat Operations', 'Athens, Greece', 'employed'),
  ('Chloé Grimmer', 'https://linkedin.com/in/chloe-grimmer', 'Project Manager', 'Product', 'Jan 2023 – Jul 2024', 'Freelance Manager de Transition / PMO', null, 'Consulting', 'Strasbourg, France', 'freelance'),
  ('Peter Healy', 'https://linkedin.com/in/peter-healy-7434b816b', 'Sales Engineer → BDM', 'BD & Sales', 'Nov 2022 – Jun 2025', 'Air quality (undisclosed)', null, 'CleanTech', 'Cork, Ireland', 'employed'),
  ('Jay Gaillard', 'https://linkedin.com/in/geraudworld', 'Projects Director', 'BD & Sales', 'Feb 2023 – Dec 2024', 'Assistant Professor of Practice — Space Policy & Innovation', 'International Space University', 'Higher Ed / Space', 'Strasbourg, France', 'employed'),
  ('Andrei Maklakoff', 'https://linkedin.com/in/andremaklakov', 'Account Exec → Customer Ops Mgr → Senior Account & Growth Mgr', 'BD & Sales', 'Aug 2022 – 2026', null, null, null, 'Strasbourg, France', 'unknown'),
  ('Eser Gül', 'https://linkedin.com/in/emirhan-eser-g%C3%BCl-326a24159', 'Flight Dynamics Specialist & Software Developer', 'Solutions', 'Oct 2022 – Jun 2025', 'Mission Operations Software Engineer', 'Constellr', 'Earth Observation / NewSpace', 'Strasbourg, France', 'employed'),
  ('Andrea Rodriguez', 'https://linkedin.com/in/andrea-rodriguez-2ba49117b', 'DevOps Engineer', 'Engineering', 'Mar 2022 – Aug 2024', 'Site Reliability Engineer II (Security)', 'Criteo', 'AdTech / Cloud', 'Paris, France', 'employed'),
  ('Jaikant Dangi', 'https://linkedin.com/in/jaikant-dangi', 'Senior QA Automation Engineer', 'Engineering', 'Dec 2020 – Dec 2022', 'Senior SDET Consultant', 'Freelance', 'QA / Automation', 'Gurugram, India', 'freelance'),
  ('Cyrin Makhbouch', 'https://linkedin.com/in/cyrine-makhbouche-721985144', 'QA Automation Engineer', 'Engineering', 'Aug 2024 – 2026', null, null, null, 'France', 'unknown'),
  ('Inderpal Singh', 'https://linkedin.com/in/inderpal-singh-puar', 'Marketing Lead', 'Marketing', '2021 – 2024', 'Marketing Strategist', 'Freelance', 'Tech Marketing', 'Darmstadt, Germany', 'freelance'),
  ('Goda Šiugždinytė', 'https://linkedin.com/in/goda-siugzdinyte-0099b313b', 'Marketing Communications Specialist', 'Marketing', 'Jan 2022 – Mar 2023', 'Marketing Manager', 'Wolt', 'Consumer Tech', 'Vilnius, Lithuania', 'employed'),
  ('Justine Engel', 'https://linkedin.com/in/justine-engel', 'Executive Assistant', 'Ops & Leadership', 'Sep 2021 – Jul 2025', 'Chief of Staff', 'International Space University', 'Higher Ed / Space', 'Strasbourg, France', 'employed'),
  ('Alistair Gray', 'https://linkedin.com/in/grayalistair', 'Technical Writer → AI Implementation Lead', 'Ops & Leadership', 'Sep 2022 – Jul 2025', 'AI Change Manager & Guest Lecturer', 'ISU / Freelance', 'AI Consulting / Higher Ed', 'Strasbourg, France', 'freelance')
on conflict do nothing;
