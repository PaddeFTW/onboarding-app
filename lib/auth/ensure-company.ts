import type { SupabaseClient } from "@supabase/supabase-js";

export async function ensureCompany(supabase: SupabaseClient, params: { fullName: string; companyName: string }) {
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData.user?.id;
  if (!userId) throw new Error("Inte inloggad");
  const { data: existing } = await supabase.from("organization_members").select("organization_id").eq("user_id", userId).limit(1).maybeSingle();
  if (existing?.organization_id) return existing.organization_id as string;
  const { data, error } = await supabase.rpc("create_company", { p_name: params.companyName, p_full_name: params.fullName });
  if (error || !data) throw new Error("Kunde inte spara företaget. Kör företagsisoleringen i Supabase.");
  return data as string;
}

export async function getCurrentCompanyId(supabase: SupabaseClient) {
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData.user?.id;
  if (!userId) throw new Error("Inte inloggad");
  const { data } = await supabase.from("organization_members").select("organization_id").eq("user_id", userId).limit(1).maybeSingle();
  if (!data?.organization_id) throw new Error("Inget företag är kopplat till kontot.");
  return data.organization_id as string;
}
