"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { AppMenu } from "@/components/app-menu";
import { useLocale } from "@/components/providers/locale-provider";
import { useTheme } from "@/components/providers/theme-provider";

export function AppBrand() {
  const pathname = usePathname();
  const { t } = useLocale();
  const { resolved } = useTheme();

  if (pathname === "/login") return null;

  const logoSrc =
    resolved === "dark"
      ? "/onboarding-logo-dark.png"
      : "/onboarding-logo-light.png";

  return (
    <div className="flex items-center justify-between gap-3 px-4 pt-5 sm:px-6 lg:px-8">
      <Link href="/" className="inline-flex items-center" aria-label={t("brand.aria")}>
        <img alt={t("brand.name")} className="h-8 w-auto" src={logoSrc} />
      </Link>
      <AppMenu />
    </div>
  );
}
