import { z } from "zod";

export const auditFormSchema = z.object({
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
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number.")
    .max(30, "Phone number must be 30 characters or fewer."),
  brandName: z.string().trim().max(150).optional(),
  amazonStoreUrl: z
    .string()
    .trim()
    .url("Enter a valid Amazon store URL.")
    .max(500)
    .optional()
    .or(z.literal("")),
  monthlyRevenue: z.string().trim().max(50).optional(),
  message: z.string().trim().max(5000).optional(),
  consent: z.literal("true", { message: "You must agree to the privacy policy." }),
  website: z.string().max(0).optional(),
});

export type AuditFormInput = z.infer<typeof auditFormSchema>;
