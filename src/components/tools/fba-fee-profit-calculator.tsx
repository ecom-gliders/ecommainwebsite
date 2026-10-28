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
import { calculateFbaFeeProfit } from "@/lib/tools/fba-fee-profit";
import {
  formatNumber,
  formatUsd,
  parseNumericInput,
} from "@/lib/tools/format-money";
import { cn } from "@/lib/utils";

type FieldKey =
  | "salePrice"
  | "costOfGoods"
  | "referralFeePercent"
  | "fbaFulfillmentFee"
  | "otherAmazonFees"
  | "inboundShipping"
  | "advertisingPerUnit"
  | "otherCosts";

const FIELD_META: Array<{
  key: FieldKey;
  label: string;
  hint: string;
  suffix: string;
}> = [
  {
    key: "salePrice",
    label: "Sale price",
    hint: "Customer-facing price per unit",
    suffix: "USD",
  },
  {
    key: "costOfGoods",
    label: "Product cost (COGS)",
    hint: "Landed manufacturing or wholesale cost per unit",
    suffix: "USD",
  },
  {
    key: "referralFeePercent",
    label: "Referral fee",
    hint: "Category percent from Seller Central fee schedule — enter your estimate",
    suffix: "%",
  },
  {
    key: "fbaFulfillmentFee",
    label: "FBA fulfillment fee",
    hint: "Pick, pack, and weight fee per unit from your fee preview",
    suffix: "USD",
  },
  {
    key: "otherAmazonFees",
    label: "Other Amazon fees",
    hint: "Storage, closing, or other Amazon charges allocated per unit",
    suffix: "USD",
  },
  {
    key: "inboundShipping",
    label: "Inbound shipping / prep",
    hint: "Cost to get inventory into FBA, allocated per unit",
    suffix: "USD",
  },
  {
    key: "advertisingPerUnit",
    label: "Advertising per unit",
    hint: "PPC or other ad cost attributed to one unit sold",
    suffix: "USD",
  },
  {
    key: "otherCosts",
    label: "Other costs",
    hint: "Packaging, inserts, returns reserve, misc.",
    suffix: "USD",
  },
];

const emptyFields: Record<FieldKey, string> = {
  salePrice: "",
  costOfGoods: "",
  referralFeePercent: "15",
  fbaFulfillmentFee: "",
  otherAmazonFees: "0",
  inboundShipping: "0",
  advertisingPerUnit: "0",
  otherCosts: "0",
};

