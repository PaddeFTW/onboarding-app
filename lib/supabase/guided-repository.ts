import type { PostgrestError } from "@supabase/supabase-js";

import { getCurrentCompanyId } from "@/lib/auth/ensure-company";
import { recomputeInstanceState, type OnboardingInstance, type OnboardingStepInstance } from "@/lib/onboarding-steps";
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
  steps: OnboardingStepInstance[];
  template_version_id: string | null;
  template_label: string | null;
}

function toAppError(error: PostgrestError | Error, fallback: string) {
  const message = error.message || fallback;
  if (message.includes("company_id") || message.includes("schema cache")) {
    return new Error("Företagsisoleringen saknas i databasen.");
  }
  return new Error(message);
}

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
  const supabase = getSupabaseBrowserClient();
  const { data, error } = await supabase.from("guided_instances").select("id,company_id,title,participant_name,responsible_name,status,current_step_id,progress,started_at,completed_at,steps,template_version_id,template_label").order("started_at", { ascending: false });
  if (error) throw toAppError(error, "Kunde inte ladda guidningar.");
  return ((data ?? []) as GuidedRow[]).map(mapRow);
}

export async function upsertGuidedInstance(instance: StoredGuidedInstance) {
  const supabase = getSupabaseBrowserClient();
  const companyId = await getCurrentCompanyId(supabase);
  const { error } = await supabase.from("guided_instances").upsert({
    id: instance.id,
    company_id: companyId,
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
  }, { onConflict: "id" });
  if (error) throw toAppError(error, "Kunde inte spara guidningen.");
  return instance;
}
