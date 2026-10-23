import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface LstScorecardProps {
  service: ServicePageConfig;
}

/** Field strength meters from catalogHealthBoard — not a sheet table. */
function parseScore(cells: string[]): number {
  const raw = cells[1] ?? cells[cells.length - 1] ?? "0";
  const match = raw.match(/(\d+)/);
  if (match) {
    const n = Number(match[1]);
    return n > 100 ? Math.min(100, Math.round(n / 10)) : Math.min(100, n);
  }
  return 55 + (cells[0]?.length ?? 0) % 35;
}

export function LstScorecard({ service }: LstScorecardProps) {
  const board = service.modules?.find(
    (module) => module.type === "catalogHealthBoard",
  );
  if (!board || board.type !== "catalogHealthBoard") return null;

  const meters = board.rows.slice(0, 6).map((row) => ({
    label: row.cells[0] ?? "Field",
    detail: row.cells.slice(1).join(" · "),
    score: parseScore(row.cells),
  }));

  return (
    <section
      id="service-scorecard"
      className={cn("bg-[#F4F4F4]", serviceSectionPad)}
      aria-labelledby="service-scorecard-heading"
    >
      <ServicePageShell>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2
              id="service-scorecard-heading"
              className="max-w-3xl text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]"
            >
              {board.heading}
            </h2>
            {board.subheading ? (
              <p className="mt-2 max-w-2xl text-sm font-medium text-text-secondary">
                {board.subheading}
              </p>
            ) : null}
          </div>
          {board.boardLabel ? (
            <p className="border-2 border-primary bg-background px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-primary">
              {board.boardLabel}
            </p>
          ) : null}
        </div>

        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {meters.map((meter) => {
            const r = 36;
            const c = 2 * Math.PI * r;
            const offset = c - (meter.score / 100) * c;
            return (
              <li
                key={meter.label}
                className="flex items-center gap-4 border-2 border-primary bg-background p-4"
              >
                <div
                  className="relative h-[5.5rem] w-[5.5rem] shrink-0"
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 88 88" className="h-full w-full -rotate-90">
                    <circle
                      cx="44"
                      cy="44"
                      r={r}
                      fill="none"
                      stroke="#E4E4DE"
                      strokeWidth="8"
                    />
                    <circle
                      cx="44"
                      cy="44"
                      r={r}
                      fill="none"
                      stroke="#C6F135"
                      strokeWidth="8"
                      strokeDasharray={c}
                      strokeDashoffset={offset}
                      strokeLinecap="butt"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center font-mono text-sm font-black text-primary">
                    {meter.score}
                  </span>
                </div>
                <div className="min-w-0">
                  <h3 className="text-base font-black text-primary">
                    {meter.label}
                  </h3>
                  <p className="mt-1 text-xs font-medium leading-snug text-text-secondary">
                    {meter.detail}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
        {board.disclaimer ? (
          <p className="mt-4 text-xs font-medium text-text-secondary">
            {board.disclaimer}
          </p>
        ) : null}
      </ServicePageShell>
    </section>
  );
}
