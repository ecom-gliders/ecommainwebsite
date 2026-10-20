import type { SiteConfig } from "@/domain/content/schemas";

interface FooterContactColumnProps {
  title: string;
  site: SiteConfig;
}

export function FooterContactColumn({ title, site }: FooterContactColumnProps) {
  return (
    <div>
      <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-text-on-dark/55 sm:text-xs">
        {title}
      </h3>
      <address className="mt-5 space-y-3 not-italic">
        <p className="text-base font-bold leading-snug text-text-on-dark">
          {site.address.formatted}
        </p>
        <p>
          <a
            href={`tel:${site.phone.tel}`}
            className="text-base font-bold text-text-on-dark transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
          >
            {site.phone.display}
          </a>
        </p>
        <p>
          <a
            href={`mailto:${site.email}`}
            className="text-base font-bold text-text-on-dark transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
          >
            {site.email}
          </a>
        </p>
      </address>
    </div>
  );
}
