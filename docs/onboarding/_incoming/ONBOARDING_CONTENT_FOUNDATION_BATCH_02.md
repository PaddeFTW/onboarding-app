# Onboarding Content Foundation – Batch 02

**Version:** 0.1  
**Datum:** 2026-07-09  
**Status:** DRAFT  
**Syfte:** Förädla KvalitetsGruppens beprövade produkter till en modern, enkel och spårbar Onboarding App utan att ändra originalkällorna.

## 1. Beslut

Onboarding App Version 2 ska använda följande produktprincip:

1. **Originalen bevaras oförändrade** i kunskapsbankens källager.
2. **Stegbanken äger inte originaltexten.** Den innehåller korta, egenformulerade steg med `source_ids`.
3. **Företagets dokument länkas till stegen**, i stället för att hela policyer kopieras in.
4. **Allmän grund kompletteras med befattning, bransch och företagets egna regler.**
5. **Uppföljning är en del av onboardingen**, inte en separat eftertanke.
6. **Resultat ska kunna leda till en handlingsplan** med ansvar, tidsram och uppföljning.

## 2. Vad de nya källorna tillför

### A. Förberedelse och introduktionsplan

Källa: `FORM-HR-ONBOARDING-001`

Ger underlag för:

- planera introduktionen
- utse ansvariga för olika områden
- bestämma mötestid och mötesplats
- skicka informationsmaterial
- förbereda arbetsplats, passerkort, kläder, telefon och e-post
- planera uppföljningssamtal

### B. Befattning och rollpaket

Källa: `FORM-HR-ROLE-001`

Ger en grundmodell för varje befattning:

```yaml
role_profile:
  role_id:
  title:
  purpose:
  substitute_role:
  responsibility_areas:
  work_tasks:
  competence_requirements:
  authorities:
  reporting_to:
  reporting_requirements:
  incident_reporting:
  required_documents:
  required_training:
  approval_role:
  version:
  status:
```

Detta gör att appen kan skapa rollpaket för exempelvis:

- yrkesarbetare
- arbetsledare
- platschef
- projektledare
- administratör
- KMA-ansvarig

KMA betyder **kvalitet, miljö och arbetsmiljö**.

### C. Företagskultur och personalpolicy

Källa: `PRD-HR-POLICY-001`

Används till korta steg om:

- företagets syn på medarbetare
- trivsel och respekt
- ordning och gemensamt ansvar
- kommunikation och delaktighet
- arbetsbelastning, diskriminering och kränkande särbehandling
- kreativitet och samarbete

Regel: Företagets faktiska policy ska ligga i innehållslagret `Företag`. Den allmänna stegbanken får endast innehålla en neutral introduktion och en plats för företagets dokument.

### D. Uppföljningssamtal

Källa: `FORM-HR-DIALOGUE-001`

Materialet delas upp i fyra moment:

1. förbered samtalet
2. genomför samtalet
3. dokumentera överenskommelser
4. följ upp åtgärder

Lämpliga frågor för onboardingens 30- och 90-dagars uppföljning:

- Är arbetsuppgifterna tydliga?
- Vet du vilket resultat som förväntas?
- Har du tillräcklig information och rätt verktyg?
- Fungerar samarbetet med chef och kollegor?
- Hur upplever du arbetsbelastning och arbetsmiljö?
- Behöver ansvar eller befogenheter förtydligas?
- Vilken utbildning eller vilket stöd behöver du?
- Finns något som företaget bör förbättra?

### E. Kort onboarding-enkät

Källor:

- `FORM-HR-SURVEY-001`
- `GUIDE-HR-SURVEY-001`
- `DATA-HR-SURVEY-001`

Den fullständiga medarbetarenkäten ska inte läggas in som en del av varje onboarding. I stället skapas ett kort **onboarding-pulstest**.

Rekommenderade påståenden:

1. Jag vet vad som förväntas av mig.
2. Jag har den information jag behöver för att utföra mitt arbete.
3. Jag har rätt material, verktyg och behörigheter.
4. Jag vet vem jag ska kontakta när jag behöver hjälp.
5. Jag förstår mina arbetsuppgifter, mitt ansvar och mina befogenheter.
6. Jag vet hur jag rapporterar avvikelser, incidenter och förbättringsförslag.
7. Jag känner till de viktigaste arbetsmiljöriskerna i mitt arbete.
8. Jag upplever att jag har fått en bra introduktion.
9. Jag känner mig välkommen och respekterad.
10. Jag vet vilket stöd eller vilken utbildning som finns kvar att genomföra.

Första versionen kan återanvända källans skala `1–6`, men skalan ska vara konfigurerbar.

