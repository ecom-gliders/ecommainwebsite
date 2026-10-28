import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface FsTicketRailProps {
  service: ServicePageConfig;
}

const SEVERITY = [88, 72, 64, 55];

/** Failure tickets + severity bars — visual, not text-only. */
export function FsTicketRail({ service }: FsTicketRailProps) {
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
          Illustrative severity of how often we see each break on full-account
          audits — not a promise of outcomes.
        </p>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {problem.points.map((point, index) => {
            const severity = SEVERITY[index] ?? 50;
            return (
              <li
                key={point.title}
                className="flex flex-col border-2 border-accent bg-primary p-4 shadow-[4px_4px_0_0_#C6F135]"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs font-bold text-accent">
                    Ticket {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-xs font-bold tabular-nums text-accent">
                    {severity}%
                  </span>
                </div>
                <div
                  className="mt-3 h-2 w-full border border-accent/50 bg-primary"
                  aria-hidden="true"
                >
                  <div
                    className="h-full bg-accent"
                    style={{ width: `${severity}%` }}
                  />
                </div>
                <h3 className="mt-3 text-base font-bold leading-snug text-text-on-dark">
                  {point.title}
                </h3>
                <p className="mt-2 flex-1 text-sm font-medium leading-relaxed text-text-on-dark/90">
                  {point.description}
                </p>
              </li>
            );
          })}
        </ul>
      </ServicePageShell>
    </section>
  );
}
