import {
  followUpDaysForSize,
  isSmallCompany,
  sizedExample,
} from "@/lib/company-facts";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n";
import { exampleFor, placeholderFor } from "@/lib/introduction-questions";
import { industries, industryById } from "@/lib/industries";
import { termByName } from "@/lib/terms";

export const EMPLOYEE_COUNT_OPTIONS = ["1–5", "6–20", "21–50", "51–250", "250+"] as const;
export type EmployeeCount = (typeof EMPLOYEE_COUNT_OPTIONS)[number];

export const SAFETY_REP_OPTIONS = [
  "Skyddsombud saknas",
  "Chefen är skyddsombud",
  "Skyddsombud är utsett",
] as const;

export const POLICY_OPTIONS = [
  "Inga policyer än",
  "Arbetsmiljö och kvalitet",
  "Arbetsmiljö, miljö och kvalitet",
] as const;

export const ALARM_OPTIONS = ["Vi har inget larm", "Vi har larm"] as const;

export const FOLLOW_UP_OPTIONS = [
  { value: "7", label: "Efter 7 dagar" },
  { value: "14", label: "Efter 14 dagar" },
  { value: "30", label: "Efter 30 dagar" },
] as const;

export type CompanySetupStepId =
  | "company_name"
  | "org_number"
  | "industry"
  | "employee_count"
  | "positions"
  | "employees"
  | "manager"
  | "mentor"
  | "work_hours"
  | "sick_leave"
  | "safety_rep"
  | "policies"
  | "alarm"
  | "follow_up"
  | "documents";

export interface CompanySetupStep {
  id: CompanySetupStepId;
  title: string;
  description: string;
  helpText: string;
  /** What happens on this page. */
  happens: string;
  /** What the user should choose or fill in. */
  choose: string;
  placeholder?: string;
}

