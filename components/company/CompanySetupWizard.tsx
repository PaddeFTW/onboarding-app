"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Check, Plus, Sparkles, Trash2 } from "lucide-react";

import { PageContainer } from "@/components/page-container";
import { LoadingState } from "@/components/loading-state";
import { useLocale } from "@/components/providers/locale-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { isSmallCompany } from "@/lib/company-facts";
import { setupStepText } from "@/lib/i18n";
import {
  ALARM_OPTIONS,
  applyIndustrySuggestions,
  draftPositionsFromRows,
  emptyCompanySetupDraft,
  FOLLOW_UP_OPTIONS,
  guideExampleFor,
  guidePlaceholderFor,
  industryOptions,
  industryPositionSuggestions,
  isCompanyGuideReady,
  isOptionalStepEmpty,
  isStepComplete,
  isStepRequired,
  POLICY_OPTIONS,
  refreshSizeSuggestions,
  SAFETY_REP_OPTIONS,
  suggestAlarm,
  suggestFollowUpDays,
  suggestPolicies,
  suggestSafetyRep,
  suggestSickContact,
  suggestWorkHours,
  visibleSetupSteps,
  withSmallCompanyResponsibles,
  type CompanySetupDraft,
  type CompanySetupStepId,
  type DraftEmployee,
  type DraftPosition,
  type EmployeeCount,
  EMPLOYEE_COUNT_OPTIONS,
} from "@/lib/company-setup";
import { uploadCompanyGuideDocument } from "@/lib/documents";
import {
  isRegistryMissingError,
  REGISTRY_MISSING_MESSAGE,
} from "@/lib/registry-errors";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

type SupabaseClient = ReturnType<typeof createClient>;

async function syncPositionsForCompany(
  supabase: SupabaseClient,
  organizationId: string,
  industry: string,
  extraPositions: DraftPosition[]
): Promise<DraftPosition[]> {
  const { data: existing, error } = await supabase
    .from("positions")
    .select("id,name,role")
    .eq("organization_id", organizationId);
  if (error) throw error;

  const byName = new Map(
    (existing ?? []).map((row) => [row.name.toLowerCase(), row] as const)
  );

  const toEnsure = [
    ...industryPositionSuggestions(industry),
    ...extraPositions
      .filter((item) => item.selected && item.name.trim())
      .map((item) => ({
        name: item.name.trim(),
        role: item.role || "Egen befattning",
      })),
  ];

  for (const item of toEnsure) {
    if (byName.has(item.name.toLowerCase())) continue;
    const { data: created, error: insertError } = await supabase
      .from("positions")
      .insert({
        organization_id: organizationId,
        name: item.name,
        role: item.role,
      })
      .select("id,name,role")
      .single();
    if (insertError) throw insertError;
    if (created) byName.set(created.name.toLowerCase(), created);
  }

  const { data: all, error: reloadError } = await supabase
    .from("positions")
    .select("id,name,role")
    .eq("organization_id", organizationId)
    .order("name");
  if (reloadError) throw reloadError;
  return draftPositionsFromRows(all ?? []);
}

