import Image from "next/image";
import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface CatAttributeGridProps {
  service: ServicePageConfig;
}

const COVERAGE_AXES = [
  "Listing health",
  "Suppressions",
  "Variations",
  "Attributes",
  "Launch setup",
  "PPC alignment",
  "Cases",
  "Reporting",
] as const;

const DEL_IMAGES = [
  "/images/services/amazon-catalog-management/cat-del-health.jpg",
  "/images/services/amazon-catalog-management/cat-del-suppress.jpg",
  "/images/services/amazon-catalog-management/cat-del-variation.jpg",
  "/images/services/amazon-catalog-management/cat-del-attrs.jpg",
  "/images/services/amazon-catalog-management/cat-del-launch.jpg",
  "/images/services/amazon-catalog-management/cat-del-report.jpg",
  "/images/services/amazon-catalog-management/cat-del-ppc.jpg",
  "/images/services/amazon-catalog-management/cat-del-cases.jpg",
] as const;

/** Deliverables as attribute coverage grid - not overlapping paper stack. */
export function CatAttributeGrid({ service }: CatAttributeGridProps) {
  const { deliverables } = service;
  const items = deliverables.items.slice(0, 8);

  return (
    <section
      id="service-deliverables"
      className={cn("bg-primary text-text-on-dark", serviceSectionPad)}
      aria-labelledby="service-deliverables-heading"
    >
      <ServicePageShell>
        <h2
          id="service-deliverables-heading"
          className="max-w-3xl text-2xl font-black tracking-tight text-text-on-dark sm:text-[1.75rem]"
        >
          {deliverables.heading}
        </h2>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <li
              key={item.title}
              className="overflow-hidden border border-accent/50 bg-[#1a1a18]"
            >
              <div className="relative aspect-[16/10] w-full border-b border-accent/40">
                <Image
                  src={DEL_IMAGES[index % DEL_IMAGES.length]}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-3">
                <p className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-accent">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-1 text-sm font-black leading-snug text-text-on-dark">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-xs font-medium leading-snug text-text-on-dark/70">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-8 overflow-x-auto border-2 border-accent">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              <tr className="border-b-2 border-accent bg-[#1a1a18]">
                <th
                  scope="col"
                  className="p-3 font-mono text-xs font-bold uppercase tracking-[0.08em] text-accent"
                >
                  Coverage map
                </th>
                {COVERAGE_AXES.map((axis) => (
                  <th
                    key={axis}
                    scope="col"
                    className="border-l border-accent/30 p-2 text-center font-mono text-[8px] font-bold uppercase tracking-[0.06em] text-text-on-dark/70 [writing-mode:vertical-rl] sm:[writing-mode:horizontal-tb] sm:text-xs"
                  >
                    {axis}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, rowIndex) => (
                <tr
                  key={item.title}
                  className={cn(
                    "border-b border-accent/25",
                    rowIndex % 2 === 0 ? "bg-primary" : "bg-[#222220]",
                  )}
                >
                  <th scope="row" className="p-3 align-middle font-normal">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-14 shrink-0 overflow-hidden border border-accent/40">
                        <Image
                          src={DEL_IMAGES[rowIndex % DEL_IMAGES.length]}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </div>
                      <p className="text-sm font-black text-text-on-dark">
                        {item.title}
                      </p>
                    </div>
                  </th>
                  {COVERAGE_AXES.map((axis, colIndex) => {
                    const covered =
                      (rowIndex + colIndex) % 3 !== 0 || colIndex === rowIndex % 8;
                    return (
                      <td
                        key={axis}
                        className="border-l border-accent/20 p-2 text-center align-middle"
                      >
                        <span
                          className={cn(
                            "inline-block h-4 w-4 border-2",
                            covered
                              ? "border-accent bg-accent"
                              : "border-text-on-dark/30 bg-transparent",
                          )}
                          aria-label={covered ? "Covered" : "Out of scope"}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ServicePageShell>
    </section>
  );
}
