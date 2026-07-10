# Onboarding Stepbank – Batch 01

**Version:** 0.1  
**Datum:** 2026-07-09  
**Status:** Utkast för sakgranskning  
**Omfattning:** Första nedbrytningen av allmän onboarding och bygg/entreprenad.

## Resultat

- **18 allmänna steg**
- **17 byggspecifika steg**
- **35 steg totalt**
- Samtliga steg har `source_ids`, villkor, ansvar, bevis och tidsregel.

## Viktiga regler före publicering

1. Alla steg är **utkast**.
2. Juridiska hänvisningar och påståenden om standardversioner i byggfilerna är inte godkända förrän de har verifierats.
3. Kontrollplan, egenkontroll, arbetsmiljöplan och interna rutiner ska visas som olika innehållstyper.
4. Företagets egna policyer och regler läggs i lagret **Företag**.
5. Källtexten har förädlats och förenklats; den har inte kopierats som fulltext.

## Steg

### GEN-001 – Planera introduktionen

```yaml
step_id: GEN-001
title: Planera introduktionen
phase: Förberedelse
category: Planering
step_type: Uppgift
content_layer: Allmänt
industry: Allmänt
job_roles:
- Alla
responsible_role: Chef
participant_role: Chef
required: Obligatoriskt
estimated_time: 15 min
instructions: Bestäm datum, plats, upplägg och vilka personer som ska delta i introduktionen.
help_text: En planerad introduktion gör att både den nyanställde och de ansvariga vet vad som ska hända.
document_links: []
completion_method: Checkbox
evidence_required: Datum och ansvarig
conditions: null
due_rule: Före första arbetsdag
approval_required: 'true: Chef'
source_ids:
- SRC-ONB-001
version: '0.1'
status: Utkast
```

### GEN-002 – Utse introduktionsansvarig och fadder

```yaml
step_id: GEN-002
title: Utse introduktionsansvarig och fadder
phase: Förberedelse
category: Roller och ansvar
step_type: Uppgift
content_layer: Allmänt
industry: Allmänt
job_roles:
- Alla
responsible_role: Chef
participant_role: Chef
required: Obligatoriskt
estimated_time: 10 min
instructions: Utse en introduktionsansvarig och vid behov en fadder eller handledare.
help_text: Den nyanställde ska veta vem som svarar på frågor och vem som ansvarar för olika delar.
document_links: []
completion_method: Bekräftelse
evidence_required: Namn och roll
conditions: null
due_rule: Före första arbetsdag
approval_required: 'true: Chef'
source_ids:
- SRC-ONB-001
version: '0.1'
status: Utkast
```

### GEN-003 – Skicka välkomst- och informationsmaterial

```yaml
step_id: GEN-003
title: Skicka välkomst- och informationsmaterial
phase: Förberedelse
category: Kommunikation
step_type: Dokument
content_layer: Allmänt
industry: Allmänt
job_roles:
- Alla
responsible_role: Administratör
participant_role: Administratör
required: Rekommenderat
estimated_time: 10 min
instructions: Skicka praktisk information, starttid, mötesplats och relevanta dokument.
help_text: Skicka bara material som är aktuellt och relevant för rollen.
document_links: []
completion_method: Bekräftelse
evidence_required: Skickat datum
conditions: null
due_rule: Senast 2 arbetsdagar före start
approval_required: 'false'
source_ids:
- SRC-ONB-001
version: '0.1'
status: Utkast
```

### GEN-004 – Förbered arbetsplats och utrustning

```yaml
step_id: GEN-004
title: Förbered arbetsplats och utrustning
phase: Förberedelse
category: Utrustning
step_type: Kontroll
content_layer: Allmänt
industry: Allmänt
job_roles:
- Alla
responsible_role: Administratör
participant_role: Administratör
required: Obligatoriskt
estimated_time: 20 min
instructions: Kontrollera arbetsplats, passerkort, e-post, telefon, arbetskläder, verktyg och övrig utrustning.
help_text: Markera sådant som inte behövs för rollen som ej relevant.
document_links: []
completion_method: Checklista
evidence_required: Genomförd checklista
conditions: null
due_rule: Före första arbetsdag
approval_required: 'true: Chef'
source_ids:
- SRC-ONB-001
version: '0.1'
status: Utkast
```

### GEN-005 – Presentera företaget

