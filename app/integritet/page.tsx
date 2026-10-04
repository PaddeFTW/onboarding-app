import Link from "next/link";

export default function IntegritetPage() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col gap-4 px-4 py-10">
      <Link className="text-sm font-semibold text-[#5b4dff]" href="/login">Tillbaka</Link>
      <h1 className="text-2xl font-semibold">Integritet</h1>
      <p className="text-sm leading-6 text-neutral-600">Onboarding App sparar konto, företag, onboardingar, dokument och historik för att introduktionen ska kunna genomföras och följas upp. Uppgifterna visas bara för medlemmar i samma företag.</p>
      <p className="text-sm leading-6 text-neutral-600">Inloggning kan ske med e-post, Google eller Microsoft. Leverantören av inloggningen får då den adress som används för att logga in. Filer lagras i appens dokumentlagring.</p>
      <p className="text-sm leading-6 text-neutral-600">Det här är appens korta information, inte företagets egen GDPR-policy. Företagets policy gås igenom i introduktionen.</p>
    </main>
  );
}
