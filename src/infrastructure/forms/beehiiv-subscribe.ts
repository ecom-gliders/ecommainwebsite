/**
 * Creates a Beehiiv subscription via official API when configured.
 * Env: BEEHIIV_API_KEY + BEEHIIV_PUBLICATION_ID (pub_…)
 * Falls back to public embed form POST when only BEEHIIV_EMBED_ID is set.
 */

const DEFAULT_EMBED_ID = "b67089b0-4fe7-450e-bf60-7cb7fbc1e708";

export async function subscribeToBeehiiv(email: string): Promise<boolean> {
  const apiKey = process.env.BEEHIIV_API_KEY?.trim();
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID?.trim();
  const embedId =
    process.env.BEEHIIV_EMBED_ID?.trim() || DEFAULT_EMBED_ID;

  if (apiKey && publicationId) {
    try {
      const response = await fetch(
        `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            reactivate_existing: true,
            send_welcome_email: true,
            utm_source: "ecomgliders_website",
            utm_medium: "pre_footer",
            referring_site: "ecomgliders.com",
          }),
        },
      );

      if (response.ok || response.status === 400) {
        // 400 often means already subscribed — treat as success for UX
        return true;
      }

      console.error("[beehiiv] api subscribe failed", response.status);
    } catch (error) {
      console.error("[beehiiv] api subscribe error", error);
    }
  }

  // Public embed form endpoint (best-effort; may be blocked by bot protection server-side)
  try {
    const body = new URLSearchParams({ email });
    const response = await fetch(
      `https://subscribe-forms.beehiiv.com/${embedId}/submissions`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      },
    );
    if (response.ok || response.status === 204 || response.status === 201) {
      return true;
    }
    // Opaque/blocked responses still may have accepted the lead in some setups
    if (response.status === 403 || response.status === 429) {
      console.warn("[beehiiv] public form blocked", response.status);
      return false;
    }
  } catch (error) {
    console.error("[beehiiv] public form error", error);
  }

  return false;
}
