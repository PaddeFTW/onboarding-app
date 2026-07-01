create extension if not exists pgcrypto;

create table if not exists public.onboarding (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  position text not null,
  manager text not null,
  start_date date not null,
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

create table if not exists public.checklist_items (
  id uuid primary key default gen_random_uuid(),
  onboarding_id uuid not null references public.onboarding(id) on delete cascade,
  template_key text not null,
  sort_order integer not null,
  title text not null,
  description text not null,
  info text not null,
  documents jsonb not null default '[]'::jsonb,
  comment text,
  detail_data jsonb not null default '{}'::jsonb,
  completed_at timestamptz
);

create index if not exists checklist_items_onboarding_id_idx
  on public.checklist_items (onboarding_id);

create index if not exists checklist_items_onboarding_sort_order_idx
  on public.checklist_items (onboarding_id, sort_order);

create unique index if not exists checklist_items_onboarding_template_key_idx
  on public.checklist_items (onboarding_id, template_key);

alter table public.onboarding enable row level security;
alter table public.checklist_items enable row level security;

drop policy if exists "public onboarding read" on public.onboarding;
create policy "public onboarding read"
  on public.onboarding
  for select
  using (true);

drop policy if exists "public onboarding insert" on public.onboarding;
create policy "public onboarding insert"
  on public.onboarding
  for insert
  with check (true);

drop policy if exists "public onboarding update" on public.onboarding;
create policy "public onboarding update"
  on public.onboarding
  for update
  using (true)
  with check (true);

drop policy if exists "public checklist read" on public.checklist_items;
create policy "public checklist read"
  on public.checklist_items
  for select
  using (true);

drop policy if exists "public checklist insert" on public.checklist_items;
create policy "public checklist insert"
  on public.checklist_items
  for insert
  with check (true);

drop policy if exists "public checklist update" on public.checklist_items;
create policy "public checklist update"
  on public.checklist_items
  for update
  using (true)
  with check (true);
