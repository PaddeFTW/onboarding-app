import { industryById } from "@/lib/industries";
import {
  isRegistryMissingError,
  REGISTRY_MISSING_MESSAGE,
} from "@/lib/registry-errors";
import { createClient } from "@/lib/supabase/client";

export type RegistryPosition = {
  id: string;
  name: string;
  role: string;
};

export type RegistryEmployee = {
  id: string;
  name: string;
  positionId: string | null;
  positionName: string;
  canManage: boolean;
  canMentor: boolean;
};

export type RegistrySettings = {
  companyName: string;
  orgNumber: string;
  industry: string;
  employeeCount: string;
};

export type RegistryFacts = {
  workHours: string;
  sickContact: string;
  safetyRep: string;
  policies: string;
  hasAlarm: string;
  followUpDays: string;
  startDate: string;
  startPlace: string;
  firstDay: string;
  accounts: string;
  equipment: string;
};

export type CompanyRegistrySnapshot = {
  organizationId: string;
  settings: RegistrySettings;
  facts: RegistryFacts;
  positions: RegistryPosition[];
  employees: RegistryEmployee[];
  stats: {
    employeeCount: number;
    positionCount: number;
    managerCount: number;
    mentorCount: number;
  };
};

export type CompanyRegistryLoadResult =
  | { ok: true; data: CompanyRegistrySnapshot }
  | { ok: false; registryMissing: true; message: string }
  | { ok: false; registryMissing: false; message: string; noCompany?: boolean };

function emptySettings(): RegistrySettings {
  return {
    companyName: "",
    orgNumber: "",
    industry: "general",
    employeeCount: "",
  };
}

function emptyFacts(): RegistryFacts {
  return {
    workHours: "",
    sickContact: "",
    safetyRep: "",
    policies: "",
    hasAlarm: "",
    followUpDays: "",
    startDate: "",
    startPlace: "",
    firstDay: "",
    accounts: "",
    equipment: "",
  };
}

export function industryDisplayName(industry: string): string {
  if (!industry) return "—";
  return industryById(industry)?.name ?? industry;
}

export async function getOrganizationId(): Promise<string | null> {
  const supabase = createClient();
  const { data: user } = await supabase.auth.getUser();
  const { data: member } = await supabase
    .from("organization_members")
    .select("organization_id")
    .eq("user_id", user.user?.id)
    .limit(1)
    .maybeSingle();
  return member?.organization_id ?? null;
}

export async function loadCompanyRegistry(): Promise<CompanyRegistryLoadResult> {
  try {
    const supabase = createClient();
    const organizationId = await getOrganizationId();
    if (!organizationId) {
      return {
        ok: false,
        registryMissing: false,
        noCompany: true,
        message: "Inget företag är kopplat till kontot.",
      };
    }

    const [settingsResult, factsResult, positionsResult, employeesResult] =
      await Promise.all([
        supabase
          .from("company_settings")
          .select("company_name,org_number,industry,employee_count")
          .eq("organization_id", organizationId)
          .maybeSingle(),
        supabase
          .from("company_facts")
          .select(
            "start_date,start_place,first_day,accounts,equipment,work_hours,sick_contact,safety_rep,policies,has_alarm,follow_up_days"
          )
          .eq("organization_id", organizationId)
          .maybeSingle(),
        supabase
          .from("positions")
          .select("id,name,role")
          .eq("organization_id", organizationId)
          .order("name"),
        supabase
          .from("employees")
          .select("id,name,position_id,can_manage,can_mentor,positions(name)")
          .eq("organization_id", organizationId)
          .order("name"),
      ]);

    if (
      isRegistryMissingError(settingsResult.error) ||
      isRegistryMissingError(factsResult.error) ||
      isRegistryMissingError(positionsResult.error) ||
      isRegistryMissingError(employeesResult.error)
    ) {
      return {
        ok: false,
        registryMissing: true,
        message: REGISTRY_MISSING_MESSAGE,
      };
    }

    if (settingsResult.error) throw settingsResult.error;
    if (factsResult.error) throw factsResult.error;
    if (positionsResult.error) throw positionsResult.error;
    if (employeesResult.error) throw employeesResult.error;

    const settingsRow = settingsResult.data;
    const factsRow = factsResult.data;
    const positions: RegistryPosition[] = (positionsResult.data ?? []).map((row) => ({
      id: row.id,
      name: row.name,
      role: row.role ?? "",
    }));

    const employees: RegistryEmployee[] = (employeesResult.data ?? []).map((row) => {
      const relation = Array.isArray(row.positions) ? row.positions[0] : row.positions;
      return {
        id: row.id,
        name: row.name,
        positionId: row.position_id ?? null,
        positionName: relation?.name ?? "",
        canManage: Boolean(row.can_manage),
        canMentor: Boolean(row.can_mentor),
      };
    });

    const settings: RegistrySettings = {
      companyName: settingsRow?.company_name ?? "",
      orgNumber: settingsRow?.org_number ?? "",
      industry: settingsRow?.industry || "general",
      employeeCount: settingsRow?.employee_count ?? "",
    };

    const facts: RegistryFacts = {
      workHours: factsRow?.work_hours ?? "",
      sickContact: factsRow?.sick_contact ?? "",
      safetyRep: factsRow?.safety_rep ?? "",
      policies: factsRow?.policies ?? "",
      hasAlarm: factsRow?.has_alarm ?? "",
      followUpDays:
        factsRow?.follow_up_days == null ? "" : String(factsRow.follow_up_days),
      startDate: factsRow?.start_date ?? "",
      startPlace: factsRow?.start_place ?? "",
      firstDay: factsRow?.first_day ?? "",
      accounts: factsRow?.accounts ?? "",
      equipment: factsRow?.equipment ?? "",
    };

    return {
      ok: true,
      data: {
        organizationId,
        settings,
        facts,
        positions,
        employees,
        stats: {
          employeeCount: employees.length,
          positionCount: positions.length,
          managerCount: employees.filter((item) => item.canManage).length,
          mentorCount: employees.filter((item) => item.canMentor).length,
        },
      },
    };
  } catch (error) {
    if (isRegistryMissingError(error)) {
      return {
        ok: false,
        registryMissing: true,
        message: REGISTRY_MISSING_MESSAGE,
      };
    }
    return {
      ok: false,
      registryMissing: false,
      message: error instanceof Error ? error.message : "Kunde inte ladda företaget.",
    };
  }
}

