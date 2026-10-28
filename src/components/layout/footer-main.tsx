import type {
  NavigationConfig,
  NavLink,
  SiteConfig,
} from "@/domain/content/schemas";
import { FooterBrandColumn } from "@/components/layout/footer-brand-column";
import { FooterContactColumn } from "@/components/layout/footer-contact-column";
import { FooterLink } from "@/components/layout/footer-link";

interface FooterDirectoryColumn {
  id: string;
  title: string;
  type?: "contact";
  links?: NavLink[];
}

interface FooterMainProps {
  footer: NavigationConfig["footer"];
  site: SiteConfig;
  recentBlogLinks?: NavLink[];
  recentCaseStudyLinks?: NavLink[];
}

function FooterLinkColumn({
  column,
  sectionClass,
}: {
  column: FooterDirectoryColumn;
  sectionClass: string;
}) {
  if (column.type === "contact") {
    return null;
  }

  return (
    <nav
      aria-labelledby={`footer-${column.id}-heading`}
      className={sectionClass}
    >
      <h3
        id={`footer-${column.id}-heading`}
        className="text-xs font-bold uppercase tracking-[0.12em] text-text-on-dark/50"
      >
        {column.title}
      </h3>
      <ul className="mt-5 flex flex-col sm:mt-6">
        {column.links?.map((link) => (
          <li key={`${column.id}-${link.href}-${link.label}`}>
            <FooterLink
              link={link}
              tone="onDark"
              className="inline-flex min-h-11 items-center py-2.5 text-sm font-medium leading-snug text-text-on-dark/80 hover:text-accent sm:min-h-10 sm:py-2"
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function FooterMain({
  footer,
  site,
  recentBlogLinks = [],
  recentCaseStudyLinks = [],
}: FooterMainProps) {
  const brandColumn = footer.columns.find((column) => column.type === "brand");
  const configuredColumns = footer.columns.filter(
    (column) => column.type !== "brand",
  );

  const companyIndex = configuredColumns.findIndex(
    (column) => column.id === "company",
  );
  const insertAt = companyIndex >= 0 ? companyIndex : configuredColumns.length;

  const directoryColumns: FooterDirectoryColumn[] = [
    ...configuredColumns.slice(0, insertAt).map((column) => ({
      id: column.id,
      title: column.title,
      type: column.type === "contact" ? ("contact" as const) : undefined,
      links: column.links,
    })),
    ...(recentBlogLinks.length > 0
      ? [
          {
            id: "latest-blog",
            title: "Articles",
            links: [
              ...recentBlogLinks,
              { label: "All articles", href: "/blog/" },
            ],
          },
        ]
      : []),
    ...(recentCaseStudyLinks.length > 0
      ? [
          {
            id: "latest-case-studies",
            title: "Case Studies",
            links: [
              ...recentCaseStudyLinks,
              { label: "All case studies", href: "/case-studies/" },
            ],
          },
        ]
      : []),
    ...configuredColumns.slice(insertAt).map((column) => ({
      id: column.id,
      title: column.title,
      type: column.type === "contact" ? ("contact" as const) : undefined,
      links: column.links,
    })),
  ];

  return (
    <div className="relative z-[1] border-b border-white/10">
      {brandColumn ? (
        <div className="border-b border-white/10">
          <div className="container-page py-8 sm:py-10 lg:py-11">
            <FooterBrandColumn title={brandColumn.title} site={site} />
          </div>
        </div>
      ) : null}

      <div className="container-page py-10 sm:py-12 lg:py-16">
        <div className="grid w-full grid-cols-1 gap-0 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-12 md:grid-cols-3 lg:gap-x-12 lg:gap-y-14 xl:grid-cols-4 xl:gap-x-10">
          {directoryColumns.map((column, index) => {
            const sectionClass =
              index === 0
                ? "min-w-0 border-b border-white/10 py-8 sm:border-0 sm:py-0"
                : "min-w-0 border-b border-white/10 py-8 last:border-b-0 last:pb-0 sm:border-0 sm:py-0";

            if (column.type === "contact") {
              return (
                <div key={column.id} className={sectionClass}>
                  <FooterContactColumn title={column.title} site={site} />
                </div>
              );
            }

            return (
              <FooterLinkColumn
                key={column.id}
                column={column}
                sectionClass={sectionClass}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
