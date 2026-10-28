"use client";

import { useEffect, useId, useState } from "react";
import { PrimaryButton } from "@/components/ui/primary-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToolAlert, ToolPanel } from "@/components/tools/tool-panel";
import { GST_RATES } from "@/lib/tools/gst-calculator";
import { downloadTextFile, formatInr, parseNumericInput } from "@/lib/tools/format-money";
import { parseCsv, readFileAsText } from "@/lib/tools/csv";

const STORAGE_KEY = "ecomgliders.product-catalog.v1";

type CatalogItem = {
  id: string;
  sku: string;
  title: string;
  hsn: string;
  gstPercent: string;
  cogs: string;
};

function emptyItem(): CatalogItem {
  return {
    id: crypto.randomUUID(),
    sku: "",
    title: "",
    hsn: "",
    gstPercent: "18",
    cogs: "",
  };
}

export function ProductCatalog() {
  const formId = useId();
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [draft, setDraft] = useState(emptyItem());
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CatalogItem[];
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      // ignore corrupt storage
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, ready]);

  function addItem() {
    if (!draft.sku.trim()) {
      setError("SKU is required.");
      return;
    }
    setError(null);
    setItems((prev) => {
      const existing = prev.findIndex(
        (item) => item.sku.toLowerCase() === draft.sku.trim().toLowerCase(),
      );
      const next = {
        ...draft,
        id: existing >= 0 ? prev[existing].id : draft.id,
        sku: draft.sku.trim(),
      };
      if (existing >= 0) {
        const copy = [...prev];
        copy[existing] = next;
        return copy;
      }
      return [...prev, next];
    });
    setDraft(emptyItem());
  }

  function exportCsv() {
    const header = "sku,title,hsn,gst_percent,cogs";
    const rows = items.map(
      (item) =>
        [
          item.sku,
          item.title,
          item.hsn,
          item.gstPercent,
          item.cogs,
        ]
          .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
          .join(","),
    );
    downloadTextFile(
      "product-catalog.csv",
      [header, ...rows].join("\n"),
      "text/csv;charset=utf-8",
    );
  }

  async function importCsv(file: File) {
    try {
      const text = await readFileAsText(file);
      const table = parseCsv(text);
      const skuIdx = table.headers.findIndex((h) =>
        h.toLowerCase().includes("sku"),
      );
      if (skuIdx < 0) {
        setError("CSV must include a SKU column.");
        return;
      }
      const titleIdx = table.headers.findIndex((h) =>
        /title|name|product/i.test(h),
      );
      const hsnIdx = table.headers.findIndex((h) => /hsn/i.test(h));
      const gstIdx = table.headers.findIndex((h) => /gst/i.test(h));
      const cogsIdx = table.headers.findIndex((h) =>
        /cogs|cost|landed/i.test(h),
      );
      const imported = table.rows
        .map((row) => ({
          id: crypto.randomUUID(),
          sku: (row[skuIdx] ?? "").trim(),
          title: titleIdx >= 0 ? (row[titleIdx] ?? "").trim() : "",
          hsn: hsnIdx >= 0 ? (row[hsnIdx] ?? "").trim() : "",
          gstPercent:
            gstIdx >= 0
              ? String(parseNumericInput(row[gstIdx] ?? "18") || 18)
              : "18",
          cogs: cogsIdx >= 0 ? (row[cogsIdx] ?? "").trim() : "",
        }))
        .filter((item) => item.sku);
      if (imported.length === 0) {
        setError("No SKU rows found in the CSV.");
        return;
      }
      setError(null);
      setItems(imported);
    } catch {
      setError("Could not read that CSV file.");
    }
  }

  return (
    <ToolPanel
      title="Catalog"
      description="Stored in this browser only. Export CSV for backup."
    >
      <div className="space-y-6">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Label htmlFor={`${formId}-sku`} className="text-sm font-bold">
              SKU
            </Label>
            <Input
              id={`${formId}-sku`}
              value={draft.sku}
              onChange={(e) => setDraft((d) => ({ ...d, sku: e.target.value }))}
              className="mt-2 h-11 border-2 border-primary"
            />
          </div>
          <div className="lg:col-span-1">
            <Label htmlFor={`${formId}-title`} className="text-sm font-bold">
              Title
            </Label>
            <Input
              id={`${formId}-title`}
              value={draft.title}
              onChange={(e) =>
                setDraft((d) => ({ ...d, title: e.target.value }))
              }
              className="mt-2 h-11 border-2 border-primary"
            />
          </div>
          <div>
            <Label htmlFor={`${formId}-hsn`} className="text-sm font-bold">
              HSN
            </Label>
            <Input
              id={`${formId}-hsn`}
              value={draft.hsn}
              onChange={(e) => setDraft((d) => ({ ...d, hsn: e.target.value }))}
              className="mt-2 h-11 border-2 border-primary"
            />
          </div>
          <div>
            <Label htmlFor={`${formId}-gst`} className="text-sm font-bold">
              GST %
            </Label>
            <select
              id={`${formId}-gst`}
              value={draft.gstPercent}
              onChange={(e) =>
                setDraft((d) => ({ ...d, gstPercent: e.target.value }))
              }
              className="mt-2 flex h-11 w-full border-2 border-primary bg-background px-2 text-sm"
            >
              {GST_RATES.map((value) => (
                <option key={value} value={String(value)}>
                  {value}%
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor={`${formId}-cogs`} className="text-sm font-bold">
              COGS (INR)
            </Label>
            <Input
              id={`${formId}-cogs`}
              value={draft.cogs}
              onChange={(e) => setDraft((d) => ({ ...d, cogs: e.target.value }))}
              className="mt-2 h-11 border-2 border-primary"
            />
          </div>
        </div>

        {error ? <ToolAlert>{error}</ToolAlert> : null}

        <div className="flex flex-wrap gap-3">
          <PrimaryButton type="button" variant="accent" onClick={addItem}>
            Save SKU
          </PrimaryButton>
          <button
            type="button"
            onClick={exportCsv}
            className="inline-flex min-h-11 items-center border-2 border-primary px-4 text-small font-bold uppercase tracking-[0.06em] hover:bg-surface-muted"
          >
            Export CSV
          </button>
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
          <button
            type="button"
            onClick={() => setItems([])}
            className="inline-flex min-h-11 items-center border-2 border-primary px-4 text-small font-bold uppercase tracking-[0.06em] hover:bg-surface-muted"
          >
            Clear all
          </button>
        </div>

        <div className="overflow-x-auto border-2 border-primary">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <thead className="bg-surface-muted">
              <tr>
                <th className="px-3 py-2 font-bold">SKU</th>
                <th className="px-3 py-2 font-bold">Title</th>
                <th className="px-3 py-2 font-bold">HSN</th>
                <th className="px-3 py-2 font-bold">GST</th>
                <th className="px-3 py-2 font-bold">COGS</th>
                <th className="px-3 py-2 font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-3 py-6 text-text-secondary"
                  >
                    No SKUs yet. Add one above or import a CSV.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className="border-t border-primary/15">
                    <td className="px-3 py-2 font-medium">{item.sku}</td>
                    <td className="px-3 py-2">{item.title || "—"}</td>
                    <td className="px-3 py-2">{item.hsn || "—"}</td>
                    <td className="px-3 py-2">{item.gstPercent}%</td>
                    <td className="px-3 py-2">
                      {item.cogs
                        ? formatInr(parseNumericInput(item.cogs) || 0)
                        : "—"}
                    </td>
                    <td className="px-3 py-2">
                      <button
                        type="button"
                        className="text-sm font-bold text-primary underline"
                        onClick={() =>
                          setItems((prev) =>
                            prev.filter((row) => row.id !== item.id),
                          )
                        }
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </ToolPanel>
  );
}
