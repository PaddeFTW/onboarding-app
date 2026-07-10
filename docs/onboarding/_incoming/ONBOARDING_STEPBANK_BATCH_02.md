# Onboarding Stepbank – Batch 02

**Version:** 0.1  
**Datum:** 2026-07-09  
**Status:** DRAFT  
**Omfattning:** Nya och konsoliderade steg från KvalitetsGruppens introduktions-, personal-, roll-, enkät- och handlingsplansprodukter.

## Sammanfattning

- 20 konkreta onboardingsteg
- svenska och engelska texter
- spårbara `source_ids` och `source_locators`
- inga steg är publicerade eller juridiskt godkända
- företagets policyer länkas som dokument och kopieras inte som fulltext

## Kvalitetsregel

Alla steg ska genomgå:

`DRAFT → SOURCE_VERIFIED → DOMAIN_REVIEWED → COPYRIGHT_REVIEWED → APPROVED → PUBLISHED`

## Steg


### GEN-PREP-001 – Planera introduktionen

```yaml
version: '0.1'
status: DRAFT
confidence: MEDIUM
rights_status: OWNED_DERIVED_SUMMARY
reviewer: null
reviewed_at: null
step_id: GEN-PREP-001
title_sv: Planera introduktionen
title_en: Plan the onboarding
phase: Förberedelse
category: Planering
step_type: Uppgift
content_layer: Allmänt
industry: Alla
job_roles:
- Alla
responsible_role: Chef
participant_role: Chef
required: Obligatoriskt
estimated_time: 15–30 min
instructions_sv: Bestäm startdatum, mötesplats, upplägg, ansvariga personer och vilka delar som ska vara klara före första
  arbetsdagen.
instructions_en: Set the start date, meeting place, onboarding plan, responsible people and the items that must be ready before
  the first workday.
help_text_sv: En planerad introduktion minskar risken att viktiga moment glöms bort och gör starten tryggare för både deltagaren
  och de ansvariga.
help_text_en: A planned onboarding reduces the risk of missing important tasks and creates a safer start for both the participant
  and the responsible people.
document_links: []
completion_method: Checklista
evidence_required:
- Planerat datum
- Ansvariga personer
conditions: null
due_rule: Före första arbetsdagen
approval_required:
  required: true
  role: Chef
source_ids:
- FORM-HR-ONBOARDING-001
source_locators:
- Inledning > Planerar introduktionen
- Introduktionsblankett
statement_class: APPLICATION
verification_status: PARTIAL
```


### GEN-PREP-002 – Utse introduktionsansvariga

```yaml
version: '0.1'
status: DRAFT
confidence: MEDIUM
rights_status: OWNED_DERIVED_SUMMARY
reviewer: null
reviewed_at: null
step_id: GEN-PREP-002
title_sv: Utse introduktionsansvariga
title_en: Assign onboarding owners
phase: Förberedelse
category: Roller och ansvar
step_type: Uppgift
content_layer: Företag
industry: Alla
job_roles:
- Alla
responsible_role: Chef
participant_role: Chef
required: Obligatoriskt
estimated_time: 10 min
instructions_sv: Utse vem som ansvarar för företagspresentation, arbetsuppgifter, arbetsmiljö, IT, utrustning och uppföljning.
instructions_en: Assign who is responsible for the company introduction, work tasks, work environment, IT, equipment and follow-up.
help_text_sv: Den nyanställde ska enkelt kunna se vem som ansvarar för varje område och vem som kan svara på frågor.
help_text_en: The new employee should be able to see who owns each area and who can answer questions.
document_links: []
completion_method: Bekräftelse
evidence_required:
- Namn
- Roll
- Ansvarsområde
conditions: null
due_rule: Före första arbetsdagen
approval_required:
  required: true
  role: Chef
source_ids:
- FORM-HR-ONBOARDING-001
- FORM-OHS-STAKEHOLDER-001
source_locators:
- Introduktionsansvarig
- Intressentlista > Anställda, ledning och skyddsombud
statement_class: APPLICATION
verification_status: PARTIAL
```


### GEN-PREP-003 – Koppla befattningsbeskrivningen

