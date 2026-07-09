# Next Version Scope

## Syfte

Nästa version ska göra Onboarding App redo för verklig användning hos flera företag. Versionen ska lägga till permanent lagring, inloggning, företagsisolering och versionssäker historik utan att göra appen till ett stort HR-system.

Version 1.0 och Release Candidate 1 är låsta. Detta dokument beskriver nästa version, inte ändringar i Version 1.0.

## Ingår

### Inloggning

Användare ska logga in innan de kan se företagsdata. Supabase Auth rekommenderas för autentisering. Autentisering betyder att systemet säkert identifierar vem användaren är.

Minsta omfattning:

- inloggning
- utloggning
- session
- koppling mellan inloggad användare och profil

### Företag

Varje kund representeras av ett företag. Företagets data ska isoleras från andra företag.

Minsta omfattning:

- företag med namn och status
- `company_id` på företagsägd data
- användare kan bara nå företag där de har medlemskap

### Användare

En användare representeras av en profil kopplad till autentiserad identitet.

Minsta omfattning:

- profil med namn och e-post
- medlemskap i företag
- roll per företag

### Roller

Nästa version använder tre aktiva kundroller:

- företagsadministratör
- ansvarig chef
- deltagare

Systemadministratör beskrivs arkitektoniskt men byggs inte som kundfunktion i nästa version.

### Permanent lagring

Onboardingar, mallar, dokumentmetadata, kommentarer och historik ska sparas i databasen. Databas betyder den permanenta lagringsplats där appens strukturerade data sparas.

### Företagsmallar

Företag ska kunna skapa och publicera en egen mall baserad på systemmallen.

Minsta omfattning:

- skapa företagsmall
- skapa utkastversion
- redigera utkast
- publicera version
- arkivera äldre versioner

### Snapshots

När en onboarding skapas ska systemet skapa en snapshot. Snapshot betyder en fryst kopia av de mall- och dokumentuppgifter som gäller för just den onboardingen.

Minsta omfattning:

- kopia av sektioner
- kopia av moment
- referenser till rätt dokumentversioner
- låsning av vad deltagaren ska genomföra

### Historik

Historik ska visa vad som hänt med mallar, dokument och onboardingar.

Minsta omfattning:

- audit events för viktiga händelser
- skapad av
- tidpunkt
- händelsetyp
- vilken resurs som påverkades

### Dokumentlagring

Dokument ska ha metadata i databasen och filer i objektlagring. Objektlagring betyder fillagring för dokument som PDF-filer, separat från databasens tabeller.

Minsta omfattning:

- ladda upp dokument
- ersätta dokument genom ny version
- arkivera dokumentversion
- koppla dokument till mallmoment
- frysa dokumentreferens i onboarding

### Grundläggande export

Export ska baseras på sparad onboardingdata och snapshot. PDF prioriteras. PDF betyder Portable Document Format, ett låst dokumentformat som passar kundtest och arkiv.

Minsta omfattning:

- exportera slutförd eller pågående onboarding till PDF
- inkludera onboardingstatus, moment, kommentarer och relevanta dokumentreferenser
- historisk export ska visa historiskt korrekt innehåll

## Ingår inte

- full HR-plattform
- lönehantering
- frånvarohantering
- avancerad organisationsstruktur
- avancerad digital signering
- egen e-postserver
- Simple Mail Transfer Protocol (SMTP, protokoll för att skicka e-post från server)
- Word som primärt exportformat
- OneDrive eller Microsoft 365-integration
- avancerad dokumentredigering i webbläsaren
- fri drag-and-drop-mallbyggare
- automatiska påminnelser
- dashboards och statistik
- flera språk
- externa integrationer

## Releaseprincip

Nästa version är klar när ett företag kan logga in, anpassa en mall, publicera den, skapa onboardingar från den, genomföra onboardingar, bevara historik och exportera korrekt data utan att andra företag kan se eller påverka informationen.
