import Image from "next/image";
import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface BrdPathwaySpineProps {
  service: ServicePageConfig;
}

const STEP_IMAGES = [
  "/images/services/amazon-trademark-brand-registry/brd-step-elig.jpg",
  "/images/services/amazon-trademark-brand-registry/brd-step-path.jpg",
  "/images/services/amazon-trademark-brand-registry/brd-step-enroll.jpg",
  "/images/services/amazon-trademark-brand-registry/brd-step-activate.jpg",
] as const;

/**
 * Numbered seal circles on a thin vertical rule - not AOS thick sync spine or zigzag.
 */
export function BrdPathwaySpine({ service }: BrdPathwaySpineProps) {
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

        <ol className="relative mx-auto mt-10 max-w-3xl">
          <span
            className="pointer-events-none absolute bottom-8 left-[1.0625rem] top-8 w-px bg-primary/30"
            aria-hidden="true"
          />
          {solution.steps.map((step, index) => (
            <li
              key={step.title}
              className={cn(
                "relative grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-4 gap-y-3 py-4 sm:grid-cols-[2.25rem_7.5rem_minmax(0,1fr)] sm:gap-x-5",
                index > 0 && "border-t border-primary/10",
              )}
            >
              <span
                className="relative z-[1] flex h-9 w-9 items-center justify-center rounded-full border-2 border-primary bg-accent font-mono text-xs font-black text-primary shadow-[2px_2px_0_0_#131311]"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="relative col-start-2 aspect-[16/10] w-full max-w-[7.5rem] overflow-hidden border-2 border-primary bg-[#EDE8DF] sm:col-start-2 sm:row-span-2 sm:aspect-auto sm:h-full sm:min-h-[5.5rem] sm:max-w-none">
                <Image
                  src={STEP_IMAGES[index % STEP_IMAGES.length]}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="120px"
                />
              </div>
              <div className="col-start-2 min-w-0 pt-0.5 sm:col-start-3">
                <h3 className="text-base font-black text-primary sm:text-lg">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-sm font-medium leading-snug text-text-secondary">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </ServicePageShell>
    </section>
  );
}
