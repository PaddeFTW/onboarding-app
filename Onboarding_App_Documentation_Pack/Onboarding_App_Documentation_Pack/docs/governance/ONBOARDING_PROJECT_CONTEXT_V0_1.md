# Onboarding App – Project Context v0.1

**Datum:** 2026-07-09  
**Projekt:** Onboarding App Version 2  
**Status:** Innehållsarkitektur och kunskapsbearbetning pågår

## 1. Produktmål

Onboarding App ska digitalisera KvalitetsGruppens beprövade introduktionsmaterial till en modern och enkel produkt.

Appen ska vara en **hybrid med stegbank**, inte enbart en frågebank.

Steg kan vara:

- information
- uppgift
- dokument
- möte
- kontroll
- bekräftelse
- kunskapskontroll
- uppföljning

## 2. Sex faser

1. Förberedelse
2. Välkomst och introduktion
3. Grundläggande krav
4. Bransch- och rollspecifik introduktion
5. Praktisk integration
6. Uppföljning och avslut

## 3. Fyra innehållslager

1. Allmänt
2. Bransch
3. Befattning
4. Företag

## 4. Mall- och versionsmodell

- KvalitetsGruppen äger originalmallar och grundinnehåll.
- Kunden arbetar i en kopia av en mall.
- Kunden kan ändra text, lägga till steg, inaktivera steg, ändra ordning och koppla dokument.
- Publicerad onboarding använder en låst mallversion eller snapshot.
- Ändringar i en mall får inte förändra historiken för avslutade onboardingar.

## 5. Roller

### Administratör

- skapar och ändrar företagsmallar
- väljer bransch, befattning och policyprofil
- kopplar dokument
- publicerar nya mallversioner

### Chef eller onboardingansvarig

- planerar introduktionen
- utser ansvariga
- godkänner obligatoriska moment
- genomför uppföljning

### Handledare

- genomför praktiska moment
- bedömer förståelse och färdighet
- rapporterar kvarstående behov

### Deltagare

- tar del av information
- genomför uppgifter och kontroller
- lämnar bekräftelser och återkoppling

## 6. Käll- och kunskapsmodell

Originalfiler bevaras oförändrade i källagret.

Bearbetad kunskap ska:

- ha unikt ID
- ha `source_ids`
- vara egenformulerad
- skilja krav, företagsregel, rekommendation och exempel
- granskas före publicering

## 7. Nuvarande innehållsbatchar

### Batch 01

- allmän introduktion
- bygg och entreprenad
- första källinventering

### Batch 02

- befattningsbeskrivning
- personalpolicy
- medarbetarsamtal
- onboarding-enkät
- handlingsplan
- arbetsmiljörelaterade stödprodukter

### Batch 03

- policyprofil
- kvalitet
- miljö
- verksamhet/KMA
- likabehandling
- IT
- dataskydd
- CSR
- fordon och körjournal

## 8. Viktiga dokument

### Styrande

- `ONBOARDING_CONTENT_BLUEPRINT.md`
- `ONBOARDING_PROJECT_CONTEXT_V0_1.md`
- `ONBOARDING_REVIEW_AND_PUBLISHING_RULES_V0_1.md`
- `ONBOARDING_POLICY_PACK_V0_1.md`
- `ONBOARDING_SOURCE_MAP_V0_1.md`

### Innehåll

- `ONBOARDING_CONTENT_FOUNDATION_BATCH_02.md`
- `ONBOARDING_STEPBANK_BATCH_01.md`
- `ONBOARDING_STEPBANK_BATCH_02.md`
- `ONBOARDING_STEPBANK_BATCH_03.md`
- `ONBOARDING_STEG1_ALLMAN_GRUND_SV_EN.md`
- `ONBOARDING_STEG2_BYGG_ENTREPRENAD_SV_EN.md`

### Källregister

- `SOURCE_REGISTER_V0_3.md`
- `QW_KB_INGEST_BATCH_02_ORIGINALS.zip`
- `QW_KB_INGEST_BATCH_03_ORIGINALS.zip`

## 9. Aktuella kvalitetsrisker

- dubbletter mellan stegbankerna
- äldre juridiska formuleringar i flera original
- ISO-påståenden utan verifierad klausulmappning
- policyer som kan överlappa
- för mycket innehåll för alla användare
- risk att bekräftelse ersätter verklig förståelse eller praktisk färdighet

## 10. Nästa beslutade arbete

1. Konsolidera Batch 01–03.
2. Skapa en kanonisk masterstegrupp utan dubbletter.
3. Fastställa policyprofil och villkorslogik.
4. Fastställa första allmänna onboardingmallen.
5. Fastställa första byggmallen.
6. Skapa rollpaket för yrkesarbetare, arbetsledare, platschef, projektledare och administratör/KMA-ansvarig.
7. Sakgranska juridiskt och standardrelaterat innehåll.
8. Först därefter förbereda implementation.

## 11. Avgränsning

Projektet ska nu ta fram innehåll, struktur och regler.

Kodning ska inte påbörjas innan den kanoniska stegbanken och publiceringsreglerna är godkända.
