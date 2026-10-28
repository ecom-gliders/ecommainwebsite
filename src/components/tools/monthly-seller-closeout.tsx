"use client";

import { useState } from "react";
import {
  ToolAlert,
  ToolPanel,
  ToolResultsPanel,
} from "@/components/tools/tool-panel";
import { formatInr } from "@/lib/tools/format-money";
import { readFileAsText } from "@/lib/tools/csv";
import { summarizeMutrCsv, type MutrSummary } from "@/lib/tools/mutr";
import {
  summarizeReturnsXml,
  type ReturnsSummary,
} from "@/lib/tools/returns-xml";

export function MonthlySellerCloseout() {
  const [mutr, setMutr] = useState<MutrSummary | null>(null);
  const [returns, setReturns] = useState<ReturnsSummary | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onMutr(file: File) {
    try {
      const text = await readFileAsText(file);
      setMutr(summarizeMutrCsv(text));
      setError(null);
    } catch {
      setError("Could not parse MUTR CSV.");
      setMutr(null);
    }
  }

  async function onReturns(file: File) {
    try {
      const text = await readFileAsText(file);
      setReturns(summarizeReturnsXml(text));
    } catch {
      setError("Could not parse returns XML.");
    }
  }

  const hasResults = Boolean(mutr);

  return (
    <ToolPanel
      title="Close-out"
      description="Upload MUTR CSV (required) and optional Returns XML."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <label className="flex min-h-24 cursor-pointer flex-col items-center justify-center border-2 border-dashed border-primary bg-surface-muted px-4 text-center text-sm font-medium">
            MUTR CSV
            <input
              type="file"
              accept=".csv,text/csv"
              className="sr-only"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void onMutr(file);
                e.target.value = "";
              }}
            />
          </label>
          <label className="flex min-h-24 cursor-pointer flex-col items-center justify-center border-2 border-dashed border-primary bg-surface-muted px-4 text-center text-sm font-medium">
            Returns XML (optional)
            <input
              type="file"
              accept=".xml,text/xml,application/xml"
              className="sr-only"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void onReturns(file);
                e.target.value = "";
              }}
            />
          </label>
          {error ? <ToolAlert>{error}</ToolAlert> : null}
        </div>
        <ToolResultsPanel hasResults={hasResults}>
          {mutr ? (
            <div className="mt-4 space-y-3 text-sm">
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt>MUTR rows</dt>
                  <dd className="font-bold">{mutr.rowCount}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Credits</dt>
                  <dd className="font-bold tabular-nums">
                    {formatInr(mutr.creditTotal)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt>Debits</dt>
                  <dd className="font-bold tabular-nums">
                    {formatInr(mutr.debitTotal)}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-primary/20 pt-2">
                  <dt className="font-bold">Net settlement</dt>
                  <dd className="font-bold tabular-nums">
                    {formatInr(mutr.netTotal)}
                  </dd>
                </div>
                {returns ? (
                  <div className="flex justify-between">
                    <dt>Returns in period</dt>
                    <dd className="font-bold">{returns.totalReturns}</dd>
                  </div>
                ) : null}
              </dl>
              <div>
                <p className="font-bold">Largest description lines</p>
                <ul className="mt-2 max-h-48 overflow-auto divide-y divide-primary/20 border border-primary/20">
                  {mutr.byDescription.slice(0, 12).map((row) => (
                    <li
                      key={row.description}
                      className="flex justify-between gap-3 px-3 py-2"
                    >
                      <span>
                        {row.description}{" "}
                        <span className="text-primary/70">({row.count})</span>
                      </span>
                      <span className="font-bold tabular-nums">
                        {formatInr(row.amount)}
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
