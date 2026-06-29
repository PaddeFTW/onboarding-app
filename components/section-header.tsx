import * as React from "react";

import { cn } from "@/lib/utils";

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  action?: React.ReactNode;
  size?: "page" | "section";
}

function SectionHeader({
  title,
  description,
  action,
  size = "section",
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
        className
      )}
      {...props}
    >
      <div className="flex flex-col gap-1.5">
        <h2
          className={cn(
            "font-semibold tracking-tight text-foreground",
            size === "page"
              ? "text-[2rem] leading-tight sm:text-[2.5rem]"
              : "text-[1.125rem] leading-snug"
          )}
        >
          {title}
        </h2>
        {description ? (
          <p className="max-w-[42ch] text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0 pt-1 sm:pt-0">{action}</div> : null}
    </div>
  );
}

export { SectionHeader };
