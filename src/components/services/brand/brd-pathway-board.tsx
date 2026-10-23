import type { ServicePageConfig } from "@/domain/content/schemas";
import { BrandPathwayBoard } from "@/components/services/modules/brand-pathway-board";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface BrdPathwayBoardSectionProps {
  service: ServicePageConfig;
}

/** Full pathway board from JSON module — stamp variant for legal sequence. */
export function BrdPathwayBoardSection({ service }: BrdPathwayBoardSectionProps) {
  const module = service.modules?.find((m) => m.type === "brandPathwayBoard");
  if (!module || module.type !== "brandPathwayBoard") return null;

  return (
    <section
      id={module.id}
      className={cn("bg-background", serviceSectionPad)}
      aria-labelledby="service-pathway-board-heading"
    >
      <ServicePageShell>
        <h2
          id="service-pathway-board-heading"
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
