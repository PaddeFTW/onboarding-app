-- IMPL-002: is_org_member + membership RLS for guided_instances only.
-- Staging first. Does not alter other tables or app code.
-- Assumes company_id already exists on guided_instances (AUDIT-003).

-- ---------------------------------------------------------------------------
-- Function used by membership policies (same signature as foundation migration)
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
-- guided_instances: replace open policies with membership checks
-- ---------------------------------------------------------------------------
alter table public.guided_instances enable row level security;

drop policy if exists "public guided read" on public.guided_instances;
drop policy if exists "public guided insert" on public.guided_instances;
drop policy if exists "public guided update" on public.guided_instances;

drop policy if exists "guided member read" on public.guided_instances;
create policy "guided member read" on public.guided_instances
  for select to authenticated
  using (
    company_id is not null
    and public.is_org_member(company_id)
  );

drop policy if exists "guided member insert" on public.guided_instances;
create policy "guided member insert" on public.guided_instances
  for insert to authenticated
  with check (
    company_id is not null
    and public.is_org_member(company_id)
  );

drop policy if exists "guided member update" on public.guided_instances;
create policy "guided member update" on public.guided_instances
  for update to authenticated
  using (
    company_id is not null
    and public.is_org_member(company_id)
  )
  with check (
    company_id is not null
    and public.is_org_member(company_id)
  );

revoke all on table public.guided_instances from anon;
grant select, insert, update on public.guided_instances to authenticated;
