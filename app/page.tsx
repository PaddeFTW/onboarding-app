"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

import { PageContainer } from "@/components/page-container";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { listGuidedInstances } from "@/lib/supabase/guided-repository";

export default function HomePage() {
  const [rows, setRows] = useState<Awaited<ReturnType<typeof listGuidedInstances>>>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    void listGuidedInstances().then((items) => {
      setRows(items);
      setReady(true);
    }).catch(() => setReady(true));
  }, []);

  const current = rows.find((item) => item.status !== "completed") ?? rows[0];

  return (
    <PageContainer className="flex flex-col gap-8">
      <header className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/70">Arbetsyta</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight">Fortsätt onboardingen</h1>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">Här ser du vad som ska göras, vad du behöver veta och vad som hänt. Guidningen är arbetsytan.</p>
          </div>
          <SignOutButton />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild><Link href="/onboarding/new"><Plus />Ny onboarding</Link></Button>
          <Button variant="outline" asChild><Link href="/installningar">Inställningar</Link></Button>
        </div>
      </header>

      <section className="rounded-3xl border bg-primary/5 p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary/80">Vad behöver jag göra?</p>
        {!ready ? <p className="mt-3 text-sm">Laddar…</p> : current ? (
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold">{current.title}</h2>
              <p className="text-sm text-muted-foreground">{current.participantName} · {current.progress}% klart</p>
            </div>
            <Button asChild><Link href={`/onboarding/guided/${current.id}`}>Öppna guidningen</Link></Button>
          </div>
        ) : <p className="mt-3 text-sm">Ingen pågående onboarding. Starta en ny.</p>}
      </section>

      <section className="grid gap-3 sm:grid-cols-3">
        <Link className="rounded-2xl border p-4" href="/moduler"><p className="text-xs font-semibold uppercase tracking-wider text-primary/70">Vad behöver jag veta?</p><p className="mt-2 font-semibold">Moduler</p></Link>
        <Link className="rounded-2xl border p-4" href="/policyer"><p className="text-xs font-semibold uppercase tracking-wider text-primary/70">Policyer</p><p className="mt-2 font-semibold">Företagets regler</p></Link>
        <Link className="rounded-2xl border p-4" href="/historik"><p className="text-xs font-semibold uppercase tracking-wider text-primary/70">Vad har hänt?</p><p className="mt-2 font-semibold">Historik</p></Link>
      </section>
    </PageContainer>
  );
}
