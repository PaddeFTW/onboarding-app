# ONBOARDING_CONTENT_BLUEPRINT.md
## Onboarding App Version 2 – Stegbank & Kunskapsbank-princip

**Beslut:**  
Detta blir huvudriktningen för Onboarding App Version 2.

### Övergripande principer
- **Hybridapp med stegbank** – Allt innehåll bryts ner till återanvändbara, spårbara steg.
- **Sex onboardingfaser** – Från förberedelser till slutförande.
- **Fyra innehållslager** – Allmänt → Bransch → Befattning → Företag.
- **Allmän grund först** – En stabil bas som passar de flesta små och medelstora företag.
- **Bygg och entreprenad som första branschpaket** – Starkt fokus på KMA (Kvalitet, Miljö, Arbetsmiljö) från de uppladdade Byggpärm-dokumenten.
- **Företag kan anpassa utan att ändra originalmallen** – Kopiera, ändra, lägga till, inaktivera, ändra ordning.
- **Kunskapsbankens princip** – Originalkällor hålls separerade från granskad, återanvändbar kunskap. Appar använder kunskapen genom urval och anpassning, inte egna kopior.
- **Källregel** – ISO-standarder och licensierade dokument får användas för egenformulerade sammanfattningar, frågor, kontrollpunkter och tillämpningar. Fullständig eller nära återgiven standardtext får **inte** läggas in i appen. AI-genererat innehåll granskas av människa före publicering.

---

## 1. Struktur för varje onboardingsteg (YAML)

Varje steg i stegbanken ska innehålla följande fält:

```yaml
step_id:                  # Unikt ID (t.ex. GEN-001, BYGG-045, ROLE-SNICK-012)
title:                    # Kort, tydlig rubrik
phase:                    # En av de sex faserna
category:                 # T.ex. Arbetsmiljö, IT, Kvalitet, Rutiner, Administration
step_type:                # Information | Uppgift | Dokument | Möte | Kontroll | Bekräftelse
content_layer:            # Allmänt | Bransch | Befattning | Företag
industry:                 # Allmänt | Bygg | Vård | Transport | etc. (tom = allmänt)
job_roles:                # Lista över relevanta befattningar (t.ex. ["Snickare", "Arbetsledare", "Platschef"])
responsible_role:         # Chef | Administratör | Handledare | Deltagare | System
participant_role:         # Vem som utför steget
required:                 # Obligatoriskt | Rekommenderat | Frivilligt
estimated_time:           # T.ex. "15 min", "1 timme", "Halvdag"
instructions:             # Vad ska göras? (klartext)
help_text:                # Hjälptext / förklaring (från befintliga dokument)
document_links:           # Länkar till mallar, policyer, rutiner (source_ids)
completion_method:        # Checkbox | Signering | Filuppladdning | Quiz | Bekräftelse
evidence_required:        # Svar | Signering | Fil | Datum | Godkännande
conditions:               # När ska steget visas? (t.ex. "Om bransch = Bygg")
due_rule:                 # Tidsregel (t.ex. "Inom 7 dagar efter start", "Före första arbetsdag")
approval_required:        # true/false + roll som godkänner
source_ids:               # Spårbarhet till originaldokument (t.ex. ["Flik7_Arbetsmiljöplan", "ISO45001_6.1"])
version:                  # Versionsnummer på steget
status:                   # Utkast | Granskad | Publicerad | Arkiverad
```

**source_ids** är kritiskt – det gör att varje steg kan spåras tillbaka till det dokument eller den kunskapsmodul det bygger på (t.ex. Flik 7 Arbetsmiljöplan, Flik 5 Kvalitetsplan, ISO 45001, SOSFS etc.).

---

## 2. De sex onboardingfaserna

1. **Förberedelse** – Innan första arbetsdag (kontrakt, IT, grundinfo)
2. **Välkomst & Introduktion** – Första dagarna (företag, kollegor, policyer)
3. **Grundläggande krav** – Obligatoriska moment (arbetsmiljö, sekretess, brand)
4. **Bransch- & rollspecifik introduktion** – Byggspecifikt, befattningsspecifikt
5. **Praktisk integration** – Arbetsuppgifter, projekt, verktyg, rutiner
6. **Uppföljning & avslut** – 30/90-dagars uppföljning, feedback, slutförande

---

## 3. Fyra innehållslager (Content Layers)

