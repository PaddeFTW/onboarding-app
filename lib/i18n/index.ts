/**
 * Reusable i18n foundation for PaddeFTW apps.
 *
 * Language files (copy these into the next app):
 * - lib/i18n/types.ts
 * - lib/i18n/translate.ts
 * - lib/i18n/storage.ts
 * - lib/i18n/index.ts
 * - lib/i18n/locales/sv.ts  (default + fallback)
 * - lib/i18n/locales/en.ts
 * - lib/i18n/locales/no.ts
 * - lib/i18n/locales/da.ts
 * - lib/i18n/locales/fi.ts
 * - lib/i18n/locales/pl.ts
 * - lib/i18n/locales/de.ts
 * - lib/i18n/locales/es.ts
 * - lib/i18n/locales/fr.ts
 * - lib/i18n/examples/construction.ts
 *
 * App wiring (optional):
 * - components/providers/locale-provider.tsx
 * - components/providers/theme-provider.tsx
 * - components/app-menu.tsx
 */

import { da } from "@/lib/i18n/locales/da";
import { de } from "@/lib/i18n/locales/de";
import { en } from "@/lib/i18n/locales/en";
import { es } from "@/lib/i18n/locales/es";
import { fi } from "@/lib/i18n/locales/fi";
import { fr } from "@/lib/i18n/locales/fr";
import { no } from "@/lib/i18n/locales/no";
import { pl } from "@/lib/i18n/locales/pl";
import { sv } from "@/lib/i18n/locales/sv";
import { hasMessage, translate } from "@/lib/i18n/translate";
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_LABELS,
  type Locale,
  type MessageTree,
} from "@/lib/i18n/types";

export {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_LABELS,
  type Locale,
  type MessageTree,
  type ThemePreference,
} from "@/lib/i18n/types";

export {
  constructionExampleFor,
  constructionExamples,
} from "@/lib/i18n/examples/construction";

export {
  isLocale,
  isThemePreference,
  localeStorageKey,
  readStoredLocale,
  readStoredTheme,
  resolveTheme,
  writeStoredLocale,
  writeStoredTheme,
} from "@/lib/i18n/storage";

export const dictionaries: Record<Locale, MessageTree> = {
  sv,
  en,
  no,
  da,
  fi,
  pl,
  de,
  es,
  fr,
};

export function t(
  locale: Locale,
  key: string,
  vars?: Record<string, string | number>
): string {
  return translate(dictionaries[locale] ?? sv, sv, key, vars);
}

export function hasTranslation(locale: Locale, key: string): boolean {
  return hasMessage(dictionaries[locale] ?? sv, key);
}

export function setupStepText(
  locale: Locale,
  stepId: string,
  field: "title" | "description" | "help"
): string | undefined {
  const key = `setup.steps.${stepId}.${field}`;
  if (!hasTranslation(locale, key) && !hasTranslation(DEFAULT_LOCALE, key)) {
    return undefined;
  }
  return t(locale, key);
}

export function questionText(
  locale: Locale,
  questionId: string,
  field: "title" | "help"
): string | undefined {
  const key = `questions.${questionId}.${field}`;
  if (!hasTranslation(locale, key) && !hasTranslation(DEFAULT_LOCALE, key)) {
    return undefined;
  }
  return t(locale, key);
}

export function listLocales(): { id: Locale; label: string }[] {
  return LOCALES.map((id) => ({ id, label: LOCALE_LABELS[id] }));
}
