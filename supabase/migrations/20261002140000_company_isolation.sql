-- Del 4: företag och isolering. Kör i Supabase SQL Editor.
-- Checklistan lämnas öppen. Mallar och guidningar kräver medlemskap.

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique,
  created_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  email text
);

create table if not exists public.organization_members (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  role text not null default 'admin',
  unique (organization_id, user_id)
);

alter table public.company_template_versions
  add column if not exists company_id uuid references public.organizations (id);

alter table public.guided_instances
  add column if not exists company_id uuid references public.organizations (id);

create or replace function public.is_org_member(target uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.organization_members
    where organization_id = target and user_id = auth.uid()
  );
$$;

create or replace function public.create_company(p_name text, p_full_name text default '')
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid := auth.uid();
  v_org_id uuid;
  v_slug text;
begin
  if v_user is null then
    raise exception 'Inte inloggad';
  end if;

  insert into public.profiles (id, full_name)
  values (v_user, coalesce(p_full_name, ''))
  on conflict (id) do update
    set full_name = coalesce(nullif(public.profiles.full_name, ''), excluded.full_name);

  select organization_id into v_org_id
  from public.organization_members
  where user_id = v_user
  limit 1;
  if v_org_id is not null then
    return v_org_id;
  end if;

  v_slug := left(regexp_replace(lower(p_name), '[^a-z0-9]+', '-', 'g'), 40) || '-' || substr(v_user::text, 1, 8);
  insert into public.organizations (name, slug)
  values (p_name, v_slug)
  returning id into v_org_id;

  insert into public.organization_members (organization_id, user_id, role)
  values (v_org_id, v_user, 'admin');

  return v_org_id;
end;
$$;

grant execute on function public.create_company(text, text) to authenticated;
grant execute on function public.is_org_member(uuid) to authenticated;
grant select, insert, update on public.organizations to authenticated;
grant select, insert, update on public.profiles to authenticated;
grant select, insert, update on public.organization_members to authenticated;

alter table public.organizations enable row level security;
alter table public.profiles enable row level security;
alter table public.organization_members enable row level security;

drop policy if exists "org read member" on public.organizations;
create policy "org read member" on public.organizations
  for select to authenticated using (public.is_org_member(id));

drop policy if exists "profile self" on public.profiles;
create policy "profile self" on public.profiles
  for all to authenticated using (id = auth.uid()) with check (id = auth.uid());

drop policy if exists "member read" on public.organization_members;
create policy "member read" on public.organization_members
  for select to authenticated using (user_id = auth.uid() or public.is_org_member(organization_id));

drop policy if exists "public template versions read" on public.company_template_versions;
drop policy if exists "public template versions insert" on public.company_template_versions;
drop policy if exists "public template versions update" on public.company_template_versions;
create policy "template member read" on public.company_template_versions
  for select to authenticated using (public.is_org_member(company_id));
create policy "template member write" on public.company_template_versions
  for insert to authenticated with check (public.is_org_member(company_id));
create policy "template member update" on public.company_template_versions
  for update to authenticated using (public.is_org_member(company_id)) with check (public.is_org_member(company_id));

drop policy if exists "public guided read" on public.guided_instances;
drop policy if exists "public guided insert" on public.guided_instances;
drop policy if exists "public guided update" on public.guided_instances;
create policy "guided member read" on public.guided_instances
  for select to authenticated using (public.is_org_member(company_id));
create policy "guided member write" on public.guided_instances
  for insert to authenticated with check (public.is_org_member(company_id));
create policy "guided member update" on public.guided_instances
  for update to authenticated using (public.is_org_member(company_id)) with check (public.is_org_member(company_id));

notify pgrst, 'reload schema';
