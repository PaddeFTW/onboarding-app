import type { ReactNode } from "react";

export function AuthShell({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-[#f7f7f8] px-4 py-12">
      <div className="w-full max-w-sm space-y-8">
        <div className="space-y-2 text-center">
          <p className="text-sm font-medium text-[#5b4dff]">Onboarding</p>
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          {description ? <p className="text-sm leading-6 text-neutral-500">{description}</p> : null}
        </div>
        {children}
      </div>
    </main>
  );
}
