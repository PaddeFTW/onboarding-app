"use client";

import { usePathname } from "next/navigation";

import {
  DesktopSidebar,
  MobileSidebar,
} from "@/components/layout/app-sidebar";
import { isPublicAppPath } from "@/components/layout/nav-items";

/**
 * Dashboard chrome for signed-in pages: fixed sidebar (desktop) + collapsible menu (mobile).
 * Public auth/legal routes render children only.
 */
export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";

  if (isPublicAppPath(pathname)) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-full">
      <DesktopSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <MobileSidebar />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
