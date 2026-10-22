import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CatalogHealthBoardProps {
  urlLabel: string;
  disclaimer: string;
  columns: string[];
  rows: { cells: string[] }[];
  /** mac = light browser; seller-console = dark ASIN ops; sheet = hard panel table (no browser chrome). */
  variant?: "mac" | "seller-console" | "sheet";
  boardLabel?: string;
}

/** Illustrative catalog health table — not a Seller Central capture. */
export function CatalogHealthBoard({
  urlLabel,
  disclaimer,
  columns,
  rows,
  variant = "mac",
  boardLabel,
}: CatalogHealthBoardProps) {
  if (variant === "seller-console") {
    return (
      <SellerConsoleBoard
        urlLabel={urlLabel}
        disclaimer={disclaimer}
        columns={columns}
        rows={rows}
      />
    );
  }

  if (variant === "sheet") {
    return (
      <SheetBoard
        urlLabel={urlLabel}
        disclaimer={disclaimer}
        columns={columns}
        rows={rows}
        boardLabel={boardLabel}
      />
    );
  }

  return (
    <div className="space-y-3">
      <div
        className={cn(
          "overflow-hidden rounded-[12px] border border-white/15 bg-[#ececef]",
          "shadow-[0_24px_60px_-18px_rgba(0,0,0,0.65)] ring-1 ring-black/20",
        )}
      >
        <div className="flex h-10 items-center gap-3 bg-[#e4e4e7] px-3.5">
          <div className="flex shrink-0 items-center gap-1.5" aria-hidden="true">
            <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
            <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
            <span className="h-3 w-3 rounded-full bg-[#28C840]" />
          </div>
          <div className="flex min-w-0 flex-1 items-center gap-1.5 rounded-md border border-black/8 bg-white px-2.5 py-1 shadow-sm">
            <Lock
              className="h-3 w-3 shrink-0 text-neutral-400"
              aria-hidden="true"
            />
            <span className="truncate text-[11px] font-medium text-neutral-500">
              {urlLabel}
            </span>
          </div>
        </div>

        <div className="overflow-x-auto bg-background">
          <table className="w-full min-w-[560px] border-collapse text-left">
            <caption className="sr-only">Illustrative operations board</caption>
            <thead>
              <tr className="border-b-2 border-primary bg-surface-muted">
                {columns.map((column) => (
                  <th
                    key={column}
                    scope="col"
                    className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.1em] text-primary"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr
                  key={`${row.cells[0]}-${rowIndex}`}
                  className={cn(
                    "border-b border-primary/10",
                    rowIndex % 2 === 1 && "bg-surface-muted/50",
                  )}
                >
                  {row.cells.map((cell, cellIndex) => (
                    <td
                      key={`${rowIndex}-${cellIndex}`}
                      className={cn(
                        "px-4 py-3 text-small font-medium text-text-secondary",
                        cellIndex === 0 && "font-semibold text-primary",
                        cellIndex === 1 && statusClass(cell),
                      )}
                    >
                      {cellIndex === 1 ? <StatusCell value={cell} /> : cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="text-xs text-text-secondary">{disclaimer}</p>
    </div>
  );
}

function SheetBoard({
  urlLabel,
  disclaimer,
  columns,
  rows,
  boardLabel = "Spec sheet",
}: Omit<CatalogHealthBoardProps, "variant">) {
  return (
    <div className="space-y-3">
      <div
        className={cn(
          "overflow-hidden rounded-[4px] border-2 border-primary bg-background",
          "shadow-[4px_4px_0_0_#131311]",
        )}
      >
        <div className="flex items-center justify-between gap-3 border-b-2 border-primary bg-surface-muted px-4 py-3 sm:px-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
            {boardLabel}
          </p>
          <p className="truncate font-mono text-[11px] text-text-secondary">
            {urlLabel}
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left">
            <caption className="sr-only">Illustrative operations sheet</caption>
            <thead>
              <tr className="border-b-2 border-primary">
                {columns.map((column) => (
                  <th
                    key={column}
                    scope="col"
                    className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.1em] text-primary"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr
                  key={`${row.cells[0]}-${rowIndex}`}
                  className={cn(
                    "border-b border-primary/15 last:border-b-0",
                    rowIndex % 2 === 1 && "bg-surface-muted/40",
                  )}
                >
                  {row.cells.map((cell, cellIndex) => (
                    <td
                      key={`${rowIndex}-${cellIndex}`}
                      className={cn(
                        "px-4 py-3 text-small font-medium text-text-secondary",
                        cellIndex === 0 && "font-semibold text-primary",
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
      </div>
      <p className="text-xs text-text-secondary">{disclaimer}</p>
    </div>
  );
}

function SellerConsoleBoard({
  urlLabel,
  disclaimer,
  columns,
  rows,
}: Omit<CatalogHealthBoardProps, "variant">) {
  const liveCount = rows.filter((r) =>
    r.cells[1]?.toLowerCase().trim() === "live",
  ).length;
  const blockedCount = rows.length - liveCount;

  return (
    <div className="space-y-3">
      <div
        className={cn(
          "overflow-hidden rounded-[4px] border border-[#232F3E]/70",
          "bg-[#232F3E] shadow-[0_20px_50px_-16px_rgba(0,0,0,0.55)]",
        )}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#FF9900]">
              Catalog ops console
            </p>
            <p className="mt-0.5 truncate font-mono text-[11px] text-white/55">
              {urlLabel}
            </p>
          </div>
          <dl className="flex gap-4 text-right">
            <div>
              <dt className="text-[10px] uppercase tracking-[0.12em] text-white/45">
                Live
              </dt>
              <dd className="text-lg font-bold tabular-nums text-[#7CFF6B]">
                {liveCount}
              </dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[0.12em] text-white/45">
                Needs work
              </dt>
              <dd className="text-lg font-bold tabular-nums text-[#FFB84D]">
                {blockedCount}
              </dd>
            </div>
          </dl>
        </div>

        <div className="overflow-x-auto bg-[#1A2433]">
          <table className="w-full min-w-[600px] border-collapse text-left">
            <caption className="sr-only">
              Illustrative Seller Central style catalog console
            </caption>
            <thead>
              <tr className="border-b border-white/10">
                {columns.map((column) => (
                  <th
                    key={column}
                    scope="col"
                    className="px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white/50 sm:px-5"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr
                  key={`${row.cells[0]}-${rowIndex}`}
                  className="border-b border-white/8 last:border-b-0"
                >
                  {row.cells.map((cell, cellIndex) => (
                    <td
                      key={`${rowIndex}-${cellIndex}`}
                      className={cn(
                        "px-4 py-3.5 text-small sm:px-5",
                        cellIndex === 0
                          ? "font-semibold text-white"
                          : "text-white/70",
                      )}
                    >
                      {cellIndex === 1 ? (
                        <StatusPill value={cell} />
                      ) : (
                        cell
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="text-xs text-text-secondary">{disclaimer}</p>
    </div>
  );
}

function StatusCell({ value }: { value: string }) {
  if (!isStatusToken(value)) return <>{value}</>;
  return <span className="font-semibold text-primary">{value}</span>;
}

function StatusPill({ value }: { value: string }) {
  const tone = statusTone(value);
  return (
    <span
      className={cn(
        "inline-flex rounded-[2px] px-2 py-0.5 text-[11px] font-bold uppercase tracking-[0.08em]",
        tone === "live" && "bg-[#1F3D2A] text-[#7CFF6B]",
        tone === "blocked" && "bg-[#3D2418] text-[#FFB84D]",
        tone === "split" && "bg-[#2A3344] text-[#9EC1FF]",
        tone === "neutral" && "bg-white/10 text-white/80",
      )}
    >
      {value}
    </span>
  );
}

function isStatusToken(status: string): boolean {
  const normalized = status.toLowerCase().trim();
  return (
    normalized === "suppressed" ||
    normalized === "live" ||
    normalized === "ok" ||
    normalized === "split" ||
    normalized === "upload error" ||
    normalized.startsWith("split ")
  );
}

function statusClass(status: string): string {
  return isStatusToken(status) ? "font-semibold text-primary" : "";
}

function statusTone(
  status: string,
): "live" | "blocked" | "split" | "neutral" {
  const normalized = status.toLowerCase().trim();
  if (normalized === "live" || normalized === "ok") return "live";
  if (
    normalized === "suppressed" ||
    normalized === "upload error"
  ) {
    return "blocked";
  }
  if (normalized === "split" || normalized.startsWith("split ")) return "split";
  return "neutral";
}
