import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface EmlCadenceStagesProps {
  service: ServicePageConfig;
}

const STAGE_LABELS = ["Welcome", "Nurture", "Winback", "Loyalty"] as const;

/** Cadence loop solution stages on an arc rail — not TikTok stage phones or entity ladder. */
export function EmlCadenceStages({ service }: EmlCadenceStagesProps) {
  const { solution } = service;
  const steps = solution.steps.slice(0, 4);

  return (
    <section
      id="service-solution"
      className={cn("bg-[#1a1a18] text-text-on-dark", serviceSectionPad)}
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
            className="pointer-events-none absolute left-4 right-4 top-8 hidden h-16 overflow-hidden sm:block lg:left-8 lg:right-8"
            aria-hidden="true"
          >
            <svg viewBox="0 0 800 64" className="h-full w-full" preserveAspectRatio="none">
              <path
                d="M 0 48 Q 400 0 800 48"
                fill="none"
                stroke="#C6F135"
                strokeWidth="2"
                strokeOpacity="0.45"
              />
            </svg>
          </div>

          <ol className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <li key={step.title} className="relative flex flex-col">
                <div className="mb-3 flex items-center gap-2">
                  <span className="inline-flex border-2 border-accent bg-accent px-2 py-0.5 font-mono text-[10px] font-black uppercase text-primary">
                    {STAGE_LABELS[index] ?? `Stage ${index + 1}`}
                  </span>
                  <span className="font-mono text-[10px] font-bold text-text-on-dark/45">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex flex-1 flex-col border border-accent/35 bg-[#0c0c0b] p-4">
                  <div
                    className="mb-3 flex h-10 w-10 items-center justify-center rounded-full border-2 border-accent/50 bg-[#1a1a18] font-mono text-[10px] font-black text-accent"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3 className="text-base font-black text-text-on-dark">{step.title}</h3>
                  <p className="mt-1.5 text-sm font-medium leading-snug text-text-on-dark/70">
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
