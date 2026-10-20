import Link from "next/link";
import { Check, X } from "lucide-react";
import { SwingCallout } from "@/components/ui/swing-callout";
import { cn } from "@/lib/utils";
import { readNavLink, readRecordArray, readString } from "./section-data";
import { SectionShell } from "./section-shell";

interface ComparisonSectionProps {
  id: string;
  data: Record<string, unknown>;
}

interface ComparisonCell {
  text: string;
  positive: boolean;
}

function readCompetitorColumns(data: Record<string, unknown>): string[] {
  const columns = data.columns as Record<string, unknown> | undefined;
  if (!columns) return ["Typical agency", "Freelancer", "DIY / In-house"];

  const list = columns.competitors;
  if (Array.isArray(list)) {
    return list.map((item) => readString(item)).filter(Boolean);
  }

  const alternative = readString(columns.alternative);
  return alternative ? [alternative] : ["DIY / In-house"];
}

function readRowCells(
  row: Record<string, unknown>,
  competitorCount: number,
): ComparisonCell[] {
  const values = row.values;
  if (Array.isArray(values)) {
    return values
      .map((raw) => {
        if (!raw || typeof raw !== "object") return null;
        const item = raw as Record<string, unknown>;
        const text = readString(item.text) || readString(item.label);
        if (!text) return null;
        return {
          text,
          positive: item.positive === true,
        };
      })
      .filter((cell): cell is ComparisonCell => Boolean(cell));
  }

  const agency = readString(row.agency);
  const alternative = readString(row.alternative);
  const cells: ComparisonCell[] = [];
  if (agency) cells.push({ text: agency, positive: true });
  if (alternative) cells.push({ text: alternative, positive: false });
  while (cells.length < competitorCount + 1) {
    cells.push({ text: "—", positive: false });
  }
  return cells;
}

function CellContent({ cell }: { cell: ComparisonCell }) {
  return (
    <div className="flex items-start gap-2.5">
      <span
        className={cn(
          "mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
          cell.positive
            ? "bg-accent text-primary"
            : "bg-primary/10 text-text-secondary",
        )}
        aria-hidden="true"
      >
        {cell.positive ? (
          <Check className="h-3 w-3 stroke-[2.5]" />
        ) : (
          <X className="h-3 w-3 stroke-[2.5]" />
        )}
      </span>
      <span
        className={cn(
          "text-sm leading-snug",
          cell.positive
            ? "font-bold text-primary"
            : "font-normal text-text-secondary",
        )}
      >
        {cell.text}
      </span>
    </div>
  );
}

/**
 * Project One comparison chrome — eyebrow badge, swing note + arrow,
 * lime-border hero column, ink competitor headers, hairline rows.
 * eCom Amazon management copy only (no PO pricing/guarantee claims).
 */
