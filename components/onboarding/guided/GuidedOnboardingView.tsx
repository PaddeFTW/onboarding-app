"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  List,
} from "lucide-react";

import {
  DEMO_GUIDED_ONBOARDING_ID,
  calcGuidedProgress,
  countCompletedVisibleSteps,
  getCurrentStepIndex,
  getNextVisibleStepId,
  getPreviousVisibleStepId,
  getStepOverviewStatus,
  getVisibleSteps,
  isStepAccessible,
  isStepResponseComplete,
  type OnboardingInstance,
  type OnboardingStepInstance,
  type StepResponse,
} from "@/lib/onboarding-steps";
import { cn } from "@/lib/utils";
import { useGuidedOnboardingStore } from "@/components/providers/guided-onboarding-provider";
import { EmptyState } from "@/components/empty-state";
import { LoadingState } from "@/components/loading-state";
import { PageContainer } from "@/components/page-container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
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
  const {
    getInstance,
    ensureDemoInstance,
    isHydrated,
    completeStep,
    updateStepResponse,
    setCurrentStep,
  } = useGuidedOnboardingStore();

  const [overviewOpen, setOverviewOpen] = useState(false);
  const [animProgress, setAnimProgress] = useState(0);
  const [stepDrafts, setStepDrafts] = useState<Record<string, StepResponse>>({});

  useEffect(() => {
    if (isHydrated && id === DEMO_GUIDED_ONBOARDING_ID) {
      ensureDemoInstance();
    }
  }, [ensureDemoInstance, id, isHydrated]);

  const instance = getInstance(id);
  const visibleSteps = useMemo(
    () => (instance ? getVisibleSteps(instance) : []),
    [instance]
  );
  const currentStep = visibleSteps.find(
    (step) => step.id === instance?.currentStepId
  );
  const rawProgress = instance ? calcGuidedProgress(instance) : 0;

  useEffect(() => {
    const timer = setTimeout(() => setAnimProgress(rawProgress), 300);
    return () => clearTimeout(timer);
  }, [id, rawProgress]);

  if (!isHydrated) {
    return (
      <PageContainer>
        <LoadingState label="Laddar guidad onboarding..." />
      </PageContainer>
    );
  }

  if (!instance) {
    return (
      <PageContainer className="flex flex-col gap-8">
        <Button variant="ghost" size="sm" className="-ml-3 w-fit" asChild>
          <Link href="/">
            <ArrowLeft />
            Tillbaka
          </Link>
        </Button>
        <EmptyState
          title="Guidad onboarding hittades inte"
          description="Den här förhandsvisningen finns inte i den här webbläsaren."
          action={
            <Button asChild>
              <Link href="/">Gå till startsidan</Link>
            </Button>
          }
        />
      </PageContainer>
    );
  }

  if (instance.status === "completed") {
    return <GuidedCompletionView instance={instance} />;
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

  const completedCount = countCompletedVisibleSteps(activeInstance);
  const totalCount = visibleSteps.length;
  const currentIndex = getCurrentStepIndex(activeInstance, visibleSteps);
  const isLastStep = currentIndex === visibleSteps.length - 1;
  const draftResponse = {
    ...activeStep.response,
    ...stepDrafts[activeStep.id],
  };
  const canProceed = isStepResponseComplete({
    ...activeStep,
    response: draftResponse,
  });

  function handleDraftChange(partial: StepResponse) {
    const next = { ...draftResponse, ...partial };
    setStepDrafts((current) => ({
      ...current,
      [activeStep.id]: next,
    }));
    updateStepResponse(activeInstance.id, activeStep.id, next);
  }

  async function handleNext() {
    if (!canProceed) {
      toast.error("Slutför steget innan du går vidare.");
      return;
    }

    completeStep(activeInstance.id, activeStep.id, draftResponse);

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

  return (
    <PageContainer className="flex flex-col gap-8 animate-fade-up sm:gap-10">
      <div className="flex items-center justify-between gap-3">
        <Button variant="ghost" size="sm" className="-ml-3 w-fit" asChild>
          <Link href="/">
            <ArrowLeft />
            Tillbaka
          </Link>
        </Button>
        <Badge variant="outline">Förhandsvisning</Badge>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-primary/60">
          {activeInstance.title}
        </p>
        <h1 className="text-[1.6rem] font-semibold tracking-tight sm:text-3xl">
          {activeInstance.participantName}
        </h1>
        <p className="text-sm text-muted-foreground">
          Ansvarig: {activeInstance.responsibleName}
        </p>
      </div>

      <Card className="overflow-hidden p-0">
        <div className="flex flex-col gap-4 px-5 pb-5 pt-5 sm:px-6 sm:pb-6 sm:pt-6">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-primary/60">
              Progress
            </p>
            <span className="text-sm text-muted-foreground">
              Steg {currentIndex + 1} av {totalCount}
            </span>
          </div>
          <div className="flex items-end justify-between gap-3">
            <div className="flex items-baseline gap-1">
              <span className="text-6xl font-extralight tabular-nums tracking-tighter leading-none text-foreground sm:text-7xl">
                {rawProgress}
              </span>
              <span className="mb-1 text-xl font-light text-muted-foreground/50 sm:text-2xl">
                %
              </span>
            </div>
            <span className="max-w-[14ch] text-right text-xs leading-relaxed text-muted-foreground sm:max-w-none sm:text-sm">
              {completedCount} av {totalCount} steg klara
            </span>
          </div>
        </div>
        <Progress value={animProgress} className="h-1.5 rounded-none" />
      </Card>

      <Card className="flex flex-col gap-6 p-5 sm:p-6">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">{getStepTypeLabel(activeStep.type)}</Badge>
            {activeStep.required && (
              <Badge variant="default">Obligatoriskt</Badge>
            )}
            {activeStep.estimatedMinutes ? (
              <span className="text-xs text-muted-foreground">
                Ca {activeStep.estimatedMinutes} min
              </span>
            ) : null}
          </div>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            {activeStep.title}
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {activeStep.description}
          </p>
        </div>

        <StepContent step={activeStep} response={draftResponse} onChange={handleDraftChange} />

        {activeStep.helpText ? (
          <p className="rounded-2xl border border-border/80 bg-secondary/30 px-4 py-3 text-sm text-muted-foreground">
            {activeStep.helpText}
          </p>
        ) : null}

        <p className="text-xs text-muted-foreground/70">Sparat i den här webbläsaren.</p>
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
            {isLastStep ? "Slutför" : "Nästa"}
            {!isLastStep && <ArrowRight />}
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
    </PageContainer>
  );
}

function StepContent({
  step,
  response,
  onChange,
}: {
  step: OnboardingStepInstance;
  response: StepResponse;
  onChange: (partial: StepResponse) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      {step.content && step.type !== "task" ? (
        <div className="rounded-[1.35rem] border border-accent-foreground/10 bg-accent/60 px-4 py-4 sm:px-5">
          <p className="text-sm leading-relaxed text-accent-foreground/90">
            {step.content}
          </p>
        </div>
      ) : null}

      {renderStepInteraction(step, response, onChange)}
    </div>
  );
}

function renderStepInteraction(
  step: OnboardingStepInstance,
  response: StepResponse,
  onChange: (partial: StepResponse) => void
) {
  switch (step.type) {
    case "information":
      return null;
    case "confirmation":
      return (
        <label
          htmlFor={`confirm-${step.id}`}
          className={cn(
            "flex cursor-pointer items-center gap-3.5 rounded-[1.35rem] border px-4 py-4",
            "transition-all duration-200 select-none",
            response.acknowledged
              ? "border-success/30 bg-success-subtle shadow-[0_0_0_3px_rgba(16,185,129,0.08)]"
              : "border-border bg-secondary/40 hover:bg-secondary hover:border-border/80"
          )}
        >
          <Checkbox
            id={`confirm-${step.id}`}
            checked={response.acknowledged === true}
            onCheckedChange={(value) =>
              onChange({ acknowledged: value === true })
            }
          />
          <span className="text-sm font-medium leading-snug">
            {step.confirmationLabel ?? "Jag har tagit del av informationen."}
          </span>
        </label>
      );
    case "singleChoice":
      return (
        <div className="flex flex-col gap-2">
          {step.options?.map((option) => {
            const selected = response.selectedOptionId === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => onChange({ selectedOptionId: option.id })}
                className={cn(
                  "rounded-[1.35rem] border px-4 py-4 text-left text-sm font-medium transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
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
          {step.content ? (
            <div className="rounded-[1.35rem] border border-accent-foreground/10 bg-accent/60 px-4 py-4 sm:px-5">
              <p className="text-sm leading-relaxed text-accent-foreground/90">
                {step.content}
              </p>
            </div>
          ) : null}
          <div className="flex flex-col gap-2">
            <Label
              htmlFor={`task-comment-${step.id}`}
              className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70"
            >
              Kommentar (valfritt)
            </Label>
            <Textarea
              id={`task-comment-${step.id}`}
              value={response.comment ?? ""}
              onChange={(event) => onChange({ comment: event.target.value })}
              placeholder="Kort anteckning om genomförd uppgift…"
              className="min-h-24 resize-none"
            />
          </div>
          <label
            htmlFor={`task-${step.id}`}
            className={cn(
              "flex cursor-pointer items-center gap-3.5 rounded-[1.35rem] border px-4 py-4",
              "transition-all duration-200 select-none",
              response.taskConfirmed
                ? "border-success/30 bg-success-subtle shadow-[0_0_0_3px_rgba(16,185,129,0.08)]"
                : "border-border bg-secondary/40 hover:bg-secondary hover:border-border/80"
            )}
          >
            <Checkbox
              id={`task-${step.id}`}
              checked={response.taskConfirmed === true}
              onCheckedChange={(value) =>
                onChange({ taskConfirmed: value === true })
              }
            />
            <span className="text-sm font-medium leading-snug">
              Jag bekräftar att uppgiften är genomförd
            </span>
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
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Stegöversikt</SheetTitle>
          <SheetDescription>
            Se alla steg och hoppa till ett steg du redan har besökt.
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
                      ? "bg-success text-white"
                      : status === "current"
                        ? "border-2 border-primary bg-primary/10"
                        : "border-2 border-border"
                  )}
                >
                  {status === "completed" ? (
                    <Check className="size-3" strokeWidth={3} />
                  ) : (
                    <span className="text-[0.65rem] font-semibold text-muted-foreground">
                      {index + 1}
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{step.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {getOverviewStatusLabel(status)}
                    {step.required ? " · Obligatoriskt" : ""}
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

function GuidedCompletionView({ instance }: { instance: OnboardingInstance }) {
  const visibleSteps = getVisibleSteps(instance);
  const completedCount = countCompletedVisibleSteps(instance);

  return (
    <PageContainer className="relative flex min-h-[80vh] flex-col items-center justify-center gap-8 py-12 text-center sm:gap-10 sm:py-16">
      <div className="absolute left-0 top-0 pt-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/">
            <ArrowLeft />
            Tillbaka
          </Link>
        </Button>
      </div>

      <div className="flex flex-col items-center gap-7 animate-fade-up sm:gap-8">
        <div className="flex size-[5.5rem] items-center justify-center rounded-full bg-success-subtle animate-scale-in sm:size-24">
          <CheckCircle2 className="size-12 text-success" strokeWidth={1.5} />
        </div>

        <div className="flex flex-col gap-2.5">
          <h1 className="text-[2.1rem] font-semibold tracking-tight sm:text-5xl">
            Onboarding slutförd!
          </h1>
          <p className="max-w-md text-base text-muted-foreground">
            {instance.participantName} har genomfört grundintroduktionen.
          </p>
        </div>

        <Card className="w-full max-w-md overflow-hidden p-0 text-left">
          <div className="flex flex-col gap-4 px-5 py-5">
            <div>
              <p className="text-sm font-semibold">{instance.title}</p>
              <p className="text-xs text-muted-foreground">
                Ansvarig: {instance.responsibleName}
              </p>
            </div>
            <dl className="flex flex-col gap-0 text-sm">
              {[
                { label: "Progress", value: `${instance.progress}%` },
                {
                  label: "Slutförda steg",
                  value: `${completedCount} av ${visibleSteps.length}`,
                },
                {
                  label: "Slutförd",
                  value: instance.completedAt
                    ? new Date(instance.completedAt).toLocaleDateString("sv-SE")
                    : "-",
                },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between gap-2 py-1.5">
                  <dt className="text-muted-foreground">{label}</dt>
                  <dd className="font-medium">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-success to-emerald-400" />
        </Card>

        <Card className="w-full max-w-md p-5 text-left">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
            Sammanfattning
          </p>
          <ul className="flex flex-col gap-2">
            {visibleSteps
              .filter((step) => step.status === "completed")
              .map((step) => (
                <li
                  key={step.id}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <Check className="mt-0.5 size-4 shrink-0 text-success" />
                  <span>{step.title}</span>
                </li>
              ))}
          </ul>
        </Card>

        <Button size="lg" className="w-full sm:w-auto" asChild>
          <Link href="/">
            <ArrowLeft />
            Startsidan
          </Link>
        </Button>

        <p className="text-xs text-muted-foreground/70">
          Sparat i den här webbläsaren.
        </p>
      </div>
    </PageContainer>
  );
}

function getStepTypeLabel(type: OnboardingStepInstance["type"]): string {
  switch (type) {
    case "information":
      return "Information";
    case "confirmation":
      return "Bekräftelse";
    case "singleChoice":
      return "Val";
    case "task":
      return "Uppgift";
    default:
      return type;
  }
}

function getOverviewStatusLabel(
  status: ReturnType<typeof getStepOverviewStatus>
): string {
  switch (status) {
    case "completed":
      return "Klart";
    case "current":
      return "Aktuellt steg";
    case "available":
      return "Tillgängligt";
    case "locked":
      return "Inte påbörjat";
    case "skipped":
      return "Hoppas över";
    default:
      return status;
  }
}
