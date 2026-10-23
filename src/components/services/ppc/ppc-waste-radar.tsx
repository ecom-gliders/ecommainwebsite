import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface PpcWasteRadarProps {
  service: ServicePageConfig;
}

const SLICES = [
  { pct: 34, color: "var(--color-accent)" },
  { pct: 26, color: "#F4F4F4" },
  { pct: 22, color: "#9CA3AF" },
  { pct: 18, color: "#6B7280" },
];

/** Problem section as spend-waste pie + cards — not text-only. */
export function PpcWasteRadar({ service }: PpcWasteRadarProps) {
  const { problem } = service;
  let angle = 0;
  const stops = SLICES.map((slice) => {
    const start = angle;
    angle += slice.pct;
    return `${slice.color} ${start}% ${angle}%`;
  }).join(", ");

  return (
    <section
      id="service-problem"
      className={cn("bg-background", serviceSectionPad)}
      aria-labelledby="service-problem-heading"
    >
      <ServicePageShell>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] lg:items-start lg:gap-12">
          <div className="flex flex-col items-center lg:items-start">
            <div
              className="relative h-40 w-40 rounded-full border-2 border-primary sm:h-44 sm:w-44"
              style={{ background: `conic-gradient(${stops})` }}
              aria-hidden="true"
            >
              <div className="absolute inset-[28%] flex items-center justify-center rounded-full border-2 border-primary bg-background text-center">
                <span className="px-2 text-xs font-black leading-tight text-primary">
                  Waste
                  <br />
                  mix
                </span>
              </div>
            </div>
            <p className="mt-3 max-w-[14rem] text-center text-xs font-medium leading-snug text-text-secondary lg:text-left">
              Illustrative mix of leak patterns we triage in PPC audits—not a
              client average.
            </p>
          </div>

          <div>
            <h2
              id="service-problem-heading"
              className="text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]"
            >
              {problem.heading}
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {problem.points.map((point, index) => (
                <li
                  key={point.title}
                  className="border-2 border-primary bg-[#F4F4F4] p-4"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="h-3 w-3 shrink-0 border border-primary"
                      style={{
                        background: SLICES[index]?.color ?? "#9CA3AF",
                      }}
                      aria-hidden="true"
                    />
                    <h3 className="text-base font-bold text-primary">
                      {point.title}
                    </h3>
                  </div>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-text-secondary">
                    {point.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </ServicePageShell>
    </section>
  );
}
