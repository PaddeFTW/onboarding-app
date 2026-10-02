# Template Checklist

> **Dokumentstatus:** TARGET  
> **Ägare:** Project Manager + Tech Lead  
> **Uppdateras:** Vid ändring av template framework.  
> **Relaterar till:** PRD.md, REQUIREMENTS.md, ARCHITECTURE.md, PROJECT_PLAN.md och relevanta ämnesdokument.

## 1. Syfte

Vara den praktiska start- och överlämningschecklistan för ett nytt projekt från mallen.

## 2. Dokumentets roll

Detta dokument är en del av projektets dokumenterade system. Krav och beslut här ska inte motsäga `DECISIONS.md`, `PROJECT_STATUS.md` eller de styrande innehållsreglerna. När ett senare beslut ändrar detta dokument ska ändringen registreras i `ONBOARDING_CHANGELOG.md`.

## 3. Project setup

- [ ] Produktnamn och domain definierade
- [ ] Repository skapat från template
- [ ] Environments skapade
- [ ] Auth konfigurerad
- [ ] Database migrations etablerade
- [ ] RLS verifierad
- [ ] Roles/permissions definierade
- [ ] Brand profile vald

## 4. Product definition

- [ ] Vision
- [ ] PRD
- [ ] Domain model
- [ ] Core user flows
- [ ] Modules
- [ ] Workspace widgets
- [ ] AI use cases
- [ ] Data retention

## 5. Engineering

- [ ] Folder structure
- [ ] CI
- [ ] Tests
- [ ] Monitoring
- [ ] Backup
- [ ] Security review
- [ ] Accessibility review

## 6. Release

- [ ] P0 acceptance passed
- [ ] Tenant isolation test passed
- [ ] Snapshot/version test passed
- [ ] Audit log test passed
- [ ] AI guardrails tested
- [ ] Production smoke test passed
- [ ] Support documentation ready
- [ ] Rollback verified