export function ComparisonSection({ id, data }: ComparisonSectionProps) {
  const eyebrow = readString(data.eyebrow, "Why partner with us?");
  const heading = readString(data.heading);
  const subheading = readString(data.subheading);
  const swingNote = readString(data.swingNote);
  const columns = data.columns as Record<string, unknown> | undefined;
  const agencyColumn = readString(columns?.agency, "eCom Gliders");
  const competitorColumns = readCompetitorColumns(data);
  const rows = readRecordArray(data.rows);
  const deepLink = readNavLink(data.cta);
  const headingId = `${id}-heading`;
  const colCount = 1 + competitorColumns.length;

  if (!heading || rows.length === 0) return null;

  return (
    <SectionShell
      id={id}
      ariaLabelledBy={headingId}
      className="overflow-x-clip py-12 sm:py-16 lg:py-20"
    >
      <div className="relative mx-auto max-w-3xl text-center">
        {eyebrow ? (
          <p className="inline-flex rounded-[6px] bg-primary px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-text-on-dark sm:text-xs">
            {eyebrow}
          </p>
        ) : null}
        <h2
          id={headingId}
          className="mt-4 text-[1.65rem] font-black leading-[1.05] tracking-[-0.04em] text-primary text-balance sm:text-[2.75rem] lg:text-[3.8rem] lg:leading-[1.05]"
        >
          {heading}
        </h2>

        {subheading ? (
          <div className="relative mx-auto mt-5 max-w-xl">
            <p className="text-base font-normal leading-relaxed text-text-secondary sm:text-lg">
              {subheading}
            </p>
            {swingNote ? (
              <SwingCallout
                text={swingNote}
                arrow="down-left"
                className="absolute left-[calc(100%+0.75rem)] top-[-0.15rem] xl:left-[calc(100%+1.25rem)]"
              />
            ) : null}
          </div>
        ) : null}
      </div>

      {/* Desktop / tablet table — open hairlines like PO */}
      <div className="mt-12 hidden md:mt-16 md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[44rem] border-collapse text-left">
            <thead>
              <tr>
                <th scope="col" className="w-[18%] pb-6 pr-3" />
                <th scope="col" className="w-[20.5%] pb-6 pr-3 text-left">
                  <span className="inline-flex rounded-[8px] border-[3px] border-accent bg-background px-3 py-2 text-[11px] font-bold uppercase tracking-[0.1em] text-primary">
                    {agencyColumn}
                  </span>
                </th>
                {competitorColumns.map((label) => (
                  <th
                    key={label}
                    scope="col"
                    className="w-[20.5%] pb-6 pr-3 text-left last:pr-0"
                  >
                    <span className="inline-flex rounded-[8px] bg-primary px-3 py-2 text-[11px] font-bold uppercase tracking-[0.1em] text-text-on-dark">
                      {label}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const feature = readString(row.feature);
                const cells = readRowCells(row, competitorColumns.length).slice(
                  0,
                  colCount,
                );

                return (
                  <tr key={feature} className="border-t border-primary/10">
                    <th scope="row" className="py-5 pr-3 align-middle text-left">
                      <span className="inline-flex rounded-[6px] bg-primary px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-text-on-dark">
                        {feature}
                      </span>
                    </th>
                    {cells.map((cell, index) => (
                      <td
                        key={`${feature}-${index}`}
                        className="py-5 pr-3 align-middle text-left last:pr-0"
                      >
                        <div className="flex justify-start">
                          <CellContent cell={cell} />
                        </div>
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile stacked rows */}
      <ul className="mt-10 space-y-3 md:hidden">
        {rows.map((row) => {
          const feature = readString(row.feature);
          const cells = readRowCells(row, competitorColumns.length).slice(
            0,
            colCount,
          );
          const labels = [agencyColumn, ...competitorColumns];

          return (
            <li
              key={feature}
              className="overflow-hidden rounded-[16px] border-2 border-primary bg-background p-4 shadow-[3px_3px_0_0_#131311]"
            >
              <p className="inline-flex rounded-[6px] bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-text-on-dark">
                {feature}
              </p>
              <dl className="mt-4 space-y-4 text-sm">
                {cells.map((cell, index) => (
                  <div key={`${feature}-m-${index}`} className="flex gap-2.5">
                    <div className="min-w-0 flex-1">
                      <dt
                        className={cn(
                          "text-[10px] font-bold uppercase tracking-[0.12em]",
                          index === 0 ? "text-primary" : "text-text-secondary",
                        )}
                      >
                        {labels[index]}
                      </dt>
                      <dd className="mt-1.5">
                        <CellContent cell={cell} />
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </li>
          );
        })}
      </ul>

      {deepLink ? (
        <p className="mt-10 text-center text-sm text-text-secondary sm:mt-12">
          <Link
            href={deepLink.href}
            className="font-bold text-primary underline-offset-4 transition-colors hover:text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            {deepLink.label}
          </Link>
        </p>
      ) : null}
    </SectionShell>
  );
}
