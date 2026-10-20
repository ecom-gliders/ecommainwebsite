"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type AtmosphereMode = "white" | "soft" | "framer" | "framer-grid";

export const ATMOSPHERE_MODE_KEY = "ecom-gliders-ds-atmosphere-mode";

const MODE_OPTIONS: { id: AtmosphereMode; label: string }[] = [
  { id: "white", label: "White" },
  { id: "soft", label: "Soft gradient" },
  { id: "framer", label: "Framer mesh" },
  { id: "framer-grid", label: "Framer + grid" },
];

/**
 * Design-system-only page atmosphere.
 * Kept intentionally quiet so palette review stays balanced (not washed in accent).
 */
export function DesignSystemAtmosphere({ mode }: { mode: AtmosphereMode }) {
  if (mode === "white") {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 bg-white"
      />
    );
  }

  const showGrid = mode === "framer-grid";
  const strong = mode === "framer" || mode === "framer-grid";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "var(--color-background)",
          backgroundImage:
            mode === "soft" ? "var(--brand-page-atmosphere)" : undefined,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />

      {strong ? (
        <>
          {/* Quiet mesh: primary structure + light accent punch (60/30/10 feel) */}
          <div
            className="absolute -left-[22%] -top-[28%] h-[65vmin] w-[65vmin] rounded-full blur-[120px]"
            style={{
              background:
                "color-mix(in srgb, var(--color-primary) 14%, transparent)",
            }}
          />
          <div
            className="absolute -right-[20%] top-[-12%] h-[55vmin] w-[55vmin] rounded-full blur-[130px]"
            style={{
              background:
                "color-mix(in srgb, var(--color-accent) 12%, transparent)",
            }}
          />
          <div
            className="absolute bottom-[-24%] left-[25%] h-[50vmin] w-[50vmin] rounded-full blur-[140px]"
            style={{
              background:
                "color-mix(in srgb, var(--color-brand-cyan) 8%, transparent)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 85% 75% at 50% 35%, transparent 25%, color-mix(in srgb, var(--color-background) 72%, transparent) 100%)",
            }}
          />
        </>
      ) : null}

      {showGrid ? (
        <div
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage:
              "radial-gradient(circle, color-mix(in srgb, var(--color-primary) 22%, transparent) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            maskImage:
              "radial-gradient(ellipse 110% 100% at 50% 40%, #000 40%, transparent 88%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 110% 100% at 50% 40%, #000 40%, transparent 88%)",
          }}
        />
      ) : null}
    </div>
  );
}

interface AtmosphereModeToggleProps {
  mode: AtmosphereMode;
  onChange: (mode: AtmosphereMode) => void;
}

export function AtmosphereModeToggle({
  mode,
  onChange,
}: AtmosphereModeToggleProps) {
  return (
    <div className="mt-4 border-t border-border pt-4">
      <p className="text-small font-semibold text-text-primary">
        Page background
      </p>
      <p className="text-small mt-1 text-text-secondary">
        Prefer Soft or Framer + grid for balanced review. White isolates tokens.
      </p>
      <div
        className="mt-3 flex flex-wrap gap-2"
        role="tablist"
        aria-label="Page background mode"
      >
        {MODE_OPTIONS.map((option) => {
          const selected = mode === option.id;
          return (
            <button
              key={option.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => onChange(option.id)}
              className={cn(
                "inline-flex min-h-9 items-center rounded-md border px-3 py-1.5 text-xs font-medium transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                selected
                  ? "border-accent bg-accent/10 text-text-primary"
                  : "border-border bg-surface text-text-secondary hover:border-accent/40 hover:text-text-primary",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** Combines color theme + atmosphere controls for /design-system */
export function useAtmosphereMode() {
  const [mode, setMode] = useState<AtmosphereMode>("soft");

  useEffect(() => {
    const stored = window.localStorage.getItem(ATMOSPHERE_MODE_KEY);
    if (
      stored === "white" ||
      stored === "soft" ||
      stored === "framer" ||
      stored === "framer-grid"
    ) {
      setMode(stored);
    }
  }, []);

  function updateMode(next: AtmosphereMode) {
    setMode(next);
    window.localStorage.setItem(ATMOSPHERE_MODE_KEY, next);
  }

  return { mode, setMode: updateMode };
}
