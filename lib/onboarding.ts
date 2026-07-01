export interface ChecklistDocument {
  name: string;
  sourcePath?: string;
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

function chapterDocument(name: string, sourcePath: string): ChecklistDocument {
  return { name, sourcePath };
}

export const CHECKLIST_TEMPLATE: ChecklistTemplateItem[] = [
  {
    id: "introduction",
    title: "Introduktion",
    description:
      "Planering, ansvar, förberedelser och kontroll inför varje ny introduktion.",
    info: "Detta moment bygger på kapitel 1 i introduktionsunderlaget och säkerställer att introduktionen är förberedd, att ansvariga är utsedda och att rätt material finns klart innan första arbetsdagen.",
    documents: [
      chapterDocument("Introduktion", "docs/onboarding/01-introduktion.md"),
    ],
  },
  {
    id: "company-information",
    title: "Företagsinformation",
    description:
      "Historik, affärsidé, organisation och den nyanställdes roll i företaget.",
    info: "Detta moment utgår från kapitel 2 och används för att förankra företagets bakgrund, affärsidé, organisation och ansvarsfördelning hos den nyanställde.",
    documents: [
      chapterDocument(
        "Företagsinformation",
        "docs/onboarding/02-foretagsinformation.md"
      ),
    ],
  },
  {
    id: "administration",
    title: "Arbetstid och administration",
    description:
      "Arbetstider, lön, ledigheter, tidrapportering och viktiga administrativa rutiner.",
    info: "Detta moment bygger på kapitel 3 och samlar den information som den nyanställde behöver om arbetstid, rapportering, ersättningar, sjukfrånvaro och familjerelaterade ledigheter.",
    documents: [
      chapterDocument(
        "Arbetstid och administration",
        "docs/onboarding/03-administration.md"
      ),
    ],
  },
  {
    id: "wellness",
    title: "Friskvård",
    description:
      "Företagshälsovård, vårdcentralsavtal och företagets friskvårdsförmåner.",
    info: "Detta moment utgår från kapitel 4 och förklarar företagshälsovårdens roll, medicinska kontroller i arbetslivet och vilka friskvårdsförmåner som erbjuds.",
    documents: [
      chapterDocument("Friskvård", "docs/onboarding/04-friskvard.md"),
    ],
  },
  {
    id: "work-environment",
    title: "Arbetsmiljö",
    description:
      "Skyddsorganisation, krisberedskap, akuta rutiner och ordnings- och skyddsregler.",
    info: "Detta moment bygger på kapitel 5 och samlar arbetsmiljöorganisation, nödnummer, agerande vid olyckor och brand samt de säkerhetsregler som gäller på arbetsplatsen.",
    documents: [
      chapterDocument("Arbetsmiljö", "docs/onboarding/05-arbetsmiljo.md"),
    ],
  },
  {
    id: "improvement-work",
    title: "Förbättringsverksamhet",
    description:
      "Förbättringsförslag, utbildningsutvärdering och avvikelsehantering.",
    info: "Detta moment utgår från kapitel 6 och beskriver hur medarbetare deltar i förbättringsarbete, lämnar förslag och rapporterar avvikelser.",
    documents: [
      chapterDocument(
        "Förbättringsverksamhet",
        "docs/onboarding/06-forbattringsarbete.md"
      ),
    ],
  },
  {
    id: "union-questions",
    title: "Fackliga frågor",
    description:
      "Facklig kontaktväg, avtal och information om fackets roll i verksamheten.",
    info: "Detta moment bygger på kapitel 7 och används för att visa vem som representerar facket eller vart den nyanställde ska hänvisas om lokalt avtal saknas.",
    documents: [
      chapterDocument(
        "Fackliga frågor",
        "docs/onboarding/07-fackliga-fragor.md"
      ),
    ],
  },
  {
    id: "house-rules",
    title: "Ordnings- och skötselregler",
    description:
      "Källsortering, städning, ordning och praktiska regler i arbetsmiljön.",
    info: "Detta moment bygger på kapitel 8 och omfattar de vardagliga regler som skapar ordning, trivsel och tydlighet i produktion, kontor och gemensamma utrymmen.",
    documents: [
      chapterDocument(
        "Ordnings- och skötselregler",
        "docs/onboarding/08-ordningsregler.md"
      ),
    ],
  },
  {
    id: "policies",
    title: "Policy",
    description:
      "Arbetsmiljöpolicy samt alkohol- och drogpolicy som gäller i företaget.",
    info: "Detta moment utgår från kapitel 9 och används för att göra företagets policys kända, förstådda och praktiskt förankrade hos den nyanställde.",
    documents: [
      chapterDocument("Policy", "docs/onboarding/09-policy.md"),
    ],
  },
  {
    id: "receipts",
    title: "Kvittenser",
    description:
      "Nycklar, mobil, verktyg, arbetskläder och personlig skyddsutrustning.",
    info: "Detta moment bygger på kapitel 10 och samlar de kvittenser som behövs när företagets egendom lämnas ut till den nyanställde.",
    documents: [
      chapterDocument("Kvittenser", "docs/onboarding/10-kvittenser.md"),
    ],
  },
  {
    id: "alarms",
    title: "Larm",
    description:
      "Öppning, stängning, inbrottslarm och rutiner vid falskt eller utlöst larm.",
    info: "Detta moment utgår från kapitel 11 och tydliggör hur lokaler larmas på och av, vad som gäller vid falsklarm och hur personalen ska agera om larmet går.",
    documents: [
      chapterDocument("Larm", "docs/onboarding/11-larm.md"),
    ],
  },
  {
    id: "follow-up",
    title: "Bekräftelse och uppföljning",
    description:
      "Bekräftelse på genomförd introduktion samt stöd för uppföljningssamtal.",
    info: "Detta moment bygger på kapitel 12 och används för att bekräfta vilka områden som har gåtts igenom samt för att följa upp trivsel, arbetsmiljö och introduktionsupplevelse.",
    documents: [
      chapterDocument(
        "Bekräftelse och uppföljning",
        "docs/onboarding/12-uppfoljning.md"
      ),
    ],
  },
];

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
