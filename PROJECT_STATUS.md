# Project Status

## Aktuell status

Version 1.0 är låst. Del 1–2 ligger på `main`.

Del 3-förhandsvisningen sparar företagsmallar och guidningar i Supabase, inte i webbläsaren. Checklistan använder sina befintliga tabeller. Ingen inloggning ännu.

Migration som måste köras i Supabase innan vyerna fungerar:
`supabase/migrations/20261002025000_company_templates_and_guided.sql`

## Nästa fokus

1. Kör migrationen i Supabase-projektet
2. Merga branchen `feat/del3-local-company-templates`
3. Del 4 — autentisering, företag och RLS som ersätter öppen public-policy
4. Konsolidera stegbanken

## Produktprincip

Appen ska inte bli ett stort HR-system. Permanent lagring först, isolering per företag när auth finns.
