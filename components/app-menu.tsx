"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Check, Languages, Menu, Moon, Settings, Sun } from "lucide-react";

import { useLocale } from "@/components/providers/locale-provider";
import { useTheme } from "@/components/providers/theme-provider";
import { Button } from "@/components/ui/button";
import { listLocales, type ThemePreference } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const THEME_OPTIONS: ThemePreference[] = ["light", "dark", "system"];

export function AppMenu() {
  const { t, locale, setLocale } = useLocale();
  const { preference, setPreference } = useTheme();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const themeLabel = (value: ThemePreference) => {
    if (value === "light") return t("menu.themeLight");
    if (value === "dark") return t("menu.themeDark");
    return t("menu.themeSystem");
  };

  return (
    <div className="relative" ref={rootRef}>
      <Button
        type="button"
        variant="outline"
        size="sm"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={t("menu.title")}
        onClick={() => setOpen((current) => !current)}
      >
        <Menu className="size-4" />
        <span className="hidden sm:inline">{t("menu.title")}</span>
      </Button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-72 rounded-2xl border border-border bg-popover p-3 text-popover-foreground shadow-soft-lg"
        >
          <section className="mb-3 flex flex-col gap-1">
            <Link
              href="/installningar"
              role="menuitem"
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition-colors hover:bg-muted"
              onClick={() => setOpen(false)}
            >
              <Settings className="size-4 text-muted-foreground" />
              <span>{t("nav.settings")}</span>
            </Link>
          </section>

          <div className="mb-3 h-px bg-border" />

          <section className="flex flex-col gap-2">
            <div className="flex items-center gap-2 px-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              <Sun className="size-3.5" />
              <Moon className="size-3.5" />
              <span>{t("menu.theme")}</span>
            </div>
            <div className="flex flex-col gap-1">
              {THEME_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  role="menuitemradio"
                  aria-checked={preference === option}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition-colors",
                    preference === option
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-muted"
                  )}
                  onClick={() => setPreference(option)}
                >
                  <span>{themeLabel(option)}</span>
                  {preference === option ? <Check className="size-4" /> : null}
                </button>
              ))}
            </div>
          </section>

          <div className="my-3 h-px bg-border" />

          <section className="flex flex-col gap-2">
            <div className="flex items-center gap-2 px-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              <Languages className="size-3.5" />
              <span>{t("menu.language")}</span>
            </div>
            <div className="max-h-64 overflow-y-auto">
              {listLocales().map((item) => (
                <button
                  key={item.id}
                  type="button"
                  role="menuitemradio"
                  aria-checked={locale === item.id}
                  className={cn(
                    "flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition-colors",
                    locale === item.id
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-muted"
                  )}
                  onClick={() => {
                    setLocale(item.id);
                    setOpen(false);
                  }}
                >
                  <span>{item.label}</span>
                  {locale === item.id ? <Check className="size-4" /> : null}
                </button>
              ))}
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}
