import Link from "next/link";

import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <AuthShell description="Samma inloggning varje gång. Inget krångel." title="Logga in">
      <LoginForm />
      <p className="flex flex-wrap justify-center gap-x-4 text-center text-sm text-neutral-500">
        <Link className="font-semibold text-[#5b4dff]" href="/skapa-konto">Skapa konto</Link>
        <Link href="/glomt-losenord">Glömt lösenord</Link>
      </p>
    </AuthShell>
  );
}
