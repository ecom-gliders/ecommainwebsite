"use client";

import { useMemo, useRef, useState } from "react";
import { PrimaryButton } from "@/components/ui/primary-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToolAlert, ToolPanel } from "@/components/tools/tool-panel";
import { parseCsv, readFileAsText } from "@/lib/tools/csv";

function normalizeId(value: string): string {
  return value.trim().toUpperCase();
}

export function DispatchCheck() {
  const scanRef = useRef<HTMLInputElement>(null);
  const [rawList, setRawList] = useState("");
  const [scanned, setScanned] = useState<Set<string>>(new Set());
  const [scanValue, setScanValue] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const expected = useMemo(() => {
    const fromLines = rawList
      .split(/[\n,;\t]+/)
      .map(normalizeId)
      .filter(Boolean);
    return [...new Set(fromLines)];
  }, [rawList]);

  const pending = expected.filter((id) => !scanned.has(id));
  const unexpected = [...scanned].filter((id) => !expected.includes(id));

  function registerScan(raw: string) {
    const id = normalizeId(raw);
    if (!id) return;
    if (!expected.includes(id)) {
      setError(`Not on today's list: ${id}`);
      setScanned((prev) => new Set(prev).add(id));
      setScanValue("");
      return;
    }
    setError(null);
    setMessage(`Scanned ${id}`);
    setScanned((prev) => new Set(prev).add(id));
    setScanValue("");
    scanRef.current?.focus();
  }

  async function importCsv(file: File) {
    try {
      const text = await readFileAsText(file);
      const table = parseCsv(text);
      const matched = table.headers.findIndex((h) =>
        /tracking|awb|shipment|order|package/i.test(h),
      );
      const col = matched >= 0 ? matched : 0;
      const values = table.rows.map((row) => row[col] ?? "").filter(Boolean);
      setRawList(values.join("\n"));
      setScanned(new Set());
      setError(null);
    } catch {
      setError("Could not read that CSV.");
    }
  }

  return (
    <ToolPanel
      title="Dispatch check"
      description="Load tracking IDs, then scan each pack before carrier handover."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div>
            <Label htmlFor="dispatch-list" className="text-sm font-bold">
              Tracking / order IDs (one per line)
            </Label>
            <textarea
              id="dispatch-list"
              value={rawList}
              onChange={(e) => {
                setRawList(e.target.value);
                setScanned(new Set());
              }}
              className="mt-2 min-h-40 w-full border-2 border-primary bg-background p-3 font-mono text-sm"
              placeholder="Paste tracking numbers from Seller Central"
            />
          </div>
          <label className="inline-flex min-h-11 cursor-pointer items-center border-2 border-primary px-4 text-small font-bold uppercase tracking-[0.06em] hover:bg-surface-muted">
            Import CSV
            <input
              type="file"
              accept=".csv,text/csv"
              className="sr-only"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void importCsv(file);
                e.target.value = "";
              }}
            />
          </label>

          <div>
            <Label htmlFor="dispatch-scan" className="text-sm font-bold">
              Scan / type ID
            </Label>
            <form
              className="mt-2 flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                registerScan(scanValue);
              }}
            >
              <Input
                ref={scanRef}
                id="dispatch-scan"
                value={scanValue}
                onChange={(e) => setScanValue(e.target.value)}
                className="h-12 border-2 border-primary font-mono"
                autoComplete="off"
              />
              <PrimaryButton type="submit" variant="accent">
                Mark
              </PrimaryButton>
            </form>
          </div>

          {error ? <ToolAlert>{error}</ToolAlert> : null}
          {message && !error ? (
            <p className="text-sm font-medium text-text-secondary">{message}</p>
          ) : null}

          <button
            type="button"
            onClick={() => {
              setScanned(new Set());
              setMessage(null);
              setError(null);
            }}
            className="inline-flex min-h-11 items-center border-2 border-primary px-4 text-small font-bold uppercase tracking-[0.06em] hover:bg-surface-muted"
          >
            Reset scans
          </button>
        </div>

        <div className="space-y-4">
          <div className="border-2 border-primary bg-accent p-4 text-primary">
            <p className="text-xs font-bold uppercase tracking-[0.12em]">
              Progress
            </p>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt>Expected</dt>
                <dd className="font-bold">{expected.length}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Scanned</dt>
                <dd className="font-bold">
                  {[...scanned].filter((id) => expected.includes(id)).length}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt>Still pending</dt>
                <dd className="font-bold">{pending.length}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Unexpected scans</dt>
                <dd className="font-bold">{unexpected.length}</dd>
              </div>
            </dl>
          </div>

          <div>
            <p className="text-sm font-bold">Pending packs</p>
            <ul className="mt-2 max-h-64 overflow-auto border-2 border-primary divide-y divide-primary/15">
              {pending.length === 0 ? (
                <li className="px-3 py-3 text-sm text-text-secondary">
                  {expected.length === 0
                    ? "Add tracking IDs to begin."
                    : "All expected packs scanned."}
                </li>
              ) : (
                pending.map((id) => (
                  <li key={id} className="px-3 py-2 font-mono text-sm">
                    {id}
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </ToolPanel>
  );
}
