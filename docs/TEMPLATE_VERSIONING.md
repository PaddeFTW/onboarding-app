# Template Versioning

## Syfte

Detta dokument definierar hur mallar, versioner, snapshots och dokument ska fungera i nästa version. Målet är att företagsanpassning ska vara möjlig utan att historiska onboardingprocesser förändras.

## Begrepp

### Systemmall

Systemmallen är produktens grundmall. Den bygger på introduktionsutbildningens tolv huvudområden och ägs av systemet.

Regel:

- företag får aldrig redigera systemmallen direkt
- systemmallen används som startpunkt för företagsmallar
- framtida systemmalländringar påverkar inte redan skapade företagsmallversioner automatiskt

### Företagsmall

Företagsmallen är företagets egen mallstruktur. Den ägs av ett företag och har en eller flera versioner.

Regel:

- företagsmallen har `company_id`
- företagsmallen innehåller inte direkt allt versionsinnehåll
- innehållet ligger i företagsmallversioner

### Företagsmallversion

Företagsmallversionen är en konkret version av företagets mall. Det är den version som publiceras och används för nya onboardingar.

Regel:

- publicerad mallversion är skrivskyddad
- ändringar sker genom ny utkastversion
- varje version har versionsnummer

### Individuell onboarding

Individuell onboarding är en onboardingprocess för en viss deltagare.

Regel:

- skapas från en publicerad företagsmallversion
- får en fryst snapshot
- påverkas inte av senare malländringar

### Snapshot

Snapshot är en fryst kopia av sektioner, moment och dokumentreferenser vid onboardingens skapande.

Regel:

- snapshot används för visning, genomförande och export
- snapshot ändras inte när mallen ändras
- snapshot ska innehålla tillräcklig data för historisk läsning även om mallen arkiveras

### Utkast

Utkast är en redigerbar mallversion.

Regel:

- utkast kan ändras av företagsadministratör
- utkast kan inte användas för onboarding
- utkast kan publiceras när det är klart

### Publicerad

Publicerad betyder att mallversionen är godkänd för nya onboardingar.

Regel:

- publicerad version är skrivskyddad
- publicerad version kan vara aktiv eller arkiverad
- nya onboardingar skapas endast från publicerad version

### Arkiverad

Arkiverad betyder att versionen inte längre ska användas för nya onboardingar.

Regel:

- arkiverad version finns kvar för historik
- befintliga onboardingar påverkas inte
- arkiverad version kan inte väljas för nya onboardingar

### Versionsnummer

Versionsnummer visar ordningen mellan publicerade versioner.

Rekommendation:

- börja med `1.0`
- mindre innehållsändringar kan bli `1.1`
- större omstruktureringar kan bli `2.0`
- versionsnummer är produktlogik, inte Git-versioner

### Låsning

Låsning betyder att en resurs inte längre får ändras direkt.

Följande ska låsas:

- publicerad företagsmallversion
- snapshot i onboarding
- slutförd onboarding
- dokumentversion som används historiskt

### Dokumentversioner

Dokumentversioner gör att ett dokument kan ersättas framåt utan att historik ändras.

Regel:

- ny fil skapar ny dokumentversion
- tidigare dokumentversion ligger kvar
- mallversioner och onboarding-snapshots pekar på specifik dokumentversion

## Fastställda regler

- Systemmall redigeras aldrig direkt av företag.
- Publicerad mallversion ändras aldrig direkt.
- Ny onboarding skapas från publicerad företagsmallversion.
- Onboarding får en fryst snapshot.
- Historiska onboardingprocesser påverkas aldrig av senare malländringar.
- Dokument ersätts genom ny dokumentversion, inte genom överskrivning.
- Slutförd onboarding är låst för strukturella ändringar.

## Statusövergångar

### Företagsmallversion

1. Utkast
2. Publicerad
3. Arkiverad

Tillåtna övergångar:

- utkast -> publicerad
- publicerad -> arkiverad

Ej tillåtet:

- publicerad -> utkast
- arkiverad -> utkast
- ändra innehåll i publicerad version

### Onboarding

1. Ej påbörjad
2. Pågående
3. Slutförd

Tillåtna övergångar:

- ej påbörjad -> pågående
- pågående -> slutförd

Ej tillåtet:

- slutförd -> pågående utan ett framtida, särskilt beslutat återöppningsflöde
