# Template Module System

> **Dokumentstatus:** TARGET  
> **Ägare:** Platform Architect  
> **Uppdateras:** Vid ändring av modulkontrakt.  
> **Relaterar till:** PRD.md, REQUIREMENTS.md, ARCHITECTURE.md, PROJECT_PLAN.md och relevanta ämnesdokument.

## 1. Syfte

Beskriva hur generiska moduler registreras, installeras och livscykelhanteras.

## 2. Dokumentets roll

Detta dokument är en del av projektets dokumenterade system. Krav och beslut här ska inte motsäga `DECISIONS.md`, `PROJECT_STATUS.md` eller de styrande innehållsreglerna. När ett senare beslut ändrar detta dokument ska ändringen registreras i `ONBOARDING_CHANGELOG.md`.

## 3. Module contract

Varje modul definierar:
- id
- name
- version
- permissions
- routes
- entities
- widgets
- settings
- dependencies
- feature flags
- lifecycle state

## 4. Core vs domain

Core-moduler: auth, workspace, notifications, files, audit, AI shell.

Domain-moduler: onboarding, LMS, cases, customers, quality management etc.

## 5. Lifecycle

`REGISTERED → INSTALLED → CONFIGURED → ACTIVE → DEPRECATED → ARCHIVED`.

## 6. Dependency rules

En modul får bara bero på core eller uttryckligen deklarerade moduler. Cirkulära beroenden förbjuds.
