# Milestones

> **Dokumentstatus:** TARGET  
> **Ägare:** Project Manager  
> **Uppdateras:** Vid ändrad roadmap.  
> **Relaterar till:** PRD.md, REQUIREMENTS.md, ARCHITECTURE.md, PROJECT_PLAN.md och relevanta ämnesdokument.

## 1. Syfte

Definiera verifierbara milstolpar och exit-kriterier.

## 2. Dokumentets roll

Detta dokument är en del av projektets dokumenterade system. Krav och beslut här ska inte motsäga `DECISIONS.md`, `PROJECT_STATUS.md` eller de styrande innehållsreglerna. När ett senare beslut ändrar detta dokument ska ändringen registreras i `ONBOARDING_CHANGELOG.md`.

## 3. Huvudregler

- M1 Dokumentationsbaseline: alla P0-dokument godkända.
- M2 Canonical content: inga kända dubbletter i godkänd master.
- M3 Tenant foundation: auth + company + RLS.
- M4 Template engine: versionering + snapshot.
- M5 Workspace: uppgifter + notiser + aktivitet.
- M6 AI assistant: förslag + human approval.
- M7 Release Candidate: P0 QA passerar.

## 4. Struktur

Detta dokument ska alltid beskriva: **syfte → användare → regler → huvudflöden → data/behörighet → fel och edge cases → test → driftpåverkan → beslut → relationer**.

## 5. Kvalitetskrav

- Krav ska vara testbara.
- Behörighet ska beskrivas explicit.
- Fel ska ha definierat användarbeteende.
- Ändringar ska vara spårbara.

## 6. Relationer

- `PRD.md`
- `REQUIREMENTS.md`
- `ARCHITECTURE.md`
- `ACCEPTANCE_CRITERIA.md`

## 7. Uppdateringsregel

Ändra dokumentet i samma förändring som ändrar dess beteende. Dokumentationen får inte ligga efter implementationen vid release.
