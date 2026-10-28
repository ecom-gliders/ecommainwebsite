import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface CpyDifferProps {
  service: ServicePageConfig;
}

const SHORTCUTS = [
  "Keyword dumps in the title",
  "Freelance one-offs with no voice lock",
  "A+ that clones the bullets",
  "Claims with no source",
];

/** Quote-block differ — not generic/system split like listing. */
export function CpyDiffer({ service }: CpyDifferProps) {
  const differ = service.differ;
  if (!differ?.points?.length) return null;

  return (
    <section
      id="service-differ"
      className={cn("bg-[#EDE8DF]", serviceSectionPad)}
      aria-labelledby="service-differ-heading"
    >
      <ServicePageShell>
        <h2
          id="service-differ-heading"
          className="max-w-3xl text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]"
        >
          {differ.heading}
        </h2>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <ul className="space-y-2 border-2 border-primary/40 bg-background p-5">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-text-secondary">
              Skip these
            </p>
            {SHORTCUTS.map((line) => (
              <li
                key={line}
                className="text-sm font-medium text-text-secondary line-through decoration-primary/35"
              >
                {line}
              </li>
            ))}
          </ul>

          <ul className="space-y-0 border-2 border-primary bg-primary text-text-on-dark">
            {differ.points.map((point, index) => (
              <li
                key={point.title}
                className={cn(
                  "p-5",
                  index > 0 && "border-t border-accent/30",
                )}
              >
                <p className="font-mono text-3xl font-black leading-none text-accent" aria-hidden="true">
                  &ldquo;
                </p>
                <h3 className="-mt-2 text-base font-black text-text-on-dark">
                  {point.title}
                </h3>
                <p className="mt-1.5 text-sm font-medium leading-snug text-text-on-dark/85">
                  {point.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </ServicePageShell>
    </section>
  );
}
