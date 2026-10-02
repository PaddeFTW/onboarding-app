# Onboarding Stepbank Master

> **Dokumentstatus:** TARGET  
> **Ägare:** Content Owner + Domain Reviewer  
> **Uppdateras:** Vid varje nytt steg, sammanslagning, verifiering eller publicering.  
> **Relaterar till:** PRD.md, REQUIREMENTS.md, ARCHITECTURE.md, PROJECT_PLAN.md och relevanta ämnesdokument.

## 1. Syfte

Vara den kanoniska stegbanken utan dubbletter. Den ska vara den enda godkända källan för publicerbara onboardingsteg.

## 2. Dokumentets roll

Detta dokument är en del av projektets dokumenterade system. Krav och beslut här ska inte motsäga `DECISIONS.md`, `PROJECT_STATUS.md` eller de styrande innehållsreglerna. När ett senare beslut ändrar detta dokument ska ändringen registreras i `ONBOARDING_CHANGELOG.md`.

## 3. Status

Masterstegruppens struktur är fastställd. Full konsolidering av Batch 01–03 och tidigare SV/EN-filer ska endast göras mot de faktiska källfilerna. Saknade källfiler får inte ersättas med påhittade steg eller source IDs.

## 4. Obligatoriska fält

```yaml
step_id:
version:
status:
title_sv:
title_en:
phase:
category:
step_type:
content_layer:
industry:
job_roles:
responsible_role:
participant_role:
required:
estimated_time:
instructions_sv:
instructions_en:
help_text_sv:
help_text_en:
document_links:
completion_method:
evidence_required:
conditions:
due_rule:
approval_required:
source_ids:
source_locators:
statement_class:
verification_status:
reviewer:
reviewed_at:
```

## 5. Canonical ID

Föreslagen struktur:

`<LAYER>-<DOMAIN>-<SEQUENCE>`

Exempel:
- `GEN-POL-001`
- `IND-BYG-001`
- `ROLE-PLATSCHEF-001`
- `COMP-DOC-001`

ID ska inte återanvändas efter publicering.

## 6. Konsolideringsregler

- Behåll den tydligaste egenformulerade versionen.
- Slå samman verkliga dubbletter.
- Behåll separata steg när de har olika ansvar, bevis eller villkor.
- Flytta branschspecifika steg till branschlagret.
- Flytta rollspecifika steg till rollagret.
- Flytta företagets egna rutiner till företagslagret.
- Ta bort eller arkivera innehåll som inte behövs i första versionen.
- Alla nya eller sammanslagna steg börjar som `DRAFT`.

## 7. Tillgängligt verifierat innehåll i nuvarande projektmaterial

Batch 03 innehåller 14 nya utkast och använder registrerade source IDs. Exempel på kanoniska kandidater är `ADM-POL-001`, `ADM-POL-002` och `GEN-POL-001`. De är fortfarande DRAFT/PARTIAL och får inte behandlas som publicerade.

## 8. Publiceringsgrind

`DRAFT → SOURCE_VERIFIED → DOMAIN_REVIEWED → COPYRIGHT_REVIEWED → APPROVED → PUBLISHED`.

Ett publicerat steg måste ha source ID, locator, stegtyp, lager, ansvar, deltagarroll, villkor, slutförandemetod, påståendeklass, verifieringsstatus, version, granskare och datum.

## 9. Verifieringskö

Följande områden ska verifieras särskilt:
- dataskydd och personuppgiftsincidenter
- äldre myndighetsnamn
- PuL-relaterade formuleringar
- skatte- och körjournalsuppgifter
- kör- och vilotider
- ISO-påståenden och standardversioner
- arbetsmiljö- och trafiksäkerhetsinstruktioner
