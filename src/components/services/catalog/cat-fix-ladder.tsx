import Image from "next/image";
import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface CatFixLadderProps {
  service: ServicePageConfig;
}

const STEP_IMAGES = [
  "/images/services/amazon-catalog-management/cat-step-audit.jpg",
  "/images/services/amazon-catalog-management/cat-step-prioritize.jpg",
  "/images/services/amazon-catalog-management/cat-step-correct.jpg",
  "/images/services/amazon-catalog-management/cat-step-monitor.jpg",
] as const;

/** Vertical checklist ladder with numbered rail - not horizontal type rail. */
export function CatFixLadder({ service }: CatFixLadderProps) {
  const { solution } = service;

  return (
    <section
      id="service-solution"
      className={cn("bg-[#F4F4F4]", serviceSectionPad)}
      aria-labelledby="service-solution-heading"
    >
      <ServicePageShell>
        <h2
          id="service-solution-heading"
          className="max-w-3xl text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]"
        >
          {solution.heading}
        </h2>

        <ol className="relative mt-10 max-w-3xl">
          <div
            className="absolute bottom-4 left-[1.05rem] top-4 w-0.5 bg-primary"
            aria-hidden="true"
          />
          {solution.steps.map((step, index) => (
            <li key={step.title} className="relative flex gap-4 pb-8 last:pb-0">
              <span
                className="relative z-[1] flex h-9 w-9 shrink-0 items-center justify-center border-2 border-primary bg-accent font-mono text-xs font-black text-primary"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0 flex-1 overflow-hidden border-2 border-primary bg-background">
                <div className="relative aspect-[16/7] w-full border-b-2 border-primary bg-[#EDE8DF] sm:aspect-[21/8]">
                  <Image
                    src={STEP_IMAGES[index % STEP_IMAGES.length]}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 640px"
                  />
                </div>
                <div className="flex items-start gap-2 p-4">
                  <span
                    className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center border-2 border-primary bg-accent"
                    aria-hidden="true"
                  >
                    <span className="h-2 w-2 bg-primary" />
                  </span>
                  <div>
                    <h3 className="text-base font-black text-primary">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm font-medium leading-snug text-text-secondary">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </ServicePageShell>
    </section>
  );
}