```yaml
version: '0.1'
status: DRAFT
confidence: MEDIUM
rights_status: OWNED_DERIVED_SUMMARY
reviewer: null
reviewed_at: null
step_id: GEN-PREP-003
title_sv: Koppla befattningsbeskrivningen
title_en: Attach the role description
phase: Förberedelse
category: Befattning
step_type: Dokument
content_layer: Befattning
industry: Alla
job_roles:
- Alla
responsible_role: Chef
participant_role: Chef
required: Obligatoriskt
estimated_time: 15 min
instructions_sv: Välj eller skapa befattningsbeskrivningen med syfte, ansvar, arbetsuppgifter, kompetenskrav, befogenheter,
  rapportering och eventuell ersättare.
instructions_en: Select or create the role description with purpose, responsibilities, tasks, competence requirements, authority,
  reporting and a possible substitute.
help_text_sv: Befattningsbeskrivningen styr vilka rollspecifika steg som ska läggas till i onboardingen.
help_text_en: The role description controls which role-specific steps are added to the onboarding.
document_links:
- Företagets befattningsbeskrivning
completion_method: Godkännande
evidence_required:
- Dokumentversion
- Godkännande
conditions: null
due_rule: Före publicering av onboarding
approval_required:
  required: true
  role: Chef
source_ids:
- FORM-HR-ROLE-001
source_locators:
- Befattningsbeskrivning - Mall
statement_class: APPLICATION
verification_status: PARTIAL
```


### GEN-PREP-004 – Förbered arbetsplats, utrustning och behörigheter

```yaml
version: '0.1'
status: DRAFT
confidence: MEDIUM
rights_status: OWNED_DERIVED_SUMMARY
reviewer: null
reviewed_at: null
step_id: GEN-PREP-004
title_sv: Förbered arbetsplats, utrustning och behörigheter
title_en: Prepare workplace, equipment and access
phase: Förberedelse
category: Utrustning och system
step_type: Kontroll
content_layer: Företag
industry: Alla
job_roles:
- Alla
responsible_role: Administratör
participant_role: Administratör
required: Obligatoriskt
estimated_time: 20 min
instructions_sv: Kontrollera arbetsplats, passerkort, e-post, systemåtkomst, telefon, arbetskläder, verktyg och annan utrustning
  som rollen behöver.
instructions_en: Check the workplace, access card, email, system access, phone, workwear, tools and other equipment required
  for the role.
help_text_sv: Markera sådant som inte behövs som ej relevant. Kvarstående brister ska få ansvarig och slutdatum.
help_text_en: Mark items that are not needed as not applicable. Any missing item must have an owner and a due date.
document_links: []
completion_method: Checklista
evidence_required:
- Kontrollstatus
- Kvarstående åtgärder
conditions: null
due_rule: Före första arbetsdagen
approval_required:
  required: true
  role: Chef
source_ids:
- FORM-HR-ONBOARDING-001
- FORM-OHS-ACTION-001
source_locators:
- Förbered arbetsplatsen
- Målkort > Åtgärd, ansvarig och tidsram
statement_class: APPLICATION
verification_status: PARTIAL
```


### GEN-PREP-005 – Skicka välkomstinformation

```yaml
version: '0.1'
status: DRAFT
confidence: MEDIUM
rights_status: OWNED_DERIVED_SUMMARY
reviewer: null
reviewed_at: null
step_id: GEN-PREP-005
title_sv: Skicka välkomstinformation
title_en: Send welcome information
phase: Förberedelse
category: Kommunikation
step_type: Information
content_layer: Företag
industry: Alla
job_roles:
- Alla
responsible_role: Administratör
participant_role: Deltagare
required: Rekommenderat
estimated_time: 10 min
instructions_sv: Skicka starttid, mötesplats, kontaktperson, praktisk information och dokument som deltagaren behöver före
  start.
instructions_en: Send the start time, meeting place, contact person, practical information and documents needed before the
  start.
help_text_sv: Skicka endast aktuell och relevant information. Gamla telefonnummer, tider och länkar ska inte återanvändas
  utan kontroll.
help_text_en: Send only current and relevant information. Old phone numbers, times and links must not be reused without checking.
document_links: []
completion_method: Bekräftelse
evidence_required:
- Skickat datum
conditions: null
due_rule: Före första arbetsdagen
approval_required:
  required: false
  role: null
source_ids:
- FORM-HR-ONBOARDING-001
source_locators:
- Informationsmaterial
- Datum för introduktion
statement_class: RECOMMENDATION
verification_status: PARTIAL
```


