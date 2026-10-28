"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
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

function isFreeAuditPagePath(pathname: string | null): boolean {
  if (!pathname) return false;
  const normalized = pathname.replace(/\/$/, "") || "/";
  return normalized === "/free-audit";
}

function isFreeAuditPathHref(href: string | null): boolean {
  if (!href) return false;
  try {
    if (href.startsWith("http://") || href.startsWith("https://")) {
      const url = new URL(href);
      return url.pathname === "/free-audit" || url.pathname === "/free-audit/";
    }
  } catch {
    return false;
  }
  return (
    href === "/free-audit" ||
    href === "/free-audit/" ||
    href.startsWith("/free-audit?") ||
    href.startsWith("/free-audit/?") ||
    href.startsWith("/free-audit#") ||
    href.startsWith("/free-audit/#")
  );
}

interface FreeAuditFunnelProviderProps {
  form: FreeAuditFunnelData["form"];
  funnel: FreeAuditFunnelData["funnel"];
  children?: ReactNode;
}

/**
 * Site-wide Free Audit funnel popup. Intercepts /free-audit/ CTA links so the
 * multi-step intake opens in-dialog; /free-audit/ still works as a direct URL
 * for the Calendly booking page.
 */
export function FreeAuditFunnelProvider({
  form,
  funnel,
  children,
}: FreeAuditFunnelProviderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const openFunnel = useCallback(() => setOpen(true), []);
  const closeFunnel = useCallback(() => setOpen(false), []);

  // Site-wide: after ~7s on every page visit (no session lock). Skips /free-audit/.
  useEffect(() => {
    if (isFreeAuditPagePath(pathname)) return;

    const timer = window.setTimeout(() => {
      if (isFreeAuditPagePath(window.location.pathname)) return;
      setOpen(true);
    }, SITE_AUTO_POPUP_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    function onDocumentClick(event: MouseEvent) {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.dataset.freeAuditPage === "true") return;
      if (anchor.target === "_blank") return;

      const href = anchor.getAttribute("href");
      if (!isFreeAuditPathHref(href)) return;

      event.preventDefault();
      setOpen(true);
    }

    document.addEventListener("click", onDocumentClick, true);
    return () => document.removeEventListener("click", onDocumentClick, true);
  }, []);

  useEffect(() => {
    function syncFromLocation() {
      if (typeof window === "undefined") return;
      const params = new URLSearchParams(window.location.search);
      if (
        params.get("audit") === "1" ||
        params.get("open") === "free-audit" ||
        window.location.hash === "#free-audit-funnel"
      ) {
        setOpen(true);
      }
    }
    syncFromLocation();
    window.addEventListener("hashchange", syncFromLocation);
    return () => window.removeEventListener("hashchange", syncFromLocation);
  }, []);

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

/** Safe open for CTAs that may render outside the provider (no-ops if missing). */
export function useOptionalFreeAuditFunnel(): FreeAuditFunnelContextValue | null {
  return useContext(FreeAuditFunnelContext);
}
