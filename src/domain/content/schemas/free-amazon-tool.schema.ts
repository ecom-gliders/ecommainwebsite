import { z } from "zod";
import { pageSeoSchema } from "./page-seo.schema";

/** Directory card entry — add a slug here, then add `tools/{slug}.json`. */
export const freeAmazonToolCardSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  badge: z.string().min(1),
});

export const freeAmazonToolsPageConfigSchema = z.object({
  hero: z.object({
    eyebrow: z.string(),
    title: z.string(),
    subtitle: z.string(),
  }),
  intro: z.string(),
  tools: z.array(freeAmazonToolCardSchema).min(1),
  cta: z.object({
    heading: z.string(),
    primaryCta: z.object({
      label: z.string(),
      href: z.string(),
    }),
    secondaryCta: z.object({
      label: z.string(),
      href: z.string(),
    }),
  }),
  seo: pageSeoSchema,
});

const tipBlockSchema = z.object({
  title: z.string(),
  body: z.string(),
});

/**
 * Interactive tool kinds registered in the app.
 * Add a new kind + handler when shipping a new tool page.
 */
export const freeAmazonToolKindSchema = z.enum([
  "fba-fee-profit-calculator",
  "ppc-conversion-cost-calculator",
  "gst-calculator",
  "amazon-pnl-calculator",
  "invoice-generator",
  "product-catalog",
  "label-invoice-splitter",
  "dispatch-check",
  "sku-profitability-leaderboard",
  "returns-rto-diagnostic",
  "monthly-seller-closeout",
  "tcs-tds-reconciliation",
  "ppc-performance-dashboard",
]);

/** Dedicated tool page — one JSON file per tool under content/config/tools/. */
export const freeAmazonToolPageConfigSchema = z.object({
  slug: z.string().min(1),
  badge: z.string().min(1),
  hero: z.object({
    title: z.string(),
    subtitle: z.string(),
  }),
  intro: z.string(),
  toolKind: freeAmazonToolKindSchema,
  instructions: z.array(tipBlockSchema).default([]),
  assumptions: z.array(tipBlockSchema).default([]),
  tips: z.array(tipBlockSchema).default([]),
  cta: z.object({
    heading: z.string(),
    primaryCta: z.object({
      label: z.string(),
      href: z.string(),
    }),
    secondaryCta: z.object({
      label: z.string(),
      href: z.string(),
    }),
  }),
  seo: pageSeoSchema,
});

export type FreeAmazonToolCard = z.infer<typeof freeAmazonToolCardSchema>;
export type FreeAmazonToolsPageConfig = z.infer<
  typeof freeAmazonToolsPageConfigSchema
>;
export type FreeAmazonToolPageConfig = z.infer<
  typeof freeAmazonToolPageConfigSchema
>;
export type FreeAmazonToolKind = z.infer<typeof freeAmazonToolKindSchema>;
