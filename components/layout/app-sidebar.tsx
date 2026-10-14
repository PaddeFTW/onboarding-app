"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { AppMenu } from "@/components/app-menu";
import { SignOutButton } from "@/components/auth/sign-out-button";
import {
  APP_NAV_ITEMS,
  isNavItemActive,
  type AppNavItem,
} from "@/components/layout/nav-items";
import { useLocale } from "@/components/providers/locale-provider";
import { useTheme } from "@/components/providers/theme-provider";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

function NavLink({
  item,
  onNavigate,
}: {
  item: AppNavItem;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const active = isNavItemActive(pathname, item);
  const { label } = item;
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-colors",
        active
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      <Icon className="size-4 shrink-0" aria-hidden />
      <span>{label}</span>
    </Link>
  );
}

function SidebarBrand() {
  const { t } = useLocale();
  const { resolved } = useTheme();
  const logoSrc =
    resolved === "dark"
      ? "/onboarding-logo-dark.png"
      : "/onboarding-logo-light.png";

  return (
    <Link href="/" className="inline-flex items-center gap-2 px-1" aria-label={t("brand.aria")}>
      <img alt={t("brand.name")} className="h-8 w-auto" src={logoSrc} />
    </Link>
  );
}

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex flex-1 flex-col gap-1" aria-label="Huvudmeny">
      {APP_NAV_ITEMS.map((item) => (
        <NavLink key={item.href} item={item} onNavigate={onNavigate} />
      ))}
    </nav>
  );
}

function SidebarFooter() {
  return (
    <div className="mt-auto flex flex-col gap-3 border-t border-border pt-4">
      <div className="flex items-center justify-between gap-2">
        <AppMenu />
        <SignOutButton />
      </div>
    </div>
  );
}

export function DesktopSidebar() {
  return (
    <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col border-r border-border bg-card px-3 py-5 lg:flex">
      <div className="mb-6 px-2">
        <SidebarBrand />
        <p className="mt-2 px-1 text-xs text-muted-foreground">Meny</p>
      </div>
      <SidebarNav />
      <SidebarFooter />
    </aside>
  );
}

export function MobileSidebar() {
  const [open, setOpen] = useState(false);
  const { t } = useLocale();
  const { resolved } = useTheme();
  const logoSrc =
    resolved === "dark"
      ? "/onboarding-logo-dark.png"
      : "/onboarding-logo-light.png";

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between gap-3 border-b border-border bg-background/95 px-4 py-3 backdrop-blur lg:hidden">
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          aria-label="Öppna meny"
          onClick={() => setOpen(true)}
        >
          <Menu className="size-4" />
        </Button>
        <Link href="/" className="inline-flex items-center" aria-label={t("brand.aria")}>
          <img alt={t("brand.name")} className="h-7 w-auto" src={logoSrc} />
        </Link>
      </div>
      <AppMenu />

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          className={cn(
            "left-0 right-auto w-[min(100%,20rem)] border-r border-l-0 sm:max-w-xs",
            "data-[state=open]:slide-in-from-left-full data-[state=closed]:slide-out-to-left-full"
          )}
        >
          <SheetHeader>
            <SheetTitle>Meny</SheetTitle>
            <SheetDescription>
              Välj en sida. Du kan stänga menyn när du är klar.
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 py-4">
            <SidebarNav onNavigate={() => setOpen(false)} />
            <div className="mt-auto border-t border-border pt-4">
              <SignOutButton />
            </div>
          </div>
          <button
            type="button"
            className="sr-only"
            onClick={() => setOpen(false)}
          >
            <X className="size-4" />
            Stäng
          </button>
        </SheetContent>
      </Sheet>
    </header>
  );
}
