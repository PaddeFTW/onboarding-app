# Changelog

## Unreleased

### Hybrid Foundation — Del 3 (lokal förhandsvisning)

- Systemmall är låst och kan bara kopieras
- Företagsutkast kan döpas om och få steg borttagna
- Publicerad version är låst; ny onboarding får en fryst kopia
- Arkivering stoppar nya onboardingar från den versionen
- Sparning sker bara i webbläsaren, route `/onboarding/templates`

### Hybrid Foundation — Del 2 (klar, i produktion)

- Härdad återupptagning och normalisering av sparad onboardingdata
- Gemensam kontroll för kvarstående obligatoriska steg
- Förbättrad completion-/sammanfattningsvy och draft-hantering
- Mergad till `main` via PR #4, status via PR #5

### Hybrid Foundation — Del 1 (klar)

- Steg-för-steg-flöde, fyra stegtyper, stegöversikt, lokal sparning, slutförande
- Förhandsvisning från startsidan (`/onboarding/guided/demo-byggco`)

### Notes

- Guidade instanser och mallversioner lagras fortfarande bara i webbläsaren
- Befintlig checklista, Supabase-flöde och export är oförändrade
- Inga nya npm-paket
