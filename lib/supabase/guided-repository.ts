import {
  recomputeInstanceState,
  type OnboardingInstance,
  type OnboardingStepInstance,
} from "@/lib/onboarding-steps";

export interface StoredGuidedInstance extends OnboardingInstance {
  templateVersionId?: string | null;
  templateLabel?: string | null;
}

interface GuidedRow {
  id: string;
  company_id: string | null;
  title: string;
  participant_name: string;
  responsible_name: string;
  status: OnboardingInstance["status"];
  current_step_id: string | null;
  progress: number;
  started_at: string;
  completed_at: string | null;
  steps: OnboardingStepInstance[];
  template_version_id: string | null;
  template_label: string | null;
}

const STORAGE_KEY = "guided-instances-v1";
const guidedInstances = new Map<string, StoredGuidedInstance>();
let hydratedFromStorage = false;

function mapRow(row: GuidedRow): StoredGuidedInstance {
  const instance = recomputeInstanceState({
    id: row.id,
    title: row.title,
    participantName: row.participant_name,
    responsibleName: row.responsible_name,
    status: row.status,
    currentStepId: row.current_step_id,
    progress: row.progress,
    startedAt: row.started_at,
    completedAt: row.completed_at,
    steps: Array.isArray(row.steps) ? row.steps : [],
  }) as StoredGuidedInstance;
  instance.templateVersionId = row.template_version_id;
  instance.templateLabel = row.template_label;
  return instance;
}

function hydrateFromStorage() {
  if (hydratedFromStorage || typeof window === "undefined") return;
  hydratedFromStorage = true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw) as StoredGuidedInstance[];
    if (!Array.isArray(parsed)) return;
    for (const item of parsed) {
      if (!item?.id) continue;
      const next = recomputeInstanceState(item) as StoredGuidedInstance;
      next.templateVersionId = item.templateVersionId ?? null;
      next.templateLabel = item.templateLabel ?? null;
      next.managerName = item.managerName;
      next.mentorName = item.mentorName;
      next.participantNote = item.participantNote;
      guidedInstances.set(next.id, next);
    }
  } catch {
    /* ignore corrupt storage */
  }
}

function persistToStorage() {
  if (typeof window === "undefined") return;
  try {
    const rows = [...guidedInstances.values()];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
  } catch {
    /* ignore quota errors */
  }
}

export async function listGuidedInstances() {
  hydrateFromStorage();
  return [...guidedInstances.values()]
    .sort((a, b) => b.startedAt.localeCompare(a.startedAt))
    .map((instance) => {
      const next = recomputeInstanceState(instance) as StoredGuidedInstance;
      next.templateVersionId = instance.templateVersionId ?? null;
      next.templateLabel = instance.templateLabel ?? null;
      next.managerName = instance.managerName;
      next.mentorName = instance.mentorName;
      next.participantNote = instance.participantNote;
      return next;
    });
}

export async function upsertGuidedInstance(instance: StoredGuidedInstance) {
  hydrateFromStorage();
  const next = recomputeInstanceState(instance) as StoredGuidedInstance;
  next.templateVersionId = instance.templateVersionId ?? null;
  next.templateLabel = instance.templateLabel ?? null;
  next.managerName = instance.managerName;
  next.mentorName = instance.mentorName;
  next.participantNote = instance.participantNote;
  guidedInstances.set(next.id, next);
  persistToStorage();
  return next;
}
