# Project Status

## Aktuell status

Version 1.0 är låst. Release Candidate 1 är verifierad.

Hybrid Foundation Del 1 och Del 2 ligger på `main`.
Del 3 har en lokal förhandsvisning på `/onboarding/templates`: systemmall, utkast, publicerad version och fryst onboarding. Ingen autentisering och ingen Supabase-lagring för mallarna.

Produktion: https://onboarding-app-black.vercel.app

Ingen generell Quality WorX-plattform byggs.

## Verifierat i produktion

- Guidat flöde `/onboarding/guided/demo-byggco`
- Fyra stegtyper, progress, stegöversikt, nästa/tillbaka, villkorad PPE
- Härdad localStorage-normalisering och kontroll av obligatoriska steg
- Version 1.0-checklistan, export och dokumentvisare är oförändrade
- PR #5 mergad: status för Del 2 och svensk text vid databasfel

## Känt gap

Startsidans lista "Pågående" / "Slutförda" hämtas från Supabase. Guidat flöde och företagsmallar sparas i webbläsaren.

## Nästa fokus

1. Granska och merga Del 3-förhandsvisningen
2. Del 4 — autentisering, företag, roller, permanent lagring
3. Del 5 — dokument, PDF-export och kunskapsbank
4. Konsolidera Batch 01–03 till `ONBOARDING_STEPBANK_MASTER.md`

## Produktprincip

Nästa version ska bygga permanent lagring, företagsisolering och versionssäkerhet under den befintliga prototypens enkla grundflöde. Appen ska inte bli ett stort HR-system.
