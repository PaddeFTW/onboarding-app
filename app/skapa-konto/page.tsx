import { AuthShell } from "@/components/auth/auth-shell";
import { SignupForm } from "@/components/auth/signup-form";

export default function SkapaKontoPage() {
  return (
    <AuthShell contentClassName="max-w-sm" description="Du blir administratör för ditt företag. Andra bjuder du in sen." title="Skapa konto">
      <SignupForm />
    </AuthShell>
  );
}
