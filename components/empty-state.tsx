import * as React from "react";
import { type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-5",
        "rounded-[1.75rem] border border-dashed border-border/70",
        "bg-gradient-to-b from-card to-muted/25",
        "px-6 py-12 text-center sm:px-8 sm:py-14",
        className
      )}
      {...props}
    >
      {Icon ? (
        <div
          className={cn(
            "flex size-12 items-center justify-center rounded-2xl",
            "border border-border/90 bg-card shadow-soft-xs",
            "text-muted-foreground"
          )}
        >
          <Icon className="size-5" />
        </div>
      ) : (
        /* Default empty indicator */
        <div className="flex size-11 items-center justify-center rounded-full border border-dashed border-border/60 bg-card/60">
          <div className="size-2 rounded-full bg-muted-foreground/25" />
        </div>
      )}

      <div className="flex max-w-[28ch] flex-col gap-1.5">
        <h3 className="text-[0.95rem] font-semibold tracking-tight text-foreground">
          {title}
        </h3>
        {description ? (
          <p className="text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>

      {action ? <div className="mt-1">{action}</div> : null}
    </div>
  );
}

export { EmptyState };
