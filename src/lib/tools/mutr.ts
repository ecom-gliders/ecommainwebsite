import {
  findColumnIndex,
  parseAmount,
  parseCsv,
  type CsvTable,
} from "@/lib/tools/csv";

export type MutrSummary = {
  rowCount: number;
  creditTotal: number;
  debitTotal: number;
  netTotal: number;
  tcsTotal: number;
  tdsTotal: number;
  byDescription: Array<{ description: string; amount: number; count: number }>;
};

function amountFromRow(table: CsvTable, row: string[]): number {
  const creditIdx = findColumnIndex(table.headers, [
    "credit",
    "amount credit",
    "credits",
  ]);
  const debitIdx = findColumnIndex(table.headers, [
    "debit",
    "amount debit",
    "debits",
  ]);
  const amountIdx = findColumnIndex(table.headers, [
    "amount",
    "net amount",
    "transaction amount",
    "total",
  ]);

  if (creditIdx >= 0 || debitIdx >= 0) {
    const credit = creditIdx >= 0 ? parseAmount(row[creditIdx]) : 0;
    const debit = debitIdx >= 0 ? parseAmount(row[debitIdx]) : 0;
    return credit - debit;
  }
  if (amountIdx >= 0) return parseAmount(row[amountIdx]);
  return 0;
}

function descriptionFromRow(table: CsvTable, row: string[]): string {
  const idx = findColumnIndex(table.headers, [
    "description",
    "transaction type",
    "transaction description",
    "type",
    "event type",
  ]);
  return idx >= 0 ? (row[idx] ?? "").trim() || "Unspecified" : "Unspecified";
}

export function summarizeMutrCsv(text: string): MutrSummary {
  const table = parseCsv(text);
  let creditTotal = 0;
  let debitTotal = 0;
  let tcsTotal = 0;
  let tdsTotal = 0;
  const byDesc = new Map<string, { amount: number; count: number }>();

  for (const row of table.rows) {
    const amount = amountFromRow(table, row);
    if (amount >= 0) creditTotal += amount;
    else debitTotal += Math.abs(amount);

    const description = descriptionFromRow(table, row);
    const lower = description.toLowerCase();
    if (lower.includes("tcs")) tcsTotal += amount;
    if (lower.includes("tds")) tdsTotal += amount;

    const existing = byDesc.get(description) ?? { amount: 0, count: 0 };
    existing.amount += amount;
    existing.count += 1;
    byDesc.set(description, existing);
  }

  const byDescription = [...byDesc.entries()]
    .map(([description, value]) => ({
      description,
      amount: value.amount,
      count: value.count,
    }))
    .sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount));

  return {
    rowCount: table.rows.length,
    creditTotal,
    debitTotal,
    netTotal: creditTotal - debitTotal,
    tcsTotal,
    tdsTotal,
    byDescription,
  };
}

export function filterTaxRows(text: string): {
  tcs: MutrSummary["byDescription"];
  tds: MutrSummary["byDescription"];
  tcsTotal: number;
  tdsTotal: number;
} {
  const summary = summarizeMutrCsv(text);
  const tcs = summary.byDescription.filter((row) =>
    row.description.toLowerCase().includes("tcs"),
  );
  const tds = summary.byDescription.filter((row) =>
    row.description.toLowerCase().includes("tds"),
  );
  return {
    tcs,
    tds,
    tcsTotal: summary.tcsTotal,
    tdsTotal: summary.tdsTotal,
  };
}
