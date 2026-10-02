"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Lock, Plus } from "lucide-react";
import Link from "next/link";
import { useSyncExternalStore } from "react";

import { useGuidedOnboardingStore } from "@/components/providers/guided-onboarding-provider";
import { PageContainer } from "@/components/page-container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  SYSTEM_TEMPLATE_NAME,
  archivePublished,
  createDraftFromPublished,
  createDraftFromSystemTemplate,
  createInstanceFromPublishedVersion,
  getCompanyTemplateError,
  getCompanyTemplateServerSnapshot,
  getCompanyTemplateSnapshot,
  getCompanyTemplatesHydrated,
  getSystemTemplateStepCount,
  initCompanyTemplateStore,
  publishDraft,
  removeDraftStep,
  subscribeCompanyTemplates,
  updateDraft,
  type CompanyTemplateVersion,
} from "@/lib/company-templates";

function statusLabel(status: CompanyTemplateVersion["status"]) {
  if (status === "draft") return "Utkast";
  if (status === "published") return "Publicerad";
  return "Arkiverad";
}

export function TemplateLibrary() {
  const router = useRouter();
  const { rememberInstance } = useGuidedOnboardingStore();
  const [participantName, setParticipantName] = useState("");
  const [responsibleName, setResponsibleName] = useState("");
  const [startError, setStartError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    void initCompanyTemplateStore();
  }, []);

  const versions = useSyncExternalStore(
    subscribeCompanyTemplates,
    getCompanyTemplateSnapshot,
    getCompanyTemplateServerSnapshot
  );
  const isHydrated = useSyncExternalStore(
    subscribeCompanyTemplates,
    getCompanyTemplatesHydrated,
    () => false
  );
  const storeError = useSyncExternalStore(
    subscribeCompanyTemplates,
    getCompanyTemplateError,
    () => ""
  );
  const hasDraft = versions.some((version) => version.status === "draft");

  async function run(action: () => Promise<unknown>) {
    setBusy(true);
    setStartError("");
    try {
      await action();
    } catch (error) {
      setStartError(error instanceof Error ? error.message : "Kunde inte spara i Supabase.");
    } finally {
      setBusy(false);
    }
  }

  function startFrom(version: CompanyTemplateVersion) {
    if (!participantName.trim() || !responsibleName.trim()) {
      setStartError("Fyll i deltagare och ansvarig innan du startar.");
      return;
    }

    void run(async () => {
      const instance = await createInstanceFromPublishedVersion(
        version,
        participantName.trim(),
        responsibleName.trim()
      );
      rememberInstance(instance);
      router.push(`/onboarding/guided/${instance.id}`);
    });
  }

  return (
    <PageContainer className="flex flex-col gap-8">
      <Button variant="ghost" size="sm" className="-ml-3 w-fit" asChild>
        <Link href="/">
          <ArrowLeft />
          Tillbaka
        </Link>
      </Button>

      <header className="flex flex-col gap-2">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-primary/60">
          Del 3 — Supabase
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">Företagsmallar</h1>
        <p className="max-w-[62ch] text-sm leading-relaxed text-muted-foreground">
          Systemmallen är låst. Utkast, publicerade versioner och guidningar sparas i Supabase. Inloggning och företagsisolering kommer i Del 4.
        </p>
      </header>

      {storeError ? (
        <Card className="border-destructive/30 p-4 text-sm text-destructive">{storeError}</Card>
      ) : null}

      <Card className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Lock className="size-4 text-primary" />
            <h2 className="font-semibold">{SYSTEM_TEMPLATE_NAME}</h2>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {getSystemTemplateStepCount()} steg. Kan inte redigeras direkt.
          </p>
        </div>
        <Button
          type="button"
          disabled={!isHydrated || hasDraft || busy}
          onClick={() => void run(() => createDraftFromSystemTemplate())}
        >
          <Plus />
          Skapa utkast
        </Button>
      </Card>

      <Card className="grid gap-4 p-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="participant">Deltagare</Label>
          <Input id="participant" value={participantName} onChange={(event) => setParticipantName(event.target.value)} placeholder="Namn på ny medarbetare" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="responsible">Ansvarig</Label>
          <Input id="responsible" value={responsibleName} onChange={(event) => setResponsibleName(event.target.value)} placeholder="Närmaste chef" />
        </div>
        {startError ? <p className="text-sm text-destructive sm:col-span-2">{startError}</p> : null}
      </Card>

      <div className="flex flex-col gap-3">
        {!isHydrated ? (
          <p className="text-sm text-muted-foreground">Laddar mallar från Supabase...</p>
        ) : versions.length === 0 ? (
          <p className="text-sm text-muted-foreground">Ingen företagsmall ännu. Skapa ett utkast från systemmallen.</p>
        ) : (
          versions.map((version) => (
            <Card key={version.id} className="flex flex-col gap-4 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-semibold">{version.companyName} — {version.name}</h2>
                    <Badge variant="outline">{statusLabel(version.status)}</Badge>
                    <Badge variant="outline">{version.versionLabel}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{version.steps.length} steg</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {version.status === "draft" ? (
                    <Button type="button" disabled={busy} onClick={() => void run(() => publishDraft(version.id))}>Publicera</Button>
                  ) : null}
                  {version.status === "published" ? (
                    <>
                      <Button type="button" disabled={busy} onClick={() => startFrom(version)}>Starta onboarding</Button>
                      <Button type="button" variant="outline" disabled={hasDraft || busy} onClick={() => void run(() => createDraftFromPublished(version.id))}>Nytt utkast</Button>
                      <Button type="button" variant="outline" disabled={busy} onClick={() => void run(() => archivePublished(version.id))}>Arkivera</Button>
                    </>
                  ) : null}
                </div>
              </div>
              {version.status === "draft" ? (
                <div className="flex flex-col gap-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor={`company-${version.id}`}>Företag</Label>
                      <Input id={`company-${version.id}`} value={version.companyName} onChange={(event) => void updateDraft(version.id, (current) => ({ ...current, companyName: event.target.value }))} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor={`name-${version.id}`}>Mallnamn</Label>
                      <Input id={`name-${version.id}`} value={version.name} onChange={(event) => void updateDraft(version.id, (current) => ({ ...current, name: event.target.value }))} />
                    </div>
                  </div>
                  <ul className="flex flex-col gap-2">
                    {version.steps.map((step) => (
                      <li key={step.id} className="flex items-center justify-between gap-3 rounded-xl border px-3 py-2 text-sm">
                        <span>{step.order}. {step.title}</span>
                        <Button type="button" variant="ghost" size="sm" onClick={() => void run(() => removeDraftStep(version.id, step.id))}>Ta bort</Button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">Publicerad version är låst. Nya onboardingar får en egen kopia i Supabase.</p>
              )}
            </Card>
          ))
        )}
      </div>
    </PageContainer>
  );
}
