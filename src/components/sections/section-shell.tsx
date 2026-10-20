import { cn } from "@/lib/utils";

interface SectionShellProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "muted" | "primary";
  /** tight = less vertical padding between stacked service sections */
  density?: "default" | "tight";
  ariaLabelledBy?: string;
}

export function SectionShell({
  id,
  children,
  className,
  tone = "default",
  density = "default",
  ariaLabelledBy,
}: SectionShellProps) {
  const toneClass =
    tone === "muted"
      ? /* Soft band only — keeps cyan/orange wash + dotted grid readable */
        "bg-surface/35"
      : tone === "primary"
        ? "bg-primary text-text-on-dark"
        : "";

  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24",
        density === "tight" ? "py-8 sm:py-10" : "py-12 sm:py-16",
        toneClass,
        className,
      )}
      {...(ariaLabelledBy ? { "aria-labelledby": ariaLabelledBy } : {})}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}