### GEN-INTRO-001 – Välkommen till företaget

```yaml
version: '0.1'
status: DRAFT
confidence: MEDIUM
rights_status: OWNED_DERIVED_SUMMARY
reviewer: null
reviewed_at: null
step_id: GEN-INTRO-001
title_sv: Välkommen till företaget
title_en: Welcome to the company
phase: Välkomst och introduktion
category: Företaget
step_type: Möte
content_layer: Företag
industry: Alla
job_roles:
- Alla
responsible_role: Chef
participant_role: Deltagare
required: Obligatoriskt
estimated_time: 20–30 min
instructions_sv: Gå igenom företagets verksamhet, historia, mål, organisation, kunder och hur deltagarens arbete bidrar.
instructions_en: Explain the company's operations, history, goals, organisation, customers and how the participant's work
  contributes.
help_text_sv: Fokusera på det deltagaren behöver förstå för att komma in i arbetet.
help_text_en: Focus on what the participant needs to understand to get started in the role.
document_links: []
completion_method: Bekräftelse
evidence_required:
- Genomfört datum
conditions: null
due_rule: Första arbetsdagen
approval_required:
  required: false
  role: null
source_ids:
- FORM-HR-ONBOARDING-001
source_locators:
- Introduktionsblankett > Företagsinformation
statement_class: APPLICATION
verification_status: PARTIAL
```


### GEN-INTRO-002 – Förstå din befattning

```yaml
version: '0.1'
status: DRAFT
confidence: MEDIUM
rights_status: OWNED_DERIVED_SUMMARY
reviewer: null
reviewed_at: null
step_id: GEN-INTRO-002
title_sv: Förstå din befattning
title_en: Understand your role
phase: Välkomst och introduktion
category: Befattning
step_type: Dokument
content_layer: Befattning
industry: Alla
job_roles:
- Alla
responsible_role: Chef
participant_role: Deltagare
required: Obligatoriskt
estimated_time: 30 min
instructions_sv: Gå igenom befattningens syfte, ansvar, arbetsuppgifter, befogenheter, rapportering och vem som ersätter eller
  stödjer rollen.
instructions_en: Review the role purpose, responsibilities, tasks, authority, reporting and who substitutes for or supports
  the role.
help_text_sv: Deltagaren ska förstå vad som förväntas, vilka beslut rollen får fatta och vem som kontaktas vid frågor.
help_text_en: The participant should understand what is expected, which decisions the role may make and who to contact with
  questions.
document_links:
- Befattningsbeskrivning
completion_method: Signering
evidence_required:
- Deltagarens bekräftelse
- Chefens godkännande
conditions: null
due_rule: Första veckan
approval_required:
  required: true
  role: Chef
source_ids:
- FORM-HR-ROLE-001
- FORM-HR-DIALOGUE-001
source_locators:
- Befattningsbeskrivning - Mall
- Medarbetarsamtal > Arbetsuppgifter och ansvarsområde
statement_class: APPLICATION
verification_status: PARTIAL
```


### GEN-INTRO-003 – Arbetskultur, respekt och samarbete

```yaml
version: '0.1'
status: DRAFT
confidence: MEDIUM
rights_status: OWNED_DERIVED_SUMMARY
reviewer: null
reviewed_at: null
step_id: GEN-INTRO-003
title_sv: Arbetskultur, respekt och samarbete
title_en: Work culture, respect and collaboration
phase: Välkomst och introduktion
category: Personalpolicy
step_type: Dokument
content_layer: Företag
industry: Alla
job_roles:
- Alla
responsible_role: Chef
participant_role: Deltagare
required: Obligatoriskt
estimated_time: 15 min
instructions_sv: Ta del av företagets personalpolicy och gå igenom förväntningar på respekt, kommunikation, delaktighet, ordning
  och samarbete.
instructions_en: Read the company's staff policy and review expectations for respect, communication, participation, order
  and collaboration.
help_text_sv: Det är företagets godkända policy som gäller. Steget ska länka till rätt dokumentversion.
help_text_en: The company's approved policy applies. The step must link to the correct document version.
document_links:
- Personalpolicy
completion_method: Bekräftelse
evidence_required:
- Bekräftelse
- Dokumentversion
conditions: null
due_rule: Första veckan
approval_required:
  required: false
  role: null
source_ids:
- PRD-HR-POLICY-001
source_locators:
- Personalpolicy > Trivsel, kommunikation och kreativitet
statement_class: APPLICATION
verification_status: PARTIAL
```


