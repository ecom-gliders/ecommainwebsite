import type { FaqItem } from "@/domain/content/schemas";
import { FaqAccordion } from "@/components/sections/faq-accordion";

interface BlogPostFaqProps {
  items: FaqItem[];
}

export function BlogPostFaq({ items }: BlogPostFaqProps) {
  if (items.length === 0) {
    return null;
  }

  const headingId = "blog-post-faq-heading";

  return (
    <section
      aria-labelledby={headingId}
      className="mt-12 border-t border-border pt-10"
    >
      <h2 id={headingId} className="text-h2 mb-6">
        Frequently asked questions
      </h2>
      <FaqAccordion items={items} />
    </section>
  );
}
