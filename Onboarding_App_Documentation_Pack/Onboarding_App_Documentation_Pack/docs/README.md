# Onboarding App – Projektmanual

> **Dokumentstatus:** TARGET  
> **Ägare:** Produktägare + Tech Lead  
> **Uppdateras:** Vid varje större arkitektur-, produkt- eller releasebeslut.  
> **Relaterar till:** PRD.md, REQUIREMENTS.md, ARCHITECTURE.md, PROJECT_PLAN.md och relevanta ämnesdokument.

## 1. Syfte

README är projektets första läspunkt. Den beskriver vad systemet är, hur dokumentationen är organiserad, vilken version som är aktuell och i vilken ordning ett utvecklingsteam ska läsa dokumenten.

## 2. Dokumentets roll

Detta dokument är en del av projektets dokumenterade system. Krav och beslut här ska inte motsäga `DECISIONS.md`, `PROJECT_STATUS.md` eller de styrande innehållsreglerna. När ett senare beslut ändrar detta dokument ska ändringen registreras i `ONBOARDING_CHANGELOG.md`.

## 3. Produkt i en mening

Onboarding App är en skalbar företagsplattform som hjälper företag att planera, genomföra, följa upp och dokumentera introduktion av nya medarbetare genom en villkorsstyrd stegbank och en enkel arbetsyta.

## 4. Produktprincip

Appen ska kännas enkel för deltagaren och kraftfull för administratören. Den ska inte bli ett generellt HR-system.

## 5. Kärnmodell

- **Mall:** återanvändbar definition av onboarding.
- **Mallversion:** publicerbar, skrivskyddad version.
- **Instans:** ett faktiskt onboardingärende för en person.
- **Snapshot:** låst kopia av mall-, steg- och dokumentversioner som användes.
- **Steg:** minsta genomförbara arbetsenhet.
- **Innehållslager:** Allmänt, Bransch, Befattning, Företag.
- **Faser:** Förberedelse, Välkomst och introduktion, Grundläggande krav, Bransch- och rollspecifik introduktion, Praktisk integration, Uppföljning och avslut.

## 6. Dokumentationshierarki

### Produkt
`VISION.md` → `PRODUCT_STRATEGY.md` → `PRD.md` → `REQUIREMENTS.md`

### Innehåll
`ONBOARDING_STEPBANK_MASTER.md` → `ONBOARDING_REVIEW_AND_PUBLISHING_RULES_V0_1.md` → `ONBOARDING_POLICY_PACK_V0_1.md` → `SOURCE_REGISTER_V0_3.md`

### Teknik
`ARCHITECTURE.md` → `DATABASE.md` → `API_SPECIFICATION.md` → `AUTHENTICATION.md` → `AUTHORIZATION.md`

### UX
`INFORMATION_ARCHITECTURE.md` → `USER_FLOWS.md` → `DESIGN_SYSTEM.md` → `COMPONENT_LIBRARY.md`

### Drift
`DEPLOYMENT.md` → `DEVOPS.md` → `MONITORING.md` → `BACKUP_RECOVERY.md`

## 7. Befintligt läge

Release Candidate 1 är verifierad. Hybrid Foundation har ett guidat flöde med ett steg i taget, progress, lokal sparning och fyra implementerade stegtyper: `information`, `confirmation`, `singleChoice` och `task`. Permanent autentisering, företagsisolering, snapshots och historik ligger i senare genomförandesteg.

## 8. Styrande innehållsregler

Originalkällor ska bevaras oförändrade. Appens onboardingtext ska vara egenformulerad och källspårad. Juridiska, myndighetsrelaterade och standardrelaterade påståenden ska verifieras före publicering. Publiceringsflödet är `DRAFT → SOURCE_VERIFIED → DOMAIN_REVIEWED → COPYRIGHT_REVIEWED → APPROVED → PUBLISHED`.

## 9. Startordning för nytt utvecklingsteam

1. Läs `PROJECT_STATUS.md` och `DECISIONS.md`.
2. Läs `PRD.md`, `REQUIREMENTS.md` och `ACCEPTANCE_CRITERIA.md`.
3. Läs `ARCHITECTURE.md`, `DATABASE.md`, `AUTHORIZATION.md`.
4. Läs `USER_FLOWS.md`, `DESIGN_SYSTEM.md`, `SMART_WORKSPACE.md`.
5. Läs `MODULE_ASSISTANT.md` och `AI_GOVERNANCE.md`.
6. Följ `DEVELOPMENT_GUIDE.md` och `TEST_STRATEGY.md`.
7. Gör ingen ändring i domänmodell eller publiceringslogik utan att uppdatera berörda dokument.

## 10. Definition of Done

En funktion är klar först när krav, UX, behörighet, felhantering, test, tillgänglighet, loggning och dokumentation är behandlade.