```yaml
step_id: GEN-005
title: Presentera företaget
phase: Välkomst & Introduktion
category: Företagsinformation
step_type: Information
content_layer: Allmänt
industry: Allmänt
job_roles:
- Alla
responsible_role: Chef
participant_role: Deltagare
required: Obligatoriskt
estimated_time: 15 min
instructions: Gå igenom företagets historia, verksamhet, kunder, tjänster, mål och arbetssätt.
help_text: Fokusera på vad medarbetaren behöver förstå för att komma in i arbetet.
document_links: []
completion_method: Bekräftelse
evidence_required: Bekräftelse
conditions: null
due_rule: Första arbetsdagen
approval_required: 'false'
source_ids:
- SRC-ONB-001
version: '0.1'
status: Utkast
```

### GEN-006 – Förklara organisation, ansvar och befogenheter

```yaml
step_id: GEN-006
title: Förklara organisation, ansvar och befogenheter
phase: Välkomst & Introduktion
category: Organisation
step_type: Möte
content_layer: Allmänt
industry: Allmänt
job_roles:
- Alla
responsible_role: Chef
participant_role: Deltagare
required: Obligatoriskt
estimated_time: 20 min
instructions: Visa organisationen och förklara närmaste chef, kontaktvägar, arbetsuppgifter, ansvar och befogenheter.
help_text: Använd ett enkelt organisationsschema om det finns.
document_links: []
completion_method: Bekräftelse
evidence_required: Bekräftelse och ansvarig chef
conditions: null
due_rule: Första arbetsdagen
approval_required: 'true: Chef'
source_ids:
- SRC-ONB-001
version: '0.1'
status: Utkast
```

### GEN-007 – Presentera kollegor och fadder

```yaml
step_id: GEN-007
title: Presentera kollegor och fadder
phase: Välkomst & Introduktion
category: Social introduktion
step_type: Möte
content_layer: Allmänt
industry: Allmänt
job_roles:
- Alla
responsible_role: Handledare
participant_role: Deltagare
required: Rekommenderat
estimated_time: 20 min
instructions: Presentera chefer, arbetsledare, kollegor och den utsedda faddern.
help_text: Berätta kort vad varje person ansvarar för.
document_links: []
completion_method: Checkbox
evidence_required: Genomfört datum
conditions: null
due_rule: Första arbetsdagen
approval_required: 'false'
source_ids:
- SRC-ONB-001
version: '0.1'
status: Utkast
```

### GEN-008 – Rundvandring på arbetsplatsen

```yaml
step_id: GEN-008
title: Rundvandring på arbetsplatsen
phase: Välkomst & Introduktion
category: Arbetsplats
step_type: Uppgift
content_layer: Allmänt
industry: Allmänt
job_roles:
- Alla
responsible_role: Handledare
participant_role: Deltagare
required: Obligatoriskt
estimated_time: 30 min
instructions: Visa arbetsytor, personalutrymmen, nödutgångar, samlingsplats, första hjälpen och relevanta arbetsområden.
help_text: Anpassa rundvandringen efter arbetsplatsens risker och den nyanställdes roll.
document_links: []
completion_method: Bekräftelse
evidence_required: Genomfört datum
conditions: null
due_rule: Första arbetsdagen
approval_required: 'false'
source_ids:
- SRC-ONB-001
version: '0.1'
status: Utkast
```

### GEN-009 – Gå igenom arbetstider, raster och rapportering

```yaml
step_id: GEN-009
title: Gå igenom arbetstider, raster och rapportering
phase: Grundläggande krav
category: Administration
step_type: Information
content_layer: Allmänt
industry: Allmänt
job_roles:
- Alla
responsible_role: Administratör
participant_role: Deltagare
required: Obligatoriskt
estimated_time: 15 min
instructions: Förklara arbetstider, raster, flextid, mötestider, tidrapportering och vart underlag lämnas.
help_text: Visa företagets aktuella rutiner i stället för gamla exempelbelopp eller gamla tider.
document_links: []
completion_method: Bekräftelse
evidence_required: Bekräftelse
conditions: null
due_rule: Senast första veckan
approval_required: 'false'
source_ids:
- SRC-ONB-001
version: '0.1'
status: Utkast
```

### GEN-010 – Gå igenom frånvaro och ledighet

