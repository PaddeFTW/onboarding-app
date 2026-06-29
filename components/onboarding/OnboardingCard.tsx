import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  type OnboardingRecord,
  calcProgress,
  formatDate,
  getInitials,
  getOnboardingStatus,
} from "@/lib/onboarding";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface OnboardingCardProps {
  onboarding: OnboardingRecord;
  index?: number;
}

export function OnboardingCard({ onboarding, index = 0 }: OnboardingCardProps) {
  const { id, firstName, lastName, position, startDate, checklist, completedAt } =
    onboarding;
  const progress = calcProgress(checklist);
  const status = getOnboardingStatus(onboarding);
  const confirmedCount = checklist.filter((item) => item.completedAt).length;

  return (
    <div
      className="group animate-fade-up"
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      <Link
        href={`/onboarding/${id}`}
        className="block rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
      >
        <Card
          className={cn(
            "relative overflow-hidden p-4 sm:p-5",
            "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
            "group-hover:-translate-y-1.5 group-hover:shadow-soft-lg group-hover:border-primary/15",
            "active:translate-y-0 active:shadow-soft-sm active:duration-100"
          )}
        >
          {/* Subtle indigo gradient wash on hover */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />

          <div className="relative flex items-center gap-3.5 sm:gap-4">
            {/* Avatar */}
            <div
              className={cn(
                "flex size-10 shrink-0 items-center justify-center rounded-2xl sm:size-11",
                "bg-primary/10 text-xs font-semibold text-primary sm:text-sm",
                "transition-all duration-300",
                "group-hover:bg-primary/15 group-hover:shadow-[0_0_0_3px] group-hover:shadow-primary/10"
              )}
            >
              {getInitials(firstName, lastName)}
            </div>

            {/* Content */}
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              {/* Name + status */}
              <div className="flex items-start justify-between gap-2.5">
                <div className="flex min-w-0 flex-col gap-0.5">
                  <span className="truncate text-[0.92rem] font-semibold leading-snug tracking-tight">
                    {firstName} {lastName}
                  </span>
                  <span className="text-xs text-muted-foreground">{position}</span>
                </div>
                <StatusPill status={status} />
              </div>

              {/* Progress bar + numbers */}
              <div className="flex flex-col gap-1.5">
                <Progress value={progress} className="h-1.5" />
                <div className="flex items-center justify-between">
                  <span className="text-[0.6875rem] text-muted-foreground/75">
                    {confirmedCount} av {checklist.length} klara
                  </span>
                  <span className="text-[0.6875rem] font-semibold tabular-nums text-foreground/65">
                    {progress}%
                  </span>
                </div>
              </div>

              {/* Date + directional arrow */}
              <div className="flex items-center justify-between">
                <p className="text-[0.6875rem] text-muted-foreground/55">
                  {completedAt
                    ? `Slutförd ${formatDate(completedAt)}`
                    : `Startade ${formatDate(startDate)}`}
                </p>
                <ArrowRight
                  className={cn(
                    "size-3.5 text-muted-foreground/0 transition-all duration-200",
                    "group-hover:text-muted-foreground/50 group-hover:translate-x-0.5"
                  )}
                />
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </div>
  );
}

// ── Minimal dot + text status pill — Linear-inspired ─────────────────
function StatusPill({
  status,
}: {
  status: "none" | "ongoing" | "completed";
}) {
  if (status === "completed") {
    return (
      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-success-subtle px-2.5 py-1">
        <span className="size-1.5 rounded-full bg-success" />
        <span className="text-[0.6875rem] font-medium text-success">Slutförd</span>
      </span>
    );
  }
  if (status === "ongoing") {
    return (
      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-warning-subtle px-2.5 py-1">
        <span className="size-1.5 rounded-full bg-warning" />
        <span className="text-[0.6875rem] font-medium text-warning">Pågående</span>
      </span>
    );
  }
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1">
      <span className="size-1.5 rounded-full bg-muted-foreground/40" />
      <span className="text-[0.6875rem] font-medium text-muted-foreground">Ej påbörjad</span>
    </span>
  );
}
