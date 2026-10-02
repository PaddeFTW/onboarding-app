# Template Framework

> **Dokumentstatus:** TARGET  
> **Ägare:** Platform Architect  
> **Uppdateras:** När en återanvändbar princip ändras; aldrig för enbart projektspecifik logik.  
> **Relaterar till:** PRD.md, REQUIREMENTS.md, ARCHITECTURE.md, PROJECT_PLAN.md och relevanta ämnesdokument.

## 1. Syfte

Beskriva den generiska produktmallen som kan återanvändas för onboarding, HR-portaler, ledningssystem, kundportaler, medarbetarappar, LMS, ärendehantering och SaaS-produkter.

## 2. Dokumentets roll

Detta dokument är en del av projektets dokumenterade system. Krav och beslut här ska inte motsäga `DECISIONS.md`, `PROJECT_STATUS.md` eller de styrande innehållsreglerna. När ett senare beslut ändrar detta dokument ska ändringen registreras i `ONBOARDING_CHANGELOG.md`.

## 3. Vad som är generiskt

### Kan återanvändas rakt av
- tenant-/företagsmodell
- användare och medlemskap
- roller och permissions
- audit log
- dokumentmetadata och versioner
- notifications
- activity feed
- modulregister
- template/version/snapshot-mönster
- workspace
- design tokens
- AI assistant shell och governance
- deployment- och observabilitymönster

### Projektspecifikt
- domänobjekt
- verksamhetsregler
- innehåll
- branschlogik
- workflow states
- rapporter
- terminologi
- färgprofil och branding
- integrationer
- retentionkrav

## 4. Golden rule

Byt verksamhetslogik, moduler och designprofil. Behåll plattformens säkerhet, versionshantering, behörighetsmodell, komponenter och arbetsflöden.

## 5. Nytt projekt

1. Kopiera template repository.
2. Fyll `PROJECT_PROFILE`.
3. Välj modules.
4. Definiera domain entities.
5. Konfigurera brand tokens.
6. Definiera roles/permissions.
7. Välj workspace widgets.
8. Konfigurera AI assistants.
9. Skapa migrations.
10. Kör template checklist.
11. Bygg första vertical slice.
12. QA och deploy.

## 6. Separation

`template/` innehåller generiska byggblock. `domain/` innehåller projektets verksamhetslogik. En template-ändring får inte smyga in projektspecifik logik.

## 7. Standardiserade arbetsflöden

- Create → Draft → Review → Approve → Publish
- Assign → Work → Review → Complete
- Upload → Validate → Version → Link → Archive
- Ask AI → Suggest → Review → Apply
- Incident → Triage → Contain → Recover → Postmortem
