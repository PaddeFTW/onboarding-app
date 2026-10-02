import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-[#f7f7f8] px-4">
      <div className="w-full max-w-md text-center">
        <p className="text-sm font-medium text-[#5b4dff]">Onboarding</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Glömt lösenord</h1>
        <p className="mt-3 text-sm leading-relaxed text-neutral-500">
          Använd inloggningslänk i stället. Lösenordsåterställning kopplas när den gemensamma inloggningen är aktiv.
        </p>
        <Link href="/login" className="mt-6 inline-block text-sm font-semibold text-[#5b4dff]">
          Tillbaka till logga in
        </Link>
      </div>
    </main>
  );
}
