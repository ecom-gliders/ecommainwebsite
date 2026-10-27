import Image from "next/image";
import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface LncPhaseRailProps {
  service: ServicePageConfig;
}

const PHASE_MARKS = [
  {
    mark: "T-14",
    src: "/images/services/amazon-product-launch-services/lnc-phase-prep-v2.jpg",
  },
  {
    mark: "T-3",
    src: "/images/services/amazon-product-launch-services/lnc-phase-soft-v2.jpg",
  },
  {
    mark: "T-0",
    src: "/images/services/amazon-product-launch-services/lnc-phase-push-v2.jpg",
  },
  {
    mark: "T+14",
    src: "/images/services/amazon-product-launch-services/lnc-phase-stabilize-v2.jpg",
  },
] as const;

/** Countdown phase rail for solution steps - reuses T-minus stills for sequence clarity. */
export function LncPhaseRail({ service }: LncPhaseRailProps) {
  const { solution } = service;
  const steps = solution.steps.slice(0, 4);

  return (
    <section
      id="service-solution"
      className={cn("bg-[#0c0c0b] text-text-on-dark", serviceSectionPad)}
      aria-labelledby="service-solution-heading"
    >
      <ServicePageShell>
        <h2
          id="service-solution-heading"
          className="max-w-3xl text-2xl font-black tracking-tight text-text-on-dark sm:text-[1.75rem]"
        >
          {solution.heading}
        </h2>

        <div className="relative mt-10">
          <div
            className="absolute left-0 right-0 top-8 hidden h-px bg-accent/35 sm:block"
            aria-hidden="true"
          />

          <ol className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => {
              const phase = PHASE_MARKS[index] ?? PHASE_MARKS[0];
              return (
                <li key={step.title} className="relative flex flex-col">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="inline-flex min-w-[3.25rem] justify-center border-2 border-accent bg-[#141412] px-2 py-1 font-mono text-[10px] font-black tabular-nums text-accent">
                      {phase.mark}
                    </span>
                    <span className="font-mono text-[10px] font-bold text-text-on-dark/45">
                      Phase {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col overflow-hidden border border-accent/40 bg-[#141412]">
                    <div className="relative aspect-[16/10] w-full border-b border-accent/30">
                      <Image
                        src={phase.src}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <div
                        className="mb-3 h-1.5 w-full overflow-hidden rounded-sm bg-text-on-dark/10"
                        aria-hidden="true"
                      >
                        <div
                          className="h-full bg-accent"
                          style={{ width: `${((index + 1) / 4) * 100}%` }}
                        />
                      </div>
                      <h3 className="text-base font-black text-text-on-dark">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 text-sm font-medium leading-snug text-text-on-dark/70">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </ServicePageShell>
    </section>
  );
}
