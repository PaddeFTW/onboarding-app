# Template Database

> **Dokumentstatus:** TARGET  
> **Ägare:** Platform Architect + DBA  
> **Uppdateras:** När core schema eller security model ändras.  
> **Relaterar till:** PRD.md, REQUIREMENTS.md, ARCHITECTURE.md, PROJECT_PLAN.md och relevanta ämnesdokument.

## 1. Syfte

Definiera generiska tabeller och databasprinciper för återanvändbara SaaS-projekt.

## 2. Dokumentets roll

Detta dokument är en del av projektets dokumenterade system. Krav och beslut här ska inte motsäga `DECISIONS.md`, `PROJECT_STATUS.md` eller de styrande innehållsreglerna. När ett senare beslut ändrar detta dokument ska ändringen registreras i `ONBOARDING_CHANGELOG.md`.

## 3. Core tables

`users/profiles`, `companies/tenants`, `memberships`, `roles`, `permissions`, `role_permissions`, `audit_logs`, `documents`, `document_versions`, `notifications`, `activity_events`, `modules`, `module_versions`, `templates`, `template_versions`, `snapshots`.

## 4. Standardfält

Tenantbundna tabeller bör ha `company_id`, `created_at`, `updated_at`, och där relevant `created_by`, `updated_by`, `status`.

## 5. Versioning

Använd immutable versions för publicerat innehåll. Runtime instances refererar till versioner eller snapshots.

## 6. Security

RLS är default för tenantdata. Service role används endast server-side och aldrig i browsern.

## 7. Domain extension

Nya produkter lägger egna tabeller i separata domänmigrationer. Core migrationer ska vara stabila och bakåtkompatibla när möjligt.