### GEN-INTRO-004 – Kontaktvägar och stöd

```yaml
version: '0.1'
status: DRAFT
confidence: MEDIUM
rights_status: OWNED_DERIVED_SUMMARY
reviewer: null
reviewed_at: null
step_id: GEN-INTRO-004
title_sv: Kontaktvägar och stöd
title_en: Contacts and support
phase: Välkomst och introduktion
category: Organisation
step_type: Information
content_layer: Företag
industry: Alla
job_roles:
- Alla
responsible_role: Handledare
participant_role: Deltagare
required: Obligatoriskt
estimated_time: 15 min
instructions_sv: Presentera närmaste chef, handledare, skyddsombud, arbetsmiljöansvarig, IT-support och andra relevanta kontaktpersoner.
instructions_en: Introduce the line manager, mentor, safety representative, work environment manager, IT support and other
  relevant contacts.
help_text_sv: Visa vem som kontaktas i olika situationer. Listan ska anpassas till företaget och rollen.
help_text_en: Show who to contact in different situations. The list must be adapted to the company and role.
document_links: []
completion_method: Bekräftelse
evidence_required:
- Kontaktlista
conditions: null
due_rule: Första arbetsdagen
approval_required:
  required: false
  role: null
source_ids:
- FORM-HR-ONBOARDING-001
- FORM-OHS-STAKEHOLDER-001
source_locators:
- Introduktionsblankett > närmaste chef och medarbetare
- Intressentlista
statement_class: APPLICATION
verification_status: PARTIAL
```


### GEN-REQ-001 – Arbetstider, frånvaro och praktiska personalrutiner

```yaml
version: '0.1'
status: DRAFT
confidence: MEDIUM
rights_status: OWNED_DERIVED_SUMMARY
reviewer: null
reviewed_at: null
step_id: GEN-REQ-001
title_sv: Arbetstider, frånvaro och praktiska personalrutiner
title_en: Working hours, absence and practical staff routines
phase: Grundläggande krav
category: Personalrutiner
step_type: Information
content_layer: Företag
industry: Alla
job_roles:
- Alla
responsible_role: Administratör
participant_role: Deltagare
required: Obligatoriskt
estimated_time: 20 min
instructions_sv: Gå igenom företagets aktuella rutiner för arbetstid, raster, tidrapportering, sjukfrånvaro, semester och
  ledighet.
instructions_en: Review the company's current routines for working hours, breaks, time reporting, sickness absence, holidays
  and leave.
help_text_sv: Använd inte fasta tider eller regler från gamla mallar. Företaget ska fylla i sina aktuella rutiner.
help_text_en: Do not use fixed times or rules from old templates. The company must provide its current routines.
document_links:
- Personalhandbok eller personalrutin
completion_method: Bekräftelse
evidence_required:
- Bekräftelse
conditions: null
due_rule: Första veckan
approval_required:
  required: false
  role: null
source_ids:
- FORM-HR-ONBOARDING-001
- PRD-HR-POLICY-001
source_locators:
- Introduktionsblankett > Personalfrågor
- Personalpolicy > Arbetstid
statement_class: APPLICATION
verification_status: PARTIAL
```


### GEN-REQ-002 – Arbetsmiljö, första hjälpen och skydd

