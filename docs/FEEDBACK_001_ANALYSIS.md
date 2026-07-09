# Feedback 001 Analysis

## Status

Detta dokument hör till Sprint 0 för nästa version av Onboarding App. Version 1.0 och Release Candidate 1 är låsta och ska inte förändras funktionellt.

## Originalfeedback

Den första riktiga användarfeedbacken kräver:

- permanent databaslagring
- inloggning
- företag
- användare
- roller och behörigheter
- företagsanpassade mallar
- dokumenthantering
- versionssäker historik
- snapshots av onboardingprocesser
- tydlig separation mellan systemmall, företagsmall och individuell onboarding

## Vad feedbacken betyder för produkten

Feedbacken betyder att produkten behöver gå från en verifierad onboardingprototyp till en enkel Software as a Service-produkt (SaaS, programvara som används via webben av flera kunder). Den befintliga upplevelsen ska behållas: skapa onboarding, gå igenom moment, följa status och exportera. Skillnaden är att data, mallar, dokument och historik måste bli permanenta, företagsisolerade och spårbara.

Nästa version ska inte bli ett stort HR-system. Den ska lägga en säker och versionsbar grund under samma enkla flöde.

## Produktkonsekvenser

- Appen behöver ett inloggat läge.
- Varje användare behöver tillhöra ett eller flera företag.
- Företag behöver kunna anpassa en mall utan att ändra systemets grundmall.
- En onboarding ska skapas från en publicerad företagsmallversion.
- Påbörjade och slutförda onboardingprocesser ska visa exakt det innehåll som gällde när de skapades.
- Dokument ska kunna ersättas framåt utan att historiska onboardingprocesser ändras.
- Roller ska vara enkla och få: företagsadministratör, ansvarig chef och deltagare.

## Arkitekturkonsekvenser

- Nuvarande checklistdata behöver på sikt flyttas från enkel klientnära användning till permanent databasmodell.
- Mallar måste delas upp i systemmall, företagsmall, företagsmallversion och individuell onboarding.
- Publicerade versioner måste vara skrivskyddade. Ändringar sker genom ny version, inte genom redigering på plats.
- Onboarding behöver snapshot. Snapshot betyder en fryst kopia av relevanta mall- och dokumentuppgifter vid skapandet.
- Dokument behöver metadata i databasen och filer i objektlagring.
- Händelser som skapande, publicering, dokumentbyte och slutförande behöver sparas i audit events. Audit events betyder spårbara systemhändelser för historik och felsökning.

## Säkerhetskonsekvenser

- Appen blir multi-tenant. Multi-tenant betyder att flera företag använder samma system men ska vara strikt separerade från varandra.
- Alla företagsägda rader behöver `company_id`.
- Åtkomst får inte bygga på UI-kontroller. UI-kontroller betyder knappar, menyer och vyer i gränssnittet. De hjälper användaren men är inte tillräckliga som säkerhet.
- Databasen behöver Row Level Security (RLS, säkerhetsregler på databasrader).
- Serverkod behöver alltid kontrollera användarens medlemskap och roll.
- Dokumentfiler behöver skyddade sökvägar och behörighetskontroll.
- Supabase rekommenderas för autentisering, databas och fillagring, men beslutet är ännu inte implementerat.

## Påverkan på nuvarande prototyp

Nuvarande Version 1.0 ska lämnas oförändrad. Nästa version ska bygga under prototypens grundflöde utan att ändra designen i första steget.

Det som påverkas i kommande implementation:

- datalager
- inloggning
- företagskontext
- mallmodell
- dokumentlagring
- historik och låsning
- exportunderlag

Det som inte ska påverkas i Sprint 0:

- komponenter
- design
- befintlig Release Candidate 1-funktionalitet
- databas
- paket

## Tillhör nästa version

- inloggning
- företag och medlemskap
- tre aktiva kundroller
- permanent onboardinglagring
- företagsmallar
- publicering av företagsmallversioner
- snapshots för onboarding
- låsning av slutförd onboarding
- dokumentmetadata och dokumentversioner
- grundläggande historik
- enkel PDF-export baserad på sparad data

## Sparas till senare

- avancerad HR-administration
- full organisationsstruktur
- avancerad digital signering
- realtidskommentarer
- automatiska påminnelser
- avancerade dashboards
- integrationer med Microsoft 365, OneDrive eller andra externa system
- avancerad mallbyggare med fri layout
- Word-export som primärt releasekrav
- e-postutskick från egen server
