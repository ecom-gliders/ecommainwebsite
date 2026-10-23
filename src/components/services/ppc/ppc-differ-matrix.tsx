import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface PpcDifferMatrixProps {
  service: ServicePageConfig;
}

/** Differentiation as a 2x2 comparison matrix. */
export function PpcDifferMatrix({ service }: PpcDifferMatrixProps) {
  const differ = service.differ;
  if (!differ) return null;

  return (
    <section
      id="service-differ"
      className={cn("bg-background", serviceSectionPad)}
      aria-labelledby="service-differ-heading"
    >
      <ServicePageShell>
        <h2
          id="service-differ-heading"
          className="max-w-3xl text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]"
        >
          {differ.heading}
        </h2>

        <ul className="mt-8 grid gap-0 overflow-hidden border-2 border-primary sm:grid-cols-2">
          {differ.points.map((point, index) => (
            <li
              key={point.title}
              className={cn(
                "border-primary/20 p-5",
                index > 0 && "border-t-2 sm:border-t-0",
                index % 2 === 1 && "sm:border-l-2",
                index >= 2 && "sm:border-t-2",
                index % 2 === 0 ? "bg-accent/50" : "bg-[#F4F4F4]",
              )}
            >
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-text-secondary">
                Axis {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-base font-black text-primary sm:text-lg">
                {point.title}
              </h3>
              <p className="mt-2 text-sm font-medium leading-relaxed text-text-secondary">
                {point.description}
              </p>
            </li>
          ))}
        </ul>
      </ServicePageShell>
    </section>
  );
}