```yaml
version: '0.1'
status: DRAFT
confidence: MEDIUM
rights_status: OWNED_DERIVED_SUMMARY
reviewer: null
reviewed_at: null
step_id: GEN-REQ-002
title_sv: Arbetsmiljö, första hjälpen och skydd
title_en: Work environment, first aid and protection
phase: Grundläggande krav
category: Arbetsmiljö
step_type: Möte
content_layer: Företag
industry: Alla
job_roles:
- Alla
responsible_role: Arbetsmiljöansvarig
participant_role: Deltagare
required: Obligatoriskt
estimated_time: 20–40 min
instructions_sv: Gå igenom arbetsmiljöansvar, relevanta risker, första hjälpen, skyddsutrustning och hur risker eller brister
  rapporteras.
instructions_en: Review work environment responsibilities, relevant risks, first aid, protective equipment and how to report
  risks or deficiencies.
help_text_sv: Innehållet ska anpassas efter arbetsplatsen och befattningen. Riskfyllda roller får extra bransch- och rollsteg.
help_text_en: The content must be adapted to the workplace and role. Higher-risk roles receive extra industry and role steps.
document_links:
- Arbetsmiljöpolicy
- Riskbedömning
completion_method: Bekräftelse och kunskapskontroll
evidence_required:
- Bekräftelse
- Kontrollfrågor
conditions: null
due_rule: Före självständigt arbete
approval_required:
  required: true
  role: Arbetsmiljöansvarig
source_ids:
- FORM-HR-ONBOARDING-001
- FORM-OHS-RISK-001
- FORM-OHS-INSPECTION-001
source_locators:
- Introduktionsblankett > Arbetsmiljö
- Riskutvärderingsmall
- Skyddsrond > Skyddsutrustning och första hjälpen
statement_class: APPLICATION
verification_status: PARTIAL
```


### GEN-REQ-003 – Brand, larm och utrymning

```yaml
version: '0.1'
status: DRAFT
confidence: MEDIUM
rights_status: OWNED_DERIVED_SUMMARY
reviewer: null
reviewed_at: null
step_id: GEN-REQ-003
title_sv: Brand, larm och utrymning
title_en: Fire safety, alarms and evacuation
phase: Grundläggande krav
category: Säkerhet
step_type: Kontroll
content_layer: Företag
industry: Alla
job_roles:
- Alla
responsible_role: Brandskyddsansvarig
participant_role: Deltagare
required: Obligatoriskt
estimated_time: 15–25 min
instructions_sv: Visa larmrutiner, utrymningsvägar, samlingsplats, brandskyddsutrustning och vem som kontaktas vid en nödsituation.
instructions_en: Show alarm routines, evacuation routes, assembly point, fire safety equipment and who to contact in an emergency.
help_text_sv: Genomgången ska ske på den verkliga arbetsplatsen och använda företagets aktuella nödrutiner.
help_text_en: The review must take place at the actual workplace and use the company's current emergency routines.
document_links:
- Brandskyddspolicy eller nödrutin
completion_method: Platsvisning och kunskapskontroll
evidence_required:
- Genomfört datum
- Kontrollfrågor
conditions: null
due_rule: Första arbetsdagen
approval_required:
  required: true
  role: Brandskyddsansvarig
source_ids:
- FORM-HR-ONBOARDING-001
- FORM-OHS-INSPECTION-001
source_locators:
- Introduktionsblankett > Säkerhet och larm
- Skyddsrond > Brand och andra nödsituationer
statement_class: APPLICATION
verification_status: PARTIAL
```


### GEN-REQ-004 – Rapportera avvikelse, incident och förbättringsförslag

