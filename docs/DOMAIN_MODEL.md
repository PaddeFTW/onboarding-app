# Domain Model

## Status

Domänmodell för Onboarding App. Beskriver entiteter för både Version 1.0 (checklista) och Hybrid Foundation (stegbank). Undvik parallella modeller — nya begrepp bygger vidare på befintliga mönster.

## Version 1.0 (befintlig, låst)

### OnboardingRecord

En skarp onboardingprocess lagrad i Supabase. Innehåller deltagarinformation och en lista av `ChecklistItem`.

### ChecklistItem

En checklistpunkt kopierad från `CHECKLIST_TEMPLATE` vid skapande. Har titel, beskrivning, kommentar, detaljdata och slutförandetidpunkt.

## Hybrid Foundation (ny domän)

### OnboardingTemplate

Återanvändbar mall som beskriver en onboarding som helhet. Kan vara systemmall (`scope: "system"`) eller företagsmall (`scope: "company"`). Innehåller metadata, inte levande svar.

### OnboardingTemplateVersion

En specifik version av en mall. Status: `draft`, `published` eller `archived`. Innehåller listan av `OnboardingStepDefinition` vid publiceringstillfället. Skrivskyddad efter publicering.

### OnboardingStepDefinition

Ett mallsteg i en mallversion. Fält:

- `id`, `title`, `description`, `type`, `required`, `order`
- `estimatedMinutes`, `helpText`, `options`, `confirmationLabel`, `content`
- `condition` (valfritt, enkelt villkor)
- `completionRule` (implicit via stegtyp i första implementationen)

Stegtyper i första vertikala delen: `information`, `confirmation`, `singleChoice`, `task`.

### OnboardingInstance

En faktisk onboarding för en deltagare. Fält:

- `id`, `title`, `participantName`, `responsibleName`
- `status` (`notStarted`, `ongoing`, `completed`)
- `currentStepId`, `progress`, `startedAt`, `completedAt`
- `steps` (lista av `OnboardingStepInstance`)

I Del 1 lagras instansen lokalt i webbläsaren. Permanent lagring kommer i senare del.

### OnboardingSnapshot

Fryst kopia av mallversionens steg och dokumentreferenser vid start av en onboardinginstans. Pågående och slutförda processer läser snapshoten, inte den levande mallen.

I Del 1 materialiseras steg direkt från mockdata utan explicit snapshot-objekt, men steginstanser fungerar som en enkel snapshot.

### OnboardingStepInstance

Ett genomfört eller pågående steg i en onboardinginstans. Fält:

- `id`, `sourceStepId`, `title`, `description`, `type`, `required`, `order`
- `status` (`notStarted`, `inProgress`, `completed`, `skipped`)
- `response`, `completedAt`, `completedBy`
- innehållsfält kopierade från mallsteget (`content`, `options`, `helpText`, m.m.)

### StepResponse

Deltagarens svar för ett steg. Struktur beror på stegtyp:

- `information`: inget obligatoriskt svar (steget markeras klart vid navigering)
- `confirmation`: `acknowledged: boolean`
- `singleChoice`: `selectedOptionId: string`
- `task`: `taskConfirmed: boolean`, valfritt `comment: string`

## Relationer

```
OnboardingTemplate
  └── OnboardingTemplateVersion
        └── OnboardingStepDefinition[]
              │
              │ (vid start → snapshot)
              ▼
        OnboardingInstance
          └── OnboardingStepInstance[]
                └── StepResponse
```

## Mappning till kod (Del 1)

| Domänentitet | Kod |
|---|---|
| `OnboardingStepDefinition` | `lib/onboarding-steps.ts` → `BUILD_CO_STEP_DEFINITIONS` |
| `OnboardingStepInstance` | `OnboardingStepInstance` i samma fil |
| `OnboardingInstance` | `OnboardingInstance` + `GuidedOnboardingProvider` |
| `StepResponse` | `StepResponse` i samma fil |
| `OnboardingRecord` (V1) | `lib/onboarding.ts` → oförändrad |

## Framtida utökning (ej implementerad)

- `company_id` på mallar och instanser
- `OnboardingSnapshot` som explicit entitet i databasen
- `audit_events` för historik
- Dokumentversioner kopplade till steg
