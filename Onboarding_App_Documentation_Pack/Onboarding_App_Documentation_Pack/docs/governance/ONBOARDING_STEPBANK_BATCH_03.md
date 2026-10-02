# Onboarding Stepbank – Batch 03

**Version:** 0.1  
**Datum:** 2026-07-09  
**Status:** DRAFT  
**Omfattning:** Policyprofil, kvalitet, miljö, likabehandling, IT, dataskydd, CSR och fordon.

## Sammanfattning

- 14 nya onboardingsteg
- svenska och engelska texter
- två administratörssteg
- sju allmänna eller företagsstyrda policysteg
- fem fordons- och förarsteg
- samtliga steg är källspårade och villkorsstyrda

## Viktiga beslut

- Integrerad verksamhetspolicy och separata KMA-policyer är alternativa policyprofiler.
- Dataskydd, diskriminering, skatt och trafiksäkerhet kräver aktuell sakgranskning före publicering.
- Fullständiga policytexter lagras som företagsdokument; stegbanken innehåller endast korta instruktioner och kontrollmoment.

## Steg

### ADM-POL-001 – Välj företagets policyprofil

```yaml
version: '0.1'
status: DRAFT
confidence: MEDIUM
rights_status: OWNED_DERIVED_SUMMARY
reviewer: null
reviewed_at: null
step_id: ADM-POL-001
title_sv: Välj företagets policyprofil
title_en: Select the company policy profile
phase: Förberedelse
category: Policyer
step_type: Snabbval
content_layer: Företag
industry: Alla
job_roles:
- Alla
responsible_role: Administratör
participant_role: Administratör
required: Obligatoriskt
estimated_time: 10 min
instructions_sv: Välj om företaget använder en integrerad verksamhetspolicy, separata policyer eller en egen kombination.
instructions_en: Choose whether the company uses an integrated business policy, separate policies or a custom combination.
help_text_sv: Valet styr vilka policysteg som läggs till. Undvik att visa samma budskap flera gånger.
help_text_en: The choice controls which policy steps are added. Avoid showing the same message more than once.
document_links: []
completion_method: Val
evidence_required:
- Vald policyprofil
conditions: null
due_rule: Före publicering av onboarding
approval_required:
  required: true
  role: Chef
source_ids:
- PRD-KMA-INTEGRATED-POLICY-001
- PRD-QMS-QUALITY-POLICY-001
- PRD-EMS-ENV-POLICY-001
source_locators:
- Verksamhetspolicy > Vägledning
- Kvalitetspolicy > Vägledning
- Miljöpolicy > Vägledning
statement_class: APPLICATION
verification_status: PARTIAL
```

### ADM-POL-002 – Koppla godkända policyversioner

```yaml
version: '0.1'
status: DRAFT
confidence: MEDIUM
rights_status: OWNED_DERIVED_SUMMARY
reviewer: null
reviewed_at: null
step_id: ADM-POL-002
title_sv: Koppla godkända policyversioner
title_en: Attach approved policy versions
phase: Förberedelse
category: Dokumentstyrning
step_type: Kontroll
content_layer: Företag
industry: Alla
job_roles:
- Alla
responsible_role: Administratör
participant_role: Administratör
required: Obligatoriskt
estimated_time: 15 min
instructions_sv: Koppla endast företagets aktuella och godkända policyer. Registrera titel, version, godkännare och giltighetsdatum.
instructions_en: Attach only the company's current and approved policies. Register the title, version, approver and effective date.
help_text_sv: Den publicerade onboardingen ska använda en låst dokumentversion.
help_text_en: The published onboarding must use a locked document version.
document_links: []
completion_method: Godkännande
evidence_required:
- Dokument-ID
- Version
- Godkännare
- Giltighetsdatum
conditions: null
due_rule: Före publicering av onboarding
approval_required:
  required: true
  role: Chef
source_ids:
- PRD-ESG-CSR-POLICY-001
- GUIDE-PRIVACY-GDPR-POLICY-001
- PRD-HR-EQUALITY-POLICY-001
- FORM-FLEET-SAFETY-CHECK-001
- PRD-FLEET-POLICY-001
- FORM-FLEET-LOGBOOK-001
- PRD-IT-POLICY-001
- PRD-QMS-QUALITY-POLICY-001
- PRD-EMS-ENV-POLICY-001
- PRD-KMA-INTEGRATED-POLICY-001
source_locators:
- Respektive källas policy- eller blankettavsnitt
statement_class: APPLICATION
verification_status: PARTIAL
```

