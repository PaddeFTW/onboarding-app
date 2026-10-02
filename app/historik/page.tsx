"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { listEvents } from "@/lib/history";

export default function HistorikPage() {
  const [rows, setRows] = useState<Array<{ id: string; summary: string; created_at: string }>>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void listEvents().then(setRows).catch((err: unknown) => {
      setError(err instanceof Error ? err.message : "Kunde inte läsa historiken.");
    });
  }, []);

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col gap-4 px-4 py-10">
      <Link className="text-sm font-semibold text-[#5b4dff]" href="/">Tillbaka</Link>
      <h1 className="text-2xl font-semibold">Historik</h1>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {rows.length === 0 && !error ? <p className="text-sm text-neutral-500">Inga händelser ännu.</p> : null}
      <ul className="flex flex-col gap-2">
        {rows.map((row) => (
          <li key={row.id} className="rounded-2xl border px-4 py-3">
            <p className="text-sm">{row.summary}</p>
            <p className="text-xs text-neutral-500">{new Date(row.created_at).toLocaleString("sv-SE")}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
