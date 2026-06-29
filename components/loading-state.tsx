import * as React from "react";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface LoadingStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** "spinner" for a centered indicator, "cards" for skeleton placeholders. */
  variant?: "spinner" | "cards";
  label?: string;
  /** Number of skeleton cards when variant is "cards". */
  count?: number;
}

function LoadingState({
  variant = "spinner",
  label = "Laddar…",
  count = 3,
  className,
  ...props
}: LoadingStateProps) {
  if (variant === "cards") {
    return (
      <div className={cn("flex flex-col gap-4", className)} {...props}>
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-6 shadow-soft-sm"
          >
            <div className="flex items-center gap-4">
              <Skeleton className="size-12 rounded-2xl" />
              <div className="flex flex-1 flex-col gap-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-3 w-1/4" />
              </div>
            </div>
            <Skeleton className="h-2.5 w-full rounded-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 py-16 text-muted-foreground",
        className
      )}
      {...props}
    >
      <Loader2 className="size-6 animate-spin text-primary" />
      <p className="text-sm">{label}</p>
    </div>
  );
}

export { LoadingState };
