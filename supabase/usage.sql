-- ============================================================
-- Per-user AI usage metering — enforces a per-person spend cap.
-- Run in Supabase SQL Editor AFTER schema.sql and career-app.sql.
-- ============================================================

-- Lifetime AI spend per user, in USD.
create table if not exists user_usage (
  user_email     text primary key,
  total_cost_usd double precision not null default 0,
  updated_at     timestamptz not null default now()
);

-- Server-only ledger: RLS on, NO public policies. Only the service-role key
-- (which bypasses RLS) reads/writes it, so users can't see or tamper with spend.
alter table user_usage enable row level security;

-- Atomic increment (upsert + add). Called server-side with the service role
-- after every model call. Clamps negatives to 0 defensively.
create or replace function add_usage(p_email text, p_cost double precision)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into user_usage (user_email, total_cost_usd, updated_at)
    values (p_email, greatest(p_cost, 0), now())
  on conflict (user_email) do update
    set total_cost_usd = user_usage.total_cost_usd + greatest(p_cost, 0),
        updated_at = now();
end;
$$;

-- To reset one person's allowance later:
--   update user_usage set total_cost_usd = 0 where user_email = 'someone@gmail.com';
-- To see who's spent what:
--   select user_email, round(total_cost_usd::numeric, 4) as usd, updated_at
--     from user_usage order by total_cost_usd desc;
