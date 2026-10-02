# Risk Analysis

> **Dokumentstatus:** TARGET  
> **Ägare:** Product Owner + Security Lead  
> **Uppdateras:** Kvartalsvis och inför större release.  
> **Relaterar till:** PRD.md, REQUIREMENTS.md, ARCHITECTURE.md, PROJECT_PLAN.md och relevanta ämnesdokument.

## 1. Syfte

Samla produkt- och teknikrisker.

## 2. Dokumentets roll

Detta dokument är en del av projektets dokumenterade system. Krav och beslut här ska inte motsäga `DECISIONS.md`, `PROJECT_STATUS.md` eller de styrande innehållsreglerna. När ett senare beslut ändrar detta dokument ska ändringen registreras i `ONBOARDING_CHANGELOG.md`.

## 3. Huvudregler

- R1 Cross-tenant data leak – hög påverkan; mitigering RLS + integration tests.
- R2 Felaktigt juridiskt innehåll – hög påverkan; mitigering source verification.
- R3 AI-data leakage – hög påverkan; mitigering minimization + provider controls.
- R4 Snapshot corruption – hög påverkan; mitigering immutable versions + migration tests.
- R5 Notification overload – medel; mitigering preferences/dedup.

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
