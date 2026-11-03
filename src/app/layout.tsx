import type { Metadata, Viewport } from "next";
import { AccessibilityDock } from "@/components/accessibility/accessibility-dock";
import { PageAtmosphere } from "@/components/layout/page-atmosphere";
import { SkipLink } from "@/components/layout/skip-link";
import { ThemeReset } from "@/components/layout/theme-reset";
import { buildCssVariables } from "@/lib/design-tokens";
import { getSiteUrl } from "@/lib/seo/site-url";
import "./globals.css";

/**
 * Fonts load via stylesheet links (Fontshare + Google CSS) so production
 * builds do not depend on next/font Google fetches at compile time.
 * Production UI: Satoshi primary, IBM Plex fallbacks, Caveat for hand accents.
 */

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "eCom Gliders",
  description: "Full-service Amazon account management",
  icons: {
    icon: [
      { url: "/favicon-32.png?v=6", type: "image/png", sizes: "32x32" },
      { url: "/favicon.png?v=6", type: "image/png", sizes: "512x512" },
      { url: "/favicon.ico?v=6", sizes: "any" },
    ],
    apple: [{ url: "/apple-touch-icon.png?v=6", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cssVars = buildCssVariables();

  return (
    <html
      lang="en"
      className="font-vars"
      style={
        {
          ...cssVars,
          ["--font-ibm-plex-sans" as string]: '"IBM Plex Sans"',
          ["--font-ibm-plex-mono" as string]: '"IBM Plex Mono"',
          ["--font-caveat" as string]: '"Caveat"',
        } as React.CSSProperties
      }
    >
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://player.vimeo.com" />
        <link rel="preconnect" href="https://i.vimeocdn.com" />
        <link
          rel="preconnect"
          href="https://f.vimeocdn.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://player.vimeo.com" />
      </head>
      <body className="font-sans">
        <PageAtmosphere />
        <ThemeReset />
        <SkipLink />
        {children}
        <AccessibilityDock />
      </body>
    </html>
  );
}
