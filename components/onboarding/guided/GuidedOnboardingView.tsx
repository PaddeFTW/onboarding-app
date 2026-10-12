"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  List,
  Lock,
  Paperclip,
  RotateCcw,
} from "lucide-react";

import {
  DEMO_GUIDED_ONBOARDING_ID,
  countDoneVisibleSteps,
  followUpDateLabel,
  getCurrentStepIndex,
  getFirstUnansweredStepId,
  getNextVisibleStepId,
  getPreviousVisibleStepId,
  getStepOverviewStatus,
  getVisibleSteps,
  isStepAccessible,
  isStepAnswered,
  isStepResponseComplete,
  responsibleNames,
  type OnboardingInstance,
  type OnboardingStepInstance,
  type StepResponse,
} from "@/lib/onboarding-steps";
import { cn } from "@/lib/utils";
import { useGuidedOnboardingStore } from "@/components/providers/guided-onboarding-provider";
import { useLocale } from "@/components/providers/locale-provider";
import { EmptyState } from "@/components/empty-state";
import { LoadingState } from "@/components/loading-state";
import { PageContainer } from "@/components/page-container";
import { questionText } from "@/lib/i18n";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import {
  exampleFor,
  helpTextFor,
  placeholderFor,
  questionById,
} from "@/lib/introduction-questions";
import {
  alarmOptionFromFact,
  normalizeAlarmOptionId,
  savedFactFor,
  sizedExample,
} from "@/lib/company-facts";
import { termsForQuestion } from "@/lib/terms";
import { buildGuidedSummary } from "@/lib/guided-summary";
import {
  listParticipantDocuments,
  uploadParticipantDocument,
} from "@/lib/documents";
import { POLICY_CARDS, policyExampleFor } from "@/lib/policy-cards";
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface GuidedOnboardingViewProps {
  id: string;
}

