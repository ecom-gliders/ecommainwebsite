import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { BrowserProofStage } from "@/components/services/modules/browser-proof-stage";
import { cn } from "@/lib/utils";

interface LncSellerProofProps {
  service: ServicePageConfig;
}

/** Launch-period Seller tool proof — browserProof module in pad frame. */
export function LncSellerProof({ service }: LncSellerProofProps) {
  const module = service.modules?.find((m) => m.type === "browserProof");
  if (!module || module.type !== "browserProof") return null;

  return (
    <section
      id={module.id}
      className={cn("bg-[#EDE8DF]", serviceSectionPad)}
      aria-labelledby={`${module.id}-heading`}
    >
      <ServicePageShell>
        <div className="overflow-hidden border-2 border-primary bg-[#0c0c0b]">
          <div className="flex items-center justify-between border-b border-accent/35 px-4 py-2">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-accent">
              Live Seller window
            </p>
            <p className="font-mono text-xs font-bold text-text-on-dark/45">
              Not a launch guarantee
            </p>
          </div>
          <div className="bg-background p-4 sm:p-6">
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
            <div className={module.callout?.metric ? "" : "mt-6"}>
              <BrowserProofStage
                images={module.images}
                disclaimer={module.subheading}
                callout={module.callout}
                heading={module.heading}
              />
            </div>
          </div>
        </div>
      </ServicePageShell>
    </section>
  );
}
