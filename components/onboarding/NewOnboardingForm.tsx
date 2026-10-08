"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { createCompanyGuidedOnboarding } from "@/lib/onboarding-steps";
import { upsertGuidedInstance } from "@/lib/supabase/guided-repository";
import { useOnboardingStore } from "@/components/providers/onboarding-provider";

export function NewOnboardingForm() {
  const router = useRouter();
  const { createOnboarding } = useOnboardingStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const defaultStartDate = useMemo(
    () => new Date().toISOString().slice(0, 10),
    []
  );

  const [people, setPeople] = React.useState<Array<{ id: string; name: string; position: string; can_manage: boolean; can_mentor: boolean }>>([]);
  React.useEffect(() => {
    void (async () => {
      const supabase = createClient();
      const { data } = await supabase.from("employees").select("id,name,can_manage,can_mentor,positions(name)");
      setPeople((data ?? []).map((item) => ({ id: item.id, name: item.name, position: Array.isArray(item.positions) ? (item.positions[0] as { name?: string } | undefined)?.name ?? "" : "", can_manage: item.can_manage, can_mentor: item.can_mentor })));
    })();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const employee = people.find((item) => item.id === String(formData.get("employeeId") ?? ""));
      const manager = people.find((item) => item.id === String(formData.get("managerId") ?? ""));
      const mentor = people.find((item) => item.id === String(formData.get("mentorId") ?? ""));
      if (!employee || !manager || !mentor) throw new Error("Välj medarbetare, ansvarig chef och mentor.");
      const [firstName, ...rest] = employee.name.split(" ");
      await createOnboarding({
        firstName,
        lastName: rest.join(" ") || "-",
        startDate: String(formData.get("startDate") ?? ""),
        position: employee.position,
        manager: `${manager.name} · mentor ${mentor.name}`,
      });
      const guided = createCompanyGuidedOnboarding({
        participantName: employee.name,
        managerName: manager.name,
        mentorName: mentor.name,
        position: employee.position,
      });
      await upsertGuidedInstance(guided);
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

  return (
    <form onSubmit={handleSubmit} className="animate-fade-up">
      <Card className="overflow-hidden">
        <CardContent className="flex flex-col gap-8 pt-6 sm:pt-7">
          <div className="flex flex-col gap-1.5">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-primary/60">
              Grunduppgifter
            </p>
            <p className="max-w-[34ch] text-sm leading-relaxed text-muted-foreground">
              Välj medarbetare, ansvarig chef och mentor. Befattningen följer med.
            </p>
          </div>

          {people.length === 0 ? <p className="text-sm">Lägg först in medarbetare i <a className="font-semibold text-[#5b4dff]" href="/register">företagsregistret</a>.</p> : null}
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Medarbetare" htmlFor="employeeId">
              <select id="employeeId" name="employeeId" required className="h-12 w-full rounded-full border px-4">
                <option value="">Välj medarbetare</option>
                {people.map((item) => <option key={item.id} value={item.id}>{item.name} · {item.position}</option>)}
              </select>
            </Field>
            <Field label="Startdatum" htmlFor="startDate">
              <Input id="startDate" name="startDate" type="date" defaultValue={defaultStartDate} required disabled={loading} />
            </Field>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Ansvarig chef" htmlFor="managerId">
              <select id="managerId" name="managerId" required className="h-12 w-full rounded-full border px-4">
                <option value="">Välj chef</option>
                {people.filter((item) => item.can_manage).map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
              </select>
            </Field>
            <Field label="Mentor" htmlFor="mentorId">
              <select id="mentorId" name="mentorId" required className="h-12 w-full rounded-full border px-4">
                <option value="">Välj mentor</option>
                {people.filter((item) => item.can_mentor).map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
              </select>
            </Field>
          </div>

          {error ? (
            <p className="text-sm text-destructive">{error}</p>
          ) : null}
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
          <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={loading || people.length === 0}>
            {loading ? (
              <>
                <Loader2 className="animate-spin" />
                Skapar…
              </>
            ) : (
              "Skapa onboarding"
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
