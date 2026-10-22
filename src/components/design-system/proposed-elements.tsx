"use client";

import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Framer / Magic UI–style CTA: continuous light stroke travels the border
 * via animated conic-gradient (@property --beam-angle).
 * Fill uses theme CSS vars so the design-system switcher updates live.
 */
interface BeamBorderButtonProps {
  label: string;
  className?: string;
}

/**
 * Design-system alias for the sitewide PrimaryButton beam style.
 * Prefer PrimaryButton in product UI.
 */
export function BeamBorderButton({ label, className }: BeamBorderButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "btn-border-beam group relative inline-flex h-12 items-center justify-center rounded-full p-[2px]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
    >
      <span
        className={cn(
          "btn-border-beam-fill relative z-[1] inline-flex h-full w-full items-center justify-center gap-2 rounded-full px-8",
          "text-sm font-semibold text-text-on-dark",
          "motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:-translate-y-px",
        )}
      >
        {label}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </span>
    </button>
  );
}

export function ProposedCards() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      <article className="rounded-xl border border-border bg-background p-6 shadow-sm">
        <p className="text-small font-medium text-text-secondary">A · Current</p>
        <h3 className="mt-2 text-h4">Flat bordered card</h3>
        <p className="mt-2 text-body font-medium text-text-secondary">
          Simple border + white fill. Clean, but low hierarchy.
        </p>
      </article>

      <article className="rounded-xl border border-border/80 bg-background/80 p-6 shadow-[0_10px_30px_rgba(11,27,58,0.06)] backdrop-blur-sm ring-1 ring-brand-cyan/20">
        <p className="text-small font-medium text-brand-cyan">B · Glass lift</p>
        <h3 className="mt-2 text-h4">Soft brand ring</h3>
        <p className="mt-2 text-body font-medium text-text-secondary">
          Slight blur + cyan ring. Good for service grids on atmosphere.
        </p>
      </article>

      <article className="relative overflow-hidden rounded-xl border border-border bg-background p-6 shadow-md">
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1"
          style={{
            backgroundImage:
              "var(--brand-gradient, linear-gradient(90deg, #48cae4, #C6FD50, #a8dadc))",
          }}
        />
        <p className="text-small font-medium text-accent">C · Accent rail</p>
        <h3 className="mt-2 text-h4">Brand streak header</h3>
        <p className="mt-2 text-body font-medium text-text-secondary">
          Logo gradient rail. Stronger identity without loud fills.
        </p>
      </article>
    </div>
  );
}

export function GradientSwatches() {
  return (
    <div className="mt-8 space-y-4">
      <p className="text-small font-medium">Active theme gradients</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="overflow-hidden rounded-md border border-border">
          <div
            className="h-24"
            style={{
              backgroundImage: "var(--brand-gradient)",
            }}
          />
          <div className="p-4">
            <p className="text-small font-medium">--brand-gradient</p>
            <p className="text-small mt-1 text-text-secondary">
              Logo streak / shine
            </p>
          </div>
        </div>
        <div className="overflow-hidden rounded-md border border-border">
          <div
            className="h-24"
            style={{
              backgroundImage: "var(--proposed-cta-fill)",
            }}
          />
          <div className="p-4">
            <p className="text-small font-medium">--proposed-cta-fill</p>
            <p className="text-small mt-1 text-text-secondary">
              Soft diagonal fill — primary → accent (135deg)
            </p>
          </div>
        </div>
        <div className="overflow-hidden rounded-md border border-border sm:col-span-2">
          <div
            className="h-28"
            style={{
              backgroundImage: "var(--brand-page-atmosphere)",
            }}
          />
          <div className="p-4">
            <p className="text-small font-medium">--brand-page-atmosphere</p>
            <p className="text-small mt-1 text-text-secondary">
              Page wash (updates with switcher)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
