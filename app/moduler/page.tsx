import Link from "next/link";

import { knowledgeModules } from "@/lib/knowledge-modules";

export default function ModulerPage() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col gap-4 px-4 py-10">
      <Link className="text-sm font-semibold text-[#5b4dff]" href="/">Tillbaka</Link>
      <h1 className="text-2xl font-semibold">Introduktionsmoduler</h1>
      <p className="text-sm text-neutral-500">Korta moduler från kunskapsbanken, kopplade till moment.</p>
      {knowledgeModules.map((item) => (
        <article key={item.stepId} className="rounded-2xl border px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#5b4dff]">{item.module}</p>
          <h2 className="mt-1 font-semibold">{item.stepId}</h2>
          <p className="mt-2 text-sm leading-6 text-neutral-600">{item.text}</p>
        </article>
      ))}
    </main>
  );
}
