-- Ordo Crux private registration archive
-- Run this entire script in Supabase Dashboard > SQL Editor.
create extension if not exists pgcrypto;

create table if not exists public.knight_registrations (
  id uuid primary key default gen_random_uuid(),
  member_number text not null unique,
  knight_name text not null check (char_length(trim(knight_name)) >= 3 and char_length(knight_name) <= 50),
  knight_title text not null check (knight_title in ('Паж','Оруженосец','Рыцарь','Барон','Граф')),
  crest text not null check (crest in ('Лев','Крест','Ворон','Дракон')),
  oath text not null default '' check (char_length(oath) <= 600),
  drink_preferences text[] not null default '{}',
  notes text not null default '' check (char_length(notes) <= 500),
  created_at timestamptz not null default now()
);

alter table public.knight_registrations enable row level security;
alter table public.knight_registrations force row level security;

revoke all on public.knight_registrations from anon, authenticated;
grant insert on public.knight_registrations to anon, authenticated;
grant select, update, delete on public.knight_registrations to authenticated;

drop policy if exists "Public may submit registrations only" on public.knight_registrations;
create policy "Public may submit registrations only"
on public.knight_registrations for insert to anon, authenticated
with check (
  char_length(trim(knight_name)) >= 3
  and knight_title in ('Паж','Оруженосец','Рыцарь','Барон','Граф')
  and crest in ('Лев','Крест','Ворон','Дракон')
  and char_length(oath) <= 600
  and char_length(notes) <= 500
  and cardinality(drink_preferences) <= 4
);

-- Replace admin@example.com with the EXACT email you will use for administrator login.
drop policy if exists "Only owner may read registrations" on public.knight_registrations;
create policy "Only owner may read registrations"
on public.knight_registrations for select to authenticated
using ((auth.jwt() ->> 'email') = 'admin@example.com');

drop policy if exists "Only owner may update registrations" on public.knight_registrations;
create policy "Only owner may update registrations"
on public.knight_registrations for update to authenticated
using ((auth.jwt() ->> 'email') = 'admin@example.com')
with check ((auth.jwt() ->> 'email') = 'admin@example.com');

drop policy if exists "Only owner may delete registrations" on public.knight_registrations;
create policy "Only owner may delete registrations"
on public.knight_registrations for delete to authenticated
using ((auth.jwt() ->> 'email') = 'admin@example.com');

-- No public SELECT policy exists: visitors can submit, but cannot read registrations.
