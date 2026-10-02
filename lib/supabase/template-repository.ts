import type { PostgrestError } from "@supabase/supabase-js";

import { getCurrentCompanyId } from "@/lib/auth/ensure-company";
import { type CompanyTemplateVersion } from "@/lib/company-templates";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

interface TemplateRow {
  id: string;
  template_id: string;
  company_id: string | null;
  company_name: string;
  name: string;
  version_label: string;
  status: CompanyTemplateVersion["status"];
  based_on_version_id: string | null;
  source: "system";
  steps: CompanyTemplateVersion["steps"];
  created_at: string;
  published_at: string | null;
  archived_at: string | null;
}

function toAppError(error: PostgrestError | Error, fallback: string) {
  const message = error.message || fallback;
  if (message.includes("company_id") || message.includes("schema cache")) {
    return new Error("Företagsisoleringen saknas i databasen.");
  }
  return new Error(message);
}

function mapRow(row: TemplateRow): CompanyTemplateVersion {
  return {
    id: row.id,
    templateId: row.template_id,
    companyName: row.company_name,
    name: row.name,
    versionLabel: row.version_label,
    status: row.status,
    basedOnVersionId: row.based_on_version_id,
    source: "system",
    steps: Array.isArray(row.steps) ? row.steps : [],
    createdAt: row.created_at,
    publishedAt: row.published_at,
    archivedAt: row.archived_at,
  };
}

const columns = "id,template_id,company_id,company_name,name,version_label,status,based_on_version_id,source,steps,created_at,published_at,archived_at";

export async function listTemplateVersions() {
  const supabase = getSupabaseBrowserClient();
  const { data, error } = await supabase.from("company_template_versions").select(columns).order("created_at", { ascending: false });
  if (error) throw toAppError(error, "Kunde inte ladda mallar.");
  return ((data ?? []) as TemplateRow[]).map(mapRow);
}

export async function saveTemplateVersion(version: CompanyTemplateVersion) {
  const supabase = getSupabaseBrowserClient();
  const companyId = await getCurrentCompanyId(supabase);
  const { error } = await supabase.from("company_template_versions").upsert({
    id: version.id,
    template_id: version.templateId,
    company_id: companyId,
    company_name: version.companyName,
    name: version.name,
    version_label: version.versionLabel,
    status: version.status,
    based_on_version_id: version.basedOnVersionId,
    source: "system",
    steps: version.steps,
    created_at: version.createdAt,
    published_at: version.publishedAt,
    archived_at: version.archivedAt,
  }, { onConflict: "id" });
  if (error) throw toAppError(error, "Kunde inte spara mallen.");
  return version;
}
