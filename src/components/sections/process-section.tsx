import { SwingCallout } from "@/components/ui/swing-callout";
import { cn } from "@/lib/utils";
import { readRecordArray, readString } from "./section-data";
import { SectionShell } from "./section-shell";

interface ProcessSectionProps {
  id: string;
  data: Record<string, unknown>;
}

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  /** 1-based column index within the phase grid. */
  column: number;
}

/**
 * Project One process language: phase header row + lime staircase cards
 * in a hairline column grid. eCom Gliders steps / closing copy only.
 */
export function ProcessSection({ id, data }: ProcessSectionProps) {
  const eyebrow = readString(data.eyebrow, "Engagement flow");
  const heading = readString(data.heading);
  const subheading = readString(data.subheading);
  const swingNote = readString(data.swingNote);
  const closingText = readString(data.closingText);
  const phases = readRecordArray(data.phases)
    .map((phase) => readString(phase.label) || readString(phase.title))
    .filter(Boolean);
  const steps = readRecordArray(data.steps);
  const headingId = `${id}-heading`;

  const parsedSteps: ProcessStep[] = steps
    .map((step, index) => {
      const number = readString(step.number) || String(index + 1).padStart(2, "0");
      const title = readString(step.title);
      const description = readString(step.description);
      const columnRaw = Number(step.column);
      const column =
        Number.isFinite(columnRaw) && columnRaw >= 1
          ? Math.floor(columnRaw)
          : index + 1;
      if (!title) return null;
      return { number, title, description, column };
    })
    .filter((step): step is ProcessStep => step !== null);

  const phaseLabels =
    phases.length > 0
      ? phases
      : parsedSteps.map((step) => step.title).slice(0, 4);

  const colCount = Math.min(5, Math.max(1, phaseLabels.length));
  const columns = Array.from({ length: colCount }, (_, i) =>
    parsedSteps.filter((step) => Math.min(step.column, colCount) === i + 1),
  );

  return (
    <SectionShell
      id={id}
      ariaLabelledBy={headingId}
      className="overflow-x-clip py-12 sm:py-16 lg:py-20"
    >
      <div className="relative mx-auto max-w-2xl text-center">
        {eyebrow ? (
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-text-secondary">
            {eyebrow}
          </p>
        ) : null}
        <h2
          id={headingId}
          className="mt-3 text-[1.85rem] font-black leading-[1.1] tracking-[-0.02em] text-text-primary text-balance sm:text-[2.35rem] lg:text-[40px] lg:leading-[1.15]"
        >
          {heading}
        </h2>
        {subheading ? (
          <p className="mt-4 text-base font-medium leading-relaxed text-text-secondary sm:text-lg">
            {subheading}
          </p>
        ) : null}
        {swingNote ? (
          <SwingCallout
            text={swingNote}
            arrow="down-left"
            className="absolute -right-6 top-8 xl:-right-36 xl:top-6"
          />
        ) : null}
      </div>

      {parsedSteps.length > 0 ? (
        <div className="mt-10 sm:mt-12">
          {/* Mobile / tablet: stacked cards */}
          <ol className="grid gap-4 sm:grid-cols-2 lg:hidden">
            {parsedSteps.map((step, index) => (
              <li key={`${step.number}-${step.title}`}>
                <ProcessCard step={step} index={index} />
              </li>
            ))}
          </ol>

          {/* Desktop: PO-style hairline columns + staggered rows */}
          <div
            className={cn(
              "hidden border-y border-primary/15 lg:grid",
              colCount === 5 && "lg:grid-cols-5",
              colCount === 4 && "lg:grid-cols-4",
              colCount === 3 && "lg:grid-cols-3",
              colCount === 2 && "lg:grid-cols-2",
              colCount === 1 && "lg:grid-cols-1",
            )}
          >
            {phaseLabels.slice(0, colCount).map((label, colIndex) => (
              <div
                key={`phase-${label}`}
                className={cn(
                  "flex min-h-[22rem] flex-col border-primary/15",
                  colIndex > 0 && "border-l",
                )}
              >
                <p
                  className="border-b border-primary/15 px-3 py-3 text-center text-xs font-bold uppercase tracking-[0.12em] text-text-secondary"
                  aria-hidden="true"
                >
                  {label}
                </p>
                <div
                  className={cn(
                    "flex flex-1 flex-col gap-4 px-3 py-5",
                    colIndex === 0 && "pt-5",
                    colIndex === 1 && "pt-12",
                    colIndex === 2 && "pt-20",
                    colIndex === 3 && "pt-16",
                    colIndex >= 4 && "pt-24",
                  )}
                >
                  {columns[colIndex]?.map((step) => {
                    const globalIndex = parsedSteps.findIndex(
                      (s) => s.number === step.number && s.title === step.title,
                    );
                    return (
                      <ProcessCard
                        key={`${step.number}-${step.title}`}
                        step={step}
                        index={globalIndex}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {closingText ? (
        <p className="mx-auto mt-12 max-w-3xl text-center text-xl font-bold leading-snug tracking-[-0.02em] text-text-primary text-balance sm:mt-14 sm:text-2xl lg:text-[1.75rem] lg:leading-snug">
          {closingText}
        </p>
      ) : null}
    </SectionShell>
  );
}

function ProcessCard({
  step,
  index,
}: {
  step: ProcessStep;
  index: number;
}) {
  const displayNumber =
    step.number.replace(/^0/, "") || String(index + 1);

  return (
    <article className="relative flex w-full flex-col rounded-[10px] border-2 border-primary bg-accent p-5 text-primary shadow-[4px_4px_0_0_#131311] sm:p-5">
      <span
        className="absolute right-3 top-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-text-on-dark"
        aria-hidden="true"
      >
        {displayNumber}
      </span>
      <h3 className="pr-9 text-lg font-bold tracking-tight sm:text-xl">
        {step.title}
      </h3>
      {step.description ? (
        <p className="mt-2 text-sm font-medium leading-relaxed text-primary/80">
          {step.description}
        </p>
      ) : null}
    </article>
  );
}
