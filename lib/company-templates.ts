import {
  BUILD_CO_STEP_DEFINITIONS,
  createStepInstancesFromDefinitions,
  recomputeInstanceState,
  type OnboardingInstance,
  type OnboardingStepDefinition,
} from "@/lib/onboarding-steps";
import {
  upsertGuidedInstance,
  type StoredGuidedInstance,
} from "@/lib/supabase/guided-repository";
import {
  listTemplateVersions,
  saveTemplateVersion,
} from "@/lib/supabase/template-repository";

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

const listeners = new Set<() => void>();
let cachedVersions: CompanyTemplateVersion[] = [];
let storeReady = false;
let storeError = "";

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

export function getCompanyTemplateError() {
  return storeError;
}

export async function initCompanyTemplateStore() {
  if (storeReady) return;
  try {
    cachedVersions = await listTemplateVersions();
    storeError = "";
  } catch (error) {
    storeError = error instanceof Error ? error.message : "Kunde inte ladda mallar.";
    cachedVersions = [];
  } finally {
    storeReady = true;
    emitChange();
  }
}

async function persist(version: CompanyTemplateVersion) {
  const saved = await saveTemplateVersion(version);
  cachedVersions = [
    saved,
    ...cachedVersions.filter((existing) => existing.id !== saved.id),
  ];
  storeError = "";
  emitChange();
  return saved;
}

function nextVersionLabel(versions: CompanyTemplateVersion[]) {
  const publishedCount = versions.filter(
    (version) => version.status === "published" || version.status === "archived"
  ).length;
  return `${publishedCount + 1}.0`;
}

export async function createDraftFromSystemTemplate() {
  const existingDraft = cachedVersions.find((version) => version.status === "draft");
  if (existingDraft) return existingDraft;

  return persist({
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
  });
}

export async function updateDraft(
  versionId: string,
  updater: (version: CompanyTemplateVersion) => CompanyTemplateVersion
) {
  const current = cachedVersions.find(
    (version) => version.id === versionId && version.status === "draft"
  );
  if (!current) return null;
  return persist(updater(current));
}

export async function removeDraftStep(versionId: string, stepId: string) {
  return updateDraft(versionId, (version) => ({
    ...version,
    steps: version.steps
      .filter((step) => step.id !== stepId)
      .map((step, index) => ({ ...step, order: index + 1 })),
  }));
}

export async function publishDraft(versionId: string) {
  const draft = cachedVersions.find(
    (version) => version.id === versionId && version.status === "draft"
  );
  if (!draft || draft.steps.length === 0) return null;

  return persist({
    ...draft,
    versionLabel: nextVersionLabel(cachedVersions),
    status: "published",
    publishedAt: new Date().toISOString(),
    steps: cloneSteps(draft.steps),
  });
}

export async function createDraftFromPublished(versionId: string) {
  if (cachedVersions.some((version) => version.status === "draft")) return null;
  const published = cachedVersions.find(
    (version) => version.id === versionId && version.status === "published"
  );
  if (!published) return null;

  return persist({
    ...published,
    id: crypto.randomUUID(),
    versionLabel: "utkast",
    status: "draft",
    basedOnVersionId: published.id,
    steps: cloneSteps(published.steps),
    createdAt: new Date().toISOString(),
    publishedAt: null,
    archivedAt: null,
  });
}

export async function archivePublished(versionId: string) {
  const published = cachedVersions.find(
    (version) => version.id === versionId && version.status === "published"
  );
  if (!published) return null;
  return persist({
    ...published,
    status: "archived",
    archivedAt: new Date().toISOString(),
  });
}

export async function createInstanceFromPublishedVersion(
  version: CompanyTemplateVersion,
  participantName: string,
  responsibleName: string
): Promise<StoredGuidedInstance> {
  const steps = createStepInstancesFromDefinitions(version.steps);
  const instance = recomputeInstanceState({
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
  }) as StoredGuidedInstance;

  instance.templateVersionId = version.id;
  instance.templateLabel = `${version.name} ${version.versionLabel}`;
  await upsertGuidedInstance(instance);
  return instance;
}

export function getSystemTemplateStepCount() {
  return BUILD_CO_STEP_DEFINITIONS.length;
}

export type { OnboardingInstance };
