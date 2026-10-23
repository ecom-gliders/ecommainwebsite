import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface DspReadinessGatesProps {
  service: ServicePageConfig;
}

/** Readiness board from modules — gate table visual. */
export function DspReadinessGates({ service }: DspReadinessGatesProps) {
  const board = service.modules?.find(
    (module) => module.type === "catalogHealthBoard",
  );
  if (!board || board.type !== "catalogHealthBoard") return null;

  return (
    <section
      id="service-readiness"
      className={cn("bg-background", serviceSectionPad)}
      aria-labelledby="service-readiness-heading"
    >
      <ServicePageShell>
        <h2
          id="service-readiness-heading"
          className="max-w-3xl text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]"
        >
          {board.heading}
        </h2>
        {board.subheading ? (
          <p className="mt-2 max-w-2xl text-sm font-medium leading-relaxed text-text-secondary sm:text-base">
            {board.subheading}
          </p>
        ) : null}

        <div className="mt-8 overflow-x-auto border-2 border-primary">
          <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-accent">
                {board.columns.map((column) => (
                  <th
                    key={column}
                    className="border-b-2 border-primary px-3 py-2.5 font-black text-primary"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {board.rows.map((row, index) => (
                <tr
                  key={row.cells[0]}
                  className={index % 2 === 0 ? "bg-background" : "bg-[#F4F4F4]"}
                >
                  {row.cells.map((cell, cellIndex) => (
                    <td
                      key={`${row.cells[0]}-${cellIndex}`}
                      className={cn(
                        "border-t border-primary/15 px-3 py-2.5 font-medium text-text-secondary",
                        cellIndex === 0 && "font-bold text-primary",
                      )}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {board.disclaimer ? (
          <p className="mt-3 text-xs font-medium text-text-secondary">
            {board.disclaimer}
          </p>
        ) : null}
      </ServicePageShell>
    </section>
  );
}
