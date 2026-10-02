-- Hybrid Del 3: company templates and guided onboarding snapshots.
-- Run in the Supabase SQL editor if the CLI is not linked.
-- Access matches the existing checklist: public read/write until Del 4 adds auth and company isolation.

create table if not exists public.company_template_versions (
  id text primary key,
  template_id text not null,
  company_name text not null,
  name text not null,
  version_label text not null,
  status text not null check (status in ('draft', 'published', 'archived')),
  based_on_version_id text,
  source text not null default 'system',
  steps jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  published_at timestamptz,
  archived_at timestamptz
);

create index if not exists company_template_versions_status_idx
  on public.company_template_versions (status, created_at desc);

create table if not exists public.guided_instances (
  id text primary key,
  title text not null,
  participant_name text not null,
  responsible_name text not null,
  status text not null,
  current_step_id text,
  progress integer not null default 0,
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  steps jsonb not null default '[]'::jsonb,
  template_version_id text,
  template_label text
);

create index if not exists guided_instances_started_at_idx
  on public.guided_instances (started_at desc);

alter table public.company_template_versions enable row level security;
alter table public.guided_instances enable row level security;

drop policy if exists "public template versions read" on public.company_template_versions;
create policy "public template versions read"
  on public.company_template_versions for select using (true);

drop policy if exists "public template versions insert" on public.company_template_versions;
create policy "public template versions insert"
  on public.company_template_versions for insert with check (true);

drop policy if exists "public template versions update" on public.company_template_versions;
create policy "public template versions update"
  on public.company_template_versions for update using (true) with check (true);

drop policy if exists "public guided read" on public.guided_instances;
create policy "public guided read"
  on public.guided_instances for select using (true);

drop policy if exists "public guided insert" on public.guided_instances;
create policy "public guided insert"
  on public.guided_instances for insert with check (true);

drop policy if exists "public guided update" on public.guided_instances;
create policy "public guided update"
  on public.guided_instances for update using (true) with check (true);

grant select, insert, update on public.company_template_versions to anon, authenticated;
grant select, insert, update on public.guided_instances to anon, authenticated;
