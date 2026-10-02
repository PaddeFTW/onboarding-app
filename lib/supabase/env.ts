export function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key || url.includes("your-project-ref") || key.includes("your-supabase")) {
    throw new Error(
      "Supabase saknas. Fyll i NEXT_PUBLIC_SUPABASE_URL och NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY."
    );
  }

  return { url, key };
}
