import { z } from "zod";
import { faqItemSchema } from "./faq.schema";
import { pageSeoSchema } from "./page-seo.schema";

export const servicesIndexLinkSchema = z.object({
  label: z.string(),
  href: z.string(),
});

export const servicesIndexTrustItemSchema = z.object({
  value: z.string(),
  label: z.string(),
});

export const servicesIndexAudienceItemSchema = z.object({
  title: z.string(),
  points: z.array(z.string()).min(1).max(4),
});

export const servicesIndexCapabilityItemSchema = z.object({
  number: z.string(),
  title: z.string(),
  description: z.string(),
  href: z.string(),
});

export const servicesIndexAlsoAvailableItemSchema = z.object({
  title: z.string(),
  description: z.string(),
  href: z.string(),
});

export const servicesIndexResultItemSchema = z.object({
  metric: z.string(),
  metricUnit: z.string().optional(),
  brand: z.string(),
  description: z.string(),
  href: z.string(),
});

/** @deprecated Kept optional for migration; hub no longer renders category grids. */
export const servicesIndexServiceCardSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  href: z.string(),
  icon: z.string().optional(),
  featured: z.boolean().optional(),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
});

/** @deprecated */
export const servicesIndexCategorySchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  services: z.array(servicesIndexServiceCardSchema).min(1),
});

export const servicesIndexConfigSchema = z.object({
  hero: z.object({
    title: z.string(),
    subtitle: z.string(),
    primaryCta: servicesIndexLinkSchema,
    secondaryCta: servicesIndexLinkSchema.optional(),
    trustStrip: z.array(servicesIndexTrustItemSchema).min(2).max(6),
    browser: z
      .object({
        image: z.string(),
        imageAlt: z.string(),
        url: z.string(),
      })
      .optional(),
  }),
  audience: z.object({
    heading: z.string(),
    items: z.array(servicesIndexAudienceItemSchema).min(2).max(4),
  }),
  flagship: z.object({
    eyebrow: z.string(),
    heading: z.string(),
    body: z.string(),
    bullets: z.array(z.string()).min(2).max(5),
    cta: servicesIndexLinkSchema,
  }),
  capabilityRail: z.object({
    heading: z.string(),
    subheading: z.string(),
    items: z.array(servicesIndexCapabilityItemSchema).min(4).max(12),
  }),
  focusedPaths: z.array(servicesIndexLinkSchema).min(1).max(6),
  engagement: z.object({
    heading: z.string(),
    steps: z
      .array(
        z.object({
          title: z.string(),
          description: z.string(),
        }),
      )
      .min(3)
      .max(4),
  }),
  results: z.object({
    heading: z.string(),
    subheading: z.string().optional(),
    cta: servicesIndexLinkSchema,
    items: z.array(servicesIndexResultItemSchema).min(2).max(4),
  }),
  alsoAvailable: z.object({
    heading: z.string(),
    subheading: z.string().optional(),
    items: z.array(servicesIndexAlsoAvailableItemSchema).min(1),
  }),
  faq: z.array(faqItemSchema).min(1),
  cta: z.object({
    heading: z.string(),
    subheading: z.string(),
    button: servicesIndexLinkSchema,
  }),
  seo: pageSeoSchema,
});

export type ServicesIndexConfig = z.infer<typeof servicesIndexConfigSchema>;
export type ServicesIndexCategory = z.infer<typeof servicesIndexCategorySchema>;
export type ServicesIndexServiceCard = z.infer<
  typeof servicesIndexServiceCardSchema
>;
