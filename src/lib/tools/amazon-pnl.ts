export type AmazonPnlInputs = {
  /** Order revenue as charged to the buyer (typically GST-inclusive). */
  orderRevenue: number;
  gstRatePercent: number;
  referralFeePercent: number;
  fulfillmentFee: number;
  advertisingSpend: number;
  packagingOther: number;
  costOfGoods: number;
};

export type AmazonPnlResults = {
  taxableValue: number;
  gstAmount: number;
  referralFee: number;
  fulfillmentFee: number;
  advertisingSpend: number;
  packagingOther: number;
  costOfGoods: number;
  totalAmazonFees: number;
  netProceedsBeforeCogs: number;
  netProfit: number;
  marginPercent: number | null;
};

/**
 * Single-order Amazon India P&L estimate.
 * Referral fee is applied on taxable (ex-GST) value, matching common Seller Central practice.
 */
export function calculateAmazonPnl(inputs: AmazonPnlInputs): AmazonPnlResults {
  const gstRate = Math.max(0, inputs.gstRatePercent) / 100;
  const taxableValue =
    gstRate > 0 ? inputs.orderRevenue / (1 + gstRate) : inputs.orderRevenue;
  const gstAmount = inputs.orderRevenue - taxableValue;
  const referralFee =
    taxableValue * (Math.max(0, inputs.referralFeePercent) / 100);
  const fulfillmentFee = Math.max(0, inputs.fulfillmentFee);
  const advertisingSpend = Math.max(0, inputs.advertisingSpend);
  const packagingOther = Math.max(0, inputs.packagingOther);
  const costOfGoods = Math.max(0, inputs.costOfGoods);

  const totalAmazonFees =
    referralFee + fulfillmentFee + advertisingSpend + packagingOther;
  const netProceedsBeforeCogs = taxableValue - totalAmazonFees;
  const netProfit = netProceedsBeforeCogs - costOfGoods;
  const marginPercent =
    taxableValue > 0 ? (netProfit / taxableValue) * 100 : null;

  return {
    taxableValue,
    gstAmount,
    referralFee,
    fulfillmentFee,
    advertisingSpend,
    packagingOther,
    costOfGoods,
    totalAmazonFees,
    netProceedsBeforeCogs,
    netProfit,
    marginPercent,
  };
}
