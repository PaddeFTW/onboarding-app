"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { swedishAuthError } from "@/lib/auth/errors";
import { createClient } from "@/lib/supabase/client";

export default function GlomtLosenordPage() {
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const supabase = createClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/nytt-losenord`,
    });
    setLoading(false);
    if (resetError) {
      setError(swedishAuthError(resetError.message));
      return;
    }
    setSent(true);
  }

  return (
    <AuthShell contentClassName="max-w-sm" description="Skriv din e-post. Du får en länk för att välja nytt lösenord." title="Glömt lösenord">
      <Card>
        <CardContent className="space-y-5 pt-6">
          {sent ? (
            <p className="text-sm leading-6 text-muted-foreground">Om adressen finns får du ett mejl. Kolla skräpposten om det dröjer.</p>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email">E-post</Label>
                <Input autoComplete="email" id="email" name="email" required type="email" />
              </div>
              {error ? <p className="text-sm text-destructive" role="alert">{error}</p> : null}
              <Button className="w-full" disabled={loading} size="lg" type="submit">{loading ? "Skickar…" : "Skicka länk"}</Button>
            </form>
          )}
        </CardContent>
      </Card>
      <p className="text-center text-sm text-muted-foreground">
        <Link className="font-medium text-primary hover:underline" href="/login">Tillbaka till inloggning</Link>
      </p>
    </AuthShell>
  );
}
