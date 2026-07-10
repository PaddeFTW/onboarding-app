# MULTI_INDUSTRY_ONBOARDING_BLUEPRINT.md
## Onboarding App Version 2 – Flera branscher + Engelska

**Uppdaterad enligt användarens instruktion 2026-07-09**

### Mål
Skapa en skalbar stegbank för onboarding som:
- Inte bara täcker Bygg & Anläggning
- Använder tidigare skapade ordlistor, termer och definitioner från Quality WorX-arbetet
- Täcker flera optimala branscher för svenska SMEs
- Inkluderar engelska versioner (för internationella medarbetare, dotterbolag eller exportföretag)
- Följer kunskapsbankens princip (source_ids, versionshantering, granskning)
- Tillåter företagsanpassning utan att ändra originalmallar

---

## 1. Valda optimala branscher (första omgången)

Vi börjar med följande 6 branscher som är mest relevanta för små och medelstora företag som använder ISO 9001/14001/45001 + svenska lagkrav:

| Nr | Bransch                        | Varför prioriterad?                              | Nyckelområden (utöver allmän grund)          | Engelsk version |
|----|--------------------------------|--------------------------------------------------|----------------------------------------------|-----------------|
| 1  | **Bygg & Anläggning**          | Mycket KMA-krav, PBL, AFS, stort behov           | Riskbedömning, PPE, BAS-P/BAS-U, egenkontroll | Ja             |
| 2  | **Tillverkning / Produktion**  | Vanligast bland SMEs med ISO                     | Processer, kvalitet, maskinsäkerhet, 5S      | Ja             |
| 3  | **Vård & Omsorg**              | SOSFS 2011:9 + ISO, hög reglering                | Brukarfokus, avvikelser, sekretess, hygien   | Ja             |
| 4  | **Transport & Logistik**       | ADR, arbetstider, trafiksäkerhet                 | Fordon, lastsäkring, kör- och vilotider      | Ja             |
| 5  | **Fastighet & Städ / Service** | Vanligt, ergonomiska risker, kemikalier          | Städmetoder, kemikaliehantering, ergonomi    | Ja             |
| 6  | **Livsmedel / Restaurang**     | HACCP, livsmedelslagstiftning                    | Kritiska styrpunkter, hygien, temperatur     | Ja             |

Senare kan vi lägga till: El & VVS, Redovisning/Konsult, Hotell, Detaljhandel.

---

## 2. Gemensam struktur för alla branscher

Varje branschpaket innehåller:

- **Allmän grund** (samma för alla branscher – återanvänds)
- **Branschspecifika steg** (anpassade termer, risker, dokument, rutiner)
- **Roll-specifika steg** (t.ex. Snickare vs Platschef, eller Sjuksköterska vs Vårdbiträde)
- **Engelsk översättning** av alla steg (parallell struktur)

Varje steg använder fälten från `ONBOARDING_CONTENT_BLUEPRINT.md` + `source_ids` som pekar på:
- Tidigare skapade ordlistor och definitioner
- Flik-dokument från Byggpärm (för bygg)
- ISO-krav (egenformulerade tolkningar)
- Tidigare Frågebank och manualtexter

---

## 3. Tidigare skapade ordlistor & termer som ska återanvändas

Från tidigare arbete i chatten använder vi:

- Ordlistor per bransch (Fastighet & Städ, El & VVS, Redovisning, Bilverkstad m.fl.)
- Termer och definitioner från ISO 9001/14001/45001 (egenformulerade, enkla)
- Frågebankens branschanpassade svar
- KMA-begrepp från Byggpärm (BAS-P, BAS-U, egenkontroll, riskbedömning, ÄTA, dagbok etc.)
- Allmänna termer: avvikelse, tillbud, incident, korrigerande åtgärd, intressent, processägare etc.

**Exempel på återanvändning:**
- Termen "riskbedömning" har redan en enkel definition från tidigare arbete → används i alla branscher med branschanpassade exempel.
- "Egenkontroll" i bygg → anpassas till "egenkontroll i produktion" i tillverkning och "egenkontroll i vården" i vård.

---

## 4. Faser som gäller för alla branscher

Samma sex faser som i huvudblueprinten:

1. Förberedelse
2. Välkomst & Introduktion
3. Grundläggande krav
4. Bransch- & rollspecifik introduktion
5. Praktisk integration
6. Uppföljning & avslut

---

## 5. Innehållslager (samma för alla branscher)

| Lager          | Beskrivning                              | Exempel (Vård)                     | Exempel (Tillverkning)          |
|----------------|------------------------------------------|------------------------------------|---------------------------------|
| Allmänt        | Gemensamt för alla                       | Sekretess, IT-säkerhet             | Sekretess, IT-säkerhet          |
| Bransch        | Specifikt för branschen                  | Hygien, brukarfokus, SOSFS         | Maskinsäkerhet, 5S, kvalitet    |
| Befattning     | Specifikt för roll                       | Sjuksköterska vs Vårdbiträde       | Operatör vs Teamleader          |
| Företag        | Företagets egna tillägg                  | Lokala rutiner                     | Egen processbeskrivning         |

---

## 6. Arbetsordning (flera steg)

**Steg A (detta dokument)** – Blueprint för multi-industri + engelska (klart)

**Steg B** – Skapa **Allmän grund** (Steg 1) på svenska + engelska  
(Detta blir basen som alla branscher bygger på)

**Steg C** – Skapa **Bygg & Anläggning** komplett (svenska + engelska)  
(Använder tidigare Byggpärm-material + ordlistor)

**Steg D** – Skapa **Tillverkning / Produktion** (svenska + engelska)

**Steg E** – Skapa **Vård & Omsorg** (svenska + engelska)

**Steg F** – Skapa **Transport & Logistik** + **Fastighet & Städ** + **Livsmedel**

**Steg G** – Skapa rollpaket för varje bransch (börjar med 2–3 roller per bransch)

**Steg H** – Skapa engelska master-översättning av hela strukturen

---

## 7. Källhantering och versionshantering

- Varje steg får `source_ids` som pekar på:
  - Tidigare ordlistor (t.ex. "Ordlista_Fastighet_Städ_v1")
  - Tidigare Frågebank ("Frågebank_Detaljerad_Per_Krav_och_Bransch")
  - Byggpärm Flikar (för bygg)
  - ISO 9001/14001/45001 (egenformulerade tolkningar)
  - SOSFS 2011:9 (för vård)

- Alla steg versionshanteras.
- AI-genererat innehåll granskas av människa.
- Fullständig standardtext från ISO får inte användas – bara egenformulerade sammanfattningar och tillämpningar.

---

## 8. Nästa konkreta steg

Svara med vilket steg du vill göra nu:

**B** – Skapa Allmän grund (svenska + engelska) – basen för allt

**C** – Skapa Bygg & Anläggning komplett (svenska + engelska)

**D** – Skapa Tillverkning / Produktion

**E** – Skapa Vård & Omsorg

Eller säg **"B + C"** om du vill ha både allmän grund och bygg först.

Jag kommer att leverera i YAML-format med fullständiga fält, inklusive `source_ids` och engelska översättningar där det är relevant.

---

**Status:**  
Detta är den uppdaterade multi-industri blueprinten.  
Uppgiften utförs noggrant i flera steg enligt din instruktion.

**Senast uppdaterad:** 2026-07-09

---

**Klar att fortsätta?**  
Säg bara **B**, **C**, **B + C** eller vilket steg du vill ha härnäst.