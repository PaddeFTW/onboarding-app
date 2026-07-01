"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const manager = String(formData.get("manager") ?? "").trim();

      if (!manager) {
        throw new Error("Ange ansvarig chef.");
      }

      const onboardingId = await createOnboarding({
        firstName: String(formData.get("firstName") ?? ""),
        lastName: String(formData.get("lastName") ?? ""),
        startDate: String(formData.get("startDate") ?? ""),
        position: String(formData.get("position") ?? ""),
        manager,
      });

      router.push(`/onboarding/${onboardingId}`);
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
              Ange medarbetarens grunduppgifter. Checklistan skapas automatiskt
              när onboardingen startas.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Förnamn" htmlFor="firstName">
              <Input
                id="firstName"
                name="firstName"
                placeholder="Förnamn"
                required
                disabled={loading}
                autoComplete="given-name"
              />
            </Field>
            <Field label="Efternamn" htmlFor="lastName">
              <Input
                id="lastName"
                name="lastName"
                placeholder="Efternamn"
                required
                disabled={loading}
                autoComplete="family-name"
              />
            </Field>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
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

            <Field label="Befattning" htmlFor="position">
              <Input
                id="position"
                name="position"
                placeholder="Befattning"
                required
                disabled={loading}
                autoComplete="organization-title"
              />
            </Field>
          </div>

          <Field label="Ansvarig chef" htmlFor="manager">
            <Input
              id="manager"
              name="manager"
              placeholder="Ansvarig chef"
              required
              disabled={loading}
              autoComplete="name"
            />
          </Field>

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
          <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={loading}>
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
