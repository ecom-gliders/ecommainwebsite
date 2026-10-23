import { z } from "zod";
import { pageSeoSchema } from "./page-seo.schema";

const legalSectionSchema = z.object({
  heading: z.string(),
  paragraphs: z.array(z.string()).default([]),
  bullets: z.array(z.string()).optional(),
});

export const legalPageConfigSchema = z.object({
  seo: pageSeoSchema,
  eyebrow: z.string().optional(),
  h1: z.string(),
  dateLabel: z.string(),
  dateValue: z.string(),
  intro: z.string(),
  sections: z.array(legalSectionSchema).min(1),
  contact: z.object({
    heading: z.string(),
    email: z.string(),
    phone: z.string(),
    address: z.string(),
  }),
  relatedLink: z.object({
    label: z.string(),
    href: z.string(),
  }),
});

export type LegalPageConfig = z.infer<typeof legalPageConfigSchema>;
