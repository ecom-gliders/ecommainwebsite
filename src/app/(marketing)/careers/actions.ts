"use server";

import { headers } from "next/headers";
import { careerApplicationFormSchema } from "@/domain/forms/career-application-form.schema";
import {
  type FormActionState,
  getFormString,
} from "@/domain/forms/form-action-state";
import { notifyFormSubmission } from "@/infrastructure/forms/form-notifier";
import { isHoneypotTriggered } from "@/lib/security/honeypot";
import { getRateLimitKey, isRateLimited } from "@/lib/security/rate-limit";

const ROLE_LABELS: Record<string, string> = {
  "brand-manager": "Brand Manager",
  "junior-ppc-specialist": "Junior PPC Specialist",
};

export async function submitCareerApplicationForm(
  _prevState: FormActionState,
  formData: FormData,
): Promise<FormActionState> {
  const requestHeaders = await headers();
  const rateLimitKey = getRateLimitKey(requestHeaders, "career-application");

  if (isRateLimited(rateLimitKey)) {
    return {
      success: false,
      message: "Too many submissions. Please wait before trying again.",
    };
  }

  if (isHoneypotTriggered(formData.get("website"))) {
    return {
      success: true,
      message:
        "Your application was received. Our team will review fit and reply within about two business days.",
    };
  }

  const parsed = careerApplicationFormSchema.safeParse({
    name: getFormString(formData, "name") ?? "",
    email: getFormString(formData, "email") ?? "",
    phone: getFormString(formData, "phone") ?? "",
    role: getFormString(formData, "role") ?? "",
    linkedinUrl: getFormString(formData, "linkedinUrl") ?? "",
    resumeUrl: getFormString(formData, "resumeUrl") ?? "",
    amazonExperience: getFormString(formData, "amazonExperience") ?? "",
    fitNote: getFormString(formData, "fitNote") ?? "",
    consent: formData.get("consent") === "true" ? "true" : undefined,
    website: getFormString(formData, "website") ?? "",
  });

  if (!parsed.success) {
    return {
      success: false,
      message:
        "We could not submit the application. Review the fields below and try again.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const { website: _honeypot, consent: _consent, ...fields } = parsed.data;
  const roleLabel = ROLE_LABELS[fields.role] ?? fields.role;

  const delivery = await notifyFormSubmission({
    formType: "career-application",
    subject: `Career application: ${roleLabel} — ${fields.name}`,
    fields: {
      Name: fields.name,
      Email: fields.email,
      Phone: fields.phone,
      Role: roleLabel,
      LinkedIn: fields.linkedinUrl,
      "Resume / portfolio URL": fields.resumeUrl,
      "Amazon experience": fields.amazonExperience,
      "Fit note": fields.fitNote,
    },
  });

  if (!delivery.delivered) {
    return {
      success: false,
      message:
        "We could not deliver your application. Please email info@ecomgliders.com or try again later.",
    };
  }

  return {
    success: true,
    message:
      "Your application was received. Our team will review fit and reply within about two business days.",
  };
}
