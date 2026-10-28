import Image from "next/image";
import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface InvReplenCycleProps {
  service: ServicePageConfig;
}

const STEP_META = [
  {
    mark: "01",
    signal: "Baseline",
    src: "/images/services/amazon-inventory-management/inv-step-baseline.jpg",
  },
  {
    mark: "02",
    signal: "Priority",
    src: "/images/services/amazon-inventory-management/inv-step-priority.jpg",
  },
  {
    mark: "03",
    signal: "Ops",
    src: "/images/services/amazon-inventory-management/inv-step-ops.jpg",
  },
  {
    mark: "04",
    signal: "Ad sync",
    src: "/images/services/amazon-inventory-management/inv-step-adsync.jpg",
  },
] as const;

/** Horizontal replenishment conveyor rail — not a square cycle ring. */
export function InvReplenCycle({ service }: InvReplenCycleProps) {
  const { solution } = service;
  const steps = solution.steps.slice(0, 4);

  return (
    <section
      id="service-solution"
      className={cn("bg-[#0c0c0b] text-text-on-dark", serviceSectionPad)}
      aria-labelledby="service-solution-heading"
    >
      <ServicePageShell>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-accent">
              Replenishment conveyor
            </p>
            <h2
              id="service-solution-heading"
              className="mt-2 max-w-3xl text-[clamp(1.6rem,3vw,2.15rem)] font-black tracking-tight text-text-on-dark"
            >
              {solution.heading}
            </h2>
          </div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-text-on-dark/45">
            Continuous loop · ads tied in
          </p>
        </div>

        <div className="relative mt-10">
          <div
            className="absolute left-0 right-0 top-[4.25rem] hidden h-0.5 bg-accent/40 lg:block"
            aria-hidden="true"
          />

          <ol className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => {
              const meta = STEP_META[index] ?? STEP_META[0];
              return (
                <li key={step.title} className="relative flex flex-col">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="inline-flex min-w-[2.75rem] justify-center border-2 border-accent bg-[#141412] px-2 py-1 font-mono text-xs font-black tabular-nums text-accent">
                      {meta.mark}
                    </span>
                    <span className="font-mono text-xs font-bold uppercase tracking-[0.08em] text-text-on-dark/45">
                      {meta.signal}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col overflow-hidden border-2 border-accent/45 bg-[#141412]">
                    <div className="relative aspect-[16/10] w-full border-b border-accent/30">
                      <Image
                        src={meta.src}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-4 sm:p-5">
                      <div
                        className="mb-3 flex h-2 w-full overflow-hidden border border-text-on-dark/15 bg-text-on-dark/10"
                        aria-hidden="true"
                      >
                        <div
                          className="h-full bg-accent"
                          style={{ width: `${((index + 1) / 4) * 100}%` }}
                        />
                      </div>
                      <h3 className="text-lg font-black text-text-on-dark">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm font-medium leading-snug text-text-on-dark/70 sm:text-base">
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
