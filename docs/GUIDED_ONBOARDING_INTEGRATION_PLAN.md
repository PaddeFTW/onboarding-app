# Guided Onboarding Integration Plan

## Status

Planeringsdokument för arbetsversionen "Hybrid Foundation". Version 1.0 och Release Candidate 1 är låsta. Detta dokument beskriver hur ett guidat genomförandeflöde introduceras utan att bryta den låsta versionen.

## Nuläge

Onboarding App (Version 1.0) fungerar idag som en checklista:

- Startsidan visar pågående och slutförda onboardingprocesser (`app/page.tsx`).
- En ny onboarding skapas via ett formulär (`components/onboarding/NewOnboardingForm.tsx`) och sparas i Supabase.
- Genomförandet sker på `app/onboarding/[id]/page.tsx` via `ChecklistView`. Användaren ser tolv checklistpunkter i valfri ordning, öppnar en punkt i ett sidopanel (`Sheet`), läser information, fyller i eventuell kommentar eller strukturerad detaljdata (kvittenser, uppföljning) och bekräftar genomgång med en kryssruta.
- Progress räknas som andel bekräftade punkter av totalt antal punkter.
- Export sker via `ExportDialog` och bygger på riktig onboardingdata (`lib/export.ts`).
- All persistens sker mot Supabase (`lib/supabase/onboarding-repository.ts`) via en central React-context (`OnboardingProvider`).

Detta flöde är godkänt, låst och ska inte byggas om i onödan.

## Mål

Förbereda och påbörja en guidad genomförandeupplevelse där deltagaren ser ett steg i taget, med tydlig progress, möjlighet att gå tillbaka och en tydlig avslutning — utan att röra den låsta checklistan, exporten eller Supabase-integrationen.

Målet för denna fas är en liten, fungerande, avgränsad vertikal del: ett demonstrerat guidat flöde med fyra grundläggande stegtyper, byggt ovanpå befintliga designmönster och befintlig state-arkitektur.

## Varför hybridmodellen väljs

Tre modeller övervägdes:

### A. Ren checklista (nuvarande Version 1.0)

Styrka: Enkel, redan byggd, redan godkänd, ger fri navigering.

Svaghet: Ger ingen känsla av vägledning, ingen naturlig ordning, ingen "ett steg i taget"-känsla. Otydligt vad som är näst på tur för en ny medarbetare.

### B. Rent guidat flöde (quiz-liknande, ett formulär per steg)

Styrka: Tydlig vägledning, ett fokus per skärm.

Svaghet: Om det görs fel riskerar det att kännas som ett långt formulär eller quiz, vilket uttryckligen ska undvikas. Skulle också kräva att hela den befintliga checklistan görs om samtidigt, vilket är en stor och onödigt riskabel omändring av en låst version.

### C. Hybridmodell (vald)

Startsida, översikter över pågående och slutförda processer samt administration behålls som de är. Själva genomförandet kan på sikt vägledas steg för steg, men introduceras nu som en avgränsad, tydligt märkt förhandsvisning vid sidan av den befintliga checklistan. Detta ger:

- Ingen risk för Version 1.0: checklistan, exporten och Supabase-flödet rörs inte.
- En verklig, körbar demonstration av stegbanken och det guidade gränssnittet.
- En naturlig väg framåt: när det guidade flödet är validerat kan det i en senare, uttryckligen beslutad fas ersätta eller kompletera checklistan för skarpa onboardingprocesser.

Hybridmodellen är därför vald: bevara översikter och administration, introducera guidat genomförande som nästa lag ovanpå — inte som ett ombygge av grunden.

## Vad som bevaras från befintlig app

- Startsida med pågående/slutförda onboardingprocesser.
- Skapa ny onboarding-formuläret.
- Den befintliga checklistvyn för skarpa, Supabase-lagrade onboardingprocesser.
- Layout, färger, komponentprinciper (`Card`, `Button`, `Progress`, `Sheet`, `Badge`, `PageContainer`, `SectionHeader`).
- Mobilanpassning och animationsmönster (`animate-fade-up` med staggered delay).
- Exportflödet oförändrat.

## Vad som behöver ändras eller läggas till

- Nya datatyper för stegbank, steginstans och guidad onboardinginstans (`lib/onboarding-steps.ts`), separata från den befintliga checklistmodellen.
- En ny, lätt state-provider för det guidade flödet (`components/providers/guided-onboarding-provider.tsx`), byggd enligt samma mönster som `OnboardingProvider` men med lokal (webbläsar-) persistens istället för Supabase.
- Nya komponenter för guidad stegvy, stegöversikt och slutförandevy.
- En ny route för det guidade flödet, tydligt märkt som förhandsvisning, länkad från startsidan utan att ersätta befintliga sektioner.

## Rekommenderad användarresa (guidat flöde)

