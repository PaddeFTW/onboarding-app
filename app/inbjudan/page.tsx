"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";

import { SignOutButton } from "@/components/auth/sign-out-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";

const roles = [
  { value: "ansvarig", label: "Ansvarig chef" },
  { value: "deltagare", label: "Deltagare" },
  { value: "admin", label: "Administratör" },
];

export default function InbjudanPage() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("ansvarig");
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void createClient().rpc("accept_company_invite");
  }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setStatus(null);
    const supabase = createClient();
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;
    const { data: member } = await supabase.from("organization_members").select("organization_id, role").eq("user_id", userId).limit(1).maybeSingle();
    if (!member || member.role !== "admin") {
      setError("Bara administratören kan bjuda in.");
      return;
    }
    const { error: insertError } = await supabase.from("company_invites").insert({
      organization_id: member.organization_id,
      email: email.trim().toLowerCase(),
      role,
      invited_by: userId,
    });
    if (insertError) {
      setError("Inbjudan kunde inte sparas. Kör SQL-filen för roller om tabellen saknas.");
      return;
    }
    const { error: mailError } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: { shouldCreateUser: true, emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    setStatus(mailError ? "Inbjudan är sparad. Mejlet kunde inte skickas. Personen skapar konto med samma e-post." : "Inbjudan är sparad och en inloggningslänk är skickad.");
    setEmail("");
  }

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col gap-6 px-4 py-10">
      <div className="flex items-center justify-between">
        <Link className="text-sm font-semibold text-[#5b4dff]" href="/">Tillbaka</Link>
        <SignOutButton />
      </div>
      <h1 className="text-2xl font-semibold">Bjud in kollega</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="email">E-post</Label>
          <Input id="email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="role">Roll</Label>
          <select id="role" className="h-12 w-full rounded-full border px-4" value={role} onChange={(event) => setRole(event.target.value)}>
            {roles.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
          </select>
        </div>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        {status ? <p className="text-sm text-neutral-600">{status}</p> : null}
        <Button className="h-12 w-full rounded-full bg-[#6d4dff]" type="submit">Spara inbjudan</Button>
      </form>
    </main>
  );
}
