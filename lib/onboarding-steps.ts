export type OnboardingStepType =
  | "information"
  | "confirmation"
  | "singleChoice"
  | "task";

export type StepStatus = "notStarted" | "inProgress" | "completed" | "skipped";

export type OnboardingInstanceStatus = "notStarted" | "ongoing" | "completed";

export interface StepOption {
  id: string;
  label: string;
}

export interface StepCondition {
  dependsOnStepId: string;
  responseKey: "selectedOptionId";
  equals: string;
}

export interface OnboardingStepDefinition {
  id: string;
  title: string;
  description: string;
  type: OnboardingStepType;
  required: boolean;
  order: number;
  estimatedMinutes?: number;
  helpText?: string;
  content?: string;
  options?: StepOption[];
  confirmationLabel?: string;
  condition?: StepCondition;
}

export interface StepResponse {
  acknowledged?: boolean;
  selectedOptionId?: string;
  taskConfirmed?: boolean;
  comment?: string;
}

export interface OnboardingStepInstance {
  id: string;
  sourceStepId: string;
  title: string;
  description: string;
  type: OnboardingStepType;
  required: boolean;
  order: number;
  status: StepStatus;
  response: StepResponse;
  completedAt: string | null;
  completedBy: string | null;
  estimatedMinutes?: number;
  helpText?: string;
  content?: string;
  options?: StepOption[];
  confirmationLabel?: string;
  condition?: StepCondition;
}

export interface OnboardingInstance {
  id: string;
  title: string;
  participantName: string;
  responsibleName: string;
  status: OnboardingInstanceStatus;
  currentStepId: string | null;
  progress: number;
  startedAt: string;
  completedAt: string | null;
  steps: OnboardingStepInstance[];
}

export const DEMO_GUIDED_ONBOARDING_ID = "demo-byggco";

export const BUILD_CO_STEP_DEFINITIONS: OnboardingStepDefinition[] = [
  {
    id: "welcome",
    title: "Välkommen till företaget",
    description: "En kort introduktion till din första tid hos oss.",
    type: "information",
    required: true,
    order: 1,
    estimatedMinutes: 2,
    content:
      "Välkommen till Bygg & Montage AB. Under den här onboardingen går vi igenom det viktigaste du behöver veta innan du börjar arbeta — arbetssätt, säkerhet, kontakter och rutiner.",
    helpText:
      "Ta den tid du behöver. Du kan alltid gå tillbaka till tidigare steg.",
  },
  {
    id: "workplace",
    title: "Var arbetar du huvudsakligen?",
    description: "Detta styr vilka moment som är relevanta för dig.",
    type: "singleChoice",
    required: true,
    order: 2,
    estimatedMinutes: 1,
    options: [
      { id: "construction-site", label: "Byggarbetsplats" },
      { id: "office", label: "Kontor eller verkstad" },
      { id: "mixed", label: "Blandat — både plats och kontor" },
    ],
    helpText: "Välj det alternativ som bäst beskriver din vardag.",
  },
  {
    id: "contact-person",
    title: "Din ansvariga kontaktperson",
    description: "Vem du vänder dig till vid frågor och avstämning.",
    type: "information",
    required: true,
    order: 3,
    estimatedMinutes: 2,
    content:
      "Din närmaste chef är din primära kontaktperson. Vid frågor om arbetsmiljö, utrustning eller schema kontaktar du chefen först. Vid akuta händelser följer du alltid larm- och säkerhetsrutinerna.",
    helpText: "Kontaktuppgifter finns också i personalhandboken.",
  },
  {
    id: "work-practices",
    title: "Företagets viktigaste arbetssätt",
    description: "Gemensamma principer som gäller i hela verksamheten.",
    type: "confirmation",
    required: true,
    order: 4,
    estimatedMinutes: 3,
    content:
      "Vi arbetar strukturerat, planerar arbetet innan start och stoppar jobbet om något känns osäkert. Alla medarbetare förväntas rapportera tillbud, hålla ordning på arbetsplatsen och följa gällande instruktioner.",
    confirmationLabel: "Jag har tagit del av informationen om arbetssätt.",
  },
  {
    id: "work-environment",
    title: "Arbetsmiljöintroduktion",
    description: "Genomför en kort genomgång med din chef eller handledare.",
    type: "task",
    required: true,
    order: 5,
    estimatedMinutes: 15,
    content:
      "Gå igenom arbetsplatsens layout, nödutgångar, första hjälpen-utrustning och var du hittar skyddsutrustning. Notera eventuella särskilda risker på din arbetsplats.",
    helpText: "Bekräfta när genomgången är genomförd.",
  },
  {
    id: "ppe",
    title: "Personlig skyddsutrustning",
    description: "Obligatorisk utrustning på byggarbetsplats.",
    type: "singleChoice",
    required: true,
    order: 6,
    estimatedMinutes: 3,
    condition: {
      dependsOnStepId: "workplace",
      responseKey: "selectedOptionId",
      equals: "construction-site",
    },
    options: [
      { id: "received-all", label: "Jag har fått och förstår hur utrustningen används" },
      { id: "need-follow-up", label: "Jag behöver kompletterande genomgång" },
    ],
    content:
      "På byggarbetsplats krävs hjälm, skyddsskor och synlighetskläder. Ytterligare utrustning kan krävas beroende på arbetsmoment.",
    helpText: "Kontakta din chef om något saknas.",
  },
  {
    id: "accident-routines",
    title: "Rutiner vid olycka och tillbud",
    description: "Vad du gör om något händer eller nästan händer.",
    type: "confirmation",
    required: true,
    order: 7,
    estimatedMinutes: 3,
    content:
      "Vid olycka: säkra platsen, ge första hjälpen om det behövs och larma enligt instruktion. Vid tillbud: rapportera till chef så snart som möjligt, även om ingen skadades.",
    confirmationLabel: "Jag vet hur jag ska agera vid olycka och tillbud.",
  },
  {
    id: "work-hours",
    title: "Arbetstider och frånvaro",
    description: "Schema, rapportering och hur frånvaro anmäls.",
    type: "confirmation",
    required: true,
    order: 8,
    estimatedMinutes: 2,
    content:
      "Ordinarie arbetstid är måndag–fredag 07:00–16:00. Schema och eventuella avvikelser meddelas av chef. Frånvaro anmäls i god tid enligt gällande rutin.",
    confirmationLabel: "Jag har tagit del av informationen om arbetstider och frånvaro.",
  },
  {
    id: "confirm-introductions",
    title: "Bekräfta genomförda introduktioner",
    description: "Sammanfatta vad som har gåtts igenom.",
    type: "task",
    required: true,
    order: 9,
    estimatedMinutes: 5,
    content:
      "Gå igenom med din chef att introduktion, arbetsmiljögenomgång och relevanta rutiner är genomförda. Lägg gärna en kort kommentar om något behöver följas upp.",
    helpText: "En kort kommentar räcker om allt är klart.",
  },
  {
    id: "complete",
    title: "Onboarding klar",
    description: "Avsluta och bekräfta att grundintroduktionen är genomförd.",
    type: "confirmation",
    required: true,
    order: 10,
    estimatedMinutes: 1,
    content:
      "Du har nu gått igenom grundintroduktionen. Din chef följer upp hur starten fungerar under de första veckorna.",
    confirmationLabel: "Jag bekräftar att grundintroduktionen är genomförd.",
  },
];

