import Link from "next/link";
import type { LegalPageConfig } from "@/domain/content/schemas";

interface LegalDocumentTemplateProps {
  page: LegalPageConfig;
}

export function LegalDocumentTemplate({ page }: LegalDocumentTemplateProps) {
  return (
    <article className="bg-background py-12 text-text-primary sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        {page.eyebrow ? (
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-text-secondary">
            {page.eyebrow}
          </p>
        ) : null}

        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          {page.h1}
        </h1>

        <p className="mt-3 text-sm font-medium text-text-secondary">
          {page.dateLabel}: {page.dateValue}
        </p>

        <p className="mt-8 text-base font-medium leading-relaxed text-text-primary sm:text-lg">
          {page.intro}
        </p>

        <div className="mt-10 space-y-10">
          {page.sections.map((section) => (
            <section key={section.heading} className="space-y-4">
              <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                {section.heading}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 48)}
                  className="text-base font-medium leading-relaxed text-text-primary"
                >
                  {paragraph}
                </p>
              ))}
              {section.bullets && section.bullets.length > 0 ? (
                <ul className="list-disc space-y-2 pl-5 text-base font-medium leading-relaxed text-text-primary">
                  {section.bullets.map((item) => (
                    <li key={item.slice(0, 64)}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        <section className="mt-12 border-t border-border pt-8">
          <h2 className="text-xl font-bold tracking-tight">{page.contact.heading}</h2>
          <ul className="mt-4 space-y-2 text-base font-medium text-text-primary">
            <li>
              Email:{" "}
              <a
                href={`mailto:${page.contact.email}`}
                className="underline underline-offset-2 hover:text-accent"
              >
                {page.contact.email}
              </a>
            </li>
            <li>
              Phone:{" "}
              <a
                href={`tel:${page.contact.phone.replace(/[^\d+]/g, "")}`}
                className="underline underline-offset-2 hover:text-accent"
              >
                {page.contact.phone}
              </a>
            </li>
            <li>Address: {page.contact.address}</li>
          </ul>
        </section>

        <p className="mt-10 text-sm font-medium text-text-secondary">
          Also see{" "}
          <Link
            href={page.relatedLink.href}
            className="text-primary underline underline-offset-2 hover:text-accent"
          >
            {page.relatedLink.label}
          </Link>
          .
        </p>
      </div>
    </article>
  );
}
