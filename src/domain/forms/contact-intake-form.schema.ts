import { z } from "zod";

export const contactIntakeFormSchema = z.object({
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
  services: z
    .array(z.string().trim().min(1))
    .min(1, "Select at least one service.")
    .max(25),
  brandName: z
    .string()
    .trim()
    .min(2, "Enter your brand or company name.")
    .max(150, "Brand name must be 150 characters or fewer."),
  amazonStoreUrl: z
    .string()
    .trim()
    .min(1, "Enter your Amazon storefront URL.")
    .url("Enter a valid Amazon storefront URL.")
    .max(500),
  marketplaces: z
    .array(z.string().trim().min(1))
    .min(1, "Select at least one marketplace.")
    .max(25),
  monthlyRevenue: z
    .string()
    .trim()
    .min(1, "Select your monthly Amazon revenue range.")
    .max(50),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number.")
    .max(30, "Phone number must be 30 characters or fewer."),
  note: z.string().trim().max(5000).optional(),
  consent: z.literal("true", {
    message: "You must agree to the privacy policy.",
  }),
  website: z.string().max(0).optional(),
});

export type ContactIntakeFormInput = z.infer<typeof contactIntakeFormSchema>;