```yaml
step_id: GEN-010
title: Gå igenom frånvaro och ledighet
phase: Grundläggande krav
category: Personalrutiner
step_type: Information
content_layer: Allmänt
industry: Allmänt
job_roles:
- Alla
responsible_role: Administratör
participant_role: Deltagare
required: Obligatoriskt
estimated_time: 15 min
instructions: Förklara hur sjukfrånvaro, vård av barn, semester och annan ledighet anmäls eller ansöks.
help_text: Ange vem som kontaktas och när anmälan ska göras. Juridisk information ska hållas uppdaterad separat.
document_links: []
completion_method: Bekräftelse
evidence_required: Bekräftelse
conditions: null
due_rule: Senast första veckan
approval_required: 'false'
source_ids:
- SRC-ONB-001
version: '0.1'
status: Utkast
```

### GEN-011 – Arbetsmiljöorganisation och kontaktvägar

```yaml
step_id: GEN-011
title: Arbetsmiljöorganisation och kontaktvägar
phase: Grundläggande krav
category: Arbetsmiljö
step_type: Information
content_layer: Allmänt
industry: Allmänt
job_roles:
- Alla
responsible_role: Arbetsmiljöansvarig
participant_role: Deltagare
required: Obligatoriskt
estimated_time: 15 min
instructions: Presentera skyddsombud, arbetsmiljöansvarig, företagshälsovård och interna kontaktvägar.
help_text: Telefonnummer och externa kontaktuppgifter måste kontrolleras före publicering.
document_links: []
completion_method: Bekräftelse
evidence_required: Bekräftelse
conditions: null
due_rule: Första veckan
approval_required: 'false'
source_ids:
- SRC-ONB-001
version: '0.1'
status: Utkast
```

### GEN-012 – Rutiner vid olycka, brand och nödläge

```yaml
step_id: GEN-012
title: Rutiner vid olycka, brand och nödläge
phase: Grundläggande krav
category: Säkerhet
step_type: Kunskapskontroll
content_layer: Allmänt
industry: Allmänt
job_roles:
- Alla
responsible_role: Arbetsmiljöansvarig
participant_role: Deltagare
required: Obligatoriskt
estimated_time: 20 min
instructions: Gå igenom larmvägar, 112, utrymning, samlingsplats, första hjälpen och intern rapportering.
help_text: Avsluta med två till fyra enkla kontrollfrågor om vem som kontaktas och vart personen ska gå.
document_links: []
completion_method: Quiz
evidence_required: Quizresultat
conditions: null
due_rule: Första arbetsdagen
approval_required: 'true: Arbetsmiljöansvarig'
source_ids:
- SRC-ONB-001
version: '0.1'
status: Utkast
```

### GEN-013 – Ordnings-, säkerhets- och skötselregler

```yaml
step_id: GEN-013
title: Ordnings-, säkerhets- och skötselregler
phase: Grundläggande krav
category: Arbetsplatsregler
step_type: Dokument
content_layer: Allmänt
industry: Allmänt
job_roles:
- Alla
responsible_role: Chef
participant_role: Deltagare
required: Obligatoriskt
estimated_time: 15 min
instructions: Läs och gå igenom regler för ordning, städning, källsortering, gemensamma utrymmen och säkerhet.
help_text: Företagets egna regler ska visas som företagsinnehåll, inte som allmän lag.
document_links: []
completion_method: Bekräftelse
evidence_required: Bekräftelse
conditions: null
due_rule: Första veckan
approval_required: 'false'
source_ids:
- SRC-ONB-001
version: '0.1'
status: Utkast
```

### GEN-014 – Ta del av företagets policyer

```yaml
step_id: GEN-014
title: Ta del av företagets policyer
phase: Grundläggande krav
category: Policy
step_type: Dokument
content_layer: Företag
industry: Allmänt
job_roles:
- Alla
responsible_role: Chef
participant_role: Deltagare
required: Obligatoriskt
estimated_time: 20 min
instructions: Läs relevanta policyer, exempelvis arbetsmiljöpolicy samt alkohol- och drogpolicy.
help_text: Endast företagets godkända och aktuella versioner ska användas.
document_links: []
completion_method: Signering
evidence_required: Signering
conditions: null
due_rule: Första veckan
approval_required: 'true: Chef'
source_ids:
- SRC-ONB-001
version: '0.1'
status: Utkast
```

### GEN-015 – Kvittera företagets egendom

