# Folder Structure

> **Dokumentstatus:** TARGET  
> **Ägare:** Tech Lead  
> **Uppdateras:** Vid större omstrukturering.  
> **Relaterar till:** PRD.md, REQUIREMENTS.md, ARCHITECTURE.md, PROJECT_PLAN.md och relevanta ämnesdokument.

## 1. Syfte

Definiera rekommenderad repo-struktur.

## 2. Dokumentets roll

Detta dokument är en del av projektets dokumenterade system. Krav och beslut här ska inte motsäga `DECISIONS.md`, `PROJECT_STATUS.md` eller de styrande innehållsreglerna. När ett senare beslut ändrar detta dokument ska ändringen registreras i `ONBOARDING_CHANGELOG.md`.

## 3. Huvudregler

- ```text
app/                 Next.js routes
src/components/      UI och feature components
src/domain/           domänregler
src/services/         applikationstjänster
src/lib/              integrationer/utilities
src/types/            delade typer
db/migrations/        SQL migrations
tests/                unit/integration/E2E
docs/                 produkt- och teknikdokumentation
public/               statiska assets/dokument
```
- Feature-kod ska ligga nära den funktion den tillhör när det förbättrar läsbarhet.

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
