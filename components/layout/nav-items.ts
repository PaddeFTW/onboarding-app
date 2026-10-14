import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Building2,
  ClipboardList,
  History,
  Home,
  Settings,
  Shield,
  Users,
} from "lucide-react";

export type AppNavItem = {
  href: string;
  /** Match pathname for active state (defaults to href). */
  match?: string;
  label: string;
  icon: LucideIcon;
};

/** Main sidebar links — plain language labels for non-technical users. */
export const APP_NAV_ITEMS: AppNavItem[] = [
  { href: "/", label: "Hem", icon: Home },
  { href: "/foretag", label: "Företag", icon: Building2 },
  { href: "/medarbetare", label: "Medarbetare", icon: Users },
  {
    href: "/onboarding/new",
    match: "/onboarding",
    label: "Introduktioner",
    icon: ClipboardList,
  },
  { href: "/ordlista", label: "Kunskapsbank", icon: BookOpen },
  { href: "/policyer", label: "Policyer", icon: Shield },
  { href: "/historik", label: "Historik", icon: History },
  { href: "/installningar", label: "Inställningar", icon: Settings },
];

export const PUBLIC_APP_PATHS = [
  "/login",
  "/skapa-konto",
  "/glomt-losenord",
  "/nytt-losenord",
  "/auth/callback",
  "/manifest",
  "/installera",
  "/integritet",
  "/villkor",
] as const;

export function isPublicAppPath(pathname: string) {
  return PUBLIC_APP_PATHS.some(
    (item) => pathname === item || pathname.startsWith(`${item}/`)
  );
}

export function isNavItemActive(pathname: string, item: AppNavItem) {
  const base = item.match ?? item.href;
  if (base === "/") return pathname === "/";
  return pathname === base || pathname.startsWith(`${base}/`);
}