```yaml
version: '0.1'
status: DRAFT
confidence: MEDIUM
rights_status: OWNED_DERIVED_SUMMARY
reviewer: null
reviewed_at: null
step_id: GEN-REQ-004
title_sv: Rapportera avvikelse, incident och förbättringsförslag
title_en: Report deviations, incidents and improvement ideas
phase: Grundläggande krav
category: Rapportering
step_type: Övning
content_layer: Allmänt
industry: Alla
job_roles:
- Alla
responsible_role: Chef
participant_role: Deltagare
required: Obligatoriskt
estimated_time: 15–20 min
instructions_sv: Visa hur deltagaren rapporterar en avvikelse, en incident eller ett förbättringsförslag. Genomför ett enkelt
  övningsexempel.
instructions_en: Show how the participant reports a deviation, an incident or an improvement idea. Complete a simple practice
  example.
help_text_sv: Flödena ska hållas åtskilda när de har olika ansvar, allvarlighetsgrad eller uppföljning.
help_text_en: Keep the flows separate when they have different owners, severity levels or follow-up requirements.
document_links:
- Företagets rapporteringsrutin
completion_method: Övningsrapportering
evidence_required:
- Genomförd övning
conditions: null
due_rule: Första veckan
approval_required:
  required: false
  role: null
source_ids:
- FORM-HR-ROLE-001
- FORM-HR-ONBOARDING-001
- FORM-HR-SURVEY-001
source_locators:
- Befattningsbeskrivning > Rapportera avvikelser och incidenter
- Introduktionsblankett > Förbättringsverksamhet
- Medarbetarenkät > Förbättringsarbete
statement_class: APPLICATION
verification_status: PARTIAL
```


### GEN-REQ-005 – Kvittera utrustning och företagets egendom

```yaml
version: '0.1'
status: DRAFT
confidence: MEDIUM
rights_status: OWNED_DERIVED_SUMMARY
reviewer: null
reviewed_at: null
step_id: GEN-REQ-005
title_sv: Kvittera utrustning och företagets egendom
title_en: Acknowledge equipment and company property
phase: Praktisk integration
category: Utrustning
step_type: Bekräftelse
content_layer: Företag
industry: Alla
job_roles:
- Alla
responsible_role: Administratör
participant_role: Deltagare
required: Vid behov
estimated_time: 10 min
instructions_sv: Registrera nycklar, passerkort, telefon, verktyg, arbetskläder, skyddsutrustning och annan egendom som lämnas
  ut.
instructions_en: Register keys, access cards, phone, tools, workwear, protective equipment and other property that is issued.
help_text_sv: Varje post ska kunna kopplas till person, datum, skick och eventuell återlämning.
help_text_en: Each item should be linked to a person, date, condition and possible return.
document_links: []
completion_method: Signering
evidence_required:
- Inventarielista
- Signering
conditions: Visas när utrustning lämnas ut
due_rule: Vid utlämning
approval_required:
  required: true
  role: Administratör
source_ids:
- FORM-HR-ONBOARDING-001
source_locators:
- Introduktionsblankett > Kvittering och uthämtning
statement_class: APPLICATION
verification_status: PARTIAL
```


### GEN-FUP-001 – Avstämning efter första veckan

```yaml
version: '0.1'
status: DRAFT
confidence: MEDIUM
rights_status: OWNED_DERIVED_SUMMARY
reviewer: null
reviewed_at: null
step_id: GEN-FUP-001
title_sv: Avstämning efter första veckan
title_en: First-week check-in
phase: Uppföljning och avslut
category: Uppföljning
step_type: Möte
content_layer: Allmänt
industry: Alla
job_roles:
- Alla
responsible_role: Handledare
participant_role: Deltagare
required: Rekommenderat
estimated_time: 15–20 min
instructions_sv: Följ upp vad som har fungerat, vilka frågor som finns och vilka steg, behörigheter eller utbildningar som
  återstår.
instructions_en: Review what has worked, any questions and which steps, access rights or training remain.
help_text_sv: Skapa åtgärder direkt när något saknas. Vänta inte till slutet av onboardingen.
help_text_en: Create actions immediately when something is missing. Do not wait until the end of the onboarding.
document_links: []
completion_method: Mötesanteckning
evidence_required:
- Anteckningar
- Kvarstående åtgärder
conditions: null
due_rule: Efter 5–10 arbetsdagar
approval_required:
  required: false
  role: null
source_ids:
- FORM-HR-ONBOARDING-001
- FORM-OHS-ACTION-001
source_locators:
- Tips inför uppföljningssamtal
- Målkort
statement_class: RECOMMENDATION
verification_status: PARTIAL
```


### GEN-FUP-002 – 30-dagars uppföljningssamtal