export function GuidedOnboardingView({ id }: GuidedOnboardingViewProps) {
  const { t, locale } = useLocale();
  const {
    getInstance,
    ensureDemoInstance,
    isHydrated,
    completeStep,
    skipStep,
    updateStepResponse,
    setCurrentStep,
    updateParticipantNote,
    resetInstance,
  } = useGuidedOnboardingStore();

  const [overviewOpen, setOverviewOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const [animProgress, setAnimProgress] = useState(0);
  const [stepDrafts, setStepDrafts] = useState<Record<string, StepResponse>>({});
  const [noteDraft, setNoteDraft] = useState("");
  const [attachments, setAttachments] = useState<Array<{ id: string; title: string }>>([]);
  const [uploadingAttachment, setUploadingAttachment] = useState(false);
  const [companyContext, setCompanyContext] = useState<{
    companyName: string;
    industry: string;
    employeeCount: string;
    facts: Record<string, unknown>;
  }>({ companyName: "", industry: "general", employeeCount: "", facts: {} });
  const didOpenSyncRef = useRef<string | null>(null);

  useEffect(() => {
    void (async () => {
      try {
        const { createClient } = await import("@/lib/supabase/client");
        const { isRegistryMissingError } = await import("@/lib/registry-errors");
        const supabase = createClient();
        const { data: user } = await supabase.auth.getUser();
        const { data: member } = await supabase
          .from("organization_members")
          .select("organization_id")
          .eq("user_id", user.user?.id)
          .limit(1)
          .maybeSingle();
        if (!member?.organization_id) return;
        const [settingsResult, factsResult] = await Promise.all([
          supabase
            .from("company_settings")
            .select("company_name,industry,employee_count")
            .eq("organization_id", member.organization_id)
            .maybeSingle(),
          supabase
            .from("company_facts")
            .select(
              "start_date,start_place,first_day,work_hours,sick_contact,safety_rep,policies,has_alarm,follow_up_days"
            )
            .eq("organization_id", member.organization_id)
            .maybeSingle(),
        ]);
        if (
          isRegistryMissingError(settingsResult.error) ||
          isRegistryMissingError(factsResult.error)
        ) {
          return;
        }
        setCompanyContext({
          companyName: settingsResult.data?.company_name ?? "",
          industry: settingsResult.data?.industry || "general",
          employeeCount: settingsResult.data?.employee_count ?? "",
          facts: factsResult.data ?? {},
        });
      } catch {
        // Registry optional for an already started introduction.
      }
    })();
  }, []);

  useEffect(() => {
    if (isHydrated && id === DEMO_GUIDED_ONBOARDING_ID) {
      ensureDemoInstance();
    }
  }, [ensureDemoInstance, id, isHydrated]);

  const instance = getInstance(id);

  useEffect(() => {
    if (!instance) return;
    setNoteDraft(instance.participantNote ?? "");
  }, [instance?.id, instance?.participantNote]);

  useEffect(() => {
    if (!instance || instance.id === DEMO_GUIDED_ONBOARDING_ID) {
      setAttachments([]);
      return;
    }
    let active = true;
    void listParticipantDocuments(instance.id)
      .then((rows) => {
        if (!active) return;
        setAttachments(rows.map((row) => ({ id: row.id, title: row.title })));
      })
      .catch(() => {
        if (active) setAttachments([]);
      });
    return () => {
      active = false;
    };
  }, [instance?.id]);

  // Open on the first unanswered question once per visit.
  useEffect(() => {
    if (!isHydrated || !instance || instance.status === "completed") return;
    if (didOpenSyncRef.current === id) return;
    didOpenSyncRef.current = id;
    const firstUnanswered = getFirstUnansweredStepId(instance);
    if (firstUnanswered && instance.currentStepId !== firstUnanswered) {
      setCurrentStep(instance.id, firstUnanswered);
    }
  }, [id, instance, isHydrated, setCurrentStep]);

  useEffect(() => {
    if (!instance) return;
    const facts = companyContext.facts;
    setStepDrafts((current) => {
      let changed = false;
      const next = { ...current };
      for (const step of instance.steps) {
        if (isStepAnswered(step)) continue;
        const existing = { ...step.response, ...next[step.id] };
        const fact = savedFactFor(step.id, facts);
        const alarmOption =
          step.id === "alarm"
            ? normalizeAlarmOptionId(
                existing.selectedOptionId ?? alarmOptionFromFact(facts.has_alarm)
              )
            : undefined;
        const patch: StepResponse = {};
        if (fact && !existing.comment) patch.comment = fact;
        if (alarmOption && existing.selectedOptionId !== alarmOption) {
          patch.selectedOptionId = alarmOption;
        }
        if (Object.keys(patch).length === 0) continue;
        next[step.id] = { ...existing, ...patch };
        changed = true;
      }
      return changed ? next : current;
    });
  }, [companyContext.facts, instance]);
  const visibleSteps = useMemo(
    () => (instance ? getVisibleSteps(instance) : []),
    [instance]
  );
  const currentStep = visibleSteps.find(
    (step) => step.id === instance?.currentStepId
  );
  const doneCount = instance ? countDoneVisibleSteps(instance) : 0;
  const totalCount = visibleSteps.length;
  const progressPercent = totalCount === 0 ? 0 : Math.round((doneCount / totalCount) * 100);

  useEffect(() => {
    const timer = setTimeout(() => setAnimProgress(progressPercent), 300);
    return () => clearTimeout(timer);
  }, [id, progressPercent]);

  if (!isHydrated) {
    return (
      <PageContainer>
        <LoadingState label={t("common.loading")} />
      </PageContainer>
    );
  }

  if (!instance) {
    return (
      <PageContainer className="flex flex-col gap-8">
        <Button variant="ghost" size="sm" className="-ml-3 w-fit" asChild>
          <Link href="/">
            <ArrowLeft />
            {t("common.back")}
          </Link>
        </Button>
        <EmptyState
          title={t("empty.noIntroductionTitle")}
          description={t("empty.noIntroductionDescription")}
          action={
            <Button asChild>
              <Link href="/">{t("empty.goHome")}</Link>
            </Button>
          }
        />
      </PageContainer>
    );
  }

  if (instance.status === "completed") {
    return (
      <GuidedCompletionView
        instance={instance}
        industry={companyContext.industry}
        companyName={companyContext.companyName}
        onReset={() => resetInstance(instance.id)}
      />
    );
  }

  if (!currentStep) {
    return (
      <PageContainer>
        <LoadingState label="Förbereder steg..." />
      </PageContainer>
    );
  }

  const activeStep = currentStep;
  const activeInstance = instance;

  const currentIndex = getCurrentStepIndex(activeInstance, visibleSteps);
  const isLastStep = currentIndex === visibleSteps.length - 1;
  const isLocked = isStepAnswered(activeStep);
  const draftResponse = {
    ...activeStep.response,
    ...stepDrafts[activeStep.id],
  };
  const responseComplete = isStepResponseComplete({
    ...activeStep,
    response: draftResponse,
  });
  // Friskvård, fack and larm may be skipped. Locked answers are view-only.
  const canProceed = isLocked || !activeStep.required || responseComplete;

  function handleDraftChange(partial: StepResponse) {
    if (isLocked) return;
    const next = { ...draftResponse, ...partial };
    setStepDrafts((current) => ({
      ...current,
      [activeStep.id]: next,
    }));
    updateStepResponse(activeInstance.id, activeStep.id, next);
  }

  async function handleNext() {
    // Viewing an answered question: move forward without re-saving.
    if (isLocked) {
      if (isLastStep) return;
      const nextStepId = getNextVisibleStepId(activeInstance, activeStep.id);
      if (nextStepId) setCurrentStep(activeInstance.id, nextStepId);
      return;
    }

    if (activeStep.required && !responseComplete) {
      toast.error("Slutför steget innan du går vidare.");
      return;
    }

    // Nästa sparar först, sedan går vidare.
    if (responseComplete) {
      completeStep(activeInstance.id, activeStep.id, draftResponse);
    } else if (!activeStep.required) {
      skipStep(activeInstance.id, activeStep.id);
    } else {
      updateStepResponse(activeInstance.id, activeStep.id, draftResponse);
    }

    if (isLastStep) {
      return;
    }

    const nextStepId = getNextVisibleStepId(activeInstance, activeStep.id);
    if (nextStepId) {
      setCurrentStep(activeInstance.id, nextStepId);
    }
  }

  function handleBack() {
    const previousStepId = getPreviousVisibleStepId(activeInstance, activeStep.id);
    if (previousStepId) {
      setCurrentStep(activeInstance.id, previousStepId);
    }
  }

  function handleJumpToStep(stepId: string) {
    if (!isStepAccessible(activeInstance, stepId)) {
      return;
    }

    setCurrentStep(activeInstance.id, stepId);
    setOverviewOpen(false);
  }

  function handleContinueUnanswered() {
    const firstUnanswered = getFirstUnansweredStepId(activeInstance);
    if (firstUnanswered) {
      setCurrentStep(activeInstance.id, firstUnanswered);
    }
  }

  async function handleAttachmentUpload(file: File | null) {
    if (!file || activeInstance.id === DEMO_GUIDED_ONBOARDING_ID) return;
    setUploadingAttachment(true);
    try {
      await uploadParticipantDocument(activeInstance.id, file);
      const rows = await listParticipantDocuments(activeInstance.id);
      setAttachments(rows.map((row) => ({ id: row.id, title: row.title })));
      toast.success("Bilagan är sparad för den här personen.");
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Kunde inte ladda upp.");
    } finally {
      setUploadingAttachment(false);
    }
  }

  return (
    <PageContainer className="flex flex-col gap-8 animate-fade-up sm:gap-10">
      <div className="flex items-center justify-between gap-3">
        <Button variant="ghost" size="sm" className="-ml-3 w-fit" asChild>
          <Link href="/">
            <ArrowLeft />
            {t("common.back")}
          </Link>
        </Button>
        <Badge variant="outline">{t("home.readyTitle")}</Badge>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-primary/60">
          {t("home.readyTitle")}
        </p>
        <h1 className="text-[1.6rem] font-semibold tracking-tight sm:text-3xl">
          {activeInstance.participantName}
        </h1>
        <p className="text-sm text-muted-foreground">
          Ansvarig: {activeInstance.responsibleName}
        </p>
      </div>

      <Card className="flex flex-col gap-4 p-5 sm:p-6">
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary/70">
            Anteckning och bilaga
          </p>
          <p className="text-sm text-muted-foreground">
            Hör till {activeInstance.participantName}, inte till hela företaget.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="participant-note">Anteckning</Label>
          <Textarea
            id="participant-note"
            value={noteDraft}
            placeholder="Kort anteckning om introduktionen"
            className="min-h-20 resize-none"
            onChange={(event) => setNoteDraft(event.target.value)}
            onBlur={() => updateParticipantNote(activeInstance.id, noteDraft)}
          />
        </div>
        {activeInstance.id === DEMO_GUIDED_ONBOARDING_ID ? (
          <p className="text-sm text-muted-foreground">Bilagor sparas inte i demon.</p>
        ) : (
          <div className="flex flex-col gap-2">
            <Label htmlFor="participant-document">Dokument</Label>
            <Input
              id="participant-document"
              type="file"
              disabled={uploadingAttachment}
              onChange={(event) => void handleAttachmentUpload(event.target.files?.[0] ?? null)}
            />
            {attachments.length > 0 ? (
              <ul className="flex flex-col gap-1">
                {attachments.map((item) => (
                  <li key={item.id} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Paperclip className="size-3.5 shrink-0" />
                    {item.title}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">Ingen bilaga ännu.</p>
            )}
          </div>
        )}
      </Card>

      <Card className="overflow-hidden p-0">
        <div className="flex flex-col gap-4 px-5 pb-5 pt-5 sm:px-6 sm:pb-6 sm:pt-6">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-primary/60">
              {t("setup.questionLabel")}
            </p>
            <span className="text-sm text-muted-foreground">
              {t("common.questionOf", { current: currentIndex + 1, total: totalCount })}
            </span>
          </div>
          <div className="flex items-end justify-between gap-3">
            <div className="flex items-baseline gap-2">
              <span className="text-6xl font-extralight tabular-nums tracking-tighter leading-none text-foreground sm:text-7xl">
                {doneCount}
              </span>
              <span className="mb-1 text-xl font-light text-muted-foreground sm:text-2xl">
                av {totalCount}
              </span>
            </div>
            <span className="max-w-[14ch] text-right text-xs leading-relaxed text-muted-foreground sm:max-w-none sm:text-sm">
              {doneCount} av {totalCount} frågor klara
            </span>
          </div>
        </div>
        <Progress value={animProgress} className="h-1.5 rounded-none" />
      </Card>

      <Card className="flex flex-col gap-6 p-5 sm:p-6">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">{activeStep.description}</Badge>
            {isLocked ? (
              <Badge variant="outline">
                <Lock className="size-3" />
                Sparad
              </Badge>
            ) : activeStep.required ? (
              <Badge variant="default">{t("common.required")}</Badge>
            ) : (
              <Badge variant="outline">{t("common.optional")}</Badge>
            )}
            {activeStep.status === "skipped" ? (
              <Badge variant="outline">{t("common.skip")}</Badge>
            ) : null}
          </div>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            {questionText(locale, activeStep.id, "title") ?? activeStep.title}
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Nästa sparar svaret. Tillbaka går till föregående fråga.
          </p>
          {isLocked ? (
            <p className="text-sm text-muted-foreground">
              Frågan är sparad. Du kan läsa svaret, men inte ändra det.
            </p>
          ) : null}
        </div>

        <StepContent
          step={activeStep}
          response={draftResponse}
          onChange={handleDraftChange}
          industry={companyContext.industry}
          employeeCount={companyContext.employeeCount}
          companyName={companyContext.companyName}
          facts={companyContext.facts}
          managerName={responsibleNames(activeInstance).managerName}
          mentorName={responsibleNames(activeInstance).mentorName}
          readOnly={isLocked}
        />
      </Card>

      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={() => setOverviewOpen(true)}
          className="w-full sm:w-auto"
        >
          <List />
          Stegöversikt
        </Button>

        {isLocked && getFirstUnansweredStepId(activeInstance) ? (
          <Button
            type="button"
            variant="ghost"
            onClick={handleContinueUnanswered}
            className="w-full sm:w-auto"
          >
            Till obesvarad fråga
          </Button>
        ) : activeInstance.id === DEMO_GUIDED_ONBOARDING_ID ? (
          <Button
            type="button"
            variant="ghost"
            onClick={() => setResetOpen(true)}
            className="w-full sm:w-auto"
          >
            <RotateCcw />
            Börja om
          </Button>
        ) : (
          <span className="hidden sm:block" />
        )}

        <div className="flex flex-col gap-2 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            disabled={currentIndex === 0}
            className="w-full sm:w-auto"
          >
            <ArrowLeft />
            Tillbaka
          </Button>
          <Button
            type="button"
            onClick={() => void handleNext()}
            disabled={!canProceed}
            className="w-full sm:w-auto"
          >
            {isLastStep && !isLocked
              ? "Slutför"
              : !isLocked && !activeStep.required && !responseComplete
                ? "Hoppa över"
                : "Nästa"}
            {!(isLastStep && !isLocked) && <ArrowRight />}
          </Button>
        </div>
      </div>

      <StepOverviewSheet
        open={overviewOpen}
        onOpenChange={setOverviewOpen}
        instance={activeInstance}
        visibleSteps={visibleSteps}
        onJump={handleJumpToStep}
      />
      <ResetDemoDialog
        open={resetOpen}
        onOpenChange={setResetOpen}
        onConfirm={() => {
          resetInstance(activeInstance.id);
          setStepDrafts({});
          setResetOpen(false);
          toast.success("Demon är återställd.");
        }}
      />
    </PageContainer>
  );
}

function formatDisplayDate(value: unknown): string {
  if (value == null || value === "") return "Datum saknas";
  const text = String(value);
  if (/^\d{4}-\d{2}-\d{2}/.test(text)) {
    return new Date(text).toLocaleDateString("sv-SE");
  }
  return text;
}

function StepContent({
  step,
  response,
  onChange,
  industry,
  employeeCount,
  companyName,
  facts,
  managerName,
  mentorName,
  readOnly = false,
}: {
  step: OnboardingStepInstance;
  response: StepResponse;
  onChange: (partial: StepResponse) => void;
  industry: string;
  employeeCount: string;
  companyName: string;
  facts: Record<string, unknown>;
  managerName: string;
  mentorName: string;
  readOnly?: boolean;
}) {
  const { t, locale } = useLocale();
  const industryKey = industry || "general";
  const example = exampleFor(step.id, industryKey, locale);
  const help = helpTextFor(step.id, industryKey, locale) || step.helpText || "";
  const saved = response.comment ?? savedFactFor(step.id, facts);
  const alarmOption = normalizeAlarmOptionId(
    response.selectedOptionId ?? alarmOptionFromFact(facts.has_alarm)
  );
  const question = questionById(step.id);
  const relatedTerms = termsForQuestion(step.id);
  const showAlarmPrefill =
    !readOnly && step.id === "alarm" && facts.has_alarm === "Vi har inget larm";

  const placeholder = placeholderFor(step.id, industryKey);
  const confirmation =
    question?.confirmationLabel ?? step.confirmationLabel ?? "Jag har tagit del av informationen.";
  const sized = sizedExample(example, employeeCount);

  if (step.id === "plan") {
    const rows = [
      { label: "Företag", value: companyName.trim() || "Företag saknas" },
      { label: "Startdatum", value: formatDisplayDate(facts.start_date) },
      { label: "Plats", value: String(facts.start_place || "").trim() || "Plats saknas" },
      { label: "Ansvarig chef", value: managerName },
      { label: "Mentor", value: mentorName },
    ];
    return (
      <div className="flex flex-col gap-4">
        {!readOnly && help ? (
          <p className="text-sm leading-relaxed text-muted-foreground">{help}</p>
        ) : null}
        <div className="rounded-2xl border border-primary/15 bg-primary/5 px-4 py-4">
          <dl className="flex flex-col gap-3 text-sm">
            {rows.map((row) => (
              <div key={row.label} className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
                <dt className="min-w-36 font-semibold text-foreground">{row.label}</dt>
                <dd className="text-muted-foreground">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <p className="text-sm text-muted-foreground">
          {t("common.example")}: {sized}
        </p>
        {renderStepInteraction(step, response, onChange, readOnly, placeholder, confirmation)}
      </div>
    );
  }

  if (step.id === "followup") {
    const bookedDate = /^\d{4}-\d{2}-\d{2}$/.test(saved ?? "")
      ? saved
      : savedFactFor("followup", facts) ?? "";
    return (
      <div className="flex flex-col gap-4">
        {!readOnly && help ? (
          <p className="text-sm leading-relaxed text-muted-foreground">{help}</p>
        ) : null}
        <p className="text-sm text-muted-foreground">
          Välj datum för uppföljningen. Nästa sparar bokningen.
        </p>
        {!readOnly && sized ? (
          <p className="text-sm text-muted-foreground">
          {t("common.example")}: {sized}
        </p>
        ) : null}
        <div className="flex flex-col gap-2">
          <Label htmlFor="followup-date">Uppföljningsdatum</Label>
          <Input
            id="followup-date"
            type="date"
            value={bookedDate ?? ""}
            readOnly={readOnly}
            disabled={readOnly}
            onChange={(event) =>
              onChange({ comment: event.target.value, taskConfirmed: Boolean(event.target.value) })
            }
          />
        </div>
        <label
          htmlFor={`task-${step.order}`}
          className={cn(
            "flex items-center gap-3.5 rounded-[1.35rem] border px-4 py-4",
            "transition-all duration-200 select-none",
            readOnly ? "cursor-default opacity-90" : "cursor-pointer",
            response.taskConfirmed
              ? "border-success/30 bg-success-subtle shadow-[0_0_0_3px_rgba(16,185,129,0.08)]"
              : "border-border bg-secondary/40 hover:bg-secondary hover:border-border/80"
          )}
        >
          <Checkbox
            id={`task-${step.order}`}
            checked={response.taskConfirmed === true}
            disabled={readOnly || !bookedDate}
            onCheckedChange={(value) => onChange({ taskConfirmed: value === true })}
          />
          <span className="text-sm font-medium leading-snug">{confirmation}</span>
        </label>
      </div>
    );
  }

  if (step.id === "policy") {
    const industryExample = sizedExample(policyExampleFor(industryKey), employeeCount);
    return (
      <div className="flex flex-col gap-4">
        {!readOnly && help ? (
          <p className="text-sm leading-relaxed text-muted-foreground">{help}</p>
        ) : null}
        <p className="text-sm text-muted-foreground">
          Korta kort: titel, en mening och exempel. Inte en dokumentvy.
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {POLICY_CARDS.map((card) => (
            <article key={card.title} className="rounded-2xl border px-4 py-3 text-left">
              <h3 className="font-semibold">{card.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{card.sentence}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {t("common.example")}: {card.example}
              </p>
            </article>
          ))}
        </div>
        {!readOnly && industryExample ? (
          <p className="text-sm text-muted-foreground">
            {t("common.example")}: {industryExample}
          </p>
        ) : null}
        {saved && !readOnly ? (
          <div className="rounded-2xl border border-primary/15 bg-primary/5 px-4 py-3">
            <p className="text-sm leading-relaxed text-foreground">{saved}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Bekräfta att det stämmer, eller ändra vid behov.
            </p>
          </div>
        ) : null}
        {renderStepInteraction(step, response, onChange, readOnly, placeholder, confirmation)}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {!readOnly && help ? (
        <p className="text-sm leading-relaxed text-muted-foreground">{help}</p>
      ) : null}

      {!readOnly && relatedTerms[0] ? (
        <p className="text-sm text-muted-foreground">
          {relatedTerms[0].term}: {relatedTerms[0].definition}
        </p>
      ) : null}

      {showAlarmPrefill ? (
        <p className="text-sm text-muted-foreground">
          Valet är ifyllt från grundinställningen: Vi har inget larm.
        </p>
      ) : saved && step.type === "confirmation" && !readOnly ? (
        <div className="rounded-2xl border border-primary/15 bg-primary/5 px-4 py-3">
          <p className="text-sm leading-relaxed text-foreground">{saved}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Bekräfta att det stämmer, eller ändra vid behov.
          </p>
        </div>
      ) : null}

      {!readOnly && sized ? (
        <p className="text-sm text-muted-foreground">
          {t("common.example")}: {sized}
        </p>
      ) : null}

      {step.type === "singleChoice" && !readOnly ? (
        <p className="text-sm text-muted-foreground">Välj ett alternativ.</p>
      ) : null}

      {step.type === "task" && !readOnly ? (
        <p className="text-sm text-muted-foreground">Platshållare: {placeholder}</p>
      ) : null}

      {renderStepInteraction(
        step,
        {
          ...response,
          ...(step.id === "alarm" && alarmOption
            ? { selectedOptionId: alarmOption }
            : {}),
          ...(step.id !== "alarm" && saved ? { comment: saved } : {}),
        },
        onChange,
        readOnly,
        placeholder,
        confirmation
      )}
    </div>
  );
}

function renderStepInteraction(
  step: OnboardingStepInstance,
  response: StepResponse,
  onChange: (partial: StepResponse) => void,
  readOnly = false,
  placeholder = "Skriv svaret",
  confirmation = "Jag har tagit del av informationen."
) {
  switch (step.type) {
    case "information":
      return null;
    case "confirmation":
      return (
        <label
          htmlFor={`confirm-${step.order}`}
          className={cn(
            "flex items-center gap-3.5 rounded-[1.35rem] border px-4 py-4",
            "transition-all duration-200 select-none",
            readOnly ? "cursor-default opacity-90" : "cursor-pointer",
            response.acknowledged
              ? "border-success/30 bg-success-subtle shadow-[0_0_0_3px_rgba(16,185,129,0.08)]"
              : "border-border bg-secondary/40 hover:bg-secondary hover:border-border/80"
          )}
        >
          <Checkbox
            id={`confirm-${step.order}`}
            checked={response.acknowledged === true}
            disabled={readOnly}
            onCheckedChange={(value) =>
              onChange({ acknowledged: value === true })
            }
          />
          <span className="text-sm font-medium leading-snug">{confirmation}</span>
        </label>
      );
    case "singleChoice":
      return (
        <div className="flex flex-col gap-2">
          {step.options?.map((option) => {
            const optionId =
              step.id === "alarm"
                ? normalizeAlarmOptionId(option.id) ?? option.id
                : option.id;
            const selected =
              normalizeAlarmOptionId(response.selectedOptionId) ===
                normalizeAlarmOptionId(optionId) ||
              response.selectedOptionId === option.id;
            return (
              <button
                key={option.label}
                type="button"
                disabled={readOnly}
                onClick={() => onChange({ selectedOptionId: optionId })}
                className={cn(
                  "rounded-[1.35rem] border px-4 py-4 text-left text-sm font-medium transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
                  "disabled:cursor-default disabled:opacity-90",
                  selected
                    ? "border-primary/30 bg-primary/5 shadow-[0_0_0_3px_rgba(99,102,241,0.08)]"
                    : "border-border bg-secondary/30 hover:bg-accent/40"
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      );
    case "task":
      return (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label
              htmlFor={`task-comment-${step.order}`}
              className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70"
            >
              Svar
            </Label>
            <Textarea
              id={`task-comment-${step.order}`}
              value={response.comment ?? ""}
              readOnly={readOnly}
              onChange={(event) => onChange({ comment: event.target.value })}
              placeholder={placeholder}
              className="min-h-24 resize-none"
            />
          </div>
          <label
            htmlFor={`task-${step.order}`}
            className={cn(
              "flex items-center gap-3.5 rounded-[1.35rem] border px-4 py-4",
              "transition-all duration-200 select-none",
              readOnly ? "cursor-default opacity-90" : "cursor-pointer",
              response.taskConfirmed
                ? "border-success/30 bg-success-subtle shadow-[0_0_0_3px_rgba(16,185,129,0.08)]"
                : "border-border bg-secondary/40 hover:bg-secondary hover:border-border/80"
            )}
          >
            <Checkbox
              id={`task-${step.order}`}
              checked={response.taskConfirmed === true}
              disabled={readOnly}
              onCheckedChange={(value) =>
                onChange({ taskConfirmed: value === true })
              }
            />
            <span className="text-sm font-medium leading-snug">{confirmation}</span>
          </label>
        </div>
      );
    default:
      return null;
  }
}

function StepOverviewSheet({
  open,
  onOpenChange,
  instance,
  visibleSteps,
  onJump,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  instance: OnboardingInstance;
  visibleSteps: OnboardingStepInstance[];
  onJump: (stepId: string) => void;
}) {
  const { t, locale } = useLocale();
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{t("home.readyTitle")}</SheetTitle>
          <SheetDescription>
            {t("common.oneQuestionAtATime")}
          </SheetDescription>
        </SheetHeader>

        <SheetBody className="flex flex-col gap-2">
          {visibleSteps.map((step, index) => {
            const status = getStepOverviewStatus(step, instance.currentStepId);
            const accessible = isStepAccessible(instance, step.id);

            return (
              <button
                key={step.id}
                type="button"
                disabled={!accessible}
                onClick={() => onJump(step.id)}
                className={cn(
                  "flex items-center gap-3 rounded-[1.35rem] border px-4 py-3.5 text-left transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
                  status === "current" && "border-primary/25 bg-primary/5",
                  status === "completed" &&
                    "border-success/20 bg-success-subtle/35 hover:bg-success-subtle/50",
                  status === "skipped" &&
                    "border-border bg-secondary/30 hover:bg-secondary/40",
                  status === "available" &&
                    "border-border bg-card hover:bg-accent/25",
                  status === "locked" &&
                    "cursor-not-allowed border-border/70 bg-secondary/20 opacity-60"
                )}
              >
                <div
                  className={cn(
                    "flex size-5 shrink-0 items-center justify-center rounded-full",
                    status === "completed"
                      ? "bg-success text-success-foreground"
                      : status === "skipped"
                        ? "bg-muted text-muted-foreground"
                      : status === "current"
                        ? "border-2 border-primary bg-primary/10"
                        : "border-2 border-border"
                  )}
                >
                  {status === "completed" ? (
                    <Check className="size-3" strokeWidth={3} />
                  ) : status === "skipped" ? (
                    <span className="text-[0.55rem] font-semibold">–</span>
                  ) : (
                    <span className="text-[0.65rem] font-semibold text-muted-foreground">
                      {index + 1}
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {questionText(locale, step.id, "title") ?? step.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {getOverviewStatusLabel(status)}
                    {step.required
                      ? ` · ${t("common.required")}`
                      : ` · ${t("common.optional")}`}
                  </p>
                </div>
                {accessible ? (
                  <ChevronRight className="size-4 shrink-0 text-muted-foreground/50" />
                ) : null}
              </button>
            );
          })}
        </SheetBody>

        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              Stäng
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

function ResetDemoDialog({
  open,
  onOpenChange,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Börja om demon?</DialogTitle>
          <DialogDescription>
            Svaren i förhandsvisningen tas bort. Checklistan på startsidan rörs inte.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Avbryt
          </Button>
          <Button type="button" onClick={onConfirm}>
            Börja om
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function GuidedCompletionView({
  instance,
  industry,
  companyName,
  onReset,
}: {
  instance: OnboardingInstance;
  industry: string;
  companyName: string;
  onReset: () => void;
}) {
  const [resetOpen, setResetOpen] = useState(false);
  const { managerName, mentorName } = responsibleNames(instance);
  const followUpDate = followUpDateLabel(instance);
  const isDemo = instance.id === DEMO_GUIDED_ONBOARDING_ID;
  const summary = useMemo(
    () => buildGuidedSummary(instance, industry, companyName),
    [companyName, instance, industry]
  );

  function handlePrint() {
    window.print();
  }

  return (
    <PageContainer className="relative flex min-h-[80vh] flex-col items-center justify-center gap-8 py-12 text-center sm:gap-10 sm:py-16">
      <div className="no-print flex w-full max-w-lg flex-col items-center gap-7 animate-fade-up sm:gap-8">
        <div className="flex size-22 items-center justify-center rounded-full bg-success-subtle animate-scale-in sm:size-24">
          <CheckCircle2 className="size-12 text-success" strokeWidth={1.5} />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/70">Klart</p>
          <h1 className="text-[2rem] font-semibold tracking-tight sm:text-4xl">
            Introduktionen är klar
          </h1>
        </div>

        <Card className="w-full p-5 text-left sm:p-6">
          <dl className="flex flex-col gap-3 text-sm">
            <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
              <dt className="min-w-36 font-semibold">Namn</dt>
              <dd className="text-muted-foreground">{instance.participantName}</dd>
            </div>
            <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
              <dt className="min-w-36 font-semibold">Företag</dt>
              <dd className="text-muted-foreground">{companyName.trim() || "Företag saknas"}</dd>
            </div>
            <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
              <dt className="min-w-36 font-semibold">Ansvarig chef</dt>
              <dd className="text-muted-foreground">{managerName}</dd>
            </div>
            <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
              <dt className="min-w-36 font-semibold">Mentor</dt>
              <dd className="text-muted-foreground">{mentorName}</dd>
            </div>
            <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
              <dt className="min-w-36 font-semibold">Uppföljningsdatum</dt>
              <dd className="text-muted-foreground">{followUpDate}</dd>
            </div>
          </dl>
        </Card>

        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          <Button size="lg" className="w-full sm:w-auto" type="button" onClick={handlePrint}>
            Skriv ut
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
            <Link href="/">Tillbaka till startsidan</Link>
          </Button>
        </div>

        {isDemo ? (
          <>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => setResetOpen(true)}
            >
              <RotateCcw />
              Börja om demon
            </Button>
            <ResetDemoDialog
              open={resetOpen}
              onOpenChange={setResetOpen}
              onConfirm={() => {
                onReset();
                setResetOpen(false);
              }}
            />
          </>
        ) : null}
      </div>

      <article className="print-summary mx-auto mt-2 w-full max-w-3xl rounded-3xl border bg-card p-5 text-left sm:p-6">
        <h2 className="text-xl font-semibold tracking-tight">{summary.title}</h2>
        <dl className="mt-5 flex flex-col gap-2 text-sm">
          {summary.meta.map((line) => (
            <div key={line.label} className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
              <dt className="min-w-40 font-semibold text-foreground">{line.label}</dt>
              <dd className="text-muted-foreground">{line.value}</dd>
            </div>
          ))}
        </dl>
        <h3 className="mt-8 text-base font-semibold">Frågor och svar</h3>
        <ol className="mt-4 flex list-decimal flex-col gap-4 pl-5 text-sm">
          {summary.questions.map((item) => (
            <li key={item.order} className="pl-1">
              <p className="font-medium text-foreground">{item.title}</p>
              <p className="mt-1 text-muted-foreground">{item.answer}</p>
            </li>
          ))}
        </ol>
      </article>
    </PageContainer>
  );
}

function getOverviewStatusLabel(
  status: ReturnType<typeof getStepOverviewStatus>
): string {
  switch (status) {
    case "completed":
      return "Svarad · låst";
    case "current":
      return "Aktuell fråga";
    case "available":
      return "Tillgänglig";
    case "locked":
      return "Inte öppnad ännu";
    case "skipped":
      return "Överhoppad · låst";
    default:
      return status;
  }
}
