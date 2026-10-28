"use client";

import { useState } from "react";
import {
  ToolAlert,
  ToolPanel,
  ToolResultsPanel,
} from "@/components/tools/tool-panel";
import { formatInr, formatNumber } from "@/lib/tools/format-money";
import { readFileAsText } from "@/lib/tools/csv";
import {
  analyzePpcSearchTerms,
  type PpcDashboardSummary,
} from "@/lib/tools/ppc-dashboard";

export function PpcPerformanceDashboard() {
  const [summary, setSummary] = useState<PpcDashboardSummary | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onFile(file: File) {
    try {
      const text = await readFileAsText(file);
      setSummary(analyzePpcSearchTerms(text));
      setError(null);
    } catch (err) {
      setSummary(null);
      setError(
        err instanceof Error
          ? err.message
          : "Could not parse that advertising CSV.",
      );
    }
  }

  return (
    <ToolPanel
      title="PPC dashboard"
      description="Upload Amazon Advertising Search Term report CSV."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <label className="flex min-h-28 cursor-pointer flex-col items-center justify-center border-2 border-dashed border-primary bg-surface-muted px-4 text-center text-sm font-medium">
            Drop Search Term CSV here or click to choose
            <input
              type="file"
              accept=".csv,text/csv"
              className="sr-only"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void onFile(file);
                e.target.value = "";
              }}
            />
          </label>
          {error ? <ToolAlert>{error}</ToolAlert> : null}
        </div>
        <ToolResultsPanel hasResults={Boolean(summary)}>
          {summary ? (
            <div className="mt-4 space-y-4 text-sm">
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt>Total spend</dt>
                  <dd className="font-bold tabular-nums">
                    {formatInr(summary.totalSpend)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt>Attributed sales</dt>
                  <dd className="font-bold tabular-nums">
                    {formatInr(summary.totalSales)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt>Spend with zero orders</dt>
                  <dd className="font-bold tabular-nums">
                    {formatInr(summary.wastedSpend)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt>Zero-conversion terms</dt>
                  <dd className="font-bold">{summary.zeroConversionTerms}</dd>
                </div>
              </dl>
              <div>
                <p className="font-bold">Highest spend terms</p>
                <ul className="mt-2 max-h-56 overflow-auto divide-y divide-primary/20 border border-primary/20">
                  {summary.rows.slice(0, 25).map((row) => (
                    <li
                      key={row.term}
                      className="flex justify-between gap-3 px-3 py-2"
                    >
                      <span>
                        {row.term}
                        <span className="ml-2 text-primary/70">
                          ACoS{" "}
                          {row.acos === null
                            ? "—"
                            : `${formatNumber(row.acos)}%`}
                        </span>
                      </span>
                      <span className="font-bold tabular-nums">
                        {formatInr(row.spend)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
        </ToolResultsPanel>
      </div>
    </ToolPanel>
  );
}
