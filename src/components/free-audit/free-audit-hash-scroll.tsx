"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Ensures hash targets (e.g. #audit-booking) scroll into view after App Router navigations.
 */
export function FreeAuditHashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash.replace(/^#/, "");
      if (!hash) return;
      const el = document.getElementById(hash);
      if (!el) return;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    scrollToHash();
    const timer = window.setTimeout(scrollToHash, 150);
    window.addEventListener("hashchange", scrollToHash);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, [pathname]);

  return null;
}
