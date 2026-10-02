# Modulassistent

> **Dokumentstatus:** TARGET  
> **Ägare:** AI Lead + Product Manager  
> **Uppdateras:** Vid ändrade AI-verktyg, datatillgång eller publiceringsregler.  
> **Relaterar till:** PRD.md, REQUIREMENTS.md, ARCHITECTURE.md, PROJECT_PLAN.md och relevanta ämnesdokument.

## 1. Syfte

Definiera den dialogbaserade AI-funktionen som hjälper administratören att skapa, konfigurera och aktivera moduler snabbare.

## 2. Dokumentets roll

Detta dokument är en del av projektets dokumenterade system. Krav och beslut här ska inte motsäga `DECISIONS.md`, `PROJECT_STATUS.md` eller de styrande innehållsreglerna. När ett senare beslut ändrar detta dokument ska ändringen registreras i `ONBOARDING_CHANGELOG.md`.

## 3. UI-koncept

En liten chatt-/dialogpanel kan öppnas från den modul användaren arbetar i. Panelen ska känna till den aktuella modulen och kunna föreslå ändringar utan att användaren behöver lämna sidan.

## 4. Bilagor

Användaren kan bifoga relevanta dokument. Systemet ska visa vilka filer AI får använda och vilka som inte kan läsas.

## 5. Arbetsflöde

`Öppna assistent → beskriv behov → AI analyserar → förslag → diff/förhandsvisning → användaren accepterar → DRAFT ändras → granska → publicera`.

## 6. Guardrails

- AI får inte publicera.
- AI får inte ändra behörigheter.
- AI får inte kringgå tenantgränser.
- AI får inte göra juridiska påståenden till verifierade krav.
- AI-förslag ska märkas som AI-genererade.
- Alla tillämpade ändringar ska audit-loggas.

## 7. Relationer

`MODULE_BUILDER.md`, `MODULE_TEMPLATES.md`, `AI_GOVERNANCE.md`, `AUTHORIZATION.md`, `AUDIT_LOGS.md`.
