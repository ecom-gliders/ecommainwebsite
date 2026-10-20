import { z } from "zod";

export const testimonialConfigSchema = z.object({
  quote: z.string(),
  author: z.string(),
  role: z.string(),
  company: z.string(),
});

export const testimonialsConfigSchema = z.object({
  testimonials: z.array(testimonialConfigSchema),
});

export type TestimonialConfig = z.infer<typeof testimonialConfigSchema>;
export type TestimonialsConfig = z.infer<typeof testimonialsConfigSchema>;
