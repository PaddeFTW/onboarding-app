# Onboarding Source Inventory v0.1

**Datum:** 2026-07-09  
**Syfte:** Första registrering och prioritering av de uppladdade källorna för Onboarding App Version 2.

## Viktig kvalitetsregel

- Materialet används som **källunderlag**, inte som automatiskt godkänd sanning.
- Påståenden om lagar, föreskrifter, ISO-utgåvor och framtida regelverk markeras som **ej verifierade** tills de har kontrollerats mot primär källa.
- Appinnehåll ska egenformuleras och spåras med `source_ids`.
- Kontrollplan, egenkontroll, arbetsmiljöplan och företagets interna rutiner ska hållas isär.

## Registrerade källor

| source_id | Fil | Typ | Huvudområde | Prioritet | Status | Verifieringsbehov |
|---|---|---|---|---|---|---|
| `SRC-ONB-001` | Introduktion - nyanställd.docx | Egen produkt / introduktionspärm | Allmän onboarding | P0 | `REGISTERED` | Bryt ned till allmänna onboardingsteg. Kontrollera daterade belopp, telefonnummer och regelhänvisningar före publicering. |
| `SRC-ONB-002` | ONBOARDING_CONTENT_BLUEPRINT.md | Styrdokument | Datamodell, faser, lager och stegtyper | P0 | `APPROVED_BASELINE` | Används som struktur för samtliga steg. |
| `SRC-ONB-003` | QA_och_Ordlistor_per_Bransch.md | Branschmaterial | Ordlista, hjälptexter och framtida branschpaket | P2 | `REGISTERED` | Används senare för vardagsspråk och branschförklaringar. Sakgranska rättsliga påståenden. |
| `SRC-BYG-F02` | Flik 2 Projektorganisation m.fl.pdf | Byggpärm | Projekt- och beställarorganisation | P0 | `REGISTERED_WITH_WARNING` | Filnamnet anger Flik 2 men innehållet visar Flik 3. Kontrollera original och dubblett. |
| `SRC-BYG-F03` | Flik 3 Beställarens organisation.pdf | Byggpärm | Beställarens organisation | P0 | `REGISTERED_WITH_WARNING` | Verkar vara samma eller nästan samma innehåll som SRC-BYG-F02. Dubblettkontroll krävs. |
| `SRC-BYG-F04` | Flik 4 Underleverantörer (organisation.pdf | Byggpärm | Underentreprenörers organisation och ansvar | P0 | `REGISTERED` | Kontrollera terminologi: underleverantör kontra underentreprenör. |
| `SRC-BYG-F05` | Flik 5 Kvalitetsplan.pdf | Byggpärm | Kvalitetsplan, dokumentstyrning, egenkontroll och avvikelser | P0 | `REGISTERED_WITH_WARNING` | Flera påståenden om framtida ISO-utgåvor och regelverk ska verifieras separat. |
| `SRC-BYG-F06` | Flik 6 Miljöplan.pdf | Byggpärm | Miljöaspekter, källsortering, kemikalier och nödläge | P0 | `REGISTERED_WITH_WARNING` | Flera påståenden om framtida ISO-utgåvor och EU-regler ska verifieras separat. |
| `SRC-BYG-F07` | Flik 7 Arbetsmiljöplan.pdf | Byggpärm | Arbetsmiljöplan, riskbedömning, skyddsrond och samordning | P0 | `REGISTERED_WITH_WARNING` | Verifiera exakta föreskrifts- och versionshänvisningar före extern publicering. |
| `SRC-BYG-F08` | Flik 8 Miljöanalys.pdf | Byggpärm | Projektets miljöpåverkan, avfall, transporter och material | P1 | `REGISTERED_WITH_WARNING` | Särskilj företagets arbetssätt från bindande krav. |
| `SRC-BYG-F09` | Flik 9 Rivningsplan.pdf | Byggpärm | Rivning, materialinventering och avfall | P1 | `REGISTERED_WITH_WARNING` | Använd endast när projektet innehåller rivning. Rättsliga hänvisningar måste verifieras. |
| `SRC-BYG-F10` | Flik 10 Protokoll - byggmöte mm.pdf | Byggpärm | Byggmöte, beslut, KMA-frågor och distribution | P1 | `REGISTERED_WITH_WARNING` | Påståenden om obligatoriska möten och kommande standarder ska verifieras. |
| `SRC-BYG-F11` | Flik 11 Bygghandlingar relationsritninga.pdf | Byggpärm | Ritningar, relationshandlingar och versionsstyrning | P1 | `REGISTERED_WITH_WARNING` | Verifiera krav på format, arkiveringstid och godkännanderoller. |
| `SRC-BYG-F12` | Flik 12 Kontrollplan.pdf | Byggpärm | Kontrollplan, kontrollansvarig, underlag och signering | P0 | `REGISTERED_WITH_WARNING` | Kontrollplan enligt PBL ska hållas tydligt skild från företagets egenkontroll. |
| `SRC-BYG-F13` | Flik 13 -5 Egenkontroll personal.pdf | Byggpärm | Egenkontrollmallar för administration, kvalitet, miljö och arbetsmiljö | P0 | `REGISTERED_WITH_WARNING` | Originaltext anges delvis som saknad/platshållare. Kontrollera att alla undermallar finns. |
| `SRC-BYG-F14` | Flik 14 Egenkontroller från underentreprenörer.pdf | Byggpärm | Insamling och spårning av underentreprenörers egenkontroller | P0 | `REGISTERED_WITH_WARNING` | Verifiera ansvarsfördelning och undvik att göra generell praxis till lagkrav. |
| `SRC-BYG-F15` | Flik 15 Inventering av maskiner för UE.pdf | Byggpärm | Maskiner, fordon, besiktning, service och förarbehörighet | P0 | `REGISTERED_WITH_WARNING` | Verifiera vilka maskiner som kräver besiktning och vilka behörigheter som gäller. |
| `SRC-BYG-F16` | Flik 16 Avvikelserapport.docx.pdf | Byggpärm | ÄTA, avvikelse, grundorsak, åtgärd och uppföljning | P0 | `REGISTERED_WITH_WARNING` | ÄTA och avvikelse ska vara separata flöden även om de ligger i samma källa. |
| `SRC-BYG-F17` | Flik 17 Säkerhetsdatablad för projektet.pdf | Byggpärm | Kemikalier och säkerhetsdatablad | P0 | `REGISTERED_WITH_WARNING` | Verifiera aktualitetskrav, laghänvisningar och ansvar innan publicering. |
| `SRC-BYG-F18` | Flik 18 Nödlägesberedskap.pdf | Byggpärm | Nödlägesorganisation, larmvägar och övning | P0 | `REGISTERED_WITH_WARNING` | Kontrollera telefonnummer, roller och krav på övningsfrekvens för varje projekt. |

## Första bearbetningsordning

1. **Allmän grund:** `SRC-ONB-001`.
2. **Bygg – säker introduktion:** `SRC-BYG-F07`, `SRC-BYG-F15`, `SRC-BYG-F17`, `SRC-BYG-F18`.
3. **Bygg – kvalitet och projektstyrning:** `SRC-BYG-F02`–`SRC-BYG-F05`, `SRC-BYG-F10`–`SRC-BYG-F14`, `SRC-BYG-F16`.
4. **Bygg – miljö och särskilda projekt:** `SRC-BYG-F06`, `SRC-BYG-F08`, `SRC-BYG-F09`.
5. **Ordlista och fler branscher:** `SRC-ONB-003`.

## Upptäckta datakvalitetsproblem

- `SRC-BYG-F02` och `SRC-BYG-F03` verkar innehålla samma eller nästan samma dokument.
- Flera byggfiler innehåller självvärderingar som ”juridisk korrekthet 9/10”. Dessa räknas inte som oberoende verifiering.
- Flera filer hänvisar till framtida eller ej slutligt verifierade standardutgåvor. De får inte märkas som bindande krav i appen innan kontroll.
- Vissa dokument blandar interna rutiner, rekommendationer och påstådda lagkrav. Dessa måste klassificeras separat.

## Status

**Batch 1 registrerad.** Nästa steg är sakgranskning och fortsatt nedbrytning till steg.