import Link from "next/link";

const checks = [
  "Skapa konto med namn, företag och lösenord.",
  "Logga in igen och kontrollera att startsidan öppnas.",
  "Skapa ett mallutkast och publicera det.",
  "Starta en guidning för en deltagare.",
  "Öppna Dokument, skriv en mening på ett moment och spara.",
  "Ladda ner Word och PDF.",
  "Öppna Historik och se att starten finns.",
];

export default function KundtestPage() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col gap-4 px-4 py-10">
      <Link className="text-sm font-semibold text-[#5b4dff]" href="/">Tillbaka</Link>
      <h1 className="text-2xl font-semibold">Kundtest</h1>
      <ol className="list-decimal space-y-2 pl-5 text-sm leading-6">
        {checks.map((item) => <li key={item}>{item}</li>)}
      </ol>
    </main>
  );
}
