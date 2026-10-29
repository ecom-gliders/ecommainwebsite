"use server";

import { headers } from "next/headers";
import { agencyPartnerFormSchema } from "@/domain/forms/agency-partner-form.schema";
import {
  type FormActionState,
  getFormString,
} from "@/domain/forms/form-action-state";
import { resolveFormAttribution } from "@/infrastructure/forms/form-attribution";
import { notifyFormSubmission } from "@/infrastructure/forms/form-notifier";
import { getFormNotificationMeta } from "@/infrastructure/forms/form-notification-meta";
import { isHoneypotTriggered } from "@/lib/security/honeypot";
import { getRateLimitKey, isRateLimited } from "@/lib/security/rate-limit";

export async function submitAgencyPartnerForm(
  _prevState: FormActionState,
  formData: FormData,
): Promise<FormActionState> {
  const copy = getFormNotificationMeta("agency-partner");
  const requestHeaders = await headers();
  const rateLimitKey = getRateLimitKey(requestHeaders, "agency-partner");

  if (isRateLimited(rateLimitKey)) {
    return {
      success: false,
      message: copy.rateLimited,
    };
  }

  if (isHoneypotTriggered(formData.get("website"))) {
    return {
      success: true,
      message: copy.submitSuccess,
    };
  }

  const parsed = agencyPartnerFormSchema.safeParse({
    name: getFormString(formData, "name"),
    email: getFormString(formData, "email"),
    phone: getFormString(formData, "phone"),
    agencyName: getFormString(formData, "agencyName"),
    agencyWebsite: getFormString(formData, "agencyWebsite"),
    partnershipLane: getFormString(formData, "partnershipLane"),
    servicesOffered: getFormString(formData, "servicesOffered"),
    amazonGap: getFormString(formData, "amazonGap"),
    volumeIntent: getFormString(formData, "volumeIntent"),
    fitNote: getFormString(formData, "fitNote"),
    consent: formData.get("consent") === "true" ? "true" : undefined,
    website: getFormString(formData, "website") ?? "",
  });

  if (!parsed.success) {
    return {
      success: false,
      message: copy.validationFailed,
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const { website: _honeypot, consent: _consent, ...fields } = parsed.data;
  const attribution = await resolveFormAttribution(formData);

  const delivery = await notifyFormSubmission({
    formType: "agency-partner",
    subject: `Agency partner application: ${fields.agencyName}`,
    fields: {
      Name: fields.name,
      Email: fields.email,
      Phone: fields.phone,
      "Agency name": fields.agencyName,
      "Agency website": fields.agencyWebsite,
      "Partnership lane": fields.partnershipLane,
      "Services offered": fields.servicesOffered,
      "Amazon gap": fields.amazonGap,
      "Volume intent": fields.volumeIntent,
      "Fit note": fields.fitNote,
      ...attribution,
    },
  });

  if (!delivery.delivered) {
    return {
      success: false,
      message: copy.deliveryFailed,
    };
  }

  return {
    success: true,
    message: copy.submitSuccess,
  };
}
