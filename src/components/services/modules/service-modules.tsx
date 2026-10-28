import type { ServicePageConfig } from "@/domain/content/schemas";
import { cn } from "@/lib/utils";
import { serviceHardPanel } from "../service-hard-panel";
import { BrandPathwayBoard } from "./brand-pathway-board";
import { BrandUnlockGrid } from "./brand-unlock-grid";
import { BrowserProofStage } from "./browser-proof-stage";
import { CatalogHealthBoard } from "./catalog-health-board";
import { InfographicSpotlight } from "./infographic-spotlight";
import { MetricChart } from "./metric-chart";
import { ProofGalleryGrid } from "./proof-gallery-grid";
import { ServiceModuleShell } from "./service-module-shell";

type ServiceModule = NonNullable<ServicePageConfig["modules"]>[number];

interface ServiceModulesProps {
  modules: ServiceModule[];
  /**
   * flat = no grey/white zebra (default — kills shared dabba rhythm)
   * zebra = legacy alternating bands
   * proof-lead = first module muted, rest default
   */
  band?: "flat" | "zebra" | "proof-lead";
}

function toneForModule(
  band: NonNullable<ServiceModulesProps["band"]>,
  index: number,
  type: ServiceModule["type"],
): "default" | "muted" {
  if (band === "zebra") {
    return index % 2 === 0 ? "muted" : "default";
  }
  if (band === "proof-lead") {
    return index === 0 || type === "browserProof" || type === "proofGallery"
      ? "muted"
      : "default";
  }
  return "default";
}

