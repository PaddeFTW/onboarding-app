"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Search } from "lucide-react";

import { StartIntroductionPanel } from "@/components/company/StartIntroductionPanel";
import { LoadingState } from "@/components/loading-state";
import { PageContainer } from "@/components/page-container";
import { useLocale } from "@/components/providers/locale-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  loadCompanyRegistry,
  type RegistryEmployee,
} from "@/lib/company-registry";
import { listGuidedInstances } from "@/lib/supabase/guided-repository";

type IntroStatus = "none" | "notStarted" | "ongoing" | "completed";

export default function MedarbetarePage() {
  const { t } = useLocale();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [employees, setEmployees] = useState<RegistryEmployee[]>([]);
  const [introByName, setIntroByName] = useState<Record<string, IntroStatus>>({});
  const [introIdByName, setIntroIdByName] = useState<Record<string, string>>({});
  const [query, setQuery] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [prefillEmployee, setPrefillEmployee] = useState<RegistryEmployee | null>(
    null
  );

  async function reload() {
    setLoading(true);
    try {
      const [registry, guided] = await Promise.all([
        loadCompanyRegistry(),
        listGuidedInstances().catch(() => []),
      ]);
      if (!registry.ok) {
        setError(registry.message);
        setEmployees([]);
        return;
      }
      setEmployees(registry.data.employees);
      setError(null);

      const statusMap: Record<string, IntroStatus> = {};
      const idMap: Record<string, string> = {};
      for (const employee of registry.data.employees) {
        statusMap[employee.name] = "none";
      }
      for (const intro of guided) {
        const current = statusMap[intro.participantName] ?? "none";
        const rank = { none: 0, notStarted: 1, ongoing: 2, completed: 3 } as const;
        const next = intro.status as Exclude<IntroStatus, "none">;
        if (rank[next] >= rank[current]) {
          statusMap[intro.participantName] = next;
          idMap[intro.participantName] = intro.id;
        }
      }
      setIntroByName(statusMap);
      setIntroIdByName(idMap);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("registry.loadError"));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return employees;
    return employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(needle) ||
        employee.positionName.toLowerCase().includes(needle)
    );
  }, [employees, query]);

  function introLabel(status: IntroStatus) {
    if (status === "completed") return t("home.statusCompleted");
    if (status === "ongoing") return t("home.statusOngoing");
    if (status === "notStarted") return t("home.statusNotStarted");
    return null;
  }

  function openStart(employee?: RegistryEmployee) {
    setPrefillEmployee(employee ?? null);
    setPanelOpen(true);
  }

  if (loading) {
    return (
      <PageContainer>
        <LoadingState label={t("common.loading")} />
      </PageContainer>
    );
  }

  return (
    <PageContainer className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Button variant="ghost" size="sm" className="-ml-3 mb-2 w-fit" asChild>
            <Link href="/">
              <ArrowLeft />
              {t("common.back")}
            </Link>
          </Button>
          <h1 className="text-3xl font-semibold tracking-tight">{t("employeesPage.title")}</h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            {t("employeesPage.description")}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button type="button" onClick={() => openStart()}>
            <Plus />
            {t("company.startIntro")}
          </Button>
          <Button variant="outline" asChild>
            <Link href="/foretagsregister?tab=employees">{t("employeesPage.openRegistry")}</Link>
          </Button>
        </div>
      </div>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      {panelOpen ? (
        <StartIntroductionPanel
          prefillEmployee={prefillEmployee}
          onCancel={() => {
            setPanelOpen(false);
            setPrefillEmployee(null);
          }}
          onStarted={() => {
            setPanelOpen(false);
            setPrefillEmployee(null);
            void reload();
          }}
        />
      ) : null}

      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="pl-9"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t("employeesPage.searchPlaceholder")}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border px-4 py-8 text-center">
          <p className="text-sm text-muted-foreground">{t("employeesPage.empty")}</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <Button type="button" onClick={() => openStart()}>
              {t("company.startIntro")}
            </Button>
            <Button variant="outline" asChild>
              <Link href="/foretagsregister?tab=employees">{t("employeesPage.openRegistry")}</Link>
            </Button>
          </div>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {filtered.map((employee) => {
            const status = introByName[employee.name] ?? "none";
            const label = introLabel(status);
            const introId = introIdByName[employee.name];
            return (
              <li
                key={employee.id}
                className="rounded-3xl border border-border bg-card px-4 py-4 text-card-foreground"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <p className="font-semibold">{employee.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {employee.positionName || t("home.positionMissing")}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {employee.canManage ? (
                        <Badge variant="outline">{t("registry.manager")}</Badge>
                      ) : null}
                      {employee.canMentor ? (
                        <Badge variant="outline">{t("registry.mentor")}</Badge>
                      ) : null}
                      {label ? <Badge variant="outline">{label}</Badge> : null}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {introId && status !== "none" ? (
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/onboarding/guided/${introId}`}>
                          {status === "completed"
                            ? t("home.openReceipt")
                            : t("home.openIntroduction")}
                        </Link>
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        type="button"
                        onClick={() => openStart(employee)}
                      >
                        {t("company.startIntro")}
                      </Button>
                    )}
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/foretagsregister?tab=employees">{t("common.open")}</Link>
                    </Button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </PageContainer>
  );
}
