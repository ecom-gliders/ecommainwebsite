import { z } from "zod";
import colorThemesJson from "../../content/config/color-themes.json";

const themeColorsSchema = z.record(z.string(), z.string());

const colorThemeSchema = z.object({
  id: z.string(),
  label: z.string(),
  description: z.string(),
  colors: themeColorsSchema,
  gradient: z.string(),
  pageAtmosphere: z.string(),
  ctaFill: z.string(),
  beamFrom: z.string(),
  beamTo: z.string(),
});

const colorThemesFileSchema = z.object({
  note: z.string().optional(),
  defaultThemeId: z.string(),
  productionLocked: z.boolean().optional(),
  themes: z.array(colorThemeSchema).min(1),
});

export type ColorTheme = z.infer<typeof colorThemeSchema>;

export const colorThemesConfig = colorThemesFileSchema.parse(colorThemesJson);

export const COLOR_THEME_STORAGE_KEY = "ecom-gliders-ds-color-theme";
export const PRODUCTION_COLOR_THEME_ID = colorThemesConfig.defaultThemeId;

export function getColorThemes(): ColorTheme[] {
  return colorThemesConfig.themes;
}

export function getDefaultColorTheme(): ColorTheme {
  return getColorThemeById(colorThemesConfig.defaultThemeId);
}

export function getColorThemeById(id: string): ColorTheme {
  return (
    colorThemesConfig.themes.find((theme) => theme.id === id) ??
    colorThemesConfig.themes.find(
      (theme) => theme.id === colorThemesConfig.defaultThemeId,
    ) ??
    colorThemesConfig.themes[0]
  );
}

/** CSS custom properties applied when previewing a theme on /design-system */
export function themeToCssVariables(theme: ColorTheme): Record<string, string> {
  const vars: Record<string, string> = {};

  for (const [key, value] of Object.entries(theme.colors)) {
    vars[`--color-${key}`] = value;
  }

  vars["--brand-gradient"] = theme.gradient;
  vars["--brand-page-atmosphere"] = theme.pageAtmosphere;
  vars["--proposed-cta-fill"] = theme.ctaFill;
  vars["--cta-beam-fill"] = theme.ctaFill;
  vars["--beam-from"] = theme.beamFrom;
  vars["--beam-to"] = theme.beamTo;

  return vars;
}

export function applyThemeToDocument(theme: ColorTheme): void {
  if (typeof document === "undefined") return;
  const vars = themeToCssVariables(theme);
  for (const [key, value] of Object.entries(vars)) {
    document.documentElement.style.setProperty(key, value);
  }
  document.documentElement.dataset.colorTheme = theme.id;
}
