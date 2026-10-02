# Component Library

> **Dokumentstatus:** TARGET  
> **Ägare:** Frontend Lead + UX Lead  
> **Uppdateras:** När komponentbiblioteket ändras.  
> **Relaterar till:** PRD.md, REQUIREMENTS.md, ARCHITECTURE.md, PROJECT_PLAN.md och relevanta ämnesdokument.

## 1. Syfte

Definiera återanvändbara UI-komponenter.

## 2. Dokumentets roll

Detta dokument är en del av projektets dokumenterade system. Krav och beslut här ska inte motsäga `DECISIONS.md`, `PROJECT_STATUS.md` eller de styrande innehållsreglerna. När ett senare beslut ändrar detta dokument ska ändringen registreras i `ONBOARDING_CHANGELOG.md`.

## 3. Huvudregler

- Foundations: Typography, Icon, Stack, Grid, Container.
- Controls: Button, Input, Select, Checkbox, Radio, Switch.
- Feedback: Alert, Toast, Progress, Skeleton, EmptyState.
- Data: Table, List, Card, Badge, Timeline.
- Navigation: Sidebar, Tabs, Breadcrumbs.
- Workflows: StepHeader, StepCard, AssignmentPicker, DocumentLink, PublishGate, AIChatPanel.

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
