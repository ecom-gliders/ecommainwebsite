import type { ServicePageConfig } from "@/domain/content/schemas";
import { BrandPathwayBoard } from "@/components/services/modules/brand-pathway-board";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface EntHandoffBoardProps {
  service: ServicePageConfig;
}

/** Amazon handoff pathway from brandPathwayBoard module JSON. */
export function EntHandoffBoard({ service }: EntHandoffBoardProps) {
  const module = service.modules?.find(
    (m) => m.id === "amazon-handoff-board" && m.type === "brandPathwayBoard",
  );
  if (!module || module.type !== "brandPathwayBoard") return null;

  return (
    <section
      id={module.id}
      className={cn("bg-background", serviceSectionPad)}
      aria-labelledby={`${module.id}-heading`}
    >
      <ServicePageShell>
        <h2
          id={`${module.id}-heading`}
          className="max-w-3xl text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]"
        >
          {module.heading}
        </h2>
        {module.subheading ? (
          <p className="mt-2 max-w-2xl text-sm font-medium text-text-secondary">
            {module.subheading}
          </p>
        ) : null}
        <div className="mt-8">
          <BrandPathwayBoard
            urlLabel={module.urlLabel}
            disclaimer={module.disclaimer}
            stages={module.stages}
            variant={module.variant ?? "stamp"}
          />
        </div>
      </ServicePageShell>
    </section>
  );
}
