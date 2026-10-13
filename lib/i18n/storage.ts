import {
  DEFAULT_LOCALE,
  LOCALES,
  type Locale,
  type ThemePreference,
} from "@/lib/i18n/types";

const LOCALE_BASE = "app.locale";
const THEME_KEY = "app.theme";

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

export function localeStorageKey(userId?: string | null): string {
  return userId ? `${LOCALE_BASE}.${userId}` : LOCALE_BASE;
}

export function readStoredLocale(userId?: string | null): Locale {
  if (typeof window === "undefined") return DEFAULT_LOCALE;
  try {
    const scoped = window.localStorage.getItem(localeStorageKey(userId));
    if (isLocale(scoped)) return scoped;
    const shared = window.localStorage.getItem(LOCALE_BASE);
    if (isLocale(shared)) return shared;
  } catch {
    /* ignore */
  }
  return DEFAULT_LOCALE;
}

export function writeStoredLocale(locale: Locale, userId?: string | null): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(localeStorageKey(userId), locale);
    window.localStorage.setItem(LOCALE_BASE, locale);
  } catch {
    /* ignore */
  }
}

export function isThemePreference(value: unknown): value is ThemePreference {
  return value === "light" || value === "dark" || value === "system";
}

export function readStoredTheme(): ThemePreference {
  if (typeof window === "undefined") return "system";
  try {
    const value = window.localStorage.getItem(THEME_KEY);
    if (isThemePreference(value)) return value;
  } catch {
    /* ignore */
  }
  return "system";
}

export function writeStoredTheme(theme: ThemePreference): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(THEME_KEY, theme);
  } catch {
    /* ignore */
  }
}

export function resolveTheme(preference: ThemePreference): "light" | "dark" {
  if (preference === "light" || preference === "dark") return preference;
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}
