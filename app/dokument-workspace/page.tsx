"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Document, Packer, Paragraph, TextRun } from "docx";

import { Button } from "@/components/ui/button";
import { downloadOnboardingPdf } from "@/lib/documents";
import { listGuidedInstances } from "@/lib/supabase/guided-repository";

export default function DocumentWorkspacePage() {
  const [instances, setInstances] = useState<Awaited<ReturnType<typeof listGuidedInstances>>>([]);
  const [instanceId, setInstanceId] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    void listGuidedInstances().then((rows) => {
      setInstances(rows);
      const first = rows[0];
      setInstanceId(first?.id ?? "");
      setText(first ? toText(first) : "");
    });
  }, []);

  const selected = instances.find((item) => item.id === instanceId);

  function toText(item: NonNullable<typeof selected>) {
    return [`${item.title}`, `Deltagare: ${item.participantName}`, `Ansvarig: ${item.responsibleName}`, "", ...item.steps.map((step) => `${step.title}\nStatus: ${step.status}\n`)].join("\n");
  }

  async function exportWord() {
    const doc = new Document({
      sections: [{ children: text.split("\n").map((line) => new Paragraph({ children: [new TextRun(line || " ")] })) }],
    });
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
      <p className="text-sm text-neutral-500">Samma onboarding, öppnad som ett dokument. Guidningen är kvar som vanlig arbetsyta.</p>
      <select className="h-12 rounded-full border px-4" value={instanceId} onChange={(event) => { const next = instances.find((item) => item.id === event.target.value); setInstanceId(event.target.value); if (next) setText(toText(next)); }}>
        {instances.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}
      </select>
      <textarea className="min-h-80 rounded-2xl border p-4" value={text} onChange={(event) => setText(event.target.value)} />
      <div className="flex gap-2">
        <Button type="button" onClick={() => void exportWord()}>Ladda ner Word</Button>
        <Button type="button" variant="outline" onClick={() => selected && downloadOnboardingPdf({ title: selected.title, participant: selected.participantName, lines: text.split("\n") })}>Ladda ner PDF</Button>
      </div>
    </main>
  );
}
