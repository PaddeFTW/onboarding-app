# ONBOARDING_STEG_TILLVERKNING_SV_EN.md
## Steg – Tillverkning / Produktion (Svenska + Engelska)

**Syfte:**  
Detta branschpaket bygger vidare på Steg 1 (Allmän grund) och är anpassat för tillverkande företag. Innehållet använder tidigare skapade ordlistor, termer och definitioner från Quality WorX-arbetet.

**Fokusområden:**
- Processer och arbetsinstruktioner
- Kvalitetskontroll och egenkontroll
- Maskinsäkerhet
- Ordning och reda (5S)
- Avvikelsehantering
- Arbetsmiljö i produktion (ergonomi, buller, kemikalier)
- Spårbarhet och dokumentation

Varje steg har YAML-struktur + svensk och engelsk version.

---

## Fas 4: Bransch- & rollspecifik introduktion (Tillverkning)

### Steg TILLV-001 – Processer, arbetsinstruktioner och standarder

```yaml
step_id: TILLV-001
title: Processer, arbetsinstruktioner och standarder
phase: Bransch- & rollspecifik introduktion
category: Kvalitet
step_type: Information + Uppgift
content_layer: Bransch
industry: Tillverkning
job_roles: ["Operatör", "Teamleader", "Kvalitetsansvarig"]
responsible_role: Teamleader / Processägare
participant_role: Deltagare
required: Obligatoriskt
estimated_time: 60 min
instructions_sv: "Lär dig de viktigaste processerna och arbetsinstruktionerna för din avdelning. Bekräfta att du förstår hur du ska utföra ditt arbete enligt fastställda standarder."
instructions_en: "Learn the most important processes and work instructions for your department. Confirm that you understand how to perform your work according to established standards."
help_text_sv: "Arbetsinstruktioner beskriver hur ett arbete ska utföras steg för steg. De är till för att säkerställa kvalitet och säkerhet."
help_text_en: "Work instructions describe how a task should be performed step by step. They exist to ensure quality and safety."
completion_method: Genomgång + Bekräftelse
evidence_required: Signerad bekräftelse
source_ids: ["Frågebank_Detaljerad_Per_Krav_och_Bransch_Tillverkning", "Tidigare_ordlistor_Tillverkning"]
version: 1.0
status: Publicerad
```

---

### Steg TILLV-002 – Kvalitetskontroll och egenkontroll i produktion

```yaml
step_id: TILLV-002
title: Kvalitetskontroll och egenkontroll i produktion
phase: Bransch- & rollspecifik introduktion
category: Kvalitet
step_type: Information + Uppgift
content_layer: Bransch
industry: Tillverkning
job_roles: ["Operatör", "Teamleader", "Kvalitetsansvarig"]
responsible_role: Kvalitetsansvarig / Teamleader
participant_role: Deltagare
required: Obligatoriskt
estimated_time: 50 min
instructions_sv: "Lär dig hur egenkontroll och kvalitetskontroll utförs i produktionen. Öva på att använda checklistor och mätdon samt rapportera avvikelser."
instructions_en: "Learn how self-inspection and quality control are performed in production. Practice using checklists and measuring tools and reporting deviations."
help_text_sv: "Egenkontroll är en viktig del av kvalitetsarbetet. Du kontrollerar själv att ditt arbete uppfyller kraven innan det går vidare."
help_text_en: "Self-inspection is an important part of quality work. You check yourself that your work meets the requirements before it moves on."
completion_method: Övning + Bekräftelse
evidence_required: Genomförd övning
source_ids: ["Frågebank_Detaljerad_Per_Krav_och_Bransch_Tillverkning", "ISO9001_8.6"]
version: 1.0
status: Publicerad
```

---

### Steg TILLV-003 – Maskinsäkerhet och lås/tag-out (LOTO)

