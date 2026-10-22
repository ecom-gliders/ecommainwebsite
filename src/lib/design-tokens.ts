import { z } from "zod";
import designSystemJson from "../../content/config/design-system.json";

const colorTokenSchema = z.object({
  value: z.string(),
  usage: z.string(),
});

const typographyScaleSchema = z.object({
  size: z.string(),
  weight: z.number(),
  lineHeight: z.number(),
});

export const designSystemSchema = z.object({
  brand: z.object({
    name: z.string(),
    tagline: z.string(),
    logo: z.object({
      light: z.string(),
      dark: z.string(),
    }),
    partnerBadge: z.string(),
    gradient: z
      .object({
        value: z.string(),
        usage: z.string(),
      })
      .optional(),
    pageAtmosphere: z
      .object({
        value: z.string(),
        usage: z.string(),
      })
      .optional(),
  }),
  colors: z.record(z.string(), colorTokenSchema),
  typography: z.object({
    fontFamily: z.object({
      sans: z.string(),
      display: z.string(),
      mono: z.string(),
    }),
    scale: z.record(z.string(), typographyScaleSchema),
  }),
  spacing: z.record(z.string(), z.string()),
  radius: z.record(z.string(), z.string()),
  shadows: z.record(z.string(), z.string()),
  components: z.record(z.string(), z.unknown()),
  motion: z.record(z.string(), z.unknown()),
  icons: z.record(z.string(), z.unknown()),
  usage: z.record(z.string(), z.array(z.string())),
  blogEditorial: z.record(z.string(), z.unknown()).optional(),
  accessibility: z.record(z.string(), z.unknown()).optional(),
});

export type DesignSystem = z.infer<typeof designSystemSchema>;
export type ColorToken = z.infer<typeof colorTokenSchema>;

export const designSystem = designSystemSchema.parse(designSystemJson);

export function getColorValue(tokenKey: string): string {
  const token = designSystem.colors[tokenKey];
  if (!token) {
    throw new Error(`Unknown color token: ${tokenKey}`);
  }
  return token.value;
}

export function resolveColorRef(ref: string): string {
  if (ref.startsWith("#")) {
    return ref;
  }
  return getColorValue(ref);
}

export function buildCssVariables(): Record<string, string> {
  const vars: Record<string, string> = {};

  for (const [key, token] of Object.entries(designSystem.colors)) {
    vars[`--color-${key}`] = token.value;
  }

  if (designSystem.brand.gradient?.value) {
    vars["--brand-gradient"] = designSystem.brand.gradient.value;
  }
  if (designSystem.brand.pageAtmosphere?.value) {
    vars["--brand-page-atmosphere"] = designSystem.brand.pageAtmosphere.value;
  }

  /* Soft diagonal fill: top-left primary → bottom-right accent (no hard divider) */
  vars["--proposed-cta-fill"] =
    `linear-gradient(135deg, ${designSystem.colors.primary.value} 0%, ${designSystem.colors.primary.value} 42%, color-mix(in srgb, ${designSystem.colors.primary.value} 55%, ${designSystem.colors.accent.value}) 72%, ${designSystem.colors.accent.value} 100%)`;
  vars["--cta-beam-fill"] = vars["--proposed-cta-fill"];
  vars["--beam-from"] = "#FFFFFF";
  vars["--beam-to"] = designSystem.colors.accent?.value ?? "#C6FD50";

  vars["--font-sans"] = designSystem.typography.fontFamily.sans;
  vars["--font-display"] = designSystem.typography.fontFamily.display;
  vars["--font-mono"] = designSystem.typography.fontFamily.mono;

  for (const [key, value] of Object.entries(designSystem.spacing)) {
    vars[`--space-${key}`] = value;
  }

  for (const [key, value] of Object.entries(designSystem.radius)) {
    vars[`--radius-${key}`] = value;
  }

  for (const [key, value] of Object.entries(designSystem.shadows)) {
    vars[`--shadow-${key}`] = value;
  }

  for (const [key, scale] of Object.entries(designSystem.typography.scale)) {
    vars[`--text-${key}-size`] = scale.size;
    vars[`--text-${key}-weight`] = String(scale.weight);
    vars[`--text-${key}-line-height`] = String(scale.lineHeight);
  }

  const primaryButtonMotion = designSystem.motion.primaryButton as {
    lift?: number;
    duration?: number;
    ease?: [number, number, number, number];
  };
  const cardMotion = designSystem.motion.card as {
    lift?: number;
    duration?: number;
    ease?: [number, number, number, number];
  };

  if (primaryButtonMotion.lift !== undefined) {
    vars["--motion-primary-button-lift"] = `${primaryButtonMotion.lift}px`;
  }
  if (primaryButtonMotion.duration !== undefined) {
    vars["--motion-primary-button-duration"] = `${primaryButtonMotion.duration}ms`;
  }
  if (primaryButtonMotion.ease) {
    vars["--motion-primary-button-ease"] = primaryButtonMotion.ease.join(", ");
  }
  if (cardMotion.lift !== undefined) {
    vars["--motion-card-lift"] = `${cardMotion.lift}px`;
  }
  if (cardMotion.duration !== undefined) {
    vars["--motion-card-duration"] = `${cardMotion.duration}ms`;
  }
  if (cardMotion.ease) {
    vars["--motion-card-ease"] = cardMotion.ease.join(", ");
  }

  return vars;
}

export function cssVariablesToStyle(
  vars: Record<string, string>,
): React.CSSProperties {
  return vars as React.CSSProperties;
}
