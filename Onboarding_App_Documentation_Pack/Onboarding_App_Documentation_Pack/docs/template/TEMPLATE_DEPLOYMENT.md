# Template Deployment

> **Dokumentstatus:** TARGET  
> **Ägare:** DevOps Lead  
> **Uppdateras:** Vid förändring av CI/CD eller plattform.  
> **Relaterar till:** PRD.md, REQUIREMENTS.md, ARCHITECTURE.md, PROJECT_PLAN.md och relevanta ämnesdokument.

## 1. Syfte

Standardisera deployment av nya produkter som bygger på template framework.

## 2. Dokumentets roll

Detta dokument är en del av projektets dokumenterade system. Krav och beslut här ska inte motsäga `DECISIONS.md`, `PROJECT_STATUS.md` eller de styrande innehållsreglerna. När ett senare beslut ändrar detta dokument ska ändringen registreras i `ONBOARDING_CHANGELOG.md`.

## 3. Environments

`local → preview/staging → production`.

## 4. Pipeline

Install → lint → typecheck → test → build → migration check → deploy → smoke test.

## 5. Configuration

Secrets och tenant-specific settings ligger utanför kodbasen.

## 6. Rollback

Varje release ska ha dokumenterad rollback och migrationsstrategi. Destruktiva migrations kräver extra plan.
