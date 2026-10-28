"use client";

import { useId, useMemo, useState } from "react";
import { PrimaryButton } from "@/components/ui/primary-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  calculatePpcConversionCost,
  formatNumber,
  formatUsd,
} from "@/lib/tools/ppc-conversion-cost";
import { cn } from "@/lib/utils";

type FieldKey =
  | "ppcSpend"
  | "sessions"
  | "conversionRatePercent"
  | "salePrice"
  | "amazonFees"
  | "costOfGoods";

const FIELD_META: Array<{
  key: FieldKey;
  label: string;
  hint: string;
  suffix?: string;
}> = [
  {
    key: "ppcSpend",
    label: "PPC spend",
    hint: "Total ad spend for the period",
    suffix: "USD",
  },
  {
    key: "sessions",
    label: "Sessions (clicks)",
    hint: "Clicks attributed to the campaign",
  },
  {
    key: "conversionRatePercent",
    label: "Conversion rate",
    hint: "Orders divided by sessions",
    suffix: "%",
  },
  {
    key: "salePrice",
    label: "Sale price",
    hint: "Price per unit sold",
    suffix: "USD",
  },
  {
    key: "amazonFees",
    label: "Amazon fees",
    hint: "Referral and related fees per unit",
    suffix: "USD",
  },
  {
    key: "costOfGoods",
    label: "Cost of goods sold",
    hint: "Landed product cost per unit",
    suffix: "USD",
  },
];

const emptyFields: Record<FieldKey, string> = {
  ppcSpend: "",
  sessions: "",
  conversionRatePercent: "",
  salePrice: "",
  amazonFees: "",
  costOfGoods: "",
};

function parseField(value: string): number {
  const cleaned = value.replace(/,/g, "").trim();
  if (!cleaned) return Number.NaN;
  return Number(cleaned);
}

export function PpcConversionCostCalculator() {
  const formId = useId();
  const [fields, setFields] = useState(emptyFields);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const results = useMemo(() => {
    if (!submitted) return null;
    return calculatePpcConversionCost({
      ppcSpend: parseField(fields.ppcSpend),
      sessions: parseField(fields.sessions),
      conversionRatePercent: parseField(fields.conversionRatePercent),
      salePrice: parseField(fields.salePrice),
      amazonFees: parseField(fields.amazonFees),
      costOfGoods: parseField(fields.costOfGoods),
    });
  }, [fields, submitted]);

  function onCalculate() {
    const values = FIELD_META.map((field) => parseField(fields[field.key]));
    if (values.some((value) => !Number.isFinite(value) || value < 0)) {
      setError("Enter valid non-negative numbers in every field.");
      setSubmitted(false);
      return;
    }
    if (parseField(fields.sessions) <= 0) {
      setError("Sessions must be greater than zero.");
      setSubmitted(false);
      return;
    }
    if (parseField(fields.conversionRatePercent) <= 0) {
      setError("Conversion rate must be greater than zero.");
      setSubmitted(false);
      return;
    }
    setError(null);
    setSubmitted(true);
  }

  function onReset() {
    setFields(emptyFields);
    setSubmitted(false);
    setError(null);
  }

  function copyResults() {
    if (!results) return;
    const lines = [
      `Cost per PPC session: ${formatUsd(results.costPerSession)}`,
      `Sessions per conversion: ${formatNumber(results.sessionsPerConversion)}`,
      `Cost per conversion: ${formatUsd(results.costPerConversion)}`,
      `Profit per unit: ${formatUsd(results.profitPerUnit)}`,
      `Net profit or loss per unit: ${formatUsd(results.netProfitPerUnit)}`,
    ];
    void navigator.clipboard.writeText(lines.join("\n"));
  }

  return (
    <div className="border-2 border-primary bg-background shadow-[4px_4px_0_0_#131311]">
      <div className="border-b-2 border-primary bg-surface-muted px-4 py-3 sm:px-5">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-text-secondary">
          Calculator
        </p>
        <p className="mt-1 text-sm font-medium text-text-primary">
          Enter campaign and unit economics, then calculate.
        </p>
      </div>

      <div className="grid gap-6 p-4 sm:p-5 lg:grid-cols-2 lg:gap-8">
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
                  {field.suffix ? (
                    <span className="ml-1 font-medium text-text-secondary">
                      ({field.suffix})
                    </span>
                  ) : null}
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

          {error ? (
            <p
              className="border-2 border-primary bg-accent px-3 py-2 text-sm font-bold text-primary"
              role="alert"
            >
              {error}
            </p>
          ) : null}

          <div className="flex flex-wrap gap-3 pt-1">
            <PrimaryButton type="submit" variant="accent" size="lg">
              Calculate
            </PrimaryButton>
            <button
              type="button"
              onClick={onReset}
              className="inline-flex min-h-12 items-center border-2 border-primary px-5 text-small font-bold uppercase tracking-[0.06em] text-text-primary hover:bg-surface-muted"
            >
              Reset
            </button>
          </div>
        </form>

        <div
          className="border-2 border-primary bg-accent p-4 text-primary sm:p-5"
          aria-live="polite"
        >
          <p className="text-xs font-bold uppercase tracking-[0.12em]">
            Results
          </p>
          {!results ? (
            <p className="mt-4 text-sm font-medium text-primary/75">
              Results appear here after you calculate.
            </p>
          ) : (
            <>
              <dl className="mt-4 space-y-3">
                {[
                  ["Cost per PPC session", formatUsd(results.costPerSession)],
                  [
                    "Sessions per conversion",
                    formatNumber(results.sessionsPerConversion),
                  ],
                  ["Cost per conversion", formatUsd(results.costPerConversion)],
                  ["Profit per unit", formatUsd(results.profitPerUnit)],
                  [
                    "Net profit or loss per unit",
                    formatUsd(results.netProfitPerUnit),
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
                        label.startsWith("Net") &&
                          results.netProfitPerUnit !== null &&
                          results.netProfitPerUnit < 0
                          ? "text-primary"
                          : "text-primary",
                      )}
                    >
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
              <button
                type="button"
                onClick={copyResults}
                className="mt-5 inline-flex min-h-11 items-center border-2 border-primary bg-background px-4 text-small font-bold uppercase tracking-[0.06em] text-primary hover:bg-surface-muted"
              >
                Copy results
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
