import { z } from "zod";

export const faqItemSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

export const faqConfigSchema = z.object({
  items: z.array(faqItemSchema),
  scopes: z.record(z.string(), z.array(faqItemSchema)).optional(),
});

export type FaqItem = z.infer<typeof faqItemSchema>;
export type FaqConfig = z.infer<typeof faqConfigSchema>;
