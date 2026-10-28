import {
  findColumnIndex,
  parseAmount,
  parseCsv,
} from "@/lib/tools/csv";

export type SkuProfitRow = {
  sku: string;
  proceeds: number;
  units?: number;
};

export function rankSkuProfitability(csvText: string): {
  rows: SkuProfitRow[];
  totalProceeds: number;
} {
  const table = parseCsv(csvText);
  const skuIdx = findColumnIndex(table.headers, [
    "sku",
    "seller sku",
    "msku",
    "asin",
    "product",
  ]);
  const proceedsIdx = findColumnIndex(table.headers, [
    "net proceeds",
    "proceeds",
    "net",
    "amount",
    "profit",
    "contribution",
  ]);
  const unitsIdx = findColumnIndex(table.headers, [
    "units",
    "quantity",
    "qty",
    "unit count",
  ]);

  if (skuIdx < 0 || proceedsIdx < 0) {
    throw new Error(
      "CSV needs a SKU column and a net proceeds (or amount) column.",
    );
  }

  const aggregated = new Map<string, SkuProfitRow>();
  for (const row of table.rows) {
    const sku = (row[skuIdx] ?? "").trim();
    if (!sku) continue;
    const proceeds = parseAmount(row[proceedsIdx]);
    const units = unitsIdx >= 0 ? parseAmount(row[unitsIdx]) : undefined;
    const existing = aggregated.get(sku) ?? { sku, proceeds: 0, units: 0 };
    existing.proceeds += proceeds;
    if (units !== undefined) {
      existing.units = (existing.units ?? 0) + units;
    }
    aggregated.set(sku, existing);
  }

  const rows = [...aggregated.values()].sort(
    (a, b) => b.proceeds - a.proceeds,
  );
  const totalProceeds = rows.reduce((sum, row) => sum + row.proceeds, 0);
  return { rows, totalProceeds };
}
