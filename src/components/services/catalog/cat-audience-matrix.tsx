import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface CatAudienceMatrixProps {
  service: ServicePageConfig;
}

const ROLES = ["Catalog ops", "PPC lead", "Content", "Account lead"] as const;

/** Operator fit matrix with status chips — not equal seat cards. */
export function CatAudienceMatrix({ service }: CatAudienceMatrixProps) {
  const audience = service.audience;
  if (!audience?.points?.length) return null;

  const points = audience.points.slice(0, 4);
  const fitPattern: Record<number, boolean[]> = {
    0: [true, true, false, true],
    1: [true, false, true, true],
    2: [true, true, true, false],
    3: [true, true, true, true],
  };

  return (
    <section
      id="service-audience"
      className={cn("bg-background", serviceSectionPad)}
      aria-labelledby="service-audience-heading"
    >
      <ServicePageShell>
        <h2
          id="service-audience-heading"
          className="max-w-3xl text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]"
        >
          {audience.heading}
        </h2>

        <div className="mt-8 overflow-x-auto border-2 border-primary">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="border-b-2 border-primary bg-[#F4F4F4]">
                <th
                  scope="col"
                  className="p-3 font-mono text-xs font-bold uppercase tracking-[0.08em] text-text-secondary"
                >
                  Scenario
                </th>
                {ROLES.map((role) => (
                  <th
                    key={role}
                    scope="col"
                    className="border-l-2 border-primary p-3 font-mono text-xs font-bold uppercase tracking-[0.08em] text-text-secondary"
                  >
                    {role}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {points.map((point, rowIndex) => (
                <tr
                  key={point.title}
                  className={cn(
                    "border-b border-primary/20",
                    rowIndex % 2 === 0 ? "bg-background" : "bg-[#FAFAFA]",
                  )}
                >
                  <th
                    scope="row"
                    className="p-3 align-top font-normal"
                  >
                    <p className="text-sm font-black text-primary">{point.title}</p>
                    <p className="mt-1 text-xs font-medium leading-snug text-text-secondary">
                      {point.description}
                    </p>
                  </th>
                  {ROLES.map((role, colIndex) => {
                    const active =
                      fitPattern[rowIndex]?.[colIndex] ?? colIndex === 0;
                    return (
                      <td
                        key={role}
                        className="border-l-2 border-primary/15 p-3 text-center align-middle"
                      >
                        <span
                          className={cn(
                            "inline-block border-2 border-primary px-2 py-1 font-mono text-xs font-black uppercase tracking-[0.06em]",
                            active
                              ? "bg-accent text-primary"
                              : "bg-[#F4F4F4] text-text-secondary",
                          )}
                        >
                          {active ? "In scope" : "Handoff"}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ServicePageShell>
    </section>
  );
}
