"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";

export default function GlomtLosenordPage() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get("email") ?? "").trim();
    const { error: resetError } = await createClient().auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/nytt-losenord` });
    if (resetError) {
      setError("Länken kunde inte skickas.");
      return;
    }
    setSent(true);
  }

  return (
    <AuthShell description="Skriv din e-post. Du får en länk för att välja nytt lösenord." title="Glömt lösenord">
      <div className="rounded-[28px] border border-neutral-200/80 bg-white p-5">
        {sent ? <p className="text-sm text-neutral-500">Om adressen finns får du ett mejl. Kolla skräpposten om det dröjer.</p> : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2"><Label htmlFor="email">E-post</Label><Input autoComplete="email" className="h-12 rounded-full px-4" id="email" name="email" required type="email" /></div>
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            <Button className="h-12 w-full rounded-full bg-[#6d4dff]" type="submit">Skicka länk</Button>
          </form>
        )}
      </div>
      <p className="text-center text-sm"><Link className="font-medium text-[#5b4dff]" href="/login">Tillbaka till inloggning</Link></p>
    </AuthShell>
  );
}
