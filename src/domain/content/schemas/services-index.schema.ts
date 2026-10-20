import { z } from "zod";
import { faqItemSchema } from "./faq.schema";
import { pageSeoSchema } from "./page-seo.schema";

export const servicesIndexLinkSchema = z.object({
  label: z.string(),
  href: z.string(),
});

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
    browser: z
      .object({
        image: z.string(),
        imageAlt: z.string(),
        url: z.string(),
      })
      .optional(),
  }),
  flagship: z.object({
    eyebrow: z.string(),
    heading: z.string(),
    body: z.string(),
    cta: servicesIndexLinkSchema,
  }),
  categories: z.array(servicesIndexCategorySchema).min(1),
  stack: z.object({
    heading: z.string(),
    subheading: z.string(),
    steps: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
      }),
    ),
  }),
  proof: z.object({
    heading: z.string(),
    items: z.array(
      z.object({
        value: z.string(),
        label: z.string(),
      }),
    ),
  }),
  featuredResults: z.object({
    heading: z.string(),
    subheading: z.string(),
    cta: servicesIndexLinkSchema,
    items: z.array(
      z.object({
        metric: z.string(),
        brand: z.string(),
        description: z.string(),
        href: z.string(),
      }),
    ),
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
