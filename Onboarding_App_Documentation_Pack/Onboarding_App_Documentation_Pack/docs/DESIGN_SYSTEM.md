# Design System

> **Dokumentstatus:** TARGET  
> **Ägare:** UX Lead + Frontend Lead  
> **Uppdateras:** När design tokens eller komponenter ändras.  
> **Relaterar till:** PRD.md, REQUIREMENTS.md, ARCHITECTURE.md, PROJECT_PLAN.md och relevanta ämnesdokument.

## 1. Syfte

Definiera tokens, komponenter, states och visuella regler.

## 2. Dokumentets roll

Detta dokument är en del av projektets dokumenterade system. Krav och beslut här ska inte motsäga `DECISIONS.md`, `PROJECT_STATUS.md` eller de styrande innehållsreglerna. När ett senare beslut ändrar detta dokument ska ändringen registreras i `ONBOARDING_CHANGELOG.md`.

## 3. Huvudregler

- Typografi: Tahoma med systemfallback.
- Spacing: 4/8-baserad rytm.
- Form: mjuka hörn, tydliga ytor och begränsad skugga.
- States: default, hover, focus, active, disabled, loading, error, success.
- Färg ska uttrycka status men aldrig vara enda informationsbäraren.
- Komponenter: Button, Card, Badge, Progress, Sheet/Dialog, Tabs, Table, Form, EmptyState, Toast.

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
