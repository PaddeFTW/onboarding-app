export interface ChecklistDocument {
  name: string;
}

export interface ChecklistTemplateItem {
  id: string;
  title: string;
  description: string;
  info: string;
  documents: ChecklistDocument[];
}

export interface ChecklistItem extends ChecklistTemplateItem {
  completedAt: string | null;
}

export interface OnboardingRecord {
  id: string;
  firstName: string;
  lastName: string;
  position: string;
  manager: string;
  startDate: string;
  createdAt: string;
  completedAt: string | null;
  checklist: ChecklistItem[];
}

export interface CreateOnboardingInput {
  firstName: string;
  lastName: string;
  position: string;
  manager: string;
  startDate: string;
}

export type OnboardingStatus = "none" | "ongoing" | "completed";

export const CHECKLIST_TEMPLATE: ChecklistTemplateItem[] = [
  {
    id: "presentation",
    title: "Presentation",
    description:
      "Presentation av medarbetaren för teamet och relevanta avdelningar.",
    info: "Vi presenterar dig för dina närmaste kollegor och visar dig hur organisationen är uppbyggd. Ta gärna med frågor om kulturen och vardagliga rutiner.",
    documents: [],
  },
  {
    id: "tour",
    title: "Rundvandring",
    description:
      "Genomgång av arbetsplatsen - lokaler, utrustning och gemensamma ytor.",
    info: "Vi visar dig runt i hela byggnaden: ditt arbetsområde, fikarum, mötesrum, förråd och utrymningsvägar. Fråga gärna om det du är osäker på.",
    documents: [],
  },
  {
    id: "work-env",
    title: "Arbetsmiljöpolicy",
    description:
      "Genomgång av företagets policy för en god och säker arbetsmiljö.",
    info: "Vår arbetsmiljöpolicy fastslår att alla medarbetare har rätt till en trygg och hälsosam arbetsplats. Vi arbetar systematiskt med förebyggande åtgärder och välkomnar alla synpunkter.",
    documents: [{ name: "Arbetsmiljöpolicy 2026.pdf" }],
  },
  {
    id: "risks",
    title: "Risker på arbetsplatsen",
    description:
      "Identifiering och hantering av risker specifika för din arbetsroll.",
    info: "Varje yrkesroll har sina specifika risker. Vi går igenom vad som är relevant för din tjänst, hur du skyddar dig och vad du gör om du observerar ett riskmoment.",
    documents: [{ name: "Riskbedömning 2026.pdf" }],
  },
  {
    id: "safety-rep",
    title: "Skyddsombud",
    description:
      "Information om skyddsombudets roll och hur du kontaktar dem.",
    info: "Skyddsombudet representerar alla medarbetare i arbetsmiljöfrågor och är din kanal om du upplever problem. Du har alltid rätt att kontakta skyddsombudet utan att din chef informeras.",
    documents: [],
  },
  {
    id: "first-aid",
    title: "Första hjälpen",
    description:
      "Genomgång av var förstahjälpenutrustning finns och grundläggande HLR.",
    info: "Vi visar var hjärtstartare och första hjälpen-kit finns på samtliga plan. Du får en genomgång av vad du ska göra vid en akutsituation och hur du larmar räddningstjänsten.",
    documents: [{ name: "HLR-guide.pdf" }],
  },
  {
    id: "fire",
    title: "Brand och utrymning",
    description: "Brandrutiner, utrymningsvägar och mötesplatser vid larm.",
    info: "Lär dig identifiera brandlarm, hitta utrymningsvägar och din anvisade mötesplats utanför byggnaden. Vi går igenom brandsläckarens placering och grundläggande användning.",
    documents: [{ name: "Utrymningsplan.pdf" }],
  },
  {
    id: "substance",
    title: "Alkohol- och drogpolicy",
    description:
      "Företagets nolltoleranspolicy avseende alkohol och droger på arbetsplatsen.",
    info: "Vår policy innebär nolltolerans mot alkohol och droger under arbetstid och på arbetsplatsen. Policyn gäller även vid representation och resor i tjänsten.",
    documents: [{ name: "Alkohol- och drogpolicy.pdf" }],
  },
  {
    id: "it",
    title: "IT och system",
    description:
      "Tillgång till IT-system, inloggningsuppgifter och säkerhetsregler.",
    info: "Du får tillgång till de system som krävs för din roll. Vi går igenom lösenordspolicyn, hur du rapporterar IT-incidenter och vad som är tillåtet att installera på företagets enheter.",
    documents: [],
  },
  {
    id: "gdpr",
    title: "GDPR",
    description:
      "Genomgång av dataskyddsregler och hur vi hanterar personuppgifter.",
    info: "GDPR ställer krav på hur vi hanterar personuppgifter för kunder, leverantörer och kollegor. Vi går igenom vilka uppgifter du arbetar med, hur de lagras säkert och vad du gör om du misstänker ett dataintrång.",
    documents: [{ name: "Integritetspolicy.pdf" }],
  },
  {
    id: "questions",
    title: "Frågor och avrundning",
    description:
      "Utrymme för frågor och sammanfattning av onboarding-programmet.",
    info: "Nu är det dags att sammanfatta vad vi gått igenom och ge dig möjlighet att ställa frågor - om allt från arbetsuppgifter och förmåner till semester och kommunikationskanaler.",
    documents: [],
  },
];

