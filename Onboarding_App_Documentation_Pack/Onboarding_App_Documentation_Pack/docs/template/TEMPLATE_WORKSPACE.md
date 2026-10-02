# Template Workspace

> **Dokumentstatus:** TARGET  
> **Ägare:** UX Architect  
> **Uppdateras:** Vid nya widgettyper eller workspace patterns.  
> **Relaterar till:** PRD.md, REQUIREMENTS.md, ARCHITECTURE.md, PROJECT_PLAN.md och relevanta ämnesdokument.

## 1. Syfte

Definiera en generisk arbetsyta som kan anpassas till olika produkter.

## 2. Dokumentets roll

Detta dokument är en del av projektets dokumenterade system. Krav och beslut här ska inte motsäga `DECISIONS.md`, `PROJECT_STATUS.md` eller de styrande innehållsreglerna. När ett senare beslut ändrar detta dokument ska ändringen registreras i `ONBOARDING_CHANGELOG.md`.

## 3. Generic zones

- Header/context
- Primary work list
- Status/summary
- Quick actions
- Activity
- Notifications
- Related documents
- AI assistant

## 4. Domain adaptation

Onboarding visar onboarding tasks. LMS visar courses. Case management visar cases. Ledningssystem visar actions/KPI. Layoutmönstret kan behållas medan data och widgets byts.

## 5. Widget contract

Widget = `id + permission + query + renderer + states + responsive rules`.
