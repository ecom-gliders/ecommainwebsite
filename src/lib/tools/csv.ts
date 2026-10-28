/** Minimal CSV parser for Amazon report exports (handles quoted fields). */

export type CsvTable = {
  headers: string[];
  rows: string[][];
};

export function parseCsv(text: string): CsvTable {
  const normalized = text.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const lines = normalized.split("\n").filter((line) => line.trim().length > 0);
  if (lines.length === 0) {
    return { headers: [], rows: [] };
  }

  const rows = lines.map(parseCsvLine);
  const headers = rows[0].map((header) => header.trim());
  return { headers, rows: rows.slice(1) };
}

function parseCsvLine(line: string): string[] {
  const cells: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (inQuotes) {
      if (char === '"') {
        if (line[i + 1] === '"') {
          current += '"';
          i += 1;
        } else {
          inQuotes = false;
        }
      } else {
        current += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
      continue;
    }
    if (char === ",") {
      cells.push(current);
      current = "";
      continue;
    }
    current += char;
  }
  cells.push(current);
  return cells;
}

export function findColumnIndex(
  headers: string[],
  candidates: string[],
): number {
  const normalized = headers.map((header) =>
    header.trim().toLowerCase().replace(/\s+/g, " "),
  );
  for (const candidate of candidates) {
    const target = candidate.toLowerCase();
    const exact = normalized.findIndex((header) => header === target);
    if (exact >= 0) return exact;
    const partial = normalized.findIndex((header) => header.includes(target));
    if (partial >= 0) return partial;
  }
  return -1;
}

export function parseAmount(value: string | undefined): number {
  if (!value) return 0;
  const cleaned = value.replace(/[^0-9.\-]/g, "").trim();
  const num = Number(cleaned);
  return Number.isFinite(num) ? num : 0;
}

export function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.onerror = () => reject(reader.error ?? new Error("File read failed"));
    reader.readAsText(file);
  });
}

export function readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (!(reader.result instanceof ArrayBuffer)) {
        reject(new Error("Expected ArrayBuffer"));
        return;
      }
      resolve(reader.result);
    };
    reader.onerror = () => reject(reader.error ?? new Error("File read failed"));
    reader.readAsArrayBuffer(file);
  });
}
