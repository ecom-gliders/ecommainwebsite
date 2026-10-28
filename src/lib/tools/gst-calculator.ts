export const GST_RATES = [0, 3, 5, 12, 18, 28] as const;

export type GstMode = "exclusive" | "inclusive";
export type GstSupplyType = "intra" | "inter";

export type GstCalculatorInputs = {
  amount: number;
  ratePercent: number;
  mode: GstMode;
  supplyType: GstSupplyType;
};

export type GstCalculatorResults = {
  taxableValue: number;
  gstAmount: number;
  cgst: number;
  sgst: number;
  igst: number;
  totalAmount: number;
};

/**
 * India GST add/remove math with CGST+SGST or IGST split.
 * Exclusive: amount is taxable value; GST is added.
 * Inclusive: amount already includes GST; taxable is backed out.
 */
export function calculateGst(inputs: GstCalculatorInputs): GstCalculatorResults {
  const rate = Math.max(0, inputs.ratePercent) / 100;
  let taxableValue: number;
  let gstAmount: number;
  let totalAmount: number;

  if (inputs.mode === "exclusive") {
    taxableValue = inputs.amount;
    gstAmount = taxableValue * rate;
    totalAmount = taxableValue + gstAmount;
  } else {
    totalAmount = inputs.amount;
    taxableValue = rate > 0 ? totalAmount / (1 + rate) : totalAmount;
    gstAmount = totalAmount - taxableValue;
  }

  const half = gstAmount / 2;
  const isIntra = inputs.supplyType === "intra";

  return {
    taxableValue,
    gstAmount,
    cgst: isIntra ? half : 0,
    sgst: isIntra ? half : 0,
    igst: isIntra ? 0 : gstAmount,
    totalAmount,
  };
}
