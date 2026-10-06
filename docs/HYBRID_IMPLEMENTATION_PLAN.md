# Hybrid Implementation Plan

## Status

Praktisk implementationsplan för "Hybrid Foundation", uppdelad i fem delar. Endast Del 1 implementeras i denna fas. Del 2–5 är dokumenterade beslut om framtida arbete, inte påbörjade.

## Del 1 — Guidad kärnupplevelse (denna fas)

### Mål

En liten, fungerande, fristående demonstration av ett guidat steg-för-steg-flöde med fyra stegtyper, lokal sparning, progress, stegöversikt och slutförande.

### Filer eller områden som berörs

- `lib/onboarding-steps.ts` (ny) — datatyper, mockdata (stegbank för ett mindre byggföretag), hjälpfunktioner för progress, synlighet/villkor och navigering.
- `components/providers/guided-onboarding-provider.tsx` (ny) — central state för det guidade flödet, med persistens i `localStorage`.
- `components/onboarding/guided/GuidedOnboardingView.tsx` (ny) — guidad stegvy, stegöversikt (som `Sheet`) och slutförandevy.
- `app/onboarding/guided/[id]/page.tsx` (ny) — route för det guidade flödet.
- `app/layout.tsx` (ändras minimalt) — lägger till `GuidedOnboardingProvider` vid sidan av befintlig `OnboardingProvider`.
- `app/page.tsx` (ändras minimalt) — en ny, tydligt märkt sektion med länk till förhandsvisningen. Befintliga sektioner rörs inte.

### Beroenden

Inga nya paket. Återanvänder `Card`, `Button`, `Progress`, `Badge`, `Sheet`, `Checkbox`, `Textarea`, `Label`, `PageContainer`, `SectionHeader`, `cn`.

### Acceptanskriterier

- Fyra stegtyper (`information`, `confirmation`, `singleChoice`, `task`) fungerar i ett och samma flöde.
- Ett steg visas åt gången, med stegnummer, total mängd steg och progressbar.
- "Tillbaka" och "Nästa" fungerar; svar går inte förlorade vid tillbakanavigering.
- Stegöversikt visar alla steg med status (klar/pågående/inte påbörjat) och obligatorisk-markering, och tillåter hopp till redan besökta steg.
- Ett enkelt villkor styr om ett steg visas (skyddsutrustning visas endast om deltagaren angett att de arbetar på byggarbetsplats).
- Slutförande kräver att alla obligatoriska, synliga steg är klara och visar en tydlig klar-skärm.
- Sparning sker endast i webbläsaren, med korrekt text om detta.
- Mobil och desktop fungerar utan horisontell scroll.

### Vad som inte ingår

Ingen koppling till Supabase eller riktiga onboardingprocesser. Ingen administratörsvy för att redigera stegbanken. Ingen autentisering. Ingen påverkan på checklistan eller exporten.

## Del 2 — Stegöversikt, återupptagning och avslut (fortsättning, ej denna fas)

### Mål

Fördjupa navigerings- och avslutningsupplevelsen: mer robust återupptagning över flera enheter, tydligare slutförandekontroll, delbar sammanfattning.

### Filer eller områden som berörs

Vidareutveckling av samma filer som Del 1, eventuellt en sammanfattningsvy separat från klar-skärmen.

### Beroenden

Del 1 klar och validerad genom QA.

### Acceptanskriterier

Definieras när Del 2 påbörjas, utifrån verklig respons på Del 1.

### Vad som inte ingår

Permanent lagring, autentisering, företag.

## Del 3 — Företagsmallar och mallversioner (ej denna fas)

### Mål

Låta ett företag skapa en egen företagsmall utifrån systemmallen, med versionering (`draft` → `published` → `archived`) enligt `docs/HYBRID_ARCHITECTURE.md` och `docs/TEMPLATE_VERSIONING.md`.

### Filer eller områden som berörs

Ny administratörsvy, nya datatyper för `OnboardingTemplate` och `OnboardingTemplateVersion`, sannolikt Supabase-tabeller.

### Beroenden

Del 1–2 klara. Beslut om Supabase-schema för mallar.

### Acceptanskriterier

Definieras vid start av Del 3.

### Vad som inte ingår

Autentisering och företagsisolering (kommer i Del 4), men mallmodellen förbereds för `company_id`.

## Del 4 — Autentisering, företag, roller, permanent lagring (ej denna fas)

### Mål

Introducera Supabase Auth, `company_id`-baserad isolering, roller (företagsadministratör, ansvarig chef, deltagare) och permanent lagring av guidade onboardinginstanser, snapshots och historik, enligt `docs/TENANCY_AND_SECURITY.md`, `docs/ROLES_AND_PERMISSIONS.md` och `docs/DATABASE_MODEL.md`.

### Filer eller områden som berörs

Nya Supabase-tabeller och RLS-policyer, ny autentiseringsflöde, migrering av guidade instanser från `localStorage` till databasen.

### Beroenden

Del 1–3 klara. Separat säkerhets- och migreringsbeslut innan implementation.

### Acceptanskriterier

Definieras vid start av Del 4.

### Vad som inte ingår

Systemadministratörsroll (endast arkitektoniskt beskriven, byggs inte).

## Del 5 — Dokument, export och kunskapsbank (ej denna fas)

### Mål

Utöka export och dokumenthantering till att stödja versionerade dokument enligt `docs/DOCUMENT_STORAGE.md`, samt en enkel kunskapsbank kopplad till stegbanken.

### Filer eller områden som berörs

`lib/export.ts`, `lib/onboarding-documents.server.ts`, ny objektlagring (Supabase Storage).

### Beroenden

Del 3–4 klara (mallversioner och permanent lagring måste finnas).

### Acceptanskriterier

Definieras vid start av Del 5.

### Vad som inte ingår

AI-baserad dokumentgenerering eller extern integration.
