"use client";

import { useId, useMemo, useState } from "react";
import { PrimaryButton } from "@/components/ui/primary-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ToolAlert,
  ToolPanel,
  ToolResultsPanel,
} from "@/components/tools/tool-panel";
import { GST_RATES } from "@/lib/tools/gst-calculator";
import { calculateAmazonPnl } from "@/lib/tools/amazon-pnl";
import {
  formatInr,
  formatNumber,
  parseNumericInput,
} from "@/lib/tools/format-money";

type FieldKey =
  | "orderRevenue"
  | "referralFeePercent"
  | "fulfillmentFee"
  | "advertisingSpend"
  | "packagingOther"
  | "costOfGoods";

const emptyFields: Record<FieldKey, string> = {
  orderRevenue: "",
  referralFeePercent: "15",
  fulfillmentFee: "",
  advertisingSpend: "0",
  packagingOther: "0",
  costOfGoods: "",
};

export function AmazonPnlCalculator() {
  const formId = useId();
  const [fields, setFields] = useState(emptyFields);
  const [gstRate, setGstRate] = useState("5");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const results = useMemo(() => {
    if (!submitted) return null;
    return calculateAmazonPnl({
      orderRevenue: parseNumericInput(fields.orderRevenue),
      gstRatePercent: parseNumericInput(gstRate),
      referralFeePercent: parseNumericInput(fields.referralFeePercent),
      fulfillmentFee: parseNumericInput(fields.fulfillmentFee) || 0,
      advertisingSpend: parseNumericInput(fields.advertisingSpend) || 0,
      packagingOther: parseNumericInput(fields.packagingOther) || 0,
      costOfGoods: parseNumericInput(fields.costOfGoods) || 0,
    });
  }, [fields, gstRate, submitted]);

  function onCalculate() {
    const revenue = parseNumericInput(fields.orderRevenue);
    const referral = parseNumericInput(fields.referralFeePercent);
    if (!Number.isFinite(revenue) || revenue <= 0) {
      setError("Enter order revenue greater than zero.");
      setSubmitted(false);
      return;
    }
    if (!Number.isFinite(referral) || referral < 0) {
      setError("Enter a valid referral fee percent.");
      setSubmitted(false);
      return;
    }
    setError(null);
    setSubmitted(true);
  }

  return (
    <ToolPanel
      title="Manual entry"
      description="Quick estimate for one order — no file needed."
    >
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            onCalculate();
          }}
        >
          <div>
            <Label htmlFor={`${formId}-revenue`} className="text-sm font-bold">
              Order revenue (INR)
            </Label>
            <Input
              id={`${formId}-revenue`}
              inputMode="decimal"
              value={fields.orderRevenue}
              onChange={(event) =>
                setFields((prev) => ({
                  ...prev,
                  orderRevenue: event.target.value,
                }))
              }
              placeholder="e.g. 999"
              className="mt-2 h-12 border-2 border-primary"
              autoComplete="off"
            />
          </div>

          <div>
            <Label htmlFor={`${formId}-gst`} className="text-sm font-bold">
              GST rate on product
            </Label>
            <select
              id={`${formId}-gst`}
              value={gstRate}
              onChange={(event) => setGstRate(event.target.value)}
              className="mt-2 flex h-12 w-full border-2 border-primary bg-background px-3 text-sm font-medium"
            >
              {GST_RATES.map((value) => (
                <option key={value} value={String(value)}>
                  {value}%
                </option>
              ))}
            </select>
          </div>

          {(
            [
              [
                "referralFeePercent",
                "Referral fee (%)",
                "Category referral percent",
              ],
              [
                "fulfillmentFee",
                "Fulfillment / shipping fee (INR)",
                "FBA fee or Easy Ship handling",
              ],
              [
                "advertisingSpend",
                "Advertising / PPC spend (INR)",
                "Attributed ad cost for this unit",
              ],
              [
                "packagingOther",
                "Packaging and other costs (INR)",
                "Labels, inserts, misc.",
              ],
              [
                "costOfGoods",
                "Product cost / COGS (INR)",
                "Optional — landed cost to source the item",
              ],
            ] as const
          ).map(([key, label, hint]) => (
            <div key={key}>
              <Label htmlFor={`${formId}-${key}`} className="text-sm font-bold">
                {label}
              </Label>
              <p className="mt-1 text-xs font-medium text-text-secondary">
                {hint}
              </p>
              <Input
                id={`${formId}-${key}`}
                inputMode="decimal"
                value={fields[key]}
                onChange={(event) =>
                  setFields((prev) => ({
                    ...prev,
                    [key]: event.target.value,
                  }))
                }
                className="mt-2 h-12 border-2 border-primary"
                autoComplete="off"
              />
            </div>
          ))}

          {error ? <ToolAlert>{error}</ToolAlert> : null}

          <div className="flex flex-wrap gap-3 pt-1">
            <PrimaryButton type="submit" variant="accent" size="lg">
              Calculate
            </PrimaryButton>
            <button
              type="button"
              onClick={() => {
                setFields(emptyFields);
                setGstRate("5");
                setSubmitted(false);
                setError(null);
              }}
              className="inline-flex min-h-12 items-center border-2 border-primary px-5 text-small font-bold uppercase tracking-[0.06em] text-text-primary hover:bg-surface-muted"
            >
              Reset
            </button>
          </div>
        </form>

        <ToolResultsPanel hasResults={Boolean(results)}>
          {results ? (
            <dl className="mt-4 space-y-3">
              {[
                ["Taxable value (ex-GST)", formatInr(results.taxableValue)],
                ["GST collected", formatInr(results.gstAmount)],
                ["Referral fee", formatInr(results.referralFee)],
                ["Fulfillment", formatInr(results.fulfillmentFee)],
                ["Advertising", formatInr(results.advertisingSpend)],
                ["Packaging / other", formatInr(results.packagingOther)],
                ["Total deductions", formatInr(results.totalAmazonFees)],
                ["Net before COGS", formatInr(results.netProceedsBeforeCogs)],
                ["COGS", formatInr(results.costOfGoods)],
                ["Net profit", formatInr(results.netProfit)],
                [
                  "Margin on taxable",
                  results.marginPercent === null
                    ? "—"
                    : `${formatNumber(results.marginPercent)}%`,
                ],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-baseline justify-between gap-4 border-b border-primary/20 pb-2 last:border-b-0"
                >
                  <dt className="text-sm font-medium text-primary/80">
                    {label}
                  </dt>
                  <dd className="text-base font-bold tabular-nums">{value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </ToolResultsPanel>
      </div>
    </ToolPanel>
  );
}
