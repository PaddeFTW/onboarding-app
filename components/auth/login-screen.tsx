"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";

type Mode = "link" | "password";
type Status = "idle" | "sent";

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<Mode>("link");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const emailOk = isEmail(email.trim());

  async function onMagicLink(event: FormEvent) {
    event.preventDefault();
    setError(null);
    if (!emailOk) return;
    setLoading(true);
    const { error: otpError } = await createClient().auth.signInWithOtp({
      email: email.trim(),
      options: { shouldCreateUser: true, emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    setLoading(false);
    if (otpError) {
      const message = otpError.message.toLowerCase();
      setError(message.includes("after") || message.includes("rate") ? "Vänta en minut och skicka länken igen." : otpError.message);
      return;
    }
    setStatus("sent");
  }

  async function onPassword(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    const { error: signInError } = await createClient().auth.signInWithPassword({ email: email.trim(), password });
    setLoading(false);
    if (signInError) {
      setError("Fel e-post eller lösenord.");
      return;
    }
    router.push("/");
    router.refresh();
  }

  async function onProvider(provider: "google" | "azure") {
    setError(null);
    const { error: oauthError } = await createClient().auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (oauthError) setError(provider === "google" ? "Google är inte påslaget än." : "Microsoft är inte påslaget än.");
  }

  return (
    <main className="flex min-h-dvh items-center justify-center bg-[#f7f7f8] px-4 py-10">
      <div className="w-full max-w-[420px]">
        <header className="mb-8 text-center">
          <img alt="Onboarding" className="mx-auto mb-5 h-10 w-auto" src="/onboarding-logo-light.png" />
          <h1 className="text-[2rem] font-semibold tracking-tight text-neutral-950">Logga in</h1>
          <p className="mt-2 text-sm text-neutral-500">Samma inloggning som i de andra apparna.</p>
        </header>
        <section className="rounded-[28px] border border-neutral-200/80 bg-white p-4 shadow-[0_10px_40px_-24px_rgba(15,23,42,0.35)] sm:p-5">
          <div className="flex flex-col gap-3">
            <Button type="button" variant="outline" className="h-12 rounded-full" onClick={() => void onProvider("google")}>
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4"><path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.5a5.6 5.6 0 0 1-2.4 3.7v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8Z"/><path fill="#34A853" d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3c-1.1.7-2.5 1.2-4 1.2-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1A12 12 0 0 0 12 24Z"/><path fill="#FBBC05" d="M5.4 14.4a7.2 7.2 0 0 1 0-4.8V6.5H1.4a12 12 0 0 0 0 11l4-3.1Z"/><path fill="#EA4335" d="M12 4.8c1.7 0 3.3.6 4.5 1.8l3.4-3.4A12 12 0 0 0 1.4 6.5l4 3.1C6.3 6.9 8.9 4.8 12 4.8Z"/></svg>
              Fortsätt med Google
            </Button>
            <Button type="button" variant="outline" className="h-12 rounded-full" onClick={() => void onProvider("azure")}>
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4"><path fill="#F25022" d="M1 1h10.5v10.5H1z"/><path fill="#7FBA00" d="M12.5 1H23v10.5H12.5z"/><path fill="#00A4EF" d="M1 12.5h10.5V23H1z"/><path fill="#FFB900" d="M12.5 12.5H23V23H12.5z"/></svg>
              Fortsätt med Microsoft
            </Button>
          </div>
          <p className="py-4 text-center text-sm text-neutral-400">eller mejl</p>
          {status === "sent" ? (
            <div className="rounded-2xl bg-neutral-50 px-4 py-5 text-center">
              <p className="text-sm font-medium text-neutral-900">Kolla {email.trim()}</p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-500">Klicka på länken i mejlet. Kolla skräpposten om den dröjer.</p>
            </div>
          ) : (
            <form className="flex flex-col gap-3" onSubmit={mode === "link" ? onMagicLink : onPassword}>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email">E-post</Label>
                <Input id="email" type="email" autoComplete="email" placeholder="namn@foretag.se" value={email} onChange={(event) => setEmail(event.target.value)} className="h-12 rounded-full px-4" />
              </div>
              {mode === "password" ? (
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="password">Lösenord</Label>
                  <Input id="password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="h-12 rounded-full px-4" />
                </div>
              ) : null}
              {error ? <p className="text-sm text-red-600">{error}</p> : null}
              <Button type="submit" className="h-12 rounded-full bg-[#6d4dff] hover:bg-[#5b3df0]" disabled={loading || !emailOk}>
                {mode === "link" ? <><Mail />{loading ? "Skickar…" : "Skicka inloggningslänk"}</> : loading ? "Loggar in…" : "Logga in"}
              </Button>
              <button type="button" className="py-1 text-sm text-neutral-600" onClick={() => { setMode(mode === "link" ? "password" : "link"); setError(null); }}>
                {mode === "link" ? "Logga in med lösenord" : "Skicka inloggningslänk i stället"}
              </button>
            </form>
          )}
        </section>
        <p className="mt-6 text-center text-sm">
          <Link href="/skapa-konto" className="font-semibold text-[#5b4dff]">Skapa konto</Link>
          <span className="mx-3 text-neutral-300"> </span>
          <Link href="/glomt-losenord" className="text-neutral-500">Glömt lösenord</Link>
        </p>
        <p className="mt-3 text-center text-xs text-neutral-400">
          <Link href="/integritet">Integritet</Link>
          <span className="mx-2">·</span>
          <Link href="/villkor">Villkor</Link>
        </p>
      </div>
    </main>
  );
}
