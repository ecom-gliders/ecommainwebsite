import Image from "next/image";
import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface EntRungStepsProps {
  service: ServicePageConfig;
}

const RUNG_SRC = [
  "/images/services/amazon-company-registration/ent-rung-jurisdiction-v2.jpg",
  "/images/services/amazon-company-registration/ent-rung-formation-v2.jpg",
  "/images/services/amazon-company-registration/ent-rung-ein-v2.jpg",
  "/images/services/amazon-company-registration/ent-rung-amazon-v2.jpg",
] as const;

/** Ascending rung rail with stills — not a vertical fix ladder. */
export function EntRungSteps({ service }: EntRungStepsProps) {
  const { solution } = service;
  const steps = solution.steps.slice(0, 4);

  return (
    <section
      id="service-solution"
      className={cn("bg-[#12100e] text-text-on-dark", serviceSectionPad)}
      aria-labelledby="service-solution-heading"
    >
      <ServicePageShell>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-accent">
              Climbing rungs
            </p>
            <h2
              id="service-solution-heading"
              className="mt-2 max-w-3xl text-[clamp(1.6rem,3vw,2.15rem)] font-black tracking-tight text-text-on-dark"
            >
              {solution.heading}
            </h2>
          </div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-text-on-dark/45">
            Intent → filing → Amazon
          </p>
        </div>

        <div className="relative mt-10">
          <div
            className="absolute left-0 right-0 top-[4.25rem] hidden h-0.5 bg-accent/40 lg:block"
            aria-hidden="true"
          />
          <ol className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <li key={step.title} className="relative flex flex-col">
                <div className="mb-3 flex items-center gap-2">
                  <span className="inline-flex min-w-[2.75rem] justify-center border-2 border-accent bg-[#1a1814] px-2 py-1 font-mono text-[11px] font-black tabular-nums text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-text-on-dark/45">
                    Rung
                  </span>
                </div>
                <div className="flex flex-1 flex-col overflow-hidden border-2 border-accent/45 bg-[#1a1814]">
                  <div className="relative aspect-[16/10] w-full border-b border-accent/30">
                    <Image
                      src={RUNG_SRC[index] ?? RUNG_SRC[0]}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <div
                      className="mb-3 h-1.5 w-full overflow-hidden bg-text-on-dark/10"
                      aria-hidden="true"
                    >
                      <div
                        className="h-full bg-accent"
                        style={{
                          width: `${((index + 1) / steps.length) * 100}%`,
                        }}
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
            ))}
          </ol>
        </div>
      </ServicePageShell>
    </section>
  );
}
