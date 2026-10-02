# Onboarding Review and Publishing Rules v0.1

**Datum:** 2026-07-09  
**Status:** APPROVED_AS_PROCESS  
**Syfte:** Förhindra att äldre, felklassificerade eller osäkra formuleringar publiceras som krav i Onboarding App.

## 1. Statusflöde

```text
DRAFT
→ SOURCE_VERIFIED
→ DOMAIN_REVIEWED
→ COPYRIGHT_REVIEWED
→ APPROVED
→ PUBLISHED
```

## 2. Minimikrav för ett publicerat steg

Ett steg måste ha:

- unikt `step_id`
- minst ett registrerat `source_id`
- tydlig `source_locator`
- stegtyp och innehållslager
- ansvarig roll och deltagarroll
- villkor för när steget visas
- bevis eller slutförandemetod
- klassificering av påståendet
- verifieringsstatus
- versionsnummer
- granskare och granskningsdatum

## 3. Påståendeklasser

| Klass | Betydelse |
|---|---|
| `FACT` | Kontrollerbart sakförhållande i källan |
| `REQUIREMENT_SUMMARY` | Egenformulerad sammanfattning av verifierat krav |
| `INTERPRETATION` | Sakgranskarens tolkning |
| `APPLICATION` | Praktiskt sätt att använda kunskapen |
| `EXAMPLE` | Icke-bindande exempel |
| `RECOMMENDATION` | Rekommenderat arbetssätt |
| `COMPANY_RULE` | Företagets beslutade regel |

## 4. Hög risk – obligatorisk kontroll

Följande innehåll kräver särskild granskning:

- lagar och föreskrifter
- diskriminering och arbetsrätt
- dataskydd
- skatt och körjournal
- arbetsmiljö och trafiksäkerhet
- exakta myndighetsuppgifter
- ISO-krav och standardversioner
- känsliga personuppgifter
- instruktioner som kan påverka säkerhet eller hälsa

## 5. Äldre dokument

När ett original innehåller äldre information ska:

1. originalet bevaras oförändrat
2. källregistret märkas med verifieringsbehov
3. apptexten skrivas om med neutral formulering
4. aktuell primärkälla kontrolleras före publicering
5. granskningsdatum registreras

## 6. Företagets regel kontra allmänt krav

Exempel:

- **Företagsregel:** ”Privat användning av företagets dator är inte tillåten.”
- **Allmänt krav:** får endast anges efter verifiering mot relevant lag eller standard.
- **Rekommendation:** ”Använd ett unikt lösenord och följ företagets instruktion för inloggning.”

Dessa får inte blandas ihop.

## 7. Integritet i uppföljning

Onboarding ska endast lagra uppgifter som behövs för:

- genomförande
- ansvar
- behörighet
- bevis
- uppföljning
- säkerhet

Känsliga personuppgifter och privata fritextanteckningar ska undvikas om de inte är nödvändiga, rättsligt motiverade och särskilt skyddade.

## 8. Snapshot och historik

Avslutad onboarding ska låsas med:

- mallversion
- stegversioner
- dokumentversioner
- svar och bevis
- godkännanden
- avslutsdatum

Senare ändringar får inte skriva om historiken.

## 9. Språkregel

- skriv enkelt och konkret
- skriv ut förkortningar första gången
- använd vardagssvenska i instruktioner
- behåll korrekt juridisk och teknisk term i hjälptext
- undvik ordagrann kopiering från original
