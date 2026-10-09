import Link from "next/link";

import { terms } from "@/lib/terms";

export default function OrdlistaPage() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col gap-4 px-4 py-10">
      <Link className="text-sm font-semibold text-[#0e7490]" href="/">Tillbaka</Link>
      <h1 className="text-2xl font-semibold">Kunskapsbank</h1>
      <p className="text-sm text-neutral-500">Orden appen använder, vad de betyder och en mening ni kan utgå från. Mallen är inte er text förrän ni sparar den.</p>
      <dl className="flex flex-col gap-3">
        {terms.map((item) => (
          <div key={item.term} className="rounded-2xl border px-4 py-3">
            <dt className="font-semibold">{item.term}</dt>
            <dd className="mt-1 text-sm text-neutral-600">{item.definition}</dd>
            <dd className="mt-2 text-sm text-neutral-500">Mall: {item.template}</dd>
          </div>
        ))}
      </dl>
    </main>
  );
}
