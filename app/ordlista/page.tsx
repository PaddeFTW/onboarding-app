import Link from "next/link";

import { terms } from "@/lib/terms";

export default function OrdlistaPage() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col gap-4 px-4 py-10">
      <Link className="text-sm font-semibold text-[#5b4dff]" href="/">Tillbaka</Link>
      <h1 className="text-2xl font-semibold">Ordlista</h1>
      <p className="text-sm text-neutral-500">Korta förklaringar av orden appen använder. De ersätter inte en policy.</p>
      <dl className="flex flex-col gap-3">
        {terms.map((item) => (
          <div key={item.term} className="rounded-2xl border px-4 py-3">
            <dt className="font-semibold">{item.term}</dt>
            <dd className="text-sm text-neutral-600">{item.definition}</dd>
          </div>
        ))}
      </dl>
    </main>
  );
}
