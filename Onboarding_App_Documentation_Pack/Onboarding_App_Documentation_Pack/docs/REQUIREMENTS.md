# Kravbild

> **Dokumentstatus:** TARGET  
> **Ägare:** Product Manager  
> **Uppdateras:** När krav läggs till eller ändras.  
> **Relaterar till:** PRD.md, REQUIREMENTS.md, ARCHITECTURE.md, PROJECT_PLAN.md och relevanta ämnesdokument.

## 1. Syfte

Samla spårbara krav och prioritet.

## 2. Dokumentets roll

Detta dokument är en del av projektets dokumenterade system. Krav och beslut här ska inte motsäga `DECISIONS.md`, `PROJECT_STATUS.md` eller de styrande innehållsreglerna. När ett senare beslut ändrar detta dokument ska ändringen registreras i `ONBOARDING_CHANGELOG.md`.

## 3. Huvudregler

- REQ-001: användare ska kunna tillhöra företag.
- REQ-002: företag ska isoleras.
- REQ-003: mallar ska versionshanteras.
- REQ-004: onboarding ska kunna återupptas.
- REQ-005: avslutad onboarding ska vara historiskt låst.
- REQ-006: steg ska kunna vara villkorsstyrda.
- REQ-007: AI-förslag ska kunna granskas före tillämpning.
- REQ-008: alla kritiska ändringar ska loggas.

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
