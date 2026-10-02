# Databasdesign

> **Dokumentstatus:** TARGET  
> **Ägare:** Tech Lead + Backendansvarig  
> **Uppdateras:** När schema eller RLS ändras och före migrering till produktion.  
> **Relaterar till:** PRD.md, REQUIREMENTS.md, ARCHITECTURE.md, PROJECT_PLAN.md och relevanta ämnesdokument.

## 1. Syfte

Definiera den normaliserade datamodellen för företag, användare, roller, mallar, onboardinginstanser, steg, dokument, aktiviteter, notiser och audit log.

## 2. Dokumentets roll

Detta dokument är en del av projektets dokumenterade system. Krav och beslut här ska inte motsäga `DECISIONS.md`, `PROJECT_STATUS.md` eller de styrande innehållsreglerna. När ett senare beslut ändrar detta dokument ska ändringen registreras i `ONBOARDING_CHANGELOG.md`.

## 3. Datamodell

### Identity och tenant

- `profiles`
- `companies`
- `company_memberships`
- `roles`
- `role_permissions`
- `permissions`

### Onboarding

- `onboarding_templates`
- `onboarding_template_versions`
- `onboarding_steps`
- `onboarding_step_versions`
- `onboarding_instances`
- `onboarding_instance_steps`
- `onboarding_assignments`
- `onboarding_snapshots`

### Documents

- `documents`
- `document_versions`
- `document_links`
- `file_assets`

### Workspace

- `tasks`
- `notifications`
- `activity_events`
- `dashboard_preferences`

### Modules

- `modules`
- `module_versions`
- `company_modules`
- `module_installations`

### AI

- `ai_sessions`
- `ai_messages`
- `ai_suggestions`
- `ai_runs`
- `ai_feedback`

### Governance

- `audit_logs`
- `data_retention_policies`
- `consents` endast där rättsligt eller funktionellt motiverat.

## 4. Viktiga relationer

`companies 1—N company_memberships`  
`onboarding_templates 1—N onboarding_template_versions`  
`onboarding_template_versions 1—N onboarding_step_versions`  
`onboarding_instances 1—N onboarding_instance_steps`  
`onboarding_instances 1—1 onboarding_snapshots` vid avslut.

## 5. Snapshot

Snapshot ska innehålla eller referera till exakta versioner, inte live-poster. Historik ska kunna återskapas utan att läsa en senare publicerad mall.

## 6. RLS

Varje tabell som innehåller företagsdata ska ha en definierad tenant-policy. Server-side service role får aldrig exponeras i klientkod.

## 7. Migrering

Alla schemaändringar ska vara versionshanterade migrations. Ingen manuell produktionstabelländring får göras utan motsvarande migrering.
