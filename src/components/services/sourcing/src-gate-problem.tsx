import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface SrcGateProblemProps {
  service: ServicePageConfig;
}

const SCATTER = [
  { x: 12, y: 18 },
  { x: 38, y: 8 },
  { x: 62, y: 22 },
  { x: 22, y: 42 },
  { x: 48, y: 38 },
  { x: 78, y: 48 },
  { x: 8, y: 58 },
  { x: 55, y: 62 },
  { x: 85, y: 28 },
];

/** Open-market supplier scatter vs one gated lane — not price-only copy stack. */
export function SrcGateProblem({ service }: SrcGateProblemProps) {
  const { problem } = service;

  return (
    <section
      id="service-problem"
      className={cn("bg-[#EEF3F2]", serviceSectionPad)}
      aria-labelledby="service-problem-heading"
    >
      <ServicePageShell>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-stretch lg:gap-8">
          <div className="flex flex-col justify-center">
            <h2
              id="service-problem-heading"
              className="max-w-md text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]"
            >
              {problem.heading}
            </h2>
            <ul className="mt-6 space-y-3">
              {problem.points.map((point, index) => (
                <li
                  key={point.title}
                  className="border-l-4 border-primary bg-background/80 py-2 pl-3"
                >
                  <p className="font-mono text-[10px] font-bold text-text-secondary">
                    Risk {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-0.5 text-sm font-black leading-snug text-primary sm:text-base">
                    {point.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium leading-snug text-text-secondary">
                    {point.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid min-h-[18rem] grid-cols-2 gap-0 border-2 border-primary bg-background">
            <div
              className="relative flex flex-col border-r-2 border-primary bg-[#F4F4F4] p-4 sm:p-5"
              aria-label="Unstructured supplier outreach"
            >
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-text-secondary">
                Open market
              </p>
              <p className="mt-1 text-xs font-medium text-text-secondary">
                Random quotes, no shared brief
              </p>
              <svg
                viewBox="0 0 100 72"
                className="mt-4 h-auto w-full flex-1"
                aria-hidden="true"
              >
                {SCATTER.map((dot, i) => (
                  <g key={i}>
                    <circle
                      cx={dot.x}
                      cy={dot.y}
                      r="4"
                      className="fill-primary/25 stroke-primary"
                      strokeWidth="1.5"
                    />
                    {i % 3 === 0 ? (
                      <line
                        x1={dot.x}
                        y1={dot.y}
                        x2={SCATTER[(i + 2) % SCATTER.length].x}
                        y2={SCATTER[(i + 2) % SCATTER.length].y}
                        className="stroke-primary/20"
                        strokeWidth="1"
                        strokeDasharray="3 3"
                      />
                    ) : null}
                  </g>
                ))}
              </svg>
              <p className="mt-2 font-mono text-[9px] font-bold uppercase text-primary/60">
                No gate before deposit
              </p>
            </div>

            <div
              className="relative flex flex-col bg-[#C5D6D3] p-4 sm:p-5"
              aria-label="Gated sourcing lane"
            >
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-primary">
                Gated lane
              </p>
              <p className="mt-1 text-xs font-medium text-primary/80">
                Same brief, scored checkpoints
              </p>
              <div className="relative mt-4 flex flex-1 flex-col justify-center gap-3">
                <span
                  className="pointer-events-none absolute left-4 top-2 bottom-2 w-1 bg-primary"
                  aria-hidden="true"
                />
                {["Research", "Sample", "QC", "Ship"].map((step, index) => (
                  <div
                    key={step}
                    className="relative flex items-center gap-3 pl-1"
                  >
                    <span
                      className={cn(
                        "relative z-[1] flex h-8 w-8 shrink-0 items-center justify-center border-2 border-primary font-mono text-[10px] font-black",
                        index === 0 ? "bg-accent text-primary" : "bg-background text-primary",
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-black text-primary">{step}</span>
                  </div>
                ))}
              </div>
              <p className="mt-2 font-mono text-[9px] font-bold uppercase text-primary">
                Advance only on evidence
              </p>
            </div>
          </div>
        </div>
      </ServicePageShell>
    </section>
  );
}
