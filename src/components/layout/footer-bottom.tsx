import type { NavigationConfig, SiteConfig } from "@/domain/content/schemas";
import { FooterLink } from "@/components/layout/footer-link";

interface FooterBottomProps {
  legal: NavigationConfig["footer"]["legal"];
  copyright: SiteConfig["copyright"];
}

export function FooterBottom({ legal, copyright }: FooterBottomProps) {
  return (
    <div className="relative z-[1]">
      <div className="container-page flex flex-col items-start justify-between gap-4 py-6 sm:flex-row sm:items-center">
        <p className="text-sm font-medium text-text-on-dark/65">
          Copyright {copyright.year} {copyright.holder}
        </p>
        <nav aria-label="Legal links">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {legal.map((link) => (
              <li key={link.href}>
                <FooterLink
                  link={link}
                  tone="onDark"
                  className="text-sm font-bold text-text-on-dark underline underline-offset-4 hover:text-accent"
                />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
