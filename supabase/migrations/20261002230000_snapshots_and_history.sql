-- Fryst kopia och historik. Kör i Supabase SQL Editor.

create table if not exists public.onboarding_snapshots (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.organizations (id),
  guided_instance_id text not null,
  template_version_id text,
  template_label text,
  steps jsonb not null default '[]'::jsonb,
  created_by uuid references auth.users (id),
  created_at timestamptz not null default now()
);

create table if not exists public.audit_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.organizations (id),
  actor_id uuid references auth.users (id),
  event_type text not null,
  resource_type text not null,
  resource_id text not null,
  summary text not null,
  created_at timestamptz not null default now()
);

alter table public.onboarding_snapshots enable row level security;
alter table public.audit_events enable row level security;

drop policy if exists "snapshot member read" on public.onboarding_snapshots;
create policy "snapshot member read" on public.onboarding_snapshots
  for select to authenticated using (public.is_org_member(company_id));
drop policy if exists "snapshot member write" on public.onboarding_snapshots;
create policy "snapshot member write" on public.onboarding_snapshots
  for insert to authenticated with check (public.is_org_member(company_id));

drop policy if exists "audit member read" on public.audit_events;
create policy "audit member read" on public.audit_events
  for select to authenticated using (public.is_org_member(company_id));
drop policy if exists "audit member write" on public.audit_events;
create policy "audit member write" on public.audit_events
  for insert to authenticated with check (public.is_org_member(company_id));

grant select, insert on public.onboarding_snapshots to authenticated;
grant select, insert on public.audit_events to authenticated;