export const COMPANY_SETUP_STEPS: CompanySetupStep[] = [
  {
    id: "company_name",
    title: "Vad heter företaget?",
    description: "Företag",
    helpText: "Obligatoriskt. Namnet syns i grundinställningen och i introduktionen.",
    happens: "Vi sparar företagsnamnet.",
    choose: "Skriv det namn ni använder utåt.",
    placeholder: "Till exempel Bygg & Montage AB",
  },
  {
    id: "org_number",
    title: "Vad är organisationsnumret?",
    description: "Organisationsnummer",
    helpText: "Valfritt. Du kan hoppa över.",
    happens: "Numret sparas om du fyller i det.",
    choose: "Skriv organisationsnummer, eller gå vidare.",
    placeholder: "XXXXXX-XXXX",
  },
  {
    id: "industry",
    title: "Vilken bransch jobbar ni i?",
    description: "Bransch",
    helpText: "Allmän verksamhet är förvald. Branschen styr exempel och befattningar.",
    happens: "Vi sparar branschen och skapar förslag på befattningar.",
    choose: "Välj den verksamhet som passar bäst.",
  },
  {
    id: "employee_count",
    title: "Hur många är ni ungefär?",
    description: "Storlek",
    helpText: "Storleken styr korta exempel och om samma person kan vara chef och mentor.",
    happens: "Storleken styr hur exemplen skrivs.",
    choose: "Välj ungefär hur många ni är.",
  },
  {
    id: "positions",
    title: "Vilka befattningar ska finnas?",
    description: "Befattningar",
    helpText: "Minst en befattning behövs. Du kan lägga till egna namn.",
    happens: "Befattningarna sparas i registret.",
    choose: "Bocka dem ni behöver, eller lägg till en ny.",
    placeholder: "Till exempel Arbetsledare",
  },
  {
    id: "employees",
    title: "Vilka medarbetare ska finnas?",
    description: "Medarbetare",
    helpText: "Minst en medarbetare behövs för att starta en introduktion.",
    happens: "Namnen sparas så de kan väljas i introduktionen.",
    choose: "Lägg till namn och befattning. Minst en räcker.",
    placeholder: "För- och efternamn",
  },
  {
    id: "manager",
    title: "Vem kan vara ansvarig chef?",
    description: "Ansvarig chef",
    helpText: "Valfritt nu. Markera dem som får vara ansvarig chef.",
    happens: "Chefen syns i introduktionen.",
    choose: "Markera minst en, eller gå vidare utan.",
  },
  {
    id: "mentor",
    title: "Vem kan vara mentor?",
    description: "Mentor",
    helpText: "Valfritt. Mentorn visar praktiken. Kan vara samma person som chefen.",
    happens: "Mentorn syns i introduktionen.",
    choose: "Markera dem som kan vara mentor, eller gå vidare.",
  },
  {
    id: "work_hours",
    title: "Vilka arbetstider gäller?",
    description: "Arbetstider",
    helpText: "Valfritt. Skriv era tider. Inte belopp eller sjuklön.",
    happens: "Tiderna återanvänds i introduktionen.",
    choose: "Skriv hur dagen ser ut hos er, eller gå vidare.",
    placeholder: "Till exempel 08.00–16.30",
  },
  {
    id: "sick_leave",
    title: "Hur anmäler man sjukdom?",
    description: "Sjukanmälan",
    helpText: "Valfritt. Vem man ringer, och när. Inga belopp eller sjuklön.",
    happens: "Kontakten återanvänds i introduktionen.",
    choose: "Skriv vem som tar emot sjukanmälan, eller gå vidare.",
    placeholder: "Till exempel till chefen före klockan 8",
  },
  {
    id: "safety_rep",
    title: "Hur är skyddsombudet ordnat?",
    description: "Skyddsombud",
    helpText: "Valfritt. Välj det som stämmer idag.",
    happens: "Svaret återanvänds i arbetsmiljöfrågan.",
    choose: "Välj ett alternativ, eller gå vidare.",
  },
  {
    id: "policies",
    title: "Vilka policyer har ni?",
    description: "Policyer",
    helpText: "Valfritt. Välj nivån som passar. Ni kan komplettera senare.",
    happens: "Nivån syns när policyerna gås igenom.",
    choose: "Välj ett alternativ, eller gå vidare.",
  },
  {
    id: "alarm",
    title: "Har lokalen larm?",
    description: "Larm",
    helpText: "Valfritt. Svara att larm saknas om ni inte har något.",
    happens: "Svaret kan förifyllas i introduktionen.",
    choose: "Välj om ni har larm, eller gå vidare.",
  },
  {
    id: "follow_up",
    title: "När följer ni upp introduktionen?",
    description: "Uppföljning",
    helpText: "Valfritt. Boka tiden redan när introduktionen startar.",
    happens: "Tiden syns när uppföljningen bokas.",
    choose: "Välj efter hur många dagar, eller gå vidare.",
  },
  {
    id: "documents",
    title: "Vill du ladda upp ett dokument?",
    description: "Dokument",
    helpText: "Valfritt. Filen sparas som bilaga. Stoppar inte flödet.",
    happens: "Uppladdningen stoppar inte flödet.",
    choose: "Välj Nej, fortsätt eller Ja, ladda upp.",
  },
];

export type DraftPosition = { key: string; name: string; role: string; selected: boolean };
export type DraftEmployee = {
  key: string;
  name: string;
  positionKey: string;
  can_manage: boolean;
  can_mentor: boolean;
};

export type CompanySetupDraft = {
  companyName: string;
  orgNumber: string;
  startDate: string;
  startPlace: string;
  firstDay: string;
  accounts: string;
  equipment: string;
  industry: string;
  employeeCount: EmployeeCount;
  positions: DraftPosition[];
  employees: DraftEmployee[];
  work_hours: string;
  sick_contact: string;
  safety_rep: string;
  policies: string;
  has_alarm: string;
  follow_up_days: string;
};

