# Source Register

**Version:** 0.2  
**Datum:** 2026-07-09

## Syfte

SOURCE_REGISTER.md är huvudregistret för alla originalkällor. Varje fysisk eller digital källa ska få en egen post innan innehållet bearbetas.

## Obligatoriska uppgifter

| Fält | Beskrivning |
|---|---|
| source_id | Stabilt och unikt käll-ID |
| original_filename | Exakt filnamn inklusive filändelse |
| original_path | Ursprunglig mapp eller placering |
| stated_title | Titel som står i dokumentet eller mappen |
| source_type | Standard, produkt, mall, blankett, vägledning, lagkälla eller övrigt |
| owner | Rättighetsinnehavare eller ansvarig organisation |
| rights_status | Egen, licensierad, offentlig, oklar eller begränsad |
| stated_version | Version som anges i källan |
| publication_date | Publicerings- eller revisionsdatum |
| language | Dokumentets språk |
| checksum_or_signature | Framtida kontrollvärde eller annan identitetskontroll |
| status | Ej granskad, registrerad, verifierad, bearbetad, ersatt eller arkiverad |
| verification_need | Vad som måste kontrolleras |
| canonical_links | Länkar till kanoniska kunskapsmoduler |
| notes | Övriga observationer |

## Käll-ID-regel

Format:

`[KÄLLTYP]-[OMRÅDE]-[LÖPNUMMER]`

Exempel:

- `STD-ISO9001-001`
- `PRD-QUALITY-001`
- `FORM-AUDIT-001`
- `LEGACY-OHSAS-001`

## Initialt register – standarder och ramverk

| Käll-ID | Angiven titel | Källtyp | Version | Status | Nästa kontroll |
|---|---|---|---|---|---|
| STD-EMAS-001 | EMAS | Standard/ramverk | Ej angiven | Identifierad källa | Kontrollera vilken förordningsversion och vilka bilagor som finns i originalmappen |
| STD-FR2000-001 | FR2000 2022 | Standard/ramverk | 2022 | Identifierad källa | Verifiera svensk titel, utgåva och om tillhörande regler/vägledningar ingår |
| STD-HACCP-001 | HACCP | Standard/ramverk | Ej angiven | Identifierad källa | Fastställ dokumentets utgåva/revision och om materialet är Codex, nationell vägledning eller egen produkt |
| STD-ISO3834-2-001 | ISO 3834-2 | Standard/ramverk | Ej angiven | Identifierad källa | Kontrollera om källan avser 2005 eller 2021 och om övriga delar i ISO 3834-serien ingår |
| STD-ISO9001-001 | ISO 9001 | Standard/ramverk | Ej angiven | Kärnstandard | Fastställ källversion. ISO 9001:2015 är aktuell 2026-07-08; ny utgåva väntas senare 2026 |
| STD-ISO13485-001 | ISO 13485 | Standard/ramverk | Ej angiven | Identifierad källa | Kontrollera källversion, nationell adoption och eventuella regulatoriska bilagor |
| STD-ISO14001-001 | ISO 14001 | Standard/ramverk | Ej angiven | Kärnstandard | Fastställ om originalet är 2015 eller 2026. Bevara 2015 som historisk källa om den finns |
| STD-ISO17020-001 | ISO 17020 | Standard/ramverk | Ej angiven | Identifierad källa | Fastställ om originalet är ISO/IEC 17020:2012 eller 2026 |
| STD-ISO17025-001 | ISO 17025 | Standard/ramverk | Ej angiven | Identifierad källa | Fastställ version, nationell adoption och SWEDAC-relaterade kompletteringar |
| STD-ISO19011-001 | ISO 19011:2018 | Standard/ramverk | 2018 | Kärnkälla med äldre angiven version | Bevara 2018 som källversion men registrera att 2026 är aktuell utgåva |
| STD-ISO20400-001 | ISO 20400 | Standard/ramverk | Ej angiven | Identifierad källa | Kontrollera källversion och relation till leverantörsbedömning |
| STD-ISO26001-001 | ISO 26001 | Standard/ramverk | Ej angiven | Osäker beteckning | Kontrollera originalmappens namn. Korrigera inte till ISO 26000 förrän källan har verifierats |
| STD-ISO27001-001 | ISO 27001 | Standard/ramverk | Ej angiven | Identifierad källa | Fastställ om källan är 2013 eller 2022 och om ändring 1:2024 ingår |
| STD-ISO45001-001 | ISO 45001:2018 | Standard/ramverk | 2018 | Kärnstandard | Kontrollera om ändring 1:2024 ingår i källmaterialet |
| STD-ISO50001-001 | ISO 50001 | Standard/ramverk | Ej angiven | Identifierad källa | Fastställ version och om ändring 1:2024 ingår |
| STD-ISO53001-001 | ISO 53001 Hållbarhet | Standard/ramverk | Ej angiven | Under publicering 2026 | Kontrollera om källmappen avser utkast, presentationsmaterial eller annan standard. Slutlig publicering anges till 2026-09 |
| STD-OHSAS18001-001 | OHSAS 18001 | Standard/ramverk | Ej angiven | Historisk/ersatt källa | Fastställ version och koppla mot övergång till ISO 45001 |
| STD-SOSFS2011-001 | SOSFS 2011 | Standard/ramverk | 2011 | Osäker fullständig beteckning | Verifiera att källan avser SOSFS 2011:9 samt om konsoliderad version och handbok ingår |
| STD-SS872500-001 | SS 872500 Äldrestandarden | Standard/ramverk | Ej angiven | Historisk och osäker källa | Läs titelblad, standardnummer och utgåva. Bevara originalnamnet tills verifiering är klar |
| STD-SWEDAC-001 | SWEDAC-relaterat material | Standard/ramverk | Ej angiven | Källgrupp behöver delas upp | Registrera varje föreskrift, vägledning och blankett separat med dokumentnummer och giltighetsdatum |