### GEN-POL-001 – Förstå verksamhetspolicyn

```yaml
version: '0.1'
status: DRAFT
confidence: MEDIUM
rights_status: OWNED_DERIVED_SUMMARY
reviewer: null
reviewed_at: null
step_id: GEN-POL-001
title_sv: Förstå verksamhetspolicyn
title_en: Understand the business policy
phase: Grundläggande krav
category: Verksamhet och KMA
step_type: Dokument
content_layer: Företag
industry: Alla
job_roles:
- Alla
responsible_role: Chef
participant_role: Deltagare
required: Obligatoriskt vid integrerad policy
estimated_time: 15 min
instructions_sv: Läs företagets verksamhetspolicy och välj ett exempel på hur din roll påverkar kvalitet, miljö eller arbetsmiljö.
instructions_en: Read the company's business policy and choose one example of how your role affects quality, environment or work environment.
help_text_sv: Steget ersätter normalt separata övergripande policyintroduktioner när företaget använder en integrerad policy.
help_text_en: This step normally replaces separate high-level policy introductions when the company uses an integrated policy.
document_links: []
completion_method: Bekräftelse och kortsvar
evidence_required:
- Bekräftelse
- Praktiskt exempel
conditions: policy_profile == INTEGRATED
due_rule: Första veckan
approval_required:
  required: true
  role: Chef
source_ids:
- PRD-KMA-INTEGRATED-POLICY-001
source_locators:
- Verksamhetspolicy > Vägledning
- Verksamhetspolicy > Exempel
statement_class: APPLICATION
verification_status: PARTIAL
```

### GEN-POL-002 – Förstå kvalitetspolicyn

```yaml
version: '0.1'
status: DRAFT
confidence: MEDIUM
rights_status: OWNED_DERIVED_SUMMARY
reviewer: null
reviewed_at: null
step_id: GEN-POL-002
title_sv: Förstå kvalitetspolicyn
title_en: Understand the quality policy
phase: Grundläggande krav
category: Kvalitet
step_type: Dokument
content_layer: Företag
industry: Alla
job_roles:
- Alla
responsible_role: Kvalitetsansvarig
participant_role: Deltagare
required: Obligatoriskt när separat kvalitetspolicy används
estimated_time: 10–15 min
instructions_sv: Läs företagets kvalitetspolicy och beskriv hur du bidrar till kundnytta, rätt kvalitet och förbättringar.
instructions_en: Read the company's quality policy and describe how you contribute to customer value, correct quality and improvement.
help_text_sv: Deltagaren behöver förstå policyn i praktiken, inte kunna den ordagrant.
help_text_en: The participant needs to understand the policy in practice, not memorise it word for word.
document_links: []
completion_method: Bekräftelse och kortsvar
evidence_required:
- Bekräftelse
- Praktiskt exempel
conditions: policy_profile == SEPARATE or role_requires_quality_awareness == true
due_rule: Första veckan
approval_required:
  required: true
  role: Kvalitetsansvarig
source_ids:
- PRD-QMS-QUALITY-POLICY-001
source_locators:
- Vägledning
- Vad bör medarbetarna känna till
- Kvalitetspolicy (exempel)
statement_class: APPLICATION
verification_status: PARTIAL
```

### GEN-POL-003 – Förstå miljöpolicyn