export async function saveCompanySettings(
  organizationId: string,
  settings: RegistrySettings
): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from("company_settings").upsert({
    organization_id: organizationId,
    company_name: settings.companyName.trim() || null,
    org_number: settings.orgNumber.trim() || null,
    industry: settings.industry.trim() || null,
    employee_count: settings.employeeCount || null,
  });
  if (error) throw error;
}

export async function saveCompanyFacts(
  organizationId: string,
  facts: RegistryFacts
): Promise<void> {
  const supabase = createClient();
  const followUp =
    facts.followUpDays.trim() === "" ? null : Number(facts.followUpDays);
  const { error } = await supabase.from("company_facts").upsert({
    organization_id: organizationId,
    work_hours: facts.workHours.trim() || null,
    sick_contact: facts.sickContact.trim() || null,
    safety_rep: facts.safetyRep.trim() || null,
    policies: facts.policies.trim() || null,
    has_alarm: facts.hasAlarm.trim() || null,
    follow_up_days: Number.isFinite(followUp) ? followUp : null,
    start_date: facts.startDate.trim() || null,
    start_place: facts.startPlace.trim() || null,
    first_day: facts.firstDay.trim() || null,
    accounts: facts.accounts.trim() || null,
    equipment: facts.equipment.trim() || null,
  });
  if (error) throw error;
}

export async function createPosition(
  organizationId: string,
  input: { name: string; role?: string }
): Promise<RegistryPosition> {
  const name = input.name.trim();
  if (!name) throw new Error("Ange befattningens namn.");
  const supabase = createClient();
  const { data, error } = await supabase
    .from("positions")
    .insert({
      organization_id: organizationId,
      name,
      role: (input.role ?? "Egen befattning").trim() || "Egen befattning",
    })
    .select("id,name,role")
    .single();
  if (error || !data) throw error ?? new Error("Kunde inte spara befattningen.");
  return { id: data.id, name: data.name, role: data.role ?? "" };
}

export async function updatePosition(
  positionId: string,
  input: { name: string; role: string }
): Promise<RegistryPosition> {
  const name = input.name.trim();
  if (!name) throw new Error("Ange befattningens namn.");
  const supabase = createClient();
  const { data, error } = await supabase
    .from("positions")
    .update({
      name,
      role: input.role.trim() || "Egen befattning",
    })
    .eq("id", positionId)
    .select("id,name,role")
    .single();
  if (error || !data) throw error ?? new Error("Kunde inte uppdatera befattningen.");
  return { id: data.id, name: data.name, role: data.role ?? "" };
}

export async function deletePosition(positionId: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from("positions").delete().eq("id", positionId);
  if (error) throw error;
}

export async function createEmployee(
  organizationId: string,
  input: {
    name: string;
    positionId: string;
    canManage?: boolean;
    canMentor?: boolean;
  }
): Promise<RegistryEmployee> {
  const name = input.name.trim();
  if (!name) throw new Error("Ange namn.");
  if (!input.positionId) throw new Error("Välj en befattning.");
  const supabase = createClient();
  const { data, error } = await supabase
    .from("employees")
    .insert({
      organization_id: organizationId,
      name,
      position_id: input.positionId,
      can_manage: Boolean(input.canManage),
      can_mentor: input.canMentor !== false,
    })
    .select("id,name,position_id,can_manage,can_mentor,positions(name)")
    .single();
  if (error || !data) throw error ?? new Error("Kunde inte spara medarbetaren.");
  const relation = Array.isArray(data.positions) ? data.positions[0] : data.positions;
  return {
    id: data.id,
    name: data.name,
    positionId: data.position_id ?? null,
    positionName: relation?.name ?? "",
    canManage: Boolean(data.can_manage),
    canMentor: Boolean(data.can_mentor),
  };
}

export async function updateEmployee(
  employeeId: string,
  input: {
    name: string;
    positionId: string;
    canManage: boolean;
    canMentor: boolean;
  }
): Promise<RegistryEmployee> {
  const name = input.name.trim();
  if (!name) throw new Error("Ange namn.");
  if (!input.positionId) throw new Error("Välj en befattning.");
  const supabase = createClient();
  const { data, error } = await supabase
    .from("employees")
    .update({
      name,
      position_id: input.positionId,
      can_manage: input.canManage,
      can_mentor: input.canMentor,
    })
    .eq("id", employeeId)
    .select("id,name,position_id,can_manage,can_mentor,positions(name)")
    .single();
  if (error || !data) throw error ?? new Error("Kunde inte uppdatera medarbetaren.");
  const relation = Array.isArray(data.positions) ? data.positions[0] : data.positions;
  return {
    id: data.id,
    name: data.name,
    positionId: data.position_id ?? null,
    positionName: relation?.name ?? "",
    canManage: Boolean(data.can_manage),
    canMentor: Boolean(data.can_mentor),
  };
}

export async function deleteEmployee(employeeId: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from("employees").delete().eq("id", employeeId);
  if (error) throw error;
}

export { emptyFacts, emptySettings };
