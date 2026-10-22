import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  heading: string;
  /** Short body line under the H2 */
  subheading?: string;
  /** Uppercase chrome label above the H2 (UI kicker, not SEO copy) */
  kicker?: string;
  headingId?: string;
  inverted?: boolean;
  className?: string;
}

export function SectionHeading({
  heading,
  subheading,
  kicker,
  headingId,
  inverted = false,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-8 max-w-2xl md:mb-10", className)}>
      {kicker ? (
        <p
          className={cn(
            "mb-2 text-[11px] font-bold uppercase tracking-[0.16em]",
            inverted ? "text-accent" : "text-text-secondary",
          )}
        >
          {kicker}
        </p>
      ) : null}
      <h2
        id={headingId}
        className={cn("text-h2", inverted && "text-text-on-dark")}
      >
        {heading}
      </h2>
      {subheading ? (
        <p
          className={cn(
            "mt-3 text-body font-medium",
            inverted ? "text-text-on-dark/90" : "text-text-secondary",
          )}
        >
          {subheading}
        </p>
      ) : null}
    </div>
  );
}
