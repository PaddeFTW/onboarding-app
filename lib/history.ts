import { getCurrentCompanyId } from "@/lib/auth/ensure-company";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export async function recordEvent(input: {
  eventType: string;
  resourceType: string;
  resourceId: string;
  summary: string;
}) {
  const supabase = getSupabaseBrowserClient();
  const companyId = await getCurrentCompanyId(supabase);
  const { data: userData } = await supabase.auth.getUser();
  const { error } = await supabase.from("audit_events").insert({
    company_id: companyId,
    actor_id: userData.user?.id ?? null,
    event_type: input.eventType,
    resource_type: input.resourceType,
    resource_id: input.resourceId,
    summary: input.summary,
  });
  if (error) throw new Error("Historiken kunde inte sparas. Kör SQL-filen för fryst kopia.");
}

export async function saveSnapshot(input: {
  guidedInstanceId: string;
  templateVersionId: string;
  templateLabel: string;
  steps: unknown;
}) {
  const supabase = getSupabaseBrowserClient();
  const companyId = await getCurrentCompanyId(supabase);
  const { data: userData } = await supabase.auth.getUser();
  const { error } = await supabase.from("onboarding_snapshots").insert({
    company_id: companyId,
    guided_instance_id: input.guidedInstanceId,
    template_version_id: input.templateVersionId,
    template_label: input.templateLabel,
    steps: input.steps,
    created_by: userData.user?.id ?? null,
  });
  if (error) throw new Error("Den frysta kopian kunde inte sparas. Kör SQL-filen för fryst kopia.");
}

export async function listEvents() {
  const supabase = getSupabaseBrowserClient();
  const { data, error } = await supabase
    .from("audit_events")
    .select("id,event_type,summary,created_at")
    .order("created_at", { ascending: false })
    .limit(50);
  if (error) throw new Error("Historiken kunde inte läsas.");
  return data ?? [];
}
