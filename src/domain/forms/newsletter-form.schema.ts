import { z } from "zod";

export const newsletterFormSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .max(254, "Email must be 254 characters or fewer."),
  website: z.string().max(0).optional(),
});

export type NewsletterFormInput = z.infer<typeof newsletterFormSchema>;
