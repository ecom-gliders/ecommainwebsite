import type { ServicePageConfig } from "@/domain/content/schemas";
import { BrandUnlockGrid } from "@/components/services/modules/brand-unlock-grid";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface EmlCaptureGatesProps {
  service: ServicePageConfig;
}

/** Owned opt-in gates before flows — brandUnlockGrid from JSON on lilac band. */
export function EmlCaptureGates({ service }: EmlCaptureGatesProps) {
  const module = service.modules?.find((m) => m.type === "brandUnlockGrid");
  if (!module || module.type !== "brandUnlockGrid") return null;

  return (
    <section
      id={module.id}
      className={cn("bg-[#F3F0F8]", serviceSectionPad)}
      aria-labelledby="service-capture-gates-heading"
    >
      <ServicePageShell>
        <h2
          id="service-capture-gates-heading"
          className="max-w-3xl text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]"
        >
          {module.heading}
        </h2>
        {module.subheading ? (
          <p className="mt-2 max-w-2xl text-sm font-medium text-text-secondary">
            {module.subheading}
          </p>
        ) : null}
        <div className="mt-8 border-2 border-primary bg-background p-5 sm:p-6">
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
