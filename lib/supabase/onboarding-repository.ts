import type { PostgrestError } from "@supabase/supabase-js";

import {
  CHECKLIST_TEMPLATE,
  calcProgress,
  type ChecklistDocument,
  type ChecklistItemDetailData,
  type ChecklistItem,
  type CreateOnboardingInput,
  type OnboardingRecord,
} from "@/lib/onboarding";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

interface OnboardingRow {
  id: string;
  first_name: string;
  last_name: string;
  position: string;
  manager: string;
  start_date: string;
  created_at: string;
  completed_at: string | null;
}

interface ChecklistItemRow {
  id: string;
  onboarding_id: string;
  template_key: string;
  sort_order: number;
  title: string;
  description: string;
  info: string;
  documents: ChecklistDocument[] | null;
  comment: string | null;
  detail_data: ChecklistItemDetailData | null;
  completed_at: string | null;
}

function toAppError(error: PostgrestError | Error, fallback: string) {
  return new Error(error.message || fallback);
}

function mapChecklistItem(row: ChecklistItemRow): ChecklistItem {
  return {
    id: row.id,
    templateKey: row.template_key,
    title: row.title,
    description: row.description,
    info: row.info,
    documents: Array.isArray(row.documents) ? row.documents : [],
    comment: row.comment ?? "",
    detailData:
      row.detail_data && typeof row.detail_data === "object" ? row.detail_data : {},
    completedAt: row.completed_at,
  };
}

function mapOnboardingRecord(
  onboarding: OnboardingRow,
  items: ChecklistItemRow[]
): OnboardingRecord {
  return {
    id: onboarding.id,
    firstName: onboarding.first_name,
    lastName: onboarding.last_name,
    position: onboarding.position,
    manager: onboarding.manager,
    startDate: onboarding.start_date,
    createdAt: onboarding.created_at,
    completedAt: onboarding.completed_at,
    checklist: items
      .sort((a, b) => a.sort_order - b.sort_order)
      .map(mapChecklistItem),
  };
}

async function fetchChecklistRows(onboardingId?: string) {
  const supabase = getSupabaseBrowserClient();

  let query = supabase
    .from("checklist_items")
    .select(
      "id,onboarding_id,template_key,sort_order,title,description,info,documents,comment,detail_data,completed_at"
    )
    .order("sort_order", { ascending: true });

  if (onboardingId) {
    query = query.eq("onboarding_id", onboardingId);
  }

  const { data, error } = await query;

  if (error) {
    throw toAppError(error, "Could not load checklist items.");
  }

  return (data ?? []) as ChecklistItemRow[];
}

async function fetchOnboardingRow(id: string) {
  const supabase = getSupabaseBrowserClient();
  const { data, error } = await supabase
    .from("onboarding")
    .select(
      "id,first_name,last_name,position,manager,start_date,created_at,completed_at"
    )
    .eq("id", id)
    .single();

  if (error) {
    throw toAppError(error, "Could not load the onboarding.");
  }

  return data as OnboardingRow;
}

export async function listOnboardings() {
  const supabase = getSupabaseBrowserClient();
  const [{ data: onboardingData, error: onboardingError }, checklistRows] =
    await Promise.all([
      supabase
        .from("onboarding")
        .select(
          "id,first_name,last_name,position,manager,start_date,created_at,completed_at"
        )
        .order("created_at", { ascending: false }),
      fetchChecklistRows(),
    ]);

  if (onboardingError) {
    throw toAppError(onboardingError, "Could not load onboardings.");
  }

  const checklistByOnboarding = new Map<string, ChecklistItemRow[]>();

  checklistRows.forEach((row) => {
    const group = checklistByOnboarding.get(row.onboarding_id) ?? [];
    group.push(row);
    checklistByOnboarding.set(row.onboarding_id, group);
  });

  return ((onboardingData ?? []) as OnboardingRow[]).map((onboarding) =>
    mapOnboardingRecord(
      onboarding,
      checklistByOnboarding.get(onboarding.id) ?? []
    )
  );
}

export async function createOnboarding(input: CreateOnboardingInput) {
  const supabase = getSupabaseBrowserClient();
  const { data, error } = await supabase
    .from("onboarding")
    .insert({
      first_name: input.firstName.trim(),
      last_name: input.lastName.trim(),
      position: input.position.trim(),
      manager: input.manager,
      start_date: input.startDate,
      completed_at: null,
    })
    .select(
      "id,first_name,last_name,position,manager,start_date,created_at,completed_at"
    )
    .single();

  if (error || !data) {
    throw toAppError(error ?? new Error("Missing onboarding row."), "Could not create onboarding.");
  }

  const checklistRows = CHECKLIST_TEMPLATE.map((item, index) => ({
    onboarding_id: data.id,
    template_key: item.id,
    sort_order: index,
    title: item.title,
    description: item.description,
    info: item.info,
    documents: item.documents,
    comment: null,
    detail_data: {},
    completed_at: null,
  }));

  const { data: insertedChecklist, error: checklistError } = await supabase
    .from("checklist_items")
    .insert(checklistRows)
    .select(
      "id,onboarding_id,template_key,sort_order,title,description,info,documents,comment,detail_data,completed_at"
    );

  if (checklistError) {
    await supabase.from("onboarding").delete().eq("id", data.id);
    throw toAppError(checklistError, "Could not create checklist items.");
  }

  return mapOnboardingRecord(data as OnboardingRow, (insertedChecklist ?? []) as ChecklistItemRow[]);
}

export async function getOnboarding(id: string) {
  const [onboarding, checklist] = await Promise.all([
    fetchOnboardingRow(id),
    fetchChecklistRows(id),
  ]);

  return mapOnboardingRecord(onboarding, checklist);
}

export interface SaveChecklistItemInput {
  comment: string;
  completed: boolean;
  detailData: ChecklistItemDetailData;
}

export async function saveChecklistItem(
  onboardingId: string,
  itemId: string,
  input: SaveChecklistItemInput
) {
  const supabase = getSupabaseBrowserClient();
  const completedAt = input.completed ? new Date().toISOString() : null;

  const { error } = await supabase
    .from("checklist_items")
    .update({
      completed_at: completedAt,
      comment: input.comment.trim() || null,
      detail_data: input.detailData,
    })
    .eq("id", itemId)
    .eq("onboarding_id", onboardingId);

  if (error) {
    throw toAppError(error, "Could not update checklist item.");
  }

  const updatedOnboarding = await getOnboarding(onboardingId);
  const progress = calcProgress(updatedOnboarding.checklist);

  const { error: onboardingError } = await supabase
    .from("onboarding")
    .update({
      completed_at:
        progress === 100 ? new Date().toISOString() : null,
    })
    .eq("id", onboardingId);

  if (onboardingError) {
    throw toAppError(onboardingError, "Could not update onboarding status.");
  }

  return getOnboarding(onboardingId);
}
