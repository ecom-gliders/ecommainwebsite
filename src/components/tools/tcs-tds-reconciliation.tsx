"use client";

import { useState } from "react";
import {
  ToolAlert,
  ToolPanel,
  ToolResultsPanel,
} from "@/components/tools/tool-panel";
import { formatInr } from "@/lib/tools/format-money";
import { readFileAsText } from "@/lib/tools/csv";
import { filterTaxRows } from "@/lib/tools/mutr";

export function TcsTdsReconciliation() {
  const [result, setResult] = useState<ReturnType<typeof filterTaxRows> | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);

  async function onFile(file: File) {
    try {
      const text = await readFileAsText(file);
      setResult(filterTaxRows(text));
      setError(null);
    } catch {
      setError("Could not parse MUTR CSV.");
      setResult(null);
    }
  }

  return (
    <ToolPanel
      title="TCS / TDS"
      description="Upload Monthly Unified Transaction Report CSV."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <label className="flex min-h-28 cursor-pointer flex-col items-center justify-center border-2 border-dashed border-primary bg-surface-muted px-4 text-center text-sm font-medium">
            Drop MUTR CSV here or click to choose
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
        <ToolResultsPanel hasResults={Boolean(result)}>
          {result ? (
            <div className="mt-4 space-y-4 text-sm">
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt>TCS total</dt>
                  <dd className="font-bold tabular-nums">
                    {formatInr(result.tcsTotal)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt>TDS total</dt>
                  <dd className="font-bold tabular-nums">
                    {formatInr(result.tdsTotal)}
                  </dd>
                </div>
              </dl>
              <div>
                <p className="font-bold">TCS lines</p>
                <ul className="mt-2 max-h-40 overflow-auto divide-y divide-primary/20 border border-primary/20">
                  {result.tcs.length === 0 ? (
                    <li className="px-3 py-2 text-primary/70">
                      No TCS descriptions detected.
                    </li>
                  ) : (
                    result.tcs.map((row) => (
                      <li
                        key={row.description}
                        className="flex justify-between gap-3 px-3 py-2"
                      >
                        <span>{row.description}</span>
                        <span className="font-bold tabular-nums">
                          {formatInr(row.amount)}
                        </span>
                      </li>
                    ))
                  )}
                </ul>
              </div>
              <div>
                <p className="font-bold">TDS lines</p>
                <ul className="mt-2 max-h-40 overflow-auto divide-y divide-primary/20 border border-primary/20">
                  {result.tds.length === 0 ? (
                    <li className="px-3 py-2 text-primary/70">
                      No TDS descriptions detected.
                    </li>
                  ) : (
                    result.tds.map((row) => (
                      <li
                        key={row.description}
                        className="flex justify-between gap-3 px-3 py-2"
                      >
                        <span>{row.description}</span>
                        <span className="font-bold tabular-nums">
                          {formatInr(row.amount)}
                        </span>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          ) : null}
        </ToolResultsPanel>
      </div>
    </ToolPanel>
  );
}
