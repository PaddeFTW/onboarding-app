"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { downloadOnboardingPdf, uploadStepDocument } from "@/lib/documents";
import { swedishStepStatus } from "@/lib/knowledge-modules";
import { listGuidedInstances } from "@/lib/supabase/guided-repository";

export default function DokumentPage() {
  const [instances, setInstances] = useState<Awaited<ReturnType<typeof listGuidedInstances>>>([]);
  const [instanceId, setInstanceId] = useState("");
  const [stepId, setStepId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    void listGuidedInstances().then((rows) => {
      setInstances(rows);
      setInstanceId(rows[0]?.id ?? "");
      setStepId(rows[0]?.steps[0]?.id ?? "");
    }).catch((err: unknown) => setError(err instanceof Error ? err.message : "Kunde inte ladda guidningar."));
  }, []);

  const selected = instances.find((item) => item.id === instanceId);

  async function handleUpload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const file = new FormData(event.currentTarget).get("file");
    if (!(file instanceof File) || !file.name || !selected) return;
    setError(null);
    try {
      await uploadStepDocument({ guidedInstanceId: selected.id, stepId, file });
      setStatus("Dokumentet är kopplat till momentet.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Uppladdningen misslyckades.");
    }
  }

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-xl flex-col gap-4 px-4 py-10">
      <Link className="text-sm font-semibold text-[#5b4dff]" href="/">Tillbaka</Link>
      <h1 className="text-2xl font-semibold">Dokument och PDF</h1>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {status ? <p className="text-sm text-neutral-600">{status}</p> : null}
      <label className="text-sm">Onboarding
        <select className="mt-1 h-12 w-full rounded-full border px-4" value={instanceId} onChange={(event) => { setInstanceId(event.target.value); const next = instances.find((item) => item.id === event.target.value); setStepId(next?.steps[0]?.id ?? ""); }}>
          {instances.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}
        </select>
      </label>
      <label className="text-sm">Moment
        <select className="mt-1 h-12 w-full rounded-full border px-4" value={stepId} onChange={(event) => setStepId(event.target.value)}>
          {selected?.steps.map((step) => <option key={step.id} value={step.id}>{step.title}</option>)}
        </select>
      </label>
      <form className="flex flex-col gap-3" onSubmit={handleUpload}>
        <input name="file" type="file" required />
        <Button className="h-12 rounded-full bg-[#6d4dff]" type="submit">Ladda upp till momentet</Button>
      </form>
      <Button type="button" variant="outline" onClick={() => selected && downloadOnboardingPdf({ title: selected.title, participant: selected.participantName, lines: selected.steps.map((step) => `${step.title}: ${swedishStepStatus(step.status)}`) })}>Ladda ner PDF</Button>
    </main>
  );
}