export function ServiceModules({
  modules,
  band = "flat",
}: ServiceModulesProps) {
  return (
    <>
      {modules.map((module, index) => {
        const tone = toneForModule(band, index, module.type);

        switch (module.type) {
          case "browserProof":
            return (
              <ServiceModuleShell
                key={module.id}
                id={module.id}
                // Callout metric is the visual heading — skip duplicate section title.
                heading={module.callout?.metric ? undefined : module.heading}
                tone={tone}
                density="tight"
              >
                <BrowserProofStage
                  images={module.images}
                  disclaimer={module.subheading}
                  callout={module.callout}
                  heading={module.heading}
                />
              </ServiceModuleShell>
            );

          case "comparisonTable":
            return (
              <ServiceModuleShell
                key={module.id}
                id={module.id}
                heading={module.heading}
                subheading={module.subheading}
                tone={tone}
              >
                <div className={cn(serviceHardPanel, "overflow-x-auto p-5 sm:p-6")}>
                  <table className="w-full min-w-[520px] border-collapse text-left">
                    <thead>
                      <tr className="border-b-2 border-primary">
                        <th className="py-3 pr-4 text-small font-bold text-primary">
                          Factor
                        </th>
                        {module.columns.map((column) => (
                          <th
                            key={column}
                            className="py-3 pr-4 text-small font-bold text-primary last:pr-0"
                          >
                            {column}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {module.rows.map((row) => (
                        <tr
                          key={row.label}
                          className="border-b border-primary/15 last:border-b-0"
                        >
                          <th
                            scope="row"
                            className="py-3 pr-4 text-small font-semibold text-primary"
                          >
                            {row.label}
                          </th>
                          {row.values.map((value, valueIndex) => (
                            <td
                              key={`${row.label}-${valueIndex}`}
                              className="py-3 pr-4 text-small font-medium text-text-secondary last:pr-0"
                            >
                              {value}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </ServiceModuleShell>
            );

          case "processSteps":
            return (
              <ServiceModuleShell
                key={module.id}
                id={module.id}
                heading={module.heading}
                subheading={module.subheading}
                tone={tone}
              >
                {/* Horizontal chip timeline — distinct from Solution stage cards */}
                <ol
                  className={cn(
                    serviceHardPanel,
                    "flex flex-col divide-y-2 divide-primary/10 overflow-hidden bg-[#F4F4F4] md:flex-row md:divide-x-2 md:divide-y-0",
                  )}
                >
                  {module.steps.map((step, stepIndex) => (
                    <li
                      key={step.title}
                      className="flex min-w-0 flex-1 flex-col gap-2 px-4 py-4 sm:px-5 sm:py-5"
                    >
                      <span
                        aria-hidden="true"
                        className="inline-flex h-7 w-7 items-center justify-center rounded-[6px] border-2 border-primary bg-accent text-xs font-bold text-primary shadow-[2px_2px_0_0_#131311]"
                      >
                        {String(stepIndex + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-body font-semibold text-primary">
                        {step.title}
                      </h3>
                      <p className="text-small leading-snug text-text-secondary">
                        {step.description}
                      </p>
                    </li>
                  ))}
                </ol>
              </ServiceModuleShell>
            );

          case "metricChart":
            return (
              <ServiceModuleShell
                key={module.id}
                id={module.id}
                heading={module.heading}
                subheading={module.subheading}
                tone={tone}
              >
                <MetricChart
                  chartLabel={module.chartLabel}
                  points={module.points}
                  footnote={module.footnote}
                  variant={module.variant}
                />
              </ServiceModuleShell>
            );

          case "proofGallery":
            return (
              <ServiceModuleShell
                key={module.id}
                id={module.id}
                heading={module.heading}
                subheading={module.subheading}
                tone={tone}
              >
                <ProofGalleryGrid items={module.items} />
              </ServiceModuleShell>
            );

          case "infographicSpotlight":
            return (
              <ServiceModuleShell
                key={module.id}
                id={module.id}
                heading={module.heading}
                subheading={module.subheading}
                tone={tone}
              >
                <InfographicSpotlight image={module.image} />
              </ServiceModuleShell>
            );

          case "catalogHealthBoard":
            return (
              <ServiceModuleShell
                key={module.id}
                id={module.id}
                heading={module.heading}
                subheading={module.subheading}
                tone={tone}
              >
                <CatalogHealthBoard
                  urlLabel={module.urlLabel}
                  disclaimer={module.disclaimer}
                  columns={module.columns}
                  rows={module.rows}
                  variant={module.variant}
                  boardLabel={module.boardLabel}
                />
              </ServiceModuleShell>
            );

          case "brandPathwayBoard":
            return (
              <ServiceModuleShell
                key={module.id}
                id={module.id}
                heading={module.heading}
                subheading={module.subheading}
                tone={tone}
              >
                <BrandPathwayBoard
                  urlLabel={module.urlLabel}
                  disclaimer={module.disclaimer}
                  stages={module.stages}
                  variant={module.variant}
                />
              </ServiceModuleShell>
            );

          case "brandUnlockGrid":
            return (
              <ServiceModuleShell
                key={module.id}
                id={module.id}
                heading={module.heading}
                subheading={module.subheading}
                tone={tone}
              >
                <BrandUnlockGrid
                  items={module.items}
                  note={module.note}
                  sheetLabel={module.sheetLabel}
                />
              </ServiceModuleShell>
            );

          case "checklistMatrix":
            return (
              <ServiceModuleShell
                key={module.id}
                id={module.id}
                heading={module.heading}
                subheading={module.subheading}
                tone={tone}
              >
                <ul className="grid gap-4 md:grid-cols-2">
                  {module.groups.map((group) => (
                    <li
                      key={group.title}
                      className={cn(
                        serviceHardPanel,
                        "overflow-hidden border-t-4 border-t-accent p-5 sm:p-6",
                      )}
                    >
                      <h3 className="text-h4 text-primary">{group.title}</h3>
                      <ul className="mt-3 space-y-2">
                        {group.items.map((item) => (
                          <li
                            key={item}
                            className="flex gap-2 text-body font-medium text-text-secondary"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-[2px] border-2 border-primary bg-accent"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </ServiceModuleShell>
            );

          default:
            return null;
        }
      })}
    </>
  );
}
