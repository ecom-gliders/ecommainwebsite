import type { NavigationConfig, SiteConfig } from "@/domain/content/schemas";
import { FooterLink } from "@/components/layout/footer-link";

interface FooterBottomProps {
  legal: NavigationConfig["footer"]["legal"];
  copyright: SiteConfig["copyright"];
}

export function FooterBottom({ legal, copyright }: FooterBottomProps) {
  return (
    <div className="relative z-[1]">
      <div className="container-page flex flex-col gap-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:py-10">
        <p className="text-sm font-medium leading-relaxed text-text-on-dark/55">
          Copyright {copyright.year} {copyright.holder}
        </p>
        <nav aria-label="Legal links">
          <ul className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-1 sm:gap-y-1">
            {legal.map((link) => (
              <li key={link.href}>
                <FooterLink
                  link={link}
                  tone="onDark"
                  className="inline-flex min-h-11 items-center py-2.5 text-[15px] font-medium text-text-on-dark/70 underline-offset-4 hover:text-accent hover:underline sm:min-h-10 sm:px-3 sm:py-2 sm:text-sm"
                />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
