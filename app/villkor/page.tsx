import Link from "next/link";

export default function VillkorPage() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col gap-4 px-4 py-10">
      <Link className="text-sm font-semibold text-[#5b4dff]" href="/login">Tillbaka</Link>
      <h1 className="text-2xl font-semibold">Villkor</h1>
      <p className="text-sm leading-6 text-neutral-600">Onboarding App får användas för att planera och genomföra introduktion av medarbetare i det företag där kontot är medlem. Administratören ansvarar för vilka som bjuds in och vilka texter företaget använder.</p>
      <p className="text-sm leading-6 text-neutral-600">En publicerad mall och en startad onboarding behåller den version som gällde då. Appen ersätter inte företagets egna policyer eller en jurist.</p>
    </main>
  );
}
