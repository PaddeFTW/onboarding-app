# User Flows

## Princip

Nästa version ska behålla Version 1.0-flödets enkelhet. Nya flöden ska främst skapa säker företagskontext, mallversionering och historik runt samma kärna: skapa onboarding, genomför, följ upp och exportera.

## Första företagsuppstart

1. Företagsadministratör loggar in.
2. Systemet ser att användaren saknar aktiv företagskontext.
3. Företagsadministratör skapar företag med namn.
4. Systemet skapar medlemskap med rollen företagsadministratör.
5. Systemet föreslår att skapa första företagsmallen från systemmallen.
6. Företagsadministratören går vidare till mallutkast.

Acceptans:

- företaget får ett unikt `company_id`
- användaren får medlemskap i företaget
- ingen annan företagsdata är synlig

## Skapa företagsmall

1. Företagsadministratör väljer "Skapa mall från systemmall".
2. Systemet skapar en företagsmall med utkastversion.
3. Utkastet innehåller sektioner och moment från systemmallen.
4. Företagsadministratör anpassar text, ansvariga fält och dokumentkopplingar.
5. Systemet sparar utkast löpande eller via tydlig spara-knapp.

Acceptans:

- systemmallen ändras inte
- utkastet ägs av företaget
- utkastet kan redigeras utan att påverka publicerade versioner

## Publicera mall

1. Företagsadministratör granskar mallutkast.
2. Systemet visar versionsnummer, till exempel `1.0`.
3. Företagsadministratör väljer "Publicera".
4. Systemet låser mallversionen som publicerad.
5. Publicerad version blir valbar när onboarding skapas.

Acceptans:

- publicerad mallversion är skrivskyddad
- publicering skapar audit event
- minst en publicerad version finns innan onboarding kan skapas

## Skapa onboarding

1. Företagsadministratör eller ansvarig chef väljer "Ny onboarding".
2. Användaren väljer deltagare eller anger deltagaruppgifter.
3. Användaren väljer publicerad företagsmallversion.
4. Systemet skapar onboarding.
5. Systemet skapar snapshot av sektioner, moment och dokumentreferenser.
6. Onboarding visas i status "Ej påbörjad" eller motsvarande.

Acceptans:

- onboarding ägs av företaget
- onboarding refererar till mallversionen
- onboarding har frysta `onboarding_sections` och `onboarding_items`

## Deltagare genomför onboarding

1. Deltagare loggar in.
2. Deltagare ser sin onboarding.
3. Deltagare öppnar moment.
4. Deltagare läser text och dokument.
5. Deltagare markerar moment enligt behörighet.
6. Deltagare lämnar kommentar där det är relevant.

Acceptans:

- deltagare ser bara sin egen onboarding
- dokumentåtkomst kontrolleras mot företagsmedlemskap och onboardingkoppling
- progress uppdateras från sparade moment

## Chef följer onboarding

1. Ansvarig chef loggar in.
2. Chef ser onboardingar där personen är ansvarig.
3. Chef öppnar onboarding.
4. Chef ser progress, kommentarer och ej klara moment.
5. Chef kompletterar eller kvitterar moment där rollen tillåter.

Acceptans:

- chef ser bara relevanta onboardingar
- deltagarens historik ändras inte utan sparad händelse
- kommentarer sparas med avsändare och tidpunkt

## Slutföra onboarding

1. Alla obligatoriska moment är klara.
2. Ansvarig chef eller företagsadministratör väljer "Slutför".
3. Systemet sätter `completed_at`.
4. Onboarding låses för strukturella ändringar.
5. Export kan skapas från fryst snapshot.

Acceptans:

- slutförd onboarding kan inte ändra mallinnehåll
- kompletterande kommentarer kräver särskilt framtida beslut
- slutförande skapar audit event

## Öppna historisk onboarding

1. Behörig användare öppnar en slutförd onboarding.
2. Systemet visar snapshotinnehållet.
3. Systemet visar dokumentversionerna som gällde vid skapandet.
4. Systemet visar slutförandedatum och historik.

Acceptans:

- senare malländringar syns inte i historisk onboarding
- senare dokumentersättningar påverkar inte dokumentreferensen
- export visar historiskt korrekt data

## Skapa ny mallversion

1. Företagsadministratör väljer en publicerad mallversion.
2. Systemet skapar ett nytt utkast baserat på den publicerade versionen.
3. Företagsadministratör gör ändringar.
4. Utkast publiceras som ny version, till exempel `1.1`.
5. Nya onboardingar använder den nya versionen om den är aktiv.

Acceptans:

- tidigare publicerad version ändras inte
- befintliga onboardingar påverkas inte
- ny publicering skapar audit event

## Ersätta dokument utan att påverka historik

1. Företagsadministratör öppnar dokumentbiblioteket.
2. Företagsadministratör väljer "Ersätt dokument".
3. Systemet skapar ny dokumentversion.
4. Nya mallutkast kan koppla till den nya dokumentversionen.
5. Historiska onboardingar behåller tidigare dokumentversion.

Acceptans:

- dokumentversioner skrivs inte över
- objektlagring får unik filsökväg per version
- historiska onboardingar fortsätter peka på rätt version
