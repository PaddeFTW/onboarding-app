# Uppföljningsprompt – Onboarding App Version 2

Detta projekt gäller endast **Onboarding App Version 2**.

## Målet

Fortsätt utveckla en modern onboardingprodukt med en **hybridmodell och stegbank**.

Onboarding ska kunna bestå av:

- information
- uppgifter
- dokument
- möten
- kontroller
- bekräftelser
- kunskapsfrågor
- uppföljning

Appen ska stödja fyra innehållslager:

1. Allmänt
2. Bransch
3. Befattning
4. Företag

## Använd endast nödvändiga källor

### Styrande dokument

Använd alltid:

1. `ONBOARDING_CONTENT_BLUEPRINT.md`
2. `ONBOARDING_STEG1_ALLMAN_GRUND_SV_EN.md`

`ONBOARDING_CONTENT_BLUEPRINT.md` styr:

- de sex faserna
- de fyra innehållslagren
- stegtyperna
- fältstrukturen
- källspårning
- versionshantering
- företagsanpassning

`ONBOARDING_STEG1_ALLMAN_GRUND_SV_EN.md` är arbetsunderlag för den allmänna grunden, men stegen ska fortfarande behandlas som **utkast tills de är granskade**.

### Primärt originalunderlag

Använd:

3. `onboarding-policy.dotx`

Detta är det viktigaste konkreta originalunderlaget för onboardingens syfte, ansvar, minsta innehåll, tidslinje och uppföljning.

### Nödvändiga stödkällor för allmän grund

Använd endast när ett onboardingsteg direkt berör området:

4. `Policy_-_Arbetsmiljo.docx`
5. `Policy_-_Brandskydd.docx`
6. `Policy_-_Alkohol_och_droger.docx`

De används för att skapa korta, begripliga steg om:

- arbetsmiljöpolicy
- brandskydd och utrymning
- alkohol- och drogpolicy
- ansvar
- vad medarbetaren behöver känna till
- bekräftelse eller kunskapskontroll

Kopiera inte hela dokument eller hela policytexter till appen. Skapa korta, egenformulerade onboardingsteg och länka i stället till företagets godkända dokument.

### Nödvändiga stödkällor för byggpaketet

Använd när bygg och entreprenad behandlas:

7. `Riskbedomning_-_Arbetsmiljolagar_for_bygg.docx`
8. `Skyddsrond.docx`

De används för:

- arbetsplatsrisker
- riskbedömning
- arbetsberedning
- handlingsplan
- skyddsrond
- ordning och reda
- personlig skyddsutrustning
- buller
- maskiner
- transporter
- brand och nödläge

### Begränsad stödkälla

Använd endast som bakgrund och aldrig som ensam rättskälla:

9. `ISO 45001-anpassad för under 10 anställda.docx`

Dokumentet innehåller användbar information om introduktion, ansvar, risker, handlingsplaner och systematiskt arbetsmiljöarbete.

Men det innehåller även äldre hänvisningar, bland annat till tidigare AFS-struktur. Alla rättsliga påståenden måste därför verifieras innan publicering.

## Använd inte i första arbetsbatchen

Lägg följande åt sidan tills grundstrukturen är klar:

- `ONBOARDING_STEG_TILLVERKNING_SV_EN.md`
- `MULTI_INDUSTRY_ONBOARDING_BLUEPRINT.md`
- `KvalitetsGruppen_Branschspecifika_ISO_Krav_Ordlistor.md`
- `Utvardering_av_lagefterlevnad.docx`

De används senare för:

- tillverkning
- fler branscher
- ordlistor
- administratörs- och KMA-roller
- lagefterlevnadsutbildning

KMA betyder **kvalitet, miljö och arbetsmiljö**.

## Sex faser

1. Förberedelse
2. Välkomst och introduktion
3. Grundläggande krav
4. Bransch- och rollspecifik introduktion
5. Praktisk integration
6. Uppföljning och avslut

## Struktur för varje steg

```yaml
step_id:
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
statement_class:
verification_status:
version:
status:
```

### Klassificering

`statement_class` ska vara en av:

- `FACT`
- `REQUIREMENT_SUMMARY`
- `APPLICATION`
- `EXAMPLE`
- `RECOMMENDATION`
- `COMPANY_RULE`

`verification_status` ska vara en av:

- `UNVERIFIED`
- `PARTIAL`
- `VERIFIED`

Alla nya steg ska börja med:

```yaml
status: Utkast
```

## Viktiga regler

- Hitta inte på `source_ids`.
- Använd bara identifierade dokument som källa.
- Skilj mellan lagkrav, rekommendation och företagets egen rutin.
- Företagets egna policyer ska ligga i innehållslagret `Företag`.
- Generella förklaringar kan ligga i `Allmänt`.
- Kontrollplan, egenkontroll, skyddsrond och riskbedömning är olika innehållstyper.
- ÄTA, avvikelse och tillbud ska hanteras separat.
- Full eller närliggande ISO-text får inte kopieras.
- Gamla telefonnummer, tider och andra föränderliga uppgifter får inte återanvändas utan kontroll.
- Engelska texter ska vara enkel och naturlig engelska, inte ord-för-ord-översättning.

## Första uppdraget

Skapa en **kanonisk allmän onboardinggrund** genom att jämföra:

- `ONBOARDING_STEG1_ALLMAN_GRUND_SV_EN.md`
- `onboarding-policy.dotx`
- de tre policydokumenten

Leverera först en konsolideringsplan med:

1. steg som kan behållas
2. steg som behöver ändras
3. dubbletter
4. saknade steg
5. steg som ska vara företagsinnehåll
6. påståenden som kräver verifiering
7. föreslagen slutlig ID-struktur
8. rekommenderad första produktionsbatch

Skapa inte kod ännu.

Efter godkänd plan ska nästa batch vara den färdiga allmänna stegbanken på svenska och engelska.

## Svarsform

Svara:

- på svenska
- kort och tydligt
- med enkla rubriker
- med beslut och nästa steg först
- med förkortningar utskrivna första gången
- utan att göra overifierade påståenden till krav

Börja nu med konsolideringsplanen.
