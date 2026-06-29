"use client";

import Link from "next/link";
import { Plus } from "lucide-react";

import { PageContainer } from "@/components/page-container";
import { SectionHeader } from "@/components/section-header";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { OnboardingCard } from "@/components/onboarding/OnboardingCard";
import { useOnboardingStore } from "@/components/providers/onboarding-provider";

export default function HomePage() {
  const { ongoingOnboardings, completedOnboardings } = useOnboardingStore();

  return (
    <PageContainer className="relative flex flex-col gap-14 overflow-hidden sm:gap-16">
      {/* ── Decorative background glow ──────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 size-[560px] rounded-full bg-primary/5 blur-[80px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-20 size-96 rounded-full bg-violet-500/[0.04] blur-[60px]"
      />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <header className="relative flex flex-col gap-6 animate-fade-up sm:gap-7">
        <div className="flex flex-col gap-2.5">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-primary/60">
            Onboarding
          </p>
          <h1 className="max-w-[10ch] text-[2.3rem] font-semibold tracking-tight sm:max-w-none sm:text-5xl">
            Välkommen tillbaka.
          </h1>
          <p className="max-w-[34ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
            Hantera och följ upp dina medarbetares onboarding-program.
          </p>
        </div>
        <Button size="lg" className="w-full sm:w-fit" asChild>
          <Link href="/onboarding/new">
            <Plus />
            Ny onboarding
          </Link>
        </Button>
      </header>

      {/* ── Pågående ─────────────────────────────────────────────── */}
      <section
        className="relative flex flex-col gap-5 animate-fade-up"
        style={{ animationDelay: "0.08s" }}
      >
        <SectionHeader
          title="Pågående"
          description={
            ongoingOnboardings.length > 0
              ? `${ongoingOnboardings.length} onboarding${ongoingOnboardings.length !== 1 ? "ar" : ""} pågår just nu`
              : undefined
          }
        />
        {ongoingOnboardings.length === 0 ? (
          <EmptyState
            title="Inga pågående onboardingar"
            description="Starta en ny onboarding för att komma igång."
            action={
              <Button variant="outline" size="sm" asChild>
                <Link href="/onboarding/new">
                  <Plus />
                  Ny onboarding
                </Link>
              </Button>
            }
          />
        ) : (
          <div className="flex flex-col gap-3">
            {ongoingOnboardings.map((o, i) => (
              <OnboardingCard key={o.id} onboarding={o} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* ── Slutförda ────────────────────────────────────────────── */}
      <section
        className="relative flex flex-col gap-5 animate-fade-up"
        style={{ animationDelay: "0.14s" }}
      >
        <SectionHeader
          title="Slutförda"
          description={
            completedOnboardings.length > 0
              ? `${completedOnboardings.length} onboarding${completedOnboardings.length !== 1 ? "ar" : ""} genomförda`
              : undefined
          }
        />
        {completedOnboardings.length === 0 ? (
          <EmptyState
            title="Inga slutförda onboardingar ännu"
            description="Slutförda onboardingar visas här när alla punkter är genomförda."
          />
        ) : (
          <div className="flex flex-col gap-3">
            {completedOnboardings.map((o, i) => (
              <OnboardingCard key={o.id} onboarding={o} index={i} />
            ))}
          </div>
        )}
      </section>
    </PageContainer>
  );
}
