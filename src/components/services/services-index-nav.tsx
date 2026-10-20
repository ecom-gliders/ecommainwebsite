import type { ServicesIndexCategory } from "@/domain/content/schemas";
import { SectionShell } from "@/components/sections/section-shell";

interface ServicesIndexNavProps {
  categories: ServicesIndexCategory[];
}

export function ServicesIndexNav({ categories }: ServicesIndexNavProps) {
  return (
    <SectionShell
      id="services-capability-nav"
      ariaLabelledBy="services-capability-nav-heading"
      tone="muted"
      className="py-8 sm:py-10"
    >
      <p
        id="services-capability-nav-heading"
        className="text-[11px] font-bold uppercase tracking-[0.16em] text-text-secondary sm:text-xs"
      >
        Browse by capability
      </p>
      <nav aria-label="Service capability groups" className="mt-4">
        <ul className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <li key={category.id}>
              <a
                href={`#${category.id}`}
                className="inline-flex rounded-[10px] border-2 border-primary bg-background px-4 py-2 text-small font-semibold text-primary shadow-[3px_3px_0_0_#131311] transition-colors hover:bg-accent"
              >
                {category.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </SectionShell>
  );
}