```yaml
version: '0.1'
status: DRAFT
confidence: MEDIUM
rights_status: OWNED_DERIVED_SUMMARY
reviewer: null
reviewed_at: null
step_id: GEN-POL-003
title_sv: Förstå miljöpolicyn
title_en: Understand the environmental policy
phase: Grundläggande krav
category: Miljö
step_type: Kunskapskontroll
content_layer: Företag
industry: Alla
job_roles:
- Alla
responsible_role: Miljöansvarig
participant_role: Deltagare
required: Obligatoriskt när separat miljöpolicy används
estimated_time: 10–15 min
instructions_sv: Läs företagets miljöpolicy och identifiera den viktigaste miljöpåverkan som hör till din roll.
instructions_en: Read the company's environmental policy and identify the most important environmental impact linked to your role.
help_text_sv: Företagets faktiska miljöaspekter ska användas. ISO- och lagpåståenden ska vara verifierade separat.
help_text_en: Use the company's actual environmental aspects. ISO and legal statements must be verified separately.
document_links: []
completion_method: Quiz och kortsvar
evidence_required:
- Quizresultat
- Identifierad miljöaspekt
conditions: policy_profile == SEPARATE or role_has_environmental_impact == true
due_rule: Första veckan
approval_required:
  required: true
  role: Miljöansvarig
source_ids:
- PRD-EMS-ENV-POLICY-001
source_locators:
- Vägledning
- Vad bör medarbetarna känna till
- Miljöpolicy (exempel)
statement_class: APPLICATION
verification_status: PARTIAL
```

### GEN-POL-004 – Likabehandling och trygg rapportering

```yaml
version: '0.1'
status: DRAFT
confidence: MEDIUM
rights_status: OWNED_DERIVED_SUMMARY
reviewer: null
reviewed_at: null
step_id: GEN-POL-004
title_sv: Likabehandling och trygg rapportering
title_en: Equal treatment and safe reporting
phase: Grundläggande krav
category: Likabehandling
step_type: Information
content_layer: Företag
industry: Alla
job_roles:
- Alla
responsible_role: Chef
participant_role: Deltagare
required: Obligatoriskt
estimated_time: 15 min
instructions_sv: Gå igenom företagets policy för likabehandling, vilket beteende som inte accepteras och vart deltagaren vänder sig för stöd eller rapportering.
instructions_en: Review the company's equal treatment policy, unacceptable behaviour and where the participant can seek support or report a concern.
help_text_sv: Undvik juridiska detaljfrågor i onboarding. Fokusera på trygghet, beteende och rätt kontaktväg.
help_text_en: Avoid detailed legal testing in onboarding. Focus on safety, behaviour and the correct reporting route.
document_links: []
completion_method: Bekräftelse
evidence_required:
- Bekräftelse
- Känd kontaktväg
conditions: null
due_rule: Första veckan
approval_required:
  required: true
  role: Chef
source_ids:
- PRD-HR-EQUALITY-POLICY-001
source_locators:
- Vägledning
- Exempel på diskriminerings- och jämställdhetspolicy
statement_class: APPLICATION
verification_status: PARTIAL
```

### GEN-POL-005 – Säker användning av IT-resurser

```yaml
version: '0.1'
status: DRAFT
confidence: MEDIUM
rights_status: OWNED_DERIVED_SUMMARY
reviewer: null
reviewed_at: null
step_id: GEN-POL-005
title_sv: Säker användning av IT-resurser
title_en: Use IT resources safely
phase: Grundläggande krav
category: IT och informationssäkerhet
step_type: Kunskapskontroll
content_layer: Företag
industry: Alla
job_roles:
- Alla
responsible_role: IT-ansvarig
participant_role: Deltagare
required: Obligatoriskt för IT-användare
estimated_time: 15 min
instructions_sv: Gå igenom godkänd programvara, installationer, internetanvändning, sociala medier och hur säkerhetsproblem rapporteras.
instructions_en: Review approved software, installations, internet use, social media and how to report security issues.
help_text_sv: Företagets moderna IT-policy ska användas. Äldre hänvisningar i källmallen får inte kopieras.
help_text_en: Use the company's current IT policy. Do not copy outdated references from the source template.
document_links: []
completion_method: Quiz
evidence_required:
- Quizresultat
conditions: uses_company_it == true
due_rule: Före systemåtkomst eller första veckan
approval_required:
  required: true
  role: IT-ansvarig
source_ids:
- PRD-IT-POLICY-001
source_locators:
- IT-policy (exempel) > Individuellt ansvar
- Säkerhet
- Internet
- Privat användning
statement_class: APPLICATION
verification_status: PARTIAL
```

