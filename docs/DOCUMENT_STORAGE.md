# Document Storage

## Syfte

Nästa version behöver dokumenthantering som är enkel, säker och versionssäker. Dokument ska kunna ersättas framåt utan att historiska onboardingprocesser ändras.

## Grundmodell

Dokument delas upp i två delar:

1. Metadata i databasen.
2. Fil i objektlagring.

Metadata betyder strukturerad information om filen, till exempel titel, version, ägare och sökväg. Objektlagring betyder fillagring för själva dokumentet.

## Metadata i databas

Tabellen `documents` ska innehålla metadata för varje dokumentversion.

Viktiga fält:

- `id`
- `company_id`
- `parent_document_id`
- `title`
- `version`
- `storage_path`
- `mime_type`
- `status`
- `uploaded_by_profile_id`
- `created_at`

`mime_type` betyder filtyp, till exempel `application/pdf` för PDF.

## Filer i objektlagring

Filer ska lagras i privat objektlagring, inte som publika filer, när de är företagsunika eller historiska.

Rekommenderad struktur:

```text
companies/{company_id}/documents/{document_id}/versions/{version}/{file_name}
```

Varje dokumentversion får en unik filsökväg.

## Dokumentversioner

Ett dokument ersätts aldrig genom att skriva över den gamla filen.

Flöde:

1. Företagsadministratör laddar upp första dokumentet.
2. Systemet skapar `documents`-rad med version `1`.
3. Företagsadministratör ersätter dokumentet.
4. Systemet skapar ny `documents`-rad med version `2`.
5. Ny mallversion kan peka på version `2`.
6. Historiska onboardingar fortsätter peka på version `1`.

## Historiska dokument

Historiska dokumentversioner ska bevaras så länge de behövs för onboardinghistorik.

Regel:

- onboarding snapshot pekar på specifik dokumentversion
- export använder dokumentversionen från snapshot
- arkivering döljer dokument från nya val men tar inte bort historiken

## Behörig åtkomst

Dokumentåtkomst ska kontrolleras mot:

- inloggad användare
- aktivt medlemskap i `company_memberships`
- rätt `company_id`
- roll och relation till onboarding

Exempel:

- deltagare får öppna dokument kopplade till sin egen onboarding
- ansvarig chef får öppna dokument kopplade till onboardingar där personen är ansvarig
- företagsadministratör får hantera företagets dokument

## Ersättning av dokument

Ersättning betyder att en ny dokumentversion skapas.

Det får inte:

- ändra gammal `storage_path`
- skriva över gammal fil
- uppdatera historiska onboardingkopplingar
- ändra publicerade mallversioner direkt

Det får:

- skapa ny version
- kopplas till nytt mallutkast
- användas i framtida onboardingar efter publicering

## Arkivering

Arkivering betyder att dokumentversionen inte längre ska väljas i nya mallutkast.

Arkivering får inte radera filen om historiska onboardingar använder den.

## Framtida export

Export ska utgå från onboardingens snapshot.

PDF-export ska kunna visa:

- onboardinguppgifter
- slutförda moment
- kommentarer
- kvittenser
- dokumenttitlar
- dokumentversioner
- tidpunkt för export

PDF prioriteras före Word och e-post i nästa version eftersom det ger ett stabilt kundtest- och arkivformat.

## Ingår inte i nästa version

- dokumentredigering i webbläsaren
- versionsjämförelse sida vid sida
- elektronisk signering
- OCR, Optical Character Recognition, alltså automatisk texttolkning från bild eller skannad PDF
- integration med OneDrive eller SharePoint
- automatisk gallring
