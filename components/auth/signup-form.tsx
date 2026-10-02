"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { swedishAuthError } from "@/lib/auth/errors";
import { createClient } from "@/lib/supabase/client";

export function SignupForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setStatus(null);
    const form = new FormData(event.currentTarget);
    const fullName = String(form.get("full-name") ?? "").trim();
    const companyName = String(form.get("company-name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    if (password.length < 6) {
      setError("Lösenordet ska ha minst 6 tecken.");
      return;
    }
    setLoading(true);
    const supabase = createClient();
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, company_name: companyName },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    setLoading(false);
    if (signUpError || !data.user) {
      setError(swedishAuthError(signUpError?.message ?? "Kunde inte skapa konto"));
      return;
    }
    if (!data.session) {
      setStatus("Kolla mejlen och klicka på länken. Sen är du inne.");
      return;
    }
    router.push("/");
    router.refresh();
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="full-name">Ditt namn</Label>
            <Input autoComplete="name" id="full-name" name="full-name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company-name">Företag</Label>
            <Input id="company-name" name="company-name" placeholder="Exempel AB" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">E-post</Label>
            <Input autoComplete="email" id="email" name="email" required type="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Lösenord</Label>
            <Input autoComplete="new-password" id="password" minLength={6} name="password" required type="password" />
          </div>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          {status ? <p className="text-sm text-muted-foreground">{status}</p> : null}
          <Button className="w-full" disabled={loading} size="lg" type="submit">
            {loading ? "Skapar…" : "Skapa konto"}
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Har du redan konto? <Link className="font-semibold text-primary hover:underline" href="/login">Logga in</Link>
        </p>
      </CardContent>
    </Card>
  );
}