```yaml
version: '0.1'
status: DRAFT
confidence: MEDIUM
rights_status: OWNED_DERIVED_SUMMARY
reviewer: null
reviewed_at: null
step_id: GEN-FUP-002
title_sv: 30-dagars uppföljningssamtal
title_en: 30-day follow-up meeting
phase: Uppföljning och avslut
category: Uppföljning
step_type: Möte
content_layer: Allmänt
industry: Alla
job_roles:
- Alla
responsible_role: Chef
participant_role: Deltagare
required: Obligatoriskt
estimated_time: 30–45 min
instructions_sv: Följ upp arbetsuppgifter, förväntningar, samarbete, information, arbetsmiljö, stödbehov och utbildning.
instructions_en: Review work tasks, expectations, collaboration, information, work environment, support needs and training.
help_text_sv: Dokumentera överenskommelser och åtgärder, inte onödiga personliga detaljer.
help_text_en: Document agreements and actions, not unnecessary personal details.
document_links: []
completion_method: Mötesanteckning och godkännande
evidence_required:
- Sammanfattning
- Åtgärder
- Deltagarens bekräftelse
conditions: null
due_rule: Cirka 30 dagar efter start
approval_required:
  required: true
  role: Chef
source_ids:
- FORM-HR-DIALOGUE-001
- FORM-HR-ONBOARDING-001
source_locators:
- Medarbetarsamtal > Arbetsuppgifter, ledarskap, arbetsmiljö och utveckling
- Tips inför uppföljningssamtal
statement_class: APPLICATION
verification_status: PARTIAL
```


### GEN-FUP-003 – 90-dagars uppföljning och utvecklingsplan

```yaml
version: '0.1'
status: DRAFT
confidence: MEDIUM
rights_status: OWNED_DERIVED_SUMMARY
reviewer: null
reviewed_at: null
step_id: GEN-FUP-003
title_sv: 90-dagars uppföljning och utvecklingsplan
title_en: 90-day review and development plan
phase: Uppföljning och avslut
category: Utveckling
step_type: Möte
content_layer: Allmänt
industry: Alla
job_roles:
- Alla
responsible_role: Chef
participant_role: Deltagare
required: Rekommenderat
estimated_time: 45–60 min
instructions_sv: Utvärdera introduktionen, måluppfyllelse, arbetssituation, kompetensbehov och fortsatt utveckling. Skapa
  vid behov en utvecklings- eller utbildningsplan.
instructions_en: Evaluate the onboarding, goal achievement, work situation, competence needs and continued development. Create
  a development or training plan when needed.
help_text_sv: Uppföljningen ska visa om introduktionen har gett deltagaren rätt förutsättningar att arbeta självständigt.
help_text_en: The review should show whether the onboarding has given the participant the right conditions to work independently.
document_links: []
completion_method: Godkännande
evidence_required:
- Sammanfattning
- Utvecklingsplan
conditions: null
due_rule: Cirka 90 dagar efter start
approval_required:
  required: true
  role: Chef
source_ids:
- FORM-HR-DIALOGUE-001
- FORM-HR-ROLE-001
source_locators:
- Medarbetarsamtal > Uppföljning och utveckling/utbildning
- Befattningsbeskrivning > Kompetenskrav
statement_class: RECOMMENDATION
verification_status: PARTIAL
```


### GEN-FUP-004 – Kort onboarding-enkät

```yaml
version: '0.1'
status: DRAFT
confidence: MEDIUM
rights_status: OWNED_DERIVED_SUMMARY
reviewer: null
reviewed_at: null
step_id: GEN-FUP-004
title_sv: Kort onboarding-enkät
title_en: Short onboarding survey
phase: Uppföljning och avslut
category: Feedback
step_type: Enkät
content_layer: Allmänt
industry: Alla
job_roles:
- Alla
responsible_role: System
participant_role: Deltagare
required: Rekommenderat
estimated_time: 3–5 min
instructions_sv: Besvara en kort enkät om tydlighet, information, utrustning, stöd, arbetsmiljö och introduktionens kvalitet.
instructions_en: Complete a short survey about clarity, information, equipment, support, work environment and onboarding quality.
help_text_sv: Resultatet ska användas för förbättring. Det ska framgå vem som kan läsa svaren och om svaren är anonyma eller
  personkopplade.
help_text_en: The result should be used for improvement. It must be clear who can read the answers and whether they are anonymous
  or linked to the individual.
document_links: []
completion_method: Skala och fritext
evidence_required:
- Enkätsvar
conditions: null
due_rule: Efter 30 eller 90 dagar
approval_required:
  required: false
  role: null
source_ids:
- FORM-HR-SURVEY-001
- GUIDE-HR-SURVEY-001
- DATA-HR-SURVEY-001
source_locators:
- Medarbetarenkät > Trivsel, information, kompetensutveckling och förbättringsarbete
- Vägledning > Planering, anonymitet, sammanställning och återkoppling
- Sammanställning > frågeområden och procentsatser
statement_class: APPLICATION
verification_status: PARTIAL
```


