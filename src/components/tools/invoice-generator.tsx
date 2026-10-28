"use client";

import { useId, useMemo, useState } from "react";
import { PrimaryButton } from "@/components/ui/primary-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToolAlert, ToolPanel } from "@/components/tools/tool-panel";
import { GST_RATES, calculateGst } from "@/lib/tools/gst-calculator";
import { formatInr, parseNumericInput } from "@/lib/tools/format-money";

type LineItem = {
  id: string;
  description: string;
  hsn: string;
  qty: string;
  rate: string;
  gstPercent: string;
};

function emptyLine(): LineItem {
  return {
    id: crypto.randomUUID(),
    description: "",
    hsn: "",
    qty: "1",
    rate: "",
    gstPercent: "18",
  };
}

export function InvoiceGenerator() {
  const formId = useId();
  const [sellerName, setSellerName] = useState("");
  const [sellerGstin, setSellerGstin] = useState("");
  const [sellerAddress, setSellerAddress] = useState("");
  const [buyerName, setBuyerName] = useState("");
  const [buyerGstin, setBuyerGstin] = useState("");
  const [buyerAddress, setBuyerAddress] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState(
    () => new Date().toISOString().slice(0, 10),
  );
  const [supplyType, setSupplyType] = useState<"intra" | "inter">("intra");
  const [lines, setLines] = useState<LineItem[]>([emptyLine()]);
  const [error, setError] = useState<string | null>(null);

  const computed = useMemo(() => {
    return lines.map((line) => {
      const qty = parseNumericInput(line.qty) || 0;
      const rate = parseNumericInput(line.rate) || 0;
      const taxable = qty * rate;
      const gst = calculateGst({
        amount: taxable,
        ratePercent: parseNumericInput(line.gstPercent) || 0,
        mode: "exclusive",
        supplyType,
      });
      return { line, taxable, gst };
    });
  }, [lines, supplyType]);

  const totals = useMemo(() => {
    return computed.reduce(
      (acc, row) => ({
        taxable: acc.taxable + row.taxable,
        gst: acc.gst + row.gst.gstAmount,
        cgst: acc.cgst + row.gst.cgst,
        sgst: acc.sgst + row.gst.sgst,
        igst: acc.igst + row.gst.igst,
        total: acc.total + row.gst.totalAmount,
      }),
      { taxable: 0, gst: 0, cgst: 0, sgst: 0, igst: 0, total: 0 },
    );
  }, [computed]);

  function onPrint() {
    if (!sellerName.trim() || !buyerName.trim()) {
      setError("Enter seller and buyer names before printing.");
      return;
    }
    if (computed.every((row) => row.taxable <= 0)) {
      setError("Add at least one line item with quantity and rate.");
      return;
    }
    setError(null);
    window.print();
  }

  return (
    <ToolPanel
      title="Invoice"
      description="Build a GST tax invoice, then print or save as PDF from your browser."
    >
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor={`${formId}-inv`} className="text-sm font-bold">
              Invoice number
            </Label>
            <Input
              id={`${formId}-inv`}
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              className="mt-2 h-12 border-2 border-primary"
            />
          </div>
          <div>
            <Label htmlFor={`${formId}-date`} className="text-sm font-bold">
              Invoice date
            </Label>
            <Input
              id={`${formId}-date`}
              type="date"
              value={invoiceDate}
              onChange={(e) => setInvoiceDate(e.target.value)}
              className="mt-2 h-12 border-2 border-primary"
            />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <fieldset className="space-y-3 border-2 border-primary/20 p-4">
            <legend className="px-1 text-sm font-bold">Seller</legend>
            <Input
              placeholder="Business name"
              value={sellerName}
              onChange={(e) => setSellerName(e.target.value)}
              className="h-11 border-2 border-primary"
            />
            <Input
              placeholder="GSTIN"
              value={sellerGstin}
              onChange={(e) => setSellerGstin(e.target.value)}
              className="h-11 border-2 border-primary"
            />
            <textarea
              placeholder="Address"
              value={sellerAddress}
              onChange={(e) => setSellerAddress(e.target.value)}
              className="min-h-24 w-full border-2 border-primary bg-background p-3 text-sm"
            />
          </fieldset>
          <fieldset className="space-y-3 border-2 border-primary/20 p-4">
            <legend className="px-1 text-sm font-bold">Buyer</legend>
            <Input
              placeholder="Buyer name"
              value={buyerName}
              onChange={(e) => setBuyerName(e.target.value)}
              className="h-11 border-2 border-primary"
            />
            <Input
              placeholder="GSTIN (optional)"
              value={buyerGstin}
              onChange={(e) => setBuyerGstin(e.target.value)}
              className="h-11 border-2 border-primary"
            />
            <textarea
              placeholder="Address"
              value={buyerAddress}
              onChange={(e) => setBuyerAddress(e.target.value)}
              className="min-h-24 w-full border-2 border-primary bg-background p-3 text-sm"
            />
          </fieldset>
        </div>

        <fieldset className="space-y-2">
          <legend className="text-sm font-bold">Supply type</legend>
          <div className="flex flex-wrap gap-4">
            {(
              [
                ["intra", "Within state (CGST + SGST)"],
                ["inter", "Outside state (IGST)"],
              ] as const
            ).map(([value, label]) => (
              <label
                key={value}
                className="flex min-h-11 cursor-pointer items-center gap-2 text-sm font-medium"
              >
                <input
                  type="radio"
                  checked={supplyType === value}
                  onChange={() => setSupplyType(value)}
                  className="h-4 w-4 accent-primary"
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="space-y-3">
          <p className="text-sm font-bold">Line items</p>
          {lines.map((line, index) => (
            <div
              key={line.id}
              className="grid gap-2 border-2 border-primary/15 p-3 sm:grid-cols-6"
            >
              <Input
                placeholder="Description"
                value={line.description}
                onChange={(e) =>
                  setLines((prev) =>
                    prev.map((row, i) =>
                      i === index
                        ? { ...row, description: e.target.value }
                        : row,
                    ),
                  )
                }
                className="h-11 border-2 border-primary sm:col-span-2"
              />
              <Input
                placeholder="HSN"
                value={line.hsn}
                onChange={(e) =>
                  setLines((prev) =>
                    prev.map((row, i) =>
                      i === index ? { ...row, hsn: e.target.value } : row,
                    ),
                  )
                }
                className="h-11 border-2 border-primary"
              />
              <Input
                placeholder="Qty"
                inputMode="decimal"
                value={line.qty}
                onChange={(e) =>
                  setLines((prev) =>
                    prev.map((row, i) =>
                      i === index ? { ...row, qty: e.target.value } : row,
                    ),
                  )
                }
                className="h-11 border-2 border-primary"
              />
              <Input
                placeholder="Rate"
                inputMode="decimal"
                value={line.rate}
                onChange={(e) =>
                  setLines((prev) =>
                    prev.map((row, i) =>
                      i === index ? { ...row, rate: e.target.value } : row,
                    ),
                  )
                }
                className="h-11 border-2 border-primary"
              />
              <select
                value={line.gstPercent}
                onChange={(e) =>
                  setLines((prev) =>
                    prev.map((row, i) =>
                      i === index
                        ? { ...row, gstPercent: e.target.value }
                        : row,
                    ),
                  )
                }
                className="h-11 border-2 border-primary bg-background px-2 text-sm"
              >
                {GST_RATES.map((value) => (
                  <option key={value} value={String(value)}>
                    GST {value}%
                  </option>
                ))}
              </select>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setLines((prev) => [...prev, emptyLine()])}
            className="inline-flex min-h-11 items-center border-2 border-primary px-4 text-small font-bold uppercase tracking-[0.06em] hover:bg-surface-muted"
          >
            Add line
          </button>
        </div>

        <div
          id="invoice-preview"
          className="border-2 border-primary bg-background p-5 print:border-0"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-lg font-bold">{sellerName || "Seller name"}</p>
              <p className="mt-1 whitespace-pre-wrap text-sm text-text-secondary">
                {sellerAddress}
              </p>
              {sellerGstin ? (
                <p className="mt-1 text-sm font-medium">GSTIN: {sellerGstin}</p>
              ) : null}
            </div>
            <div className="text-right text-sm">
              <p className="font-bold">Tax Invoice</p>
              <p>No: {invoiceNumber || "—"}</p>
              <p>Date: {invoiceDate || "—"}</p>
            </div>
          </div>
          <div className="mt-6 border-t border-primary/20 pt-4">
            <p className="text-sm font-bold">Bill to</p>
            <p className="mt-1 font-medium">{buyerName || "Buyer name"}</p>
            <p className="whitespace-pre-wrap text-sm text-text-secondary">
              {buyerAddress}
            </p>
            {buyerGstin ? (
              <p className="text-sm font-medium">GSTIN: {buyerGstin}</p>
            ) : null}
          </div>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[36rem] text-left text-sm">
              <thead>
                <tr className="border-b-2 border-primary">
                  <th className="py-2 pr-2 font-bold">Item</th>
                  <th className="py-2 pr-2 font-bold">HSN</th>
                  <th className="py-2 pr-2 font-bold">Qty</th>
                  <th className="py-2 pr-2 font-bold">Rate</th>
                  <th className="py-2 pr-2 font-bold">Taxable</th>
                  <th className="py-2 font-bold">Total</th>
                </tr>
              </thead>
              <tbody>
                {computed.map(({ line, taxable, gst }) => (
                  <tr key={line.id} className="border-b border-primary/15">
                    <td className="py-2 pr-2">{line.description || "—"}</td>
                    <td className="py-2 pr-2">{line.hsn || "—"}</td>
                    <td className="py-2 pr-2">{line.qty || "—"}</td>
                    <td className="py-2 pr-2">{formatInr(parseNumericInput(line.rate) || 0)}</td>
                    <td className="py-2 pr-2">{formatInr(taxable)}</td>
                    <td className="py-2">{formatInr(gst.totalAmount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <dl className="mt-4 ml-auto max-w-xs space-y-1 text-sm">
            <div className="flex justify-between gap-4">
              <dt>Taxable</dt>
              <dd className="font-bold tabular-nums">
                {formatInr(totals.taxable)}
              </dd>
            </div>
            {supplyType === "intra" ? (
              <>
                <div className="flex justify-between gap-4">
                  <dt>CGST</dt>
                  <dd className="font-bold tabular-nums">
                    {formatInr(totals.cgst)}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt>SGST</dt>
                  <dd className="font-bold tabular-nums">
                    {formatInr(totals.sgst)}
                  </dd>
                </div>
              </>
            ) : (
              <div className="flex justify-between gap-4">
                <dt>IGST</dt>
                <dd className="font-bold tabular-nums">
                  {formatInr(totals.igst)}
                </dd>
              </div>
            )}
            <div className="flex justify-between gap-4 border-t border-primary pt-2 text-base">
              <dt className="font-bold">Grand total</dt>
              <dd className="font-bold tabular-nums">
                {formatInr(totals.total)}
              </dd>
            </div>
          </dl>
        </div>

        {error ? <ToolAlert>{error}</ToolAlert> : null}

        <PrimaryButton type="button" variant="accent" size="lg" onClick={onPrint}>
          Print / save as PDF
        </PrimaryButton>
      </div>
    </ToolPanel>
  );
}