### GEN-POL-006 – Hantera personuppgifter korrekt

```yaml
version: '0.1'
status: DRAFT
confidence: MEDIUM
rights_status: OWNED_DERIVED_SUMMARY
reviewer: null
reviewed_at: null
step_id: GEN-POL-006
title_sv: Hantera personuppgifter korrekt
title_en: Handle personal data correctly
phase: Grundläggande krav
category: Dataskydd
step_type: Kunskapskontroll
content_layer: Företag
industry: Alla
job_roles:
- Alla
responsible_role: Dataskyddsansvarig
participant_role: Deltagare
required: Obligatoriskt när rollen hanterar personuppgifter
estimated_time: 15–20 min
instructions_sv: Förklara vad en personuppgift är, vilka uppgifter rollen får hantera och hur en misstänkt personuppgiftsincident rapporteras.
instructions_en: Explain what personal data is, which data the role may handle and how to report a suspected personal data breach.
help_text_sv: Använd korta, granskade instruktioner och företagets aktuella kontaktväg. Lägg inte in hela GDPR-vägledningen i onboardingen.
help_text_en: Use short, reviewed instructions and the company's current reporting route. Do not add the full GDPR guide to onboarding.
document_links: []
completion_method: Quiz
evidence_required:
- Quizresultat
- Känd rapporteringsväg
conditions: handles_personal_data == true
due_rule: Före åtkomst till personuppgifter
approval_required:
  required: true
  role: Dataskyddsansvarig
source_ids:
- GUIDE-PRIVACY-GDPR-POLICY-001
source_locators:
- Vad är en personuppgift?
- Vad är en personuppgiftsincident?
- Dataskyddspolicy – exempel
statement_class: APPLICATION
verification_status: UNVERIFIED
```

### GEN-POL-007 – Företagets samhällsansvar

```yaml
version: '0.1'
status: DRAFT
confidence: MEDIUM
rights_status: OWNED_DERIVED_SUMMARY
reviewer: null
reviewed_at: null
step_id: GEN-POL-007
title_sv: Företagets samhällsansvar
title_en: The company's social responsibility
phase: Välkomst och introduktion
category: Hållbarhet och etik
step_type: Information
content_layer: Företag
industry: Alla
job_roles:
- Alla
responsible_role: Chef
participant_role: Deltagare
required: Valfritt
estimated_time: 10 min
instructions_sv: Presentera företagets beslutade arbete med socialt, etiskt, miljömässigt och ekonomiskt ansvar.
instructions_en: Present the company's approved approach to social, ethical, environmental and economic responsibility.
help_text_sv: Visa endast steget när företaget faktiskt har en beslutad policy, kundförpliktelse eller upphandlingsregel.
help_text_en: Show this step only when the company has an approved policy, customer commitment or procurement requirement.
document_links: []
completion_method: Bekräftelse
evidence_required:
- Bekräftelse
conditions: company_uses_csr_policy == true
due_rule: Första månaden
approval_required:
  required: false
  role: null
source_ids:
- PRD-ESG-CSR-POLICY-001
source_locators:
- Vägledning
- Välj nivå
- CSR-policy (exempel)
statement_class: RECOMMENDATION
verification_status: PARTIAL
```

### FLEET-PREP-001 – Kontrollera körbehörighet

