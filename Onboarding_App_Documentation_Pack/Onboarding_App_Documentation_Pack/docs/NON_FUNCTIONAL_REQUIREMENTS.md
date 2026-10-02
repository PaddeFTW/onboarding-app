# Icke-funktionella krav

> **Dokumentstatus:** TARGET  
> **Ägare:** Tech Lead + QA Lead  
> **Uppdateras:** När SLA, säkerhet eller plattform ändras.  
> **Relaterar till:** PRD.md, REQUIREMENTS.md, ARCHITECTURE.md, PROJECT_PLAN.md och relevanta ämnesdokument.

## 1. Syfte

Definiera kvalitetskrav som gäller hela produkten.

## 2. Dokumentets roll

Detta dokument är en del av projektets dokumenterade system. Krav och beslut här ska inte motsäga `DECISIONS.md`, `PROJECT_STATUS.md` eller de styrande innehållsreglerna. När ett senare beslut ändrar detta dokument ska ändringen registreras i `ONBOARDING_CHANGELOG.md`.

## 3. Huvudregler

- Security: tenant isolation, least privilege, secure secrets.
- Performance: P95 för normala läsningar ska mätas och budgeteras före produktion.
- Availability: definiera mål per kommersiell plan.
- Accessibility: WCAG 2.2 AA som mål.
- Maintainability: TypeScript strict, migrations, tests och dokumenterade interfaces.
- Observability: errors, latency, auth failures och AI usage.

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
