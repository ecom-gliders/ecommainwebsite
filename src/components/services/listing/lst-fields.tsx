import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface LstFieldsProps {
  service: ServicePageConfig;
}

const COLS = ["Title", "Bullets", "Backend", "Images"];

/**
 * Keyword→field placement matrix — not equal deliverable cards.
 */
export function LstFields({ service }: LstFieldsProps) {
  const { deliverables } = service;
  const items = deliverables.items.slice(0, 4);

  return (
    <section
      id="service-deliverables"
      className={cn("bg-primary text-text-on-dark", serviceSectionPad)}
      aria-labelledby="service-deliverables-heading"
    >
      <ServicePageShell>
        <h2
          id="service-deliverables-heading"
          className="max-w-3xl text-2xl font-black tracking-tight text-text-on-dark sm:text-[1.75rem]"
        >
          {deliverables.heading}
        </h2>
        <p className="mt-2 max-w-2xl text-sm font-medium text-text-on-dark/80">
          Each deliverable maps buyer language into the fields that ranking and
          conversion actually read.
        </p>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse border-2 border-accent text-left text-sm">
            <thead>
              <tr className="bg-accent text-primary">
                <th className="border-b-2 border-r-2 border-primary px-3 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.08em]">
                  Workstream
                </th>
                {COLS.map((col) => (
                  <th
                    key={col}
                    className="border-b-2 border-primary px-3 py-2.5 text-center font-mono text-[10px] font-bold uppercase tracking-[0.08em]"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, rowIndex) => (
                <tr
                  key={item.title}
                  className="border-b border-accent/30 last:border-b-0"
                >
                  <th
                    scope="row"
                    className="border-r-2 border-accent/40 bg-[#1a1a18] px-3 py-3 text-left align-top"
                  >
                    <p className="font-black text-text-on-dark">{item.title}</p>
                    <p className="mt-1 text-xs font-medium leading-snug text-text-on-dark/70">
                      {item.description}
                    </p>
                  </th>
                  {COLS.map((col, colIndex) => {
                    const active = colIndex === rowIndex % COLS.length ||
                      (rowIndex + colIndex) % 3 === 0;
                    return (
                      <td
                        key={`${item.title}-${col}`}
                        className="px-2 py-3 text-center align-middle"
                      >
                        <span
                          className={cn(
                            "inline-block h-3 w-3 border-2",
                            active
                              ? "border-accent bg-accent"
                              : "border-accent/40 bg-transparent",
                          )}
                          title={active ? `Maps to ${col}` : undefined}
                          aria-label={
                            active
                              ? `${item.title} maps to ${col}`
                              : `${item.title} not primary for ${col}`
                          }
                        />
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
