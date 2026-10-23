import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface CpyClaimGatesProps {
  service: ServicePageConfig;
}

/** Publish-gate stamps from claim board — not circular meters or sheet table. */
export function CpyClaimGates({ service }: CpyClaimGatesProps) {
  const board = service.modules?.find(
    (module) => module.type === "catalogHealthBoard",
  );
  if (!board || board.type !== "catalogHealthBoard") return null;

  return (
    <section
      id="service-claim-gates"
      className={cn("bg-[#F4F4F4]", serviceSectionPad)}
      aria-labelledby="service-claim-gates-heading"
    >
      <ServicePageShell>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2
              id="service-claim-gates-heading"
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

        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {board.rows.map((row) => {
            const [surface, read, weak, gate] = row.cells;
            return (
              <li
                key={surface}
                className="flex flex-col border-2 border-primary bg-background p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-black text-primary">{surface}</h3>
                  <span
                    className="shrink-0 border-2 border-primary bg-accent px-1.5 py-0.5 font-mono text-[9px] font-black uppercase text-primary"
                    aria-hidden="true"
                  >
                    Gate
                  </span>
                </div>
                <p className="mt-2 text-sm font-medium leading-snug text-text-secondary">
                  {read}
                </p>
                <p className="mt-3 text-xs font-medium leading-snug text-text-secondary line-through decoration-primary/40">
                  {weak}
                </p>
                <p className="mt-2 border-t border-primary/15 pt-2 text-xs font-bold leading-snug text-primary">
                  {gate}
                </p>
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
