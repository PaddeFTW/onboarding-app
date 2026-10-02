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
    const metadata = data.user?.user_metadata ?? {};
    const companyName = String(metadata.company_name ?? "").trim();
    if (companyName) {
      await ensureCompany(supabase, {
        fullName: String(metadata.full_name ?? metadata.name ?? ""),
        companyName,
      }).catch(() => undefined);
    }
  }

  return NextResponse.redirect(new URL(next, url.origin));
}
