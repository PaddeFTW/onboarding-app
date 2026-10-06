import Link from "next/link";

const policies = [
  ["Arbetsmiljö", "Regler för en säker arbetsplats och hur risker tas upp."],
  ["Alkohol och droger", "Förbjuder påverkan av alkohol och droger i arbetet."],
  ["Brandskydd", "Förebyggande brandskydd och vad man gör vid larm."],
  ["CSR", "Företagets ansvar mot medarbetare, kunder och omgivning."],
  ["Dataskydd", "Hur personuppgifter hanteras enligt GDPR."],
  ["Diskriminering och jämställdhet", "Kränkande särbehandling är inte tillåten."],
  ["Fordon", "Regler för tjänstefordon och körning i tjänsten."],
  ["IT", "Användning av dator, e-post och företagets system."],
  ["Kvalitet", "Hur arbetet ska hålla det företaget lovat kunden."],
  ["Miljö", "Hur verksamheten minskar sin miljöpåverkan."],
  ["Personal", "Introduktion, ansvar och uppföljning av medarbetare."],
  ["Verksamhet", "Företagets inriktning och gemensamma arbetssätt."],
];

export default function PolicyerPage() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col gap-4 px-4 py-10">
      <Link className="text-sm font-semibold text-[#5b4dff]" href="/">Tillbaka</Link>
      <h1 className="text-2xl font-semibold">Företagets policyer</h1>
      <p className="text-sm text-neutral-500">De här texterna gås igenom i introduktionen. De ersätter inte appens integritet och villkor.</p>
      {policies.map(([title, text]) => (
        <article key={title} className="rounded-2xl border px-4 py-3">
          <h2 className="font-semibold">{title}</h2>
          <p className="mt-1 text-sm text-neutral-600">{text}</p>
        </article>
      ))}
    </main>
  );
}