| Lager          | Beskrivning                                      | Exempel (Bygg)                          | Vem anpassar?     |
|----------------|--------------------------------------------------|-----------------------------------------|-------------------|
| **Allmänt**    | Gäller alla företag och roller                   | Sekretess, arbetstider, IT-säkerhet     | KvalitetsGruppen  |
| **Bransch**    | Specifikt för branschen                          | Bygg: Riskbedömning, PPE, BAS-P/BAS-U   | Branschpaket      |
| **Befattning** | Specifikt för roll                               | Snickare: Maskiner, fallskydd           | Rollpaket         |
| **Företag**    | Företagets egna tillägg och variationer          | Egen policy, lokala rutiner             | Kunden själv      |

**Regel:** Branschpaketet får ändra språk, exempel, roller, risker, dokument och kontrollpunkter – men **inte** betydelsen av ett lag- eller ISO-krav.

---

## 4. Steg 1 – Allmän onboardinggrund (första prioritet)

Innehåll som passar de flesta små och medelstora företag:

- Företaget och anställningen
- Arbetstider, frånvaro, ledighet
- Kontaktvägar och organisation
- IT och informationssäkerhet (GDPR, lösenord, system)
- Arbetsmiljö (grundläggande policy, tillbudsrapportering)
- Sekretess och lojalitet
- Olyckor, incidenter och första hjälpen
- Brand och utrymning
- Uppföljning och feedback

---

## 5. Steg 2 – Bygg och entreprenad (första branschpaket)

Baserat på de uppladdade Byggpärm-dokumenten (Flik 1–31) ska följande områden brytas ner till steg:

- Arbetsplatsintroduktion och ordningsregler
- Personlig skyddsutrustning (PPE)
- Arbetsmiljöplan och riskbedömning
- Risker på byggarbetsplatsen (fall, tunga lyft, kemikalier, buller etc.)
- Rapportering av tillbud och avvikelser
- Maskiner, fordon och behörigheter (ID06, besiktning)
- Ordning och säkerhet (heta arbeten, tillfällig el, etc.)
- Kvalitets- och miljörutiner (egenkontroll, källsortering, kemikalier)
- Projektroller och kontaktvägar (BAS-P/BAS-U, projektledare, skyddsombud)
- Dagbok, personalliggare och dokumentation
- ÄTA, avvikelser och ändringar
- Nödlägesberedskap och anhöriglista
- Skydds- och miljörond
- Slutbesiktning och överlämning

Varje område bryts ner till konkreta steg med `source_ids` som pekar på rätt Flik (t.ex. Flik 7 Arbetsmiljöplan, Flik 5 Kvalitetsplan, Flik 9 Riskbedömning).

---

## 6. Steg 3 – Befattningar (första roller)

- Snickare / Yrkesarbetare
- Arbetsledare
- Platschef
- Projektledare
- Administratör / KMA-ansvarig

Varje roll får specifika steg (t.ex. "Snickare – Fallskydd och personlig skyddsutrustning", "Arbetsledare – Daglig arbetsberedning och riskbedömning").

---

## 7. Steg 4 – Företagsanpassning

Företaget ska kunna:
- Kopiera en grundmall (allmän + bransch)
- Ändra texter och exempel
- Lägga till egna steg
- Inaktivera steg som inte gäller
- Ändra ordning
- Lägga till egna dokument och länkar
- Skapa en ny mallversion med versionshantering

Originalmallen (KvalitetsGruppen) får **aldrig** ändras av kunden – de arbetar alltid i en kopia.

---

## 8. Nästa konkreta steg (efter detta dokument)

1. Bryt ner det befintliga onboardingdokumentet (Word) + checklistor till steg i Steg 1 (Allmän grund).
2. Bryt ner Byggpärm-materialet (Flik 1–31) till steg i Steg 2 (Bygg och entreprenad).
3. Skapa första rollpaketen (snickare, arbetsledare etc.).
4. Bygg en enkel prototyp av stegbanken (Markdown eller enkel app-mockup).
5. Definiera hur `source_ids` kopplas till kunskapsbanken och versionshantering.

---

**Status:**  
Detta dokument är den officiella blueprinten för Onboarding App Version 2.  
Allt framtida arbete utgår från denna struktur.

**Senast uppdaterad:** 2026-07-09

---

**Vill du att jag nu börjar bryta ner materialet?**

Säg:
- "Bryt ner allmän grund först" (Steg 1)
- "Bryt ner Bygg & entreprenad" (Steg 2 – från Flik-dokumenten)
- "Skapa första rollpaket (t.ex. Snickare)"
- Eller en kombination

Jag är redo att börja producera konkreta steg i YAML-format med `source_ids`.