# Hybrid Architecture

## Status

Arkitekturdokument för arbetsversionen "Hybrid Foundation". Beskriver nivåerna i den framtida mall- och genomförandemodellen. De flesta nivåerna är ännu inte implementerade i kod — se `docs/HYBRID_IMPLEMENTATION_PLAN.md` för vad som byggs i vilken del.

## Syfte

Beskriva hur innehåll (mallar) separeras från genomförande (instanser), och hur historik skyddas mot senare ändringar. Detta är grunden för att företag ska kunna anpassa sina onboardingprocesser utan att skriva om historiska, redan genomförda processer.

## De nio nivåerna

### 1. Systemmall (`OnboardingTemplate`, `scope: "system"`)

Produktens grundmall. Levereras av Quality WorX och är utgångspunkten för alla företag. Företag redigerar aldrig systemmallen direkt.

### 2. Företagsmall (`OnboardingTemplate`, `scope: "company"`)

Ett företags egen kopia/anpassning, skapad utifrån systemmallen. Ägs av ett `company_id`. Ett företag kan ha flera företagsmallar (till exempel en per roll eller avdelning).

### 3. Företagsmallversion (`OnboardingTemplateVersion`)

Varje företagsmall har en eller flera versioner. En version innehåller den faktiska listan av steg (`OnboardingStepDefinition`) vid en given tidpunkt. En version är antingen `draft`, `published` eller `archived`.

### 4. Onboardinginstans (`OnboardingInstance`)

En faktisk, pågående eller avslutad onboarding för en specifik deltagare. Skapas alltid utifrån en publicerad mallversion.

### 5. Snapshot (`OnboardingSnapshot`)

Vid start av en onboardinginstans fryses en kopia av mallversionens steg, texter och dokumentreferenser. Snapshoten är den instansens "sanning" — inte den levande mallen.

### 6. Steginstans (`OnboardingStepInstance`)

Varje steg i snapshoten materialiseras som en steginstans kopplad till onboardinginstansen. Steginstansen har egen status, eget svar och egen historik, frikopplad från mallsteget.

### 7. Svar (`StepResponse`)

Deltagarens svar, val eller bekräftelse för en steginstans. Sparas på steginstansen, inte på mallsteget.

### 8. Progress

Beräknad andel slutförda (och obligatoriska) steginstanser för en onboardinginstans. Progress hör till instansen, aldrig till mallen.

### 9. Historik

Slutförda onboardinginstanser med sina snapshots och svar bevaras oförändrade. Historiken visar alltid vad som faktiskt gällde och genomfördes vid det tillfället, oavsett senare malländringar.

## Grundprinciper

### En mall beskriver återanvändbart innehåll

Mallen och dess version är innehåll — texter, steg, ordning, villkor. Mallen i sig genomför ingen onboarding och har inga svar.

### En mallversion är skrivskyddad efter publicering

När en version publiceras låses den. Ändringar sker genom ett nytt utkast (`draft`) som i sin tur publiceras som en ny version. Detta gör att man alltid kan peka på exakt "version 3" och veta att den aldrig ändras i efterhand.

### En startad onboarding får en fryst snapshot

Snapshoten kopieras från mallversionen vid startögonblicket. Onboardinginstansen läser aldrig mallversionen direkt under genomförandet.

### Senare malländringar påverkar inte pågående eller slutförda onboardingprocesser

Eftersom instansen bygger på sin egen snapshot och sina egna steginstanser, syns en ny mallversion aldrig i redan startade processer. Nya mallversioner gäller endast onboardingprocesser som startas efter publiceringen.

### Genomförandet använder steginstanser, inte den levande mallen

Det guidade flödet läser och skriver alltid mot `OnboardingStepInstance` och `StepResponse`. Mallsteget (`OnboardingStepDefinition`) används endast en gång: när snapshoten skapas.

## Förhållande till dagens kod (Version 1.0)

Dagens checklista (`CHECKLIST_TEMPLATE` i `lib/onboarding.ts` och `ChecklistItem` i Supabase) är i praktiken en enda, inbyggd systemmall med en enda implicit version, utan företagsmallar, utan snapshot-steg och utan uttryckliga steginstanser (checklistpunkterna kopieras redan idag rad för rad in i databasen vid skapande, vilket är en enkel, fungerande form av "frysning" men inte en fullständig snapshot-modell).

Den guidade vertikala delen i denna fas introducerar `OnboardingStepDefinition` och `OnboardingStepInstance` som fristående, mock-baserade typer (nivå 1, 6 och 7 i miniatyr) utan företag, utan mallversionering och utan permanent lagring. Nivåerna 2, 3, 5, 8 (i sin fulla form) och 9 dokumenteras här men byggs i senare delar enligt `docs/HYBRID_IMPLEMENTATION_PLAN.md`.

## Diagram (textuell modell)

```
Systemmall
   └── Företagsmall (per företag)
          └── Företagsmallversion (draft → published → archived)
                 └── OnboardingStepDefinition (steg i mallversionen)
                        │
                        │  (vid start av onboarding)
                        ▼
                 Snapshot (fryst kopia)
                        └── OnboardingStepInstance (per steg)
                               └── StepResponse (deltagarens svar)
                 Onboardinginstans
                        ├── progress (beräknad från steginstanser)
                        └── historik (när slutförd, låst)
```
