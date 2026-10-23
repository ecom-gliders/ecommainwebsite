import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface AosVendorTugProps {
  service: ServicePageConfig;
}

/**
 * Problem: opposing vendor forces — unique vs export pile / waste pie.
 */
export function AosVendorTug({ service }: AosVendorTugProps) {
  const { problem } = service;

  return (
    <section
      id="service-problem"
      className={cn("bg-background", serviceSectionPad)}
      aria-labelledby="service-problem-heading"
    >
      <ServicePageShell>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:items-center lg:gap-12">
          <div
            className="mx-auto flex w-full max-w-[14rem] flex-col items-center gap-3"
            aria-hidden="true"
          >
            <div className="w-full border-2 border-primary bg-[#F4F4F4] px-3 py-2 text-center">
              <p className="font-mono text-[10px] font-bold uppercase text-text-secondary">
                Vendor A
              </p>
              <p className="text-sm font-black text-primary">ACoS only</p>
            </div>
            <div className="flex w-full items-center gap-1">
              <span className="h-1 flex-1 bg-primary" />
              <span className="font-mono text-[10px] font-bold text-text-secondary">
                vs
              </span>
              <span className="h-1 flex-1 bg-primary" />
            </div>
            <div className="w-full border-2 border-primary bg-accent px-3 py-2 text-center">
              <p className="font-mono text-[10px] font-bold uppercase text-primary/70">
                Vendor B
              </p>
              <p className="text-sm font-black text-primary">Content only</p>
            </div>
            <div className="mt-1 w-full border-2 border-dashed border-primary/40 px-3 py-2 text-center">
              <p className="text-xs font-bold text-text-secondary">
                No shared ASIN board
              </p>
            </div>
          </div>

          <div>
            <h2
              id="service-problem-heading"
              className="text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]"
            >
              {problem.heading}
            </h2>
            <ul className="mt-6 grid grid-cols-1 overflow-hidden border-2 border-primary sm:grid-cols-2">
              {problem.points.map((point, index) => (
                <li
                  key={point.title}
                  className={cn(
                    "bg-[#F4F4F4] p-4 sm:p-5",
                    index % 2 === 1 && "sm:border-l-2 sm:border-primary",
                    index >= 2 && "border-t-2 border-primary",
                    index === 1 && "border-t-2 border-primary sm:border-t-0",
                  )}
                >
                  <p className="font-mono text-[10px] font-bold text-text-secondary">
                    Gap {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 text-base font-bold text-primary">
                    {point.title}
                  </h3>
                  <p className="mt-1.5 text-sm font-medium leading-snug text-text-secondary">
                    {point.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </ServicePageShell>
    </section>
  );
}