export function emptyCompanySetupDraft(): CompanySetupDraft {
  return {
    companyName: "",
    orgNumber: "",
    startDate: "",
    startPlace: "",
    firstDay: "",
    accounts: "",
    equipment: "",
    industry: "general",
    employeeCount: "1–5",
    positions: [],
    employees: [],
    work_hours: "",
    sick_contact: "",
    safety_rep: "",
    policies: "",
    has_alarm: "",
    follow_up_days: "",
  };
}

export function industryOptions() {
  return industries.map((item) => ({ id: item.id, name: item.name }));
}

function sizeRank(count: string) {
  return EMPLOYEE_COUNT_OPTIONS.indexOf(count as EmployeeCount);
}

/** All role suggestions for an industry from lib/industries.ts. */
export function industryPositionSuggestions(
  industry: string
): Array<{ name: string; role: string }> {
  const source = industryById(industry)?.positions ?? industryById("general")?.positions ?? [];
  return source.map(([name, role]) => ({ name, role }));
}

/** Draft checkboxes for the positions step; seeded into `positions` on save. */
export function suggestedPositions(industry: string, _employeeCount?: string): DraftPosition[] {
  return industryPositionSuggestions(industry).map(({ name, role }) => ({
    key: `suggested:${name}`,
    name,
    role,
    selected: true,
  }));
}

export function draftPositionsFromRows(
  rows: Array<{ id: string; name: string; role: string }>
): DraftPosition[] {
  return rows.map((row) => ({
    key: `db:${row.id}`,
    name: row.name,
    role: row.role,
    selected: true,
  }));
}

function splitHoursExample(example: string) {
  const sickMatch = example.match(/^(.*?)\.\s*((?:Sjuk|Vab|Ohälsa|Tid).+)$/i);
  if (sickMatch) {
    return { workHours: sickMatch[1].trim(), sickContact: sickMatch[2].trim() };
  }
  const parts = example.split(/\.\s+/);
  if (parts.length >= 2) {
    return { workHours: parts[0].trim(), sickContact: parts.slice(1).join(". ").trim() };
  }
  return { workHours: example.trim(), sickContact: "" };
}

export function suggestWorkHours(industry: string, employeeCount: string) {
  const example = sizedExample(exampleFor("hours", industry || "general"), employeeCount);
  return splitHoursExample(example).workHours;
}

export function suggestSickContact(industry: string, employeeCount: string) {
  const example = sizedExample(exampleFor("hours", industry || "general"), employeeCount);
  const { sickContact } = splitHoursExample(example);
  if (sickContact) return sickContact;
  if (employeeCount === "1–5") return "Sjuk anmäls till chefen före start.";
  return "Sjuk anmäls till närmaste chef före start.";
}

export function suggestSafetyRep(employeeCount: string) {
  const rank = sizeRank(employeeCount);
  if (rank <= 0) return "Chefen är skyddsombud";
  if (rank <= 2) return "Skyddsombud är utsett";
  return "Skyddsombud är utsett";
}

export function suggestPolicies(employeeCount: string) {
  const rank = sizeRank(employeeCount);
  if (rank <= 0) return "Arbetsmiljö och kvalitet";
  if (rank <= 2) return "Arbetsmiljö och kvalitet";
  return "Arbetsmiljö, miljö och kvalitet";
}

export function suggestAlarm(industry: string) {
  const example = exampleFor("alarm", industry || "general").toLowerCase();
  if (example.includes("inget larm") || example.includes("ofta inget")) return "Vi har inget larm";
  return "Vi har larm";
}

export function suggestFollowUpDays(employeeCount: string) {
  return followUpDaysForSize(employeeCount);
}

export function applyIndustrySuggestions(draft: CompanySetupDraft): CompanySetupDraft {
  if (!draft.industry) return draft;
  const positions = suggestedPositions(draft.industry, draft.employeeCount);
  return {
    ...draft,
    positions,
    work_hours: draft.work_hours || suggestWorkHours(draft.industry, draft.employeeCount),
    sick_contact: draft.sick_contact || suggestSickContact(draft.industry, draft.employeeCount),
    safety_rep: draft.safety_rep || suggestSafetyRep(draft.employeeCount),
    policies: draft.policies || suggestPolicies(draft.employeeCount),
    has_alarm: draft.has_alarm || suggestAlarm(draft.industry),
    follow_up_days: draft.follow_up_days || suggestFollowUpDays(draft.employeeCount),
  };
}

