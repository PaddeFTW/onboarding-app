# Teststrategi

> **Dokumentstatus:** TARGET  
> **Ägare:** QA Lead  
> **Uppdateras:** Inför varje release och när teststrategin förändras.  
> **Relaterar till:** PRD.md, REQUIREMENTS.md, ARCHITECTURE.md, PROJECT_PLAN.md och relevanta ämnesdokument.

## 1. Syfte

Definiera hur funktionell kvalitet, säkerhet, UX, tillgänglighet och versionssäkerhet verifieras.

## 2. Dokumentets roll

Detta dokument är en del av projektets dokumenterade system. Krav och beslut här ska inte motsäga `DECISIONS.md`, `PROJECT_STATUS.md` eller de styrande innehållsreglerna. När ett senare beslut ändrar detta dokument ska ändringen registreras i `ONBOARDING_CHANGELOG.md`.

## 3. Testnivåer

1. Unit tests för domänregler.
2. Integration tests för databas, RLS och tjänster.
3. Component tests för kritiska UI-komponenter.
4. End-to-end (E2E) för centrala användarflöden.
5. Security tests.
6. Accessibility tests.
7. Performance tests.
8. Exploratory testing.

## 4. P0-flöden

- logga in
- välja företag
- skapa onboarding från mall
- publicera mallversion
- starta onboarding
- återuppta onboarding
- slutföra obligatoriska steg
- se workspace
- öppna dokument
- kontrollera behörighet
- skapa AI-förslag
- godkänna eller avvisa AI-förslag
- se audit log
- avsluta och låsa onboarding

## 5. Release gate

Ingen release om P0-test fallerar, cross-tenant access är möjlig, snapshot kan ändras retroaktivt eller kritiska tillgänglighetsfel kvarstår.
