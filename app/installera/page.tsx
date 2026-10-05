import Link from "next/link";

export default function InstalleraPage() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-xl flex-col gap-4 px-4 py-10">
      <Link className="text-sm font-semibold text-[#5b4dff]" href="/">Tillbaka</Link>
      <h1 className="text-2xl font-semibold">Installera på datorn</h1>
      <p className="text-sm leading-6 text-neutral-600">Öppna https://onboarding-app-black.vercel.app i Edge eller Chrome. Välj Installera app i adressfältet eller menyn. Då får appen en egen ikon och ett eget fönster. Data ligger kvar i Supabase, så datorn behöver internet. Det är den säljbara installationen. En egen programfil utan internet ingår inte.</p>
    </main>
  );
}
