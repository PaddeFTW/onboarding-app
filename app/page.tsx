"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

import { PageContainer } from "@/components/page-container";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { listGuidedInstances } from "@/lib/supabase/guided-repository";
import { createClient } from "@/lib/supabase/client";

export default function HomePage() {
  const [rows, setRows] = useState<Awaited<ReturnType<typeof listGuidedInstances>>>([]);
  const [positions, setPositions] = useState<Record<string, string>>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    void Promise.all([
      listGuidedInstances(),
      createClient().from("employees").select("name,positions(name)"),
    ]).then(([items, employeeResult]) => {
      setRows(items);
      const positionByEmployee: Record<string, string> = {};
      for (const employee of employeeResult.data ?? []) {
        const relation = Array.isArray(employee.positions) ? employee.positions[0] : employee.positions;
        positionByEmployee[employee.name] = relation?.name ?? "";
      }
      setPositions(positionByEmployee);
      setReady(true);
    }).catch(() => setReady(true));
  }, []);

  const current = rows.find((item) => item.status !== "completed");
  const nextStep = current?.steps.find((step) => step.status !== "completed" && step.status !== "skipped");

  return (
    <PageContainer className="flex flex-col gap-8">
      <header className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/70">Arbetsyta</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight">{current ? "Fortsätt introduktionen" : "Starta introduktionen"}</h1>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">{current ? "Här ser du nästa steg i introduktionen." : "Välj medarbetare, ansvarig chef och mentor. Frågorna öppnas direkt."}</p>
          </div>
          <SignOutButton />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild><Link href="/register">Företaget</Link></Button>
          <Button variant="outline" asChild><Link href="/onboarding/new"><Plus />Ny introduktion</Link></Button>
        </div>
      </header>

      <section className="rounded-3xl border bg-primary/5 p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary/80">Vad behöver jag göra?</p>
        {!ready ? <p className="mt-3 text-sm">Laddar…</p> : current ? (
          <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-semibold">{current.participantName}</h2>
              <p className="text-sm text-muted-foreground">{positions[current.participantName] || "Befattning saknas"}</p>
              <p className="text-sm text-muted-foreground">Nästa fråga: {nextStep?.title ?? "Introduktionen är klar"}</p>
            </div>
            <Button asChild><Link href={`/onboarding/guided/${current.id}`}>Öppna introduktionen</Link></Button>
          </div>
        ) : (
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">Lägg först in företaget, medarbetarna och vem som kan vara chef eller mentor. Sedan startar du introduktionen.</p>
            <Button variant="outline" asChild><Link href="/register">Öppna företagsregistret</Link></Button>
          </div>
        )}
      </section>

      <section className="grid gap-3 sm:grid-cols-3">
        <Link className="rounded-2xl border p-4" href="/ordlista"><p className="text-xs font-semibold uppercase tracking-wider text-primary/70">Vad betyder orden?</p><p className="mt-2 font-semibold">Kunskapsbank</p></Link>
        <Link className="rounded-2xl border p-4" href="/policyer"><p className="text-xs font-semibold uppercase tracking-wider text-primary/70">Policyer</p><p className="mt-2 font-semibold">Företagets regler</p></Link>
        <Link className="rounded-2xl border p-4" href="/historik"><p className="text-xs font-semibold uppercase tracking-wider text-primary/70">Vad har hänt?</p><p className="mt-2 font-semibold">Historik</p></Link>
      </section>
    </PageContainer>
  );
}
