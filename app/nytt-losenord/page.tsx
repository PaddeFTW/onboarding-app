"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { swedishAuthError } from "@/lib/auth/errors";
import { createClient } from "@/lib/supabase/client";

export default function NyttLosenordPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") ?? "");
    const confirm = String(form.get("confirm-password") ?? "");
    if (password !== confirm) {
      setError("Lösenorden matchar inte.");
      return;
    }
    setLoading(true);
    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (updateError) {
      setError(swedishAuthError(updateError.message));
      return;
    }
    router.push("/");
    router.refresh();
  }

  return (
    <AuthShell contentClassName="max-w-sm" description="Välj ett nytt lösenord, minst 6 tecken." title="Nytt lösenord">
      <Card>
        <CardContent className="pt-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="password">Nytt lösenord</Label>
              <Input autoComplete="new-password" id="password" minLength={6} name="password" required type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Samma lösenord igen</Label>
              <Input autoComplete="new-password" id="confirm-password" minLength={6} name="confirm-password" required type="password" />
            </div>
            {error ? <p className="text-sm text-destructive" role="alert">{error}</p> : null}
            <Button className="w-full" disabled={loading} size="lg" type="submit">{loading ? "Sparar…" : "Spara och logga in"}</Button>
          </form>
        </CardContent>
      </Card>
      <p className="text-center text-sm text-muted-foreground">
        <Link className="font-medium text-primary hover:underline" href="/login">Tillbaka till inloggning</Link>
      </p>
    </AuthShell>
  );
}
