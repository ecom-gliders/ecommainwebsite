import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface ShpModuleDeliverablesProps {
  service: ServicePageConfig;
}

const MODULE_SHAPES = [
  "hero-banner",
  "product-grid",
  "pdp-block",
  "collection-row",
  "app-slot",
  "mobile-stack",
  "email-bar",
  "launch-check",
] as const;

function ModuleThumb({ shape }: { shape: (typeof MODULE_SHAPES)[number] }) {
  if (shape === "hero-banner") {
    return (
      <div className="flex h-full flex-col gap-1 p-2" aria-hidden="true">
        <div className="h-2 w-2/3 bg-primary/20" />
        <div className="mt-auto h-4 w-full bg-primary" />
      </div>
    );
  }
  if (shape === "product-grid") {
    return (
      <div className="grid h-full grid-cols-3 gap-0.5 p-2" aria-hidden="true">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="aspect-square bg-primary/15" />
        ))}
      </div>
    );
  }
  if (shape === "pdp-block") {
    return (
      <div className="grid h-full grid-cols-2 gap-1 p-2" aria-hidden="true">
        <div className="bg-[#ECECE6]" />
        <div className="space-y-1">
          <div className="h-2 w-full bg-primary" />
          <div className="h-1 w-2/3 bg-accent" />
        </div>
      </div>
    );
  }
  if (shape === "collection-row") {
    return (
      <div className="flex h-full gap-1 p-2" aria-hidden="true">
        {[1, 2, 3].map((n) => (
          <div key={n} className="flex-1 bg-primary/12" />
        ))}
      </div>
    );
  }
  if (shape === "app-slot") {
    return (
      <div className="flex h-full items-center justify-center p-2" aria-hidden="true">
        <div className="h-8 w-8 border-2 border-dashed border-primary/40" />
      </div>
    );
  }
  if (shape === "mobile-stack") {
    return (
      <div className="mx-auto flex h-full w-1/2 flex-col gap-1 border border-primary/20 p-1" aria-hidden="true">
        <div className="h-2 bg-primary/20" />
        <div className="flex-1 bg-[#ECECE6]" />
      </div>
    );
  }
  if (shape === "email-bar") {
    return (
      <div className="flex h-full items-end p-2" aria-hidden="true">
        <div className="h-5 w-full border border-primary bg-accent/50" />
      </div>
    );
  }
  return (
    <div className="flex h-full flex-col justify-center gap-1 p-2" aria-hidden="true">
      {[1, 2, 3].map((n) => (
        <div key={n} className="flex items-center gap-1">
          <span className="h-2 w-2 border border-primary bg-accent" />
          <span className="h-1 flex-1 bg-primary/15" />
        </div>
      ))}
    </div>
  );
}

/** Theme-style module cards for deliverables — equal grid, bordered thumbs. */
export function ShpModuleDeliverables({ service }: ShpModuleDeliverablesProps) {
  const { deliverables } = service;
  if (!deliverables?.items?.length) return null;

  return (
    <section
      id="service-deliverables"
      className={cn("bg-[#F4F4F0]", serviceSectionPad)}
      aria-labelledby="service-deliverables-heading"
    >
      <ServicePageShell>
        <h2
          id="service-deliverables-heading"
          className="max-w-3xl text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]"
        >
          {deliverables.heading}
        </h2>

        <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {deliverables.items.map((item, index) => {
            const shape = MODULE_SHAPES[index % MODULE_SHAPES.length];
            return (
              <li
                key={item.title}
                className="flex flex-col border-2 border-primary bg-background"
              >
                <div className="h-20 border-b-2 border-primary bg-[#FAFAF7]">
                  <ModuleThumb shape={shape} />
                </div>
                <div className="flex flex-1 flex-col p-3 sm:p-4">
                  <h3 className="text-sm font-black leading-snug text-primary">{item.title}</h3>
                  <p className="mt-1.5 flex-1 text-xs font-medium leading-snug text-text-secondary sm:text-sm">
                    {item.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </ServicePageShell>
    </section>
  );
}
