"use client";

import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import {
  FREE_AUDIT_BOOKING_HREF,
  suppressAutoPopupForToday,
  useOptionalFreeAuditFunnel,
} from "@/components/free-audit/free-audit-funnel-context";
import { cn } from "@/lib/utils";

interface FreeAuditCtaButtonProps
  extends Omit<ComponentPropsWithoutRef<typeof Link>, "href"> {
  children: ReactNode;
}

/**
 * Free Audit CTA — goes to the free-audit page and scrolls to booking/form.
 * Does not open the site-wide timed popup.
 */
export function FreeAuditCtaButton({
  children,
  className,
  onClick,
  ...props
}: FreeAuditCtaButtonProps) {
  const funnel = useOptionalFreeAuditFunnel();

  return (
    <Link
      href={FREE_AUDIT_BOOKING_HREF}
      prefetch={false}
      className={cn(className)}
      {...props}
      onClick={(event) => {
        suppressAutoPopupForToday();
        funnel?.closeFunnel();
        onClick?.(event);
      }}
    >
      {children}
    </Link>
  );
}
