/** Supported UI locales. Reusable across apps that share this i18n package. */
export const LOCALES = [
  "sv",
  "en",
  "no",
  "da",
  "fi",
  "pl",
  "de",
  "es",
  "fr",
] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "sv";

/** Locales that show native UI names in the language menu. */
export const LOCALE_LABELS: Record<Locale, string> = {
  sv: "Svenska",
  en: "English",
  no: "Norsk",
  da: "Dansk",
  fi: "Suomi",
  pl: "Polski",
  de: "Deutsch",
  es: "Español",
  fr: "Français",
};

export type MessageTree = { [key: string]: string | MessageTree };

export type ThemePreference = "light" | "dark" | "system";
