"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ensureCompany } from "@/lib/auth/ensure-company";
import { createClient } from "@/lib/supabase/client";

export default function SkapaKontoPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
      options: { data: { full_name: fullName, company_name: companyName }, emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    if (signUpError || !data.user) {
      setLoading(false);
      setError("Kontot kunde inte skapas. Använd en annan e-post eller logga in.");
      return;
    }
    if (!data.session) {
      setLoading(false);
      setStatus("Kolla mejlen och klicka på länken. Sen är du inne.");
      return;
    }
    try {
      await ensureCompany(supabase, { fullName, companyName });
      router.push("/");
      router.refresh();
    } catch (err) {
      setLoading(false);
      setError(err instanceof Error ? err.message : "Kontot skapades men företaget kunde inte sparas.");
    }
  }

  return (
    <AuthShell description="Du blir administratör för ditt företag. Andra bjuder du in sen." title="Skapa konto">
      <form className="space-y-4 rounded-[28px] border border-neutral-200/80 bg-white p-5" onSubmit={handleSubmit}>
        <div className="space-y-2"><Label htmlFor="full-name">Ditt namn</Label><Input className="h-12 rounded-full px-4" id="full-name" name="full-name" required /></div>
        <div className="space-y-2"><Label htmlFor="company-name">Företag</Label><Input className="h-12 rounded-full px-4" id="company-name" name="company-name" placeholder="Exempel AB" required /></div>
        <div className="space-y-2"><Label htmlFor="email">E-post</Label><Input autoComplete="email" className="h-12 rounded-full px-4" id="email" name="email" required type="email" /></div>
        <div className="space-y-2"><Label htmlFor="password">Lösenord</Label><Input autoComplete="new-password" className="h-12 rounded-full px-4" id="password" minLength={6} name="password" required type="password" /></div>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        {status ? <p className="text-sm text-neutral-500">{status}</p> : null}
        <Button className="h-12 w-full rounded-full bg-[#6d4dff]" disabled={loading} type="submit">{loading ? "Skapar…" : "Skapa konto"}</Button>
        <p className="text-center text-sm text-neutral-500">Har du redan konto? <Link className="font-semibold text-[#5b4dff]" href="/login">Logga in</Link></p>
      </form>
    </AuthShell>
  );
}
