"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useOnboardingStore } from "@/components/providers/onboarding-provider";

const MOCK_MANAGERS = [
  "Maria Lindqvist",
  "Erik Johansson",
  "Anna Larsson",
  "Peter Holm",
  "Sara Nyström",
];

export function NewOnboardingForm() {
  const router = useRouter();
  const { createOnboarding } = useOnboardingStore();
  const [loading, setLoading] = useState(false);
  const [manager, setManager] = useState("Maria Lindqvist");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const onboardingId = createOnboarding({
      firstName: String(formData.get("firstName") ?? ""),
      lastName: String(formData.get("lastName") ?? ""),
      startDate: String(formData.get("startDate") ?? ""),
      position: String(formData.get("position") ?? ""),
      manager,
    });

    await new Promise((r) => setTimeout(r, 750));
    router.push(`/onboarding/${onboardingId}`);
  }

  return (
    <form onSubmit={handleSubmit} className="animate-fade-up">
      <Card className="overflow-hidden">
        <CardContent className="flex flex-col gap-8 pt-6 sm:pt-7">
          <div className="flex flex-col gap-1.5">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-primary/60">
              Uppgifter
            </p>
            <p className="max-w-[34ch] text-sm leading-relaxed text-muted-foreground">
              Börja med några enkla uppgifter. Checklistan skapas automatiskt
              och kan fyllas i direkt efter att onboardingen skapats.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Förnamn" htmlFor="firstName">
              <Input
                id="firstName"
                name="firstName"
                placeholder="Anders"
                defaultValue="Anders"
                required
                disabled={loading}
              />
            </Field>
            <Field label="Efternamn" htmlFor="lastName">
              <Input
                id="lastName"
                name="lastName"
                placeholder="Svensson"
                defaultValue="Svensson"
                required
                disabled={loading}
              />
            </Field>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Startdatum" htmlFor="startDate">
              <Input
                id="startDate"
                name="startDate"
                type="date"
                defaultValue="2026-06-01"
                required
                disabled={loading}
              />
            </Field>

            <Field label="Befattning" htmlFor="position">
              <Input
                id="position"
                name="position"
                placeholder="Elektriker"
                defaultValue="Elektriker"
                required
                disabled={loading}
              />
            </Field>
          </div>

          <Field label="Ansvarig chef" htmlFor="manager">
            <Select
              disabled={loading}
              value={manager}
              onValueChange={setManager}
            >
              <SelectTrigger id="manager">
                <SelectValue placeholder="Välj ansvarig chef" />
              </SelectTrigger>
              <SelectContent>
                {MOCK_MANAGERS.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
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
