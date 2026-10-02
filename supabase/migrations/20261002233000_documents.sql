-- Dokument på moment. Kör i Supabase SQL Editor.

create table if not exists public.onboarding_documents (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.organizations (id),
  guided_instance_id text not null,
  step_id text not null,
  title text not null,
  storage_path text not null,
  mime_type text,
  created_by uuid references auth.users (id),
  created_at timestamptz not null default now()
);

alter table public.onboarding_documents enable row level security;

drop policy if exists "document member read" on public.onboarding_documents;
create policy "document member read" on public.onboarding_documents
  for select to authenticated using (public.is_org_member(company_id));
drop policy if exists "document member write" on public.onboarding_documents;
create policy "document member write" on public.onboarding_documents
  for insert to authenticated with check (public.is_org_member(company_id));

grant select, insert on public.onboarding_documents to authenticated;

insert into storage.buckets (id, name, public)
values ('onboarding-documents', 'onboarding-documents', false)
on conflict (id) do nothing;

drop policy if exists "document storage read" on storage.objects;
create policy "document storage read" on storage.objects
  for select to authenticated using (bucket_id = 'onboarding-documents');
drop policy if exists "document storage write" on storage.objects;
create policy "document storage write" on storage.objects
  for insert to authenticated with check (bucket_id = 'onboarding-documents');
