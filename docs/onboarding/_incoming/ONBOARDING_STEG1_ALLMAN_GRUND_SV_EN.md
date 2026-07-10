# ONBOARDING_STEG1_ALLMAN_GRUND_SV_EN.md
## Steg 1 – Allmän grund (Svenska + Engelska)

**Syfte:**  
Detta är den gemensamma basen som alla branscher bygger vidare på. Innehållet är generellt och passar de flesta små och medelstora företag i Sverige.

**Struktur:**  
Varje steg presenteras med:
- YAML-struktur (klar att använda i app/stegbank)
- Svensk version
- Engelsk version (för internationella medarbetare)
- `source_ids` där relevant (återanvändning av tidigare ordlistor och definitioner)

---

## Fas 1: Förberedelse (Före första arbetsdag)

### Steg GEN-001 – Anställningsavtal och sekretess

```yaml
step_id: GEN-001
title: Anställningsavtal och sekretess
phase: Förberedelse
category: Administration
step_type: Dokument
content_layer: Allmänt
industry: 
job_roles: []
responsible_role: Administratör
participant_role: Deltagare
required: Obligatoriskt
estimated_time: 30 min
instructions_sv: "Läs igenom och signera ditt anställningsavtal samt sekretessavtalet. Kontakta din chef om du har frågor."
instructions_en: "Read and sign your employment contract and confidentiality agreement. Contact your manager if you have any questions."
help_text_sv: "Sekretessavtalet skyddar företagets och kunders information. Du får inte dela konfidentiell information varken under eller efter anställningen."
help_text_en: "The confidentiality agreement protects the company's and customers' information. You must not share confidential information during or after your employment."
completion_method: Signering
evidence_required: Signerad handling
conditions: 
due_rule: Innan första arbetsdag
approval_required: true
source_ids: ["Ordlista_Allman_Grund", "Tidigare_Onboarding_PDF"]
version: 1.0
status: Publicerad
```

**Svensk hjälptext (färdig att använda):**  
Sekretessavtalet skyddar företagets och kunders information. Du får inte dela konfidentiell information varken under eller efter anställningen.

**English help text:**  
The confidentiality agreement protects the company's and customers' information. You must not share confidential information during or after your employment.

---

### Steg GEN-002 – IT-konto och systemåtkomst

```yaml
step_id: GEN-002
title: IT-konto och systemåtkomst
phase: Förberedelse
category: IT och informationssäkerhet
step_type: Uppgift
content_layer: Allmänt
industry: 
job_roles: []
responsible_role: IT-administratör
participant_role: Deltagare
required: Obligatoriskt
estimated_time: 45 min
instructions_sv: "Logga in på ditt nya IT-konto och byt lösenord. Bekräfta att du har tillgång till e-post, intranät och nödvändiga system."
instructions_en: "Log in to your new IT account and change your password. Confirm that you have access to email, intranet and necessary systems."
help_text_sv: "Använd starka lösenord och dela aldrig dina inloggningsuppgifter. Följ företagets policy för informationssäkerhet."
help_text_en: "Use strong passwords and never share your login details. Follow the company's information security policy."
completion_method: Bekräftelse + Lösenordsbyte
evidence_required: Bekräftad inloggning
source_ids: ["Ordlista_IT_Sakerhet"]
version: 1.0
status: Publicerad
```

---

### Steg GEN-003 – Grundläggande kontaktvägar och organisation

```yaml
step_id: GEN-003
title: Grundläggande kontaktvägar och organisation
phase: Förberedelse
category: Administration
step_type: Information
content_layer: Allmänt
industry: 
job_roles: []
responsible_role: Chef / Handledare
participant_role: Deltagare
required: Obligatoriskt
estimated_time: 20 min
instructions_sv: "Läs igenom företagets organisationsschema och viktiga kontaktpersoner (chef, HR, IT-support, skyddsombud)."
instructions_en: "Read through the company's organizational chart and key contact persons (manager, HR, IT support, safety representative)."
help_text_sv: "Det är viktigt att du vet vem du ska vända dig till vid olika frågor. Spara kontaktuppgifterna."
help_text_en: "It is important that you know who to contact for different questions. Save the contact details."
completion_method: Bekräftelse
source_ids: ["Tidigare_Onboarding_PDF"]
version: 1.0
status: Publicerad
```

