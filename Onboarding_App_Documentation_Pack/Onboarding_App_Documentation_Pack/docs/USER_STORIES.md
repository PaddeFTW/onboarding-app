# User Stories

> **Dokumentstatus:** TARGET  
> **Ägare:** Product Manager  
> **Uppdateras:** Vid ändring av funktionalitet.  
> **Relaterar till:** PRD.md, REQUIREMENTS.md, ARCHITECTURE.md, PROJECT_PLAN.md och relevanta ämnesdokument.

## 1. Syfte

Beskriva användarbehov i testbara stories.

## 2. Dokumentets roll

Detta dokument är en del av projektets dokumenterade system. Krav och beslut här ska inte motsäga `DECISIONS.md`, `PROJECT_STATUS.md` eller de styrande innehållsreglerna. När ett senare beslut ändrar detta dokument ska ändringen registreras i `ONBOARDING_CHANGELOG.md`.

## 3. Huvudregler

- Som administratör vill jag välja en mall så att jag slipper börja från tom sida.
- Som chef vill jag se försenade steg så att jag kan agera.
- Som deltagare vill jag veta nästa steg så att jag slipper leta.
- Som handledare vill jag dokumentera praktisk bedömning så att färdighet kan följas upp.
- Som administratör vill jag fråga Modulassistenten så att modulskapande går snabbare.

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
