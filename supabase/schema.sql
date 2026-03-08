-- ─────────────────────────────────────────────────────────────────────────────
-- Open EMDR — Supabase Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ─────────────────────────────────────────────────────────────────────────────

-- 1. Profiles table (one row per user)
create table if not exists public.profiles (
  id                        uuid references auth.users on delete cascade not null primary key,
  has_paid                  boolean default false not null,
  stripe_payment_intent_id  text,
  payment_date              timestamptz,
  created_at                timestamptz default now() not null,
  updated_at                timestamptz default now() not null
);

-- 2. Row Level Security
alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Service role (Stripe webhook) can update any profile
create policy "Service role full access"
  on public.profiles for all
  using (auth.role() = 'service_role');

-- 3. Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id)
  values (new.id)
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
