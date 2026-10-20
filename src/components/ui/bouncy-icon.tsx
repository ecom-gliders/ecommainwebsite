"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { CtaArrowIcon } from "@/components/ui/cta-arrow-icon";

interface BouncyIconProps {
  children: React.ReactElement<{ className?: string; "aria-hidden"?: boolean | string }>;
  className?: string;
}

function iconName(
  type: string | React.JSXElementConstructor<unknown>,
): string {
  if (typeof type === "string") return type;
  const t = type as { displayName?: string; name?: string };
  return t.displayName || t.name || "";
}

function sizeFromClassName(className?: string): number {
  if (!className) return 18;
  if (/\bh-5\b|\bw-5\b|\bsize-5\b/.test(className)) return 22;
  if (/\bh-3\.5\b|\bw-3\.5\b/.test(className)) return 16;
  if (/\bh-3\b|\bw-3\b|\bsize-3\b/.test(className)) return 14;
  return 18;
}

function isArrowRightIcon(
  child: React.ReactElement<{ className?: string }>,
): boolean {
  return /^(ArrowRight|ArrowRightIcon)$/i.test(iconName(child.type));
}

/**
 * Fallback for non-arrow icons: fixed slot, filled dot → glyph bounce on hover.
 */
export function BouncyIcon({ children, className }: BouncyIconProps) {
  const childClassName = children.props.className;

  return (
    <span
      className={cn("btn-cta-icon", childClassName, className)}
      aria-hidden="true"
    >
      <span className="btn-cta-icon__dot" />
      <span className="btn-cta-icon__glyph">
        {React.cloneElement(children, {
          className: cn(childClassName, "size-full"),
          "aria-hidden": true,
        })}
      </span>
    </span>
  );
}

function isIconElement(
  child: React.ReactNode,
): child is React.ReactElement<{
  className?: string;
  "aria-hidden"?: boolean | string;
}> {
  if (!React.isValidElement(child)) return false;
  const type = child.type;
  if (typeof type === "string") return false;
  const props = child.props as { "aria-hidden"?: boolean | string };
  const name = iconName(type);
  if (props["aria-hidden"] === true || props["aria-hidden"] === "true") {
    return true;
  }
  return /Arrow|Chevron|Icon|Lucide|Plus|Check|External/i.test(name);
}

/**
 * Button trailing icons:
 * - ArrowRight → lucide-animated + bounce reveal
 * - other icons → bounce reveal (no directional slide; motion lives in the icon)
 */
export function wrapBouncyIcons(children: React.ReactNode): React.ReactNode {
  return React.Children.map(children, (child) => {
    if (!isIconElement(child)) return child;
    if (isArrowRightIcon(child)) {
      return (
        <CtaArrowIcon
          className={child.props.className}
          size={sizeFromClassName(child.props.className)}
        />
      );
    }
    return <BouncyIcon>{child}</BouncyIcon>;
  });
}
