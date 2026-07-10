# Uppföljningsprompt – Onboarding App Version 2

Detta projekt gäller endast **Onboarding App Version 2**.

## Projektets mål

Vi ska utveckla en modern onboardingprodukt som bygger på en **hybridmodell med stegbank**.

Onboarding får inte reduceras till en frågebank. Den ska kunna innehålla:

- information
- uppgifter
- dokument
- möten
- kontroller
- bekräftelser
- kunskapsfrågor
- uppföljning

Appen ska kunna återanvända en gemensam grund, men samtidigt anpassas efter:

1. allmän onboarding
2. bransch
3. befattning
4. företagets egna innehåll

## Styrande dokument

Utgå i första hand från:

1. `ONBOARDING_CONTENT_BLUEPRINT.md`
2. `MULTI_INDUSTRY_ONBOARDING_BLUEPRINT.md`
3. `ONBOARDING_STEG1_ALLMAN_GRUND_SV_EN.md`
4. `ONBOARDING_STEG2_BYGG_ENTREPRENAD_SV_EN.md`

Dessa beskriver huvudarkitekturen, sex faser, fyra innehållslager, svenska och engelska texter samt första allmänna och byggspecifika steg.

## Stödmaterial

Använd följande när innehållet är relevant:

- `ONBOARDING_STEG_TILLVERKNING_SV_EN.md`
- `QA_och_Ordlistor_per_Bransch.md`
- `Introduktion - nyanställd.docx`
- uppladdade byggpärm-filer, särskilt:
  - Kvalitetsplan
  - Miljöplan
  - Arbetsmiljöplan
  - Miljöanalys
  - Kontrollplan
  - Egenkontroller
  - Maskininventering
  - Avvikelserapport
  - Säkerhetsdatablad
  - Nödlägesberedskap

Använd tidigare framtagna filer om de finns i projektet:

- `ONBOARDING_SOURCE_INVENTORY_V0_1.md`
- `ONBOARDING_STEPBANK_BATCH_01.md`

## Viktiga beslut

### Produktmodell

- Appen ska ha en **stegbank**, inte bara frågor.
- Originalmallar från KvalitetsGruppen får inte ändras av kunden.
- Kunden arbetar i en kopia av en grundmall.
- Företaget ska kunna ändra texter, lägga till steg, inaktivera steg, ändra ordning och lägga till dokument.
- Varje publicerad onboarding ska använda en låst mallversion eller snapshot.
- Historik ska inte ändras när en mall uppdateras senare.

### Sex faser

1. Förberedelse
2. Välkomst och introduktion
3. Grundläggande krav
4. Bransch- och rollspecifik introduktion
5. Praktisk integration
6. Uppföljning och avslut

### Fyra innehållslager

1. Allmänt
2. Bransch
3. Befattning
4. Företag

## Viktiga kvalitetsregler

Materialet ska inte kopieras eller godkännas automatiskt.

Följ dessa regler:

- Alla nya steg ska börja med status `Utkast`.
- Ändra inte status till `Publicerad` innan sakgranskning är genomförd.
- Påståenden om lagar, föreskrifter, ISO-standarder och framtida standardversioner ska verifieras innan de presenteras som krav.
- Skilj tydligt mellan:
  - bindande krav
  - företagets rutin
  - rekommendation
  - exempel
- Fullständig eller närliggande ISO-standardtext får inte kopieras.
- Använd egenformulerade sammanfattningar.
- Kontrollplan enligt PBL (Plan- och bygglagen), företagets egenkontroll, arbetsmiljöplan och interna checklistor ska behandlas som olika innehållstyper.
- ÄTA (ändring, tillägg och avgående arbete), avvikelse och tillbud ska ha separata flöden.
- Exakta tider, belopp, telefonnummer och myndighetsuppgifter från äldre dokument ska inte återanvändas utan kontroll.
- `source_ids` måste vara verkliga, konsekventa och spårbara. Hitta inte på käll-ID:n som saknar registrerad källa.

## Kända problem att hantera

- Flik 2 och Flik 3 verkar innehålla samma eller nästan samma dokument. Kontrollera dubblett innan båda används.
- Flera byggdokument innehåller påståenden om framtida ISO-utgåvor och regelverk som inte är verifierade.
- Några befintliga steg är märkta `Publicerad` trots att de fortfarande behöver sakgranskas.
- Det finns överlapp mellan:
  - den första allmänna stegbanken
  - byggpaketet
  - `ONBOARDING_STEPBANK_BATCH_01.md`
- Dubbletter ska slås samman till en kanonisk masterversion, inte lagras flera gånger.

## Struktur för varje steg

Använd följande modell:

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

### Förklaring av nya kvalitetsfält

- `statement_class`: FACT | REQUIREMENT_SUMMARY | APPLICATION | EXAMPLE | RECOMMENDATION | COMPANY_RULE
- `verification_status`: UNVERIFIED | PARTIAL | VERIFIED

## Aktuell prioritering

Arbeta i denna ordning:

### Steg 1 – Konsolidera allmän grund

Jämför och slå samman:

- `ONBOARDING_STEG1_ALLMAN_GRUND_SV_EN.md`
- allmänna steg i `ONBOARDING_STEPBANK_BATCH_01.md`
- relevanta delar från `Introduktion - nyanställd.docx`

Målet är en kanonisk allmän master utan dubbletter.

### Steg 2 – Konsolidera bygg och entreprenad

Jämför och slå samman:

- `ONBOARDING_STEG2_BYGG_ENTREPRENAD_SV_EN.md`
- byggstegen i `ONBOARDING_STEPBANK_BATCH_01.md`
- relevanta byggpärm-källor

Målet är ett första komplett byggpaket utan dubbletter och utan overifierade kravformuleringar.

### Steg 3 – Skapa första rollpaketen

Prioritera:

1. Yrkesarbetare / snickare
2. Arbetsledare
3. Platschef
4. Projektledare
5. Administratör / KMA-ansvarig

KMA betyder kvalitet, miljö och arbetsmiljö.

### Steg 4 – Använd tillverkning som nästa testbransch

`ONBOARDING_STEG_TILLVERKNING_SV_EN.md` ska användas som grund, men först efter att den allmänna och byggspecifika masterstrukturen är stabil.

### Steg 5 – Fler branscher senare

Använd `QA_och_Ordlistor_per_Bransch.md` som stöd för enkelt språk, hjälptexter och framtida branschpaket.

Det dokumentet är stödmaterial, inte automatiskt verifierad juridisk källa.

## Första uppdraget i denna chatt

Gör först en **konsolideringsplan**, inte kod.

Leverera:

1. vilka filer som är styrande
2. vilka filer som är stödmaterial
3. vilka steg som överlappar
4. vilka steg som bör slås samman
5. vilka steg som saknas
6. vilka rättsliga eller standardrelaterade påståenden som kräver verifiering
7. rekommenderad kanonisk ID-struktur
8. rekommenderad ordning för fortsatt arbete

Avsluta med ett tydligt förslag på nästa arbetsbatch.

## Svarsform

Svara:

- kort och tydligt
- på svenska
- med enkla rubriker
- med fakta och nästa steg först
- förklara tekniska ord kort första gången
- skriv ut förkortningar första gången
- skilj tydligt mellan beslut, förslag och sådant som behöver verifieras

Börja nu med konsolideringsplanen.
