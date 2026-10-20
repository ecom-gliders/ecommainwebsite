import { z } from "zod";
import { designSystem } from "@/lib/design-tokens";
import browserMockupJson from "../../content/config/browser-mockup.json";
import designSystemReviewJson from "../../content/config/design-system-review.json";

const chartPointSchema = z.object({
  label: z.string(),
  value: z.string(),
  raw: z.number(),
});

const tableRowSchema = z.object({
  label: z.string(),
  value: z.string(),
  change: z.string(),
  positive: z.boolean().optional(),
  detail: z.string().optional(),
});

const browserTabSchema = z.object({
  id: z.string(),
  label: z.string(),
  shortLabel: z.string(),
  url: z.string(),
  chartLabel: z.string(),
  stats: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
      progress: z.number(),
    }),
  ),
  chart: z.array(z.number()),
  chartPoints: z.array(chartPointSchema),
  table: z.array(tableRowSchema),
});

export const browserMockupConfigSchema = z.object({
  defaultTabByVariant: z.object({
    macos: z.string(),
    ios: z.string(),
  }),
  previewDescription: z.string(),
  variants: z.record(
    z.string(),
    z.object({
      label: z.string(),
    }),
  ),
  tabs: z.array(browserTabSchema),
});

const reviewSectionSchema = z.object({
  id: z.string(),
  number: z.number(),
  title: z.string(),
  configKey: z.string(),
  usedOn: z.array(z.string()),
});

export const designSystemReviewConfigSchema = z.object({
  header: z.object({
    subtitle: z.string(),
    title: z.string(),
    badge: z.string(),
  }),
  skipLink: z.object({
    label: z.string(),
    target: z.string(),
  }),
  sections: z.array(reviewSectionSchema),
  copy: z.record(z.string(), z.unknown()),
  icons: z.array(
    z.object({
      icon: z.string(),
      label: z.string(),
    }),
  ),
  reviewChecklist: z.object({
    eyebrow: z.string(),
    title: z.string(),
    description: z.string(),
    storageKey: z.string(),
    items: z.array(
      z.object({
        id: z.string(),
        label: z.string(),
        hint: z.string(),
      }),
    ),
  }),
  a11yGuide: z.object({
    title: z.string(),
    subtitle: z.string(),
    steps: z.array(
      z.object({
        title: z.string(),
        detail: z.string(),
      }),
    ),
  }),
  mobileNav: z.object({
    label: z.string(),
    placeholder: z.string(),
  }),
});

export type ChartPoint = z.infer<typeof chartPointSchema>;
export type TableRow = z.infer<typeof tableRowSchema>;
export type BrowserTab = z.infer<typeof browserTabSchema>;
export type BrowserVariant = "ios" | "macos";
export type BrowserMockupConfig = z.infer<typeof browserMockupConfigSchema>;
export type DesignSystemReviewConfig = z.infer<
  typeof designSystemReviewConfigSchema
>;
export type ReviewSection = z.infer<typeof reviewSectionSchema>;

export const browserMockupConfig =
  browserMockupConfigSchema.parse(browserMockupJson);

export const designSystemReviewConfig =
  designSystemReviewConfigSchema.parse(designSystemReviewJson);

export function getBrowserTabs(): BrowserTab[] {
  return browserMockupConfig.tabs;
}

export function getDefaultTabId(variant: BrowserVariant): string {
  return browserMockupConfig.defaultTabByVariant[variant];
}

export function getBrowserTabById(id: string): BrowserTab | undefined {
  return browserMockupConfig.tabs.find((tab) => tab.id === id);
}

export function getReviewSections(): ReviewSection[] {
  return designSystemReviewConfig.sections;
}

export function interpolateTokens(
  template: string,
  tokens: Record<string, string>,
): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => tokens[key] ?? `{${key}}`);
}

export function getColorTokensForCopy(): Record<string, string> {
  return {
    primary: designSystem.colors.primary?.value ?? "",
    accent: designSystem.colors.accent?.value ?? "",
  };
}
