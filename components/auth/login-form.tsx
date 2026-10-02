"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { swedishAuthError } from "@/lib/auth/errors";
import { createClient } from "@/lib/supabase/client";

const EMAIL_KEY = "onboarding.login.email";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<"google" | "azure" | "link" | "password" | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(EMAIL_KEY);
    if (stored) setEmail(stored);
  }, []);

  function rememberEmail(value: string) {
    window.localStorage.setItem(EMAIL_KEY, value);
  }

  async function startOAuth(provider: "google" | "azure") {
    setError(null);
    setLoading(provider);
    const supabase = createClient();
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (oauthError) {
      setLoading(null);
      setError(provider === "google" ? "Google är inte påslaget än." : "Microsoft är inte påslaget än.");
    }
  }

  async function sendLink(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setStatus(null);
    const trimmed = email.trim();
    if (!trimmed) return;
    rememberEmail(trimmed);
    setLoading("link");
    const supabase = createClient();
    const { error: otpError } = await supabase.auth.signInWithOtp({
      email: trimmed,
      options: { shouldCreateUser: true, emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    setLoading(null);
    if (otpError) {
      setError(swedishAuthError(otpError.message));
      return;
    }
    setStatus("Kolla din mejl. Klicka på länken så är du inne.");
  }

  async function signInWithPassword(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setStatus(null);
    const trimmed = email.trim();
    rememberEmail(trimmed);
    setLoading("password");
    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({ email: trimmed, password });
    setLoading(null);
    if (signInError) {
      setError(swedishAuthError(signInError.message));
      return;
    }
    router.push("/");
    router.refresh();
  }

  return (
    <Card>
      <CardContent className="space-y-4 pt-6">
        <Button className="w-full" disabled={Boolean(loading)} onClick={() => void startOAuth("google")} size="lg" type="button" variant="outline">
          Fortsätt med Google
        </Button>
        <Button className="w-full" disabled={Boolean(loading)} onClick={() => void startOAuth("azure")} size="lg" type="button" variant="outline">
          Fortsätt med Microsoft
        </Button>
        <p className="text-center text-xs text-muted-foreground">eller mejl</p>
        <form className="space-y-3" onSubmit={showPassword ? signInWithPassword : sendLink}>
          <div className="space-y-2">
            <Label htmlFor="email">E-post</Label>
            <Input autoComplete="email" id="email" onChange={(event) => setEmail(event.target.value)} placeholder="namn@foretag.se" required type="email" value={email} />
          </div>
          {showPassword ? (
            <div className="space-y-2">
              <Label htmlFor="password">Lösenord</Label>
              <Input autoComplete="current-password" id="password" onChange={(event) => setPassword(event.target.value)} required type="password" value={password} />
            </div>
          ) : null}
          {error ? <p className="text-sm text-destructive" role="alert">{error}</p> : null}
          {status ? <p className="text-sm text-muted-foreground" role="status">{status}</p> : null}
          <Button className="w-full" disabled={Boolean(loading)} size="lg" type="submit">
            {showPassword ? (loading === "password" ? "Loggar in…" : "Logga in") : (
              <>
                <Mail data-icon="inline-start" />
                {loading === "link" ? "Skickar länk…" : "Skicka inloggningslänk"}
              </>
            )}
          </Button>
        </form>
        <button className="w-full text-center text-sm text-muted-foreground underline-offset-4 hover:underline" onClick={() => { setShowPassword((value) => !value); setError(null); setStatus(null); }} type="button">
          {showPassword ? "Använd mejllänk i stället" : "Logga in med lösenord"}
        </button>
      </CardContent>
    </Card>
  );
}