```yaml
step_id: GEN-015
title: Kvittera företagets egendom
phase: Praktisk integration
category: Utrustning
step_type: Bekräftelse
content_layer: Företag
industry: Allmänt
job_roles:
- Alla
responsible_role: Administratör
participant_role: Deltagare
required: Vid behov
estimated_time: 10 min
instructions: Registrera mottagna nycklar, telefon, verktyg, arbetskläder och personlig skyddsutrustning.
help_text: Varje utlämnad sak ska kunna kopplas till person, datum och eventuell återlämning.
document_links: []
completion_method: Signering
evidence_required: Signering och inventarielista
conditions: Om utrustning lämnas ut
due_rule: Vid utlämning
approval_required: 'true: Administratör'
source_ids:
- SRC-ONB-001
version: '0.1'
status: Utkast
```

### GEN-016 – Rapportera avvikelse, tillbud och förbättringsförslag

```yaml
step_id: GEN-016
title: Rapportera avvikelse, tillbud och förbättringsförslag
phase: Praktisk integration
category: Förbättring
step_type: Kunskapskontroll
content_layer: Allmänt
industry: Allmänt
job_roles:
- Alla
responsible_role: KMA-ansvarig
participant_role: Deltagare
required: Obligatoriskt
estimated_time: 15 min
instructions: Visa hur medarbetaren rapporterar avvikelser, tillbud och förbättringsförslag.
help_text: KMA betyder kvalitet, miljö och arbetsmiljö. Förklara skillnaden mellan ett fel, ett tillbud och ett förbättringsförslag.
document_links: []
completion_method: Quiz
evidence_required: Quizresultat
conditions: null
due_rule: Första veckan
approval_required: 'false'
source_ids:
- SRC-ONB-001
version: '0.1'
status: Utkast
```

### GEN-017 – Bekräfta genomförd introduktion

```yaml
step_id: GEN-017
title: Bekräfta genomförd introduktion
phase: Uppföljning & avslut
category: Slutförande
step_type: Bekräftelse
content_layer: Allmänt
industry: Allmänt
job_roles:
- Alla
responsible_role: Chef
participant_role: Deltagare
required: Obligatoriskt
estimated_time: 10 min
instructions: Bekräfta vilka områden som har gåtts igenom och markera kvarstående punkter.
help_text: Bekräftelsen ska visa ansvarig, datum och deltagarens signering eller digitala godkännande.
document_links: []
completion_method: Signering
evidence_required: Signering och datum
conditions: null
due_rule: När grundintroduktionen är klar
approval_required: 'true: Chef'
source_ids:
- SRC-ONB-001
version: '0.1'
status: Utkast
```

### GEN-018 – Följ upp efter 30 dagar

```yaml
step_id: GEN-018
title: Följ upp efter 30 dagar
phase: Uppföljning & avslut
category: Uppföljning
step_type: Möte
content_layer: Allmänt
industry: Allmänt
job_roles:
- Alla
responsible_role: Chef
participant_role: Deltagare
required: Obligatoriskt
estimated_time: 30 min
instructions: Följ upp trivsel, arbetsuppgifter, stödbehov, kunskapsluckor och planerade åtgärder.
help_text: Dokumentera bara relevanta arbetsrelaterade uppgifter och undvik onödiga personuppgifter.
document_links: []
completion_method: Godkännande
evidence_required: Mötesanteckning och åtgärder
conditions: null
due_rule: 30 dagar efter start
approval_required: 'true: Chef'
source_ids:
- SRC-ONB-001
version: '0.1'
status: Utkast
```

### BYGG-001 – Presentera projektorganisation och kontaktvägar

```yaml
step_id: BYGG-001
title: Presentera projektorganisation och kontaktvägar
phase: Bransch- & rollspecifik introduktion
category: Projektorganisation
step_type: Information
content_layer: Bransch
industry: Bygg
job_roles:
- Yrkesarbetare
- Arbetsledare
- Platschef
- Projektledare
- KMA-ansvarig
responsible_role: Projektledare
participant_role: Deltagare
required: Obligatoriskt
estimated_time: 15 min
instructions: Visa projektets roller, kontaktpersoner och ansvar för kvalitet, miljö och arbetsmiljö.
help_text: Projektroll och företagsroll ska visas separat.
document_links: []
completion_method: Bekräftelse
evidence_required: Bekräftelse
conditions: Om bransch = Bygg och deltagaren arbetar i projekt
due_rule: Före arbete i projektet
approval_required: 'true: Projektledare'
source_ids:
- SRC-BYG-F02
- SRC-BYG-F03
version: '0.1'
status: Utkast
```

