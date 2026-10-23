import { z } from "zod";
import { pageSeoSchema } from "./page-seo.schema";

const linkSchema = z.object({
  label: z.string(),
  href: z.string(),
});

export const aboutPageConfigSchema = z.object({
  hero: z.object({
    title: z.string(),
    subtitle: z.string(),
    primaryCta: linkSchema,
    secondaryCta: linkSchema.optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    eyebrow: z.string().optional(),
  }),
  stats: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
      href: z.string().optional(),
    }),
  ),
  story: z.object({
    heading: z.string(),
    paragraphs: z.array(z.string()),
  }),
  timeline: z.object({
    heading: z.string(),
    items: z.array(
      z.object({
        year: z.string(),
        title: z.string(),
        description: z.string(),
      }),
    ),
  }),
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
        href: z.string().optional(),
        linkLabel: z.string().optional(),
      }),
    ),
  }),
  markets: z.object({
    heading: z.string(),
    description: z.string(),
    items: z.array(z.string()),
    /** Full marketplace list shown in the “more” popup */
    countries: z.array(z.string()).min(1),
    moreLabel: z.string().default("More markets"),
    links: z.array(linkSchema),
  }),
  team: z.object({
    heading: z.string(),
    subheading: z.string(),
    members: z.array(
      z.object({
        name: z.string(),
        role: z.string(),
        bio: z.string(),
        image: z.string().optional(),
        imageAlt: z.string().optional(),
      }),
    ),
  }),
  outcomes: z.object({
    heading: z.string(),
    subheading: z.string(),
    items: z.array(
      z.object({
        client: z.string(),
        metric: z.string(),
        metricLabel: z.string(),
        excerpt: z.string(),
        href: z.string(),
      }),
    ),
    viewAll: linkSchema,
  }),
  certifications: z.object({
    heading: z.string(),
    description: z.string(),
  }),
  faq: z.object({
    heading: z.string(),
    items: z.array(
      z.object({
        question: z.string(),
        answer: z.string(),
      }),
    ),
  }),
  cta: z.object({
    heading: z.string(),
    subheading: z.string(),
    primaryCta: linkSchema,
  }),
  seo: pageSeoSchema,
});

export type AboutPageConfig = z.infer<typeof aboutPageConfigSchema>;