Integritetsregel:

- svar som används för individuppföljning ska vara tydligt kopplade till onboardingen
- anonyma organisationsenkäter ska hållas separerade från individens personalakt
- användaren ska förstå vem som kan läsa svaren

### F. Handlingsplan efter uppföljning

Källa: `FORM-OHS-ACTION-001`

```yaml
onboarding_action:
  action_id:
  onboarding_id:
  goal_or_need:
  action:
  resources:
  responsible_role:
  due_date:
  follow_up_method:
  status:
  result:
  created_from:
  approved_by:
```

`created_from` kan vara:

- 30-dagars samtal
- 90-dagars samtal
- kunskapskontroll
- chefens observation
- deltagarens fråga
- onboarding-enkät

### G. Riskbaserad introduktion

Källor:

- `FORM-OHS-RISK-001`
- `FORM-OHS-INSPECTION-001`
- `PRD-OHS-PROCUREMENT-001`

Dessa används inte i alla onboardingmallar. De aktiveras genom villkor, exempelvis:

```yaml
conditions:
  industry: Bygg
  workplace_risk_level: Medel|Hög
  uses_machinery: true
  chemical_exposure: true
  work_at_height: true
```

Möjliga steg:

- gå igenom arbetsplatsens identifierade risker
- visa personlig skyddsutrustning
- kontrollera första hjälpen och utrymningsvägar
- gå igenom maskiner, truckar och transporter
- delta i arbetsberedning eller riskgenomgång
- förstå hur brister förs till handlingsplan

### H. Kontaktvägar och berörda parter

Källa: `FORM-OHS-STAKEHOLDER-001`

Kan användas i administratörens förberedelse:

- närmaste chef
- handledare eller fadder
- skyddsombud
- arbetsmiljöansvarig
- IT-support
- HR eller personalansvarig
- kund eller beställare
- underentreprenör eller leverantör
- extern företagshälsovård

Detta ska inte visas som en fast lista. Appen ska låta företaget välja relevanta kontakter.

## 3. Rekommenderad första produktstruktur

### Administratör före start

- välj grundmall
- välj bransch
- välj befattning
- koppla befattningsbeskrivning
- utse chef, handledare och andra ansvariga
- välj policyer och dokument
- beställ utrustning och behörigheter
- planera möten
- välj uppföljningsdagar
- granska och publicera onboardingversionen

### Deltagare

- ta emot välkomstinformation
- lära känna företaget och kontaktvägar
- förstå befattning, ansvar och förväntningar
- ta del av företagets policyer
- få utrustning, system och behörigheter
- genomföra säkerhets- och arbetsmiljösteg
- träna på viktiga arbetsuppgifter
- genomföra kunskapskontroller
- lämna frågor och be om stöd
- delta i uppföljningar

### Chef och handledare

- genomföra tilldelade möten och praktiska genomgångar
- dokumentera observationer och kvarstående behov
- godkänna obligatoriska steg
- skapa handlingsplaner
- genomföra 30- och 90-dagars uppföljning
- godkänna och avsluta onboardingen

## 4. Vad som ska sparas i appen

```yaml
onboarding_snapshot:
  onboarding_id:
  company_id:
  participant_id:
  template_id:
  template_version:
  role_profile_version:
  industry_package_version:
  company_content_version:
  assigned_people:
  planned_dates:
  step_snapshots:
  responses:
  confirmations:
  signatures:
  uploaded_evidence:
  meeting_notes:
  pulse_results:
  action_plans:
  approvals:
  completion_date:
  archived_at:
```

Viktigt: En avslutad onboarding ska inte ändras när grundmallen senare uppdateras.

## 5. Material som sparas men inte byggs in i första onboardingversionen

| Källa | Framtida digitalt verktyg |
|---|---|
| `FORM-LEGAL-REGISTER-001` | Lagförteckning och lagefterlevnad |
| `FORM-OHS-MGMTREVIEW-001` | Ledningens genomgång |
| `FORM-OHS-ANNUAL-001` | Årlig uppföljning |
| `FORM-OHS-AUDIT-001` | Internrevision |
| `FORM-STRATEGY-SWOT-001` | Nulägesanalys och strategiplanering |

## 6. Kvalitetsgrind före publicering

Varje steg ska ha:

- verkligt `source_id`
- exakt källrubrik eller tabell som locator
- `statement_class`
- `verification_status`
- tydlig ägare
- status `DRAFT`
- enkel svenska
- separat engelsk text först efter språkgranskning

Rättsliga påståenden och fasta tidsintervall ska inte publiceras som krav förrän de är verifierade.
