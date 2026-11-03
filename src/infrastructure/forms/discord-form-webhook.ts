import { brandMonogramUrl } from "@/infrastructure/forms/brand-assets";
import {
  discordWebhookUrlFor,
  getFormNotificationMeta,
  resolveFormDisplayTitle,
  type AnyFormNotificationType,
} from "@/infrastructure/forms/form-notification-meta";

const BRAND_COLOR = 0xc6fd50;

function siteOrigin(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    process.env.SITE_URL?.replace(/\/$/, "") ||
    "https://ecomgliders.com"
  );
}

function formatFieldValue(value: string): string {
  const trimmed = value.trim();
  if (trimmed.length > 1000) return `${trimmed.slice(0, 997)}...`;
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed.length > 80 ? `<${trimmed}>` : trimmed;
  }
  return trimmed;
}

/**
 * Posts a branded Discord embed for a form submission.
 * Routing: see form-notification-meta.discordWebhookUrlFor
 */
export async function notifyDiscordFormSubmission(input: {
  formType: AnyFormNotificationType;
  subject: string;
  fields: Record<string, string>;
}): Promise<boolean> {
  const webhookUrl = discordWebhookUrlFor(input.formType);
  if (!webhookUrl) return false;

  const origin = siteOrigin();
  const logo = brandMonogramUrl();
  const meta = getFormNotificationMeta(input.formType);
  const displayTitle = resolveFormDisplayTitle(input.formType, input.fields);

  const attributionKeys = new Set([
    "Submitted from",
    "Page path",
    "Prior referrer",
  ]);
  const entries = Object.entries(input.fields).filter(
    ([, value]) => value.trim().length > 0,
  );
  // Keep page metrics near the top so they are not dropped by the field cap.
  const ordered = [
    ...entries.filter(([name]) => attributionKeys.has(name)),
    ...entries.filter(([name]) => !attributionKeys.has(name)),
  ];

  const fields = ordered.slice(0, 24).map(([name, value]) => {
    const formatted = formatFieldValue(value);
    return {
      name: name.slice(0, 256),
      value: formatted,
      inline: formatted.length < 40 && !/^https?:\/\//i.test(formatted),
    };
  });

  fields.push({
    name: "Delivery",
    value: "Also emailed to info@ecomgliders.com",
    inline: false,
  });

  const submittedFrom = input.fields["Submitted from"]?.trim();
  const embedUrl =
    submittedFrom && /^https?:\/\//i.test(submittedFrom)
      ? submittedFrom
      : origin;

  const payload = {
    username: "eCom Gliders",
    avatar_url: logo,
    content: `**${meta.discordLead}${displayTitle !== meta.label ? `: ${displayTitle}` : ""}**`,
    embeds: [
      {
        title: displayTitle,
        description: input.subject,
        color: BRAND_COLOR,
        url: embedUrl,
        fields,
        footer: {
          text: "eCom Gliders · since 2018",
        },
        timestamp: new Date().toISOString(),
      },
    ],
  };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      console.error("[form-submission] discord webhook failed", response.status);
      return false;
    }
    return true;
  } catch (error) {
    console.error("[form-submission] discord webhook error", error);
    return false;
  }
}
