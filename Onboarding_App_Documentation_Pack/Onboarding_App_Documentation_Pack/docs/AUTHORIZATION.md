# Behörighetsmodell

> **Dokumentstatus:** TARGET  
> **Ägare:** Security Lead + Tech Lead  
> **Uppdateras:** När roller, permissions eller tenantregler ändras.  
> **Relaterar till:** PRD.md, REQUIREMENTS.md, ARCHITECTURE.md, PROJECT_PLAN.md och relevanta ämnesdokument.

## 1. Syfte

Definiera roller, permissions och tenant-isolering.

## 2. Dokumentets roll

Detta dokument är en del av projektets dokumenterade system. Krav och beslut här ska inte motsäga `DECISIONS.md`, `PROJECT_STATUS.md` eller de styrande innehållsreglerna. När ett senare beslut ändrar detta dokument ska ändringen registreras i `ONBOARDING_CHANGELOG.md`.

## 3. Roller

### Företagsadministratör
Kan konfigurera företag, mallar, moduler, dokumentkopplingar och publicering inom sitt företag.

### Chef / onboardingansvarig
Kan planera onboarding, tilldela ansvar och följa upp deltagare.

### Handledare
Kan genomföra och bedöma praktiska moment som tilldelats rollen.

### Deltagare
Kan genomföra egna steg och se information som tillhör den egna onboardingprocessen.

### Plattformadministratör
Endast intern driftroll. Ska inte användas av kundens normala användare.

## 4. Permission-princip

Behörighet kontrolleras både i applikationslagret och i databasen. UI-döljning räknas aldrig som säkerhetskontroll.

## 5. Kritiska permissions

- `template.write`
- `template.publish`
- `onboarding.assign`
- `onboarding.complete`
- `document.manage`
- `module.manage`
- `module.publish`
- `ai.use`
- `ai.apply`
- `audit.read`
- `company.manage`

## 6. Separation of duties

Den som kan skapa innehåll behöver inte automatiskt kunna publicera innehåll. Detta är särskilt viktigt för AI-genererat och juridiskt/standardrelaterat innehåll.
