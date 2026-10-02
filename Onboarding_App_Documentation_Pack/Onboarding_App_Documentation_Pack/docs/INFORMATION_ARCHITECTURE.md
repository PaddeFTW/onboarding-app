# Informationsarkitektur

> **Dokumentstatus:** TARGET  
> **Ägare:** UX Lead + Product Manager  
> **Uppdateras:** Vid nya moduler eller navigation.  
> **Relaterar till:** PRD.md, REQUIREMENTS.md, ARCHITECTURE.md, PROJECT_PLAN.md och relevanta ämnesdokument.

## 1. Syfte

Definiera navigering och hierarki.

## 2. Dokumentets roll

Detta dokument är en del av projektets dokumenterade system. Krav och beslut här ska inte motsäga `DECISIONS.md`, `PROJECT_STATUS.md` eller de styrande innehållsreglerna. När ett senare beslut ändrar detta dokument ska ändringen registreras i `ONBOARDING_CHANGELOG.md`.

## 3. Huvudregler

- Top-level: Workspace, Onboarding, Modules, Documents, Activity, Notifications, Settings.
- Admin-only: Company, Roles, Templates, Publishing, Audit.
- Detaljsidor ska följa list → detail → edit.
- Search ska vara global men filtrera på behörighet.

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

## 8. Navigation rules

Deltagaren ska inte se administrationsfunktioner som inte behövs. Admin kan se konfiguration och publicering. Sökresultat filtreras alltid efter behörighet.

## 9. URL principle

URLs ska vara stabila och läsbara, exempelvis `/workspace`, `/onboarding`, `/onboarding/[id]`, `/modules`, `/modules/[id]`, `/documents`, `/settings`.
