# Template Architecture

> **Dokumentstatus:** TARGET  
> **Ägare:** Platform Architect  
> **Uppdateras:** Vid plattformsarkitekturändring.  
> **Relaterar till:** PRD.md, REQUIREMENTS.md, ARCHITECTURE.md, PROJECT_PLAN.md och relevanta ämnesdokument.

## 1. Syfte

Definiera den återanvändbara systemarkitekturen som ligger under olika produkter.

## 2. Dokumentets roll

Detta dokument är en del av projektets dokumenterade system. Krav och beslut här ska inte motsäga `DECISIONS.md`, `PROJECT_STATUS.md` eller de styrande innehållsreglerna. När ett senare beslut ändrar detta dokument ska ändringen registreras i `ONBOARDING_CHANGELOG.md`.

## 3. Lager

`UI → Application → Domain → Data → External adapters`

## 4. Generiska tjänster

- Identity
- Tenant
- Authorization
- Audit
- Files
- Notifications
- Activity
- Templates
- Modules
- AI
- Search
- Export
- Observability

## 5. Plugin/modulprincip

Domänmoduler registrerar metadata, routes, permissions, entities och widgets. De får inte duplicera core security eller tenant logic.

## 6. Data boundary

Core tables använder stabila IDs och standardiserade audit/tenantfält. Domain tables läggs ovanpå.

## 7. Deployment

Samma CI/CD-mönster används. Projektspecifika env vars och integrationsadaptrar konfigureras per projekt.