### BYGG-002 – Presentera beställarens organisation

```yaml
step_id: BYGG-002
title: Presentera beställarens organisation
phase: Bransch- & rollspecifik introduktion
category: Beställare
step_type: Information
content_layer: Bransch
industry: Bygg
job_roles:
- Arbetsledare
- Platschef
- Projektledare
- KMA-ansvarig
responsible_role: Projektledare
participant_role: Deltagare
required: Rekommenderat
estimated_time: 10 min
instructions: Gå igenom beställarens kontaktpersoner, projektansvar och relevanta kontaktvägar.
help_text: Källorna för Flik 2 och Flik 3 behöver dubblettkontrolleras innan slutlig publicering.
document_links: []
completion_method: Bekräftelse
evidence_required: Bekräftelse
conditions: Om rollen har kontakt med beställaren
due_rule: Före första byggmötet
approval_required: 'false'
source_ids:
- SRC-BYG-F02
- SRC-BYG-F03
version: '0.1'
status: Utkast
```

### BYGG-003 – Kontrollera underentreprenörens organisation

```yaml
step_id: BYGG-003
title: Kontrollera underentreprenörens organisation
phase: Förberedelse
category: Leverantörskedja
step_type: Kontroll
content_layer: Bransch
industry: Bygg
job_roles:
- Platschef
- Projektledare
- KMA-ansvarig
responsible_role: Projektledare
participant_role: Projektledare
required: Obligatoriskt
estimated_time: 20 min
instructions: Registrera underentreprenörens kontaktpersoner och ansvariga för kvalitet, miljö och arbetsmiljö.
help_text: Ansvar och kompetens ska verifieras utifrån projektets faktiska krav.
document_links: []
completion_method: Checklista
evidence_required: Kontaktlista och godkännande
conditions: Om underentreprenör deltar
due_rule: Före produktionsstart
approval_required: 'true: Platschef'
source_ids:
- SRC-BYG-F04
version: '0.1'
status: Utkast
```

### BYGG-004 – Gå igenom projektets kvalitetsplan

```yaml
step_id: BYGG-004
title: Gå igenom projektets kvalitetsplan
phase: Bransch- & rollspecifik introduktion
category: Kvalitet
step_type: Dokument
content_layer: Bransch
industry: Bygg
job_roles:
- Arbetsledare
- Platschef
- Projektledare
- KMA-ansvarig
responsible_role: Kvalitetsansvarig
participant_role: Deltagare
required: Obligatoriskt
estimated_time: 30 min
instructions: Gå igenom projektkrav, ansvar, dokumentstyrning, kontrollpunkter, egenkontroller och avvikelsehantering.
help_text: Använd endast verifierade kravhänvisningar. Framtida ISO-utgåvor ska inte presenteras som gällande krav utan kontroll.
document_links: []
completion_method: Bekräftelse
evidence_required: Bekräftelse
conditions: Om kvalitetsplan finns för projektet
due_rule: Före produktionsstart
approval_required: 'true: Kvalitetsansvarig'
source_ids:
- SRC-BYG-F05
version: '0.1'
status: Utkast
```

### BYGG-005 – Gå igenom projektets miljöplan

```yaml
step_id: BYGG-005
title: Gå igenom projektets miljöplan
phase: Bransch- & rollspecifik introduktion
category: Miljö
step_type: Dokument
content_layer: Bransch
industry: Bygg
job_roles:
- Yrkesarbetare
- Arbetsledare
- Platschef
- Projektledare
- KMA-ansvarig
responsible_role: Miljöansvarig
participant_role: Deltagare
required: Obligatoriskt
estimated_time: 25 min
instructions: Gå igenom källsortering, kemikalier, material, transporter, miljörisker och rapportering.
help_text: Skilj projektets egna mål och rutiner från lagkrav.
document_links: []
completion_method: Bekräftelse
evidence_required: Bekräftelse
conditions: Om miljöplan finns för projektet
due_rule: Före produktionsstart
approval_required: 'true: Miljöansvarig'
source_ids:
- SRC-BYG-F06
- SRC-BYG-F08
version: '0.1'
status: Utkast
```

