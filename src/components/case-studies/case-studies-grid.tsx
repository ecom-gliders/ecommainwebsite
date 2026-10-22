"use client";

import { useMemo, useState } from "react";
import type { CaseStudyCard } from "@/domain/content/schemas";
import { CaseStudyCardItem } from "./case-study-card";

interface CaseStudiesGridProps {
  studies: CaseStudyCard[];
  filters: string[];
  /** Deep-link from mega menu, e.g. /case-studies/?service=PPC */
  initialFilter?: string;
}

export function CaseStudiesGrid({
  studies,
  filters,
  initialFilter = "All",
}: CaseStudiesGridProps) {
  const resolvedInitial = filters.includes(initialFilter)
    ? initialFilter
    : "All";
  const [activeFilter, setActiveFilter] = useState(resolvedInitial);

  const filteredStudies = useMemo(() => {
    if (activeFilter === "All") {
      return studies;
    }

    return studies.filter((study) => study.serviceFilter === activeFilter);
  }, [activeFilter, studies]);

  return (
    <>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter case studies by service">
        {filters.map((filter) => {
          const isActive = filter === activeFilter;

          return (
            <button
              key={filter}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-[8px] border-2 px-4 py-2 text-small font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                isActive
                  ? "border-primary bg-primary text-text-on-dark shadow-[3px_3px_0_0_#131311]"
                  : "border-primary bg-background text-text-secondary hover:bg-[#F4F4F4] hover:text-text-primary"
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      <ul className="mt-10 grid gap-6 lg:grid-cols-3">
        {filteredStudies.map((study) => (
          <CaseStudyCardItem key={study.slug} study={study} />
        ))}
      </ul>

      {filteredStudies.length === 0 ? (
        <p className="mt-10 text-body font-medium text-text-secondary">
          No case studies match this filter. Select another service category.
        </p>
      ) : null}
    </>
  );
}
