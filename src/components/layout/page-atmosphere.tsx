"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * Quiet off-white canvas + optional navy/orange orbs (2-color lock).
 * Skipped on /design-system (local Framer mesh preview owns the background).
 */
export function PageAtmosphere() {
  const pathname = usePathname();
  const [hydrated, setHydrated] = useState(false);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (pathname?.startsWith("/design-system")) {
    return null;
  }

  const showAnimatedOrbs = hydrated && !reduceMotion;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-background"
        style={{
          backgroundImage: "var(--brand-page-atmosphere)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage:
            "radial-gradient(circle, color-mix(in srgb, #131311 12%, transparent) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage:
            "radial-gradient(ellipse 70% 55% at 50% 20%, #000 15%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 55% at 50% 20%, #000 15%, transparent 70%)",
        }}
      />

      <div className="absolute -right-[4%] -top-[2%] h-[18vmin] w-[18vmin] rounded-full bg-accent/[0.05] blur-[60px]" />
      <div className="absolute bottom-[-4%] left-[35%] h-[16vmin] w-[16vmin] rounded-full bg-primary/[0.03] blur-[70px]" />

      {showAnimatedOrbs ? (
        <>
          <motion.div
            className="absolute -right-[4%] -top-[2%] h-[18vmin] w-[18vmin] rounded-full bg-accent/[0.03] blur-[60px]"
            animate={{
              x: [0, -12, 6, 0],
              y: [0, 10, 3, 0],
              scale: [1, 0.98, 1.02, 1],
            }}
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.2,
            }}
          />
          <motion.div
            className="absolute bottom-[-4%] left-[35%] h-[16vmin] w-[16vmin] rounded-full bg-primary/[0.025] blur-[70px]"
            animate={{
              x: [0, 10, -8, 0],
              y: [0, -8, -3, 0],
              scale: [1, 1.02, 0.98, 1],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.6,
            }}
          />
        </>
      ) : null}
    </div>
  );
}
