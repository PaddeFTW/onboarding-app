import type { SupabaseClient } from "@supabase/supabase-js";

import { swedishAuthError } from "@/lib/auth/errors";

export async function ensureCompany(
  supabase: SupabaseClient,
  params: { fullName: string; companyName: string },
) {
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData.user?.id;
  if (!userId) throw new Error("Inte inloggad");

  const { data: existing } = await supabase
    .from("organization_members")
    .select("organization_id")
    .eq("user_id", userId)
    .limit(1)
    .maybeSingle();
  if (existing?.organization_id) return existing.organization_id as string;

  const { data, error } = await supabase.rpc("create_company", {
    p_name: params.companyName,
    p_full_name: params.fullName,
  });
  if (error || !data) {
    throw new Error(swedishAuthError(error?.message ?? "Kunde inte spara företaget."));
  }
  return data as string;
}

export async function getCurrentCompanyId(supabase: SupabaseClient) {
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData.user?.id;
  if (!userId) throw new Error("Inte inloggad");
  const { data, error } = await supabase
    .from("organization_members")
    .select("organization_id")
    .eq("user_id", userId)
    .limit(1)
    .maybeSingle();
  if (error || !data?.organization_id) {
    throw new Error("Inget företag är kopplat till kontot. Skapa kontot igen.");
  }
  return data.organization_id as string;
}
