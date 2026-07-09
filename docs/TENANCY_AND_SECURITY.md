# Tenancy and Security

## Syfte

Nästa version ska kunna användas av flera företag utan att företag kan se eller påverka varandras data. Detta dokument beskriver grundprinciperna för multi-tenant-arkitektur och säkerhet.

Multi-tenant betyder att flera kunder delar samma applikation och databas men hålls logiskt separerade.

## Företagstillhörighet

Varje kundföretag representeras av en rad i `companies`. Företagets data kopplas till företaget med `company_id`.

Företagsägd data ska alltid ha `company_id`, till exempel:

- medlemskap
- företagsmallar
- företagsmallversioner
- onboardingar
- onboarding-snapshots
- dokument
- kommentarer
- audit events

Undantag:

- systemmallar ägs av systemet
- profiler kan vara användarägda och kopplas till företag genom medlemskap

## Användarmedlemskap

En användare får åtkomst till ett företag genom `company_memberships`.

Medlemskapet ska minst innehålla:

- `company_id`
- `profile_id`
- roll
- status

En användare utan aktivt medlemskap i ett företag ska inte kunna läsa företagets data.

## Rollkontroll

Rollkontroll ska göras på två nivåer:

1. Databasregler som skyddar grundåtkomst.
2. Serverkontroller som avgör åtgärder som publicering, dokumentbyte och slutförande.

Serverkontroll betyder kod som körs på servern och validerar att användaren får utföra åtgärden innan databasen ändras.

## RLS

Row Level Security (RLS, säkerhetsregler på databasrader) ska användas i Supabase för företagsägd data.

Grundregel:

- användare får bara läsa rader där det finns ett aktivt medlemskap för samma `company_id`
- användare får bara skriva rader där rollen tillåter åtgärden
- systemmallar kan vara läsbara för inloggade användare, men bara interna systemroller får ändra dem

RLS ska inte ersätta serverkontroller. RLS är sista skyddslinjen i databasen.

## Skydd mellan företag

Följande får aldrig vara möjligt:

- deltagare i företag A ser onboarding i företag B
- ansvarig chef i företag A ser dokument i företag B
- företagsadministratör i företag A redigerar mall i företag B
- dokumentlänkar går att gissa och öppna utan behörighet

Tekniska regler:

- alla frågor filtreras med företagskontext
- RLS kontrollerar medlemskap
- dokumenthämtning går via skyddad åtkomst eller signerade länkar
- audit events innehåller `company_id` när händelsen är företagsägd

## Skydd av dokument

Dokument ska inte ligga i publika mappar för nästa version om de är företagsunika eller innehåller kunddata.

Rekommendation:

- lagra filer i privat objektlagring
- lagra metadata i `documents`
- använd unik `storage_path` per dokumentversion
- kontrollera åtkomst innan fil visas eller laddas ned
- använd tidsbegränsade signerade länkar när direktfil behövs

Signerad länk betyder en tillfällig URL som ger åtkomst till en fil under begränsad tid.

## Serverkontroller

Servern ska kontrollera:

- att användaren är inloggad
- att användaren har aktivt medlemskap i aktuellt företag
- att användarens roll tillåter åtgärden
- att resursen tillhör samma företag
- att publicerade och slutförda resurser inte ändras direkt

Åtgärder som alltid kräver serverkontroll:

- skapa företag
- bjuda in användare
- ändra roll
- publicera mall
- arkivera mallversion
- skapa onboarding
- slutföra onboarding
- ladda upp dokument
- ersätta dokument
- exportera historisk onboarding

## Varför UI-kontroller inte räcker

UI-kontroller är viktiga för tydlighet men kan inte vara säkerhetsgräns.

Orsaker:

- användare kan anropa API:er direkt
- klientkod kan manipuleras
- dolda knappar betyder inte skyddad data
- nätverksanrop kan återanvändas om servern inte kontrollerar behörighet

Säkerhetsregeln är därför:

> UI:t visar vad användaren bör kunna göra. Server och databas avgör vad användaren faktiskt får göra.

## Rekommenderad Supabase-strategi

Supabase rekommenderas för:

- Auth, det vill säga inloggning och session
- Postgres-databas för strukturerad data
- Storage, det vill säga objektlagring för dokument
- RLS för radnivåskydd

Detta är en rekommendation för nästa version och är inte implementerat i Sprint 0.
