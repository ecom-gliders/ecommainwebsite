"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import type { FreeAuditPageConfig } from "@/domain/content/schemas";
import { FreeAuditFunnelDialog } from "@/components/free-audit/free-audit-funnel-dialog";

export type FreeAuditFunnelData = {
  form: NonNullable<FreeAuditPageConfig["form"]>;
  funnel: NonNullable<FreeAuditPageConfig["funnel"]>;
};

type FreeAuditFunnelContextValue = {
  open: boolean;
  openFunnel: () => void;
  closeFunnel: () => void;
};

const FreeAuditFunnelContext = createContext<FreeAuditFunnelContextValue | null>(
  null,
);

/** Midpoint of the requested 5–10s dwell window */
const SITE_AUTO_POPUP_DELAY_MS = 7000;

/**
 * Once-per-calendar-day lock (local timezone).
 * Survives tab close / new session — same day = no second timed popup.
 */
const AUTO_POPUP_DAY_KEY = "eg-free-audit-auto-popup-day";

export const FREE_AUDIT_PAGE_HREF = "/free-audit/";
export const FREE_AUDIT_BOOKING_HREF = "/free-audit/#audit-booking";

function localDayKey(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function isFreeAuditPagePath(pathname: string | null): boolean {
  if (!pathname) return false;
  const normalized = pathname.replace(/\/$/, "") || "/";
  return normalized === "/free-audit";
}

function hasShownAutoPopupToday(): boolean {
  try {
    return localStorage.getItem(AUTO_POPUP_DAY_KEY) === localDayKey();
  } catch {
    return false;
  }
}

function markAutoPopupShownToday(): void {
  try {
    localStorage.setItem(AUTO_POPUP_DAY_KEY, localDayKey());
  } catch {
    // Private mode / blocked storage — still open at most once this mount.
  }
}

/** Call from Free Audit CTAs so a pending timer cannot open the popup after click. */
export function suppressAutoPopupForToday(): void {
  markAutoPopupShownToday();
}

interface FreeAuditFunnelProviderProps {
  form: FreeAuditFunnelData["form"];
  funnel: FreeAuditFunnelData["funnel"];
  children?: ReactNode;
}

/**
 * Site-wide Free Audit funnel popup (timed, once per calendar day).
 * Free Audit CTAs must navigate to /free-audit/#audit-booking — they never open this dialog.
 */
export function FreeAuditFunnelProvider({
  form,
  funnel,
  children,
}: FreeAuditFunnelProviderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const shownThisMountRef = useRef(false);

  const openFunnel = useCallback(() => setOpen(true), []);
  const closeFunnel = useCallback(() => setOpen(false), []);

  // Never keep the popup open on the Free Audit page itself.
  useEffect(() => {
    if (isFreeAuditPagePath(pathname)) {
      setOpen(false);
      // Visiting the audit page counts as today's exposure — no timed popup later today.
      markAutoPopupShownToday();
    }
  }, [pathname]);

  // Timed auto-popup once per calendar day. Skips /free-audit/. No click interception.
  useEffect(() => {
    if (isFreeAuditPagePath(pathname)) return;
    if (shownThisMountRef.current) return;
    if (hasShownAutoPopupToday()) return;

    const timer = window.setTimeout(() => {
      if (isFreeAuditPagePath(window.location.pathname)) return;
      if (shownThisMountRef.current) return;
      if (hasShownAutoPopupToday()) return;
      shownThisMountRef.current = true;
      markAutoPopupShownToday();
      setOpen(true);
    }, SITE_AUTO_POPUP_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  const value = useMemo(
    () => ({ open, openFunnel, closeFunnel }),
    [open, openFunnel, closeFunnel],
  );

  return (
    <FreeAuditFunnelContext.Provider value={value}>
      {children}
      <FreeAuditFunnelDialog
        open={open}
        onOpenChange={setOpen}
        form={form}
        funnel={funnel}
      />
    </FreeAuditFunnelContext.Provider>
  );
}

export function useFreeAuditFunnel(): FreeAuditFunnelContextValue {
  const ctx = useContext(FreeAuditFunnelContext);
  if (!ctx) {
    throw new Error(
      "useFreeAuditFunnel must be used within FreeAuditFunnelProvider.",
    );
  }
  return ctx;
}

/** Safe open for rare manual triggers (no-ops if provider missing). */
export function useOptionalFreeAuditFunnel(): FreeAuditFunnelContextValue | null {
  return useContext(FreeAuditFunnelContext);
}
