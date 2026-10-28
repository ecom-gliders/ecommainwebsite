import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface InvDifferProps {
  service: ServicePageConfig;
}

const SIGNAL = [88, 74, 81, 69] as const;

/** Differ as stacked cover-signal rows — not a generic 2x2 card grid. */
export function InvDiffer({ service }: InvDifferProps) {
  const differ = service.differ;
  if (!differ?.points?.length) return null;

  return (
    <section
      id="service-differ"
      className={cn("bg-primary text-text-on-dark", serviceSectionPad)}
      aria-labelledby="service-differ-heading"
    >
      <ServicePageShell>
        <p className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-accent">
          Signal difference
        </p>
        <h2
          id="service-differ-heading"
          className="mt-2 max-w-3xl text-[clamp(1.6rem,3vw,2.15rem)] font-black tracking-tight text-text-on-dark"
        >
          {differ.heading}
        </h2>

        <ul className="mt-8 space-y-0 overflow-hidden border-2 border-accent">
          {differ.points.map((point, index) => (
            <li
              key={point.title}
              className={cn(
                "grid gap-4 bg-[#141412] p-5 sm:grid-cols-[4.5rem_minmax(0,1fr)_minmax(0,8rem)] sm:items-center sm:gap-6 sm:p-6",
                index > 0 && "border-t-2 border-accent",
              )}
            >
              <span
                className="flex h-12 w-12 items-center justify-center border-2 border-accent font-mono text-sm font-black text-accent"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <h3 className="text-lg font-black text-text-on-dark sm:text-xl">
                  {point.title}
                </h3>
                <p className="mt-1.5 text-sm font-medium leading-snug text-text-on-dark/70 sm:text-base">
                  {point.description}
                </p>
              </div>
              <div className="sm:text-right" aria-hidden="true">
                <p className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-text-on-dark/40">
                  Cover weight
                </p>
                <p className="mt-1 font-mono text-2xl font-black tabular-nums text-accent">
                  {SIGNAL[index % SIGNAL.length]}
                </p>
                <div className="mt-2 h-1.5 overflow-hidden bg-text-on-dark/15">
                  <div
                    className="h-full bg-accent"
                    style={{ width: `${SIGNAL[index % SIGNAL.length]}%` }}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </ServicePageShell>
    </section>
  );
}
