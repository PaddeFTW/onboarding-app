import { recomputeInstanceState, type OnboardingInstance, type OnboardingStepInstance } from "@/lib/onboarding-steps";

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

const guidedInstances = new Map<string, StoredGuidedInstance>();


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

export async function listGuidedInstances() {
  return [...guidedInstances.values()]
    .sort((a, b) => b.startedAt.localeCompare(a.startedAt))
    .map((instance) => mapRow({
      id: instance.id,
      company_id: null,
      title: instance.title,
      participant_name: instance.participantName,
      responsible_name: instance.responsibleName,
      status: instance.status,
      current_step_id: instance.currentStepId,
      progress: instance.progress,
      started_at: instance.startedAt,
      completed_at: instance.completedAt,
      steps: instance.steps,
      template_version_id: instance.templateVersionId ?? null,
      template_label: instance.templateLabel ?? null,
    }));
}

export async function upsertGuidedInstance(instance: StoredGuidedInstance) {
  guidedInstances.set(instance.id, instance);
  return instance;
}
