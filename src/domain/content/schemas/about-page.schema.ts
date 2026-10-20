import { z } from "zod";
import { pageSeoSchema } from "./page-seo.schema";

export const aboutPageConfigSchema = z.object({
  hero: z.object({
    title: z.string(),
    subtitle: z.string(),
  }),
  story: z.object({
    heading: z.string(),
    paragraphs: z.array(z.string()),
  }),
  stats: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    }),
  ),
  values: z.object({
    heading: z.string(),
    items: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
      }),
    ),
  }),
  approach: z.object({
    heading: z.string(),
    subheading: z.string(),
    steps: z.array(
      z.object({
        number: z.string(),
        title: z.string(),
        description: z.string(),
      }),
    ),
  }),
  team: z.object({
    heading: z.string(),
    subheading: z.string(),
    members: z.array(
      z.object({
        name: z.string(),
        role: z.string(),
        bio: z.string(),
      }),
    ),
  }),
  certifications: z.object({
    heading: z.string(),
    description: z.string(),
  }),
  cta: z.object({
    heading: z.string(),
    subheading: z.string(),
    primaryCta: z.object({
      label: z.string(),
      href: z.string(),
    }),
  }),
  seo: pageSeoSchema,
});

export type AboutPageConfig = z.infer<typeof aboutPageConfigSchema>;
