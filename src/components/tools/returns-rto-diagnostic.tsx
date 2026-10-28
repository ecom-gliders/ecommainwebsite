"use client";

import { useState } from "react";
import {
  ToolAlert,
  ToolPanel,
  ToolResultsPanel,
} from "@/components/tools/tool-panel";
import { readFileAsText } from "@/lib/tools/csv";
import {
  summarizeReturnsXml,
  type ReturnsSummary,
} from "@/lib/tools/returns-xml";

export function ReturnsRtoDiagnostic() {
  const [summary, setSummary] = useState<ReturnsSummary | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onFile(file: File) {
    try {
      const text = await readFileAsText(file);
      const result = summarizeReturnsXml(text);
      if (result.totalReturns === 0) {
        setError(
          "No return items detected. Confirm this is an Amazon Returns Report XML.",
        );
        setSummary(null);
        return;
      }
      setSummary(result);
      setError(null);
    } catch {
      setError("Could not read that XML file.");
      setSummary(null);
    }
  }

  return (
    <ToolPanel
      title="Returns diagnostic"
      description="Upload Returns Report XML from Seller Central."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <label className="flex min-h-28 cursor-pointer flex-col items-center justify-center border-2 border-dashed border-primary bg-surface-muted px-4 text-center text-sm font-medium">
            Drop XML here or click to choose
            <input
              type="file"
              accept=".xml,text/xml,application/xml"
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
                  <dt>Total returns parsed</dt>
                  <dd className="font-bold">{summary.totalReturns}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>RTO / undelivered signals</dt>
                  <dd className="font-bold">{summary.rtoCount}</dd>
                </div>
              </dl>
              <div>
                <p className="font-bold">Top reasons</p>
                <ul className="mt-2 max-h-40 overflow-auto divide-y divide-primary/20 border border-primary/20">
                  {summary.byReason.slice(0, 15).map((row) => (
                    <li
                      key={row.reason}
                      className="flex justify-between gap-3 px-3 py-2"
                    >
                      <span>{row.reason}</span>
                      <span className="font-bold tabular-nums">{row.count}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-bold">Top SKUs</p>
                <ul className="mt-2 max-h-40 overflow-auto divide-y divide-primary/20 border border-primary/20">
                  {summary.bySku.slice(0, 15).map((row) => (
                    <li
                      key={row.sku}
                      className="flex justify-between gap-3 px-3 py-2"
                    >
                      <span className="font-mono">{row.sku}</span>
                      <span className="font-bold tabular-nums">{row.count}</span>
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
