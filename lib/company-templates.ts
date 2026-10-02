import {
  BUILD_CO_STEP_DEFINITIONS,
  createStepInstancesFromDefinitions,
  recomputeInstanceState,
  type OnboardingInstance,
  type OnboardingStepDefinition,
} from "@/lib/onboarding-steps";

export type TemplateVersionStatus = "draft" | "published" | "archived";

export interface CompanyTemplateVersion {
  id: string;
  templateId: string;
  companyName: string;
  name: string;
  versionLabel: string;
  status: TemplateVersionStatus;
  basedOnVersionId: string | null;
  source: "system";
  steps: OnboardingStepDefinition[];
  createdAt: string;
  publishedAt: string | null;
  archivedAt: string | null;
}

export const SYSTEM_TEMPLATE_NAME = "Systemmall — grundintroduktion";
export const DEMO_COMPANY_NAME = "Bygg & Montage AB";
const STORAGE_KEY = "onboarding-app-company-templates";

const listeners = new Set<() => void>();
let cachedVersions: CompanyTemplateVersion[] = [];
let storeReady = false;

function emitChange() {
  listeners.forEach((listener) => listener());
}

function cloneSteps(steps: OnboardingStepDefinition[]): OnboardingStepDefinition[] {
  return steps.map((step) => ({
    ...step,
    options: step.options?.map((option) => ({ ...option })),
    condition: step.condition ? { ...step.condition } : undefined,
  }));
}

function isStatus(value: unknown): value is TemplateVersionStatus {
  return value === "draft" || value === "published" || value === "archived";
}

function normalizeVersion(value: unknown): CompanyTemplateVersion | null {
  if (!value || typeof value !== "object") return null;
  const candidate = value as Partial<CompanyTemplateVersion>;
  if (
    typeof candidate.id !== "string" ||
    typeof candidate.templateId !== "string" ||
    typeof candidate.name !== "string" ||
    !Array.isArray(candidate.steps) ||
    !isStatus(candidate.status)
  ) {
    return null;
  }

  return {
    id: candidate.id,
    templateId: candidate.templateId,
    companyName:
      typeof candidate.companyName === "string"
        ? candidate.companyName
        : DEMO_COMPANY_NAME,
    name: candidate.name,
    versionLabel:
      typeof candidate.versionLabel === "string" ? candidate.versionLabel : "utkast",
    status: candidate.status,
    basedOnVersionId:
      typeof candidate.basedOnVersionId === "string"
        ? candidate.basedOnVersionId
        : null,
    source: "system",
    steps: candidate.steps.filter(
      (step): step is OnboardingStepDefinition =>
        Boolean(step && typeof step === "object" && typeof step.id === "string")
    ),
    createdAt:
      typeof candidate.createdAt === "string"
        ? candidate.createdAt
        : new Date().toISOString(),
    publishedAt:
      typeof candidate.publishedAt === "string" ? candidate.publishedAt : null,
    archivedAt:
      typeof candidate.archivedAt === "string" ? candidate.archivedAt : null,
  };
}

function loadVersions(): CompanyTemplateVersion[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed)
      ? parsed.flatMap((entry) => {
          const version = normalizeVersion(entry);
          return version ? [version] : [];
        })
      : [];
  } catch {
    return [];
  }
}

function persist(versions: CompanyTemplateVersion[]) {
  cachedVersions = versions;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(versions));
  }
  emitChange();
}

export function subscribeCompanyTemplates(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getCompanyTemplateSnapshot(): CompanyTemplateVersion[] {
  return cachedVersions;
}

export function getCompanyTemplateServerSnapshot(): CompanyTemplateVersion[] {
  return [];
}

export function getCompanyTemplatesHydrated(): boolean {
  return storeReady;
}

export function initCompanyTemplateStore() {
  if (typeof window === "undefined" || storeReady) return;
  cachedVersions = loadVersions();
  storeReady = true;
}

function nextVersionLabel(versions: CompanyTemplateVersion[]) {
  const publishedCount = versions.filter(
    (version) => version.status === "published" || version.status === "archived"
  ).length;
  return `${publishedCount + 1}.0`;
}

export function createDraftFromSystemTemplate() {
  const existingDraft = cachedVersions.find((version) => version.status === "draft");
  if (existingDraft) return existingDraft;

  const draft: CompanyTemplateVersion = {
    id: crypto.randomUUID(),
    templateId: "bygg-montage-grund",
    companyName: DEMO_COMPANY_NAME,
    name: "Grundintroduktion",
    versionLabel: "utkast",
    status: "draft",
    basedOnVersionId: null,
    source: "system",
    steps: cloneSteps(BUILD_CO_STEP_DEFINITIONS),
    createdAt: new Date().toISOString(),
    publishedAt: null,
    archivedAt: null,
  };

  persist([draft, ...cachedVersions]);
  return draft;
}

export function updateDraft(
  versionId: string,
  updater: (version: CompanyTemplateVersion) => CompanyTemplateVersion
) {
  persist(
    cachedVersions.map((version) =>
      version.id === versionId && version.status === "draft"
        ? updater(version)
        : version
    )
  );
}

export function removeDraftStep(versionId: string, stepId: string) {
  updateDraft(versionId, (version) => ({
    ...version,
    steps: version.steps
      .filter((step) => step.id !== stepId)
      .map((step, index) => ({ ...step, order: index + 1 })),
  }));
}

export function publishDraft(versionId: string) {
  const draft = cachedVersions.find(
    (version) => version.id === versionId && version.status === "draft"
  );
  if (!draft || draft.steps.length === 0) return null;

  const published: CompanyTemplateVersion = {
    ...draft,
    versionLabel: nextVersionLabel(cachedVersions),
    status: "published",
    publishedAt: new Date().toISOString(),
    steps: cloneSteps(draft.steps),
  };

  persist(
    cachedVersions.map((version) => (version.id === versionId ? published : version))
  );
  return published;
}

export function createDraftFromPublished(versionId: string) {
  if (cachedVersions.some((version) => version.status === "draft")) return null;
  const published = cachedVersions.find(
    (version) => version.id === versionId && version.status === "published"
  );
  if (!published) return null;

  const draft: CompanyTemplateVersion = {
    ...published,
    id: crypto.randomUUID(),
    versionLabel: "utkast",
    status: "draft",
    basedOnVersionId: published.id,
    steps: cloneSteps(published.steps),
    createdAt: new Date().toISOString(),
    publishedAt: null,
    archivedAt: null,
  };

  persist([draft, ...cachedVersions]);
  return draft;
}

export function archivePublished(versionId: string) {
  persist(
    cachedVersions.map((version) =>
      version.id === versionId && version.status === "published"
        ? {
            ...version,
            status: "archived",
            archivedAt: new Date().toISOString(),
          }
        : version
    )
  );
}

export function createInstanceFromPublishedVersion(
  version: CompanyTemplateVersion,
  participantName: string,
  responsibleName: string
): OnboardingInstance {
  const steps = createStepInstancesFromDefinitions(version.steps);

  return recomputeInstanceState({
    id: crypto.randomUUID(),
    title: `${version.name} — ${version.companyName}`,
    participantName,
    responsibleName,
    status: "notStarted",
    currentStepId: steps[0]?.id ?? null,
    progress: 0,
    startedAt: new Date().toISOString(),
    completedAt: null,
    steps,
    templateVersionId: version.id,
    templateLabel: `${version.name} ${version.versionLabel}`,
  });
}

export function getSystemTemplateStepCount() {
  return BUILD_CO_STEP_DEFINITIONS.length;
}