---

## Fas 2: Välkomst & Introduktion (Första dagarna)

### Steg GEN-004 – Företagets historia, värderingar och uppdrag

```yaml
step_id: GEN-004
title: Företagets historia, värderingar och uppdrag
phase: Välkomst & Introduktion
category: Företagskultur
step_type: Information
content_layer: Allmänt
industry: 
job_roles: []
responsible_role: Chef
participant_role: Deltagare
required: Rekommenderat
estimated_time: 30 min
instructions_sv: "Läs om företagets historia, värderingar och vad vi vill uppnå. Reflektera över hur du kan bidra."
instructions_en: "Read about the company's history, values and what we want to achieve. Reflect on how you can contribute."
help_text_sv: "Våra värderingar styr hur vi arbetar tillsammans och mot våra kunder."
help_text_en: "Our values guide how we work together and with our customers."
completion_method: Bekräftelse
source_ids: ["Tidigare_Onboarding_PDF"]
version: 1.0
status: Publicerad
```

---

### Steg GEN-005 – Arbetstider, frånvaro och ledighet

```yaml
step_id: GEN-005
title: Arbetstider, frånvaro och ledighet
phase: Välkomst & Introduktion
category: Administration
step_type: Information + Uppgift
content_layer: Allmänt
industry: 
job_roles: []
responsible_role: Administratör
participant_role: Deltagare
required: Obligatoriskt
estimated_time: 25 min
instructions_sv: "Läs företagets policy för arbetstider, sjukanmälan, semester och ledighet. Bekräfta att du förstår rutinerna."
instructions_en: "Read the company's policy on working hours, sick leave, vacation and time off. Confirm that you understand the routines."
help_text_sv: "Sjukanmälan ska göras senast kl 07:00 samma dag. Semester planeras i god tid."
help_text_en: "Sick leave must be reported no later than 07:00 on the same day. Vacation should be planned well in advance."
completion_method: Bekräftelse
source_ids: ["Ordlista_Allman_Grund"]
version: 1.0
status: Publicerad
```

---

### Steg GEN-006 – Informationssäkerhet och GDPR

```yaml
step_id: GEN-006
title: Informationssäkerhet och GDPR
phase: Välkomst & Introduktion
category: IT och informationssäkerhet
step_type: Information + Kontroll
content_layer: Allmänt
industry: 
job_roles: []
responsible_role: IT-administratör
participant_role: Deltagare
required: Obligatoriskt
estimated_time: 40 min
instructions_sv: "Gå igenom företagets policy för informationssäkerhet och GDPR. Genomför det korta kunskapstestet."
instructions_en: "Go through the company's information security and GDPR policy. Complete the short knowledge test."
help_text_sv: "Du är personligt ansvarig för hur du hanterar personuppgifter och företagets information."
help_text_en: "You are personally responsible for how you handle personal data and the company's information."
completion_method: Quiz + Bekräftelse
evidence_required: Godkänt test
source_ids: ["Ordlista_IT_Sakerhet", "Tidigare_Frågebank"]
version: 1.0
status: Publicerad
```

---

## Fas 3: Grundläggande krav (Obligatoriska moment)

### Steg GEN-007 – Arbetsmiljö – Grundläggande policy och ansvar

```yaml
step_id: GEN-007
title: Arbetsmiljö – Grundläggande policy och ansvar
phase: Grundläggande krav
category: Arbetsmiljö
step_type: Information
content_layer: Allmänt
industry: 
job_roles: []
responsible_role: Chef / Skyddsombud
participant_role: Deltagare
required: Obligatoriskt
estimated_time: 35 min
instructions_sv: "Läs företagets arbetsmiljöpolicy. Förstå ditt eget ansvar och hur du rapporterar risker och tillbud."
instructions_en: "Read the company's work environment policy. Understand your own responsibility and how to report risks and incidents."
help_text_sv: "Alla har ansvar för arbetsmiljön. Du ska rapportera risker, tillbud och incidenter direkt."
help_text_en: "Everyone has responsibility for the work environment. You must report risks, incidents and near-misses immediately."
completion_method: Bekräftelse
source_ids: ["ISO45001_5.1", "Tidigare_Frågebank_Arbetsmiljö"]
version: 1.0
status: Publicerad
```

