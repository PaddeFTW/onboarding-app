import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface AuthShellProps {
  title: string;
  description?: string;
  children: ReactNode;
  contentClassName?: string;
}

export function AuthShell({ title, description, children, contentClassName }: AuthShellProps) {
  return (
    <main className="flex min-h-screen w-full items-center justify-center px-4 py-12">
      <div className={cn("w-full space-y-8", contentClassName)}>
        <div className="space-y-2 text-center">
          <p className="text-sm font-semibold text-primary">Onboarding</p>
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          {description ? <p className="text-sm leading-6 text-muted-foreground">{description}</p> : null}
        </div>
        {children}
      </div>
    </main>
  );
}
