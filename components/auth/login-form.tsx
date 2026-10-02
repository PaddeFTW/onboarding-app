"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";

const EMAIL_KEY = "onboarding.login.email";

function GoogleMark() {
  return (
    <svg aria-hidden className="size-4" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function MicrosoftMark() {
  return (
    <svg aria-hidden className="size-4" viewBox="0 0 24 24">
      <path fill="#F25022" d="M1 1h10v10H1z" />
      <path fill="#7FBA00" d="M13 1h10v10H13z" />
      <path fill="#00A4EF" d="M1 13h10v10H1z" />
      <path fill="#FFB900" d="M13 13h10v10H13z" />
    </svg>
  );
}

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(EMAIL_KEY);
    if (stored) setEmail(stored);
  }, []);

  async function startOAuth(provider: "google" | "azure") {
    setError(null);
    setLoading(provider);
    const { error: oauthError } = await createClient().auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (oauthError) {
      setLoading(null);
      setError(provider === "google" ? "Google är inte påslaget än. Använd mejllänken under tiden." : "Microsoft är inte påslaget än. Använd mejllänken under tiden.");
    }
  }

  async function sendLink(event: FormEvent) {
    event.preventDefault();
    const trimmed = email.trim();
    window.localStorage.setItem(EMAIL_KEY, trimmed);
    setLoading("link");
    setError(null);
    const { error: otpError } = await createClient().auth.signInWithOtp({
      email: trimmed,
      options: { shouldCreateUser: true, emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    setLoading(null);
    if (otpError) {
      setError("Länken kunde inte skickas. Kolla att e-post är påslaget i Supabase.");
      return;
    }
    setStatus("Kolla din mejl. Klicka på länken så är du inne. Inget lösenord.");
  }

  async function signInWithPassword(event: FormEvent) {
    event.preventDefault();
    window.localStorage.setItem(EMAIL_KEY, email.trim());
    setLoading("password");
    setError(null);
    const { error: signInError } = await createClient().auth.signInWithPassword({ email: email.trim(), password });
    setLoading(null);
    if (signInError) {
      setError("Fel e-post eller lösenord.");
      return;
    }
    router.push("/");
    router.refresh();
  }

  return (
    <section className="space-y-4 rounded-[28px] border border-neutral-200/80 bg-white p-5 shadow-[0_10px_40px_-24px_rgba(15,23,42,0.35)]">
      <Button className="h-12 w-full rounded-full" disabled={Boolean(loading)} onClick={() => void startOAuth("google")} type="button" variant="outline">
        <GoogleMark /> Fortsätt med Google
      </Button>
      <Button className="h-12 w-full rounded-full" disabled={Boolean(loading)} onClick={() => void startOAuth("azure")} type="button" variant="outline">
        <MicrosoftMark /> Fortsätt med Microsoft
      </Button>
      <p className="text-center text-xs text-neutral-400">eller mejl</p>
      <form className="space-y-3" onSubmit={showPassword ? signInWithPassword : sendLink}>
        <div className="space-y-2">
          <Label htmlFor="email">E-post</Label>
          <Input autoComplete="email" className="h-12 rounded-full px-4" id="email" onChange={(event) => setEmail(event.target.value)} placeholder="namn@foretag.se" required type="email" value={email} />
        </div>
        {showPassword ? (
          <div className="space-y-2">
            <Label htmlFor="password">Lösenord</Label>
            <Input autoComplete="current-password" className="h-12 rounded-full px-4" id="password" onChange={(event) => setPassword(event.target.value)} required type="password" value={password} />
          </div>
        ) : null}
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        {status ? <p className="text-sm text-neutral-500">{status}</p> : null}
        <Button className="h-12 w-full rounded-full bg-[#6d4dff] hover:bg-[#5b3df0]" disabled={Boolean(loading)} type="submit">
          {showPassword ? (loading === "password" ? "Loggar in…" : "Logga in") : <><Mail />{loading === "link" ? "Skickar länk…" : "Skicka inloggningslänk"}</>}
        </Button>
      </form>
      <button className="w-full text-center text-sm text-neutral-600" onClick={() => { setShowPassword((value) => !value); setError(null); setStatus(null); }} type="button">
        {showPassword ? "Använd mejllänk i stället" : "Logga in med lösenord"}
      </button>
    </section>
  );
}
