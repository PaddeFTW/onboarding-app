import Link from "next/link";

export default function CreateAccountPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-[#f7f7f8] px-4">
      <div className="w-full max-w-md text-center">
        <p className="text-sm font-medium text-[#5b4dff]">Onboarding</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Skapa konto</h1>
        <p className="mt-3 text-sm leading-relaxed text-neutral-500">
          Kontot ska vara samma som i de andra apparna. Själva kontoskapandet väntar på den gemensamma inloggningen.
        </p>
        <Link href="/login" className="mt-6 inline-block text-sm font-semibold text-[#5b4dff]">
          Tillbaka till logga in
        </Link>
      </div>
    </main>
  );
}
