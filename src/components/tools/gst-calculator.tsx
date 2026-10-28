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
import {
  GST_RATES,
  calculateGst,
  type GstMode,
  type GstSupplyType,
} from "@/lib/tools/gst-calculator";
import { formatInr, parseNumericInput } from "@/lib/tools/format-money";

export function GstCalculator() {
  const formId = useId();
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("18");
  const [mode, setMode] = useState<GstMode>("exclusive");
  const [supplyType, setSupplyType] = useState<GstSupplyType>("intra");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const results = useMemo(() => {
    if (!submitted) return null;
    return calculateGst({
      amount: parseNumericInput(amount),
      ratePercent: parseNumericInput(rate),
      mode,
      supplyType,
    });
  }, [amount, rate, mode, supplyType, submitted]);

  function onCalculate() {
    const parsedAmount = parseNumericInput(amount);
    const parsedRate = parseNumericInput(rate);
    if (!Number.isFinite(parsedAmount) || parsedAmount < 0) {
      setError("Enter a valid non-negative amount.");
      setSubmitted(false);
      return;
    }
    if (!Number.isFinite(parsedRate) || parsedRate < 0) {
      setError("Select a valid GST rate.");
      setSubmitted(false);
      return;
    }
    setError(null);
    setSubmitted(true);
  }

  return (
    <ToolPanel
      title="Calculator"
      description="Work out GST on a single amount — no file needed."
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
            <Label htmlFor={`${formId}-amount`} className="text-sm font-bold">
              Amount (INR)
            </Label>
            <Input
              id={`${formId}-amount`}
              inputMode="decimal"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              placeholder="e.g. 1000"
              className="mt-2 h-12 border-2 border-primary"
              autoComplete="off"
            />
          </div>

          <div>
            <Label htmlFor={`${formId}-rate`} className="text-sm font-bold">
              GST rate
            </Label>
            <select
              id={`${formId}-rate`}
              value={rate}
              onChange={(event) => setRate(event.target.value)}
              className="mt-2 flex h-12 w-full border-2 border-primary bg-background px-3 text-sm font-medium"
            >
              {GST_RATES.map((value) => (
                <option key={value} value={String(value)}>
                  {value}%
                </option>
              ))}
            </select>
          </div>

          <fieldset className="space-y-2">
            <legend className="text-sm font-bold">This amount is</legend>
            {(
              [
                ["exclusive", "Exclusive of GST (add GST)"],
                ["inclusive", "Inclusive of GST (remove GST)"],
              ] as const
            ).map(([value, label]) => (
              <label
                key={value}
                className="flex min-h-11 cursor-pointer items-center gap-2 text-sm font-medium"
              >
                <input
                  type="radio"
                  name={`${formId}-mode`}
                  checked={mode === value}
                  onChange={() => setMode(value)}
                  className="h-4 w-4 accent-primary"
                />
                {label}
              </label>
            ))}
          </fieldset>

          <fieldset className="space-y-2">
            <legend className="text-sm font-bold">Supply type</legend>
            {(
              [
                ["intra", "Within your state (CGST + SGST)"],
                ["inter", "Outside your state (IGST)"],
              ] as const
            ).map(([value, label]) => (
              <label
                key={value}
                className="flex min-h-11 cursor-pointer items-center gap-2 text-sm font-medium"
              >
                <input
                  type="radio"
                  name={`${formId}-supply`}
                  checked={supplyType === value}
                  onChange={() => setSupplyType(value)}
                  className="h-4 w-4 accent-primary"
                />
                {label}
              </label>
            ))}
          </fieldset>

          {error ? <ToolAlert>{error}</ToolAlert> : null}

          <div className="flex flex-wrap gap-3 pt-1">
            <PrimaryButton type="submit" variant="accent" size="lg">
              Calculate
            </PrimaryButton>
            <button
              type="button"
              onClick={() => {
                setAmount("");
                setRate("18");
                setMode("exclusive");
                setSupplyType("intra");
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
                ["Taxable value", formatInr(results.taxableValue)],
                ["GST amount", formatInr(results.gstAmount)],
                ["CGST", formatInr(results.cgst)],
                ["SGST", formatInr(results.sgst)],
                ["IGST", formatInr(results.igst)],
                ["Total amount", formatInr(results.totalAmount)],
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