```yaml
step_id: TILLV-003
title: Maskinsäkerhet och lås/tag-out (LOTO)
phase: Bransch- & rollspecifik introduktion
category: Arbetsmiljö
step_type: Information + Kontroll
content_layer: Bransch
industry: Tillverkning
job_roles: ["Operatör", "Underhåll", "Teamleader"]
responsible_role: Teamleader / Säkerhetsansvarig
participant_role: Deltagare
required: Obligatoriskt
estimated_time: 45 min
instructions_sv: "Lär dig företagets rutiner för maskinsäkerhet och lås/tag-out (LOTO). Bekräfta att du förstår hur du säkert stoppar, låser och märker maskiner vid underhåll eller felsökning."
instructions_en: "Learn the company's routines for machine safety and lockout/tagout (LOTO). Confirm that you understand how to safely stop, lock and tag machines during maintenance or troubleshooting."
help_text_sv: "LOTO (Lockout/Tagout) är en säkerhetsrutin som förhindrar att maskiner startar oavsiktligt under underhåll. Det är livsviktigt att följa rutinen."
help_text_en: "LOTO (Lockout/Tagout) is a safety routine that prevents machines from starting unintentionally during maintenance. It is vital to follow the routine."
completion_method: Teori + Praktisk demonstration
evidence_required: Godkänd demonstration
source_ids: ["Frågebank_Detaljerad_Per_Krav_och_Bransch_Tillverkning", "ISO45001_8.1"]
version: 1.0
status: Publicerad
```

---

### Steg TILLV-004 – 5S – Ordning och reda på arbetsplatsen

```yaml
step_id: TILLV-004
title: 5S – Ordning och reda på arbetsplatsen
phase: Bransch- & rollspecifik introduktion
category: Kvalitet + Arbetsmiljö
step_type: Information + Uppgift
content_layer: Bransch
industry: Tillverkning
job_roles: ["Operatör", "Teamleader"]
responsible_role: Teamleader
participant_role: Deltagare
required: Rekommenderat (ofta obligatoriskt i praktiken)
estimated_time: 40 min
instructions_sv: "Lär dig 5S-principerna (Sortera, Systematisera, Städa, Standardisera, Skapa vana). Delta i en 5S-genomgång av din arbetsstation."
instructions_en: "Learn the 5S principles (Sort, Set in order, Shine, Standardize, Sustain). Participate in a 5S review of your workstation."
help_text_sv: "5S handlar om att skapa en ren, säker och effektiv arbetsplats. Det minskar fel, sparar tid och ökar trivseln."
help_text_en: "5S is about creating a clean, safe and efficient workplace. It reduces errors, saves time and increases job satisfaction."
completion_method: Deltagande + Bekräftelse
evidence_required: Genomförd 5S-genomgång
source_ids: ["Tidigare_ordlistor_Tillverkning", "Frågebank_Tillverkning"]
version: 1.0
status: Publicerad
```

---

### Steg TILLV-005 – Avvikelsehantering i produktion

```yaml
step_id: TILLV-005
title: Avvikelsehantering i produktion
phase: Bransch- & rollspecifik introduktion
category: Kvalitet
step_type: Information + Uppgift
content_layer: Bransch
industry: Tillverkning
job_roles: ["Operatör", "Teamleader", "Kvalitetsansvarig"]
responsible_role: Teamleader / Kvalitetsansvarig
participant_role: Deltagare
required: Obligatoriskt
estimated_time: 35 min
instructions_sv: "Lär dig hur avvikelser i produktionen rapporteras och hanteras. Öva på att registrera en avvikelse och förstå hur korrigerande åtgärder tas fram."
instructions_en: "Learn how deviations in production are reported and handled. Practice registering a deviation and understand how corrective actions are developed."
help_text_sv: "En avvikelse är när något inte går enligt plan eller krav. Alla avvikelser ska rapporteras så att vi kan förbättra oss och undvika upprepning."
help_text_en: "A deviation is when something does not go according to plan or requirements. All deviations must be reported so we can improve and avoid repetition."
completion_method: Övningsrapportering
evidence_required: Genomförd övning
source_ids: ["Frågebank_Detaljerad_Per_Krav_och_Bransch_Tillverkning", "ISO9001_10.2"]
version: 1.0
status: Publicerad
```

---

### Steg TILLV-006 – Ergonomi och fysisk belastning i produktion

```yaml
step_id: TILLV-006
title: Ergonomi och fysisk belastning i produktion
phase: Bransch- & rollspecifik introduktion
category: Arbetsmiljö
step_type: Information
content_layer: Bransch
industry: Tillverkning
job_roles: ["Operatör", "Teamleader"]
responsible_role: Arbetsmiljöansvarig / Teamleader
participant_role: Deltagare
required: Rekommenderat
estimated_time: 30 min
instructions_sv: "Lär dig hur du arbetar ergonomiskt vid maskiner och monteringsstationer. Förstå risker med tunga lyft, upprepade rörelser och statiska arbetsställningar."
instructions_en: "Learn how to work ergonomically at machines and assembly stations. Understand risks associated with heavy lifting, repetitive movements and static work postures."
help_text_sv: "Dålig ergonomi kan leda till belastningsskador. Använd rätt teknik, hjälpmedel och ta pauser när det behövs."
help_text_en: "Poor ergonomics can lead to strain injuries. Use correct technique, aids and take breaks when needed."
completion_method: Bekräftelse
source_ids: ["Frågebank_Detaljerad_Per_Krav_och_Bransch_Tillverkning", "ISO45001_6.1"]
version: 1.0
status: Publicerad
```

