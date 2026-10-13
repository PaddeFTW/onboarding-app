# Changelog

## Unreleased

### Architecture — org/registry source of truth (2026-10-12)

- Documented code-inferred schema gaps and the plan to make git the DDL source of truth (`docs/architecture/SCHEMA_SOURCE_OF_TRUTH.md`)
- Added additive migration `supabase/migrations/20261012190000_org_registry_foundation.sql`:
  - `organizations`, `organization_members`, `company_settings`, `company_facts`, `positions`, `employees`
  - `is_org_member(uuid)`, `create_company(text, text)`
  - membership RLS policy names for registry tables (does not remove older open policies)
  - nullable `company_id` on `company_template_versions` and `guided_instances` (prep only; guided stays in localStorage)
- UX (no architecture change): `/nytt-losenord`, Inställningar in app menu + home shortcuts to settings/glossary
- Explicitly **not** done: guided DB migration, legacy checklist removal, tightening open RLS on templates/guided/legacy

### Hybrid Foundation — Del 3 (Supabase)

- Företagsmallar sparas i `company_template_versions`
- Guidningar sparas i `guided_instances`, inklusive fryst stegsnapshot
- Systemmall är fortfarande låst i koden
- Öppen åtkomst som checklistan tills Del 4 lägger på auth
- Migration: `supabase/migrations/20261002025000_company_templates_and_guided.sql`

### Notes

- Checklistan, exporten och befintliga Supabase-tabeller är oförändrade
- Inga nya npm-paket
