import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface AhlDifferProps {
  service: ServicePageConfig;
}

export function AhlDiffer({ service }: AhlDifferProps) {
  const differ = service.differ;
  if (!differ?.points?.length) return null;

  return (
    <section
      id="service-differ"
      className={cn("bg-primary text-text-on-dark", serviceSectionPad)}
      aria-labelledby="service-differ-heading"
    >
      <ServicePageShell>
        <h2
          id="service-differ-heading"
          className="max-w-3xl text-2xl font-black tracking-tight text-text-on-dark sm:text-[1.75rem]"
        >
          {differ.heading}
        </h2>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {differ.points.map((point, index) => (
            <li
              key={point.title}
              className="flex gap-4 border-2 border-accent p-4 sm:p-5"
            >
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-accent bg-[#0d0d0c] font-mono text-xs font-black text-accent"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-base font-black text-text-on-dark">
                  {point.title}
                </h3>
                <p className="mt-1.5 text-sm font-medium leading-snug text-text-on-dark/85">
                  {point.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </ServicePageShell>
    </section>
  );
}
