# Use Cases

> **Dokumentstatus:** TARGET  
> **Ägare:** Product Manager + UX Lead  
> **Uppdateras:** Vid ändrad kärnprocess.  
> **Relaterar till:** PRD.md, REQUIREMENTS.md, ARCHITECTURE.md, PROJECT_PLAN.md och relevanta ämnesdokument.

## 1. Syfte

Beskriva centrala användningsfall från start till avslut.

## 2. Dokumentets roll

Detta dokument är en del av projektets dokumenterade system. Krav och beslut här ska inte motsäga `DECISIONS.md`, `PROJECT_STATUS.md` eller de styrande innehållsreglerna. När ett senare beslut ändrar detta dokument ska ändringen registreras i `ONBOARDING_CHANGELOG.md`.

## 3. Huvudregler

- UC-01 Skapa företag.
- UC-02 Konfigurera policyprofil.
- UC-03 Skapa företagsmall från grundmall.
- UC-04 Publicera mallversion.
- UC-05 Starta onboarding.
- UC-06 Genomföra steg.
- UC-07 Tilldela uppgift.
- UC-08 Hantera dokument.
- UC-09 Använda Modulassistent.
- UC-10 Avsluta och låsa snapshot.

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
