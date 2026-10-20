import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SiteHeader />
      {/* Page ink CTA: join footer chrome, hide duplicate PreFooterCta punch strip */}
      <div className="has-[#blog-post-cta]:[&>footer]:mt-0 has-[#blog-post-cta]:[&>footer]:rounded-t-none has-[#blog-post-cta]:[&_#pre-footer-cta]:hidden">
        {children}
        <SiteFooter />
      </div>
    </>
  );
}