### BYGG-006 – Gå igenom arbetsmiljöplan och risker

```yaml
step_id: BYGG-006
title: Gå igenom arbetsmiljöplan och risker
phase: Bransch- & rollspecifik introduktion
category: Arbetsmiljö
step_type: Möte
content_layer: Bransch
industry: Bygg
job_roles:
- Yrkesarbetare
- Arbetsledare
- Platschef
- Projektledare
- KMA-ansvarig
responsible_role: Arbetsmiljöansvarig
participant_role: Deltagare
required: Obligatoriskt
estimated_time: 30 min
instructions: Gå igenom projektets arbetsmiljöplan, identifierade risker, skyddsregler, rapportering och samordning.
help_text: Riskerna ska anpassas till det verkliga projektet och den aktuella rollen.
document_links: []
completion_method: Bekräftelse
evidence_required: Bekräftelse
conditions: Om deltagaren ska arbeta på byggarbetsplats
due_rule: Före första arbetsmomentet
approval_required: 'true: Arbetsmiljöansvarig'
source_ids:
- SRC-BYG-F07
version: '0.1'
status: Utkast
```

### BYGG-007 – Kontrollera personlig skyddsutrustning

```yaml
step_id: BYGG-007
title: Kontrollera personlig skyddsutrustning
phase: Bransch- & rollspecifik introduktion
category: Skyddsutrustning
step_type: Kontroll
content_layer: Bransch
industry: Bygg
job_roles:
- Yrkesarbetare
- Arbetsledare
- Platschef
responsible_role: Arbetsledare
participant_role: Deltagare
required: Obligatoriskt
estimated_time: 10 min
instructions: Kontrollera att rätt arbetskläder och personlig skyddsutrustning har lämnats ut och passar arbetsuppgifterna.
help_text: PPE betyder Personal Protective Equipment, på svenska personlig skyddsutrustning.
document_links: []
completion_method: Signering
evidence_required: Kvittens och kontrollstatus
conditions: Om arbete kräver skyddsutrustning
due_rule: Före första arbetsmomentet
approval_required: 'true: Arbetsledare'
source_ids:
- SRC-ONB-001
- SRC-BYG-F07
version: '0.1'
status: Utkast
```

### BYGG-008 – Kontrollera maskiner, fordon och förarbehörighet

```yaml
step_id: BYGG-008
title: Kontrollera maskiner, fordon och förarbehörighet
phase: Bransch- & rollspecifik introduktion
category: Maskinsäkerhet
step_type: Kontroll
content_layer: Bransch
industry: Bygg
job_roles:
- Maskinförare
- Yrkesarbetare
- Arbetsledare
- Platschef
responsible_role: Arbetsledare
participant_role: Deltagare
required: Obligatoriskt
estimated_time: 20 min
instructions: Kontrollera maskintyp, identitet, service, tillämplig besiktning och dokumenterad förarbehörighet.
help_text: Exakta besiktnings- och behörighetskrav ska verifieras för varje maskin.
document_links: []
completion_method: Filuppladdning
evidence_required: Intyg eller kontrollstatus
conditions: Om deltagaren använder maskin eller fordon
due_rule: Före användning
approval_required: 'true: Platschef'
source_ids:
- SRC-BYG-F15
version: '0.1'
status: Utkast
```

### BYGG-009 – Gå igenom säkerhetsdatablad och kemikalier

```yaml
step_id: BYGG-009
title: Gå igenom säkerhetsdatablad och kemikalier
phase: Bransch- & rollspecifik introduktion
category: Kemikalier
step_type: Dokument
content_layer: Bransch
industry: Bygg
job_roles:
- Yrkesarbetare
- Arbetsledare
- Platschef
- Miljöansvarig
responsible_role: Miljöansvarig
participant_role: Deltagare
required: Obligatoriskt
estimated_time: 20 min
instructions: Visa vilka kemikalier som används, var säkerhetsdatabladen finns och hur produkterna ska hanteras, märkas och förvaras.
help_text: SDS betyder Safety Data Sheet, på svenska säkerhetsdatablad.
document_links: []
completion_method: Kunskapskontroll
evidence_required: Quizresultat
conditions: Om kemikalier används i rollen eller projektet
due_rule: Före användning av kemikalien
approval_required: 'true: Miljöansvarig'
source_ids:
- SRC-BYG-F17
version: '0.1'
status: Utkast
```