export function createStepInstancesFromDefinitions(
  definitions: OnboardingStepDefinition[]
): OnboardingStepInstance[] {
  return definitions.map((definition) => ({
    id: definition.id,
    sourceStepId: definition.id,
    title: definition.title,
    description: definition.description,
    type: definition.type,
    required: definition.required,
    order: definition.order,
    status: "notStarted",
    response: {},
    completedAt: null,
    completedBy: null,
    estimatedMinutes: definition.estimatedMinutes,
    helpText: definition.helpText,
    content: definition.content,
    options: definition.options,
    confirmationLabel: definition.confirmationLabel,
    condition: definition.condition,
  }));
}

export function createDemoGuidedOnboarding(): OnboardingInstance {
  const steps = createStepInstancesFromDefinitions(BUILD_CO_STEP_DEFINITIONS);
  const visible = getVisibleSteps({ steps } as OnboardingInstance);

  return {
    id: DEMO_GUIDED_ONBOARDING_ID,
    title: "Grundintroduktion — Bygg & Montage AB",
    participantName: "Alex Andersson",
    responsibleName: "Maria Lindqvist",
    status: "notStarted",
    currentStepId: visible[0]?.id ?? null,
    progress: 0,
    startedAt: new Date().toISOString(),
    completedAt: null,
    steps,
  };
}

function getStepById(
  instance: Pick<OnboardingInstance, "steps">,
  stepId: string
): OnboardingStepInstance | undefined {
  return instance.steps.find((step) => step.id === stepId);
}

function getStepResponseValue(
  instance: OnboardingInstance,
  stepId: string,
  responseKey: StepCondition["responseKey"]
): string | undefined {
  const step = getStepById(instance, stepId);
  if (!step) return undefined;
  return step.response[responseKey];
}

export function isStepVisible(
  instance: OnboardingInstance,
  step: OnboardingStepInstance
): boolean {
  if (!step.condition) {
    return true;
  }

  const value = getStepResponseValue(
    instance,
    step.condition.dependsOnStepId,
    step.condition.responseKey
  );

  return value === step.condition.equals;
}

export function getVisibleSteps(instance: OnboardingInstance): OnboardingStepInstance[] {
  return instance.steps
    .filter((step) => isStepVisible(instance, step))
    .sort((a, b) => a.order - b.order);
}