export function refreshSizeSuggestions(draft: CompanySetupDraft): CompanySetupDraft {
  if (!draft.industry) return draft;
  const custom = draft.positions.filter((item) => item.key.startsWith("custom:"));
  const suggested = suggestedPositions(draft.industry, draft.employeeCount);
  const keptCustom = custom.filter(
    (item) => !suggested.some((suggestion) => suggestion.name.toLowerCase() === item.name.toLowerCase())
  );
  return {
    ...draft,
    positions: [...suggested, ...keptCustom],
    work_hours: suggestWorkHours(draft.industry, draft.employeeCount),
    sick_contact: suggestSickContact(draft.industry, draft.employeeCount),
    safety_rep: suggestSafetyRep(draft.employeeCount),
    policies: suggestPolicies(draft.employeeCount),
    has_alarm: suggestAlarm(draft.industry),
    follow_up_days: suggestFollowUpDays(draft.employeeCount),
  };
}

export function selectedPositions(draft: CompanySetupDraft) {
  return draft.positions.filter((item) => item.selected && item.name.trim());
}

/** Company name, one position and one employee block the flow. Bransch är förvald. */
export function isStepRequired(stepId: CompanySetupStepId) {
  return stepId === "company_name" || stepId === "positions" || stepId === "employees";
}

/** Steps shown for this company size. Small firms skip a separate mentor page. */
export function visibleSetupSteps(employeeCount: string): CompanySetupStep[] {
  if (isSmallCompany(employeeCount)) {
    return COMPANY_SETUP_STEPS.filter((step) => step.id !== "mentor");
  }
  return COMPANY_SETUP_STEPS;
}

/** Ready to leave the company guide: name, industry, one position, one employee. */
export function isCompanyGuideReady(draft: CompanySetupDraft) {
  const hasPosition =
    draft.positions.some((item) => item.key.startsWith("db:") && item.name.trim()) ||
    selectedPositions(draft).length > 0;
  const hasEmployee = draft.employees.some(
    (item) => item.name.trim() && item.positionKey.startsWith("db:")
  );
  return Boolean(draft.companyName.trim() && draft.industry) && hasPosition && hasEmployee;
}

export function guidePlaceholderFor(
  stepId: CompanySetupStepId,
  industry: string
): string {
  const industryKey = industry || "general";
  if (stepId === "company_name") return "Till exempel Bygg & Montage AB";
  if (stepId === "org_number") return "XXXXXX-XXXX";
  if (stepId === "work_hours") return placeholderFor("hours", industryKey);
  if (stepId === "sick_leave") return "Vem som tar emot sjukanmälan, och när";
  if (stepId === "positions") return "Till exempel Arbetsledare";
  if (stepId === "employees") return termByName("Medarbetare")?.template ?? "För- och efternamn";
  return "";
}

