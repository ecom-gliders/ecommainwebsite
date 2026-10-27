import Image from "next/image";
import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface LncColdProblemProps {
  service: ServicePageConfig;
}

const COLD_SIGNALS = [
  "Ads start before listing gates clear",
  "Stock and spend on different clocks",
  "No week-one scale or pause rules",
];

const STAGED_SIGNALS = [
  "Readiness checklist before traffic",
  "Inventory cover matched to push window",
  "Named gates for scale, pause, or fix",
];

/** Cold launch versus staged countdown split - not lifecycle loop or spark phones. */
export function LncColdProblem({ service }: LncColdProblemProps) {
  const { problem } = service;

  return (
    <section
      id="service-problem"
      className={cn("bg-primary text-text-on-dark", serviceSectionPad)}
      aria-labelledby="service-problem-heading"
    >
      <ServicePageShell>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.15fr)] lg:items-stretch lg:gap-8">
          <div className="flex flex-col justify-center">
            <h2
              id="service-problem-heading"
              className="max-w-md text-2xl font-black tracking-tight text-text-on-dark sm:text-[1.75rem]"
            >
              {problem.heading}
            </h2>
            <ul className="mt-6 space-y-3">
              {problem.points.map((point, index) => (
                <li key={point.title} className="border-l-2 border-accent pl-3">
                  <p className="font-mono text-[10px] font-bold text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-0.5 text-sm font-black leading-snug text-text-on-dark sm:text-base">
                    {point.title}
                  </h3>
                  <p className="mt-1 text-xs font-medium leading-snug text-text-on-dark/70 sm:text-sm">
                    {point.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="flex flex-col overflow-hidden border-2 border-accent"
            aria-label="Cold launch versus staged launch"
          >
            <div className="grid flex-1 grid-cols-1 sm:grid-cols-2">
              <div className="flex flex-col bg-[#1a1a18] p-5 sm:p-6">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-text-on-dark/50">
                  Cold launch
                </p>
                <div className="relative mt-4 aspect-video w-full overflow-hidden border border-text-on-dark/25 bg-[#0c0c0b]">
                  <Image
                    src="/images/services/amazon-product-launch-services/lnc-cold-v2.jpg"
                    alt=""
                    fill
                    className="object-cover opacity-90"
                    sizes="(max-width: 640px) 100vw, 40vw"
                  />
                  <p className="absolute bottom-2 left-2 border border-text-on-dark/30 bg-primary/80 px-1.5 py-0.5 font-mono text-[9px] font-black text-text-on-dark/80">
                    T-0 · all at once
                  </p>
                </div>
                <ul className="mt-4 space-y-2 text-xs font-medium text-text-on-dark/55">
                  {COLD_SIGNALS.map((line) => (
                    <li key={line} className="line-through decoration-text-on-dark/40">
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col border-t-2 border-accent bg-accent p-5 text-primary sm:border-l-2 sm:border-t-0 sm:p-6">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-primary/65">
                  Staged launch
                </p>
                <div className="relative mt-4 aspect-video w-full overflow-hidden border-2 border-primary bg-[#0c0c0b]">
                  <Image
                    src="/images/services/amazon-product-launch-services/lnc-staged-v2.jpg"
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 40vw"
                  />
                </div>
                <ul className="mt-4 space-y-2 text-xs font-bold text-primary/90">
                  {STAGED_SIGNALS.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </ServicePageShell>
    </section>
  );
}
