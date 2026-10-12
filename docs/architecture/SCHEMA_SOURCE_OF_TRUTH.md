# Schema — source of truth (git)

**Status:** Riktning godkänd 2026-10-12. Guided onboarding flyttas **inte** till DB i detta steg.  
**Syfte:** Göra git till källa för org/registry-DDL som appen redan förutsätter.

---

## 1. Inventering från kodbasen (inte live-introspekt)

Vi har **ingen** automatisk koppling till er produktions-Supabase i detta repo. Inventeringen bygger på:

- `.from(...)` / `.rpc(...)` / upsert-payloads i TypeScript
- Befintliga filer under `supabase/migrations/` och `supabase/schema.sql`
- FK-referenser i migrationer till `public.organizations`

### Finns som DDL i git idag

| Objekt | Källa |
|--------|--------|
| `onboarding`, `checklist_items` | `supabase/schema.sql` |
| `company_template_versions`, `guided_instances` | `20261002025000_…` |
| `company_invites`, `accept_company_invite()` | `20261002220000_…` |
| `onboarding_snapshots`, `audit_events` | `20261002230000_…` |
| `onboarding_documents` + storage bucket | `20261002233000_…` |
| ALTER `company_settings` / `company_facts` kolumner | `20261011120000_…` |

### Används av koden men saknade `CREATE` i git (före denna leverans)

| Objekt | Förutsatta fält / signatur (från kod) |
|--------|--------------------------------------|
| `organizations` | `id` uuid PK; `name` text (via `create_company`) |
| `organization_members` | `organization_id`, `user_id`, `role`; unik `(organization_id, user_id)` |
| `company_settings` | PK/`organization_id`, `company_name`, `org_number`, `industry`, `employee_count` |
| `company_facts` | PK/`organization_id`, work/sick/safety/policies/alarm/follow_up + start_* / accounts / equipment |
| `positions` | `id`, `organization_id`, `name`, `role` |
| `employees` | `id`, `organization_id`, `name`, `position_id`, `can_manage`, `can_mentor` |
| `create_company(p_name, p_full_name)` | returnerar organization uuid; skapar membership |
| `is_org_member(uuid)` | boolean för `auth.uid()` |

### Kod vs migration — övriga luckor (ej åtgärdade aggressivt här)

| Lucka | Risk | Åtgärd i detta steg |
|-------|------|---------------------|
| `company_template_versions.company_id` i kod, saknas i tidig migration | Template save kan falla | **ADD COLUMN IF NOT EXISTS** (additiv) |
| `guided_instances` utan `company_id`; app använder localStorage | Framtida flytt osäker | **ADD COLUMN IF NOT EXISTS** nullable (endast förberedelse) |
| Öppen RLS på templates/guided/legacy | Cross-tenant om DB används | **Ej åtdragen** (skulle kunna bryta) |
| Storage policy utan company-path | Läckage | **Ej ändrad** |
| Dual write checklist + guided | Skuggdata | **Ej borttagen** |

---

## 2. Plan: git som source of truth

### Fas A — dokumentera & baseline (detta steg)
1. Checka in idempotent foundation-migration som speglar vad koden redan anropar.
2. Använd `IF NOT EXISTS` / `ADD COLUMN IF NOT EXISTS` så live med befintliga tabeller inte förstörs.
3. Skapa `is_org_member` / `create_company` med `CREATE OR REPLACE` enligt appkontraktet.
4. Lägg medlemskaps-RLS med **våra** policynamn; ta **inte** bort eventuella äldre öppna policies (OR-semantik → ingen plötslig lockout).
5. Dokumentera manuellt smoke-test mot live.

### Fas B — verifiera live (manuellt, utanför kod)
1. Kör migration i staging/SQL editor.
2. Jämför kolumner med `information_schema` / Supabase Table Editor.
3. Bekräfta signup → `create_company` → registry load.

### Fas C — skärp tenancy (senare, separat godkännande)
1. Ta bort `using (true)`-policies där de finns.
2. Storage path + policy per company.
3. Guided persistens till DB (egen sprint).

### Fas D — legacy
1. Stoppa dual write.
2. Deprecera `/onboarding/[id]`.

---

## 3. Ändringslogg (detta arbete)

| Ändring | Fil | Brytrisk |
|---------|-----|----------|
| Foundation DDL + RPC + medlemskaps-RLS (additiv) | `supabase/migrations/20261012190000_org_registry_foundation.sql` | Låg på miljöer som redan har tabellerna; **medel** om live `create_company` skiljer sig kraftigt (ersätts av OR REPLACE) |
| Schema-dokument | `docs/architecture/SCHEMA_SOURCE_OF_TRUTH.md` | Ingen |
| Changelog-notis | `CHANGELOG.md` | Ingen |
| Sida `/nytt-losenord` | `app/nytt-losenord/page.tsx` | Låg (saknad route) |
| Länk Inställningar i AppMenu | `components/app-menu.tsx` | Ingen |
| Genväg Inställningar på startsidan | `app/page.tsx` | Ingen |

---

## 4. Explicit ej gjort (medvetet)

- Ingen flytt av guided onboarding från localStorage till Supabase  
- Ingen borttagning av legacy `onboarding` / `checklist_items`  
- Ingen åtdragning av öppna RLS på templates/guided/legacy  
- Ingen storage-policy-omskrivning  
- Ingen spekulativ kolumn (`email` på employees, policy-tabeller, m.m.)

---

## 5. Manuell verifiering innan/efter migration på live

1. I Supabase SQL: `\df create_company` / Table Editor — notera om funktion/tabeller redan finns.  
2. Kör `20261012190000_org_registry_foundation.sql` i **staging** först.  
3. Smoke: skapa konto → företagsguide sparar → `/foretag` laddar → ny intro (fortfarande localStorage).  
4. Om signup bryts: jämför ersatt `create_company` med backup; återställ live-funktion och öppna issue.  
5. Bekräfta att `company_template_versions.company_id` finns (template-UI).
