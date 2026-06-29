import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl",
    "text-sm font-medium tracking-[-0.01em]",
    "transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:scale-[0.985] active:duration-100",
    "[&_svg]:pointer-events-none [&_svg]:size-[1.05rem] [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-gradient-to-br from-primary to-violet-600",
          "text-primary-foreground shadow-soft-sm",
          "hover:-translate-y-px hover:from-primary/95 hover:to-violet-600/95 hover:shadow-soft-md",
        ],
        secondary:
          "bg-secondary text-secondary-foreground hover:-translate-y-px hover:bg-secondary/80",
        outline:
          "border border-border/90 bg-card/95 text-foreground shadow-soft-xs hover:-translate-y-px hover:border-primary/18 hover:bg-accent/80 hover:text-accent-foreground hover:shadow-soft-sm",
        ghost:
          "text-muted-foreground hover:bg-accent/80 hover:text-accent-foreground",
        destructive:
          "bg-gradient-to-br from-destructive to-rose-600 text-destructive-foreground shadow-soft-sm hover:-translate-y-px hover:from-destructive/90 hover:to-rose-600/90 hover:shadow-soft-md",
        link:
          "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm:      "h-9 rounded-xl px-3.5 text-xs",
        default: "h-11 px-5",
        lg:      "h-12 px-6 text-[0.9375rem]",
        icon:    "size-11 rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size:    "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
