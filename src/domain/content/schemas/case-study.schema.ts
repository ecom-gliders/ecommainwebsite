import { z } from "zod";
import { pageSeoSchema } from "./page-seo.schema";

export const caseStudyLayoutSchema = z.enum([
  "flagship",
  "efficiency",
  "creative",
  "launch",
  "expansion",
]);

export const caseStudyStrategyStageSchema = z.object({
  title: z.string(),
  bullets: z.array(z.string()).default([]),
  outcome: z.string().optional(),
});

export const caseStudyBeforeAfterSchema = z.object({
  label: z.string(),
  before: z.string(),
  after: z.string(),
  change: z.string().optional(),
});

export const caseStudyCardSchema = z.object({
  slug: z.string(),
  title: z.string(),
  client: z.string(),
  clientDisplayName: z.string().optional(),
  metric: z.string(),
  metricLabel: z.string(),
  secondaryMetric: z.string().optional(),
  secondaryMetricLabel: z.string().optional(),
  excerpt: z.string(),
  featuredImage: z.string(),
  featuredImageAlt: z.string().optional(),
  atmosphere: z.string().optional(),
  atmosphereAlt: z.string().optional(),
  href: z.string(),
  category: z.string(),
  service: z.string(),
  serviceFilter: z.string(),
  layout: caseStudyLayoutSchema.default("expansion"),
  featured: z.boolean().optional(),
  market: z.string().optional(),
  duration: z.string().optional(),
  servicesDelivered: z.array(z.string()).optional(),
});

export const caseStudyDetailSchema = caseStudyCardSchema.extend({
  heroSubheadline: z.string(),
  background: z
    .object({
      heading: z.string(),
      paragraphs: z.array(z.string()),
    })
    .optional(),
  challenge: z.object({
    heading: z.string(),
    paragraphs: z.array(z.string()),
  }),
  keyIssues: z.array(z.string()).optional(),
  solution: z.object({
    heading: z.string(),
    steps: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
      }),
    ),
  }),
  strategyStages: z.array(caseStudyStrategyStageSchema).optional(),
  results: z.object({
    heading: z.string(),
    metrics: z.array(
      z.object({
        label: z.string(),
        value: z.string(),
      }),
    ),
  }),
  beforeAfter: z.array(caseStudyBeforeAfterSchema).optional(),
  gallery: z
    .array(
      z.object({
        src: z.string(),
        alt: z.string(),
      }),
    )
    .optional(),
  relatedSlugs: z.array(z.string()).optional(),
  quote: z
    .object({
      text: z.string(),
      author: z.string(),
      role: z.string().optional(),
    })
    .optional(),
  dateModified: z.string().optional(),
  seo: pageSeoSchema,
});

export const caseStudiesConfigSchema = z.object({
  index: z.object({
    hero: z.object({
      title: z.string(),
      subtitle: z.string(),
    }),
    trustHeading: z.string().optional(),
    featuredHeading: z.string().optional(),
    proofHeading: z.string().optional(),
    proofSubheading: z.string().optional(),
    proofStats: z
      .array(
        z.object({
          value: z.string(),
          label: z.string(),
        }),
      )
      .optional(),
    cta: z
      .object({
        heading: z.string(),
        body: z.string(),
        primaryLabel: z.string(),
        primaryHref: z.string(),
        secondaryLabel: z.string().optional(),
        secondaryHref: z.string().optional(),
      })
      .optional(),
    seo: pageSeoSchema,
  }),
  filters: z.array(z.string()),
  caseStudies: z.array(caseStudyDetailSchema),
});

export type CaseStudyLayout = z.infer<typeof caseStudyLayoutSchema>;
export type CaseStudyCard = z.infer<typeof caseStudyCardSchema>;
export type CaseStudyDetail = z.infer<typeof caseStudyDetailSchema>;
export type CaseStudiesConfig = z.infer<typeof caseStudiesConfigSchema>;

/** @deprecated Use CaseStudyCard — kept for ContentRepository compatibility */
export type CaseStudyConfig = CaseStudyCard;

export const caseStudyConfigSchema = caseStudyCardSchema;
