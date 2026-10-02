import { NextResponse } from "next/server";

import { ensureCompany } from "@/lib/auth/ensure-company";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next") ?? "/";
  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);
    const { data } = await supabase.auth.getUser();
    const companyName = String(data.user?.user_metadata?.company_name ?? "").trim();
    if (companyName) {
      await ensureCompany(supabase, {
        fullName: String(data.user?.user_metadata?.full_name ?? ""),
        companyName,
      }).catch(() => undefined);
    }
  }
  return NextResponse.redirect(new URL(next, url.origin));
}
