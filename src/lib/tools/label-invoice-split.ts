import { PDFDocument } from "pdf-lib";

export type LabelSplitMode = "odd-labels" | "even-labels" | "all-pages";

/**
 * Amazon bulk shipment PDFs typically alternate label / invoice pages.
 * odd-labels: keep 1,3,5… (0-indexed even)
 * even-labels: keep 2,4,6… (0-indexed odd)
 */
export async function splitLabelInvoicePdf(
  source: ArrayBuffer,
  mode: LabelSplitMode,
): Promise<{ pageCount: number; kept: number; bytes: Uint8Array }> {
  const input = await PDFDocument.load(source);
  const output = await PDFDocument.create();
  const total = input.getPageCount();
  const indices: number[] = [];

  for (let i = 0; i < total; i += 1) {
    if (mode === "all-pages") {
      indices.push(i);
      continue;
    }
    const isOddPageNumber = i % 2 === 0; // page 1 is odd
    if (mode === "odd-labels" && isOddPageNumber) indices.push(i);
    if (mode === "even-labels" && !isOddPageNumber) indices.push(i);
  }

  const copied = await output.copyPages(input, indices);
  for (const page of copied) {
    output.addPage(page);
  }

  const bytes = await output.save();
  return { pageCount: total, kept: indices.length, bytes };
}
