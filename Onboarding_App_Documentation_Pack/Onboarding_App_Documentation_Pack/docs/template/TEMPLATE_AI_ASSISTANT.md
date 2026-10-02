# Template AI Assistant

> **Dokumentstatus:** TARGET  
> **Ägare:** AI Platform Lead  
> **Uppdateras:** Vid provider-, tool- eller governanceändring.  
> **Relaterar till:** PRD.md, REQUIREMENTS.md, ARCHITECTURE.md, PROJECT_PLAN.md och relevanta ämnesdokument.

## 1. Syfte

Definiera ett återanvändbart skal för AI-assistenter i olika SaaS-produkter.

## 2. Dokumentets roll

Detta dokument är en del av projektets dokumenterade system. Krav och beslut här ska inte motsäga `DECISIONS.md`, `PROJECT_STATUS.md` eller de styrande innehållsreglerna. När ett senare beslut ändrar detta dokument ska ändringen registreras i `ONBOARDING_CHANGELOG.md`.

## 3. Assistant contract

`assistant_id`, purpose, allowed_context, tools, output_schema, guardrails, audit_policy, retention.

## 4. Generic UI

Chat input → context indicator → answer → suggestions → sources → actions.

## 5. Human approval

Alla mutationer ska vara previewable och kunna avvisas. Publicering och permission changes kräver explicit behörighet.

## 6. Provider abstraction

Produktkoden ska inte vara hårdkodad till en viss AI-provider. Provider adapter hanterar model, timeout, retries, cost tracking och policy.