```yaml
version: '0.1'
status: DRAFT
confidence: MEDIUM
rights_status: OWNED_DERIVED_SUMMARY
reviewer: null
reviewed_at: null
step_id: FLEET-PREP-001
title_sv: Kontrollera körbehörighet
title_en: Verify driving authorisation
phase: Förberedelse
category: Fordon
step_type: Kontroll
content_layer: Befattning
industry: Alla
job_roles:
- Alla
responsible_role: Chef
participant_role: Administratör
required: Obligatoriskt för förare
estimated_time: 10 min
instructions_sv: Kontrollera att deltagaren har rätt behörighet och företagets godkännande för de fordon som ingår i rollen.
instructions_en: Verify that the participant has the required licence and company approval for the vehicles used in the role.
help_text_sv: Lagra endast nödvändiga uppgifter och definiera vem som ansvarar för framtida uppföljning.
help_text_en: Store only necessary information and define who is responsible for future follow-up.
document_links: []
completion_method: Godkännande
evidence_required:
- Behörighetsstatus
- Godkännare
conditions: drives_for_work == true
due_rule: Före första körningen
approval_required:
  required: true
  role: Chef
source_ids:
- PRD-FLEET-POLICY-001
source_locators:
- Fordonspolicy (exempel) > Föraren ska alltid
statement_class: APPLICATION
verification_status: PARTIAL
```

### FLEET-POL-001 – Läs och bekräfta fordonspolicyn

```yaml
version: '0.1'
status: DRAFT
confidence: MEDIUM
rights_status: OWNED_DERIVED_SUMMARY
reviewer: null
reviewed_at: null
step_id: FLEET-POL-001
title_sv: Läs och bekräfta fordonspolicyn
title_en: Read and confirm the vehicle policy
phase: Bransch- och rollspecifik introduktion
category: Fordon
step_type: Dokument
content_layer: Företag
industry: Alla
job_roles:
- Alla
responsible_role: Chef
participant_role: Deltagare
required: Obligatoriskt för förare
estimated_time: 15 min
instructions_sv: Gå igenom trafiksäkerhet, bilbälte, alkohol och droger, felrapportering, olyckor, nycklar och privat användning enligt företagets policy.
instructions_en: Review road safety, seat belts, alcohol and drugs, defect reporting, accidents, keys and private use according to company policy.
help_text_sv: Använd företagets aktuella regler. Historisk statistik och generella påståenden från mallen ska inte ingå.
help_text_en: Use the company's current rules. Do not include historical statistics or general claims from the template.
document_links: []
completion_method: Bekräftelse
evidence_required:
- Bekräftelse
conditions: drives_for_work == true
due_rule: Före första körningen
approval_required:
  required: true
  role: Chef
source_ids:
- PRD-FLEET-POLICY-001
source_locators:
- Fordonspolicy (exempel)
statement_class: APPLICATION
verification_status: PARTIAL
```

### FLEET-CTRL-001 – Genomför säkerhetskontroll av fordon

```yaml
version: '0.1'
status: DRAFT
confidence: MEDIUM
rights_status: OWNED_DERIVED_SUMMARY
reviewer: null
reviewed_at: null
step_id: FLEET-CTRL-001
title_sv: Genomför säkerhetskontroll av fordon
title_en: Complete a vehicle safety check
phase: Praktisk integration
category: Fordonssäkerhet
step_type: Praktisk uppgift
content_layer: Befattning
industry: Alla
job_roles:
- Alla
responsible_role: Handledare
participant_role: Deltagare
required: Obligatoriskt när företagets rutin kräver det
estimated_time: 15–30 min
instructions_sv: Genomför en praktisk yttre och inre säkerhetskontroll med handledare och rapportera upptäckta fel.
instructions_en: Complete a practical external and internal vehicle safety check with a supervisor and report any defects.
help_text_sv: Checklistan ska anpassas till fordonstypen. Deltagaren ska inte godkännas enbart genom läsning.
help_text_en: Adapt the checklist to the vehicle type. The participant must not be approved by reading alone.
document_links: []
completion_method: Praktiskt godkännande
evidence_required:
- Genomförd kontroll
- Handledarens godkännande
- Rapporterade fel
conditions: drives_for_work == true and company_requires_vehicle_check == true
due_rule: Före självständig körning
approval_required:
  required: true
  role: Handledare
source_ids:
- FORM-FLEET-SAFETY-CHECK-001
source_locators:
- Inledning
- Så här gör du
- Yttre säkerhetskontroll
- Inre säkerhetskontroll
statement_class: APPLICATION
verification_status: PARTIAL
```

