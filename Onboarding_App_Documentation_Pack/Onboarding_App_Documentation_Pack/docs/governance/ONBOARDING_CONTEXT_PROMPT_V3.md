# Kontextprompt – fortsätt Onboarding App Version 2

Detta ChatGPT-projekt gäller endast **Onboarding App Version 2**.

## Läs först

Använd följande filer som styrande kontext:

1. `ONBOARDING_PROJECT_CONTEXT_V0_1.md`
2. `ONBOARDING_CONTENT_BLUEPRINT.md`
3. `ONBOARDING_REQUIRED_MD_INDEX_V0_1.md`
4. `ONBOARDING_SOURCE_MAP_V0_1.md`
5. `ONBOARDING_REVIEW_AND_PUBLISHING_RULES_V0_1.md`
6. `ONBOARDING_POLICY_PACK_V0_1.md`

Använd därefter dessa innehållsfiler:

7. `ONBOARDING_CONTENT_FOUNDATION_BATCH_02.md`
8. `ONBOARDING_STEPBANK_BATCH_01.md`
9. `ONBOARDING_STEPBANK_BATCH_02.md`
10. `ONBOARDING_STEPBANK_BATCH_03.md`
11. `ONBOARDING_STEG1_ALLMAN_GRUND_SV_EN.md`
12. `ONBOARDING_STEG2_BYGG_ENTREPRENAD_SV_EN.md`

Källregistret är:

13. `SOURCE_REGISTER_V0_3.md`

## Projektets riktning

Onboarding App ska vara en hybrid med stegbank och stödja:

- information
- uppgifter
- dokument
- möten
- kontroller
- bekräftelser
- kunskapsfrågor
- uppföljning

Den ska använda sex faser:

1. Förberedelse
2. Välkomst och introduktion
3. Grundläggande krav
4. Bransch- och rollspecifik introduktion
5. Praktisk integration
6. Uppföljning och avslut

Den ska använda fyra innehållslager:

1. Allmänt
2. Bransch
3. Befattning
4. Företag

## Viktiga beslut

- Originalfiler får inte skrivas över.
- Fullständiga policy- eller standardtexter ska inte kopieras till appen.
- Alla steg ska vara egenformulerade och ha `source_ids`.
- Kunden arbetar i en kopia av en grundmall.
- Avslutade onboardingar använder snapshots och får inte ändras retroaktivt.
- Integrerad verksamhetspolicy och separata KMA-policyer är alternativa policyprofiler.
- IT, dataskydd, fordon och andra specialområden ska vara villkorsstyrda.
- Alla nya eller sammanslagna steg börjar som `DRAFT`.

KMA betyder **kvalitet, miljö och arbetsmiljö**.

## Kända risker

- Dubbletter finns mellan befintliga stegbanker.
- Flera original innehåller äldre juridiska eller myndighetsrelaterade formuleringar.
- GDPR-materialet, IT-policyn, diskrimineringspolicyn, körjournalen och fordonspolicyn kräver särskild aktualitetsgranskning.
- ISO-relaterade påståenden får inte märkas som verifierade krav utan kontrollerad standardversion och källhänvisning.
- Bekräftelse får inte ersätta praktisk kontroll när färdighet krävs.

## Nästa huvuduppgift

Skapa en plan för filen:

`ONBOARDING_STEPBANK_MASTER.md`

Gör **inte kod**.

### Leverera först

1. En dubblettmatris mellan Batch 01, Batch 02, Batch 03 och de två tidigare SV/EN-stegfilerna.
2. Förslag på vilka steg som:
   - behålls
   - slås samman
   - byter ID
   - blir villkorsstyrda
   - flyttas till bransch, befattning eller företag
   - tas bort från första versionen
3. Förslag på slutlig ID-struktur.
4. Förslag på första allmänna onboardingmall.
5. Förslag på vilka steg som ska ingå i byggpaketet.
6. Lista över juridiska och standardrelaterade påståenden som måste verifieras.
7. En tydlig arbetsordning för att skapa den kanoniska masterstegruppens första version.

## Viktig kvalitetsregel

Skapa inte påhittade käll-ID:n.

Använd endast `source_ids` som finns i `SOURCE_REGISTER_V0_3.md`.

Skilj alltid mellan:

- verifierat krav
- företagets regel
- tillämpning
- exempel
- rekommendation

## Svarsform

Svara på svenska med:

- beslut och nästa steg först
- korta rubriker
- tydliga tabeller där de förenklar
- enkelt språk
- förkortningar utskrivna första gången
- tydlig markering av sådant som måste verifieras

Börja nu med dubblettmatrisen och konsolideringsplanen.
