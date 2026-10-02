# AI Governance

> **Dokumentstatus:** TARGET  
> **Ägare:** AI Lead + Security Lead + Produktägare  
> **Uppdateras:** Vid nya AI-funktioner, ny provider, ny dataklass eller incident.  
> **Relaterar till:** PRD.md, REQUIREMENTS.md, ARCHITECTURE.md, PROJECT_PLAN.md och relevanta ämnesdokument.

## 1. Syfte

Reglera hur AI används, vilka data AI får se, hur förslag granskas och hur AI-aktiviteter loggas.

## 2. Dokumentets roll

Detta dokument är en del av projektets dokumenterade system. Krav och beslut här ska inte motsäga `DECISIONS.md`, `PROJECT_STATUS.md` eller de styrande innehållsreglerna. När ett senare beslut ändrar detta dokument ska ändringen registreras i `ONBOARDING_CHANGELOG.md`.

## 3. Grundregel

AI är beslutsstöd och produktivitetsstöd. AI är inte slutlig beslutsfattare.

## 4. Data

AI ska få minsta möjliga datamängd som behövs. Företagsdata ska isoleras per tenant. Känsliga personuppgifter ska inte skickas till AI om det inte finns ett uttryckligt, godkänt behov och rätt skydd.

## 5. Spårbarhet

AI-körningar ska kunna kopplas till användare, företag, funktion, modell/provider, tidpunkt och resultatklass. Promptar och svar ska inte sparas längre än nödvändigt.

## 6. Källspårning

När AI genererar onboardinginnehåll ska källor följa med. Om källan saknas ska AI markera förslaget som ej verifierat.

## 7. Publicering

AI-förslag får status `DRAFT`. Publicering kräver mänsklig granskning enligt innehållsprocessen.

## 8. Säkerhet

Prompt injection, dataexfiltration, otillåten tool use och cross-tenant access ska testas innan AI-funktioner släpps.
