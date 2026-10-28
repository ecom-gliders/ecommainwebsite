import Link from "next/link";

export interface HtmlSitemapGroup {
  title: string;
  links: Array<{ label: string; href: string }>;
}

interface HtmlSitemapTemplateProps {
  groups: HtmlSitemapGroup[];
  xmlHref?: string;
}

export function HtmlSitemapTemplate({
  groups,
  xmlHref = "/sitemap.xml",
}: HtmlSitemapTemplateProps) {
  return (
    <>
      <section
        id="sitemap-hero"
        aria-labelledby="sitemap-hero-heading"
        className="border-b-2 border-primary bg-surface-muted"
      >
        <div className="container-page py-12 sm:py-16">
          <nav aria-label="Breadcrumb" className="text-small text-text-secondary">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-primary">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-text-primary">Sitemap</li>
            </ol>
          </nav>
          <h1
            id="sitemap-hero-heading"
            className="mt-6 max-w-3xl text-[clamp(2rem,4.5vw,3.25rem)] font-bold tracking-tight text-text-primary"
          >
            Sitemap
          </h1>
          <p className="mt-4 max-w-2xl text-base font-medium leading-relaxed text-text-secondary">
            Organized links to our main public pages — services, case studies,
            company, resources, and more. Search engines should use the XML feed
            at{" "}
            <Link
              href={xmlHref}
              className="font-bold text-primary underline underline-offset-2"
            >
              /sitemap.xml
            </Link>
            .
          </p>
        </div>
      </section>

      <section
        id="sitemap-directory"
        aria-labelledby="sitemap-directory-heading"
        className="py-12 sm:py-16"
      >
        <div className="container-page">
          <h2 id="sitemap-directory-heading" className="sr-only">
            Site directory
          </h2>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {groups.map((group) => {
              const headingId = `sitemap-${group.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")}`;
              return (
              <nav
                key={group.title}
                aria-labelledby={headingId}
                className="min-w-0"
              >
                <h3
                  id={headingId}
                  className="text-xs font-bold uppercase tracking-[0.12em] text-text-secondary"
                >
                  {group.title}
                </h3>
                <ul className="mt-4 flex flex-col">
                  {group.links.map((link) => (
                    <li key={`${group.title}-${link.href}`}>
                      <Link
                        href={link.href}
                        className="inline-flex min-h-10 items-center py-1.5 text-sm font-medium text-text-primary hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
