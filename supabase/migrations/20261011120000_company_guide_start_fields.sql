-- Kör i Supabase SQL Editor om kolumnerna saknas.
-- Inga nya tabeller. Bara kolumner till befintliga tabeller.

alter table public.company_settings
  add column if not exists company_name text;

alter table public.company_settings
  add column if not exists org_number text;

alter table public.company_facts
  add column if not exists start_date date;

alter table public.company_facts
  add column if not exists start_place text;

alter table public.company_facts
  add column if not exists first_day text;

alter table public.company_facts
  add column if not exists accounts text;

alter table public.company_facts
  add column if not exists equipment text;
