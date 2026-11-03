import { z } from "zod";
import { phoneE164Schema } from "@/domain/forms/phone.schema";

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter your full name.")
    .max(100, "Name must be 100 characters or fewer."),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .max(254, "Email must be 254 characters or fewer."),
  phone: phoneE164Schema,
  serviceInterest: z.string().trim().max(100).optional(),
  message: z
    .string()
    .trim()
    .min(10, "Add a bit more detail so we know how to help.")
    .max(5000, "Keep your message under 5000 characters."),
  consent: z.literal("true", {
    message: "Please confirm you agree to the privacy policy.",
  }),
  website: z.string().max(0).optional(),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