export function createChecklist(completedCount = 0): ChecklistItem[] {
  const completionStamp =
    completedCount === CHECKLIST_TEMPLATE.length ? new Date().toISOString() : null;

  return CHECKLIST_TEMPLATE.map((item, index) => ({
    ...item,
    completedAt: index < completedCount ? completionStamp ?? new Date().toISOString() : null,
  }));
}

export function countCompleted(items: ChecklistItem[]): number {
  return items.filter((item) => item.completedAt !== null).length;
}

export function calcProgress(items: ChecklistItem[]): number {
  if (items.length === 0) {
    return 0;
  }

  return Math.round((countCompleted(items) / items.length) * 100);
}

export function getOnboardingStatus(
  onboarding: Pick<OnboardingRecord, "checklist" | "completedAt">
): OnboardingStatus {
  if (onboarding.completedAt) {
    return "completed";
  }

  return calcProgress(onboarding.checklist) === 0 ? "none" : "ongoing";
}

export function isCompleted(onboarding: Pick<OnboardingRecord, "completedAt">) {
  return onboarding.completedAt !== null;
}

export function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function createOnboardingRecord(
  input: CreateOnboardingInput
): OnboardingRecord {
  const now = new Date().toISOString();

  return {
    id: crypto.randomUUID(),
    firstName: input.firstName.trim(),
    lastName: input.lastName.trim(),
    position: input.position.trim(),
    manager: input.manager,
    startDate: input.startDate,
    createdAt: now,
    completedAt: null,
    checklist: createChecklist(0),
  };
}

export const INITIAL_ONBOARDINGS: OnboardingRecord[] = [
  {
    id: "mock-1",
    firstName: "Anders",
    lastName: "Svensson",
    position: "Elektriker",
    manager: "Maria Lindqvist",
    startDate: "2026-06-01",
    createdAt: "2026-05-20T08:00:00.000Z",
    completedAt: null,
    checklist: createChecklist(7),
  },
  {
    id: "mock-2",
    firstName: "Fatima",
    lastName: "Al-Hassan",
    position: "Projektledare",
    manager: "Erik Johansson",
    startDate: "2026-06-16",
    createdAt: "2026-06-05T08:00:00.000Z",
    completedAt: null,
    checklist: createChecklist(3),
  },
  {
    id: "mock-completed",
    firstName: "Johan",
    lastName: "Berg",
    position: "Systemutvecklare",
    manager: "Anna Larsson",
    startDate: "2026-05-15",
    createdAt: "2026-05-05T08:00:00.000Z",
    completedAt: "2026-05-28T13:15:00.000Z",
    checklist: createChecklist(CHECKLIST_TEMPLATE.length),
  },
];

export function sortOnboardings(onboardings: OnboardingRecord[]) {
  const ongoing = onboardings
    .filter((item) => item.completedAt === null)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  const completed = onboardings
    .filter((item) => item.completedAt !== null)
    .sort(
      (a, b) =>
        new Date(b.completedAt ?? 0).getTime() -
        new Date(a.completedAt ?? 0).getTime()
    );

  return { ongoing, completed };
}

export function getOnboardingById(
  onboardings: OnboardingRecord[],
  id: string
): OnboardingRecord | undefined {
  return onboardings.find((item) => item.id === id);
}
