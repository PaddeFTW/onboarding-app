import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

import { getSupabaseEnv } from "@/lib/supabase/env";

let browserClient: SupabaseClient | null = null;

export function createClient() {
  const { url, key } = getSupabaseEnv();
  return createBrowserClient(url, key);
}

export function getSupabaseBrowserClient() {
  if (!browserClient) {
    browserClient = createClient();
  }
  return browserClient;
}
