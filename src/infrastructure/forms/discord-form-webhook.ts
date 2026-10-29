import type { FormNotificationType } from "@/infrastructure/forms/form-email-templates";

const BRAND_COLOR = 0xc6fd50;

function siteOrigin(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    process.env.SITE_URL?.replace(/\/$/, "") ||
    "https://ecomgliders.com"
  );
}

function formTypeLabel(formType: FormNotificationType): string {
  switch (formType) {
    case "contact":
      return "Contact message";
    case "contact-intake":
      return "Strategy intake";
    case "audit":
      return "Get in Touch";
    case "agency-partner":
      return "Agency partnership";
    case "career-application":
      return "Career application";
    case "newsletter":
      return "Newsletter subscribe";
    default:
      return "Website form";
  }
}

/**
 * Get in Touch / audit lead forms → DISCORD_GET_IN_TOUCH_WEBHOOK_URL
 * All other forms → DISCORD_FORM_WEBHOOK_URL
 * Never hardcode webhook secrets.
 */
function webhookUrlFor(formType: FormNotificationType): string | undefined {
  if (formType === "audit") {
    return (
      process.env.DISCORD_GET_IN_TOUCH_WEBHOOK_URL?.trim() ||
      process.env.DISCORD_FORM_WEBHOOK_URL?.trim()
    );
  }

  return process.env.DISCORD_FORM_WEBHOOK_URL?.trim();
}

/**
 * Posts a branded Discord embed for a form submission.
 */
export async function notifyDiscordFormSubmission(input: {
  formType: FormNotificationType;
  subject: string;
  fields: Record<string, string>;
}): Promise<boolean> {
  const webhookUrl = webhookUrlFor(input.formType);
  if (!webhookUrl) return false;

  const origin = siteOrigin();
  const logo = `${origin}/images/logo.png`;
  const label = formTypeLabel(input.formType);

  const fields = Object.entries(input.fields)
    .filter(([, value]) => value.trim().length > 0)
    .slice(0, 24)
    .map(([name, value]) => ({
      name: name.slice(0, 256),
      value: value.length > 1000 ? `${value.slice(0, 997)}...` : value,
      inline: value.length < 48,
    }));

  fields.push({
    name: "Notification",
    value: "Also emailed to info@ecomgliders.com",
    inline: false,
  });

  const payload = {
    username: "eCom Gliders",
    avatar_url: logo,
    content: `**New lead** · ${label}`,
    embeds: [
      {
        author: {
          name: "eCom Gliders Website",
          url: origin,
          icon_url: logo,
        },
        title: label,
        description: input.subject,
        color: BRAND_COLOR,
        thumbnail: { url: logo },
        fields,
        footer: {
          text: "eCom Gliders · Amazon growth specialists since 2018",
          icon_url: logo,
        },
        timestamp: new Date().toISOString(),
        url: origin,
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
