import { z } from "zod";
import typographyThemesJson from "../../content/config/typography-themes.json";

const typographyPairSchema = z.object({
  id: z.string(),
  label: z.string(),
  status: z.string(),
  description: z.string(),
  displayFamily: z.string(),
  bodyFamily: z.string(),
  displayVar: z.string(),
  bodyVar: z.string(),
  character: z.string(),
});

const typographyThemesFileSchema = z.object({
  note: z.string().optional(),
  defaultPairId: z.string(),
  pairs: z.array(typographyPairSchema).min(1),
});

export type TypographyPair = z.infer<typeof typographyPairSchema>;

export const typographyThemesConfig =
  typographyThemesFileSchema.parse(typographyThemesJson);

export const TYPOGRAPHY_PAIR_STORAGE_KEY = "ecom-gliders-ds-typography-pair";

export function getTypographyPairs(): TypographyPair[] {
  return typographyThemesConfig.pairs;
}

export function getTypographyPairById(id: string): TypographyPair {
  return (
    typographyThemesConfig.pairs.find((pair) => pair.id === id) ??
    typographyThemesConfig.pairs[0]
  );
}

/** Live-preview CSS vars for /design-system (does not change production tokens). */
export function applyTypographyPairToDocument(pair: TypographyPair): void {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.style.setProperty(
    "--font-display",
    `var(${pair.displayVar}), ${pair.displayFamily}, system-ui, sans-serif`,
  );
  root.style.setProperty(
    "--font-sans",
    `var(${pair.bodyVar}), ${pair.bodyFamily}, system-ui, sans-serif`,
  );
  root.dataset.typographyPair = pair.id;
}
