import Link from "next/link";

const items = [
  ["/register", "Företagsregister", "Bransch, befattningar och medarbetare."],
  ["/onboarding/templates", "Mallar", "Företagets version av momenten. Publicera innan en onboarding startas."],
  ["/inbjudan", "Bjud in", "Lägg till en kollega i företaget."],
  ["/dokument-workspace", "Dokument", "Öppna en onboarding som text och exportera."],
  ["/dokument", "Filer", "Filer kopplade till ett moment."],
  ["/ordlista", "Ordlista", "Orden appen använder."],
  ["/installera", "Installera", "Lägg appen på datorn via webbläsaren."],
];

export default function InstallningarPage() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col gap-4 px-4 py-10">
      <Link className="text-sm font-semibold text-[#5b4dff]" href="/">Tillbaka till arbetsytan</Link>
      <h1 className="text-2xl font-semibold">Inställningar</h1>
      <p className="text-sm text-neutral-500">Mallar och administration. Själva arbetet görs i guidningen.</p>
      {items.map(([href, title, text]) => (
        <Link key={href} className="rounded-2xl border px-4 py-3" href={href}>
          <p className="font-semibold">{title}</p>
          <p className="text-sm text-neutral-600">{text}</p>
        </Link>
      ))}
    </main>
  );
}
