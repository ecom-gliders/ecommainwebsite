import { z } from "zod";
import { pageSeoSchema } from "./page-seo.schema";

export const faqPageConfigSchema = z.object({
  hero: z.object({
    eyebrow: z.string(),
    title: z.string(),
    subtitle: z.string(),
  }),
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

export type FaqPageConfig = z.infer<typeof faqPageConfigSchema>;
