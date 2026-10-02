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
  const { addInstance } = useGuidedOnboardingStore();
  const [participantName, setParticipantName] = useState("");
  const [responsibleName, setResponsibleName] = useState("");
  const [startError, setStartError] = useState("");

  useEffect(() => {
    initCompanyTemplateStore();
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

  const hasDraft = versions.some((version) => version.status === "draft");

  function startFrom(version: CompanyTemplateVersion) {
    if (!participantName.trim() || !responsibleName.trim()) {
      setStartError("Fyll i deltagare och ansvarig innan du startar.");
      return;
    }

    const instance = createInstanceFromPublishedVersion(
      version,
      participantName.trim(),
      responsibleName.trim()
    );
    addInstance(instance);
    router.push(`/onboarding/guided/${instance.id}`);
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
          Del 3 — förhandsvisning
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">Företagsmallar</h1>
        <p className="max-w-[58ch] text-sm leading-relaxed text-muted-foreground">
          Systemmallen är låst. Företaget kopierar den till ett utkast, publicerar en version och startar onboarding från en fryst kopia. Allt sparas bara i den här webbläsaren.
        </p>
      </header>

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
          onClick={() => createDraftFromSystemTemplate()}
          disabled={!isHydrated || hasDraft}
        >
          <Plus />
          Skapa utkast
        </Button>
      </Card>

      <Card className="grid gap-4 p-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="participant">Deltagare</Label>
          <Input
            id="participant"
            value={participantName}
            onChange={(event) => setParticipantName(event.target.value)}
            placeholder="Namn på ny medarbetare"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="responsible">Ansvarig</Label>
          <Input
            id="responsible"
            value={responsibleName}
            onChange={(event) => setResponsibleName(event.target.value)}
            placeholder="Närmaste chef"
          />
        </div>
        {startError ? (
          <p className="text-sm text-destructive sm:col-span-2">{startError}</p>
        ) : null}
      </Card>

      <div className="flex flex-col gap-3">
        {!isHydrated ? (
          <p className="text-sm text-muted-foreground">Laddar mallar...</p>
        ) : versions.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Ingen företagsmall ännu. Skapa ett utkast från systemmallen.
          </p>
        ) : (
          versions.map((version) => (
            <Card key={version.id} className="flex flex-col gap-4 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-semibold">
                      {version.companyName} — {version.name}
                    </h2>
                    <Badge variant="outline">{statusLabel(version.status)}</Badge>
                    <Badge variant="outline">{version.versionLabel}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {version.steps.length} steg
                    {version.basedOnVersionId ? " · kopierad från publicerad version" : ""}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {version.status === "draft" ? (
                    <Button type="button" onClick={() => publishDraft(version.id)}>
                      Publicera
                    </Button>
                  ) : null}
                  {version.status === "published" ? (
                    <>
                      <Button type="button" onClick={() => startFrom(version)}>
                        Starta onboarding
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        disabled={hasDraft}
                        onClick={() => createDraftFromPublished(version.id)}
                      >
                        Nytt utkast
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => archivePublished(version.id)}
                      >
                        Arkivera
                      </Button>
                    </>
                  ) : null}
                </div>
              </div>

              {version.status === "draft" ? (
                <div className="flex flex-col gap-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor={`company-${version.id}`}>Företag</Label>
                      <Input
                        id={`company-${version.id}`}
                        value={version.companyName}
                        onChange={(event) =>
                          updateDraft(version.id, (current) => ({
                            ...current,
                            companyName: event.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor={`name-${version.id}`}>Mallnamn</Label>
                      <Input
                        id={`name-${version.id}`}
                        value={version.name}
                        onChange={(event) =>
                          updateDraft(version.id, (current) => ({
                            ...current,
                            name: event.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                  <ul className="flex flex-col gap-2">
                    {version.steps.map((step) => (
                      <li
                        key={step.id}
                        className="flex items-center justify-between gap-3 rounded-xl border px-3 py-2 text-sm"
                      >
                        <span>
                          {step.order}. {step.title}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeDraftStep(version.id, step.id)}
                        >
                          Ta bort
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">
                  Publicerad version är låst. Nya onboardingar får en egen kopia och påverkas inte av senare utkast.
                </p>
              )}
            </Card>
          ))
        )}
      </div>
    </PageContainer>
  );
}
