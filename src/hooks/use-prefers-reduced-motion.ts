"use client";

import { useEffect, useState } from "react";

/**
 * Reads prefers-reduced-motion without motion/react's useReducedMotion,
 * which logs a noisy console warning when the OS preference is enabled.
 * Returns false until mounted so SSR/client first paint stay aligned.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return reduced;
}
