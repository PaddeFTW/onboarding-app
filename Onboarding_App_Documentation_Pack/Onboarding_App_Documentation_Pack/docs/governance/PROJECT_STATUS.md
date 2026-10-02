# Project Status



## Aktuell status



Version 1.0 är låst.



Release Candidate 1 är verifierad och redo för kundtest.



Nästa version heter arbetsmässigt **Hybrid Foundation**. Första målet är den guidade kärnupplevelsen — ett steg i taget med progress, stegöversikt och lokal sparning.



Permanent backend (autentisering, företag, Supabase-snapshots, historik) kommer i senare genomförandesteg enligt `docs/HYBRID_IMPLEMENTATION_PLAN.md`.



Ingen generell Quality WorX-plattform byggs.



## Verifierat för Release Candidate 1



- lint är godkänd

- build är godkänd

- smoke test är godkänt

- Supabase-konfiguration fungerar

- tolv PDF-dokument finns i `public/documents/`

- exportdialogen är redo för kundtest

- OneDrive ingår inte som exportalternativ

- huvudbranch är `main`



## Hybrid Foundation — Del 1 (pågående)



Implementerat eller pågående:



- dokumentation för hybridmodell, arkitektur och implementationsplan

- guidat genomförandeflöde som förhandsvisning (`/onboarding/guided/demo-byggco`)

- fyra stegtyper: `information`, `confirmation`, `singleChoice`, `task`

- lokal sparning i webbläsaren via `GuidedOnboardingProvider`

- befintlig checklista, startsida och export oförändrade



## Viktigaste kommande fokus (efter Del 1)



- stegöversikt och återupptagning (Del 2)

- företagsmallar och mallversioner (Del 3)

- autentisering, företag, roller, permanent lagring (Del 4)

- dokument, export och kunskapsbank (Del 5)



## Produktprincip



Nästa version ska bygga permanent lagring, företagsisolering och versionssäkerhet under den befintliga prototypens enkla grundflöde. Appen ska inte bli ett stort HR-system.

