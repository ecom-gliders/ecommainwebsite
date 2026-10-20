"use client";

import { getReviewSections } from "@/lib/content-config";
import { designSystemReviewConfig } from "@/lib/content-config";

const sections = getReviewSections();

export function DesignSystemMobileNav() {
  const { label, placeholder } = designSystemReviewConfig.mobileNav;

  return (
    <div className="mb-6 lg:hidden">
      <label htmlFor="section-jump" className="text-small mb-2 block font-medium text-text-secondary">
        {label}
      </label>
      <select
        id="section-jump"
        className="h-11 w-full rounded-sm border border-border bg-background px-3 text-body text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        defaultValue=""
        onChange={(event) => {
          const target = document.getElementById(event.target.value);
          target?.scrollIntoView({ behavior: "smooth", block: "start" });
          event.target.value = "";
        }}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {sections.map((section) => (
          <option key={section.id} value={section.id}>
            {section.number}. {section.title}
          </option>
        ))}
      </select>
    </div>
  );
}
