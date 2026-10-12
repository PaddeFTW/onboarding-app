-- =============================================================================
-- Org / registry foundation — git source of truth (additive, idempotent)
-- =============================================================================
-- Purpose: Define tables and RPCs that the app already calls but that were
-- missing from previous migrations in this repo.
--
-- Safety rules for this file:
-- - CREATE TABLE IF NOT EXISTS / ADD COLUMN IF NOT EXISTS only
-- - Do NOT drop unknown legacy policies (avoids locking out live DBs that
--   still have open policies for compatibility)
-- - Does NOT migrate guided onboarding off localStorage
-- - Does NOT tighten public/open RLS on templates, guided_instances, or legacy
--   onboarding tables
--
-- After applying on live: compare columns in Table Editor with this file.
-- =============================================================================

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- organizations
-- ---------------------------------------------------------------------------
create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- organization_members
-- ---------------------------------------------------------------------------
create table if not exists public.organization_members (
  organization_id uuid not null references public.organizations (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  role text not null default 'admin'
    check (role in ('admin', 'ansvarig', 'deltagare')),
  created_at timestamptz not null default now(),
  primary key (organization_id, user_id)
);

create index if not exists organization_members_user_id_idx
  on public.organization_members (user_id);

-- ---------------------------------------------------------------------------
-- company_settings (1:1 org)
-- ---------------------------------------------------------------------------
create table if not exists public.company_settings (
  organization_id uuid primary key references public.organizations (id) on delete cascade,
  company_name text,
  org_number text,
  industry text,
  employee_count text,
  updated_at timestamptz not null default now()
);

alter table public.company_settings add column if not exists company_name text;
alter table public.company_settings add column if not exists org_number text;
alter table public.company_settings add column if not exists industry text;
alter table public.company_settings add column if not exists employee_count text;

-- ---------------------------------------------------------------------------
-- company_facts (1:1 org)
-- ---------------------------------------------------------------------------
create table if not exists public.company_facts (
  organization_id uuid primary key references public.organizations (id) on delete cascade,
  work_hours text,
  sick_contact text,
  safety_rep text,
  policies text,
  has_alarm text,
  follow_up_days integer,
  start_date date,
  start_place text,
  first_day text,
  accounts text,
  equipment text,
  updated_at timestamptz not null default now()
);

alter table public.company_facts add column if not exists work_hours text;
alter table public.company_facts add column if not exists sick_contact text;
alter table public.company_facts add column if not exists safety_rep text;
alter table public.company_facts add column if not exists policies text;
alter table public.company_facts add column if not exists has_alarm text;
alter table public.company_facts add column if not exists follow_up_days integer;
alter table public.company_facts add column if not exists start_date date;
alter table public.company_facts add column if not exists start_place text;
alter table public.company_facts add column if not exists first_day text;
alter table public.company_facts add column if not exists accounts text;
alter table public.company_facts add column if not exists equipment text;

-- ---------------------------------------------------------------------------
-- positions
-- ---------------------------------------------------------------------------
create table if not exists public.positions (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  name text not null,
  role text not null default 'Egen befattning',
  created_at timestamptz not null default now()
);

create index if not exists positions_organization_id_idx
  on public.positions (organization_id);

-- ---------------------------------------------------------------------------
-- employees
-- ---------------------------------------------------------------------------
create table if not exists public.employees (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  name text not null,
  position_id uuid references public.positions (id) on delete set null,
  can_manage boolean not null default false,
  can_mentor boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists employees_organization_id_idx
  on public.employees (organization_id);

create index if not exists employees_position_id_idx
  on public.employees (position_id);

-- ---------------------------------------------------------------------------
-- Additive columns expected by app code / future guided tenancy
-- (nullable — does not migrate or rewrite application data)
-- ---------------------------------------------------------------------------
alter table public.company_template_versions
  add column if not exists company_id uuid references public.organizations (id);

create index if not exists company_template_versions_company_id_idx
  on public.company_template_versions (company_id);

alter table public.guided_instances
  add column if not exists company_id uuid references public.organizations (id);

create index if not exists guided_instances_company_id_idx
  on public.guided_instances (company_id);

-- ---------------------------------------------------------------------------
-- is_org_member(uuid) — used by existing RLS policies in later migrations
-- ---------------------------------------------------------------------------
create or replace function public.is_org_member(p_org_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.organization_members m
    where m.organization_id = p_org_id
      and m.user_id = auth.uid()
  );
$$;

grant execute on function public.is_org_member(uuid) to authenticated;

-- ---------------------------------------------------------------------------
-- create_company(p_name, p_full_name) — used by ensureCompany()
-- Returns organization id. Creator becomes admin.
-- p_full_name is accepted for API compatibility (may be unused).
-- ---------------------------------------------------------------------------
create or replace function public.create_company(p_name text, p_full_name text default null)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid := auth.uid();
  v_org uuid;
begin
  if v_user is null then
    raise exception 'Inte inloggad';
  end if;

  select m.organization_id into v_org
  from public.organization_members m
  where m.user_id = v_user
  order by m.created_at asc
  limit 1;

  if v_org is not null then
    return v_org;
  end if;

  insert into public.organizations (name)
  values (nullif(trim(coalesce(p_name, '')), ''))
  returning id into v_org;

  insert into public.organization_members (organization_id, user_id, role)
  values (v_org, v_user, 'admin');

  insert into public.company_settings (organization_id, company_name)
  values (v_org, nullif(trim(coalesce(p_name, '')), ''))
  on conflict (organization_id) do nothing;

  insert into public.company_facts (organization_id)
  values (v_org)
  on conflict (organization_id) do nothing;

  return v_org;
end;
$$;

grant execute on function public.create_company(text, text) to authenticated;

-- ---------------------------------------------------------------------------
-- RLS: membership policies for registry (named policies only)
-- Does not drop other existing policies that may still allow broader access.
-- ---------------------------------------------------------------------------
alter table public.organizations enable row level security;
alter table public.organization_members enable row level security;
alter table public.company_settings enable row level security;
alter table public.company_facts enable row level security;
alter table public.positions enable row level security;
alter table public.employees enable row level security;

drop policy if exists "org member read organizations" on public.organizations;
create policy "org member read organizations" on public.organizations
  for select to authenticated
  using (public.is_org_member(id));

drop policy if exists "org member read members" on public.organization_members;
create policy "org member read members" on public.organization_members
  for select to authenticated
  using (public.is_org_member(organization_id));

drop policy if exists "org member read settings" on public.company_settings;
create policy "org member read settings" on public.company_settings
  for select to authenticated
  using (public.is_org_member(organization_id));

drop policy if exists "org member write settings" on public.company_settings;
create policy "org member write settings" on public.company_settings
  for insert to authenticated
  with check (public.is_org_member(organization_id));

drop policy if exists "org member update settings" on public.company_settings;
create policy "org member update settings" on public.company_settings
  for update to authenticated
  using (public.is_org_member(organization_id))
  with check (public.is_org_member(organization_id));

drop policy if exists "org member read facts" on public.company_facts;
create policy "org member read facts" on public.company_facts
  for select to authenticated
  using (public.is_org_member(organization_id));

drop policy if exists "org member write facts" on public.company_facts;
create policy "org member write facts" on public.company_facts
  for insert to authenticated
  with check (public.is_org_member(organization_id));

drop policy if exists "org member update facts" on public.company_facts;
create policy "org member update facts" on public.company_facts
  for update to authenticated
  using (public.is_org_member(organization_id))
  with check (public.is_org_member(organization_id));

drop policy if exists "org member read positions" on public.positions;
create policy "org member read positions" on public.positions
  for select to authenticated
  using (public.is_org_member(organization_id));

drop policy if exists "org member write positions" on public.positions;
create policy "org member write positions" on public.positions
  for insert to authenticated
  with check (public.is_org_member(organization_id));

drop policy if exists "org member update positions" on public.positions;
create policy "org member update positions" on public.positions
  for update to authenticated
  using (public.is_org_member(organization_id))
  with check (public.is_org_member(organization_id));

drop policy if exists "org member delete positions" on public.positions;
create policy "org member delete positions" on public.positions
  for delete to authenticated
  using (public.is_org_member(organization_id));

drop policy if exists "org member read employees" on public.employees;
create policy "org member read employees" on public.employees
  for select to authenticated
  using (public.is_org_member(organization_id));

drop policy if exists "org member write employees" on public.employees;
create policy "org member write employees" on public.employees
  for insert to authenticated
  with check (public.is_org_member(organization_id));

drop policy if exists "org member update employees" on public.employees;
create policy "org member update employees" on public.employees
  for update to authenticated
  using (public.is_org_member(organization_id))
  with check (public.is_org_member(organization_id));

drop policy if exists "org member delete employees" on public.employees;
create policy "org member delete employees" on public.employees
  for delete to authenticated
  using (public.is_org_member(organization_id));

grant select on public.organizations to authenticated;
grant select on public.organization_members to authenticated;
grant select, insert, update on public.company_settings to authenticated;
grant select, insert, update on public.company_facts to authenticated;
grant select, insert, update, delete on public.positions to authenticated;
grant select, insert, update, delete on public.employees to authenticated;
