# Test Cases

> **Dokumentstatus:** TARGET  
> **Ägare:** QA Lead  
> **Uppdateras:** Vid ny funktion eller regression.  
> **Relaterar till:** PRD.md, REQUIREMENTS.md, ARCHITECTURE.md, PROJECT_PLAN.md och relevanta ämnesdokument.

## 1. Syfte

Ge en katalog av representativa testfall.

## 2. Dokumentets roll

Detta dokument är en del av projektets dokumenterade system. Krav och beslut här ska inte motsäga `DECISIONS.md`, `PROJECT_STATUS.md` eller de styrande innehållsreglerna. När ett senare beslut ändrar detta dokument ska ändringen registreras i `ONBOARDING_CHANGELOG.md`.

## 3. Huvudregler

- TC-AUTH-001: obehörig användare nekas.
- TC-TENANT-001: företag A kan inte läsa företag B.
- TC-TEMPLATE-001: publicerad version kan inte ändras.
- TC-ONBOARD-001: deltagare kan pausa och återuppta.
- TC-SNAPSHOT-001: malländring påverkar inte avslutad onboarding.
- TC-AI-001: AI-förslag är DRAFT.
- TC-FILE-001: otillåten filtyp nekas.
- TC-A11Y-001: centrala flöden kan köras med tangentbord.

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
