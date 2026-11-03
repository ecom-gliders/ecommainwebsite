import { z } from "zod";
import { phoneE164Schema } from "@/domain/forms/phone.schema";

const urlField = z
  .string()
  .min(4, "Enter a valid URL.")
  .refine(
    (value) => {
      const normalized = value.startsWith("http") ? value : `https://${value}`;
      try {
        const url = new URL(normalized);
        return Boolean(url.hostname.includes("."));
      } catch {
        return false;
      }
    },
    { message: "Enter a valid URL." },
  );

export const careerApplicationFormSchema = z.object({
  name: z.string().min(2, "Enter your full name."),
  email: z.string().email("Enter a valid email address."),
  phone: phoneE164Schema,
  role: z.enum(["brand-manager", "junior-ppc-specialist"], {
    message: "Select the role you are applying for.",
  }),
  linkedinUrl: urlField,
  resumeUrl: urlField,
  amazonExperience: z.enum(["under-1", "1-2", "3-5", "5-plus"], {
    message: "Select your Amazon or ecommerce experience.",
  }),
  fitNote: z
    .string()
    .min(12, "Add a short note on your relevant Amazon experience."),
  consent: z.literal("true", {
    message: "Please confirm you agree to the privacy policy.",
  }),
  website: z.string().optional(),
});

export type CareerApplicationFormValues = z.infer<
  typeof careerApplicationFormSchema
>;
