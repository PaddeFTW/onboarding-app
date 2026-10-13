import { createClient } from "@/lib/supabase/client";
import { isRegistryMissingError } from "@/lib/registry-errors";

export type CompanyReadiness = {
  ready: boolean;
  registryMissing: boolean;
  hasCompanyName: boolean;
  hasIndustry: boolean;
  hasPositions: boolean;
  hasEmployees: boolean;
};

/** Company is ready when name, industry, at least one position and one employee exist. */
export async function loadCompanyReadiness(): Promise<CompanyReadiness> {
  const empty: CompanyReadiness = {
    ready: false,
    registryMissing: false,
    hasCompanyName: false,
    hasIndustry: false,
    hasPositions: false,
    hasEmployees: false,
  };

  try {
    const supabase = createClient();
    const { data: user } = await supabase.auth.getUser();
    const { data: member } = await supabase
      .from("organization_members")
      .select("organization_id")
      .eq("user_id", user.user?.id)
      .limit(1)
      .maybeSingle();

    if (!member?.organization_id) return empty;

    const [settingsResult, positionsResult, employeesResult] = await Promise.all([
      supabase
        .from("company_settings")
        .select("company_name,industry")
        .eq("organization_id", member.organization_id)
        .maybeSingle(),
      supabase
        .from("positions")
        .select("id")
        .eq("organization_id", member.organization_id),
      supabase
        .from("employees")
        .select("id")
        .eq("organization_id", member.organization_id),
    ]);

    if (
      isRegistryMissingError(settingsResult.error) ||
      isRegistryMissingError(positionsResult.error) ||
      isRegistryMissingError(employeesResult.error)
    ) {
      return { ...empty, registryMissing: true };
    }

    const hasCompanyName = Boolean(settingsResult.data?.company_name?.trim());
    const hasIndustry = Boolean(settingsResult.data?.industry);
    const hasPositions = (positionsResult.data ?? []).length > 0;
    const hasEmployees = (employeesResult.data ?? []).length > 0;

    return {
      ready: hasCompanyName && hasIndustry && hasPositions && hasEmployees,
      registryMissing: false,
      hasCompanyName,
      hasIndustry,
      hasPositions,
      hasEmployees,
    };
  } catch (error) {
    if (isRegistryMissingError(error)) {
      return { ...empty, registryMissing: true };
    }
    return empty;
  }
}
