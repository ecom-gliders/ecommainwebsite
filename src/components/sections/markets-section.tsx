import Image from "next/image";
import { readRecordArray, readString } from "./section-data";
import { SectionShell } from "./section-shell";

interface MarketsSectionProps {
  id: string;
  data: Record<string, unknown>;
}

interface MarketItem {
  code: string;
  name: string;
  flag: string;
  flagAlt: string;
}

/**
 * Marketplace chips — FAQ-aligned Amazon regions only.
 * Hard PO chrome; real flag PNGs (no emoji).
 */
export function MarketsSection({ id, data }: MarketsSectionProps) {
  const eyebrow = readString(data.eyebrow);
  const heading = readString(data.heading);
  const subheading = readString(data.subheading);
  const headingId = `${id}-heading`;

  const markets = readRecordArray(data.markets).flatMap((item) => {
    const code = readString(item.code).toUpperCase();
    const name = readString(item.name);
    const flag = readString(item.flag);
    if (!code || !name || !flag) return [];
    return [
      {
        code,
        name,
        flag,
        flagAlt: readString(item.flagAlt, `${name} flag`),
      } satisfies MarketItem,
    ];
  });

  if (!heading || markets.length === 0) return null;

  return (
    <SectionShell
      id={id}
      ariaLabelledBy={headingId}
      className="overflow-x-clip py-10 sm:py-14 lg:py-16"
    >
      <div className="mx-auto max-w-3xl text-center">
        {eyebrow ? (
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-text-secondary sm:text-xs">
            {eyebrow}
          </p>
        ) : null}
        <h2
          id={headingId}
          className="mt-3 text-[1.65rem] font-black leading-[1.05] tracking-[-0.04em] text-primary text-balance sm:text-[2.25rem] lg:text-[2.75rem]"
        >
          {heading}
        </h2>
        {subheading ? (
          <p className="mx-auto mt-3 max-w-2xl text-base font-normal leading-relaxed text-text-secondary sm:mt-4 sm:text-lg">
            {subheading}
          </p>
        ) : null}
      </div>

      <ul
        className="mx-auto mt-8 flex max-w-5xl flex-wrap items-center justify-center gap-2.5 sm:mt-10 sm:gap-3"
        aria-label="Amazon marketplaces we manage"
      >
        {markets.map((market) => (
          <li key={market.code}>
            <span className="inline-flex min-h-11 items-center gap-2.5 rounded-[10px] border-2 border-primary bg-background px-3 py-2 shadow-[3px_3px_0_0_#131311] sm:px-3.5">
              <span
                className="text-[10px] font-bold uppercase tracking-[0.12em] text-text-secondary"
                aria-hidden="true"
              >
                {market.code}
              </span>
              <span className="relative h-3.5 w-5 shrink-0 overflow-hidden rounded-[2px] border border-primary/15 bg-surface-muted sm:h-4 sm:w-6">
                <Image
                  src={market.flag}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="24px"
                  quality={80}
                />
              </span>
              <span className="text-sm font-bold tracking-tight text-primary">
                {market.name}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