export function CompanySetupWizard() {
  const router = useRouter();
  const { t, locale } = useLocale();
  const [orgId, setOrgId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [registryMissing, setRegistryMissing] = useState(false);
  const [finishing, setFinishing] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [animProgress, setAnimProgress] = useState(0);
  const [draft, setDraft] = useState<CompanySetupDraft>(emptyCompanySetupDraft);
  const [customPositionName, setCustomPositionName] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [employeePositionKey, setEmployeePositionKey] = useState("");
  const [wantDocument, setWantDocument] = useState<"yes" | "no" | "">("");
  const [uploadedName, setUploadedName] = useState<string | null>(null);

  const steps = useMemo(
    () => visibleSetupSteps(draft.employeeCount),
    [draft.employeeCount]
  );
  const step = steps[Math.min(stepIndex, steps.length - 1)];
  const total = steps.length;
  const progress = Math.round(((stepIndex + 1) / total) * 100);
  const requiredOk = !isStepRequired(step.id) || isStepComplete(step.id, draft);
  const canProceed = requiredOk;
  const isLast = stepIndex === total - 1;
  const savedPositions = useMemo(
    () => draft.positions.filter((item) => item.key.startsWith("db:") && item.name.trim()),
    [draft.positions]
  );
  const stepExample = guideExampleFor(step.id, draft.industry, draft.employeeCount, locale);
  const smallCompany = isSmallCompany(draft.employeeCount);
  const stepTitle = setupStepText(locale, step.id, "title") ?? step.title;
  const stepDescription = setupStepText(locale, step.id, "description") ?? step.description;
  const stepHelp = setupStepText(locale, step.id, "help") ?? step.helpText;

  useEffect(() => {
    void loadExisting();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const requested = new URLSearchParams(window.location.search).get("step");
    if (!requested) return;
    const index = steps.findIndex((item) => item.id === requested);
    if (index >= 0) setStepIndex(index);
  }, [steps]);

  useEffect(() => {
    setStepIndex((current) => Math.min(current, Math.max(steps.length - 1, 0)));
  }, [steps.length]);

  useEffect(() => {
    const timer = setTimeout(() => setAnimProgress(progress), 200);
    return () => clearTimeout(timer);
  }, [progress]);

  async function loadExisting() {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data: user } = await supabase.auth.getUser();
      const { data: member } = await supabase
        .from("organization_members")
        .select("organization_id")
        .eq("user_id", user.user?.id)
        .limit(1)
        .maybeSingle();
      if (!member?.organization_id) {
        setLoading(false);
        return;
      }
      setOrgId(member.organization_id);

      const [settingsResult, factsResult, positionsResult, employeesResult] =
        await Promise.all([
          supabase
            .from("company_settings")
            .select("company_name,org_number,industry,employee_count")
            .eq("organization_id", member.organization_id)
            .maybeSingle(),
          supabase
            .from("company_facts")
            .select(
              "start_date,start_place,first_day,accounts,equipment,work_hours,sick_contact,safety_rep,policies,has_alarm,follow_up_days"
            )
            .eq("organization_id", member.organization_id)
            .maybeSingle(),
          supabase
            .from("positions")
            .select("id,name,role")
            .eq("organization_id", member.organization_id),
          supabase
            .from("employees")
            .select("id,name,position_id,can_manage,can_mentor")
            .eq("organization_id", member.organization_id),
        ]);

      if (
        isRegistryMissingError(settingsResult.error) ||
        isRegistryMissingError(factsResult.error) ||
        isRegistryMissingError(positionsResult.error) ||
        isRegistryMissingError(employeesResult.error)
      ) {
        setRegistryMissing(true);
        return;
      }

      const settings = settingsResult.data;
      const facts = factsResult.data;
      const positionRows = positionsResult.data;
      const employeeRows = employeesResult.data;

      let next = emptyCompanySetupDraft();
      if (settings?.company_name) next.companyName = settings.company_name;
      if (settings?.org_number) next.orgNumber = settings.org_number;
      next.industry = settings?.industry || "general";
      if (settings?.employee_count) {
        next.employeeCount = settings.employee_count as EmployeeCount;
      }
      if (facts) {
        next.startDate = facts.start_date ?? "";
        next.startPlace = facts.start_place ?? "";
        next.firstDay = facts.first_day ?? "";
        next.accounts = facts.accounts ?? "";
        next.equipment = facts.equipment ?? "";
        next.work_hours = facts.work_hours ?? "";
        next.sick_contact = facts.sick_contact ?? "";
        next.safety_rep = facts.safety_rep ?? "";
        next.policies = facts.policies ?? "";
        next.has_alarm = facts.has_alarm ?? "";
        next.follow_up_days = facts.follow_up_days == null ? "" : String(facts.follow_up_days);
      }

      if (positionRows && positionRows.length > 0) {
        next.positions = draftPositionsFromRows(positionRows);
      } else {
        next = applyIndustrySuggestions(next);
        next.positions = await syncPositionsForCompany(
          supabase,
          member.organization_id,
          next.industry,
          next.positions
        );
      }

      if (employeeRows && employeeRows.length > 0) {
        next.employees = employeeRows.map((row) => ({
          key: `db:${row.id}`,
          name: row.name,
          positionKey: row.position_id ? `db:${row.position_id}` : "",
          can_manage: Boolean(row.can_manage),
          can_mentor: Boolean(row.can_mentor),
        }));
      }

      setDraft(next);
      if (next.positions[0]) {
        setEmployeePositionKey(next.positions[0].key);
      }
    } catch (error) {
      if (isRegistryMissingError(error)) {
        setRegistryMissing(true);
      } else {
        console.error(error);
        toast.error("Kunde inte ladda grundinställningen.");
      }
    } finally {
      setLoading(false);
    }
  }

  function updateDraft(patch: Partial<CompanySetupDraft>) {
    setDraft((current) => ({ ...current, ...patch }));
  }

  function chooseIndustry(industry: string) {
    setDraft((current) =>
      applyIndustrySuggestions({
        ...current,
        industry,
        positions: [],
        work_hours: "",
        sick_contact: "",
        safety_rep: "",
        policies: "",
        has_alarm: "",
        follow_up_days: "",
      })
    );
  }

  function chooseEmployeeCount(employeeCount: EmployeeCount) {
    setDraft((current) => refreshSizeSuggestions({ ...current, employeeCount }));
  }

  function togglePosition(key: string) {
    setDraft((current) => ({
      ...current,
      positions: current.positions.map((item) =>
        item.key === key ? { ...item, selected: !item.selected } : item
      ),
    }));
  }

  async function addCustomPosition() {
    const name = customPositionName.trim();
    if (!name) return;
    if (!orgId) {
      toast.error("Inget företag hittades för kontot.");
      return;
    }
    if (draft.positions.some((item) => item.name.toLowerCase() === name.toLowerCase())) {
      toast.error("Befattningen finns redan.");
      return;
    }
    setSaving(true);
    try {
      const supabase = createClient();
      const { data: created, error } = await supabase
        .from("positions")
        .insert({
          organization_id: orgId,
          name,
          role: "Egen befattning",
        })
        .select("id,name,role")
        .single();
      if (error || !created) throw error ?? new Error("Kunde inte spara befattning.");
      const position: DraftPosition = {
        key: `db:${created.id}`,
        name: created.name,
        role: created.role,
        selected: true,
      };
      setDraft((current) => ({ ...current, positions: [...current.positions, position] }));
      setCustomPositionName("");
      if (!employeePositionKey) setEmployeePositionKey(position.key);
      toast.success("Befattningen är sparad.");
    } catch (error) {
      console.error(error);
      if (isRegistryMissingError(error)) {
        setRegistryMissing(true);
        toast.error(REGISTRY_MISSING_MESSAGE);
      } else {
        toast.error("Kunde inte spara befattningen.");
      }
    } finally {
      setSaving(false);
    }
  }

  async function addEmployee() {
    const name = employeeName.trim();
    if (!name) {
      toast.error("Ange namn.");
      return;
    }
    if (!orgId) {
      toast.error("Inget företag hittades för kontot.");
      return;
    }
    if (savedPositions.length === 0) {
      toast.error("Lägg till en befattning först.");
      return;
    }
    if (!employeePositionKey) {
      toast.error("Välj en befattning innan du sparar medarbetaren.");
      return;
    }
    const position = savedPositions.find((item) => item.key === employeePositionKey);
    if (!position || !position.key.startsWith("db:")) {
      toast.error("Välj en befattning innan du sparar medarbetaren.");
      return;
    }
    setSaving(true);
    try {
      const supabase = createClient();
      const { data: created, error } = await supabase
        .from("employees")
        .insert({
          organization_id: orgId,
          name,
          position_id: position.key.replace(/^db:/, ""),
          can_manage: false,
          can_mentor: true,
        })
        .select("id,name,position_id,can_manage,can_mentor")
        .single();
      if (error || !created) throw error ?? new Error("Kunde inte spara medarbetaren.");
      const employee: DraftEmployee = {
        key: `db:${created.id}`,
        name: created.name,
        positionKey: created.position_id ? `db:${created.position_id}` : position.key,
        can_manage: Boolean(created.can_manage),
        can_mentor: Boolean(created.can_mentor),
      };
      setDraft((current) => ({ ...current, employees: [...current.employees, employee] }));
      setEmployeeName("");
      setEmployeePositionKey(savedPositions[0]?.key ?? "");
      toast.success(`Medarbetaren är sparad: ${created.name}`);
    } catch (error) {
      console.error(error);
      if (isRegistryMissingError(error)) {
        setRegistryMissing(true);
        toast.error(REGISTRY_MISSING_MESSAGE);
      } else {
        toast.error("Kunde inte spara medarbetaren.");
      }
    } finally {
      setSaving(false);
    }
  }

  async function removeEmployee(key: string) {
    const employee = draft.employees.find((item) => item.key === key);
    if (!employee) return;
    if (employee.key.startsWith("db:")) {
      setSaving(true);
      try {
        const supabase = createClient();
        const { error } = await supabase
          .from("employees")
          .delete()
          .eq("id", employee.key.replace(/^db:/, ""));
        if (error) throw error;
      } catch (error) {
        console.error(error);
        toast.error("Kunde inte ta bort medarbetaren.");
        setSaving(false);
        return;
      } finally {
        setSaving(false);
      }
    }
    setDraft((current) => ({
      ...current,
      employees: current.employees.filter((item) => item.key !== key),
    }));
    toast.success("Medarbetaren är borttagen.");
  }

  async function toggleEmployeeFlag(key: string, field: "can_manage" | "can_mentor") {
    const employee = draft.employees.find((item) => item.key === key);
    if (!employee) return;
    const nextValue = !employee[field];
    setDraft((current) => ({
      ...current,
      employees: current.employees.map((item) =>
        item.key === key ? { ...item, [field]: nextValue } : item
      ),
    }));
    if (!employee.key.startsWith("db:")) return;
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("employees")
        .update({ [field]: nextValue })
        .eq("id", employee.key.replace(/^db:/, ""));
      if (error) throw error;
    } catch (error) {
      console.error(error);
      toast.error("Kunde inte uppdatera rollen.");
      setDraft((current) => ({
        ...current,
        employees: current.employees.map((item) =>
          item.key === key ? { ...item, [field]: employee[field] } : item
        ),
      }));
    }
  }

  async function persistDraft(): Promise<DraftPosition[] | false> {
    if (!orgId) {
      toast.error("Inget företag hittades för kontot.");
      return false;
    }
    setSaving(true);
    try {
      const supabase = createClient();

      const { error: settingsError } = await supabase.from("company_settings").upsert({
        organization_id: orgId,
        company_name: draft.companyName.trim() || null,
        org_number: draft.orgNumber.trim() || null,
        industry: draft.industry || null,
        employee_count: draft.employeeCount || null,
      });
      if (settingsError) throw settingsError;

      const { error: factsError } = await supabase.from("company_facts").upsert({
        organization_id: orgId,
        start_date: draft.startDate || null,
        start_place: draft.startPlace.trim() || null,
        first_day: draft.firstDay.trim() || null,
        accounts: draft.accounts.trim() || null,
        equipment: draft.equipment.trim() || null,
        work_hours: draft.work_hours || null,
        sick_contact: draft.sick_contact || null,
        safety_rep: draft.safety_rep || null,
        policies: draft.policies || null,
        has_alarm: draft.has_alarm || null,
        follow_up_days: draft.follow_up_days ? Number(draft.follow_up_days) : null,
      });
      if (factsError) throw factsError;

      const nextPositions = draft.industry
        ? await syncPositionsForCompany(supabase, orgId, draft.industry, draft.positions)
        : draft.positions.filter((item) => item.key.startsWith("db:"));

      const positionIdByKey = new Map<string, string>();
      for (const position of nextPositions) {
        positionIdByKey.set(position.key, position.key.slice(3));
      }
      for (const previous of draft.positions) {
        const match = nextPositions.find(
          (item) => item.name.toLowerCase() === previous.name.toLowerCase()
        );
        if (match) positionIdByKey.set(previous.key, match.key.slice(3));
      }

      const nextEmployees = draft.employees.map((employee) => {
        const positionId = positionIdByKey.get(employee.positionKey);
        return positionId ? { ...employee, positionKey: `db:${positionId}` } : employee;
      });

      setDraft((current) => ({
        ...current,
        positions: nextPositions,
        employees: nextEmployees,
      }));
      if (!employeePositionKey && nextPositions[0]) {
        setEmployeePositionKey(nextPositions[0].key);
      } else if (
        employeePositionKey &&
        !nextPositions.some((item) => item.key === employeePositionKey)
      ) {
        const mapped = positionIdByKey.get(employeePositionKey);
        setEmployeePositionKey(mapped ? `db:${mapped}` : nextPositions[0]?.key ?? "");
      }

      const { data: existingEmployees, error: employeesReadError } = await supabase
        .from("employees")
        .select("id,name")
        .eq("organization_id", orgId);
      if (employeesReadError) throw employeesReadError;
      const employeeByName = new Map(
        (existingEmployees ?? []).map((row) => [row.name.toLowerCase(), row.id] as const)
      );

      for (const employee of nextEmployees) {
        const positionId = positionIdByKey.get(employee.positionKey);
        if (!positionId || !employee.name.trim()) continue;
        if (employee.key.startsWith("db:")) {
          const { error } = await supabase
            .from("employees")
            .update({
              name: employee.name.trim(),
              position_id: positionId,
              can_manage: employee.can_manage,
              can_mentor: employee.can_mentor,
            })
            .eq("id", employee.key.slice(3))
            .eq("organization_id", orgId);
          if (error) throw error;
          continue;
        }
        const existingId = employeeByName.get(employee.name.trim().toLowerCase());
        if (existingId) {
          const { error } = await supabase
            .from("employees")
            .update({
              name: employee.name.trim(),
              position_id: positionId,
              can_manage: employee.can_manage,
              can_mentor: employee.can_mentor,
            })
            .eq("id", existingId)
            .eq("organization_id", orgId);
          if (error) throw error;
          continue;
        }
        const { error } = await supabase.from("employees").insert({
          organization_id: orgId,
          name: employee.name.trim(),
          position_id: positionId,
          can_manage: employee.can_manage,
          can_mentor: employee.can_mentor,
        });
        if (error) throw error;
      }

      return nextPositions;
    } catch (error) {
      console.error(error);
      if (isRegistryMissingError(error)) {
        setRegistryMissing(true);
        toast.error(REGISTRY_MISSING_MESSAGE);
      } else {
        toast.error("Kunde inte spara. Försök igen.");
      }
      return false;
    } finally {
      setSaving(false);
    }
  }

  async function handleDocumentUpload(file: File | null) {
    if (!file) return;
    setSaving(true);
    try {
      await uploadCompanyGuideDocument(file);
      setUploadedName(file.name);
      setWantDocument("yes");
      toast.success("Dokumentet är sparat som bilaga.");
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Kunde inte ladda upp.");
    } finally {
      setSaving(false);
    }
  }

  async function handleNext() {
    if (!canProceed) {
      if (step.id === "company_name") toast.error("Ange företagsnamn.");
      else if (step.id === "positions") toast.error("Lägg till en befattning först.");
      else if (step.id === "employees") toast.error("Lägg till en medarbetare först.");
      else toast.error("Fyll i steget innan du går vidare.");
      return;
    }

    if (step.id === "manager" && smallCompany) {
      setDraft((current) => withSmallCompanyResponsibles(current));
    }

    if (step.id === "documents") {
      if (wantDocument === "yes" && !uploadedName) {
        toast.error("Ladda upp en fil, eller välj Nej, fortsätt.");
        return;
      }
      if (wantDocument !== "yes") {
        setWantDocument("no");
      }
    }

    let syncedPositions: DraftPosition[] | false = savedPositions;
    if (step.id !== "documents") {
      syncedPositions = await persistDraft();
      if (!syncedPositions) return;
    }

    if (isLast) {
      if (!isCompanyGuideReady(draft)) {
        toast.error("Ange företagsnamn, en befattning och en medarbetare först.");
        return;
      }
      setFinishing(true);
      try {
        toast.success("Grundinställningen är sparad.");
        router.push("/foretag");
      } finally {
        setFinishing(false);
      }
      return;
    }

    const nextIndex = Math.min(stepIndex + 1, total - 1);
    const nextStep = steps[nextIndex];
    if (nextStep?.id === "employees") {
      setEmployeePositionKey(syncedPositions[0]?.key ?? "");
    }
    setStepIndex(nextIndex);
  }

  function handleBack() {
    setStepIndex((current) => Math.max(current - 1, 0));
  }

  if (loading) {
    return (
      <PageContainer>
        <LoadingState label={t("setup.loading")} />
      </PageContainer>
    );
  }

  if (registryMissing) {
    return (
      <PageContainer className="flex flex-col gap-4">
        <Button variant="ghost" size="sm" className="-ml-3 w-fit" asChild>
          <Link href="/">
            <ArrowLeft />
            {t("common.back")}
          </Link>
        </Button>
        <h1 className="text-2xl font-semibold">{t("setup.registryMissing")}</h1>
        <p className="text-sm text-muted-foreground">{REGISTRY_MISSING_MESSAGE}</p>
      </PageContainer>
    );
  }

  if (!orgId) {
    return (
      <PageContainer className="flex flex-col gap-4">
        <Button variant="ghost" size="sm" className="-ml-3 w-fit" asChild>
          <Link href="/">
            <ArrowLeft />
            {t("common.back")}
          </Link>
        </Button>
        <h1 className="text-2xl font-semibold">{t("setup.noCompany")}</h1>
        <p className="text-sm text-muted-foreground">{t("setup.noCompanyHint")}</p>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-3">
        <Button variant="ghost" size="sm" className="-ml-3 w-fit" asChild>
          <Link href="/">
            <ArrowLeft />
            {t("common.back")}
          </Link>
        </Button>
        <Badge variant="outline">{t("common.oneQuestionAtATime")}</Badge>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/70">
          {t("setup.pageEyebrow")}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {t("setup.pageTitle")}
        </h1>
        <p className="max-w-xl text-sm text-muted-foreground">{t("setup.pageDescription")}</p>
      </div>

      <Card className="overflow-hidden p-0">
        <div className="flex items-end justify-between gap-3 px-5 pb-4 pt-5 sm:px-6">
          <div>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-primary/60">
              {t("setup.questionLabel")}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {t("common.questionOf", { current: stepIndex + 1, total })}
            </p>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-extralight tabular-nums tracking-tighter text-foreground">
              {progress}
            </span>
            <span className="text-lg font-light text-muted-foreground/50">%</span>
          </div>
        </div>
        <Progress value={animProgress} className="h-1.5 rounded-none" />
      </Card>

      <Card className="flex flex-col gap-6 p-5 sm:p-6">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">{stepDescription}</Badge>
            {isStepRequired(step.id) ? (
              <Badge variant="default">{t("common.required")}</Badge>
            ) : (
              <Badge variant="outline">{t("common.optional")}</Badge>
            )}
          </div>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{stepTitle}</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">{stepHelp}</p>
          {step.placeholder ? (
            <p className="text-sm text-muted-foreground">
              {t("common.placeholder")}: {step.placeholder}
            </p>
          ) : null}
          {stepExample ? (
            <p className="text-sm text-muted-foreground">
              {t("common.example")}: {stepExample}
            </p>
          ) : null}
          {smallCompany && step.id === "manager" ? (
            <p className="text-sm text-muted-foreground">{t("setup.smallCompanyManagerHint")}</p>
          ) : null}
        </div>

        <StepBody
          stepId={step.id}
          draft={draft}
          customPositionName={customPositionName}
          employeeName={employeeName}
          employeePositionKey={employeePositionKey}
          savedPositions={savedPositions}
          saving={saving}
          wantDocument={wantDocument}
          uploadedName={uploadedName}
          onChooseIndustry={chooseIndustry}
          onChooseEmployeeCount={chooseEmployeeCount}
          onTogglePosition={togglePosition}
          onCustomPositionName={setCustomPositionName}
          onAddCustomPosition={() => void addCustomPosition()}
          onEmployeeName={setEmployeeName}
          onEmployeePositionKey={setEmployeePositionKey}
          onAddEmployee={() => void addEmployee()}
          onRemoveEmployee={(key) => void removeEmployee(key)}
          onToggleEmployeeFlag={(key, field) => void toggleEmployeeFlag(key, field)}
          onUpdateDraft={updateDraft}
          onWantDocument={setWantDocument}
          onUploadDocument={(file) => void handleDocumentUpload(file)}
        />
      </Card>

      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={handleBack}
          disabled={stepIndex === 0 || saving || finishing}
          className="w-full sm:w-auto"
        >
          <ArrowLeft />
          Tillbaka
        </Button>
        <Button
          type="button"
          onClick={() => void handleNext()}
          disabled={!canProceed || saving || finishing}
          className="w-full sm:w-auto"
        >
          {isLast
            ? finishing
              ? "Sparar…"
              : "Spara och gå till start"
            : step.id === "documents" && wantDocument !== "yes"
              ? "Nej, fortsätt"
              : !isStepRequired(step.id) && isOptionalStepEmpty(step.id, draft)
                ? "Hoppa över"
                : "Nästa"}
          {!isLast ? <ArrowRight /> : <Check />}
        </Button>
      </div>
    </PageContainer>
  );
}

