# Project Status

## Aktuell status

Version 1.0 är låst. Release Candidate 1 är verifierad.

**Hybrid Foundation Del 1 och Del 2 är implementerade och ligger på `main`.**
Produktion: https://onboarding-app-black.vercel.app

Permanent backend för det guidade flödet (autentisering, företag, Supabase-snapshots, historik) kommer i Del 3–5 enligt `docs/HYBRID_IMPLEMENTATION_PLAN.md`.

Ingen generell Quality WorX-plattform byggs.

## Verifierat i produktion (2026-09-07)

- `main` innehåller merge av PR #4 (`9955eddc`)
- Guidat flöde `/onboarding/guided/demo-byggco` fungerar
- Fyra stegtyper, progress, stegöversikt, nästa/tillbaka, villkorad PPE
- Härdad localStorage-normalisering och kontroll av obligatoriska steg
- Version 1.0-checklistan, export och dokumentvisare är oförändrade

## Känt gap i produktion

Startsidans lista "Pågående" / "Slutförda" hämtas från Supabase. Om `NEXT_PUBLIC_SUPABASE_URL` eller `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` saknas eller blockeras visas ett lastfel. Det påverkar inte det guidade demot, som sparas i webbläsaren.

## Hybrid Foundation — Del 1 (klar)

- Guidat genomförandeflöde som förhandsvisning
- Stegtyper: `information`, `confirmation`, `singleChoice`, `task`
- Lokal sparning via `GuidedOnboardingProvider`

## Hybrid Foundation — Del 2 (klar)

- Normalisering av sparad onboardingdata vid återupptagning
- Gemensam kontroll för kvarstående obligatoriska steg (`getIncompleteRequiredSteps`)
- Completion-/sammanfattningsvy och draft-hantering
- Mergad till `main` via PR #4

## Nästa fokus

1. Säkra att Vercel har giltiga Supabase-nycklar så checklist-listan laddar
2. Del 3 — företagsmallar och mallversioner
3. Del 4 — autentisering, företag, roller, permanent lagring
4. Del 5 — dokument, PDF-export och kunskapsbank
5. Konsolidera Batch 01–03 till `ONBOARDING_STEPBANK_MASTER.md`

## Produktprincip

Nästa version ska bygga permanent lagring, företagsisolering och versionssäkerhet under den befintliga prototypens enkla grundflöde. Appen ska inte bli ett stort HR-system.
