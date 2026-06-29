import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Consistent page shell: centered, max-width, mobile-first padding.
 * Keeps spacing uniform across every route.
 */
function PageContainer({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <main
      className={cn(
        "mx-auto w-full max-w-[48rem] px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16",
        className
      )}
      {...props}
    >
      {children}
    </main>
  );
}

export { PageContainer };