## Initialt register – produktgrupper

| Käll-ID | Produktgrupp | Bekräftad information | Status |
|---|---|---|---|
| PRD-QUALITY-001 | Kvalitetssäkring | Produkter finns i inventeringen; flera namn är kända från projektinformationen | Originalfilnamn krävs |
| PRD-ENV-001 | Miljösäkring | Produkter finns i inventeringen | Originalfilnamn krävs |
| PRD-OHS-001 | Arbetsmiljö | Produkter finns i inventeringen | Originalfilnamn krävs |
| PRD-KMA-001 | Bygg och KMA | Startpaket och byggprodukter är identifierade | Originalfilnamn krävs |
| PRD-INDUSTRY-001 | Branschanpassat | Branschversioner finns; exakt lista behöver verifieras | Originalfilnamn krävs |
| PRD-HR-001 | Personal och HR | Onboarding, kompetens och personalmaterial är relevanta områden | Originalfilnamn krävs |
| PRD-POLICY-001 | Policyer | Policypaket är identifierat som produktområde | Originalfilnamn krävs |
| PRD-FORMS-001 | Blanketter | Blanketter är identifierade som stödprodukt | Originalfilnamn krävs |
| PRD-OTHER-001 | Övrigt | Manualer, planer, checklistor, protokoll och register | Originalfilnamn krävs |

## Registreringsregel

En mapp är inte automatiskt en källa. Varje självständigt dokument ska registreras separat. Samma produkt i Word och PDF kan vara:

- samma källversion i två format, eller
- två olika versioner

Det avgörs genom titelblad, versionsnummer, datum och innehållsjämförelse.

---

## Registrering – Batch 02

**Datum:** 2026-07-09  
**Omfattning:** KvalitetsGruppens originalprodukter för personal, onboarding, arbetsmiljö, uppföljning, revision och lagefterlevnad.

## Bevarandebeslut

- Samtliga originalfiler bevaras oförändrade i ett separat källager.
- Varje fil har fått ett stabilt `source_id` och en SHA-256-kontrollsumma.
- Bearbetad kunskap lagras separat och länkas tillbaka med `source_ids`.
- Status `REGISTERED` betyder att källan är registrerad, inte att alla sakpåståenden är verifierade.
- Upphovsrättsstatus är satt till `OWNED` utifrån produktmärkning och användarens uppgift. Eventuella externa rättigheter eller infogat tredjepartsmaterial ska ändå kontrolleras.

## Registrerade källor

