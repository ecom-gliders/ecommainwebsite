import type { SanitizePlugin } from "@/lib/blog/blocks/sanitize/types";

const STEP_HEADING =
  /^(#{2,6})\s+(?:\d+️⃣|[0-9]+[.)]|Step\s+\d+[:.)]?)\s*(.+)$/i;

/**
 * Convert consecutive numbered emoji/step headings + blurbs into ```steps.
 */
export const convertNumberedSteps: SanitizePlugin = (content) => {
  const lines = content.split("\n");
  const out: string[] = [];
  const transforms: { id: string; detail?: string }[] = [];
  let i = 0;

  while (i < lines.length) {
    const match = lines[i].match(STEP_HEADING);
    if (!match) {
      out.push(lines[i]);
      i += 1;
      continue;
    }

    const steps: Array<{ title: string; description: string }> = [];
    let j = i;

    while (j < lines.length) {
      const stepMatch = lines[j].match(STEP_HEADING);
      if (!stepMatch) break;

      const title = stepMatch[2].replace(/^\*\*|\*\*$/g, "").trim();
      j += 1;
      while (j < lines.length && !lines[j].trim()) j += 1;

      const descParts: string[] = [];
      while (
        j < lines.length &&
        lines[j].trim() &&
        !STEP_HEADING.test(lines[j]) &&
        !/^#{2,6}\s/.test(lines[j]) &&
        !lines[j].trim().startsWith("```")
      ) {
        descParts.push(lines[j].trim());
        j += 1;
      }
      while (j < lines.length && !lines[j].trim()) j += 1;

      steps.push({
        title,
        description: descParts.join(" ").trim(),
      });
    }

    if (steps.length >= 2) {
      out.push("");
      out.push("```steps");
      for (const step of steps) {
        const desc = step.description
          ? ` | ${step.description.replace(/\s*\|\s*/g, " / ")}`
          : "";
        out.push(`${step.title.replace(/\s*\|\s*/g, " / ")}${desc}`);
      }
      out.push("```");
      out.push("");
      transforms.push({ id: "stepsList", detail: `${steps.length}` });
      i = j;
      continue;
    }

    out.push(lines[i]);
    i += 1;
  }

  return { content: out.join("\n"), transforms };
};
