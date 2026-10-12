/** Shown when company registry tables are missing in Supabase. */
export const REGISTRY_MISSING_MESSAGE = "Företagsregistret saknas. Kör migrationen.";

const REGISTRY_TABLES = [
  "company_settings",
  "company_facts",
  "employees",
  "positions",
] as const;

function errorText(error: unknown): string {
  if (!error) return "";
  if (typeof error === "string") return error;
  if (error instanceof Error) return error.message;
  if (typeof error === "object") {
    const record = error as { message?: string; code?: string; details?: string; hint?: string };
    return [record.code, record.message, record.details, record.hint].filter(Boolean).join(" ");
  }
  return String(error);
}

/** True when PostgREST/Postgres reports a missing registry relation. */
export function isRegistryMissingError(error: unknown): boolean {
  const text = errorText(error).toLowerCase();
  if (!text) return false;

  const code =
    typeof error === "object" && error && "code" in error
      ? String((error as { code?: string }).code ?? "")
      : "";

  if (code === "42P01" || code === "PGRST205" || code === "PGRST204") {
    return REGISTRY_TABLES.some((table) => text.includes(table));
  }

  const mentionsRegistry = REGISTRY_TABLES.some((table) => text.includes(table));
  const looksMissing =
    text.includes("does not exist") ||
    text.includes("could not find") ||
    text.includes("schema cache") ||
    (text.includes("relation") && text.includes("exist"));

  return mentionsRegistry && looksMissing;
}

export function registryMissingMessage(error: unknown): string | null {
  return isRegistryMissingError(error) ? REGISTRY_MISSING_MESSAGE : null;
}