export function applyStepVisibility(instance: OnboardingInstance): OnboardingInstance {
  const visibleIds = new Set(getVisibleSteps(instance).map((step) => step.id));

  return {
    ...instance,
    steps: instance.steps.map((step) => {
      if (visibleIds.has(step.id)) {
        return step.status === "skipped"
          ? { ...step, status: "notStarted" as StepStatus }
          : step;
      }

      if (step.status === "completed" || step.status === "inProgress") {
        return step;
      }

      return {
        ...step,
        status: "skipped" as StepStatus,
        response: {},
        completedAt: null,
        completedBy: null,
      };
    }),
  };
}

export function isStepResponseComplete(step: OnboardingStepInstance): boolean {
  switch (step.type) {
    case "information":
      return true;
    case "confirmation":
      return step.response.acknowledged === true;
    case "singleChoice":
      return Boolean(step.response.selectedOptionId);
    case "task":
      return step.response.taskConfirmed === true;
    default:
      return false;
  }
}

export function countCompletedVisibleSteps(instance: OnboardingInstance): number {
  return getVisibleSteps(instance).filter((step) => step.status === "completed")
    .length;
}

export function calcGuidedProgress(instance: OnboardingInstance): number {
  const visible = getVisibleSteps(instance);
  const required = visible.filter((step) => step.required);

  if (required.length === 0) {
    return 0;
  }

  const completed = required.filter((step) => step.status === "completed").length;
  return Math.round((completed / required.length) * 100);
}

export function canCompleteGuidedOnboarding(instance: OnboardingInstance): boolean {
  const visible = getVisibleSteps(instance);
  return visible
    .filter((step) => step.required)
    .every((step) => step.status === "completed");
}

export function getCurrentStepIndex(
  instance: OnboardingInstance,
  visibleSteps: OnboardingStepInstance[] = getVisibleSteps(instance)
): number {
  if (!instance.currentStepId) {
    return 0;
  }

  const index = visibleSteps.findIndex((step) => step.id === instance.currentStepId);
  return index >= 0 ? index : 0;
}

export function getNextVisibleStepId(
  instance: OnboardingInstance,
  currentStepId: string
): string | null {
  const visible = getVisibleSteps(instance);
  const index = visible.findIndex((step) => step.id === currentStepId);
  return index >= 0 && index < visible.length - 1
    ? visible[index + 1].id
    : null;
}

export function getPreviousVisibleStepId(
  instance: OnboardingInstance,
  currentStepId: string
): string | null {
  const visible = getVisibleSteps(instance);
  const index = visible.findIndex((step) => step.id === currentStepId);
  return index > 0 ? visible[index - 1].id : null;
}

export function isStepAccessible(
  instance: OnboardingInstance,
  stepId: string
): boolean {
  const visible = getVisibleSteps(instance);
  const targetIndex = visible.findIndex((step) => step.id === stepId);

  if (targetIndex < 0) {
    return false;
  }

  const furthestIndex = visible.reduce((maxIndex, step, index) => {
    if (step.status === "completed" || step.status === "inProgress") {
      return Math.max(maxIndex, index);
    }
    return maxIndex;
  }, 0);

  return targetIndex <= furthestIndex;
}

export function getStepOverviewStatus(
  step: OnboardingStepInstance,
  currentStepId: string | null
): "completed" | "current" | "available" | "locked" | "skipped" {
  if (step.status === "skipped") {
    return "skipped";
  }
  if (step.status === "completed") {
    return "completed";
  }
  if (step.id === currentStepId) {
    return "current";
  }
  if (step.status === "inProgress") {
    return "available";
  }
  return "locked";
}

export function withUpdatedStep(
  instance: OnboardingInstance,
  stepId: string,
  updater: (step: OnboardingStepInstance) => OnboardingStepInstance
): OnboardingInstance {
  return {
    ...instance,
    steps: instance.steps.map((step) =>
      step.id === stepId ? updater(step) : step
    ),
  };
}

export function recomputeInstanceState(
  instance: OnboardingInstance
): OnboardingInstance {
  const withVisibility = applyStepVisibility(instance);
  const visible = getVisibleSteps(withVisibility);
  const progress = calcGuidedProgress(withVisibility);
  const completed = canCompleteGuidedOnboarding(withVisibility);

  let currentStepId = withVisibility.currentStepId;
  if (currentStepId && !visible.some((step) => step.id === currentStepId)) {
    currentStepId = visible[0]?.id ?? null;
  }

  if (!currentStepId && visible[0]) {
    currentStepId = visible[0].id;
  }

  let status: OnboardingInstanceStatus = withVisibility.status;
  if (completed) {
    status = "completed";
  } else if (progress > 0 || visible.some((step) => step.status !== "notStarted")) {
    status = "ongoing";
  } else {
    status = "notStarted";
  }

  return {
    ...withVisibility,
    currentStepId,
    progress,
    status,
    completedAt: completed
      ? withVisibility.completedAt ?? new Date().toISOString()
      : null,
  };
}
