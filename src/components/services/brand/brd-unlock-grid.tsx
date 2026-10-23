import type { ServicePageConfig } from "@/domain/content/schemas";
import { BrandUnlockGrid } from "@/components/services/modules/brand-unlock-grid";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface BrdUnlockGridSectionProps {
  service: ServicePageConfig;
}

/** brandUnlockGrid module from JSON — open vs locked tool access. */
export function BrdUnlockGridSection({ service }: BrdUnlockGridSectionProps) {
  const module = service.modules?.find((m) => m.type === "brandUnlockGrid");
  if (!module || module.type !== "brandUnlockGrid") return null;

  return (
    <section
      id={module.id}
      className={cn("bg-primary text-text-on-dark", serviceSectionPad)}
      aria-labelledby="service-unlock-grid-heading"
    >
      <ServicePageShell>
        <h2
          id="service-unlock-grid-heading"
          className="max-w-3xl text-2xl font-black tracking-tight text-text-on-dark sm:text-[1.75rem]"
        >
          {module.heading}
        </h2>
        {module.subheading ? (
          <p className="mt-2 max-w-2xl text-sm font-medium text-text-on-dark/75">
            {module.subheading}
          </p>
        ) : null}
        <div className="mt-8 rounded-sm border-2 border-accent/50 bg-[#FAF6EF] p-5 text-primary sm:p-6">
          <BrandUnlockGrid
            items={module.items}
            note={module.note}
            sheetLabel={module.sheetLabel}
          />
        </div>
      </ServicePageShell>
    </section>
  );
}
