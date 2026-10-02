import Link from "next/link";

import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <AuthShell contentClassName="max-w-sm" description="Samma inloggning som i de andra apparna." title="Logga in">
      <LoginForm />
      <p className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-center text-sm text-muted-foreground">
        <Link className="font-semibold text-primary hover:underline" href="/skapa-konto">Skapa konto</Link>
        <Link className="hover:underline" href="/glomt-losenord">Glömt lösenord</Link>
      </p>
    </AuthShell>
  );
}
