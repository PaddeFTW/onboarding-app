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
import { SignOutButton } from "@/components/auth/sign-out-button";

const links = [
  ["/dokument-workspace", "Dokument"],
  ["/moduler", "Moduler"],
  ["/kundtest", "Kundtest"],
  ["/dokument", "Filer"],
  ["/historik", "Historik"],
  ["/ordlista", "Ordlista"],
  ["/installera", "Installera"],
];

export default function HomePage() {
  const { ongoingOnboardings, completedOnboardings, isLoading, error, refreshOnboardings } = useOnboardingStore();

  return (
    <PageContainer className="relative flex flex-col gap-14 overflow-hidden sm:gap-16">
      <header className="relative flex flex-col gap-6 sm:gap-7">
        <div className="flex flex-col gap-2.5">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-primary/60">Onboarding</p>
          <h1 className="max-w-[10ch] text-[2.3rem] font-semibold tracking-tight sm:max-w-none sm:text-5xl">Välkommen tillbaka.</h1>
          <p className="max-w-[34ch] text-base leading-relaxed text-muted-foreground sm:text-lg">Hantera och följ upp dina medarbetares onboarding-program.</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Button size="lg" className="w-full sm:w-fit" asChild><Link href="/onboarding/new"><Plus />Ny onboarding</Link></Button>
          <Button size="lg" variant="outline" className="w-full sm:w-fit" asChild><Link href="/onboarding/templates">Företagsmallar</Link></Button>
          <Button size="lg" variant="outline" className="w-full sm:w-fit" asChild><Link href="/inbjudan">Bjud in</Link></Button>
          <SignOutButton />
        </div>
        <nav className="flex flex-wrap gap-3 text-sm">
          {links.map(([href, label]) => <Link key={href} className="font-medium text-[#5b4dff]" href={href}>{label}</Link>)}
        </nav>
      </header>
      <section aria-label="Guidat onboarding-flöde">
        <Link href="/onboarding/guided/demo-byggco" className="group flex flex-col gap-4 rounded-2xl border border-primary/20 bg-primary-light p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2"><Sparkles className="size-3.5 text-primary" /><span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-primary/70">Förhandsvisning</span></div>
            <h2 className="text-[1.05rem] font-semibold">Prova det guidade flödet</h2>
            <p className="max-w-[42ch] text-sm text-muted-foreground">En steg-för-steg-upplevelse som leder deltagaren genom programmet.</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Starta demo <ArrowRight className="size-4" /></span>
        </Link>
      </section>
      <section className="flex flex-col gap-5">
        <SectionHeader title="Pågående" description={ongoingOnboardings.length > 0 ? `${ongoingOnboardings.length} pågår` : undefined} />
        {isLoading ? <LoadingState variant="cards" count={2} /> : error ? <EmptyState title="Kunde inte ladda onboardingar" description={error} action={<Button onClick={() => void refreshOnboardings()}>Försök igen</Button>} /> : ongoingOnboardings.length === 0 ? <EmptyState title="Inga pågående onboardingar" description="Starta en ny onboarding för att komma igång." /> : <div className="flex flex-col gap-3">{ongoingOnboardings.map((o, i) => <OnboardingCard key={o.id} onboarding={o} index={i} />)}</div>}
      </section>
      <section className="flex flex-col gap-5">
        <SectionHeader title="Slutförda" description={completedOnboardings.length > 0 ? `${completedOnboardings.length} genomförda` : undefined} />
        {isLoading ? <LoadingState variant="cards" count={1} /> : completedOnboardings.length === 0 ? <EmptyState title="Inga slutförda onboardingar ännu" description="Slutförda onboardingar visas här när alla punkter är genomförda." /> : <div className="flex flex-col gap-3">{completedOnboardings.map((o, i) => <OnboardingCard key={o.id} onboarding={o} index={i} />)}</div>}
      </section>
    </PageContainer>
  );
}