---

### Steg TILLV-007 – Buller, kemikalier och arbetsmiljörisker i produktion

```yaml
step_id: TILLV-007
title: Buller, kemikalier och arbetsmiljörisker i produktion
phase: Bransch- & rollspecifik introduktion
category: Arbetsmiljö
step_type: Information + Kontroll
content_layer: Bransch
industry: Tillverkning
job_roles: ["Operatör", "Underhåll"]
responsible_role: Arbetsmiljöansvarig
participant_role: Deltagare
required: Obligatoriskt (vid relevant exponering)
estimated_time: 35 min
instructions_sv: "Lär dig vilka buller- och kemikalierisker som finns på din arbetsplats. Bekräfta att du vet hur du skyddar dig (hörselskydd, ventilation, skyddsutrustning)."
instructions_en: "Learn which noise and chemical risks exist at your workplace. Confirm that you know how to protect yourself (hearing protection, ventilation, protective equipment)."
help_text_sv: "Använd alltid rätt skyddsutrustning vid buller eller kemikalier. Följ säkerhetsdatablad och rutiner."
help_text_en: "Always use the correct protective equipment when exposed to noise or chemicals. Follow safety data sheets and routines."
completion_method: Bekräftelse + Platsvisning
evidence_required: Godkänd genomgång
source_ids: ["Frågebank_Detaljerad_Per_Krav_och_Bransch_Tillverkning", "ISO45001_6.1"]
version: 1.0
status: Publicerad
```

---

### Steg TILLV-008 – Spårbarhet, märkning och dokumentation

```yaml
step_id: TILLV-008
title: Spårbarhet, märkning och dokumentation
phase: Bransch- & rollspecifik introduktion
category: Kvalitet
step_type: Information + Uppgift
content_layer: Bransch
industry: Tillverkning
job_roles: ["Operatör", "Teamleader", "Kvalitetsansvarig"]
responsible_role: Kvalitetsansvarig
participant_role: Deltagare
required: Obligatoriskt
estimated_time: 30 min
instructions_sv: "Lär dig hur spårbarhet säkerställs i produktionen (batchnummer, serienummer, märkning). Öva på att registrera och spåra ett parti."
instructions_en: "Learn how traceability is ensured in production (batch numbers, serial numbers, labeling). Practice registering and tracing a batch."
help_text_sv: "God spårbarhet är viktig vid reklamationer och kvalitetsproblem. Du måste kunna visa var ett visst parti kommer ifrån och vart det har gått."
help_text_en: "Good traceability is important in case of complaints and quality issues. You must be able to show where a certain batch comes from and where it has gone."
completion_method: Övning
evidence_required: Genomförd övning
source_ids: ["Frågebank_Detaljerad_Per_Krav_och_Bransch_Tillverkning", "ISO9001_8.5"]
version: 1.0
status: Publicerad
```

---

## Sammanfattning – Tillverkning / Produktion (första omgång)

Ovanstående 8 steg utgör en bra grund för tillverkande företag. De är anpassade efter vanliga behov i produktion och använder tidigare skapade termer och definitioner.

**Fortsättning kan inkludera:**
- Leverantörshantering och inkommande kontroll
- Underhållsrutiner (förebyggande underhåll)
- Skiftöverlämning
- Specifika steg för roller (t.ex. Operatör, Teamleader, Kvalitetsinspektör)
- Miljöaspekter i produktion (energi, avfall, kemikalier)

---

**Status:**  
Steg för Tillverkning / Produktion (första omgång) är levererad på svenska + engelska.

**Vill du ha:**
- Fler steg inom Tillverkning?
- Gå vidare till nästa bransch (t.ex. Vård & Omsorg)?
- Skapa rollpaket för Tillverkning (t.ex. Operatör + Teamleader)?

Svara med vad du vill ha härnäst. Vi fortsätter noggrant.