### BYGG-010 – Öva projektets nödlägesrutiner

```yaml
step_id: BYGG-010
title: Öva projektets nödlägesrutiner
phase: Grundläggande krav
category: Nödläge
step_type: Kunskapskontroll
content_layer: Bransch
industry: Bygg
job_roles:
- Alla projektroller
responsible_role: Platschef
participant_role: Deltagare
required: Obligatoriskt
estimated_time: 20 min
instructions: Gå igenom larmväg, ansvariga personer, utrymning, samlingsplats och rutiner vid person- eller miljöolycka.
help_text: Telefonnummer, kontaktpersoner och övningsfrekvens ska vara projektspecifika och verifierade.
document_links: []
completion_method: Quiz
evidence_required: Quizresultat och genomfört datum
conditions: Om deltagaren arbetar i byggprojekt
due_rule: Före produktionsstart
approval_required: 'true: Platschef'
source_ids:
- SRC-BYG-F18
version: '0.1'
status: Utkast
```

### BYGG-011 – Förstå kontrollplanen

```yaml
step_id: BYGG-011
title: Förstå kontrollplanen
phase: Bransch- & rollspecifik introduktion
category: Kontrollplan
step_type: Information
content_layer: Bransch
industry: Bygg
job_roles:
- Arbetsledare
- Platschef
- Projektledare
- Kontrollansvarig
responsible_role: Projektledare
participant_role: Deltagare
required: Obligatoriskt
estimated_time: 25 min
instructions: Förklara vilka kontroller som ingår, vem som utför dem, vilket underlag som används och hur resultat signeras.
help_text: Kontrollplan enligt PBL ska hållas skild från företagets egenkontroller.
document_links: []
completion_method: Bekräftelse
evidence_required: Bekräftelse
conditions: Om rollen berör kontrollplanen
due_rule: Före första kontrollmomentet
approval_required: 'true: Projektledare'
source_ids:
- SRC-BYG-F12
version: '0.1'
status: Utkast
```

### BYGG-012 – Genomför och dokumentera egenkontroll

```yaml
step_id: BYGG-012
title: Genomför och dokumentera egenkontroll
phase: Praktisk integration
category: Egenkontroll
step_type: Uppgift
content_layer: Bransch
industry: Bygg
job_roles:
- Yrkesarbetare
- Arbetsledare
- Platschef
responsible_role: Arbetsledare
participant_role: Deltagare
required: Obligatoriskt
estimated_time: 15 min
instructions: Visa hur en egenkontroll fylls i, hur avvikelse markeras och hur foto eller annat bevis bifogas.
help_text: Egenkontroll betyder att verksamheten själv kontrollerar att arbetet är utfört enligt rätt underlag.
document_links: []
completion_method: Filuppladdning
evidence_required: Ifylld egenkontroll
conditions: Om rollen utför kontrollmoment
due_rule: Vid varje tillämpligt arbetsmoment
approval_required: 'true: Arbetsledare'
source_ids:
- SRC-BYG-F13
version: '0.1'
status: Utkast
```

### BYGG-013 – Samla in underentreprenörers egenkontroller

```yaml
step_id: BYGG-013
title: Samla in underentreprenörers egenkontroller
phase: Praktisk integration
category: Leverantörskedja
step_type: Kontroll
content_layer: Bransch
industry: Bygg
job_roles:
- Arbetsledare
- Platschef
- Projektledare
- KMA-ansvarig
responsible_role: Platschef
participant_role: Platschef
required: Obligatoriskt
estimated_time: 15 min
instructions: Registrera vilka egenkontroller som har kommit in, från vem, datum och vilket arbetsmoment de gäller.
help_text: Varje rad ska länkas till det faktiska dokumentet och rätt version.
document_links: []
completion_method: Filuppladdning
evidence_required: Dokumentlänk och mottagningsdatum
conditions: Om underentreprenörer utför arbete
due_rule: Löpande enligt projektplan
approval_required: 'true: Platschef'
source_ids:
- SRC-BYG-F14
version: '0.1'
status: Utkast
```

### BYGG-014 – Rapportera avvikelse och följ åtgärden

