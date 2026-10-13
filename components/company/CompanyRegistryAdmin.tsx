"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import { EmployeeManager } from "@/components/company/EmployeeManager";
import { PositionManager } from "@/components/company/PositionManager";
import { LoadingState } from "@/components/loading-state";
import { PageContainer } from "@/components/page-container";
import { useLocale } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  EMPLOYEE_COUNT_OPTIONS,
  POLICY_OPTIONS,
  SAFETY_REP_OPTIONS,
  ALARM_OPTIONS,
  FOLLOW_UP_OPTIONS,
} from "@/lib/company-setup";
import {
  loadCompanyRegistry,
  saveCompanyFacts,
  saveCompanySettings,
  type CompanyRegistrySnapshot,
  type RegistryEmployee,
  type RegistryFacts,
  type RegistryPosition,
  type RegistrySettings,
} from "@/lib/company-registry";
import { industries, industryById } from "@/lib/industries";
import { cn } from "@/lib/utils";

type TabId = "company" | "positions" | "employees";

const OTHER_INDUSTRY = "other";

function resolveIndustrySelection(industry: string): {
  selected: string;
  custom: string;
} {
  if (!industry || industryById(industry)) {
    return { selected: industry || "general", custom: "" };
  }
  return { selected: OTHER_INDUSTRY, custom: industry };
}

function FreeTextOptionField({
  label,
  options,
  value,
  otherLabel,
  onChange,
}: {
  label: string;
  options: readonly string[];
  value: string;
  otherLabel: string;
  onChange: (value: string) => void;
}) {
  const known = options.includes(value as (typeof options)[number]);
  const [forceOther, setForceOther] = useState(!known && Boolean(value));
  const [custom, setCustom] = useState(known ? "" : value);
  const showOther = forceOther || (!known && Boolean(value));

  useEffect(() => {
    if (!options.includes(value as (typeof options)[number])) {
      setCustom(value);
      if (value) setForceOther(true);
    } else {
      setForceOther(false);
    }
  }, [value, options]);

  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className={cn(
              "rounded-2xl border px-4 py-3 text-left text-sm transition",
              !showOther && value === option
                ? "border-primary bg-primary/5"
                : "border-border bg-card hover:border-primary/25"
            )}
            onClick={() => {
              setForceOther(false);
              onChange(option);
            }}
          >
            {option}
          </button>
        ))}
        <button
          type="button"
          className={cn(
            "rounded-2xl border px-4 py-3 text-left text-sm transition",
            showOther
              ? "border-primary bg-primary/5"
              : "border-border bg-card hover:border-primary/25"
          )}
          onClick={() => {
            setForceOther(true);
            onChange(custom.trim());
          }}
        >
          {otherLabel}
        </button>
      </div>
      {showOther ? (
        <Input
          value={custom}
          placeholder={otherLabel}
          onChange={(event) => {
            setCustom(event.target.value);
            onChange(event.target.value);
          }}
        />
      ) : null}
    </div>
  );
}

