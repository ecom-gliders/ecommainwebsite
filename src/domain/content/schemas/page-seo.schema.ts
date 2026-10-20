import { z } from "zod";

export const pageSeoSchema = z.object({
  metaTitle: z.string(),
  metaDescription: z.string(),
  canonical: z.string(),
  ogImage: z.string().optional(),
  robots: z
    .object({
      index: z.boolean(),
      follow: z.boolean(),
    })
    .optional(),
  schema: z
    .enum(["Article", "Service", "FAQPage", "Organization"])
    .optional(),
});

export type PageSeo = z.infer<typeof pageSeoSchema>;
