"use client";

import { useState } from "react";
import {
  ToolAlert,
  ToolPanel,
  ToolResultsPanel,
} from "@/components/tools/tool-panel";
import { formatInr } from "@/lib/tools/format-money";
import { readFileAsText } from "@/lib/tools/csv";
import {
  rankSkuProfitability,
  type SkuProfitRow,
} from "@/lib/tools/sku-profitability";

export function SkuProfitabilityLeaderboard() {
  const [rows, setRows] = useState<SkuProfitRow[] | null>(null);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<string | null>(null);

  async function onFile(file: File) {
    try {
      const text = await readFileAsText(file);
      const result = rankSkuProfitability(text);
      setRows(result.rows);
      setTotal(result.totalProceeds);
      setError(null);
    } catch (err) {
      setRows(null);
      setError(
        err instanceof Error
          ? err.message
          : "Could not parse that CSV file.",
      );
    }
  }

  return (
    <ToolPanel
      title="Leaderboard"
      description="Upload a CSV with SKU and net proceeds columns."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <label className="flex min-h-28 cursor-pointer flex-col items-center justify-center border-2 border-dashed border-primary bg-surface-muted px-4 text-center text-sm font-medium">
            Drop CSV here or click to choose
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
        <ToolResultsPanel hasResults={Boolean(rows)}>
          {rows ? (
            <div className="mt-4 space-y-3">
              <p className="text-sm font-medium">
                Total proceeds:{" "}
                <span className="font-bold tabular-nums">
                  {formatInr(total)}
                </span>
              </p>
              <ul className="max-h-80 overflow-auto divide-y divide-primary/20 border border-primary/20">
                {rows.slice(0, 100).map((row, index) => (
                  <li
                    key={row.sku}
                    className="flex items-baseline justify-between gap-3 px-3 py-2 text-sm"
                  >
                    <span>
                      <span className="font-bold tabular-nums text-primary/70">
                        {index + 1}.
                      </span>{" "}
                      {row.sku}
                    </span>
                    <span className="font-bold tabular-nums">
                      {formatInr(row.proceeds)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </ToolResultsPanel>
      </div>
    </ToolPanel>
  );
}
