interface BlogFormulaProps {
  expression: string;
  note?: string;
}

export function BlogFormula({ expression, note }: BlogFormulaProps) {
  if (!expression) return null;

  return (
    <div className="my-8 border-2 border-primary bg-primary px-5 py-4 text-text-on-dark shadow-[3px_3px_0_0_#131311]">
      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-accent">
        Formula
      </p>
      <p className="mt-2 font-mono text-lg font-semibold tracking-tight md:text-xl">
        {expression}
      </p>
      {note ? (
        <p className="mt-2 text-small text-text-on-dark/75">{note}</p>
      ) : null}
    </div>
  );
}

/** Body: expression line, optional note after blank or `note:` */
export function parseFormulaBody(body: string): {
  expression: string;
  note?: string;
} {
  const lines = body.split("\n").map((l) => l.trim()).filter(Boolean);
  if (lines.length === 0) return { expression: "" };
  const noteLine = lines.find((l) => /^note:\s*/i.test(l));
  const expression = lines.find((l) => l !== noteLine) ?? "";
  return {
    expression,
    note: noteLine?.replace(/^note:\s*/i, ""),
  };
}
