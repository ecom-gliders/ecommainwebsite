import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { BrowserProofStage } from "@/components/services/modules/browser-proof-stage";
import { cn } from "@/lib/utils";

interface CatProofProps {
  service: ServicePageConfig;
}

/** Browser proof module from JSON — catalog scale evidence. */
export function CatProof({ service }: CatProofProps) {
  const module = service.modules?.find((m) => m.type === "browserProof");
  if (!module || module.type !== "browserProof") return null;

  return (
    <section
      id={module.id}
      className={cn("bg-background", serviceSectionPad)}
      aria-labelledby={`${module.id}-heading`}
    >
      <ServicePageShell>
        {!module.callout?.metric && module.heading ? (
          <h2
            id={`${module.id}-heading`}
            className="max-w-3xl text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]"
          >
            {module.heading}
          </h2>
        ) : (
          <h2 id={`${module.id}-heading`} className="sr-only">
            {module.heading}
          </h2>
        )}
        <div className={module.callout?.metric ? "" : "mt-8"}>
          <BrowserProofStage
            images={module.images}
            disclaimer={module.subheading}
            callout={module.callout}
            heading={module.heading}
          />
        </div>
      </ServicePageShell>
    </section>
  );
}
