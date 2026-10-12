"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { CompanyMissingPrompt } from "@/components/company/CompanyMissingPrompt";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGuidedOnboardingStore } from "@/components/providers/guided-onboarding-provider";
import { useOnboardingStore } from "@/components/providers/onboarding-provider";
import { isSmallCompany } from "@/lib/company-facts";
import { loadCompanyReadiness } from "@/lib/company-readiness";
import { createCompanyGuidedOnboarding } from "@/lib/onboarding-steps";
import {
  isRegistryMissingError,
  REGISTRY_MISSING_MESSAGE,
} from "@/lib/registry-errors";
import { createClient } from "@/lib/supabase/client";
import { listGuidedInstances } from "@/lib/supabase/guided-repository";

type RegistryPerson = {
  id: string;
  name: string;
  position: string;
  can_manage: boolean;
  can_mentor: boolean;
};

function positionName(positions: unknown): string {
  if (Array.isArray(positions)) {
    const first = positions[0] as { name?: string } | undefined;
    return first?.name ?? "";
  }
  if (positions && typeof positions === "object" && "name" in positions) {
    return String((positions as { name?: string }).name ?? "");
  }
  return "";
}

export function NewOnboardingForm() {
  const router = useRouter();
  const { createOnboarding } = useOnboardingStore();
  const { addInstance } = useGuidedOnboardingStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [people, setPeople] = useState<RegistryPerson[]>([]);
  const [completedNames, setCompletedNames] = useState<string[]>([]);
  const [employeeCount, setEmployeeCount] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [managerId, setManagerId] = useState("");
  const [mentorId, setMentorId] = useState("");
  const [ready, setReady] = useState(false);
  const [registryMissing, setRegistryMissing] = useState(false);
  const [companyReady, setCompanyReady] = useState(false);
  const defaultStartDate = useMemo(
    () => new Date().toISOString().slice(0, 10),
    []
  );
  const smallCompany = isSmallCompany(employeeCount);
  const participants = people.filter((item) => !completedNames.includes(item.name));
  const managers = people.filter((item) => item.can_manage);
  const mentors = people.filter((item) => item.can_mentor);

  React.useEffect(() => {
    void (async () => {
      try {
        const readiness = await loadCompanyReadiness();
        if (readiness.registryMissing) {
          setRegistryMissing(true);
          setReady(true);
          return;
        }
        setCompanyReady(readiness.ready);
        if (!readiness.ready) {
          setReady(true);
          return;
        }

        const supabase = createClient();
        const { data: user } = await supabase.auth.getUser();
        const { data: member } = await supabase
          .from("organization_members")
          .select("organization_id")
          .eq("user_id", user.user?.id)
          .limit(1)
          .maybeSingle();

        const [employeeResult, settingsResult, guidedRows] = await Promise.all([
          supabase
            .from("employees")
            .select("id,name,can_manage,can_mentor,positions(name)"),
          member?.organization_id
            ? supabase
                .from("company_settings")
                .select("employee_count")
                .eq("organization_id", member.organization_id)
                .maybeSingle()
            : Promise.resolve({ data: null, error: null }),
          listGuidedInstances(),
        ]);

        if (
          isRegistryMissingError(employeeResult.error) ||
          isRegistryMissingError(settingsResult.error)
        ) {
          setRegistryMissing(true);
          setReady(true);
          return;
        }

        setCompletedNames(
          guidedRows
            .filter((item) => item.status === "completed")
            .map((item) => item.participantName)
        );
        setPeople(
          (employeeResult.data ?? []).map((item) => ({
            id: item.id,
            name: item.name,
            position: positionName(item.positions),
            can_manage: Boolean(item.can_manage),
            can_mentor: Boolean(item.can_mentor),
          }))
        );
        setEmployeeCount(settingsResult.data?.employee_count ?? "");
      } catch (loadError) {
        if (isRegistryMissingError(loadError)) {
          setRegistryMissing(true);
        } else {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Kunde inte ladda registret."
          );
        }
      } finally {
        setReady(true);
      }
    })();
  }, []);

  React.useEffect(() => {
    if (!smallCompany || !managerId) return;
    setMentorId(managerId);
  }, [smallCompany, managerId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const employee = people.find((item) => item.id === employeeId);
      const manager = people.find((item) => item.id === managerId);
      const mentor = people.find((item) => item.id === (smallCompany ? managerId : mentorId));
      if (!employee || !manager || !mentor) {
        throw new Error("Välj medarbetare, ansvarig chef och mentor.");
      }
      const [firstName, ...rest] = employee.name.split(" ");
      await createOnboarding({
        firstName,
        lastName: rest.join(" ") || "-",
        startDate: String(formData.get("startDate") ?? ""),
        position: employee.position,
        manager: smallCompany
          ? manager.name
          : `${manager.name} · mentor ${mentor.name}`,
      });
      const guided = createCompanyGuidedOnboarding({
        participantName: employee.name,
        managerName: manager.name,
        mentorName: mentor.name,
        position: employee.position,
        singleResponsible: smallCompany,
      });
      addInstance(guided);
      void import("@/lib/history")
        .then(({ recordEvent }) =>
          recordEvent({
            eventType: "introduction.started",
            resourceType: "guided_instance",
            resourceId: guided.id,
            summary: `Introduktion startad: ${employee.name}`,
          })
        )
        .catch(() => undefined);
      router.push(`/onboarding/guided/${guided.id}`);
    } catch (submitError) {
      const message =
        submitError instanceof Error
          ? submitError.message
          : "Kunde inte skapa onboarding.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  if (!ready) {
    return (
      <Card>
        <CardContent className="py-8 text-sm text-muted-foreground">Laddar registret…</CardContent>
      </Card>
    );
  }

  if (registryMissing) {
    return (
      <Card>
        <CardContent className="flex flex-col gap-4 pt-6">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {REGISTRY_MISSING_MESSAGE}
          </p>
          <Button asChild className="w-fit" variant="outline">
            <Link href="/">Tillbaka till startsidan</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!companyReady) {
    return <CompanyMissingPrompt />;
  }

  if (people.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col gap-4 pt-6">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Inga medarbetare ännu. Öppna grundinställningen och lägg till dem under
            Medarbetare.
          </p>
          <Button asChild className="w-fit">
            <Link href="/foretagsregister?tab=employees">Öppna företagsregistret · Medarbetare</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (participants.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col gap-4 pt-6">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Alla medarbetare i registret har redan en genomgången introduktion. Lägg till en ny
            medarbetare i guiden om någon ska startas.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button asChild className="w-fit">
              <Link href="/foretagsregister?tab=employees">Lägg till medarbetare</Link>
            </Button>
            <Button asChild className="w-fit" variant="outline">
              <Link href="/">Tillbaka till startsidan</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="animate-fade-up">
      <Card className="overflow-hidden">
        <CardContent className="flex flex-col gap-8 pt-6 sm:pt-7">
          <div className="flex flex-col gap-1.5">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-primary/60">
              Grunduppgifter
            </p>
            <p className="max-w-[34ch] text-sm leading-relaxed text-muted-foreground">
              {smallCompany
                ? "Välj medarbetare och en ansvarig. Namnen hämtas från registret."
                : "Välj medarbetare, ansvarig chef och mentor. Befattningen följer med."}
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Medarbetare" htmlFor="employeeId">
              <select
                id="employeeId"
                name="employeeId"
                required
                value={employeeId}
                onChange={(event) => setEmployeeId(event.target.value)}
                className="h-12 w-full rounded-full border px-4"
                disabled={loading}
              >
                <option value="">Välj medarbetare</option>
                {participants.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                    {item.position ? ` · ${item.position}` : ""}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Startdatum" htmlFor="startDate">
              <Input
                id="startDate"
                name="startDate"
                type="date"
                defaultValue={defaultStartDate}
                required
                disabled={loading}
              />
            </Field>
          </div>

          <div className={smallCompany ? "grid gap-5" : "grid gap-5 sm:grid-cols-2"}>
            <Field label={smallCompany ? "Ansvarig" : "Ansvarig chef"} htmlFor="managerId">
              <select
                id="managerId"
                name="managerId"
                required
                value={managerId}
                onChange={(event) => setManagerId(event.target.value)}
                className="h-12 w-full rounded-full border px-4"
                disabled={loading}
              >
                <option value="">Välj {smallCompany ? "ansvarig" : "chef"}</option>
                {managers.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </Field>
            {!smallCompany ? (
              <Field label="Mentor" htmlFor="mentorId">
                <select
                  id="mentorId"
                  name="mentorId"
                  required
                  value={mentorId}
                  onChange={(event) => setMentorId(event.target.value)}
                  className="h-12 w-full rounded-full border px-4"
                  disabled={loading}
                >
                  <option value="">Välj mentor</option>
                  {mentors.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </Field>
            ) : null}
          </div>

          {managers.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Ingen chef är markerad ännu.{" "}
              <Link className="font-semibold text-primary" href="/foretagsregister?tab=employees">
                Öppna företagsregistret · Medarbetare
              </Link>
              .
            </p>
          ) : null}

          {!smallCompany && mentors.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Ingen mentor är markerad ännu.{" "}
              <Link className="font-semibold text-primary" href="/foretagsregister?tab=employees">
                Öppna företagsregistret · Medarbetare
              </Link>
              .
            </p>
          ) : null}

          {error ? <p className="text-sm text-destructive">{error}</p> : null}
        </CardContent>

        <CardFooter className="flex-col-reverse justify-end gap-2 border-t border-border/90 bg-secondary/20 pt-5 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            disabled={loading}
            className="w-full sm:w-auto"
            onClick={() => router.push("/")}
          >
            Avbryt
          </Button>
          <Button
            type="submit"
            size="lg"
            className="w-full sm:w-auto"
            disabled={
              loading || managers.length === 0 || (!smallCompany && mentors.length === 0)
            }
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" />
                Skapar…
              </>
            ) : (
              "Starta introduktion"
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <Label htmlFor={htmlFor} className="text-sm font-medium text-foreground">
        {label}
      </Label>
      {children}
    </div>
  );
}
