"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  ChevronRight,
  Download,
  FileText,
  Plus,
} from "lucide-react";

import {
  calcProgress,
  countCompleted,
  formatDate,
  getInitials,
  getOnboardingStatus,
  type OnboardingRecord,
} from "@/lib/onboarding";
import { cn } from "@/lib/utils";

import { useOnboardingStore } from "@/components/providers/onboarding-provider";
import { EmptyState } from "@/components/empty-state";
import { LoadingState } from "@/components/loading-state";
import { PageContainer } from "@/components/page-container";
import { SectionHeader } from "@/components/section-header";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetBody,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { ExportDialog } from "@/components/onboarding/ExportDialog";

export function ChecklistView({ id }: { id: string }) {
  const {
    getOnboarding,
    setChecklistItemCompleted,
    isLoading,
    error,
    refreshOnboardings,
  } = useOnboardingStore();
  const onboarding = getOnboarding(id);
  const [openItemId, setOpenItemId] = useState<string | null>(null);
  const [sheetChecked, setSheetChecked] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [animProgress, setAnimProgress] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  const rawProgress = onboarding ? calcProgress(onboarding.checklist) : 0;

  useEffect(() => {
    const t = setTimeout(() => setAnimProgress(rawProgress), 300);
    return () => clearTimeout(t);
  }, [id, rawProgress]);

  if (isLoading && !onboarding) {
    return (
      <PageContainer>
        <LoadingState label="Laddar onboarding..." />
      </PageContainer>
    );
  }

  if (!onboarding) {
    return (
      <PageContainer className="flex flex-col gap-8">
        <Button variant="ghost" size="sm" className="-ml-3 w-fit" asChild>
          <Link href="/">
            <ArrowLeft />
            Tillbaka
          </Link>
        </Button>
        <EmptyState
          title={error ? "Kunde inte ladda onboardingen" : "Onboardingen hittades inte"}
          description={
            error ??
            "Den här onboardingen finns inte längre i den aktiva sessionen."
          }
          action={
            error ? (
              <Button onClick={() => void refreshOnboardings()}>Försök igen</Button>
            ) : (
              <Button asChild>
                <Link href="/">Gå till startsidan</Link>
              </Button>
            )
          }
        />
      </PageContainer>
    );
  }

  const currentOnboarding = onboarding;

  const confirmedCount = countCompleted(currentOnboarding.checklist);
  const totalCount = currentOnboarding.checklist.length;
  const status = getOnboardingStatus(currentOnboarding);
  const isCompleted = status === "completed";

  const openItem =
    currentOnboarding.checklist.find((item) => item.id === openItemId) ?? null;

  function handleOpenItem(itemId: string) {
    setOpenItemId(itemId);
    const item = currentOnboarding.checklist.find((entry) => entry.id === itemId);
    setSheetChecked(Boolean(item?.completedAt));
  }

  async function handleSaveItem() {
    if (!openItemId) return;

    try {
      setIsSaving(true);
      await setChecklistItemCompleted(
        currentOnboarding.id,
        openItemId,
        sheetChecked
      );
      setOpenItemId(null);
    } catch (saveError) {
      toast.error(
        saveError instanceof Error
          ? saveError.message
          : "Kunde inte uppdatera checklistpunkten."
      );
    } finally {
      setIsSaving(false);
    }
  }

  const fullName = `${currentOnboarding.firstName} ${currentOnboarding.lastName}`;

  if (isCompleted) {
    return (
      <CompletionView
        onboarding={currentOnboarding}
        exportOpen={exportOpen}
        setExportOpen={setExportOpen}
      />
    );
  }

  return (
    <PageContainer className="flex flex-col gap-8 animate-fade-up sm:gap-10">
      <Button variant="ghost" size="sm" className="-ml-3 w-fit" asChild>
        <Link href="/">
          <ArrowLeft />
          Tillbaka
        </Link>
      </Button>

      <div className="flex items-start gap-3.5 sm:gap-4">
        <div
          className={cn(
            "flex size-12 shrink-0 items-center justify-center rounded-2xl sm:size-14",
            "bg-primary/10 text-lg font-semibold text-primary sm:text-xl",
            "ring-4 ring-primary/5"
          )}
        >
          {getInitials(currentOnboarding.firstName, currentOnboarding.lastName)}
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-[1.6rem] font-semibold tracking-tight sm:text-3xl">
              {fullName}
            </h1>
            <Badge variant={status === "none" ? "default" : "warning"}>
              {status === "none" ? "Ej påbörjad" : "Pågående"}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {currentOnboarding.position}
            <span className="mx-1.5 opacity-30">·</span>
            {currentOnboarding.manager}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground/60">
            Startade {formatDate(currentOnboarding.startDate)}
          </p>
        </div>
      </div>

      <Card className="overflow-hidden p-0">
        <div className="flex flex-col gap-4 px-5 pb-5 pt-5 sm:px-6 sm:pb-6 sm:pt-6">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-primary/60">
              Progress
            </p>
            <span className="text-sm text-muted-foreground">
              {confirmedCount} av {totalCount} klara
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
            <span className="max-w-[12ch] text-right text-xs leading-relaxed text-muted-foreground sm:max-w-none sm:text-sm">
              {status === "none"
                ? "Inte påbörjad ännu"
                : "Fortsätt genom att markera fler steg som klara"}
            </span>
          </div>
        </div>
        <Progress value={animProgress} className="h-1.5 rounded-none" />
      </Card>

      <section className="flex flex-col gap-4">
        <SectionHeader
          title="Checklista"
          description="Tryck på en punkt för att läsa mer och markera den som genomgången."
        />
        <div className="flex flex-col gap-2">
          {currentOnboarding.checklist.map((item, i) => {
            const done = Boolean(item.completedAt);
            return (
              <div
                key={item.id}
                className="animate-fade-up"
                style={{ animationDelay: `${i * 0.035}s` }}
              >
                <button
                  type="button"
                  onClick={() => handleOpenItem(item.id)}
                  className={cn(
                    "group relative w-full rounded-[1.4rem] border text-left",
                    "px-4 py-4 transition-all duration-200 ease-out sm:px-5",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
                    "active:scale-[0.995] active:duration-75",
                    done
                      ? "border-success/20 bg-success-subtle/35 hover:bg-success-subtle/50"
                      : [
                          "border-border/90 bg-card",
                          "hover:-translate-y-px hover:border-primary/18",
                          "hover:bg-accent/25 hover:shadow-soft-sm",
                        ]
                  )}
                >
                  <div className="flex items-center gap-3.5 sm:gap-4">
                    <div
                      className={cn(
                        "flex size-5 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                        done
                          ? "bg-success text-white shadow-[0_0_0_4px_rgba(16,185,129,0.15)]"
                          : "border-2 border-border group-hover:border-primary/40"
                      )}
                    >
                      {done && <Check className="size-3" strokeWidth={3} />}
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <span
                        className={cn(
                          "truncate text-sm font-medium transition-colors duration-200",
                          done ? "text-muted-foreground" : "text-foreground"
                        )}
                      >
                        {item.title}
                      </span>
                      <span className="line-clamp-1 text-xs text-muted-foreground/75">
                        {item.description}
                      </span>
                    </div>
                    <ChevronRight
                      className={cn(
                        "size-[1.05rem] shrink-0 transition-all duration-200",
                        done
                          ? "text-success/40"
                          : "text-muted-foreground/30 group-hover:translate-x-0.5 group-hover:text-muted-foreground/70"
                      )}
                    />
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <Sheet
        open={openItemId !== null}
        onOpenChange={(open) => {
          if (!open) setOpenItemId(null);
        }}
      >
        <SheetContent>
          {openItem && (
            <>
              <SheetHeader>
                <SheetTitle>{openItem.title}</SheetTitle>
                <SheetDescription>{openItem.description}</SheetDescription>
              </SheetHeader>

              <SheetBody className="flex flex-col gap-6">
                {openItem.info && (
                  <div className="rounded-[1.35rem] border border-accent-foreground/10 bg-accent/60 px-4 py-4 sm:px-5">
                    <p className="text-sm leading-relaxed text-accent-foreground/90">
                      {openItem.info}
                    </p>
                  </div>
                )}

                {openItem.documents.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                      Dokument
                    </p>
                    {openItem.documents.map((doc) => (
                      <div
                        key={doc.name}
                        className={cn(
                          "flex cursor-pointer items-center gap-3 rounded-2xl border border-border/90 bg-secondary/40 px-4 py-3 transition-all duration-200 hover:-translate-y-px hover:bg-accent/40 hover:shadow-soft-xs"
                        )}
                      >
                        <FileText className="size-4 shrink-0 text-muted-foreground" />
                        <span className="flex-1 truncate text-sm">{doc.name}</span>
                        <Download className="size-3.5 shrink-0 text-muted-foreground/60" />
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="comment"
                    className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70"
                  >
                    Kommentar
                  </Label>
                  <Textarea
                    id="comment"
                    placeholder="Lägg till en kommentar om genomgången…"
                    className="min-h-28 resize-none"
                  />
                </div>

                <label
                  htmlFor="confirm-item"
                  className={cn(
                    "flex cursor-pointer items-center gap-3.5 rounded-[1.35rem] border px-4 py-4",
                    "transition-all duration-200 select-none",
                    sheetChecked
                      ? "border-success/30 bg-success-subtle shadow-[0_0_0_3px_rgba(16,185,129,0.08)]"
                      : "border-border bg-secondary/40 hover:bg-secondary hover:border-border/80"
                  )}
                >
                  <Checkbox
                    id="confirm-item"
                    checked={sheetChecked}
                    onCheckedChange={(v) => setSheetChecked(v === true)}
                  />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-semibold">
                      Bekräfta genomgång
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Markerar punkten som slutförd
                    </span>
                  </div>
                </label>
              </SheetBody>

              <SheetFooter>
                <SheetClose asChild>
                  <Button variant="outline" className="w-full sm:w-auto">
                    Avbryt
                  </Button>
                </SheetClose>
                <Button
                  onClick={handleSaveItem}
                  className="w-full sm:w-auto"
                  disabled={isSaving}
                >
                  Spara
                </Button>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>

      <ExportDialog
        open={exportOpen}
        onOpenChange={setExportOpen}
        employeeName={fullName}
      />
    </PageContainer>
  );
}

function CompletionView({
  onboarding,
  exportOpen,
  setExportOpen,
}: {
  onboarding: OnboardingRecord;
  exportOpen: boolean;
  setExportOpen: (v: boolean) => void;
}) {
  const fullName = `${onboarding.firstName} ${onboarding.lastName}`;
  const completedDate = onboarding.completedAt
    ? formatDate(onboarding.completedAt)
    : "-";

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
        <div
          className={cn(
            "flex size-[5.5rem] items-center justify-center rounded-full bg-success-subtle animate-scale-in animate-pulse-ring sm:size-24"
          )}
        >
          <CheckCircle2 className="size-12 text-success" strokeWidth={1.5} />
        </div>

        <div className="flex flex-col gap-2.5">
          <h1 className="text-[2.1rem] font-semibold tracking-tight sm:text-5xl">
            Onboarding slutförd!
          </h1>
          <p className="max-w-sm text-base text-muted-foreground">
            {fullName} har genomgått hela onboarding-programmet och är redo att
            börja.
          </p>
        </div>

        <Card className="w-full max-w-[19rem] overflow-hidden p-0 text-left">
          <div className="flex items-center gap-3 px-5 pt-5 pb-4">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-xs font-semibold text-primary">
              {getInitials(onboarding.firstName, onboarding.lastName)}
            </div>
            <div>
              <p className="text-sm font-semibold leading-snug">{fullName}</p>
              <p className="text-xs text-muted-foreground">{onboarding.position}</p>
            </div>
          </div>
          <div className="mx-5 h-px bg-border" />
          <dl className="flex flex-col gap-0 px-5 py-4">
            {[
              { label: "Ansvarig", value: onboarding.manager },
              { label: "Startade", value: formatDate(onboarding.startDate) },
              { label: "Slutfört", value: completedDate },
              {
                label: "Punkter",
                value: `${onboarding.checklist.length} / ${onboarding.checklist.length}`,
              },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex justify-between gap-2 py-1.5 text-sm"
              >
                <dt className="text-muted-foreground">{label}</dt>
                <dd className="font-medium text-right">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="h-1 w-full bg-gradient-to-r from-success to-emerald-400" />
        </Card>

        <div className="flex w-full max-w-sm flex-col gap-2.5 sm:max-w-none sm:flex-row">
          <Button
            size="lg"
            className="w-full sm:w-auto"
            onClick={() => setExportOpen(true)}
          >
            <Download />
            Exportera
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
            <Link href="/onboarding/new">
              <Plus />
              Ny onboarding
            </Link>
          </Button>
          <Button size="lg" variant="ghost" className="w-full sm:w-auto" asChild>
            <Link href="/">
              <ArrowLeft />
              Startsidan
            </Link>
          </Button>
        </div>
      </div>

      <ExportDialog
        open={exportOpen}
        onOpenChange={setExportOpen}
        employeeName={fullName}
      />
    </PageContainer>
  );
}
