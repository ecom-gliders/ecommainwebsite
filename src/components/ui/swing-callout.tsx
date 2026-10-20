import { cn } from "@/lib/utils";

type SwingArrow = "down-left" | "down-right";
type SwingTone = "ink" | "onDark" | "lime";

interface SwingCalloutProps {
  text: string;
  /** Placement via Tailwind absolute/relative classes from the parent. */
  className?: string;
  arrow?: SwingArrow;
  tone?: SwingTone;
  /** Extra rotate applied on top of the gentle swing animation. */
  tilt?: string;
}

const toneClass: Record<SwingTone, string> = {
  ink: "text-primary",
  onDark: "text-accent",
  lime: "text-accent",
};

/**
 * Exact Project One scribble arrow path (captured from projectone.website).
 * Tip shares a curved hook head — not a separate triangle/V.
 */
const PO_ARROW_PATH =
  "M58.8758 10.1991C52.9007 21.8603 32.7603 47.5897 0 57.2177M14.0438 60.3139C10.778 58.1499 3.32051 57.3481 0 57.2177C0.73001 56.8367 2.47858 54.7658 3.63278 49.5306";

function ArrowSvg({ direction }: { direction: SwingArrow }) {
  const mirrored = direction === "down-right";

  return (
    <svg
      className={cn(
        "mt-1 h-[4.4rem] w-[3.85rem] text-current sm:h-[5rem] sm:w-[4.35rem]",
        mirrored && "ml-1",
      )}
      viewBox="-1 -1 61 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g transform={mirrored ? "translate(59,0) scale(-1,1)" : undefined}>
        <path
          d={PO_ARROW_PATH}
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

/**
 * Handwritten PO-style callout — decorative only (aria-hidden).
 * Arrow geometry matches Project One scribble SVG.
 */
export function SwingCallout({
  text,
  className,
  arrow = "down-left",
  tone = "ink",
  tilt = "-rotate-6",
}: SwingCalloutProps) {
  if (!text) return null;

  return (
    <aside
      className={cn(
        "pointer-events-none z-[2] hidden w-[11.5rem] select-none xl:block",
        "origin-top animate-swing-callout",
        tilt,
        toneClass[tone],
        className,
      )}
      aria-hidden="true"
    >
      <p
        className="text-[1.35rem] font-semibold leading-[1.15] tracking-[-0.01em]"
        style={{ fontFamily: "var(--font-hand)" }}
      >
        {text}
      </p>
      <ArrowSvg direction={arrow} />
    </aside>
  );
}
