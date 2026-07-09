# Sprint Plan Next Version

## Princip

Nästa version ska byggas stegvis. Varje sprint ska lämna appen i ett verifierbart läge och får inte bredda produkten till ett stort HR-system.

## Sprint 0 – beslut och dokumentation

Mål:

- Förbereda implementation genom beslut, scope och arkitektur.

Omfattning:

- feedbackanalys
- scope
- roller och behörigheter
- användarflöden
- mallversionering
- logisk datamodell
- tenancy och säkerhet
- dokumentlagring

Beroenden:

- Version 1.0 låst
- Release Candidate 1 verifierad

Leverabler:

- Sprint 0-dokumentation i `docs/`
- uppdaterade styrdokument

Acceptanskriterier:

- inga produktionskodändringar
- ingen databasändring
- inga paket installerade
- nästa steg är konkreta för Sprint 1

Får inte göras:

- bygga inloggning
- ändra komponenter
- ändra databas
- ändra Version 1.0-funktioner

## Sprint 1 – företag, användare och inloggning

Mål:

- Skapa säker grund för inloggning och företagsisolering.

Omfattning:

- Supabase Auth rekommenderas för inloggning
- profiler
- företag
- medlemskap
- tre kundroller
- grundläggande Row Level Security (RLS, säkerhetsregler på databasrader)

Beroenden:

- godkänd Sprint 0
- beslut om Supabase-projekt och miljö

Leverabler:

- inloggning och utloggning
- företagskontext
- medlemskap med roll
- säkerhetsregler för företagsdata

Acceptanskriterier:

- användare kan logga in
- användare ser bara egna företag
- företagsadministratör kan se företagets grundyta
- RLS hindrar åtkomst mellan företag

Får inte göras:

- bygga avancerad användaradministration
- bygga dashboards
- bygga externa integrationer

## Sprint 2 – permanent onboardinglagring

Mål:

- Flytta onboardingprocesser till permanent databaslagring.

Omfattning:

- onboardings
- onboarding_sections
- onboarding_items
- onboarding_comments
- progress baserad på databas

Beroenden:

- Sprint 1 klar
- företagskontext fungerar

Leverabler:

- skapa onboarding i databas
- läsa onboarding från databas
- spara momentstatus och kommentarer

Acceptanskriterier:

- onboarding finns kvar efter omladdning och ny session
- deltagare och chef ser rätt data
- inga företag kan se varandras onboardingar

Får inte göras:

- bygga mallredigering
- bygga dokumentuppladdning
- ändra UX mer än nödvändigt

## Sprint 3 – företagsmallar

Mål:

- Införa företagsmallar och publicerade mallversioner.

Omfattning:

- systemmall som källa
- företagsmall
- företagsmallversion
- sektioner och moment i mallversion
- publicering

Beroenden:

- Sprint 2 klar

Leverabler:

- skapa företagsmall från systemmall
- redigera utkast
- publicera mallversion

Acceptanskriterier:

- publicerad mallversion är skrivskyddad
- onboarding skapas från publicerad version
- systemmallen ändras inte av företag

Får inte göras:

- bygga avancerad mallbyggare
- fri layoutredigering
- flera språk

## Sprint 4 – snapshot och historik

Mål:

- Säkerställa att onboardingar är historiskt korrekta.

Omfattning:

- snapshot vid onboardingstart
- låsning av slutförd onboarding
- audit events
- historisk onboardingvy

Beroenden:

- Sprint 3 klar

Leverabler:

- frysta onboarding_sections och onboarding_items
- audit events för skapande, publicering och slutförande
- historisk läsning

Acceptanskriterier:

- malländringar påverkar inte befintliga onboardingar
- slutförd onboarding är låst
- historik visar centrala händelser

Får inte göras:

- bygga full revisionsmodul
- bygga rapportdashboard

## Sprint 5 – dokument

Mål:

- Införa säker dokumentlagring och dokumentversioner.

Omfattning:

- dokumentmetadata
- privat objektlagring
- dokumentversioner
- koppling till mallmoment
- snapshot-koppling till onboardingmoment

Beroenden:

- Sprint 4 klar

Leverabler:

- ladda upp dokument
- ersätta dokument med ny version
- koppla dokument till mallutkast
- öppna dokument med behörighetskontroll

Acceptanskriterier:

- dokument från företag A är inte åtkomliga för företag B
- ersatt dokument påverkar inte historik
- onboarding snapshot pekar på korrekt dokumentversion

Får inte göras:

- OneDrive-integration
- dokumentredigering i webbläsaren
- elektronisk signering

## Sprint 6 – innehåll och produktpolering

Mål:

- Göra nästa version begriplig, konsekvent och redo för kundtest.

Omfattning:

- texter
- tomtillstånd
- felmeddelanden
- enkel onboarding för företagsadministratör
- manuell QA

Beroenden:

- Sprint 5 klar

Leverabler:

- konsekventa produkttexter
- tydliga statuslägen
- enkel hjälptext där ny modell introduceras

Acceptanskriterier:

- ny användare förstår företagsuppstart
- chef förstår hur onboarding skapas
- deltagare förstår vad som ska göras

Får inte göras:

- större redesign
- nya affärsmoduler
- dashboards

## Sprint 7 – PDF-export och release

Mål:

- Säkerställa releaseklar export och slutverifiering.

Omfattning:

- PDF-export från sparad onboarding och snapshot
- export av historiska onboardingar
- releaseaudit
- säkerhetskontroll

Beroenden:

- Sprint 6 klar

Leverabler:

- PDF-export
- testad historisk export
- releasechecklista

Acceptanskriterier:

- export innehåller verklig sparad data
- export visar korrekt mall- och dokumentversion
- lint, build och smoke test är godkända
- RLS och serverkontroller är verifierade

Får inte göras:

- prioritera Word före PDF
- bygga egen e-postserver
- lägga till externa integrationer
