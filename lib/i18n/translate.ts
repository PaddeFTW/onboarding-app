import type { MessageTree } from "@/lib/i18n/types";

function readPath(tree: MessageTree, path: string): string | undefined {
  const parts = path.split(".");
  let current: string | MessageTree | undefined = tree;
  for (const part of parts) {
    if (!current || typeof current === "string") return undefined;
    current = current[part];
  }
  return typeof current === "string" ? current : undefined;
}

/**
 * Resolve a dotted key against an active dictionary, then a fallback dictionary.
 * Missing keys return the key itself only as a last resort (should not reach UI).
 */
export function translate(
  active: MessageTree,
  fallback: MessageTree,
  key: string,
  vars?: Record<string, string | number>
): string {
  const raw = readPath(active, key) ?? readPath(fallback, key) ?? key;
  if (!vars) return raw;
  return Object.entries(vars).reduce(
    (text, [name, value]) => text.replaceAll(`{${name}}`, String(value)),
    raw
  );
}

export function hasMessage(tree: MessageTree, key: string): boolean {
  return typeof readPath(tree, key) === "string";
}