### GEN-FUP-005 – Skapa handlingsplan för kvarstående behov

```yaml
version: '0.1'
status: DRAFT
confidence: MEDIUM
rights_status: OWNED_DERIVED_SUMMARY
reviewer: null
reviewed_at: null
step_id: GEN-FUP-005
title_sv: Skapa handlingsplan för kvarstående behov
title_en: Create an action plan for remaining needs
phase: Uppföljning och avslut
category: Åtgärder
step_type: Uppgift
content_layer: Allmänt
industry: Alla
job_roles:
- Alla
responsible_role: Chef
participant_role: Chef
required: Vid behov
estimated_time: 10–20 min
instructions_sv: Skapa en åtgärd med mål eller behov, aktivitet, resurser, ansvarig, tidsram, uppföljning och status.
instructions_en: Create an action with a goal or need, activity, resources, owner, timeframe, follow-up and status.
help_text_sv: Åtgärden ska gå att följa från upptäckt behov till verifierat resultat.
help_text_en: The action should be traceable from the identified need to the verified result.
document_links: []
completion_method: Handlingsplan
evidence_required:
- Ansvarig
- Slutdatum
- Uppföljningsmetod
conditions: Visas när ett behov eller en brist finns
due_rule: Bestäms per åtgärd
approval_required:
  required: true
  role: Chef
source_ids:
- FORM-OHS-ACTION-001
- GUIDE-HR-SURVEY-001
- FORM-HR-DIALOGUE-001
source_locators:
- Målkort > mål, resurser, åtgärd, tidsram, ansvarig, uppföljning och status
- Vägledning medarbetarenkät > Förbättringsarbete
- Medarbetarsamtal > Uppföljning
statement_class: APPLICATION
verification_status: PARTIAL
```


### GEN-FUP-006 – Godkänn, lås och arkivera onboardingen

```yaml
version: '0.1'
status: DRAFT
confidence: MEDIUM
rights_status: OWNED_DERIVED_SUMMARY
reviewer: null
reviewed_at: null
step_id: GEN-FUP-006
title_sv: Godkänn, lås och arkivera onboardingen
title_en: Approve, lock and archive the onboarding
phase: Uppföljning och avslut
category: Slutförande
step_type: Godkännande
content_layer: Allmänt
industry: Alla
job_roles:
- Alla
responsible_role: Chef
participant_role: Chef
required: Obligatoriskt
estimated_time: 10 min
instructions_sv: Kontrollera obligatoriska steg, kvarstående åtgärder, bekräftelser och godkännanden. Lås därefter onboardingen
  som en historisk snapshot.
instructions_en: Check mandatory steps, remaining actions, confirmations and approvals. Then lock the onboarding as a historical
  snapshot.
help_text_sv: En avslutad onboarding får inte ändras när en mall eller ett dokument senare uppdateras.
help_text_en: A completed onboarding must not change when a template or document is updated later.
document_links: []
completion_method: Godkännande
evidence_required:
- Chefens godkännande
- Slutdatum
- Snapshotversion
conditions: Alla obligatoriska steg klara eller hanterade
due_rule: När onboardingen avslutas
approval_required:
  required: true
  role: Chef
source_ids:
- FORM-HR-ONBOARDING-001
- FORM-OHS-ACTION-001
source_locators:
- Introduktionsblankett och uppföljningssamtal
- Målkort > status och uppföljning
statement_class: APPLICATION
verification_status: PARTIAL
```
