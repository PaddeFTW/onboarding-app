-- Roller och inbjudan. Kör i Supabase SQL Editor.

create table if not exists public.company_invites (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  email text not null,
  role text not null check (role in ('admin', 'ansvarig', 'deltagare')),
  invited_by uuid references auth.users (id),
  created_at timestamptz not null default now(),
  accepted_at timestamptz,
  unique (organization_id, email)
);

alter table public.company_invites enable row level security;

drop policy if exists "invite admin read" on public.company_invites;
create policy "invite admin read" on public.company_invites
  for select to authenticated using (public.is_org_member(organization_id));

drop policy if exists "invite admin write" on public.company_invites;
create policy "invite admin write" on public.company_invites
  for insert to authenticated with check (public.is_org_member(organization_id));

grant select, insert on public.company_invites to authenticated;

create or replace function public.accept_company_invite()
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid := auth.uid();
  v_email text;
  v_invite public.company_invites%rowtype;
begin
  if v_user is null then
    raise exception 'Inte inloggad';
  end if;
  select email into v_email from auth.users where id = v_user;
  select * into v_invite
  from public.company_invites
  where lower(email) = lower(v_email) and accepted_at is null
  order by created_at desc
  limit 1;
  if v_invite.id is null then
    return null;
  end if;
  insert into public.organization_members (organization_id, user_id, role)
  values (v_invite.organization_id, v_user, v_invite.role)
  on conflict (organization_id, user_id) do nothing;
  update public.company_invites set accepted_at = now() where id = v_invite.id;
  return v_invite.organization_id;
end;
$$;

grant execute on function public.accept_company_invite() to authenticated;