### FLEET-LOG-001 – Lär dig företagets körjournal

```yaml
version: '0.1'
status: DRAFT
confidence: MEDIUM
rights_status: OWNED_DERIVED_SUMMARY
reviewer: null
reviewed_at: null
step_id: FLEET-LOG-001
title_sv: Lär dig företagets körjournal
title_en: Learn the company driving log
phase: Praktisk integration
category: Körjournal
step_type: Uppgift
content_layer: Företag
industry: Alla
job_roles:
- Alla
responsible_role: Administratör
participant_role: Deltagare
required: Obligatoriskt när företaget använder körjournal
estimated_time: 15 min
instructions_sv: Visa vilka uppgifter som ska registreras för varje resa och låt deltagaren göra en testregistrering.
instructions_en: Show which details must be recorded for each trip and let the participant complete a test entry.
help_text_sv: Skatteregler, gränsvärden och obligatoriska fält ska vara verifierade och ligga i företagets aktuella instruktion.
help_text_en: Tax rules, thresholds and mandatory fields must be verified and included in the company's current instruction.
document_links: []
completion_method: Godkänd testregistrering
evidence_required:
- Testpost
- Godkännande
conditions: drives_for_work == true and company_uses_driving_log == true
due_rule: Före första registreringspliktiga resan
approval_required:
  required: true
  role: Administratör
source_ids:
- FORM-FLEET-LOGBOOK-001
source_locators:
- Inledning
- Syfte
- Så här fyller du i
- Körjournal
statement_class: APPLICATION
verification_status: UNVERIFIED
```

### FLEET-INC-001 – Rapportera fordonsfel, skada eller olycka

```yaml
version: '0.1'
status: DRAFT
confidence: MEDIUM
rights_status: OWNED_DERIVED_SUMMARY
reviewer: null
reviewed_at: null
step_id: FLEET-INC-001
title_sv: Rapportera fordonsfel, skada eller olycka
title_en: Report a vehicle defect, damage or accident
phase: Bransch- och rollspecifik introduktion
category: Incidentrapportering
step_type: Kunskapskontroll
content_layer: Företag
industry: Alla
job_roles:
- Alla
responsible_role: Chef
participant_role: Deltagare
required: Obligatoriskt för förare
estimated_time: 10 min
instructions_sv: Förklara vem som kontaktas, hur fordonet tas ur bruk vid behov och var fel, skador och olyckor registreras.
instructions_en: Explain who to contact, how the vehicle is taken out of service when needed and where defects, damage and accidents are recorded.
help_text_sv: Kontaktvägar och åtgärder ska vara företagsspecifika och tillgängliga i mobilen.
help_text_en: Reporting routes and actions must be company-specific and available on mobile.
document_links: []
completion_method: Quiz
evidence_required:
- Quizresultat
- Känd kontaktväg
conditions: drives_for_work == true
due_rule: Före första körningen
approval_required:
  required: true
  role: Chef
source_ids:
- PRD-FLEET-POLICY-001
- FORM-FLEET-SAFETY-CHECK-001
source_locators:
- Fordonspolicy (exempel) > fel och olyckor
- Säkerhetskontroll > rapportera fel
statement_class: APPLICATION
verification_status: PARTIAL
```

## Nästa konsolidering

Batch 03 ska jämföras med Batch 01 och Batch 02 innan en kanonisk master publiceras.

Särskilt ska följande överlapp kontrolleras:

- arbetskultur, respekt och personalpolicy
- kvalitet, miljö och verksamhetspolicy
- IT och systemåtkomst
- avvikelse- och incidentrapportering
- utrustning och fordonsbehörighet