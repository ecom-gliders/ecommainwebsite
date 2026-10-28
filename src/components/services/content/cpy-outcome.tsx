import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface CpyOutcomeProps {
  service: ServicePageConfig;
}

/** Before/after paired type blocks — not vertical CVR columns or horizontal bars. */
export function CpyOutcome({ service }: CpyOutcomeProps) {
  const chart = service.modules?.find((module) => module.type === "metricChart");
  if (!chart || chart.type !== "metricChart") return null;

  const pairs: { before: (typeof chart.points)[0]; after: (typeof chart.points)[0] }[] =
    [];
  for (let i = 0; i + 1 < chart.points.length; i += 2) {
    pairs.push({ before: chart.points[i], after: chart.points[i + 1] });
  }

  return (
    <section
      id="service-outcome"
      className={cn("bg-background", serviceSectionPad)}
      aria-labelledby="service-outcome-heading"
    >
      <ServicePageShell>
        <h2
          id="service-outcome-heading"
          className="max-w-3xl text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]"
        >
          {chart.heading}
        </h2>
        {chart.subheading ? (
          <p className="mt-2 max-w-2xl text-sm font-medium text-text-secondary">
            {chart.subheading}
          </p>
        ) : null}

        <ul className="mt-8 grid gap-4 lg:grid-cols-2">
          {pairs.map((pair) => (
            <li
              key={pair.after.label}
              className="border-2 border-primary bg-[#F7F3EA] p-4 sm:p-5"
            >
              <p className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-text-secondary">
                {chart.chartLabel}
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="border-2 border-primary/30 bg-background p-3">
                  <p className="font-mono text-xs font-bold uppercase text-text-secondary">
                    Before
                  </p>
                  <p className="mt-2 text-2xl font-black tabular-nums text-text-secondary">
                    {pair.before.value}%
                  </p>
                  <p className="mt-1 text-xs font-medium leading-snug text-text-secondary">
                    {pair.before.label.replace(/\s*\(.*?\)\s*/g, "").replace(/CVR before/i, "").trim() ||
                      pair.before.label}
                  </p>
                </div>
                <div className="border-2 border-primary bg-accent p-3">
                  <p className="font-mono text-xs font-bold uppercase text-primary/70">
                    After
                  </p>
                  <p className="mt-2 text-2xl font-black tabular-nums text-primary">
                    {pair.after.value}%
                  </p>
                  <p className="mt-1 text-xs font-medium leading-snug text-primary">
                    {pair.after.label.replace(/\s*\(.*?\)\s*/g, "").replace(/CVR after/i, "").trim() ||
                      pair.after.label}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {chart.footnote ? (
          <p className="mt-4 text-xs font-medium leading-snug text-text-secondary">
            {chart.footnote}
          </p>
        ) : null}
      </ServicePageShell>
    </section>
  );
}
