/**
 * Client helper: create/select employee, optional invite, start guided instance.
 * Uses existing registry + guided-repository (Supabase + fallback).
 */

import { getCurrentCompanyId } from "@/lib/auth/ensure-company";
import {
  createEmployee,
  loadCompanyRegistry,
  type RegistryEmployee,
  type RegistryPosition,
} from "@/lib/company-registry";
import { isSmallCompany } from "@/lib/company-facts";
import { createCompanyGuidedOnboarding } from "@/lib/onboarding-steps";
import { createClient } from "@/lib/supabase/client";
import {
  upsertGuidedInstance,
  type StoredGuidedInstance,
} from "@/lib/supabase/guided-repository";
import { listTemplateVersions } from "@/lib/supabase/template-repository";

export type StartIntroductionInput = {
  /** Existing employee id, or omit to create a new registry profile. */
  employeeId?: string;
  name: string;
  email: string;
  /** Optional temporary password note — invite is still the account path. */
  password?: string;
  positionId: string;
  managerId: string;
  mentorId?: string;
  /** When true, insert company_invites + send magic link. */
  sendInvite: boolean;
};

export type StartIntroductionResult = {
  employee: RegistryEmployee;
  instance: StoredGuidedInstance;
  inviteStatus: "sent" | "saved" | "skipped" | "failed";
  inviteMessage: string;
};

export async function loadIntroductionFormData(): Promise<{
  organizationId: string;
  employees: RegistryEmployee[];
  positions: RegistryPosition[];
  employeeCount: string;
}> {
  const registry = await loadCompanyRegistry();
  if (!registry.ok) {
    throw new Error(registry.message);
  }
  return {
    organizationId: registry.data.organizationId,
    employees: registry.data.employees,
    positions: registry.data.positions,
    employeeCount: registry.data.settings.employeeCount ?? "",
  };
}

async function inviteParticipant(email: string, organizationId: string) {
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData.user?.id;
  if (!userId) throw new Error("Inte inloggad.");

  const normalized = email.trim().toLowerCase();
  const { error: insertError } = await supabase.from("company_invites").insert({
    organization_id: organizationId,
    email: normalized,
    role: "deltagare",
    invited_by: userId,
  });
  if (insertError) {
    return {
      status: "failed" as const,
      message:
        "Medarbetaren sparades men inbjudan kunde inte sparas. Kontrollera att inbjudningstabellen finns.",
    };
  }

  const { error: mailError } = await supabase.auth.signInWithOtp({
    email: normalized,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (mailError) {
    return {
      status: "saved" as const,
      message:
        "Inbjudan är sparad. Mejlet kunde inte skickas. Personen skapar konto med samma e-post.",
    };
  }
  return {
    status: "sent" as const,
    message: "Inbjudan är sparad och en inloggningslänk är skickad.",
  };
}

export async function startIntroductionForEmployee(
  input: StartIntroductionInput
): Promise<StartIntroductionResult> {
  const name = input.name.trim();
  const email = input.email.trim().toLowerCase();
  if (!name) throw new Error("Ange namn.");
  if (!email || !email.includes("@")) throw new Error("Ange en giltig e-postadress.");
  if (!input.positionId) throw new Error("Välj befattning.");
  if (!input.managerId) throw new Error("Välj ansvarig chef.");

  const formData = await loadIntroductionFormData();
  // Ensures the introducer is authenticated and has an organization.
  await getCurrentCompanyId(createClient());

  let employee = formData.employees.find((item) => item.id === input.employeeId);
  if (!employee) {
    employee = await createEmployee(formData.organizationId, {
      name,
      positionId: input.positionId,
      canManage: false,
      canMentor: false,
    });
  }

  const managers = formData.employees.filter((item) => item.canManage);
  const mentors = formData.employees.filter((item) => item.canMentor);
  const manager =
    managers.find((item) => item.id === input.managerId) ||
    formData.employees.find((item) => item.id === input.managerId);
  if (!manager) throw new Error("Vald chef hittades inte.");

  const small = isSmallCompany(formData.employeeCount);
  const mentor =
    mentors.find((item) => item.id === (small ? input.managerId : input.mentorId)) ||
    manager;

  let templateLabel = employee.positionName || "Introduktion";
  try {
    const versions = await listTemplateVersions();
    const published = versions.find((item) => item.status === "published");
    if (published) {
      templateLabel = `${published.name} ${published.versionLabel}`;
    }
  } catch {
    /* templates optional */
  }

  const guided = createCompanyGuidedOnboarding({
    participantName: employee.name,
    managerName: manager.name,
    mentorName: mentor.name,
    position: employee.positionName || templateLabel,
    singleResponsible: small,
  }) as StoredGuidedInstance;

  if (templateLabel) {
    guided.templateLabel = templateLabel;
  }

  const instance = await upsertGuidedInstance(guided);

  void import("@/lib/history")
    .then(({ recordEvent }) =>
      recordEvent({
        eventType: "introduction.started",
        resourceType: "guided_instance",
        resourceId: instance.id,
        summary: `Introduktion startad: ${employee.name}`,
      })
    )
    .catch(() => undefined);

  let inviteStatus: StartIntroductionResult["inviteStatus"] = "skipped";
  let inviteMessage = "Ingen inbjudan skickades.";
  if (input.sendInvite) {
    const invite = await inviteParticipant(email, formData.organizationId);
    inviteStatus = invite.status;
    inviteMessage = invite.message;
    if (input.password?.trim()) {
      inviteMessage +=
        " Dela det tillfälliga lösenordet separat om ni använder lösenordsinloggning efter att kontot skapats.";
    }
  }

  return {
    employee,
    instance,
    inviteStatus,
    inviteMessage,
  };
}