export function guideExampleFor(
  stepId: CompanySetupStepId,
  industry: string,
  employeeCount: string,
  locale: Locale = DEFAULT_LOCALE
): string {
  const industryKey = industry || "general";
  if (stepId === "company_name") {
    return industryById(industryKey)?.name
      ? `${industryById(industryKey)!.name} AB`
      : "Bygg & Montage AB";
  }
  if (stepId === "org_number") {
    return "559000-1234";
  }
  if (stepId === "industry") {
    return termByName("Bransch")?.template ?? "Bransch: Allmän verksamhet.";
  }
  if (stepId === "positions") {
    const first = industryById(industryKey)?.positions[0]?.[0] ?? "Administratör";
    return `Befattning: ${first}.`;
  }
  if (stepId === "employees") {
    return termByName("Medarbetare")?.template ?? "Medarbetare: Erik Svensson, montör.";
  }
  if (stepId === "manager") {
    return termByName("Ansvarig chef")?.template ?? "Ansvarig chef är Anna Andersson.";
  }
  if (stepId === "mentor") {
    return termByName("Mentor")?.template ?? "Mentor är Erik Svensson.";
  }
  if (stepId === "work_hours" || stepId === "sick_leave") {
    return sizedExample(exampleFor("hours", industryKey, locale), employeeCount);
  }
  if (stepId === "safety_rep") {
    return sizedExample(exampleFor("safety", industryKey, locale), employeeCount);
  }
  if (stepId === "policies") {
    return sizedExample(exampleFor("policy", industryKey, locale), employeeCount);
  }
  if (stepId === "alarm") {
    return sizedExample(exampleFor("alarm", industryKey, locale), employeeCount);
  }
  if (stepId === "follow_up") {
    const days = followUpDaysForSize(employeeCount);
    return sizedExample(
      exampleFor("followup", industryKey, locale) || `Uppföljning med chefen om ${days} dagar.`,
      employeeCount
    );
  }
  if (stepId === "documents") {
    return "Ladda upp en policy eller hoppa över. Stoppar inte flödet.";
  }
  if (stepId === "employee_count") {
    if (employeeCount === "1–5") {
      return "1–5: Första dagen går hen med mig. En sida. Jag skriver under.";
    }
    if (employeeCount === "6–20") {
      return "6–20: Namngiven fadder. En checklista. Namn och datum.";
    }
    if (employeeCount === "21–50") {
      return "21–50: Olika personer tar olika delar. Uppföljning bokad.";
    }
    return "51 eller fler: Introduktionen är planerad. Kvittens sparas.";
  }
  return "";
}

/** True when an optional step still has no answer (button may say Hoppa över). */
export function isOptionalStepEmpty(stepId: CompanySetupStepId, draft: CompanySetupDraft) {
  switch (stepId) {
    case "org_number":
      return !draft.orgNumber.trim();
    case "industry":
      return !draft.industry;
    case "employee_count":
      return !draft.employeeCount;
    case "manager":
      return !draft.employees.some((item) => item.can_manage);
    case "mentor":
      return !draft.employees.some((item) => item.can_mentor);
    case "work_hours":
      return !draft.work_hours.trim();
    case "sick_leave":
      return !draft.sick_contact.trim();
    case "safety_rep":
      return !draft.safety_rep.trim();
    case "policies":
      return !draft.policies.trim();
    case "alarm":
      return !draft.has_alarm.trim();
    case "follow_up":
      return !draft.follow_up_days.trim();
    case "documents":
      return true;
    default:
      return false;
  }
}

export function isStepComplete(stepId: CompanySetupStepId, draft: CompanySetupDraft) {
  switch (stepId) {
    case "company_name":
      return Boolean(draft.companyName.trim());
    case "industry":
      return Boolean(draft.industry);
    case "employee_count":
      return Boolean(draft.employeeCount);
    case "positions":
      return (
        draft.positions.some((item) => item.key.startsWith("db:") && item.name.trim()) ||
        selectedPositions(draft).length > 0
      );
    case "employees":
      return draft.employees.some(
        (item) => item.name.trim() && item.positionKey.startsWith("db:")
      );
    case "org_number":
    case "manager":
    case "mentor":
    case "work_hours":
    case "sick_leave":
    case "safety_rep":
    case "policies":
    case "alarm":
    case "follow_up":
    case "documents":
      // Valfria steg: Nästa får alltid gå vidare.
      return true;
    default:
      return false;
  }
}

/** Mark managers as mentors too when the firm is small. */
export function withSmallCompanyResponsibles(draft: CompanySetupDraft): CompanySetupDraft {
  if (!isSmallCompany(draft.employeeCount)) return draft;
  return {
    ...draft,
    employees: draft.employees.map((item) =>
      item.can_manage ? { ...item, can_mentor: true } : item
    ),
  };
}

export function newPositionKey() {
  return `custom:${crypto.randomUUID()}`;
}

export function newEmployeeKey() {
  return `employee:${crypto.randomUUID()}`;
}
