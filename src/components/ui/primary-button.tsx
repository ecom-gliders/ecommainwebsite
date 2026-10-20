"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ArrowRight } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof primaryButtonVariants> {
  asChild?: boolean;
  /** Hide trailing arrow chip (rare — links that are not punch CTAs). */
  hideArrow?: boolean;
}

/**
 * Project One CTA anatomy (lime / ink / nav):
 * - Soft-rect 10px + thin ink border
 * - Solid offset shadow (no blur) — same language as hard panels
 * - Idle: arrow → right; hover: rotates to upright (↗)
 * - Accent: lime shell + ink square chip; Primary: ink + light circle; onDark: light + lime square
 */
const primaryButtonVariants = cva(
  [
    "group/po-btn relative inline-flex items-center justify-center",
    "rounded-[10px] border-2 border-primary",
    "text-[12px] font-bold uppercase tracking-[0.04em]",
    "shadow-[4px_4px_0_0_#131311]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
  ].join(" "),
  {
    variants: {
      variant: {
        /** Dark shell + white circle chip (PO “VIEW PRICING”) */
        primary: "bg-primary text-text-on-dark hover:bg-primary",
        /** Lime shell + ink square chip (PO lime CTA) */
        accent: "bg-accent text-primary hover:bg-accent",
        /** Light shell + lime square chip (on dark surfaces / nav punch) */
        onDark:
          "bg-text-on-dark text-primary hover:bg-accent focus-visible:ring-offset-primary",
      },
      size: {
        sm: "h-10 min-h-10 gap-2 py-2 pl-4 pr-2",
        default: "h-11 min-h-11 gap-2.5 py-2 pl-4 pr-2",
        lg: "h-12 min-h-12 gap-2.5 py-2 pl-6 pr-2",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

function chipClasses(
  variant: "primary" | "accent" | "onDark" | null | undefined,
  size: "sm" | "default" | "lg" | null | undefined,
): string {
  const tone =
    variant === "accent"
      ? "bg-primary text-text-on-dark"
      : variant === "onDark"
        ? "bg-accent text-primary group-data-[po-hover=true]/po-btn:bg-primary group-data-[po-hover=true]/po-btn:text-text-on-dark"
        : "bg-text-on-dark text-primary";

  const shape = variant === "primary" ? "rounded-full" : "rounded-[5px]";

  const box =
    size === "lg"
      ? "h-8 w-8"
      : size === "sm"
        ? "h-6 w-6"
        : "h-7 w-7";

  return cn(
    "inline-flex shrink-0 items-center justify-center",
    box,
    shape,
    variant === "accent" && size === "lg" && "rounded-[4px]",
    tone,
  );
}

function iconSize(size: "sm" | "default" | "lg" | null | undefined): number {
  if (size === "lg") return 16;
  if (size === "sm") return 14;
  return 15;
}

function isDecorativeArrowNode(node: React.ReactNode): boolean {
  if (!React.isValidElement(node)) return false;
  const type = node.type;
  const name =
    typeof type === "string"
      ? type
      : ((type as { displayName?: string; name?: string }).displayName ||
          (type as { name?: string }).name ||
          "");

  if (/^(ArrowRight|ArrowUpRight|ArrowRightIcon)$/i.test(name)) return true;

  const props = node.props as {
    "aria-hidden"?: boolean | string;
    children?: React.ReactNode;
    className?: string;
  };

  if (props["aria-hidden"] === true || props["aria-hidden"] === "true") {
    const kids = React.Children.toArray(props.children);
    if (kids.length === 0) return true;
    if (kids.every(isDecorativeArrowNode)) return true;
  }

  if (
    typeof props.className === "string" &&
    /inline-flex.*items-center.*justify-center/.test(props.className) &&
    React.Children.toArray(props.children).every(isDecorativeArrowNode)
  ) {
    return true;
  }

  return false;
}

function labelFromChildren(children: React.ReactNode): React.ReactNode {
  const kept = React.Children.toArray(children).filter(
    (child) => !isDecorativeArrowNode(child),
  );
  return kept.length === 1 ? kept[0] : kept;
}

function ArrowChip({
  variant,
  size,
}: {
  variant: "primary" | "accent" | "onDark" | null | undefined;
  size: "sm" | "default" | "lg" | null | undefined;
}) {
  return (
    <span className={chipClasses(variant, size)} aria-hidden="true">
      <ArrowRight
        size={iconSize(size)}
        strokeWidth={2.5}
        className="po-btn-arrow shrink-0"
      />
    </span>
  );
}

const PrimaryButton = React.forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  (
    {
      className,
      children,
      asChild = false,
      variant = "primary",
      size = "default",
      hideArrow = false,
      type = "button",
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      ...props
    },
    ref,
  ) => {
    const outerClassName = cn(
      primaryButtonVariants({ variant, size }),
      className,
    );

    const setHover = (el: EventTarget | null, on: boolean) => {
      if (!(el instanceof HTMLElement)) return;
      if (on) el.setAttribute("data-po-hover", "true");
      else el.removeAttribute("data-po-hover");
    };

    const hoverProps = {
      onMouseEnter: (event: React.MouseEvent<HTMLElement>) => {
        setHover(event.currentTarget, true);
        onMouseEnter?.(event as React.MouseEvent<HTMLButtonElement>);
      },
      onMouseLeave: (event: React.MouseEvent<HTMLElement>) => {
        setHover(event.currentTarget, false);
        onMouseLeave?.(event as React.MouseEvent<HTMLButtonElement>);
      },
      onFocus: (event: React.FocusEvent<HTMLElement>) => {
        setHover(event.currentTarget, true);
        onFocus?.(event as React.FocusEvent<HTMLButtonElement>);
      },
      onBlur: (event: React.FocusEvent<HTMLElement>) => {
        setHover(event.currentTarget, false);
        onBlur?.(event as React.FocusEvent<HTMLButtonElement>);
      },
    };

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
          className={cn(outerClassName, child.props.className)}
          ref={ref}
          {...props}
          {...hoverProps}
        >
          {React.cloneElement(child, {
            className: undefined,
            children: (
              <>
                <span className="min-w-0 truncate">
                  {labelFromChildren(child.props.children)}
                </span>
                {hideArrow ? null : (
                  <ArrowChip variant={variant} size={size} />
                )}
              </>
            ),
          })}
        </Slot>
      );
    }

    return (
      <button
        ref={ref}
        type={type}
        className={outerClassName}
        {...props}
        {...hoverProps}
      >
        <span className="min-w-0 truncate">{labelFromChildren(children)}</span>
        {hideArrow ? null : <ArrowChip variant={variant} size={size} />}
      </button>
    );
  },
);
PrimaryButton.displayName = "PrimaryButton";

export { PrimaryButton, primaryButtonVariants };
