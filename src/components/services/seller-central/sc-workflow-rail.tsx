import Image from "next/image";
import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface ScWorkflowRailProps {
  service: ServicePageConfig;
}

const STEP_IMAGES = [
  "/images/services/amazon-seller-central-services/sc-step-audit.jpg",
  "/images/services/amazon-seller-central-services/sc-step-setup.jpg",
  "/images/services/amazon-seller-central-services/sc-step-execute.jpg",
  "/images/services/amazon-seller-central-services/sc-step-report.jpg",
] as const;

/** Solution as console workflow tabs - light strip, not dark pipeline. */
export function ScWorkflowRail({ service }: ScWorkflowRailProps) {
  const { solution } = service;

  return (
    <section
      id="service-solution"
      className={cn("bg-background", serviceSectionPad)}
      aria-labelledby="service-solution-heading"
    >
      <ServicePageShell>
        <h2
          id="service-solution-heading"
          className="max-w-3xl text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]"
        >
          {solution.heading}
        </h2>
        <div className="mt-8 overflow-hidden border-2 border-primary bg-[#F0F0EC] shadow-[4px_4px_0_0_#131311]">
          <div className="flex border-b-2 border-primary bg-primary px-3 py-2" aria-hidden="true">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-accent">
              Workflow rail
            </span>
          </div>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4">
            {solution.steps.map((step, index) => (
              <li
                key={step.title}
                className={cn(
                  "relative flex flex-col",
                  index > 0 && "border-t-2 border-primary sm:border-t-0",
                  index % 2 === 1 && "sm:border-l-2 sm:border-primary",
                  index >= 2 && "sm:border-t-2 lg:border-t-0",
                  index > 0 && "lg:border-l-2 lg:border-primary",
                )}
              >
                <div className="relative aspect-[16/10] w-full border-b-2 border-primary/20 bg-[#E4E4E0]">
                  <Image
                    src={STEP_IMAGES[index % STEP_IMAGES.length]}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-text-secondary">
                    Step {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 text-base font-black text-primary sm:text-lg">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm font-medium leading-snug text-text-secondary">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </ServicePageShell>
    </section>
  );
}
