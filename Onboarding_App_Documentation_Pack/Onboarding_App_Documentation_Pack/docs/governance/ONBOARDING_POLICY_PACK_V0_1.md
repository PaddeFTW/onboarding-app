# Onboarding Policy Pack v0.1

**Datum:** 2026-07-09  
**Status:** DRAFT  
**Syfte:** Beskriva hur företagets policyer ska användas i Onboarding App utan att hela policydokument kopieras in i stegbanken.

## 1. Grundbeslut

Onboarding ska inte visa alla policyer för alla användare.

Administratören väljer en **policyprofil**:

### Profil A – Integrerad KMA-policy

KMA betyder **kvalitet, miljö och arbetsmiljö**.

Använd:

- verksamhetspolicy
- kompletterande specialpolicyer, exempelvis IT, dataskydd, likabehandling och fordon

### Profil B – Separata policyer

Använd:

- kvalitetspolicy
- miljöpolicy
- arbetsmiljöpolicy
- kompletterande specialpolicyer

### Profil C – Företagsanpassad

Företaget väljer endast de dokument som är relevanta för verksamheten, rollen och riskerna.

**Regel:** Integrerad verksamhetspolicy och separata KMA-policyer ska normalt inte visas som dubbla obligatoriska steg.

## 2. Policyer och användningslogik

| Policyområde | Källa | Standardläge | När visas det? | Lämplig stegtyp | Bevis |
|---|---|---|---|---|---|
| Verksamhet/KMA | `PRD-KMA-INTEGRATED-POLICY-001` | Valbar kärnpolicy | Om företaget använder integrerad policy | Dokument + kunskapskontroll | Bekräftelse och quiz |
| Kvalitet | `PRD-QMS-QUALITY-POLICY-001` | Valbar kärnpolicy | Om separat kvalitetspolicy används | Dokument + exempel | Bekräftelse |
| Miljö | `PRD-EMS-ENV-POLICY-001` | Valbar kärnpolicy | Om separat miljöpolicy används eller rollen har miljöpåverkan | Dokument + kunskapskontroll | Bekräftelse och quiz |
| Likabehandling | `PRD-HR-EQUALITY-POLICY-001` | Rekommenderad kärnpolicy | Alla medarbetare | Information + rapporteringsväg | Bekräftelse |
| IT | `PRD-IT-POLICY-001` | Villkorsstyrd kärnpolicy | Alla som använder företagets IT-resurser | Dokument + kontrollfrågor | Bekräftelse och quiz |
| Dataskydd | `GUIDE-PRIVACY-GDPR-POLICY-001` | Villkorsstyrd kärnpolicy | Alla som hanterar personuppgifter | Kort utbildning + kontrollfrågor | Quiz |
| CSR | `PRD-ESG-CSR-POLICY-001` | Valfri | Om företaget har en fastställd policy eller kundkrav | Information | Bekräftelse |
| Fordon | `PRD-FLEET-POLICY-001` | Rollstyrd | Personer som kör i tjänsten | Dokument + uppgift | Bekräftelse |
| Säkerhetskontroll | `FORM-FLEET-SAFETY-CHECK-001` | Rollstyrd | Personer som ansvarar för eller använder fordon | Praktisk uppgift | Genomförd kontroll |
| Körjournal | `FORM-FLEET-LOGBOOK-001` | Företagsstyrd | När företagets rutin kräver körjournal | Instruktion + uppgift | Första godkända registrering |

## 3. Skillnad mellan att läsa och att förstå

Ett policysteg bör normalt bestå av tre delar:

1. **Kort förklaring:** Vad policyn handlar om och varför den finns.
2. **Länk till företagets beslutade dokument:** Den aktuella versionen.
3. **Praktisk kontroll:** En enkel fråga, bekräftelse eller uppgift som visar att medarbetaren vet hur policyn används.

Undvik enbart:

> Jag har läst policyn.

Bättre exempel:

- Vem kontaktar du om du misstänker en personuppgiftsincident?
- Hur rapporterar du en kvalitetsavvikelse?
- Vilken miljöfråga påverkar din roll mest?
- Vem kontaktar du om du upplever trakasserier?
- Vad gör du om företagets fordon har ett säkerhetsfel?

## 4. Företagsdokumentets metadata

Varje kopplat policydokument ska ha:

```yaml
company_document:
  document_id:
  title:
  policy_type:
  version:
  approved_by:
  approved_at:
  valid_from:
  next_review_at:
  language:
  file_link:
  source_template_ids:
  status:
```

## 5. Versionsregel

När en onboarding publiceras ska den använda en **snapshot**, alltså en låst koppling till den policyversion som gällde vid genomförandet.

En senare policyuppdatering får inte ändra historiken för redan avslutade onboardingar.

## 6. Juridisk och standardrelaterad kontroll

Följande får inte publiceras som bindande krav utan aktuell kontroll:

- juridiska tröskelvärden och paragrafer
- myndighetsnamn och rapporteringsvägar
- skatteregler och körjournalsgränser
- kör- och vilotider
- påståenden om ISO-krav
- historisk statistik
- formuleringar som bygger på PuL (personuppgiftslagen)

## 7. Första rekommenderade policyuppsättning

### Alla företag

- personal-/arbetskultur
- likabehandling
- arbetsmiljö och brandskydd
- kvalitet eller integrerad verksamhetspolicy
- miljö eller integrerad verksamhetspolicy

### Digitala kontorsroller

- IT-policy
- dataskydd
- informationssäkerhet

### Bygg, service och transport

- fordonspolicy
- säkerhetskontroll
- körjournal när företagets rutin kräver det
- rollspecifika säkerhets- och risksteg

## 8. Publiceringsstatus

Allt innehåll i detta dokument är `DRAFT`.

Ingen sammanfattning eller kontrollfråga får bli `PUBLISHED` innan:

`SOURCE_VERIFIED → DOMAIN_REVIEWED → COPYRIGHT_REVIEWED → APPROVED`
