import { readRecordArray, readString } from "./section-data";
import { FaqAccordion } from "./faq-accordion";
import { SectionShell } from "./section-shell";

interface FaqSectionProps {
  id: string;
  data: Record<string, unknown>;
}

/**
 * Project One lime FAQ panel — oversized ink heading, hairline accordion.
 * eCom questions and answers from config only.
 */
export function FaqSection({ id, data }: FaqSectionProps) {
  const eyebrow = readString(data.eyebrow, "Answers");
  const heading = readString(data.heading);
  const subheading = readString(data.subheading);
  const items = readRecordArray(data.items).map((item) => ({
    question: readString(item.question),
    answer: readString(item.answer),
  }));
  const headingId = `${id}-heading`;

  return (
    <SectionShell
      id={id}
      ariaLabelledBy={headingId}
      className="py-12 sm:py-16 lg:py-20"
    >
      <div className="overflow-hidden rounded-[20px] bg-accent px-5 py-10 text-primary sm:px-8 sm:py-12 lg:px-12 lg:py-14">
        <div className="max-w-3xl">
          {eyebrow ? (
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary/60 sm:text-xs">
              {eyebrow}
            </p>
          ) : null}
          <h2
            id={headingId}
            className="mt-3 text-[1.85rem] font-black leading-[1.05] tracking-[-0.04em] text-primary text-balance sm:text-[2.75rem] lg:text-[3.8rem] lg:leading-[1.05]"
          >
            {heading}
          </h2>
          {subheading ? (
            <p className="mt-4 max-w-2xl text-base font-normal leading-relaxed text-primary/75 sm:text-lg">
              {subheading}
            </p>
          ) : null}
        </div>

        <div className="mt-8 sm:mt-10 lg:mt-12">
          <FaqAccordion items={items} variant="lime" />
        </div>
      </div>
    </SectionShell>
  );
}
