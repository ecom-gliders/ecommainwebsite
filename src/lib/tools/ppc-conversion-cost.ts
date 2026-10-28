export type PpcConversionCostInputs = {
  ppcSpend: number;
  sessions: number;
  conversionRatePercent: number;
  salePrice: number;
  amazonFees: number;
  costOfGoods: number;
};

export type PpcConversionCostResults = {
  costPerSession: number | null;
  sessionsPerConversion: number | null;
  costPerConversion: number | null;
  profitPerUnit: number;
  netProfitPerUnit: number | null;
};

function isPositive(value: number): boolean {
  return Number.isFinite(value) && value > 0;
}

/**
 * Unit-economics helpers for the PPC conversion cost calculator.
 * Returns null for ratios that would divide by zero.
 */
export function calculatePpcConversionCost(
  inputs: PpcConversionCostInputs,
): PpcConversionCostResults {
  const {
    ppcSpend,
    sessions,
    conversionRatePercent,
    salePrice,
    amazonFees,
    costOfGoods,
  } = inputs;

  const costPerSession = isPositive(sessions) ? ppcSpend / sessions : null;
  const sessionsPerConversion = isPositive(conversionRatePercent)
    ? 100 / conversionRatePercent
    : null;

  let costPerConversion: number | null = null;
  if (costPerSession !== null && sessionsPerConversion !== null) {
    costPerConversion = costPerSession * sessionsPerConversion;
  } else if (isPositive(sessions) && isPositive(conversionRatePercent)) {
    const conversions = sessions * (conversionRatePercent / 100);
    costPerConversion = isPositive(conversions) ? ppcSpend / conversions : null;
  }

  const profitPerUnit = salePrice - amazonFees - costOfGoods;
  const netProfitPerUnit =
    costPerConversion === null ? null : profitPerUnit - costPerConversion;

  return {
    costPerSession,
    sessionsPerConversion,
    costPerConversion,
    profitPerUnit,
    netProfitPerUnit,
  };
}

export function formatUsd(value: number | null): string {
  if (value === null || !Number.isFinite(value)) {
    return "—";
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatNumber(value: number | null, digits = 2): string {
  if (value === null || !Number.isFinite(value)) {
    return "—";
  }
  return value.toFixed(digits);
}
