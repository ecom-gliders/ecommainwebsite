import type { SiteConfig } from "@/domain/content/schemas";

interface FooterContactColumnProps {
  title: string;
  site: SiteConfig;
}

export function FooterContactColumn({ title, site }: FooterContactColumnProps) {
  return (
    <div className="min-w-0">
      <h3 className="text-[11px] font-bold uppercase tracking-[0.16em] text-text-on-dark/50 sm:text-xs">
        {title}
      </h3>
      <address className="mt-5 flex flex-col not-italic sm:mt-6">
        <p className="max-w-[18rem] py-2.5 text-[15px] font-medium leading-relaxed text-text-on-dark/80 sm:py-2 sm:text-sm">
          {site.address.formatted}
        </p>
        <p>
          <a
            href={`tel:${site.phone.tel}`}
            className="inline-flex min-h-11 items-center py-2.5 text-[15px] font-medium text-text-on-dark/80 transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary sm:min-h-10 sm:py-2 sm:text-sm"
          >
            {site.phone.display}
          </a>
        </p>
        <p>
          <a
            href={`mailto:${site.email}`}
            className="inline-flex min-h-11 items-center break-all py-2.5 text-[15px] font-medium text-text-on-dark/80 transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary sm:min-h-10 sm:py-2 sm:text-sm"
          >
            {site.email}
          </a>
        </p>
      </address>
    </div>
  );
}
