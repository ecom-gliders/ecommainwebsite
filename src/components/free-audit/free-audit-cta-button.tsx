"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useOptionalFreeAuditFunnel } from "@/components/free-audit/free-audit-funnel-context";
import { cn } from "@/lib/utils";

interface FreeAuditCtaButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

/**
 * Explicit CTA that opens the Free Audit funnel popup (when provider is mounted).
 */
export function FreeAuditCtaButton({
  children,
  className,
  onClick,
  type = "button",
  ...props
}: FreeAuditCtaButtonProps) {
  const funnel = useOptionalFreeAuditFunnel();

  return (
    <button
      type={type}
      className={cn(className)}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          funnel?.openFunnel();
        }
      }}
      {...props}
    >
      {children}
    </button>
  );
}