export function FbaFeeProfitCalculator() {
  const formId = useId();
  const [fields, setFields] = useState(emptyFields);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const results = useMemo(() => {
    if (!submitted) return null;
    return calculateFbaFeeProfit({
      salePrice: parseNumericInput(fields.salePrice),
      costOfGoods: parseNumericInput(fields.costOfGoods) || 0,
      referralFeePercent: parseNumericInput(fields.referralFeePercent) || 0,
      fbaFulfillmentFee: parseNumericInput(fields.fbaFulfillmentFee) || 0,
      otherAmazonFees: parseNumericInput(fields.otherAmazonFees) || 0,
      inboundShipping: parseNumericInput(fields.inboundShipping) || 0,
      advertisingPerUnit: parseNumericInput(fields.advertisingPerUnit) || 0,
      otherCosts: parseNumericInput(fields.otherCosts) || 0,
    });
  }, [fields, submitted]);

  function onCalculate() {
    const salePrice = parseNumericInput(fields.salePrice);
    const referral = parseNumericInput(fields.referralFeePercent);
    if (!Number.isFinite(salePrice) || salePrice <= 0) {
      setError("Enter a sale price greater than zero.");
      setSubmitted(false);
      return;
    }
    if (!Number.isFinite(referral) || referral < 0 || referral >= 100) {
      setError("Enter a referral fee percent between 0 and 99.99.");
      setSubmitted(false);
      return;
    }
    const optionalKeys: FieldKey[] = [
      "costOfGoods",
      "fbaFulfillmentFee",
      "otherAmazonFees",
      "inboundShipping",
      "advertisingPerUnit",
      "otherCosts",
    ];
    for (const key of optionalKeys) {
      const value = parseNumericInput(fields[key]);
      if (fields[key].trim() !== "" && (!Number.isFinite(value) || value < 0)) {
        setError("All cost fields must be valid non-negative numbers.");
        setSubmitted(false);
        return;
      }
    }
    setError(null);
    setSubmitted(true);
  }

  function copyResults() {
    if (!results) return;
    const lines = [
      `Referral fee: ${formatUsd(results.referralFeeAmount)}`,
      `Total Amazon fees: ${formatUsd(results.totalAmazonFees)}`,
      `Total seller costs: ${formatUsd(results.totalSellerCosts)}`,
      `Total costs and fees: ${formatUsd(results.totalCostsAndFees)}`,
      `Profit per unit: ${formatUsd(results.profitPerUnit)}`,
      `Margin: ${
        results.marginPercent === null
          ? "—"
          : `${formatNumber(results.marginPercent)}%`
      }`,
      `Break-even sale price: ${formatUsd(results.breakEvenSalePrice)}`,
    ];
    void navigator.clipboard.writeText(lines.join("\n"));
  }

  return (
    <ToolPanel
      title="FBA fee and profit"
      description="Enter your own fee estimates from Seller Central. Results are estimates only — not official Amazon figures."
    >
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            onCalculate();
          }}
        >
          {FIELD_META.map((field) => {
            const inputId = `${formId}-${field.key}`;
            return (
              <div key={field.key}>
                <Label htmlFor={inputId} className="text-sm font-bold">
                  {field.label}
                  <span className="ml-1 font-medium text-text-secondary">
                    ({field.suffix})
                  </span>
                </Label>
                <p className="mt-1 text-xs font-medium text-text-secondary">
                  {field.hint}
                </p>
                <Input
                  id={inputId}
                  inputMode="decimal"
                  value={fields[field.key]}
                  onChange={(event) =>
                    setFields((prev) => ({
                      ...prev,
                      [field.key]: event.target.value,
                    }))
                  }
                  className="mt-2 h-12 border-2 border-primary"
                  autoComplete="off"
                />
              </div>
            );
          })}

          {error ? <ToolAlert>{error}</ToolAlert> : null}

          <div className="flex flex-wrap gap-3 pt-1">
            <PrimaryButton type="submit" variant="accent" size="lg">
              Calculate
            </PrimaryButton>
            <button
              type="button"
              onClick={() => {
                setFields(emptyFields);
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
            <>
              <dl className="mt-4 space-y-3">
                {[
                  ["Referral fee (estimated)", formatUsd(results.referralFeeAmount)],
                  ["Total Amazon fees", formatUsd(results.totalAmazonFees)],
                  ["Total seller costs", formatUsd(results.totalSellerCosts)],
                  [
                    "Total costs and fees",
                    formatUsd(results.totalCostsAndFees),
                  ],
                  ["Profit per unit", formatUsd(results.profitPerUnit)],
                  [
                    "Margin on sale price",
                    results.marginPercent === null
                      ? "—"
                      : `${formatNumber(results.marginPercent)}%`,
                  ],
                  [
                    "Break-even sale price",
                    formatUsd(results.breakEvenSalePrice),
                  ],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-baseline justify-between gap-4 border-b border-primary/20 pb-2 last:border-b-0"
                  >
                    <dt className="text-sm font-medium text-primary/80">
                      {label}
                    </dt>
                    <dd
                      className={cn(
                        "text-base font-bold tabular-nums",
                        label === "Profit per unit" &&
                          results.profitPerUnit < 0
                          ? "text-primary"
                          : "text-primary",
                      )}
                    >
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-xs font-medium leading-relaxed text-primary/75">
                Estimates use the numbers you entered. Amazon fee schedules
                change by category, size tier, and marketplace — verify in
                Seller Central before pricing decisions.
              </p>
              <button
                type="button"
                onClick={copyResults}
                className="mt-4 inline-flex min-h-11 items-center border-2 border-primary bg-background px-4 text-small font-bold uppercase tracking-[0.06em] text-primary hover:bg-surface-muted"
              >
                Copy results
              </button>
            </>
          ) : null}
        </ToolResultsPanel>
      </div>
    </ToolPanel>
  );
}
