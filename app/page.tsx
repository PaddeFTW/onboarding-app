"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { CompanyMissingPrompt } from "@/components/company/CompanyMissingPrompt";
import { PageContainer } from "@/components/page-container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { useLocale } from "@/components/providers/locale-provider";
import { questionText } from "@/lib/i18n";
import { loadCompanyReadiness } from "@/lib/company-readiness";
import {
  followUpDateLabel,
  getVisibleSteps,
  responsibleNames,
  type OnboardingInstance,
} from "@/lib/onboarding-steps";
import { REGISTRY_MISSING_MESSAGE } from "@/lib/registry-errors";
import { listGuidedInstances } from "@/lib/supabase/guided-repository";
import { createClient } from "@/lib/supabase/client";

type HomeMode = "registry-missing" | "no-company" | "ready" | "ongoing";

const FIRST_VISIT_KEY = "foretagsguiden-oppnad";

function statusBadge(
  status: OnboardingInstance["status"],
  labels: { ongoing: string; notStarted: string; completed: string }
) {
  if (status === "completed") return labels.completed;
  if (status === "ongoing") return labels.ongoing;
  return labels.notStarted;
}

export default function HomePage() {
  const router = useRouter();
  const { t, locale } = useLocale();
  const [ready, setReady] = useState(false);
  const [companySaved, setCompanySaved] = useState(false);
  const [registryMissing, setRegistryMissing] = useState(false);
  const [stayWithoutCompany, setStayWithoutCompany] = useState(false);
  const [managerCount, setManagerCount] = useState(0);
  const [mentorCount, setMentorCount] = useState(0);
  const [rows, setRows] = useState<Awaited<ReturnType<typeof listGuidedInstances>>>([]);
  const [positions, setPositions] = useState<Record<string, string>>({});

  useEffect(() => {
    void (async () => {
      try {
        const [readiness, guidedRows] = await Promise.all([
          loadCompanyReadiness(),
          listGuidedInstances(),
        ]);

        if (readiness.registryMissing) {
          setRegistryMissing(true);
          setCompanySaved(false);
          setRows([]);
          setPositions({});
          return;
        }

        setCompanySaved(readiness.ready);
        setRows(guidedRows);

        if (!readiness.hasCompanyName) {
          const alreadyOpened =
            typeof window !== "undefined" &&
            window.sessionStorage.getItem(FIRST_VISIT_KEY) === "1";
          if (!alreadyOpened) {
            window.sessionStorage.setItem(FIRST_VISIT_KEY, "1");
            router.replace("/register");
            return;
          }
        }

        const supabase = createClient();
        const { data: employeeResult } = await supabase
          .from("employees")
          .select("name,can_manage,can_mentor,positions(name)");
        const positionByEmployee: Record<string, string> = {};
        let managers = 0;
        let mentors = 0;
        for (const employee of employeeResult ?? []) {
          const relation = Array.isArray(employee.positions)
            ? employee.positions[0]
            : employee.positions;
          positionByEmployee[employee.name] = relation?.name ?? "";
          if (employee.can_manage) managers += 1;
          if (employee.can_mentor) mentors += 1;
        }
        setPositions(positionByEmployee);
        setManagerCount(managers);
        setMentorCount(mentors);
      } catch {
        setCompanySaved(false);
      } finally {
        setReady(true);
      }
    })();
  }, [router]);

  const ongoing = rows.filter((item) => item.status === "ongoing");
  const notStarted = rows.filter((item) => item.status === "notStarted");
  const completed = rows.filter((item) => item.status === "completed");
  const current = ongoing[0] ?? notStarted[0];
  const nextStep = current?.steps.find(
    (step) => step.status !== "completed" && step.status !== "skipped"
  );
  const names = current ? responsibleNames(current) : null;
  const position =
    current?.templateLabel ||
    (current ? positions[current.participantName] : "") ||
    t("home.positionMissing");
  const nextQuestionTitle =
    (nextStep?.id ? questionText(locale, nextStep.id, "title") : undefined) ??
    nextStep?.title ??
    t("home.introductionDone");

  const warnings = useMemo(() => {
    const items: string[] = [];
    if (companySaved && managerCount === 0) items.push(t("home.noManagersWarning"));
    if (companySaved && mentorCount === 0) items.push(t("home.noMentorsWarning"));
    return items;
  }, [companySaved, managerCount, mentorCount, t]);

  const mode: HomeMode = registryMissing
    ? "registry-missing"
    : !companySaved
      ? "no-company"
      : ongoing.length > 0 || notStarted.length > 0
        ? "ongoing"
        : "ready";

  const headline =
    mode === "registry-missing"
      ? t("home.registryMissingTitle")
      : mode === "no-company"
        ? t("home.noCompanyTitle")
        : mode === "ongoing"
          ? t("home.ongoingTitle")
          : t("home.readyTitle");

  const description =
    mode === "registry-missing"
      ? REGISTRY_MISSING_MESSAGE
      : mode === "no-company"
        ? t("home.noCompanyDescription")
        : mode === "ongoing"
          ? t("home.ongoingDescription")
          : t("home.readyDescription");

  const statusLabels = {
    ongoing: t("home.statusOngoing"),
    notStarted: t("home.statusNotStarted"),
    completed: t("home.statusCompleted"),
  };

  function IntroCard({
    item,
    emphasize,
  }: {
    item: (typeof rows)[number];
    emphasize?: boolean;
  }) {
    const visible = getVisibleSteps(item);
    const done = visible.filter(
      (step) => step.status === "completed" || step.status === "skipped"
    ).length;
    const itemPosition =
      item.templateLabel || positions[item.participantName] || t("home.positionMissing");
    const followUp =
      item.status === "completed" ? followUpDateLabel(item) : null;

    return (
      <div
        className={`flex flex-col gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-card-foreground ${
          emphasize ? "border-primary/30 bg-primary/5" : ""
        }`}
      >
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-semibold">{item.participantName}</p>
              <Badge variant="outline">
                {statusBadge(item.status, statusLabels)}
              </Badge>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{itemPosition}</p>
            {followUp ? (
              <p className="mt-1 text-xs text-muted-foreground">
                {t("home.followUpDue", { date: followUp })}
              </p>
            ) : null}
          </div>
          <Button variant={emphasize ? "default" : "outline"} size="sm" asChild>
            <Link href={`/onboarding/guided/${item.id}`}>
              {item.status === "completed"
                ? t("home.openReceipt")
                : t("home.openIntroduction")}
            </Link>
          </Button>
        </div>
        {item.status !== "completed" ? (
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>
                {t("home.progressLabel", { done, total: visible.length || 1 })}
              </span>
              <span>{item.progress}%</span>
            </div>
            <Progress value={item.progress} className="h-1.5" />
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <PageContainer className="flex flex-col gap-8">
      <header className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/70">
              {t("nav.workspace")}
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              {headline}
            </h1>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">{description}</p>
            {companySaved && rows.length > 0 ? (
              <p className="mt-2 text-xs text-muted-foreground">
                {t("home.introSummary", {
                  ongoing: ongoing.length + notStarted.length,
                  completed: completed.length,
                })}
              </p>
            ) : null}
          </div>
          <SignOutButton />
        </div>
        {mode === "registry-missing" ? null : mode === "no-company" ? null : (
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" asChild>
              <Link href="/foretag">{t("nav.company")}</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/medarbetare">{t("home.openEmployees")}</Link>
            </Button>
            <Button asChild>
              <Link href="/onboarding/new">
                <Plus />
                {t("nav.newIntroduction")}
              </Link>
            </Button>
          </div>
        )}
      </header>

      {warnings.length > 0 ? (
        <section className="rounded-3xl border border-warning/30 bg-warning-subtle/40 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-warning">
            {t("home.needsAttention")}
          </p>
          <ul className="mt-2 flex flex-col gap-1">
            {warnings.map((warning) => (
              <li key={warning} className="text-sm text-foreground">
                {warning}
              </li>
            ))}
          </ul>
          <Button className="mt-3" size="sm" variant="outline" asChild>
            <Link href="/foretagsregister?tab=employees">{t("nav.openRegistry")}</Link>
          </Button>
        </section>
      ) : null}

      <section className="rounded-3xl border border-border bg-primary/5 p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary/80">
          {t("nav.whatDoINeed")}
        </p>
        {!ready ? (
          <p className="mt-3 text-sm">{t("common.loading")}</p>
        ) : mode === "registry-missing" ? (
          <p className="mt-3 text-sm text-muted-foreground">{REGISTRY_MISSING_MESSAGE}</p>
        ) : mode === "no-company" ? (
          <div className="mt-3">
            {stayWithoutCompany ? (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">{t("home.stayLater")}</p>
                <Button asChild>
                  <Link href="/register">{t("home.openSetup")}</Link>
                </Button>
              </div>
            ) : (
              <CompanyMissingPrompt onStay={() => setStayWithoutCompany(true)} />
            )}
          </div>
        ) : current && names ? (
          <div className="mt-3 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-semibold">{current.participantName}</h2>
              <p className="text-sm text-muted-foreground">
                {t("home.positionLabel", { value: position })}
              </p>
              <p className="text-sm text-muted-foreground">
                {t("home.managerLabel", { value: names.managerName })}
              </p>
              <p className="text-sm text-muted-foreground">
                {t("home.mentorLabel", { value: names.mentorName })}
              </p>
              <p className="text-sm text-muted-foreground">
                {t("home.nextQuestion", { value: nextQuestionTitle })}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button asChild>
                <Link href={`/onboarding/guided/${current.id}`}>
                  {t("home.openIntroduction")}
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/onboarding/new">
                  <Plus />
                  {t("nav.newIntroduction")}
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">{t("home.setupSaved")}</p>
            <Button asChild>
              <Link href="/onboarding/new">
                <Plus />
                {t("nav.newIntroduction")}
              </Link>
            </Button>
          </div>
        )}
      </section>

<<<<<<< HEAD
      <section className="grid gap-3 sm:grid-cols-3">
        <Link className="rounded-2xl border p-4" href="/ordlista"><p className="text-xs font-semibold uppercase tracking-wider text-primary/70">Vad betyder orden?</p><p className="mt-2 font-semibold">Kunskapsbank</p></Link>
        <Link className="rounded-2xl border p-4" href="/policyer"><p className="text-xs font-semibold uppercase tracking-wider text-primary/70">Policyer</p><p className="mt-2 font-semibold">Företagets regler</p></Link>
        <Link className="rounded-2xl border p-4" href="/historik"><p className="text-xs font-semibold uppercase tracking-wider text-primary/70">Vad har hänt?</p><p className="mt-2 font-semibold">Historik</p></Link>
      </section>
=======
      {ongoing.length > 0 ? (
        <section className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary/70">
            {t("home.statusOngoing")}
          </p>
          {ongoing.map((item) => (
            <IntroCard key={item.id} item={item} emphasize={item.id === current?.id} />
          ))}
        </section>
      ) : null}

      {notStarted.length > 0 ? (
        <section className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary/70">
            {t("home.notStartedHeading")}
          </p>
          {notStarted.map((item) => (
            <IntroCard key={item.id} item={item} />
          ))}
        </section>
      ) : null}

      {completed.length > 0 ? (
        <section className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary/70">
            {t("home.completedHeading")}
          </p>
          {completed.map((item) => (
            <IntroCard key={item.id} item={item} />
          ))}
        </section>
      ) : null}

      {mode !== "no-company" ? (
        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            className="rounded-2xl border border-border bg-card p-4 text-card-foreground"
            href="/foretag"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-primary/70">
              {t("nav.company")}
            </p>
            <p className="mt-2 font-semibold">{t("nav.companyOverview")}</p>
          </Link>
          <Link
            className="rounded-2xl border border-border bg-card p-4 text-card-foreground"
            href="/medarbetare"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-primary/70">
              {t("employeesPage.title")}
            </p>
            <p className="mt-2 font-semibold">{t("home.openEmployees")}</p>
          </Link>
          <Link
            className="rounded-2xl border border-border bg-card p-4 text-card-foreground"
            href="/foretagsregister"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-primary/70">
              {t("nav.registry")}
            </p>
            <p className="mt-2 font-semibold">{t("nav.openRegistry")}</p>
          </Link>
          <Link
            className="rounded-2xl border border-border bg-card p-4 text-card-foreground"
            href="/moduler"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-primary/70">
              {t("nav.whatDoIKnow")}
            </p>
            <p className="mt-2 font-semibold">{t("nav.modules")}</p>
          </Link>
          <Link
            className="rounded-2xl border border-border bg-card p-4 text-card-foreground"
            href="/policyer"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-primary/70">
              {t("nav.policies")}
            </p>
            <p className="mt-2 font-semibold">{t("nav.shortCards")}</p>
          </Link>
          <Link
            className="rounded-2xl border border-border bg-card p-4 text-card-foreground"
            href="/historik"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-primary/70">
              {t("nav.whatHappened")}
            </p>
            <p className="mt-2 font-semibold">{t("nav.history")}</p>
          </Link>
          <Link
            className="rounded-2xl border border-border bg-card p-4 text-card-foreground"
            href="/installningar"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-primary/70">
              {t("nav.settings")}
            </p>
            <p className="mt-2 font-semibold">{t("settings.title")}</p>
          </Link>
          <Link
            className="rounded-2xl border border-border bg-card p-4 text-card-foreground"
            href="/ordlista"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-primary/70">
              {t("nav.glossary")}
            </p>
            <p className="mt-2 font-semibold">{t("glossary.title")}</p>
          </Link>
        </section>
      ) : null}
>>>>>>> 4d83c69 (chore: enhance architecture documentation, remove env.local, and improve UI components)
    </PageContainer>
  );
}