1. Deltagaren öppnar en guidad onboarding och ser ett välkomstsystem med tydlig progress ("Steg 1 av 10").
2. Ett steg visas i taget: titel, kort instruktion, eventuell hjälptext och en tydlig huvudhandling.
3. Beroende på stegtyp bekräftar, väljer eller genomför deltagaren en uppgift.
4. Deltagaren går vidare med "Nästa". "Tillbaka" finns alltid tillgänglig och tidigare svar finns kvar.
5. Deltagaren kan öppna en stegöversikt när som helst för att se helheten och hoppa till ett tidigare besökt steg.
6. Vid sista steget slutförs onboardingen. En klar-skärm visar sammanfattad progress.
7. Om deltagaren lämnar flödet och kommer tillbaka senare återupptas onboardingen på rätt steg, med tidigare svar bevarade.

## Stegbank

En onboarding beskrivs som en samling steg (en "stegbank"), inte enbart frågor. Ett mallsteg (`OnboardingStepDefinition`) har en typ, är obligatoriskt eller valfritt, har en ordning och kan ha ett enkelt villkor för när det visas.

## Första stegtyper (implementeras nu)

- `information` — kort sakinnehåll, huvudhandling är att gå vidare.
- `confirmation` — sakinnehåll med en tydlig bekräftelse ("Jag har tagit del av informationen").
- `singleChoice` — ett val bland ett fåtal alternativ.
- `task` — en uppgift som bekräftas som genomförd, med valfri fritextkommentar (återanvänder befintlig `Textarea`, ingen ny textkomponent byggs).

## Framtida stegtyper (dokumenteras, byggs inte nu)

`document`, `policy`, `checklist`, `meeting`, `knowledgeCheck`, `attachment`, `photo`, `video`, `audio`, `signature`, `conditionalFollowUp`. Datamodellen ska kunna utökas med fler typer i `type`-fältet utan att steginstansens grundstruktur behöver ändras.

## Mobilstrategi

- Ett steg i taget passar naturligt i mobil bredd — ingen horisontell scroll.
- Stora tryckytor för huvudhandlingen ("Nästa" / "Slutför"), placerade längst ner enligt samma fot-mönster som `SheetFooter`.
- Stegöversikten öppnas som en bottensida (`Sheet`), samma komponent som redan används i checklistvyn.

## Desktopstrategi

- Samma enkolumnslayout som mobil, med `PageContainer`s befintliga maxbredd, för att undvika att flödet känns som ett brett administrativt formulär.
- Stegöversikten kan visas i samma `Sheet`-komponent (glider in från höger) som på mobil, för konsekvent beteende.

## Risker

- Risk att guidat flöde upplevs som ett separat, förvirrande system parallellt med checklistan. Hanteras genom att tydligt märka det som "förhandsvisning" tills ett uttryckligt beslut tas om att ersätta checklistan.
- Risk att lokal (webbläsar-) persistens ger falsk trygghet. Hanteras genom korrekt text ("Sparat i den här webbläsaren") och genom att aldrig antyda molnlagring.
- Risk att villkorslogik växer till en regelmotor. Hanteras genom att endast implementera ett enkelt, hårdkodat villkor kopplat till ett tidigare svar.

## Avgränsningar

Ingår inte i denna fas: filuppladdning, foto, video, ljud, signering, avancerat kunskapstest, avancerade villkor, AI, dokumentredigering, extern integration, administratörsvy för att bygga företagsmallar, autentisering, databaslagring av guidade instanser, generell formulärmotor eller gemensam motor för andra Quality WorX-appar.

## Teknisk skuld som medvetet accepteras

- Guidade instanser lagras endast i webbläsarens `localStorage`, inte i Supabase. Detta är en medveten, tillfällig lösning tills Del 4 (autentisering, företag, permanent lagring) beslutas och implementeras.
- Den guidade demoinstansen är fristående mockdata, inte kopplad till en riktig Supabase-onboarding. Sammankoppling mellan guidat flöde och skarpa onboardingprocesser är ett senare beslut.

## Versionsindelning

- **Version 1.0 / RC1** — låst checklistflöde, Supabase, export. Ingen ändring.
- **Hybrid Foundation, Del 1 (denna fas)** — datatyper, mockdata, guidad stegvy, progress, nästa/tillbaka, stegöversikt, lokal sparning, slutförande.
- **Hybrid Foundation, Del 2–5** — se `docs/HYBRID_IMPLEMENTATION_PLAN.md`.

## Definition of Done (denna fas)

- Hybridmodellen, arkitekturen och scope är dokumenterade.
- Befintlig startsida, checklista och export är oförändrade och fungerar som innan.
- Ett guidat flöde med fyra stegtyper fungerar med nästa/tillbaka, bevarade svar, progress, stegöversikt och slutförande.
- Ingen backend, inga nya paket, ingen databasändring.
- Lint, build och smoke test är godkända.
- Ingen commit är gjord.
