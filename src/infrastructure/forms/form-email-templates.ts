export type FormNotificationType =
  | "contact"
  | "contact-intake"
  | "audit"
  | "agency-partner"
  | "career-application"
  | "newsletter";

const BRAND = {
  name: "eCom Gliders",
  lime: "#C6FD50",
  ink: "#131311",
  muted: "#5c5c57",
  canvas: "#f7f7f4",
  phone: "+1 (360) 660-1210",
  email: "info@ecomgliders.com",
  site: "https://ecomgliders.com",
} as const;

function siteOrigin(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    process.env.SITE_URL?.replace(/\/$/, "") ||
    BRAND.site
  );
}

function logoUrl(): string {
  return `${siteOrigin()}/images/logo.png`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
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
      return "Agency partnership application";
    case "career-application":
      return "Career application";
    case "newsletter":
      return "Newsletter subscription";
    default:
      return "Website form";
  }
}

function fieldRowsHtml(fields: Record<string, string>): string {
  return Object.entries(fields)
    .filter(([, value]) => value.trim().length > 0)
    .map(
      ([key, value]) => `
      <tr>
        <td style="padding:10px 14px;border-bottom:1px solid #e8e8e2;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;color:${BRAND.ink};width:34%;vertical-align:top;">${escapeHtml(key)}</td>
        <td style="padding:10px 14px;border-bottom:1px solid #e8e8e2;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:${BRAND.ink};line-height:1.45;white-space:pre-wrap;">${escapeHtml(value)}</td>
      </tr>`,
    )
    .join("");
}

function shellHtml(options: {
  eyebrow: string;
  title: string;
  intro: string;
  bodyHtml: string;
  footerNote: string;
}): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width" /></head>
<body style="margin:0;padding:0;background:${BRAND.canvas};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.canvas};padding:28px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#ffffff;border:2px solid ${BRAND.ink};border-radius:10px;overflow:hidden;">
          <tr>
            <td style="background:${BRAND.ink};padding:18px 22px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <img src="${logoUrl()}" alt="${BRAND.name}" width="148" style="display:block;border:0;height:auto;max-width:148px;" />
                  </td>
                  <td align="right" style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${BRAND.lime};">
                    ${escapeHtml(options.eyebrow)}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:26px 22px 8px;font-family:Arial,Helvetica,sans-serif;">
              <h1 style="margin:0;font-size:24px;line-height:1.15;letter-spacing:-0.02em;color:${BRAND.ink};">${escapeHtml(options.title)}</h1>
              <p style="margin:12px 0 0;font-size:14px;line-height:1.55;color:${BRAND.muted};">${escapeHtml(options.intro)}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 22px 22px;">
              ${options.bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="background:${BRAND.ink};padding:16px 22px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.5;color:rgba(255,255,255,0.72);">
              ${escapeHtml(options.footerNote)}
              <br />
              <a href="${siteOrigin()}" style="color:${BRAND.lime};text-decoration:none;">${BRAND.site.replace("https://", "")}</a>
              &nbsp;·&nbsp;
              <a href="mailto:${BRAND.email}" style="color:${BRAND.lime};text-decoration:none;">${BRAND.email}</a>
              &nbsp;·&nbsp;
              <a href="tel:+13606601210" style="color:${BRAND.lime};text-decoration:none;">${BRAND.phone}</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function buildTeamNotificationHtml(input: {
  formType: FormNotificationType;
  subject: string;
  fields: Record<string, string>;
}): { html: string; text: string } {
  const label = formTypeLabel(input.formType);
  const rows = fieldRowsHtml(input.fields);
  const html = shellHtml({
    eyebrow: "New website lead",
    title: label,
    intro: input.subject,
    bodyHtml: `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e8e8e2;border-radius:8px;overflow:hidden;">${rows}</table>`,
    footerNote: "Internal notification from the eCom Gliders website forms system.",
  });

  const text = [
    `${BRAND.name} — ${label}`,
    input.subject,
    "",
    ...Object.entries(input.fields)
      .filter(([, v]) => v.trim())
      .map(([k, v]) => `${k}: ${v}`),
    "",
    `${BRAND.email} · ${BRAND.phone}`,
  ].join("\n");

  return { html, text };
}

export function buildUserConfirmationHtml(input: {
  formType: FormNotificationType;
  recipientName?: string;
}): { html: string; text: string; subject: string } {
  const name = input.recipientName?.trim() || "there";
  const label = formTypeLabel(input.formType);

  const copyByType: Record<
    FormNotificationType,
    { subject: string; intro: string; next: string }
  > = {
    contact: {
      subject: "We received your message — eCom Gliders",
      intro: `Thanks ${name}. Your message is with our team.`,
      next: "A strategist typically replies within one business day.",
    },
    "contact-intake": {
      subject: "Strategy intake received — eCom Gliders",
      intro: `Thanks ${name}. Your strategy intake is in our queue.`,
      next: "We will review your notes and follow up to schedule next steps.",
    },
    audit: {
      subject: "We received your message — eCom Gliders",
      intro: `Thanks ${name}. Your Get in Touch request is with our team.`,
      next: "A strategist typically replies within one business day.",
    },
    "agency-partner": {
      subject: "Partnership application received — eCom Gliders",
      intro: `Thanks ${name}. We received your agency partnership application.`,
      next: "Our partnerships team will review and reply if there is a fit.",
    },
    "career-application": {
      subject: "Application received — eCom Gliders",
      intro: `Thanks ${name}. Your application is with our hiring team.`,
      next: "We review carefully and will follow up if your background matches an open role.",
    },
    newsletter: {
      subject: "You are subscribed — eCom Gliders",
      intro: `Thanks ${name}. You are on the eCom Gliders insights list.`,
      next: "Expect practical Amazon growth notes — no spam, unsubscribe anytime by emailing us.",
    },
  };

  const copy = copyByType[input.formType];
  const bodyHtml = `
    <div style="border:2px solid ${BRAND.ink};border-radius:10px;padding:18px;background:${BRAND.lime};">
      <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:${BRAND.ink};">${escapeHtml(copy.next)}</p>
    </div>
    <p style="margin:18px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.5;color:${BRAND.muted};">
      Reference: ${escapeHtml(label)}. If you did not submit this, reply to this email and we will remove your details.
    </p>`;

  const html = shellHtml({
    eyebrow: "Confirmation",
    title: copy.subject.replace(" — eCom Gliders", ""),
    intro: copy.intro,
    bodyHtml,
    footerNote: "Sent by eCom Gliders · Amazon growth specialists since 2018.",
  });

  const text = [
    copy.subject,
    "",
    copy.intro,
    copy.next,
    "",
    `${BRAND.email} · ${BRAND.phone}`,
    siteOrigin(),
  ].join("\n");

  return { html, text, subject: copy.subject };
}
