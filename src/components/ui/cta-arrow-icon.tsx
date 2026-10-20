"use client";

import * as React from "react";
import {
  ArrowRightIcon,
  type ArrowRightIconHandle,
} from "lucide-animated";
import { cn } from "@/lib/utils";

interface CtaArrowIconProps {
  className?: string;
  /** Pixel size of the animated glyph. Slot stays fixed to avoid layout shift. */
  size?: number;
}

/**
 * CTA trailing mark:
 * idle = filled dot
 * hover = bounce to lucide-animated ArrowRight (icon handles its own motion)
 */
export function CtaArrowIcon({ className, size = 18 }: CtaArrowIconProps) {
  const rootRef = React.useRef<HTMLSpanElement>(null);
  const iconRef = React.useRef<ArrowRightIconHandle>(null);

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const host = root.closest("button, a, [data-cta-icon-host]") ?? root;

    const start = () => iconRef.current?.startAnimation();
    const stop = () => iconRef.current?.stopAnimation();

    host.addEventListener("mouseenter", start);
    host.addEventListener("mouseleave", stop);
    host.addEventListener("focusin", start);
    host.addEventListener("focusout", stop);

    return () => {
      host.removeEventListener("mouseenter", start);
      host.removeEventListener("mouseleave", stop);
      host.removeEventListener("focusin", start);
      host.removeEventListener("focusout", stop);
    };
  }, []);

  return (
    <span
      ref={rootRef}
      className={cn("btn-cta-icon", className)}
      aria-hidden="true"
    >
      <span className="btn-cta-icon__dot" />
      <ArrowRightIcon
        ref={iconRef}
        size={size}
        animateOnHover={false}
        className="btn-cta-icon__glyph"
      />
    </span>
  );
}
