-- ImagoParturi — Supabase schema
-- Run this in the Supabase SQL Editor when you go live.

create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  service text not null,
  service_name text not null,
  date date not null,
  time text not null,
  notes text default '',
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'cancelled')),
  created_at timestamptz not null default now()
);

create index if not exists reservations_date_idx
  on public.reservations (date, time);

-- Row Level Security: lock the table down. The app talks to it with
-- the SERVICE ROLE key (server-side only), which bypasses RLS, so no
-- public policies are needed. This prevents the anon/public key from
-- ever reading or writing reservations from the browser.
alter table public.reservations enable row level security;
