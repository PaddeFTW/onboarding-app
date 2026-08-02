"use client";

import Link from "next/link";
import { ArrowRight, Plus, Sparkles } from "lucide-react";

import { PageContainer } from "@/components/page-container";
import { SectionHeader } from "@/components/section-header";
import { EmptyState } from "@/components/empty-state";
import { LoadingState } from "@/components/loading-state";
import { Button } from "@/components/ui/button";
import { OnboardingCard } from "@/components/onboarding/OnboardingCard";
import { useOnboardingStore } from "@/components/providers/onboarding-provider";

export default function HomePage() {
  const {
    ongoingOnboardings,
    completedOnboardings,
    isLoading,
    error,
    refreshOnboardings,
  } = useOnboardingStore();

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

      {/* ── Guidat flöde — förhandsvisning ──────────────────────── */}
      <section
        className="relative animate-fade-up"
        style={{ animationDelay: "0.06s" }}
        aria-label="Guidat onboarding-flöde – förhandsvisning"
      >
        <Link
          href="/onboarding/guided/demo-byggco"
          className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-primary/20 bg-primary-light p-5 transition-all duration-200 hover:border-primary/35 hover:shadow-[0_4px_20px_-4px_rgba(99,102,241,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-6"
        >
          {/* Subtle background glow on hover */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/[0.06] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />

          <div className="relative flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="flex size-6 shrink-0 items-center justify-center rounded-md bg-primary/10">
                <Sparkles className="size-3.5 text-primary" aria-hidden="true" />
              </div>
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-primary/70">
                Nytt — Förhandsvisning
              </span>
            </div>
            <h2 className="text-[1.05rem] font-semibold tracking-tight text-foreground">
              Prova det guidade flödet
            </h2>
            <p className="max-w-[42ch] text-sm leading-relaxed text-muted-foreground">
              En steg-för-steg-upplevelse som leder deltagaren genom hela onboarding-programmet. Se hur det fungerar med en interaktiv demo.
            </p>
          </div>

          <div className="relative flex shrink-0 items-center gap-2 self-start sm:self-auto">
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft-sm transition-all duration-150 group-hover:bg-primary/90 group-hover:shadow-soft-md">
              Starta demo
              <ArrowRight className="size-4 transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </div>
        </Link>
      </section>

      {/* ── Pågående ─────────────────────────────────────────────── */}
      <section
        className="relative flex flex-col gap-5 animate-fade-up"
        style={{ animationDelay: "0.12s" }}
      >
        <SectionHeader
          title="Pågående"
          description={
            ongoingOnboardings.length > 0
              ? `${ongoingOnboardings.length} onboarding${ongoingOnboardings.length !== 1 ? "ar" : ""} pågår just nu`
              : undefined
          }
        />
        {isLoading ? (
          <LoadingState variant="cards" count={2} />
        ) : error ? (
          <EmptyState
            title="Kunde inte ladda onboardingar"
            description={error}
            action={<Button onClick={() => void refreshOnboardings()}>Försök igen</Button>}
          />
        ) : ongoingOnboardings.length === 0 ? (
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
        style={{ animationDelay: "0.18s" }}
      >
        <SectionHeader
          title="Slutförda"
          description={
            completedOnboardings.length > 0
              ? `${completedOnboardings.length} onboarding${completedOnboardings.length !== 1 ? "ar" : ""} genomförda`
              : undefined
          }
        />
        {isLoading ? (
          <LoadingState variant="cards" count={1} />
        ) : error ? (
          <EmptyState
            title="Kunde inte ladda slutförda onboardingar"
            description={error}
            action={<Button onClick={() => void refreshOnboardings()}>Försök igen</Button>}
          />
        ) : completedOnboardings.length === 0 ? (
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
