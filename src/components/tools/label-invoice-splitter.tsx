"use client";

import { useState } from "react";
import {
  ToolAlert,
  ToolPanel,
  ToolResultsPanel,
} from "@/components/tools/tool-panel";
import {
  splitLabelInvoicePdf,
  type LabelSplitMode,
} from "@/lib/tools/label-invoice-split";
import { downloadBlob } from "@/lib/tools/format-money";
import { readFileAsArrayBuffer } from "@/lib/tools/csv";

export function LabelInvoiceSplitter() {
  const [mode, setMode] = useState<LabelSplitMode>("odd-labels");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    pageCount: number;
    kept: number;
  } | null>(null);
  const [busy, setBusy] = useState(false);

  async function onFile(file: File) {
    setBusy(true);
    setError(null);
    setResult(null);
    try {
      const buffer = await readFileAsArrayBuffer(file);
      const split = await splitLabelInvoicePdf(buffer, mode);
      downloadBlob(
        file.name.replace(/\.pdf$/i, "") + "-labels-only.pdf",
        new Blob([Uint8Array.from(split.bytes)], {
          type: "application/pdf",
        }),
      );
      setResult({ pageCount: split.pageCount, kept: split.kept });
    } catch {
      setError(
        "Could not process that PDF. Confirm it is a valid Amazon bulk label file.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <ToolPanel
      title="PDF splitter"
      description="Keep label pages and drop invoice pages. File stays in your browser."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <fieldset className="space-y-2">
            <legend className="text-sm font-bold">Page pattern</legend>
            {(
              [
                ["odd-labels", "Odd pages are labels (1, 3, 5…)"],
                ["even-labels", "Even pages are labels (2, 4, 6…)"],
                ["all-pages", "Keep all pages (pass-through)"],
              ] as const
            ).map(([value, label]) => (
              <label
                key={value}
                className="flex min-h-11 cursor-pointer items-center gap-2 text-sm font-medium"
              >
                <input
                  type="radio"
                  checked={mode === value}
                  onChange={() => setMode(value)}
                  className="h-4 w-4 accent-primary"
                />
                {label}
              </label>
            ))}
          </fieldset>

          <label className="flex min-h-28 cursor-pointer flex-col items-center justify-center border-2 border-dashed border-primary bg-surface-muted px-4 text-center text-sm font-medium">
            {busy ? "Processing…" : "Drop PDF here or click to choose"}
            <input
              type="file"
              accept="application/pdf,.pdf"
              className="sr-only"
              disabled={busy}
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
            <dl className="mt-4 space-y-3">
              <div className="flex justify-between gap-4 border-b border-primary/20 pb-2">
                <dt className="text-sm font-medium text-primary/80">
                  Source pages
                </dt>
                <dd className="font-bold tabular-nums">{result.pageCount}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-sm font-medium text-primary/80">
                  Labels kept
                </dt>
                <dd className="font-bold tabular-nums">{result.kept}</dd>
              </div>
              <p className="pt-2 text-sm font-medium text-primary/80">
                Download started automatically.
              </p>
            </dl>
          ) : null}
        </ToolResultsPanel>
      </div>
    </ToolPanel>
  );
}
