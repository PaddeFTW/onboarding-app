"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";

export default function NyttLosenordPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") ?? "");
    const confirm = String(form.get("confirm") ?? "");
    if (password.length < 6) {
      setError("Lösenordet ska ha minst 6 tecken.");
      return;
    }
    if (password !== confirm) {
      setError("Lösenorden är olika.");
      return;
    }
    setLoading(true);
    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (updateError) {
      setError("Lösenordet kunde inte sparas. Öppna länken från mejlet igen.");
      return;
    }
    setDone(true);
    window.setTimeout(() => router.replace("/"), 1200);
  }

  return (
    <main className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-4 rounded-[28px] border border-border bg-card p-5 text-card-foreground">
        <h1 className="text-2xl font-semibold">Nytt lösenord</h1>
        {done ? (
          <p className="text-sm text-muted-foreground">Lösenordet är sparat. Du skickas till arbetsytan.</p>
        ) : (
          <form className="space-y-4" onSubmit={(event) => void handleSubmit(event)}>
            <div className="space-y-2">
              <Label htmlFor="password">Nytt lösenord</Label>
              <Input
                autoComplete="new-password"
                className="h-12 rounded-full px-4"
                id="password"
                name="password"
                required
                type="password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm">Upprepa lösenord</Label>
              <Input
                autoComplete="new-password"
                className="h-12 rounded-full px-4"
                id="confirm"
                name="confirm"
                required
                type="password"
              />
            </div>
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
            <Button className="h-12 w-full rounded-full" disabled={loading} type="submit">
              {loading ? "Sparar…" : "Spara lösenord"}
            </Button>
          </form>
        )}
        <p className="text-center text-sm">
          <Link className="font-semibold text-primary" href="/login">
            Tillbaka till inloggning
          </Link>
        </p>
      </div>
    </main>
  );
}
