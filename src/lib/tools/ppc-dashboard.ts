import {
  findColumnIndex,
  parseAmount,
  parseCsv,
} from "@/lib/tools/csv";

export type PpcTermRow = {
  term: string;
  spend: number;
  sales: number;
  orders: number;
  clicks: number;
  acos: number | null;
};

export type PpcDashboardSummary = {
  rows: PpcTermRow[];
  totalSpend: number;
  totalSales: number;
  wastedSpend: number;
  zeroConversionTerms: number;
};

export function analyzePpcSearchTerms(csvText: string): PpcDashboardSummary {
  const table = parseCsv(csvText);
  const termIdx = findColumnIndex(table.headers, [
    "customer search term",
    "search term",
    "keyword",
    "targeting",
  ]);
  const spendIdx = findColumnIndex(table.headers, [
    "spend",
    "cost",
    "ad spend",
  ]);
  const salesIdx = findColumnIndex(table.headers, [
    "7 day total sales",
    "14 day total sales",
    "sales",
    "attributed sales",
  ]);
  const ordersIdx = findColumnIndex(table.headers, [
    "7 day total orders",
    "14 day total orders",
    "orders",
    "purchases",
  ]);
  const clicksIdx = findColumnIndex(table.headers, ["clicks", "click"]);

  if (termIdx < 0 || spendIdx < 0) {
    throw new Error(
      "CSV needs a search term (or keyword) column and a spend column.",
    );
  }

  const rows: PpcTermRow[] = [];
  for (const row of table.rows) {
    const term = (row[termIdx] ?? "").trim();
    if (!term) continue;
    const spend = parseAmount(row[spendIdx]);
    const sales = salesIdx >= 0 ? parseAmount(row[salesIdx]) : 0;
    const orders = ordersIdx >= 0 ? parseAmount(row[ordersIdx]) : 0;
    const clicks = clicksIdx >= 0 ? parseAmount(row[clicksIdx]) : 0;
    const acos = sales > 0 ? (spend / sales) * 100 : spend > 0 ? null : 0;
    rows.push({ term, spend, sales, orders, clicks, acos });
  }

  rows.sort((a, b) => b.spend - a.spend);
  const totalSpend = rows.reduce((sum, row) => sum + row.spend, 0);
  const totalSales = rows.reduce((sum, row) => sum + row.sales, 0);
  const wasteRows = rows.filter((row) => row.spend > 0 && row.orders === 0);
  const wastedSpend = wasteRows.reduce((sum, row) => sum + row.spend, 0);

  return {
    rows,
    totalSpend,
    totalSales,
    wastedSpend,
    zeroConversionTerms: wasteRows.length,
  };
}
