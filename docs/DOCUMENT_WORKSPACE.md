# Document Workspace

Status: ADDITIVT. Föreslås, ersätter inte Smart Workspace, checklistan eller det guidade flödet.

## Motivering

Småföretagets onboarding består av texter som redan finns som handbok, policy, rutin och instruktion. Många vill öppna det som ett dokument, ändra i Word och lägga tillbaka filen. Det skapar verksamhetsvärde utan att checklistan eller det guidade flödet behöver bli en ordbehandlare.

Document Workspace är därför ett tillägg för innehåll, inte en ny primär arbetsyta.

## Vad den är

En dokumentyta för:

- handböcker
- instruktioner
- policys
- rutiner
- företagsanpassade texter
- AI-genererat utkast, som alltid måste granskas innan publicering

Word (.docx) är ett förstaklassformat. Samma dokument ska kunna redigeras i appen och i Microsoft Word utan att version, titel eller koppling till mallen tappas.

## Vad den inte är

- inte ersättning för guidad onboarding
- inte ersättning för Version 1.0-checklistan
- inte ett generellt HR-system
- inte en plats där publicerad mallversion skrivs över

## Koppling till datamodellen

Varje dokument har metadata och en fil. En ny fil skapar en ny version. Historisk onboarding pekar på den version som gällde när den startades.

Regler, samma som `docs/DOCUMENT_STORAGE.md`:

- publicerad dokumentversion är låst
- ändring sker i utkast och publiceras som nästa version
- mallversion och onboarding-snapshot pekar på en bestämd dokumentversion
- Word-export och PDF-export använder den versionen

Synk tillbaka till datamodellen gäller bara fält som är markerade som variabler, till exempel företagsnamn, deltagare och ansvarig. Fri brödtext synkas inte in i stegbanken.

## Leveransordning

1. Öppna befintligt onboardingdokument som låst dokumentvy. Redan delvis på plats via `/onboarding/document/[slug]`.
2. Exportera samma innehåll till .docx och PDF.
3. Importera .docx som ny utkastversion, utan att skriva över föregående version.
4. Rich text i appen för utkast: rubrik, stycke, lista, tabell.
5. Variabler, kommentarer, spårade ändringar och godkännande. Kräver Del 4, annars går det inte att veta vem som godkände.

## Medvetet senare

Kommentarer, spårade ändringar och godkännandeflöde byggs inte före inloggning och företag. Utan aktör blir de bara text i en öppen tabell.
