import { SectionShell } from "@/components/sections/section-shell";
import type { ServicePageConfig } from "@/domain/content/schemas";
import { cn } from "@/lib/utils";
import { serviceHardPanel } from "./service-hard-panel";

interface ServiceStatsStripProps {
  stats: ServicePageConfig["stats"];
}

/** Lead ledger: first stat lime-fill; remaining ink cells with lime top rule. */
export function ServiceStatsStrip({ stats }: ServiceStatsStripProps) {
  if (!stats?.length) return null;

  return (
    <SectionShell
      id="service-stats"
      ariaLabelledBy="service-stats-heading"
      className="py-8 sm:py-10"
    >
      <h2 id="service-stats-heading" className="sr-only">
        Service credentials
      </h2>
      <dl
        className={cn(
          serviceHardPanel,
          "grid gap-3 overflow-hidden bg-primary p-3 sm:grid-cols-2 sm:gap-3 sm:p-4 lg:grid-cols-4",
        )}
      >
        {stats.map((stat, index) => {
          const isLead = index === 0;
          return (
            <div
              key={`${stat.label}-${stat.value}`}
              className={cn(
                "rounded-[10px] p-4 sm:p-5",
                isLead
                  ? "bg-accent text-primary"
                  : "border-t-4 border-t-accent bg-[#F4F4F4] text-primary",
              )}
            >
              <dt
                className={cn(
                  "text-[11px] font-bold uppercase tracking-[0.14em]",
                  isLead ? "text-primary/70" : "text-text-secondary",
                )}
              >
                {stat.label}
              </dt>
              <dd className="mt-1 text-stat font-black tracking-tight">
                {stat.value}
              </dd>
            </div>
          );
        })}
      </dl>
    </SectionShell>
  );
}
