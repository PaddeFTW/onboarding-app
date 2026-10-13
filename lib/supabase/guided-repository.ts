import {
  recomputeInstanceState,
  type OnboardingInstance,
  type OnboardingStepInstance,
} from "@/lib/onboarding-steps";
import { getCurrentCompanyId } from "@/lib/auth/ensure-company";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

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
  steps: OnboardingStepInstance[] | GuidedStepsPayload;
  template_version_id: string | null;
  template_label: string | null;
}

/** Optional wrapper so manager/mentor/note survive DB round-trips without a schema change. */
interface GuidedStepsPayload {
  __guidedMeta: 1;
  steps: OnboardingStepInstance[];
  managerName?: string;
  mentorName?: string;
  participantNote?: string;
}

const STORAGE_KEY = "guided-instances-v1";
const COLUMNS =
  "id,company_id,title,participant_name,responsible_name,status,current_step_id,progress,started_at,completed_at,steps,template_version_id,template_label";

function normalizeInstance(instance: StoredGuidedInstance): StoredGuidedInstance {
  const next = recomputeInstanceState(instance) as StoredGuidedInstance;
  next.templateVersionId = instance.templateVersionId ?? null;
  next.templateLabel = instance.templateLabel ?? null;
  next.managerName = instance.managerName;
  next.mentorName = instance.mentorName;
  next.participantNote = instance.participantNote;
  return next;
}

function unpackSteps(raw: GuidedRow["steps"] | unknown): {
  steps: OnboardingStepInstance[];
  managerName?: string;
  mentorName?: string;
  participantNote?: string;
} {
  if (Array.isArray(raw)) {
    return { steps: raw };
  }
  if (
    raw &&
    typeof raw === "object" &&
    (raw as GuidedStepsPayload).__guidedMeta === 1 &&
    Array.isArray((raw as GuidedStepsPayload).steps)
  ) {
    const payload = raw as GuidedStepsPayload;
    return {
      steps: payload.steps,
      managerName: payload.managerName,
      mentorName: payload.mentorName,
      participantNote: payload.participantNote,
    };
  }
  return { steps: [] };
}

function packSteps(instance: StoredGuidedInstance): OnboardingStepInstance[] | GuidedStepsPayload {
  if (instance.managerName || instance.mentorName || instance.participantNote) {
    return {
      __guidedMeta: 1,
      steps: instance.steps,
      managerName: instance.managerName,
      mentorName: instance.mentorName,
      participantNote: instance.participantNote,
    };
  }
  return instance.steps;
}

function mapRow(row: GuidedRow): StoredGuidedInstance {
  const unpacked = unpackSteps(row.steps);
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
    steps: unpacked.steps,
  }) as StoredGuidedInstance;
  instance.templateVersionId = row.template_version_id;
  instance.templateLabel = row.template_label;
  instance.managerName = unpacked.managerName;
  instance.mentorName = unpacked.mentorName;
  instance.participantNote = unpacked.participantNote;
  return instance;
}

function readLocalInstances(): StoredGuidedInstance[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as StoredGuidedInstance[];
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((item) => item?.id)
      .map((item) => normalizeInstance(item));
  } catch {
    return [];
  }
}

/** Fallback only — never clears the key; used when Supabase is unavailable. */
function writeLocalInstances(instances: StoredGuidedInstance[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(instances));
  } catch {
    /* ignore quota errors */
  }
}

async function resolveCompanyId(): Promise<string | null> {
  try {
    const supabase = getSupabaseBrowserClient();
    return await getCurrentCompanyId(supabase);
  } catch {
    return null;
  }
}

function mergeById(
  localRows: StoredGuidedInstance[],
  remoteRows: StoredGuidedInstance[]
): StoredGuidedInstance[] {
  const byId = new Map<string, StoredGuidedInstance>();
  for (const local of localRows) {
    byId.set(local.id, local);
  }
  for (const remote of remoteRows) {
    const previous = byId.get(remote.id);
    if (previous) {
      remote.managerName = remote.managerName ?? previous.managerName;
      remote.mentorName = remote.mentorName ?? previous.mentorName;
      remote.participantNote = remote.participantNote ?? previous.participantNote;
    }
    byId.set(remote.id, remote);
  }
  return [...byId.values()].sort((a, b) => b.startedAt.localeCompare(a.startedAt));
}

export async function listGuidedInstances() {
  const localRows = readLocalInstances();
  const companyId = await resolveCompanyId();
  if (!companyId) {
    return localRows.sort((a, b) => b.startedAt.localeCompare(a.startedAt));
  }

  try {
    const supabase = getSupabaseBrowserClient();
    const { data, error } = await supabase
      .from("guided_instances")
      .select(COLUMNS)
      .eq("company_id", companyId)
      .order("started_at", { ascending: false });

    if (error) {
      return localRows.sort((a, b) => b.startedAt.localeCompare(a.startedAt));
    }

    const remoteRows = ((data ?? []) as GuidedRow[]).map(mapRow);
    return mergeById(localRows, remoteRows);
  } catch {
    return localRows.sort((a, b) => b.startedAt.localeCompare(a.startedAt));
  }
}

export async function upsertGuidedInstance(instance: StoredGuidedInstance) {
  const next = normalizeInstance(instance);
  const companyId = await resolveCompanyId();

  if (companyId) {
    try {
      const supabase = getSupabaseBrowserClient();
      const { error } = await supabase.from("guided_instances").upsert(
        {
          id: next.id,
          company_id: companyId,
          title: next.title,
          participant_name: next.participantName,
          responsible_name: next.responsibleName,
          status: next.status,
          current_step_id: next.currentStepId,
          progress: next.progress,
          started_at: next.startedAt,
          completed_at: next.completedAt,
          steps: packSteps(next),
          template_version_id: next.templateVersionId ?? null,
          template_label: next.templateLabel ?? null,
        },
        { onConflict: "id" }
      );

      if (!error) {
        return next;
      }
    } catch {
      /* fall through to localStorage */
    }
  }

  const locals = readLocalInstances();
  const byId = new Map(locals.map((row) => [row.id, row]));
  byId.set(next.id, next);
  writeLocalInstances([...byId.values()]);
  return next;
}
