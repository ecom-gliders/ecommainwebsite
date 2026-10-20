import { z } from "zod";
import { pageSeoSchema } from "./page-seo.schema";

export const homepageSectionTypeSchema = z.enum([
  "hero",
  "promoCampaignSlider",
  "checklistTicker",
  "painStrip",
  "stats",
  "services",
  "process",
  "freeAuditCard",
  "caseStudies",
  "videoReviews",
  "testimonials",
  "trustBar",
  "faq",
  "cta",
  "askAi",
  "blogPreview",
  "sellerSegments",
  "comparison",
  "contactTeaser",
  "creativeShowcase",
  "brandValues",
  "markets",
]);

export const homepageSectionSchema = z.object({
  id: z.string(),
  type: homepageSectionTypeSchema,
  enabled: z.boolean(),
  data: z.record(z.string(), z.unknown()),
});

export const homepageConfigSchema = z.object({
  sections: z.array(homepageSectionSchema),
  seo: pageSeoSchema,
});

export type HomepageSectionType = z.infer<typeof homepageSectionTypeSchema>;
export type HomepageSection = z.infer<typeof homepageSectionSchema>;
export type HomepageConfig = z.infer<typeof homepageConfigSchema>;
