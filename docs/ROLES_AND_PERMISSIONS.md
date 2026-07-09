# Roles and Permissions

## Princip

Nästa version ska använda få roller och tydliga behörigheter. Behörighet ska kontrolleras i databas och serverkod, inte bara i användargränssnittet.

Tre kundroller är aktiva i nästa version:

- företagsadministratör
- ansvarig chef
- deltagare

Systemadministratör beskrivs endast arkitektoniskt och ska inte byggas som kundfunktion i nästa version.

## Roller

### Företagsadministratör

Företagsadministratören ansvarar för företagets inställningar, användare, mallar och dokument. Rollen är högsta kundroll inom ett företag.

Typiska uppgifter:

- hantera företagsmallar
- publicera mallversioner
- hantera dokument
- bjuda in eller ta bort användare
- se företagets onboardingar

### Ansvarig chef

Ansvarig chef genomför onboardingar för deltagare och följer status. Rollen ska vara enkel och operativ.

Typiska uppgifter:

- skapa onboarding från publicerad mall
- följa deltagarens progress
- kommentera och kvittera moment
- slutföra onboarding
- exportera onboarding

### Deltagare

Deltagaren är personen som genomför onboarding. Rollen ska ha begränsad åtkomst till sin egen onboarding.

Typiska uppgifter:

- läsa innehåll
- öppna dokument
- markera egna moment där det är tillåtet
- lämna kommentarer eller svar där mallen kräver det

### Systemadministratör

Systemadministratören är en intern teknisk roll för drift och support. Rollen behövs arkitektoniskt men ska inte exponeras som kundroll i nästa version.

Möjliga framtida uppgifter:

- hantera systemmallar
- felsöka tenant-data med supportprocess
- hantera driftincidenter
- publicera nya systemmallversioner

## Behörighetsmatris

| Område | Företagsadministratör | Ansvarig chef | Deltagare | Systemadministratör |
|---|---|---|---|---|
| Se eget företag | Ja | Ja | Ja | Endast internt vid support |
| Ändra företagsinställningar | Ja | Nej | Nej | Nej i kundflöde |
| Hantera användare i företaget | Ja | Nej | Nej | Nej i kundflöde |
| Se företagsmallar | Ja | Ja | Nej | Endast internt |
| Skapa företagsmallutkast | Ja | Nej | Nej | Nej i kundflöde |
| Redigera företagsmallutkast | Ja | Nej | Nej | Nej i kundflöde |
| Publicera företagsmallversion | Ja | Nej | Nej | Nej i kundflöde |
| Arkivera företagsmallversion | Ja | Nej | Nej | Nej i kundflöde |
| Ladda upp dokument | Ja | Nej | Nej | Nej i kundflöde |
| Ersätta dokument med ny version | Ja | Nej | Nej | Nej i kundflöde |
| Skapa onboarding | Ja | Ja | Nej | Nej |
| Se alla onboardingar i företaget | Ja | Ja, om ansvarig eller tilldelad | Nej | Endast internt vid support |
| Se egen onboarding | Ja | Ja, om ansvarig | Ja | Endast internt vid support |
| Kommentera onboarding | Ja | Ja | Ja, på egen onboarding |
| Markera moment klara | Ja | Ja | Ja, där mallen tillåter |
| Slutföra onboarding | Ja | Ja | Nej | Nej |
| Öppna historisk onboarding | Ja | Ja, om ansvarig eller tilldelad | Ja, egen historik |
| Exportera onboarding | Ja | Ja | Ja, egen onboarding om tillåtet |
| Se audit events | Ja, begränsat till företaget | Nej | Nej | Endast internt |

## Viktiga begränsningar

- En deltagare får aldrig se andra deltagares onboardingar.
- En ansvarig chef får inte ändra publicerade mallversioner.
- En företagsadministratör får inte ändra systemmallen direkt.
- Publicerade mallversioner är skrivskyddade.
- Slutförda onboardingprocesser är låsta.
- Systemadministratör ska inte användas för att kringgå kundernas företagsisolering i vanlig produktanvändning.