---

### Steg GEN-008 – Rapportering av tillbud, avvikelser och incidenter

```yaml
step_id: GEN-008
title: Rapportering av tillbud, avvikelser och incidenter
phase: Grundläggande krav
category: Arbetsmiljö
step_type: Information + Uppgift
content_layer: Allmänt
industry: 
job_roles: []
responsible_role: Chef
participant_role: Deltagare
required: Obligatoriskt
estimated_time: 30 min
instructions_sv: "Lär dig hur du rapporterar tillbud, avvikelser och incidenter. Testa systemet med ett övningsexempel."
instructions_en: "Learn how to report incidents, deviations and near-misses. Test the system with a practice example."
help_text_sv: "En avvikelse är när något inte går som det ska. Ett tillbud är en händelse som kunde ha lett till skada. Båda ska rapporteras."
help_text_en: "A deviation is when something does not go as planned. An incident is an event that could have led to injury. Both must be reported."
completion_method: Övningsrapportering
evidence_required: Genomförd övning
source_ids: ["Frågebank_Detaljerad_Per_Krav_och_Bransch", "Ordlista_Allman_Grund"]
version: 1.0
status: Publicerad
```

---

### Steg GEN-009 – Brandskydd och utrymning

```yaml
step_id: GEN-009
title: Brandskydd och utrymning
phase: Grundläggande krav
category: Arbetsmiljö
step_type: Information + Kontroll
content_layer: Allmänt
industry: 
job_roles: []
responsible_role: Brandskyddsansvarig
participant_role: Deltagare
required: Obligatoriskt
estimated_time: 25 min
instructions_sv: "Gå igenom brandskyddsinstruktioner och utrymningsvägar. Bekräfta att du vet var närmaste utrymningsväg och samlingsplats finns."
instructions_en: "Go through fire safety instructions and evacuation routes. Confirm that you know where the nearest evacuation route and assembly point are located."
help_text_sv: "Vid brandlarm – lämna byggnaden omedelbart via närmaste utrymningsväg. Gå inte tillbaka förrän det är klart."
help_text_en: "In case of fire alarm – leave the building immediately via the nearest evacuation route. Do not return until it is clear."
completion_method: Bekräftelse + Platsvisning
source_ids: ["Tidigare_Onboarding_PDF"]
version: 1.0
status: Publicerad
```

---

### Steg GEN-010 – Första hjälpen och olyckor

```yaml
step_id: GEN-010
title: Första hjälpen och olyckor
phase: Grundläggande krav
category: Arbetsmiljö
step_type: Information
content_layer: Allmänt
industry: 
job_roles: []
responsible_role: Första hjälpen-ansvarig
participant_role: Deltagare
required: Obligatoriskt
estimated_time: 30 min
instructions_sv: "Lär dig var första hjälpen-utrustning finns och vem som är utbildad i första hjälpen. Vet hur du larmar vid olycka."
instructions_en: "Learn where first aid equipment is located and who is trained in first aid. Know how to raise the alarm in case of an accident."
help_text_sv: "Vid allvarlig olycka – ring 112. Informera alltid närmaste chef vid tillbud eller skada."
help_text_en: "In case of serious accident – call 112. Always inform your nearest manager in case of incident or injury."
completion_method: Bekräftelse
source_ids: ["Tidigare_Onboarding_PDF", "Ordlista_Allman_Grund"]
version: 1.0
status: Publicerad
```

---

## Sammanfattning – Steg 1 Allmän grund (färdig bas)

Ovanstående 10 steg utgör en stabil och professionell grund som kan användas av alla branscher. De är skrivna på vardagssvenska med engelska översättningar och använder tidigare skapade termer och definitioner.

**Nästa rekommenderade steg:**
- **C** – Skapa Bygg & Anläggning (anpassa och bygg vidare på ovanstående)
- Eller fortsätt med fler allmänna steg (t.ex. lönesystem, personalhandbok, etik)

---

**Status:**  
Steg 1 – Allmän grund är levererad på svenska + engelska med YAML-struktur.

**Vill du ha fler steg i den allmänna grunden, eller gå vidare till Steg C (Bygg)?**  
Svara **"Fortsätt med fler allmänna steg"** eller **"Gå till C – Bygg"**.