export function CompanyRegistryAdmin() {
  const { t } = useLocale();
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get("tab") as TabId | null) ?? "company";
  const [tab, setTab] = useState<TabId>(
    initialTab === "positions" || initialTab === "employees" ? initialTab : "company"
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [organizationId, setOrganizationId] = useState<string | null>(null);
  const [settings, setSettings] = useState<RegistrySettings>({
    companyName: "",
    orgNumber: "",
    industry: "general",
    employeeCount: "",
  });
  const [facts, setFacts] = useState<RegistryFacts>({
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
  });
  const [positions, setPositions] = useState<RegistryPosition[]>([]);
  const [employees, setEmployees] = useState<RegistryEmployee[]>([]);
  const industrySelection = useMemo(
    () => resolveIndustrySelection(settings.industry),
    [settings.industry]
  );
  const [industryCustom, setIndustryCustom] = useState(industrySelection.custom);

  useEffect(() => {
    const requested = searchParams.get("tab");
    if (requested === "positions" || requested === "employees" || requested === "company") {
      setTab(requested);
    }
  }, [searchParams]);

  useEffect(() => {
    void (async () => {
      setLoading(true);
      try {
        const result = await loadCompanyRegistry();
        if (!result.ok) {
          setError(result.message);
          return;
        }
        applySnapshot(result.data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : t("registry.loadError"));
      } finally {
        setLoading(false);
      }
    })();
  }, [t]);

  function applySnapshot(snapshot: CompanyRegistrySnapshot) {
    setOrganizationId(snapshot.organizationId);
    setSettings(snapshot.settings);
    setFacts(snapshot.facts);
    setPositions(snapshot.positions);
    setEmployees(snapshot.employees);
    const resolved = resolveIndustrySelection(snapshot.settings.industry);
    setIndustryCustom(resolved.custom);
  }

  async function handleSaveCompany() {
    if (!organizationId) return;
    setSaving(true);
    try {
      const industryValue =
        industrySelection.selected === OTHER_INDUSTRY
          ? industryCustom.trim() || OTHER_INDUSTRY
          : settings.industry;
      const nextSettings = { ...settings, industry: industryValue };
      await saveCompanySettings(organizationId, nextSettings);
      await saveCompanyFacts(organizationId, facts);
      setSettings(nextSettings);
      toast.success(t("registry.companySaved"));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t("registry.companySaveError"));
    } finally {
      setSaving(false);
    }
  }

  const tabs: { id: TabId; label: string }[] = [
    { id: "company", label: t("registry.tabCompany") },
    { id: "positions", label: t("registry.tabPositions") },
    { id: "employees", label: t("registry.tabEmployees") },
  ];

  if (loading) {
    return (
      <PageContainer>
        <LoadingState label={t("common.loading")} />
      </PageContainer>
    );
  }

  if (error || !organizationId) {
    return (
      <PageContainer className="flex flex-col gap-4">
        <Button variant="ghost" size="sm" className="-ml-3 w-fit" asChild>
          <Link href="/">
            <ArrowLeft />
            {t("common.back")}
          </Link>
        </Button>
        <h1 className="text-2xl font-semibold">{t("nav.registry")}</h1>
        <p className="text-sm text-muted-foreground">{error ?? t("registry.loadError")}</p>
        <Button asChild className="w-fit">
          <Link href="/register">{t("nav.setup")}</Link>
        </Button>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Button variant="ghost" size="sm" className="-ml-3 mb-2 w-fit" asChild>
            <Link href="/foretag">
              <ArrowLeft />
              {t("company.overviewTitle")}
            </Link>
          </Button>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/70">
            {t("nav.registry")}
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            {t("registry.pageTitle")}
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            {t("registry.pageDescription")}
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/foretag">{t("nav.companyOverview")}</Link>
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {tabs.map((item) => (
          <Button
            key={item.id}
            type="button"
            variant={tab === item.id ? "default" : "outline"}
            size="sm"
            onClick={() => setTab(item.id)}
          >
            {item.label}
          </Button>
        ))}
      </div>

      {tab === "company" ? (
        <div className="flex flex-col gap-5 rounded-3xl border border-border bg-card p-5 pb-24 sm:p-6 sm:pb-24">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="company-name">{t("company.name")}</Label>
              <Input
                id="company-name"
                value={settings.companyName}
                onChange={(event) =>
                  setSettings((current) => ({ ...current, companyName: event.target.value }))
                }
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="org-number">{t("company.orgNumber")}</Label>
              <Input
                id="org-number"
                value={settings.orgNumber}
                onChange={(event) =>
                  setSettings((current) => ({ ...current, orgNumber: event.target.value }))
                }
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label>{t("company.industry")}</Label>
            <div className="grid gap-2 sm:grid-cols-2">
              {industries.map((industry) => (
                <button
                  key={industry.id}
                  type="button"
                  className={cn(
                    "rounded-2xl border px-4 py-3 text-left text-sm transition",
                    industrySelection.selected === industry.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/25"
                  )}
                  onClick={() => {
                    setSettings((current) => ({ ...current, industry: industry.id }));
                    setIndustryCustom("");
                  }}
                >
                  {industry.name}
                </button>
              ))}
              <button
                type="button"
                className={cn(
                  "rounded-2xl border px-4 py-3 text-left text-sm transition",
                  industrySelection.selected === OTHER_INDUSTRY
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/25"
                )}
                onClick={() => {
                  setSettings((current) => ({
                    ...current,
                    industry: industryCustom.trim() || OTHER_INDUSTRY,
                  }));
                }}
              >
                {t("common.other")}
              </button>
            </div>
            {industrySelection.selected === OTHER_INDUSTRY ? (
              <Input
                value={industryCustom}
                placeholder={t("registry.customIndustry")}
                onChange={(event) => {
                  setIndustryCustom(event.target.value);
                  setSettings((current) => ({
                    ...current,
                    industry: event.target.value.trim() || OTHER_INDUSTRY,
                  }));
                }}
              />
            ) : null}
          </div>

          <div className="flex flex-col gap-2">
            <Label>{t("company.size")}</Label>
            <div className="grid gap-2 sm:grid-cols-3">
              {EMPLOYEE_COUNT_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={cn(
                    "rounded-2xl border px-4 py-3 text-left text-sm transition",
                    settings.employeeCount === option
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/25"
                  )}
                  onClick={() =>
                    setSettings((current) => ({ ...current, employeeCount: option }))
                  }
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="work-hours">{t("company.workHours")}</Label>
              <Input
                id="work-hours"
                value={facts.workHours}
                onChange={(event) =>
                  setFacts((current) => ({ ...current, workHours: event.target.value }))
                }
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="sick-contact">{t("company.sickContact")}</Label>
              <Input
                id="sick-contact"
                value={facts.sickContact}
                onChange={(event) =>
                  setFacts((current) => ({ ...current, sickContact: event.target.value }))
                }
              />
            </div>
          </div>

          <FreeTextOptionField
            label={t("company.safetyRep")}
            options={SAFETY_REP_OPTIONS}
            value={facts.safetyRep}
            otherLabel={t("common.other")}
            onChange={(value) => setFacts((current) => ({ ...current, safetyRep: value.trim() }))}
          />
          <FreeTextOptionField
            label={t("company.policiesHeading")}
            options={POLICY_OPTIONS}
            value={facts.policies}
            otherLabel={t("common.other")}
            onChange={(value) => setFacts((current) => ({ ...current, policies: value.trim() }))}
          />
          <FreeTextOptionField
            label={t("company.alarm")}
            options={ALARM_OPTIONS}
            value={facts.hasAlarm}
            otherLabel={t("common.other")}
            onChange={(value) => setFacts((current) => ({ ...current, hasAlarm: value.trim() }))}
          />

          <div className="flex flex-col gap-2">
            <Label>{t("company.followUp")}</Label>
            <div className="grid gap-2 sm:grid-cols-3">
              {FOLLOW_UP_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={cn(
                    "rounded-2xl border px-4 py-3 text-left text-sm transition",
                    facts.followUpDays === option.value
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/25"
                  )}
                  onClick={() =>
                    setFacts((current) => ({ ...current, followUpDays: option.value }))
                  }
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <Button
            type="button"
            className="hidden w-fit sm:inline-flex"
            disabled={saving}
            onClick={() => void handleSaveCompany()}
          >
            {saving ? t("common.loading") : t("common.save")}
          </Button>
        </div>
      ) : null}

      {tab === "company" ? (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 backdrop-blur sm:hidden">
          <Button
            type="button"
            className="w-full"
            disabled={saving}
            onClick={() => void handleSaveCompany()}
          >
            {saving ? t("common.loading") : t("stickySave")}
          </Button>
        </div>
      ) : null}

      {tab === "positions" ? (
        <PositionManager
          organizationId={organizationId}
          positions={positions}
          onChange={setPositions}
        />
      ) : null}

      {tab === "employees" ? (
        <EmployeeManager
          organizationId={organizationId}
          positions={positions}
          employees={employees}
          onChange={setEmployees}
        />
      ) : null}
    </PageContainer>
  );
}
