# Business Case

> **Dokumentstatus:** TARGET  
> **Ägare:** Produktägare + Ekonomiansvarig  
> **Uppdateras:** Vid pris-, målgrupps- eller kostnadsförändring.  
> **Relaterar till:** PRD.md, REQUIREMENTS.md, ARCHITECTURE.md, PROJECT_PLAN.md och relevanta ämnesdokument.

## 1. Syfte

Dokumentera värdet för kund och leverantör.

## 2. Dokumentets roll

Detta dokument är en del av projektets dokumenterade system. Krav och beslut här ska inte motsäga `DECISIONS.md`, `PROJECT_STATUS.md` eller de styrande innehållsreglerna. När ett senare beslut ändrar detta dokument ska ändringen registreras i `ONBOARDING_CHANGELOG.md`.

## 3. Huvudregler

- Kundvärde: mindre manuell administration, bättre överblick, mer konsekvent introduktion.
- Leverantörsvärde: återanvändbara mallar och moduler.
- Kostnadsdrivare: hosting, databas, AI-anrop, support och utveckling.
- Kritisk risk: AI- och innehållskostnader får inte växa utan mätning.

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
