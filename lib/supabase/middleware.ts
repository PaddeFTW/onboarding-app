import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import { getSupabaseEnv } from "@/lib/supabase/env";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });
  const { url, key } = getSupabaseEnv();

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options));
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const isPublicPage =
    path.startsWith("/login") ||
    path.startsWith("/skapa-konto") ||
    path.startsWith("/glomt-losenord") ||
    path.startsWith("/nytt-losenord") ||
    path.startsWith("/auth/callback");

  if (!user && !isPublicPage) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/login";
    return NextResponse.redirect(redirectUrl);
  }

  if (user && (path.startsWith("/login") || path.startsWith("/skapa-konto"))) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/";
    return NextResponse.redirect(redirectUrl);
  }

  return supabaseResponse;
}
