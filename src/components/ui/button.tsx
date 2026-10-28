"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { wrapBouncyIcons } from "@/components/ui/bouncy-icon";

const buttonVariants = cva(
  "group/btn inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "rounded-[10px] bg-primary text-xs font-bold uppercase tracking-[0.04em] text-text-on-dark hover:bg-accent hover:text-primary h-11 px-5",
        secondary:
          "h-auto min-h-11 bg-transparent px-1 py-2 text-sm font-medium text-text-primary underline decoration-border-strong underline-offset-4 hover:text-link-hover hover:decoration-accent",
        outlineOnDark:
          "rounded-[10px] border-2 border-text-on-dark bg-transparent text-xs font-bold uppercase tracking-[0.04em] text-text-on-dark hover:bg-white/10 h-11 px-5",
        link: "h-auto bg-transparent p-0 text-link underline-offset-4 hover:text-link-hover hover:underline",
      },
      size: {
        default: "",
        sm: "text-xs",
        lg: "text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, children, ...props },
    ref,
  ) => {
    if (asChild) {
      if (!React.isValidElement(children)) {
        return null;
      }

      const child = children as React.ReactElement<{
        className?: string;
        children?: React.ReactNode;
      }>;

      return (
        <Slot
          className={cn(
            buttonVariants({ variant, size }),
            className,
            child.props.className,
          )}
          ref={ref}
          {...props}
        >
          {React.cloneElement(child, {
            className: undefined,
            children: wrapBouncyIcons(child.props.children),
          })}
        </Slot>
      );
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {wrapBouncyIcons(children)}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
