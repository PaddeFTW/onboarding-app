"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Document, Packer, Paragraph, TextRun } from "docx";

import { Button } from "@/components/ui/button";
import { downloadOnboardingPdf, loadWorkspaceText, saveWorkspaceText } from "@/lib/documents";
import { knowledgeForStep } from "@/lib/knowledge-modules";
import { listGuidedInstances } from "@/lib/supabase/guided-repository";

export default function DocumentWorkspacePage() {
  const [instances, setInstances] = useState<Awaited<ReturnType<typeof listGuidedInstances>>>([]);
  const [instanceId, setInstanceId] = useState("");
  const [stepId, setStepId] = useState("");
  const [text, setText] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void listGuidedInstances().then(async (rows) => {
      setInstances(rows);
      const first = rows[0];
      if (!first) return;
      setInstanceId(first.id);
      setStepId(first.steps[0]?.id ?? "");
      const saved = await loadWorkspaceText(`${first.id}/${first.steps[0]?.id ?? "workspace"}`);
      setText(saved ?? draft(first, first.steps[0]?.id ?? ""));
    });
  }, []);

  const selected = instances.find((item) => item.id === instanceId);
  const step = selected?.steps.find((item) => item.id === stepId);

  function draft(item: NonNullable<typeof selected>, id: string) {
    const current = item.steps.find((entry) => entry.id === id);
    const module = knowledgeForStep(id);
    return [`${item.title}`, `Moment: ${current?.title ?? ""}`, module ? `Modul: ${module.module}` : "", module?.text ?? "", current?.content ?? ""].filter(Boolean).join("\n\n");
  }

  async function chooseStep(nextInstanceId: string, nextStepId: string) {
    const item = instances.find((entry) => entry.id === nextInstanceId);
    setInstanceId(nextInstanceId);
    setStepId(nextStepId);
    if (!item) return;
    setText((await loadWorkspaceText(`${nextInstanceId}/${nextStepId}`)) ?? draft(item, nextStepId));
  }

  async function save() {
    if (!selected || !stepId) return;
    setError(null);
    try {
      await saveWorkspaceText(`${selected.id}/${stepId}`, text);
      setStatus("Texten för momentet är sparad.");
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
    link.download = "moment.docx";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col gap-4 px-4 py-10">
      <Link className="text-sm font-semibold text-[#5b4dff]" href="/">Tillbaka</Link>
      <h1 className="text-2xl font-semibold">Dokument</h1>
      <p className="text-sm text-neutral-500">Texten sparas per moment. Guidningen ändras inte.</p>
      <select className="h-12 rounded-full border px-4" value={instanceId} onChange={(event) => { const item = instances.find((entry) => entry.id === event.target.value); void chooseStep(event.target.value, item?.steps[0]?.id ?? ""); }}>
        {instances.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}
      </select>
      <select className="h-12 rounded-full border px-4" value={stepId} onChange={(event) => void chooseStep(instanceId, event.target.value)}>
        {selected?.steps.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}
      </select>
      <textarea className="min-h-80 rounded-2xl border p-4" value={text} onChange={(event) => setText(event.target.value)} />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {status ? <p className="text-sm text-neutral-600">{status}</p> : null}
      <div className="flex flex-wrap gap-2">
        <Button type="button" onClick={() => void save()}>Spara moment</Button>
        <Button type="button" variant="outline" onClick={() => void exportWord()}>Ladda ner Word</Button>
        <Button type="button" variant="outline" onClick={() => selected && downloadOnboardingPdf({ title: step?.title ?? selected.title, participant: selected.participantName, lines: text.split("\n") })}>Ladda ner PDF</Button>
      </div>
    </main>
  );
}