function SuggestionChip({
  label,
  onApply,
}: {
  label: string;
  onApply: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onApply}
      className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-left text-xs text-primary transition hover:bg-primary/10"
    >
      <Sparkles className="size-3.5 shrink-0" />
      <span>{label}</span>
    </button>
  );
}

function OptionGrid({
  options,
  value,
  onChange,
}: {
  options: { value: string; label: string; hint?: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {options.map((option) => {
        const selected = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "rounded-2xl border px-4 py-3 text-left transition",
              selected
                ? "border-primary bg-primary/5 shadow-soft-xs"
                : "border-border/80 bg-card hover:border-primary/25"
            )}
          >
            <p className="font-medium">{option.label}</p>
            {option.hint ? <p className="mt-1 text-xs text-muted-foreground">{option.hint}</p> : null}
          </button>
        );
      })}
    </div>
  );
}

function OptionGridWithOther({
  options,
  value,
  onChange,
  otherLabel,
  placeholder,
}: {
  options: { value: string; label: string; hint?: string }[];
  value: string;
  onChange: (value: string) => void;
  otherLabel: string;
  placeholder: string;
}) {
  const known = options.some((option) => option.value === value);
  const selected = known ? value : value ? "__other__" : "";
  return (
    <div className="flex flex-col gap-3">
      <OptionGrid
        value={selected === "__other__" ? "__other__" : value}
        onChange={(next) => {
          if (next === "__other__") {
            onChange(known ? "" : value);
            return;
          }
          onChange(next);
        }}
        options={[...options, { value: "__other__", label: otherLabel }]}
      />
      {selected === "__other__" ? (
        <Input
          value={known ? "" : value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : null}
    </div>
  );
}

function StepBody({
  stepId,
  draft,
  customPositionName,
  employeeName,
  employeePositionKey,
  savedPositions,
  saving,
  wantDocument,
  uploadedName,
  onChooseIndustry,
  onChooseEmployeeCount,
  onTogglePosition,
  onCustomPositionName,
  onAddCustomPosition,
  onEmployeeName,
  onEmployeePositionKey,
  onAddEmployee,
  onRemoveEmployee,
  onToggleEmployeeFlag,
  onUpdateDraft,
  onWantDocument,
  onUploadDocument,
}: {
  stepId: CompanySetupStepId;
  draft: CompanySetupDraft;
  customPositionName: string;
  employeeName: string;
  employeePositionKey: string;
  savedPositions: DraftPosition[];
  saving: boolean;
  wantDocument: "yes" | "no" | "";
  uploadedName: string | null;
  onChooseIndustry: (industry: string) => void;
  onChooseEmployeeCount: (count: EmployeeCount) => void;
  onTogglePosition: (key: string) => void;
  onCustomPositionName: (value: string) => void;
  onAddCustomPosition: () => void;
  onEmployeeName: (value: string) => void;
  onEmployeePositionKey: (value: string) => void;
  onAddEmployee: () => void;
  onRemoveEmployee: (key: string) => void;
  onToggleEmployeeFlag: (key: string, field: "can_manage" | "can_mentor") => void;
  onUpdateDraft: (patch: Partial<CompanySetupDraft>) => void;
  onWantDocument: (value: "yes" | "no" | "") => void;
  onUploadDocument: (file: File | null) => void;
}) {
  switch (stepId) {
    case "company_name":
      return (
        <TextWithSuggestion
          id="company-name"
          label="Företagsnamn"
          placeholder={guidePlaceholderFor("company_name", draft.industry)}
          value={draft.companyName}
          suggestion={guideExampleFor("company_name", draft.industry, draft.employeeCount)}
          onChange={(value) => onUpdateDraft({ companyName: value })}
        />
      );

    case "org_number":
      return (
        <TextWithSuggestion
          id="org-number"
          label="Organisationsnummer"
          placeholder="XXXXXX-XXXX"
          value={draft.orgNumber}
          suggestion="559000-1234"
          onChange={(value) => onUpdateDraft({ orgNumber: value })}
        />
      );

    case "industry": {
      const known = industryOptions().some((item) => item.id === draft.industry);
      const selected = known ? draft.industry : "other";
      return (
        <div className="flex flex-col gap-3">
          <OptionGrid
            value={selected}
            onChange={(value) => {
              if (value === "other") {
                onUpdateDraft({ industry: draft.industry && !known ? draft.industry : "" });
                return;
              }
              onChooseIndustry(value);
            }}
            options={[
              ...industryOptions().map((item) => ({
                value: item.id,
                label: item.name,
              })),
              { value: "other", label: "Annat" },
            ]}
          />
          {selected === "other" ? (
            <Input
              value={known ? "" : draft.industry}
              placeholder="Skriv egen bransch"
              onChange={(event) => onUpdateDraft({ industry: event.target.value })}
            />
          ) : null}
        </div>
      );
    }

    case "employee_count":
      return (
        <OptionGrid
          value={draft.employeeCount}
          onChange={(value) => onChooseEmployeeCount(value as EmployeeCount)}
          options={EMPLOYEE_COUNT_OPTIONS.map((value) => ({
            value,
            label: value,
            hint:
              value === "1–5"
                ? "Färre roller och närmare uppföljning"
                : value === "6–20"
                  ? "Vanlig småföretagsnivå"
                  : value === "21–50"
                    ? "Formellare skydds- och policyordning"
                    : "Full rollista och längre uppföljning",
          }))}
        />
      );

    case "positions":
      return (
        <div className="flex flex-col gap-4">
          <Link className="text-sm font-semibold text-primary" href="/foretagsregister?tab=positions">
            Hantera i företagsregistret
          </Link>
          {!draft.industry || draft.positions.length === 0 ? (
            <p className="text-sm text-muted-foreground">Spara branschen för att få förslag</p>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">
                Förslag för{" "}
                {(industryOptions().find((item) => item.id === draft.industry)?.name ??
                  draft.industry) ||
                  "er bransch"}
                . Sparade befattningar kan väljas till medarbetare.
              </p>
              <div className="flex flex-col gap-2">
                {draft.positions.map((position) => (
                  <label
                    key={position.key}
                    className={cn(
                      "flex cursor-pointer items-start gap-3 rounded-2xl border px-4 py-3",
                      position.selected ? "border-primary/40 bg-primary/5" : "border-border/80"
                    )}
                  >
                    <Checkbox
                      checked={position.selected}
                      onCheckedChange={() => onTogglePosition(position.key)}
                      className="mt-0.5"
                    />
                    <span>
                      <span className="block font-medium">{position.name}</span>
                      <span className="text-xs text-muted-foreground">{position.role}</span>
                    </span>
                  </label>
                ))}
              </div>
            </>
          )}
          <div className="flex flex-col gap-2">
            <Label htmlFor="new-position">Ny befattning</Label>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input
                id="new-position"
                placeholder="Till exempel Projektledare"
                value={customPositionName}
                onChange={(event) => onCustomPositionName(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    onAddCustomPosition();
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                disabled={saving || !customPositionName.trim()}
                onClick={onAddCustomPosition}
              >
                <Plus />
                Lägg till befattning
              </Button>
            </div>
          </div>
        </div>
      );

    case "employees":
      return (
        <div className="flex flex-col gap-4">
          <Link className="text-sm font-semibold text-primary" href="/foretagsregister?tab=employees">
            Hantera i företagsregistret
          </Link>
          <div className="flex flex-col gap-2 rounded-2xl border p-4">
            <Label htmlFor="employee-name">Namn</Label>
            <Input
              id="employee-name"
              placeholder="För- och efternamn"
              value={employeeName}
              onChange={(event) => onEmployeeName(event.target.value)}
            />
            <Label htmlFor="employee-position">Befattning</Label>
            {savedPositions.length === 0 ? (
              <p className="text-sm text-muted-foreground">Lägg till en befattning först.</p>
            ) : (
              <select
                id="employee-position"
                className="h-12 w-full rounded-2xl border border-input/90 bg-card px-4 text-sm"
                value={employeePositionKey}
                onChange={(event) => onEmployeePositionKey(event.target.value)}
              >
                <option value="">Välj befattning</option>
                {savedPositions.map((position) => (
                  <option key={position.key} value={position.key}>
                    {position.name}
                  </option>
                ))}
              </select>
            )}
            <Button
              type="button"
              onClick={onAddEmployee}
              className="mt-1 w-fit"
              disabled={
                saving ||
                savedPositions.length === 0 ||
                !employeePositionKey ||
                !employeeName.trim()
              }
            >
              <Plus />
              Lägg till medarbetare
            </Button>
          </div>
          {draft.employees.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Inga medarbetare ännu. Ange namn och befattning ovan och lägg till.
            </p>
          ) : (
            <ul className="flex flex-col gap-2">
              {draft.employees.map((employee) => {
                const position =
                  savedPositions.find((item) => item.key === employee.positionKey) ??
                  draft.positions.find((item) => item.key === employee.positionKey);
                return (
                  <li
                    key={employee.key}
                    className="flex items-center justify-between gap-3 rounded-2xl border px-4 py-3"
                  >
                    <div>
                      <p className="font-medium">{employee.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {position?.name ?? "Befattning saknas"}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Chef: {employee.can_manage ? "Ja" : "Nej"} · Mentor:{" "}
                        {employee.can_mentor ? "Ja" : "Nej"}
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      disabled={saving}
                      onClick={() => onRemoveEmployee(employee.key)}
                    >
                      <Trash2 />
                    </Button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      );

    case "manager":
      return (
        <RolePicker
          employees={draft.employees}
          field="can_manage"
          emptyHint="Inga medarbetare ännu. Gå tillbaka till steget Medarbetare och lägg till dem."
          onToggle={onToggleEmployeeFlag}
        />
      );

    case "mentor":
      return (
        <RolePicker
          employees={draft.employees}
          field="can_mentor"
          emptyHint="Inga medarbetare ännu. Gå tillbaka till steget Medarbetare och lägg till dem."
          onToggle={onToggleEmployeeFlag}
        />
      );

    case "work_hours":
      return (
        <TextWithSuggestion
          id="work-hours"
          label="Arbetstider"
          placeholder="Till exempel 07.00–16.00, eller schema"
          value={draft.work_hours}
          suggestion={suggestWorkHours(draft.industry, draft.employeeCount)}
          onChange={(value) => onUpdateDraft({ work_hours: value })}
        />
      );

    case "sick_leave":
      return (
        <TextWithSuggestion
          id="sick-contact"
          label="Sjukanmälan"
          placeholder="Namn och nummer, före klockan 7"
          value={draft.sick_contact}
          suggestion={suggestSickContact(draft.industry, draft.employeeCount)}
          onChange={(value) => onUpdateDraft({ sick_contact: value })}
        />
      );

    case "safety_rep":
      return (
        <div className="flex flex-col gap-3">
          <SuggestionChip
            label={`Förslag: ${suggestSafetyRep(draft.employeeCount)}`}
            onApply={() => onUpdateDraft({ safety_rep: suggestSafetyRep(draft.employeeCount) })}
          />
          <OptionGridWithOther
            options={SAFETY_REP_OPTIONS.map((value) => ({ value, label: value }))}
            value={draft.safety_rep}
            otherLabel="Annat"
            placeholder="Skriv egen text"
            onChange={(value) => onUpdateDraft({ safety_rep: value })}
          />
        </div>
      );

    case "policies":
      return (
        <div className="flex flex-col gap-3">
          <SuggestionChip
            label={`Förslag: ${suggestPolicies(draft.employeeCount)}`}
            onApply={() => onUpdateDraft({ policies: suggestPolicies(draft.employeeCount) })}
          />
          <OptionGridWithOther
            options={POLICY_OPTIONS.map((value) => ({ value, label: value }))}
            value={draft.policies}
            otherLabel="Annat"
            placeholder="Skriv egen text"
            onChange={(value) => onUpdateDraft({ policies: value })}
          />
        </div>
      );

    case "alarm":
      return (
        <div className="flex flex-col gap-3">
          <SuggestionChip
            label={`Förslag: ${suggestAlarm(draft.industry)}`}
            onApply={() => onUpdateDraft({ has_alarm: suggestAlarm(draft.industry) })}
          />
          <OptionGridWithOther
            options={ALARM_OPTIONS.map((value) => ({ value, label: value }))}
            value={draft.has_alarm}
            otherLabel="Annat"
            placeholder="Skriv egen text"
            onChange={(value) => onUpdateDraft({ has_alarm: value })}
          />
        </div>
      );

    case "follow_up":
      return (
        <div className="flex flex-col gap-3">
          <SuggestionChip
            label={`Förslag: efter ${suggestFollowUpDays(draft.employeeCount)} dagar`}
            onApply={() => onUpdateDraft({ follow_up_days: suggestFollowUpDays(draft.employeeCount) })}
          />
          <OptionGrid
            value={draft.follow_up_days}
            onChange={(value) => onUpdateDraft({ follow_up_days: value })}
            options={FOLLOW_UP_OPTIONS.map((item) => ({ value: item.value, label: item.label }))}
          />
        </div>
      );

    case "documents":
      return (
        <div className="flex flex-col gap-4">
          <OptionGrid
            value={wantDocument}
            onChange={(value) => onWantDocument(value === "yes" ? "yes" : "no")}
            options={[
              { value: "no", label: "Nej, fortsätt", hint: "Hoppa över uppladdningen" },
              { value: "yes", label: "Ja, ladda upp", hint: "Sparas som bilaga" },
            ]}
          />
          {wantDocument === "yes" ? (
            <div className="flex flex-col gap-2">
              <Label htmlFor="guide-document">Välj fil</Label>
              <Input
                id="guide-document"
                type="file"
                disabled={saving}
                onChange={(event) => onUploadDocument(event.target.files?.[0] ?? null)}
              />
              {uploadedName ? (
                <p className="text-sm text-muted-foreground">Sparad bilaga: {uploadedName}</p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Välj en fil, eller byt till Nej, fortsätt.
                </p>
              )}
            </div>
          ) : null}
        </div>
      );

    default:
      return null;
  }
}

function RolePicker({
  employees,
  field,
  emptyHint,
  onToggle,
}: {
  employees: DraftEmployee[];
  field: "can_manage" | "can_mentor";
  emptyHint: string;
  onToggle: (key: string, field: "can_manage" | "can_mentor") => void;
}) {
  if (employees.length === 0) {
    return <p className="text-sm text-muted-foreground">{emptyHint}</p>;
  }
  return (
    <div className="flex flex-col gap-2">
      {employees.map((employee) => (
        <label
          key={employee.key}
          className={cn(
            "flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3",
            employee[field] ? "border-primary/40 bg-primary/5" : "border-border/80"
          )}
        >
          <Checkbox checked={employee[field]} onCheckedChange={() => onToggle(employee.key, field)} />
          <span className="font-medium">{employee.name}</span>
        </label>
      ))}
    </div>
  );
}

function TextWithSuggestion({
  id,
  label,
  placeholder,
  value,
  suggestion,
  onChange,
  multiline = false,
}: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  suggestion: string;
  onChange: (value: string) => void;
  multiline?: boolean;
}) {
  return (
    <div className="flex flex-col gap-3">
      {suggestion ? (
        <SuggestionChip label={`Använd förslag: ${suggestion}`} onApply={() => onChange(suggestion)} />
      ) : null}
      <div className="flex flex-col gap-2">
        <Label htmlFor={id}>{label}</Label>
        {multiline ? (
          <textarea
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className="min-h-24 w-full resize-none rounded-2xl border border-input/90 bg-card px-4 py-3 text-sm"
          />
        ) : (
          <Input
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={(event) => onChange(event.target.value)}
          />
        )}
      </div>
    </div>
  );
}
