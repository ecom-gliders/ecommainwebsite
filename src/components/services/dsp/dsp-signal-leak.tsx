import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface DspSignalLeakProps {
  service: ServicePageConfig;
}

const WIDTHS = ["100%", "82%", "64%", "46%"];

/** Problem as descending signal-leak waterfall — not PPC pie, not FS tickets. */
export function DspSignalLeak({ service }: DspSignalLeakProps) {
  const { problem } = service;

  return (
    <section
      id="service-problem"
      className={cn("bg-primary text-text-on-dark", serviceSectionPad)}
      aria-labelledby="service-problem-heading"
    >
      <ServicePageShell>
        <h2
          id="service-problem-heading"
          className="max-w-3xl text-2xl font-black tracking-tight text-text-on-dark sm:text-[1.75rem]"
        >
          {problem.heading}
        </h2>
        <p className="mt-2 max-w-2xl text-sm font-medium text-text-on-dark/90 sm:text-base">
          Illustrative leak cascade when DSP runs without foundations—not a
          client average.
        </p>

        <ol className="mt-8 flex flex-col items-center gap-3">
          {problem.points.map((point, index) => (
            <li
              key={point.title}
              className="w-full max-w-3xl"
              style={{ width: WIDTHS[index] ?? "50%" }}
            >
              <div className="border-2 border-accent bg-primary px-4 py-4 sm:px-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs font-bold text-accent">
                    Leak {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="h-2 flex-1 max-w-[8rem] bg-accent/30"
                    aria-hidden="true"
                  >
                    <span
                      className="block h-full bg-accent"
                      style={{ width: `${100 - index * 18}%` }}
                    />
                  </span>
                </div>
                <h3 className="mt-2 text-base font-black text-text-on-dark sm:text-lg">
                  {point.title}
                </h3>
                <p className="mt-1.5 text-sm font-medium leading-relaxed text-text-on-dark/90">
                  {point.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </ServicePageShell>
    </section>
  );
}