| source_id | Originalfil | Titel | Källtyp | Domän | Onboarding | Status | Verifiering |
|---|---|---|---|---|---|---|---|
| `FORM-OHS-ACTION-001` | `Handlingsplan-Målkort.dotx` | Målkort | blankett | arbetsmiljö | Direkt relevant | `REGISTERED` | `PARTIAL` |
| `FORM-OHS-STAKEHOLDER-001` | `Intressentlista.dotx` | Intressentlista | blankett | arbetsmiljö/upphandling | Indirekt relevant | `REGISTERED` | `PARTIAL` |
| `FORM-HR-ONBOARDING-001` | `Introduktion nyanställda.dotx` | Introduktion för nyanställd | mall/blankett | personal/onboarding | Kärnkälla | `REGISTERED` | `PARTIAL` |
| `FORM-LEGAL-REGISTER-001` | `Lagförteckning.dotx` | Lagförteckning | registermall | lagefterlevnad | Sparas för senare | `REGISTERED` | `PARTIAL` |
| `FORM-OHS-MGMTREVIEW-001` | `Ledningens genomgång.dotx` | Ledningens genomgång | mötesmall | arbetsmiljö/ledning | Sparas för senare | `REGISTERED` | `PARTIAL` |
| `FORM-OHS-RISK-001` | `Riskutvärdering.dotx` | Riskutvärdering | riskmall | arbetsmiljö | Bransch- och rollrelevant | `REGISTERED` | `PARTIAL` |
| `FORM-OHS-INSPECTION-001` | `Skyddsrond - Riskbedömning.dotx` | Skyddsrond - Riskbedömning | checklista/blankett | arbetsmiljö | Bransch- och rollrelevant | `REGISTERED` | `PARTIAL` |
| `FORM-STRATEGY-SWOT-001` | `SWOT.dotx` | SWOT | analysmall | strategi | Sparas för senare | `REGISTERED` | `PARTIAL` |
| `FORM-OHS-ANNUAL-001` | `Agenda för Årlig uppföljniing.dotx` | Agenda Årlig uppföljning | mötesmall | arbetsmiljö/uppföljning | Sparas för senare | `REGISTERED` | `PARTIAL` |
| `PRD-OHS-PROCUREMENT-001` | `Arbetsmiljö inför upphandling.dotx` | Arbetsmiljöledningssystem inför upphandling | produkt/manual | arbetsmiljö/upphandling | Delvis relevant | `REGISTERED` | `PARTIAL` |
| `FORM-OHS-AUDIT-001` | `Internrevision.dotx` | Internrevision arbetsmiljöledningssystem inför upphandling | revisionsmall | arbetsmiljö/revision | Sparas för senare | `REGISTERED` | `PARTIAL` |
| `PRD-HR-POLICY-001` | `Policy_-_Personal.docx` | Personalpolicy | policyprodukt | personal | Kärnkälla | `REGISTERED` | `PARTIAL` |
| `FORM-HR-DIALOGUE-001` | `Medarbetarsamtal.docx` | Medarbetarsamtal | samtalsmall | personal | Kärnkälla för uppföljning | `REGISTERED` | `PARTIAL` |
| `FORM-HR-SURVEY-001` | `Medarbetarenkät.docx` | Medarbetarenkät | enkät | personal | Relevant för uppföljning | `REGISTERED` | `PARTIAL` |
| `DATA-HR-SURVEY-001` | `Sammanställning medarbetarenkät -Exempel.xlsx` | Sammanställning medarbetarenkät - exempel | data/exempel | personal/analys | Relevant för analys | `REGISTERED` | `PARTIAL` |
| `GUIDE-HR-SURVEY-001` | `Vägledning - Medarbetarenkät.docx` | Vägledning medarbetarenkät | vägledning | personal | Relevant för uppföljning | `REGISTERED` | `PARTIAL` |
| `FORM-HR-ROLE-001` | `Befattningsbeskrivning_-_Mall.docx` | Befattningsbeskrivning - mall | rollmall | personal/roller | Kärnkälla | `REGISTERED` | `PARTIAL` |

## Källor som används direkt i Onboarding App

### Kärnkällor

- `FORM-HR-ONBOARDING-001` – planering, introduktionsansvar, arbetsplatsförberedelser, introduktionsområden och uppföljning.
- `FORM-HR-ROLE-001` – befattning, syfte, ersättare, ansvar, arbetsuppgifter, kompetenskrav, befogenheter och rapportering.
- `PRD-HR-POLICY-001` – arbetskultur, trivsel, kommunikation, respekt och delaktighet.
- `FORM-HR-DIALOGUE-001` – 30- och 90-dagars samtal, utveckling, arbetsmiljö och åtgärder.
- `FORM-HR-SURVEY-001`, `GUIDE-HR-SURVEY-001` och `DATA-HR-SURVEY-001` – onboarding-enkät, analys, återkoppling och förbättring.
- `FORM-OHS-ACTION-001` – handlingsplan efter uppföljning.

### Bransch- och rollspecifika källor

- `FORM-OHS-RISK-001` – riskbaserad introduktion och åtgärdsplan.
- `FORM-OHS-INSPECTION-001` – skyddsrond, arbetsplatsrisker, första hjälpen, brand, transporter och utrustning.
- `PRD-OHS-PROCUREMENT-001` – kompetens, medvetenhet, roller och arbetsmiljösystem vid upphandling.
- `FORM-OHS-STAKEHOLDER-001` – ansvariga, skyddsombud, kunder, leverantörer och andra kontaktvägar.

## Källor som bevaras för andra digitala verktyg

- `FORM-LEGAL-REGISTER-001` – digital lagförteckning och lagefterlevnad.
- `FORM-OHS-MGMTREVIEW-001` – ledningens genomgång.
- `FORM-OHS-ANNUAL-001` – årlig uppföljning.
- `FORM-OHS-AUDIT-001` – internrevision.
- `FORM-STRATEGY-SWOT-001` – nuläges- och strategianalys.

## Upptäckta kvalitetsfrågor

- `Handlingsplan-Målkort.dotx` laddades upp två gånger med samma filnamn i samma batch. En fysisk originalfil och en kontrollsumma har registrerats.
- Flera mallar innehåller årtal, telefonnummer, stödtexter och rättsliga formuleringar som kan bli inaktuella.
- Formuleringar om hur ofta aktiviteter *måste* genomföras ska verifieras mot gällande krav och företagets verkliga risknivå.
- Mallarna innehåller både vägledning, exempel, företagsregler och möjliga krav. Dessa ska klassificeras separat i kanonisk kunskap.
- Originalens design och fulltext bevaras i källagret, men appinnehåll ska egenformuleras och förenklas.

## Originalarkiv

`QW_KB_INGEST_BATCH_02_ORIGINALS.zip` innehåller 17 oförändrade originalfiler, `manifest.json` och kontrollsummor.

---

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
