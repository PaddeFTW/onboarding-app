"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Building2, Users, Briefcase, Shield, UserCheck } from "lucide-react";

import { LoadingState } from "@/components/loading-state";
import { PageContainer } from "@/components/page-container";
import { useLocale } from "@/components/providers/locale-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  industryDisplayName,
  loadCompanyRegistry,
  type CompanyRegistrySnapshot,
} from "@/lib/company-registry";
import { listEvents } from "@/lib/history";
import { listGuidedInstances } from "@/lib/supabase/guided-repository";

type IntroRow = Awaited<ReturnType<typeof listGuidedInstances>>[number];
type EventRow = Awaited<ReturnType<typeof listEvents>>[number];

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: typeof Users;
}) {
  return (
    <Card>
      <CardContent className="flex items-center gap-3 pt-6">
        <div className="flex size-10 items-center justify-center rounded-2xl border border-border bg-muted text-muted-foreground">
          <Icon className="size-4" />
        </div>
        <div>
          <p className="text-2xl font-semibold tabular-nums">{value}</p>
          <p className="text-xs text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 border-b border-border/70 py-3 last:border-0 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-sm font-medium sm:text-right">{value.trim() || "—"}</p>
    </div>
  );
}

export function CompanyOverview() {
  const { t } = useLocale();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [registryMissing, setRegistryMissing] = useState(false);
  const [snapshot, setSnapshot] = useState<CompanyRegistrySnapshot | null>(null);
  const [intros, setIntros] = useState<IntroRow[]>([]);
  const [events, setEvents] = useState<EventRow[]>([]);

  useEffect(() => {
    void (async () => {
      setLoading(true);
      try {
        const result = await loadCompanyRegistry();
        if (!result.ok) {
          setRegistryMissing(result.registryMissing);
          setError(result.message);
          setSnapshot(null);
          return;
        }
        setSnapshot(result.data);
        setError(null);

        const [guided, history] = await Promise.all([
          listGuidedInstances().catch(() => []),
          listEvents().catch(() => []),
        ]);
        setIntros(guided);
        setEvents(history.slice(0, 5));
      } catch (err) {
        setError(err instanceof Error ? err.message : t("company.overviewLoadError"));
      } finally {
        setLoading(false);
      }
    })();
  }, [t]);

  const introCounts = useMemo(() => {
    const ongoing = intros.filter((item) => item.status === "ongoing").length;
    const notStarted = intros.filter((item) => item.status === "notStarted").length;
    const completed = intros.filter((item) => item.status === "completed").length;
    return { ongoing, notStarted, completed };
  }, [intros]);

  const recentIntros = useMemo(() => intros.slice(0, 5), [intros]);

  if (loading) {
    return (
      <PageContainer>
        <LoadingState label={t("common.loading")} />
      </PageContainer>
    );
  }

  if (registryMissing || error || !snapshot) {
    return (
      <PageContainer className="flex flex-col gap-4">
        <Button variant="ghost" size="sm" className="-ml-3 w-fit" asChild>
          <Link href="/">
            <ArrowLeft />
            {t("common.back")}
          </Link>
        </Button>
        <h1 className="text-2xl font-semibold">{t("company.overviewTitle")}</h1>
        <p className="text-sm text-muted-foreground">
          {error ?? t("company.overviewLoadError")}
        </p>
        <div className="flex flex-wrap gap-2">
          <Button asChild>
            <Link href="/register">{t("nav.setup")}</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/foretagsregister">{t("nav.registry")}</Link>
          </Button>
        </div>
      </PageContainer>
    );
  }

  const { settings, facts, stats } = snapshot;
  const rules = [
    facts.workHours ? `${t("company.workHours")}: ${facts.workHours}` : null,
    facts.sickContact ? `${t("company.sickContact")}: ${facts.sickContact}` : null,
    facts.safetyRep ? `${t("company.safetyRep")}: ${facts.safetyRep}` : null,
    facts.hasAlarm ? `${t("company.alarm")}: ${facts.hasAlarm}` : null,
    facts.followUpDays
      ? `${t("company.followUp")}: ${facts.followUpDays} ${t("company.days")}`
      : null,
  ].filter(Boolean) as string[];

  const firstDayFacts = [
    { label: t("company.startDate"), value: facts.startDate },
    { label: t("company.startPlace"), value: facts.startPlace },
    { label: t("company.firstDay"), value: facts.firstDay },
    { label: t("company.accounts"), value: facts.accounts },
    { label: t("company.equipment"), value: facts.equipment },
  ].filter((item) => item.value.trim());

  const readiness: string[] = [];
  if (stats.managerCount === 0) readiness.push(t("company.readinessNoManagers"));
  if (stats.mentorCount === 0) readiness.push(t("company.readinessNoMentors"));
  if (!facts.policies.trim()) readiness.push(t("company.readinessNoPolicies"));
  if (!facts.workHours.trim()) readiness.push(t("company.readinessNoHours"));

  function statusLabel(status: IntroRow["status"]) {
    if (status === "completed") return t("home.statusCompleted");
    if (status === "ongoing") return t("home.statusOngoing");
    return t("home.statusNotStarted");
  }

  return (
    <PageContainer className="flex flex-col gap-8 pb-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Button variant="ghost" size="sm" className="-ml-3 mb-2 w-fit" asChild>
            <Link href="/">
              <ArrowLeft />
              {t("common.back")}
            </Link>
          </Button>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/70">
            {t("nav.company")}
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            {settings.companyName.trim() || t("company.overviewTitle")}
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            {t("company.overviewDescription")}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" asChild>
            <Link href="/onboarding/new">{t("company.startIntro")}</Link>
          </Button>
          <Button asChild>
            <Link href="/foretagsregister">{t("nav.openRegistry")}</Link>
          </Button>
        </div>
      </div>

      {readiness.length > 0 ? (
        <section className="rounded-3xl border border-warning/30 bg-warning-subtle/40 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-warning">
            {t("company.readinessHeading")}
          </p>
          <ul className="mt-2 flex flex-col gap-1">
            {readiness.map((item) => (
              <li key={item} className="text-sm">
                {item}
              </li>
            ))}
          </ul>
          <Button className="mt-3" size="sm" variant="outline" asChild>
            <Link href="/foretagsregister">{t("nav.openRegistry")}</Link>
          </Button>
        </section>
      ) : null}

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label={t("company.statEmployees")} value={stats.employeeCount} icon={Users} />
        <StatCard label={t("company.statPositions")} value={stats.positionCount} icon={Briefcase} />
        <StatCard label={t("company.statManagers")} value={stats.managerCount} icon={Shield} />
        <StatCard label={t("company.statMentors")} value={stats.mentorCount} icon={UserCheck} />
      </section>

      <section className="rounded-3xl border border-border bg-card p-5 text-card-foreground">
        <h2 className="font-semibold">{t("company.introStats")}</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-muted/30 px-4 py-3">
            <p className="text-2xl font-semibold tabular-nums">{introCounts.ongoing}</p>
            <p className="text-xs text-muted-foreground">{t("company.introOngoing")}</p>
          </div>
          <div className="rounded-2xl border border-border bg-muted/30 px-4 py-3">
            <p className="text-2xl font-semibold tabular-nums">{introCounts.notStarted}</p>
            <p className="text-xs text-muted-foreground">{t("company.introNotStarted")}</p>
          </div>
          <div className="rounded-2xl border border-border bg-muted/30 px-4 py-3">
            <p className="text-2xl font-semibold tabular-nums">{introCounts.completed}</p>
            <p className="text-xs text-muted-foreground">{t("company.introCompleted")}</p>
          </div>
        </div>
      </section>

      <section>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary/70">
          {t("company.quickActions")}
        </p>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/medarbetare">{t("company.openEmployees")}</Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/policyer">{t("company.openPolicies")}</Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/historik">{t("nav.history")}</Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/ordlista">{t("nav.glossary")}</Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardContent className="pt-6">
            <div className="mb-2 flex items-center gap-2">
              <Building2 className="size-4 text-primary" />
              <h2 className="font-semibold">{t("company.detailsHeading")}</h2>
            </div>
            <DetailRow label={t("company.name")} value={settings.companyName} />
            <DetailRow label={t("company.orgNumber")} value={settings.orgNumber} />
            <DetailRow
              label={t("company.industry")}
              value={industryDisplayName(settings.industry)}
            />
            <DetailRow label={t("company.size")} value={settings.employeeCount} />
            {firstDayFacts.map((item) => (
              <DetailRow key={item.label} label={item.label} value={item.value} />
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="mb-2 font-semibold">{t("company.policiesHeading")}</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {facts.policies.trim() || t("company.policiesEmpty")}
            </p>
            <h2 className="mb-2 mt-6 font-semibold">{t("company.rulesHeading")}</h2>
            {rules.length === 0 ? (
              <p className="text-sm text-muted-foreground">{t("company.rulesEmpty")}</p>
            ) : (
              <ul className="flex flex-col gap-2">
                {rules.map((rule) => (
                  <li
                    key={rule}
                    className="rounded-xl border border-border bg-muted/40 px-3 py-2 text-sm"
                  >
                    {rule}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardContent className="flex flex-col gap-3 pt-6">
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-semibold">{t("company.recentIntros")}</h2>
              <Button variant="outline" size="sm" asChild>
                <Link href="/">{t("common.open")}</Link>
              </Button>
            </div>
            {recentIntros.length === 0 ? (
              <p className="text-sm text-muted-foreground">{t("company.noIntros")}</p>
            ) : (
              recentIntros.map((item) => (
                <Link
                  key={item.id}
                  href={`/onboarding/guided/${item.id}`}
                  className="rounded-2xl border border-border px-4 py-3 transition hover:bg-muted/40"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-medium">{item.participantName}</p>
                    <Badge variant="outline">{statusLabel(item.status)}</Badge>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.templateLabel || item.title}
                    {item.status !== "completed" ? ` · ${item.progress}%` : ""}
                  </p>
                </Link>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col gap-3 pt-6">
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-semibold">{t("company.recentActivity")}</h2>
              <Button variant="outline" size="sm" asChild>
                <Link href="/historik">{t("nav.history")}</Link>
              </Button>
            </div>
            {events.length === 0 ? (
              <p className="text-sm text-muted-foreground">{t("history.empty")}</p>
            ) : (
              events.map((event) => (
                <div
                  key={event.id}
                  className="rounded-2xl border border-border px-4 py-3"
                >
                  <p className="text-sm">{event.summary}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {new Date(event.created_at).toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </section>
    </PageContainer>
  );
}
