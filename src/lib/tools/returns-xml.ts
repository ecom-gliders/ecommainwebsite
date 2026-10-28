export type ReturnsSummary = {
  totalReturns: number;
  byReason: Array<{ reason: string; count: number }>;
  bySku: Array<{ sku: string; count: number }>;
  rtoCount: number;
};

/**
 * Lightweight Amazon Returns Report XML parser.
 * Looks for common item / reason / sku tags without requiring a full XML schema.
 */
export function summarizeReturnsXml(xmlText: string): ReturnsSummary {
  const reasonCounts = new Map<string, number>();
  const skuCounts = new Map<string, number>();
  let totalReturns = 0;
  let rtoCount = 0;

  const itemBlocks =
    xmlText.match(/<(?:item|return|Message|return_details)[^>]*>[\s\S]*?<\/(?:item|return|Message|return_details)>/gi) ??
    [];

  const blocks =
    itemBlocks.length > 0
      ? itemBlocks
      : xmlText.split(/<\/(?:item|return)>/i).filter((chunk) => chunk.trim());

  for (const block of blocks) {
    const reason =
      extractTag(block, [
        "return_reason",
        "ReturnReason",
        "reason",
        "CustomerComments",
        "detailed_disposition",
      ]) || "Unspecified";
    const sku =
      extractTag(block, ["sku", "SellerSKU", "merchant_sku", "MSKU"]) ||
      "Unknown SKU";
    const disposition =
      extractTag(block, [
        "detailed_disposition",
        "status",
        "return_type",
        "fulfillment_center_id",
      ]) || "";

    totalReturns += 1;
    reasonCounts.set(reason, (reasonCounts.get(reason) ?? 0) + 1);
    skuCounts.set(sku, (skuCounts.get(sku) ?? 0) + 1);

    const haystack = `${reason} ${disposition}`.toLowerCase();
    if (
      haystack.includes("rto") ||
      haystack.includes("undeliver") ||
      haystack.includes("return to origin") ||
      haystack.includes("not delivered")
    ) {
      rtoCount += 1;
    }
  }

  // Fallback: count reason-like attributes if block parse failed
  if (totalReturns === 0) {
    const reasonMatches = [
      ...xmlText.matchAll(
        /<(?:return_reason|ReturnReason|reason)[^>]*>([^<]+)</gi,
      ),
    ];
    for (const match of reasonMatches) {
      const reason = match[1].trim() || "Unspecified";
      totalReturns += 1;
      reasonCounts.set(reason, (reasonCounts.get(reason) ?? 0) + 1);
    }
  }

  return {
    totalReturns,
    rtoCount,
    byReason: [...reasonCounts.entries()]
      .map(([reason, count]) => ({ reason, count }))
      .sort((a, b) => b.count - a.count),
    bySku: [...skuCounts.entries()]
      .map(([sku, count]) => ({ sku, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 50),
  };
}

function extractTag(block: string, names: string[]): string | null {
  for (const name of names) {
    const re = new RegExp(`<${name}[^>]*>([^<]*)</${name}>`, "i");
    const match = block.match(re);
    if (match?.[1]?.trim()) return match[1].trim();
  }
  return null;
}
