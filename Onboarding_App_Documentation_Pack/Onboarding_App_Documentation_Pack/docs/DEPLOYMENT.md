# Deployment

> **Dokumentstatus:** TARGET  
> **Ägare:** DevOps Lead  
> **Uppdateras:** Vid ändrad deploymentplattform.  
> **Relaterar till:** PRD.md, REQUIREMENTS.md, ARCHITECTURE.md, PROJECT_PLAN.md och relevanta ämnesdokument.

## 1. Syfte

Beskriva bygg- och releaseprocess.

## 2. Dokumentets roll

Detta dokument är en del av projektets dokumenterade system. Krav och beslut här ska inte motsäga `DECISIONS.md`, `PROJECT_STATUS.md` eller de styrande innehållsreglerna. När ett senare beslut ändrar detta dokument ska ändringen registreras i `ONBOARDING_CHANGELOG.md`.

## 3. Huvudregler

- Miljöer: local, preview/staging, production.
- Build ska vara reproducerbar.
- Secrets per environment.
- DB migrations deployas kontrollerat.
- Smoke test efter release.
- Rollback-plan dokumenterad före riskfylld release.

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

## 7. Production gate

- P0 tests green
- build green
- database migration reviewed
- RLS smoke test passed
- environment variables verified
- monitoring active
- backup state verified
- release owner assigned