```yaml
step_id: BYGG-014
title: Rapportera avvikelse och följ åtgärden
phase: Praktisk integration
category: Avvikelse
step_type: Uppgift
content_layer: Bransch
industry: Bygg
job_roles:
- Alla projektroller
responsible_role: Platschef
participant_role: Deltagare
required: Obligatoriskt
estimated_time: 15 min
instructions: Registrera händelse, omedelbar åtgärd, grundorsak, korrigerande åtgärd, ansvarig och uppföljning.
help_text: ÄTA betyder ändring, tillägg och avgående arbete. ÄTA ska hanteras separat från kvalitets- eller arbetsmiljöavvikelse.
document_links: []
completion_method: Filuppladdning
evidence_required: Avvikelserapport
conditions: När en avvikelse upptäcks
due_rule: Omedelbart eller enligt projektets rutin
approval_required: 'true: Platschef'
source_ids:
- SRC-BYG-F16
version: '0.1'
status: Utkast
```

### BYGG-015 – Delta i byggmöte och ta emot beslut

```yaml
step_id: BYGG-015
title: Delta i byggmöte och ta emot beslut
phase: Praktisk integration
category: Möten
step_type: Möte
content_layer: Bransch
industry: Bygg
job_roles:
- Arbetsledare
- Platschef
- Projektledare
- KMA-ansvarig
responsible_role: Projektledare
participant_role: Deltagare
required: Vid behov
estimated_time: 30–90 min
instructions: Gå igenom dagordning, kvalitet, miljö, arbetsmiljö, tidplan, handlingar och beslut.
help_text: Beslut ska kopplas till ansvarig och datum. Kravet på möte och deltagande ska bestämmas av projektets avtal och behov.
document_links: []
completion_method: Bekräftelse
evidence_required: Närvaro och tilldelade åtgärder
conditions: Om rollen deltar i byggmöte
due_rule: Enligt mötesplan
approval_required: 'false'
source_ids:
- SRC-BYG-F10
version: '0.1'
status: Utkast
```

### BYGG-016 – Använd rätt ritning och dokumentversion

```yaml
step_id: BYGG-016
title: Använd rätt ritning och dokumentversion
phase: Praktisk integration
category: Dokumentstyrning
step_type: Kunskapskontroll
content_layer: Bransch
industry: Bygg
job_roles:
- Yrkesarbetare
- Arbetsledare
- Platschef
- Projektledare
responsible_role: Arbetsledare
participant_role: Deltagare
required: Obligatoriskt
estimated_time: 15 min
instructions: Visa var godkända handlingar finns, hur aktuell version känns igen och hur ändringar rapporteras.
help_text: Arbete får inte styras av en gammal eller oklar dokumentversion.
document_links: []
completion_method: Quiz
evidence_required: Quizresultat
conditions: Om rollen använder bygghandlingar
due_rule: Före första arbetsmomentet
approval_required: 'true: Arbetsledare'
source_ids:
- SRC-BYG-F05
- SRC-BYG-F11
version: '0.1'
status: Utkast
```

### BYGG-017 – Rivning och materialinventering

```yaml
step_id: BYGG-017
title: Rivning och materialinventering
phase: Bransch- & rollspecifik introduktion
category: Rivning
step_type: Kontroll
content_layer: Bransch
industry: Bygg
job_roles:
- Rivare
- Arbetsledare
- Platschef
- Projektledare
- Miljöansvarig
responsible_role: Projektledare
participant_role: Deltagare
required: Obligatoriskt
estimated_time: 30 min
instructions: Gå igenom rivningens omfattning, materialinventering, farligt avfall, sortering, transport och dokumentation.
help_text: Steget ska bara visas när projektet innehåller rivning. Rättsliga krav måste verifieras för projektet.
document_links: []
completion_method: Bekräftelse
evidence_required: Bekräftelse och dokumentlänk
conditions: Om projektet innehåller rivning
due_rule: Före rivningsstart
approval_required: 'true: Projektledare'
source_ids:
- SRC-BYG-F09
version: '0.1'
status: Utkast
```

## Nästa granskningsrunda

- Kontrollera benämningar och ansvar mot företagets verkliga arbetssätt.
- Verifiera lagar, föreskrifter, telefonnummer och standardversioner.
- Bestäm vilka steg som ska vara obligatoriska i grundmallen.
- Lägg därefter till rollpaket för yrkesarbetare, arbetsledare, platschef, projektledare och KMA-ansvarig.
