import type { NavigationConfig, SiteConfig } from "@/domain/content/schemas";
import { FooterBrandColumn } from "@/components/layout/footer-brand-column";
import { FooterContactColumn } from "@/components/layout/footer-contact-column";
import { FooterLink } from "@/components/layout/footer-link";

interface FooterMainProps {
  footer: NavigationConfig["footer"];
  site: SiteConfig;
}

export function FooterMain({ footer, site }: FooterMainProps) {
  return (
    <div className="relative z-[1] border-b border-white/10">
      <div className="container-page grid gap-8 py-10 sm:grid-cols-2 sm:gap-10 sm:py-12 lg:grid-cols-4 lg:gap-12 lg:py-14">
        {footer.columns.map((column) => {
          if (column.type === "brand") {
            return (
              <FooterBrandColumn
                key={column.id}
                title={column.title}
                site={site}
              />
            );
          }

          if (column.type === "contact") {
            return (
              <FooterContactColumn
                key={column.id}
                title={column.title}
                site={site}
              />
            );
          }

          return (
            <nav key={column.id} aria-labelledby={`footer-${column.id}-heading`}>
              <h3
                id={`footer-${column.id}-heading`}
                className="text-[11px] font-bold uppercase tracking-[0.14em] text-text-on-dark/55 sm:text-xs"
              >
                {column.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {column.links?.map((link) => (
                  <li key={`${column.id}-${link.href}`}>
                    <FooterLink
                      link={link}
                      tone="onDark"
                      className="text-base font-bold text-text-on-dark hover:text-accent"
                    />
                  </li>
                ))}
              </ul>
            </nav>
          );
        })}
      </div>
    </div>
  );
}
