import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface RptExportDumpProps {
  service: ServicePageConfig;
}

/**
 * Problem: centered export pile + shared-border gap lattice (no double lines).
 */
export function RptExportDump({ service }: RptExportDumpProps) {
  const { problem } = service;

  return (
    <section
      id="service-problem"
      className={cn("bg-background", serviceSectionPad)}
      aria-labelledby="service-problem-heading"
    >
      <ServicePageShell>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] lg:items-center lg:gap-12">
          {/* Pile — centered in column, no caption */}
          <div
            className="relative mx-auto flex w-full max-w-[15rem] items-center justify-center py-6"
            aria-hidden="true"
          >
            <div className="relative mx-auto h-[7.5rem] w-[88%]">
              {[0, 1, 2, 3].map((layer) => (
                <div
                  key={layer}
                  className="absolute inset-x-0 border-2 border-primary bg-[#F4F4F4] px-3 py-2.5 shadow-[2px_2px_0_0_#131311]"
                  style={{
                    top: `${layer * 16}px`,
                    transform: `rotate(${(layer - 1.5) * 1.4}deg)`,
                    zIndex: 4 - layer,
                  }}
                >
                  <div className="h-1.5 w-3/4 bg-primary/20" />
                  <div className="mt-1.5 h-1.5 w-1/2 bg-primary/10" />
                  <p className="mt-2 font-mono text-[9px] font-bold uppercase tracking-[0.08em] text-text-secondary">
                    Export {String(layer + 1).padStart(2, "0")}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2
              id="service-problem-heading"
              className="text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]"
            >
              {problem.heading}
            </h2>
            {/* Shared outer border — hairline cells, no gap double-borders */}
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
