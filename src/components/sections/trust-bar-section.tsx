import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { readRecordArray, readString } from "./section-data";
import { SectionShell } from "./section-shell";

interface TrustBarSectionProps {
  id: string;
  data: Record<string, unknown>;
}

interface LogoItem {
  label: string;
  image: string;
  alt: string;
  href?: string;
}

interface MetricItem {
  value: string;
  label: string;
  note: string;
}

type TileTone = "lime" | "cream";

/** Full bento target — 4 columns × 3 rows. */
const GRID_COLS = 4;
const GRID_CELLS = GRID_COLS * 3;

function readLogoItems(value: unknown): LogoItem[] {
  return readRecordArray(value).flatMap((item) => {
    const label = readString(item.label);
    const image = readString(item.image);
    const alt = readString(item.alt, label);
    const href = readString(item.href) || undefined;
    if (!label && !image) return [];
    return [{ label, image, alt, href }];
  });
}

function MetricTile({ item }: { item: MetricItem }) {
  return (
    <div className="flex h-full min-h-[9rem] flex-col justify-between rounded-[10px] bg-accent p-3.5 text-primary sm:min-h-[13rem] sm:p-6">
      <p className="text-[1.85rem] font-black leading-none tracking-[-0.04em] sm:text-[2.75rem] lg:text-[2.85rem] xl:text-[3.8rem]">
        {item.value}
      </p>
      <div className="mt-3 space-y-1 sm:mt-4">
        <p className="text-xs font-bold leading-snug sm:text-base">{item.label}</p>
        {item.note ? (
          <p className="text-xs font-normal leading-relaxed text-primary/70 sm:text-sm">
            {item.note}
          </p>
        ) : null}
      </div>
    </div>
  );
}

function LogoTile({ item, tone }: { item: LogoItem; tone: TileTone }) {
  const inner = (
    <div
      className={cn(
        "relative flex h-full min-h-[9rem] items-center justify-center overflow-hidden rounded-[10px] p-3 sm:min-h-[13rem] sm:p-5",
        /* Cream tiles use pure white so logo canvases with white plates blend */
        tone === "lime" ? "bg-accent" : "bg-white",
      )}
    >
      {item.image ? (
        <div className="relative h-20 w-full max-w-[12.5rem] sm:h-32 sm:max-w-[16rem] lg:h-36 lg:max-w-[18rem]">
          <Image
            src={item.image}
            alt={item.alt || item.label}
            fill
            className="object-contain"
            sizes="(max-width: 640px) 200px, 288px"
            quality={85}
            loading="lazy"
          />
        </div>
      ) : (
        <p className="text-center text-sm font-bold uppercase tracking-[0.08em] text-primary">
          {item.label}
        </p>
      )}
    </div>
  );

  if (item.href) {
    return (
      <Link
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
      >
        {inner}
      </Link>
    );
  }

  return inner;
}

type BentoCell =
  | { kind: "metric"; item: MetricItem; key: string; tone: TileTone }
  | { kind: "logo"; item: LogoItem; key: string; tone: TileTone };

/**
 * Build a full 4×3 checkerboard: lime/cream blend across every row.
 * Metrics prefer lime slots; remaining lime + all cream slots take colored logos.
 */
function buildBentoCells(
  metrics: MetricItem[],
  logos: LogoItem[],
): BentoCell[] {
  const limeIndexes: number[] = [];
  const creamIndexes: number[] = [];

  for (let i = 0; i < GRID_CELLS; i += 1) {
    const row = Math.floor(i / GRID_COLS);
    const col = i % GRID_COLS;
    if ((row + col) % 2 === 0) limeIndexes.push(i);
    else creamIndexes.push(i);
  }

  const cells: Array<BentoCell | null> = Array.from(
    { length: GRID_CELLS },
    () => null,
  );

  const metricQueue = [...metrics];
  const logoQueue = [...logos];

  for (const index of limeIndexes) {
    const metric = metricQueue.shift();
    if (metric) {
      cells[index] = {
        kind: "metric",
        item: metric,
        key: `metric-${metric.value}`,
        tone: "lime",
      };
      continue;
    }
    const logo = logoQueue.shift();
    if (logo) {
      cells[index] = {
        kind: "logo",
        item: logo,
        key: `logo-lime-${logo.image || logo.label}`,
        tone: "lime",
      };
    }
  }

  for (const index of creamIndexes) {
    const logo = logoQueue.shift();
    if (logo) {
      cells[index] = {
        kind: "logo",
        item: logo,
        key: `logo-cream-${logo.image || logo.label}`,
        tone: "cream",
      };
    }
  }

  return cells.filter((cell): cell is BentoCell => cell !== null);
}

/**
 * Project One trust bento — dark ink field, lime/cream checkerboard,
 * colored partner marks only. eCom verified claims and assets only.
 */
export function TrustBarSection({ id, data }: TrustBarSectionProps) {
  const eyebrow = readString(data.eyebrow);
  const heading = readString(data.heading);
  const subheading = readString(data.subheading);
  const headingId = `${id}-heading`;

  const metrics: MetricItem[] = readRecordArray(data.metrics)
    .map((item) => {
      const value = readString(item.value);
      const label = readString(item.label);
      if (!value || !label) return null;
      return {
        value,
        label,
        note: readString(item.note),
      };
    })
    .filter((item): item is MetricItem => item !== null);

  const partners = readLogoItems(data.partners);
  const clients = readLogoItems(data.clients);
  const reviews = readLogoItems(data.reviews);
  const press = readLogoItems(data.press);
  /** Colored marks only — curated in homepage.json (greyscale client marks excluded). */
  const logos = [...partners, ...reviews, ...press, ...clients];

  const cells = buildBentoCells(metrics, logos);

  if (cells.length === 0 && !heading && !eyebrow) return null;

  return (
    <SectionShell
      id={id}
      ariaLabelledBy={heading || eyebrow ? headingId : undefined}
      tone="primary"
      className="py-12 sm:py-16 lg:py-20"
    >
      <div className={cn("mx-auto max-w-3xl text-center")}>
        {eyebrow ? (
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
            {eyebrow}
          </p>
        ) : null}
        {heading ? (
          <h2
            id={headingId}
            className="mt-3 text-[1.85rem] font-black leading-[1.05] tracking-[-0.04em] text-text-on-dark text-balance sm:text-[2.5rem] lg:text-[3rem] lg:leading-[1.05]"
          >
            {heading}
          </h2>
        ) : eyebrow ? (
          <span id={headingId} className="sr-only">
            {eyebrow}
          </span>
        ) : null}
        {subheading ? (
          <p className="mx-auto mt-4 max-w-2xl text-base font-normal leading-relaxed text-white/65 sm:text-lg">
            {subheading}
          </p>
        ) : null}
      </div>

      {cells.length > 0 ? (
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 lg:grid-cols-4">
          {cells.map((cell) => (
            <li key={cell.key} className="h-full">
              {cell.kind === "metric" ? (
                <MetricTile item={cell.item} />
              ) : (
                <LogoTile item={cell.item} tone={cell.tone} />
              )}
            </li>
          ))}
        </ul>
      ) : null}
    </SectionShell>
  );
}
