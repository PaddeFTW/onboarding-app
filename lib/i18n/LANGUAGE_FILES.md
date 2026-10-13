# Language files (reusable i18n package)

Copy these into the next app that should share the same language foundation:

| File | Role |
|---|---|
| `lib/i18n/types.ts` | Locale list, labels, theme preference types |
| `lib/i18n/translate.ts` | Nested-key lookup with Swedish fallback |
| `lib/i18n/storage.ts` | Persist locale (per user) and theme |
| `lib/i18n/index.ts` | Public API (`t`, dictionaries, helpers) |
| `lib/i18n/locales/sv.ts` | Swedish — default + fallback |
| `lib/i18n/locales/en.ts` | English |
| `lib/i18n/locales/no.ts` | Norwegian |
| `lib/i18n/locales/da.ts` | Danish |
| `lib/i18n/locales/fi.ts` | Finnish |
| `lib/i18n/locales/pl.ts` | Polish |
| `lib/i18n/locales/de.ts` | German |
| `lib/i18n/locales/es.ts` | Spanish |
| `lib/i18n/locales/fr.ts` | French |
| `lib/i18n/examples/construction.ts` | Construction examples (sv/en/pl/de) |

Optional app wiring:

| File | Role |
|---|---|
| `components/providers/locale-provider.tsx` | React locale context |
| `components/providers/theme-provider.tsx` | React theme context |
| `components/app-menu.tsx` | Theme + language menu |

Default locale: Swedish (`sv`). Missing translations fall back to Swedish.
