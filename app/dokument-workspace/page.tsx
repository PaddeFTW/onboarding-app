"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Document, Packer, Paragraph, TextRun } from "docx";

import { Button } from "@/components/ui/button";
import { downloadOnboardingPdf, loadWorkspaceText, saveWorkspaceText } from "@/lib/documents";
import { listGuidedInstances } from "@/lib/supabase/guided-repository";

export default function DocumentWorkspacePage() {
  const [instances, setInstances] = useState<Awaited<ReturnType<typeof listGuidedInstances>>>([]);
  const [instanceId, setInstanceId] = useState("");
  const [text, setText] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function toText(item: Awaited<ReturnType<typeof listGuidedInstances>>[number]) {
    return [`${item.title}`, `Deltagare: ${item.participantName}`, `Ansvarig: ${item.responsibleName}`, "", ...item.steps.map((step) => `${step.title}\nStatus: ${step.status}\n`)].join("\n");
  }

  useEffect(() => {
    void listGuidedInstances().then(async (rows) => {
      setInstances(rows);
      const first = rows[0];
      if (!first) return;
      setInstanceId(first.id);
      setText((await loadWorkspaceText(first.id)) ?? toText(first));
    });
  }, []);

  const selected = instances.find((item) => item.id === instanceId);

  async function choose(id: string) {
    const next = instances.find((item) => item.id === id);
    setInstanceId(id);
    if (!next) return;
    setText((await loadWorkspaceText(id)) ?? toText(next));
  }

  async function save() {
    if (!selected) return;
    setError(null);
    try {
      await saveWorkspaceText(selected.id, text);
      setStatus("Utkastet är sparat. Guidningen är oförändrad.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kunde inte spara.");
    }
  }

  async function exportWord() {
    const doc = new Document({ sections: [{ children: text.split("\n").map((line) => new Paragraph({ children: [new TextRun(line || " ")] })) }] });
    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "onboarding.docx";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col gap-4 px-4 py-10">
      <Link className="text-sm font-semibold text-[#5b4dff]" href="/">Tillbaka</Link>
      <h1 className="text-2xl font-semibold">Dokument</h1>
      <p className="text-sm text-neutral-500">Samma onboarding, öppnad som dokument. Sparat utkast ersätter inte guidningen.</p>
      <select className="h-12 rounded-full border px-4" value={instanceId} onChange={(event) => void choose(event.target.value)}>
        {instances.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}
      </select>
      <textarea className="min-h-80 rounded-2xl border p-4" value={text} onChange={(event) => setText(event.target.value)} />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {status ? <p className="text-sm text-neutral-600">{status}</p> : null}
      <div className="flex flex-wrap gap-2">
        <Button type="button" onClick={() => void save()}>Spara utkast</Button>
        <Button type="button" variant="outline" onClick={() => void exportWord()}>Ladda ner Word</Button>
        <Button type="button" variant="outline" onClick={() => selected && downloadOnboardingPdf({ title: selected.title, participant: selected.participantName, lines: text.split("\n") })}>Ladda ner PDF</Button>
      </div>
    </main>
  );
}
