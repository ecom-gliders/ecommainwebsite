export type FbaFeeProfitInputs = {
  salePrice: number;
  costOfGoods: number;
  /** Referral fee as a percent of sale price (seller-provided estimate). */
  referralFeePercent: number;
  /** FBA pick/pack/weight fee per unit (seller-provided). */
  fbaFulfillmentFee: number;
  /** Storage, long-term storage, or other Amazon fees allocated per unit. */
  otherAmazonFees: number;
  /** Inbound shipping / prep cost allocated per unit. */
  inboundShipping: number;
  /** Advertising cost allocated per unit sold. */
  advertisingPerUnit: number;
  /** Packaging, inserts, returns reserve, misc. */
  otherCosts: number;
};

export type FbaFeeProfitResults = {
  referralFeeAmount: number;
  totalAmazonFees: number;
  totalSellerCosts: number;
  totalCostsAndFees: number;
  profitPerUnit: number;
  marginPercent: number | null;
  /** Sale price needed for zero profit at current cost structure (excl. changing referral %). */
  breakEvenSalePrice: number | null;
};

/**
 * Unit economics for FBA using seller-entered fee estimates only.
 * Does not embed live Amazon fee schedules.
 */
export function calculateFbaFeeProfit(
  inputs: FbaFeeProfitInputs,
): FbaFeeProfitResults {
  const salePrice = Math.max(0, inputs.salePrice);
  const referralFeeAmount =
    salePrice * (Math.max(0, inputs.referralFeePercent) / 100);
  const fbaFulfillmentFee = Math.max(0, inputs.fbaFulfillmentFee);
  const otherAmazonFees = Math.max(0, inputs.otherAmazonFees);
  const inboundShipping = Math.max(0, inputs.inboundShipping);
  const advertisingPerUnit = Math.max(0, inputs.advertisingPerUnit);
  const otherCosts = Math.max(0, inputs.otherCosts);
  const costOfGoods = Math.max(0, inputs.costOfGoods);

  const totalAmazonFees =
    referralFeeAmount + fbaFulfillmentFee + otherAmazonFees;
  const totalSellerCosts =
    costOfGoods + inboundShipping + advertisingPerUnit + otherCosts;
  const totalCostsAndFees = totalAmazonFees + totalSellerCosts;
  const profitPerUnit = salePrice - totalCostsAndFees;
  const marginPercent =
    salePrice > 0 ? (profitPerUnit / salePrice) * 100 : null;

  const fixedNonReferral =
    fbaFulfillmentFee +
    otherAmazonFees +
    inboundShipping +
    advertisingPerUnit +
    otherCosts +
    costOfGoods;
  const referralRate = Math.max(0, inputs.referralFeePercent) / 100;
  let breakEvenSalePrice: number | null = null;
  if (referralRate < 1) {
    breakEvenSalePrice = fixedNonReferral / (1 - referralRate);
  }

  return {
    referralFeeAmount,
    totalAmazonFees,
    totalSellerCosts,
    totalCostsAndFees,
    profitPerUnit,
    marginPercent,
    breakEvenSalePrice,
  };
}
