# Source Register – Batch 03

**Datum:** 2026-07-09  
**Status:** REGISTERED  
**Omfattning:** Policyer, dataskydd, likabehandling, IT, kvalitet, miljö och fordonsrelaterade produkter.

## Bevarandebeslut

- Samtliga tio originalfiler bevaras oförändrade i ett separat originalarkiv.
- Varje fil har ett stabilt `source_id` och en SHA-256-kontrollsumma.
- Bearbetat onboardinginnehåll lagras separat och hänvisar tillbaka med `source_ids`.
- Källorna är egna produkter enligt användarens uppgift och dokumentens märkning.
- Externa lag-, ISO-, skatte- och myndighetspåståenden är inte automatiskt verifierade.

## Registrerade källor

| source_id | originalfil | titel | typ | domän | användning i onboarding | status | verifiering |
|---|---|---|---|---|---|---|---|
| `PRD-ESG-CSR-POLICY-001` | `Policy_-_CSR.docx` | CSR-policy – Företagens ansvarstagande i samhället | produkt | hållbarhet/etik/socialt ansvar | Valfritt företagssteg om samhällsansvar, etik och hållbarhet | `REGISTERED` | `PARTIAL` |
| `GUIDE-PRIVACY-GDPR-POLICY-001` | `GDPR-policy.docx` | Dataskyddsförordningen (GDPR) – vägledning och policy | vägledning/produkt | dataskydd/integritet | Kärnkälla för kort introduktion om personuppgifter och incidentrapportering | `REGISTERED` | `UNVERIFIED` |
| `PRD-HR-EQUALITY-POLICY-001` | `Policy_-_Diskriminering_och_jamstalldhet.docx` | Diskriminerings- och jämställdhetspolicy – exempel och vägledning | produkt | personal/likabehandling | Kärnkälla för trygg arbetsplats, likabehandling och rapporteringsvägar | `REGISTERED` | `UNVERIFIED` |
| `FORM-FLEET-SAFETY-CHECK-001` | `Bilaga - Säkerhetskontroll.docx` | Säkerhetskontroll – bilaga till fordonspolicy | checklista | fordon/trafiksäkerhet | Roll- och villkorsstyrd praktisk introduktion för förare | `REGISTERED` | `PARTIAL` |
| `PRD-FLEET-POLICY-001` | `Policy_-_Fordon.docx` | Fordonspolicy – exempel och bakgrundsinformation | produkt | fordon/trafiksäkerhet | Roll- och villkorsstyrd policy för medarbetare som kör i tjänsten | `REGISTERED` | `UNVERIFIED` |
| `FORM-FLEET-LOGBOOK-001` | `Bilaga - Körjournal.docx` | Körjournal – bilaga till fordonspolicy | blankett | fordon/skatt/administration | Villkorsstyrd instruktion för tjänstekörning och dokumentation | `REGISTERED` | `UNVERIFIED` |
| `PRD-IT-POLICY-001` | `Policy_-_IT.docx` | IT-policy | produkt | IT/informationssäkerhet | Kärnkälla för säker användning av system, programvara, internet och sociala medier | `REGISTERED` | `UNVERIFIED` |
| `PRD-QMS-QUALITY-POLICY-001` | `Kvalitetspolicy.docx` | Kvalitetspolicy – exempel och vägledning | produkt | kvalitet | Kärnkälla för kvalitetsmedvetenhet, kundfokus, förbättring och avvikelser | `REGISTERED` | `PARTIAL` |
| `PRD-EMS-ENV-POLICY-001` | `Miljopolicy.docx` | Miljöpolicy – exempel och vägledning | produkt | miljö | Kärnkälla för miljömedvetenhet, miljöaspekter och rapportering | `REGISTERED` | `UNVERIFIED` |
| `PRD-KMA-INTEGRATED-POLICY-001` | `Policy_-_Verksamhet.docx` | Verksamhetspolicy – exempel och vägledning | produkt | kvalitet/miljö/arbetsmiljö | Alternativ integrerad policyprofil för KMA | `REGISTERED` | `PARTIAL` |

## Prioritering för Onboarding App

### Kärnmaterial

- `PRD-IT-POLICY-001` – säker användning av IT-resurser.
- `GUIDE-PRIVACY-GDPR-POLICY-001` – grundläggande dataskydd och rapportering av personuppgiftsincidenter.
- `PRD-HR-EQUALITY-POLICY-001` – likabehandling, trygghet och rapporteringsvägar.
- `PRD-QMS-QUALITY-POLICY-001` – kvalitetsmedvetenhet, kundfokus och förbättring.
- `PRD-EMS-ENV-POLICY-001` – miljömedvetenhet och praktiskt ansvar.
- `PRD-KMA-INTEGRATED-POLICY-001` – integrerad policyprofil för kvalitet, miljö och arbetsmiljö.

### Villkorsstyrt material

- `PRD-FLEET-POLICY-001` – visas endast för personer som kör i tjänsten.
- `FORM-FLEET-SAFETY-CHECK-001` – praktisk kontroll för förare.
- `FORM-FLEET-LOGBOOK-001` – körjournal när företaget använder den rutinen.
- `PRD-ESG-CSR-POLICY-001` – valfritt företagssteg om samhällsansvar.

## Upptäckta kvalitetsfrågor

- GDPR-materialet innehåller äldre myndighetsnamn, tidsbundna formuleringar och en äldre publiceringskontext.
- IT-policyn hänvisar till PuL (personuppgiftslagen), vilket gör att texten måste moderniseras innan extern användning.
- Fordonsmaterialet innehåller historisk statistik, skattepåståenden och möjliga rättsliga krav som ska verifieras separat.
- Kvalitets-, miljö- och verksamhetspolicyerna innehåller ISO-relaterade formuleringar som måste mappas mot rätt standardversion.
- Integrerad verksamhetspolicy och separata kvalitet-/miljö-/arbetsmiljöpolicyer är alternativa policyprofiler; appen ska undvika dubbel information.

## Originalarkiv

`QW_KB_INGEST_BATCH_03_ORIGINALS.zip` innehåller originalfiler, `manifest.json`, `README.md` och SHA-256-kontrollsummor.