"use client";

import { useState } from "react";

export interface PersonaTab {
  id: string;
  label: string;
  body: string;
}

interface BlogPersonaTabsProps {
  tabs: PersonaTab[];
}

export function BlogPersonaTabs({ tabs }: BlogPersonaTabsProps) {
  const [active, setActive] = useState(tabs[0]?.id ?? "");
  if (tabs.length === 0) return null;

  const current = tabs.find((tab) => tab.id === active) ?? tabs[0];

  return (
    <div className="my-8 border-2 border-primary bg-background shadow-[3px_3px_0_0_#131311]">
      <div
        role="tablist"
        aria-label="Reader path"
        className="flex flex-wrap border-b-2 border-primary"
      >
        {tabs.map((tab) => {
          const selected = tab.id === current.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={selected}
              id={`persona-tab-${tab.id}`}
              aria-controls={`persona-panel-${tab.id}`}
              onClick={() => setActive(tab.id)}
              className={
                selected
                  ? "border-r-2 border-primary bg-accent px-4 py-2.5 text-small font-bold text-primary"
                  : "border-r-2 border-primary px-4 py-2.5 text-small font-medium text-text-secondary hover:bg-surface-muted"
              }
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div
        role="tabpanel"
        id={`persona-panel-${current.id}`}
        aria-labelledby={`persona-tab-${current.id}`}
        className="p-5 text-body text-text-secondary"
      >
        {current.body}
      </div>
    </div>
  );
}

/**
 * Body:
 * ## Brand seller
 * paragraph...
 * ## Wholesale
 * ...
 */
export function parsePersonaTabsBody(body: string): PersonaTab[] {
  const tabs: PersonaTab[] = [];
  let current: PersonaTab | null = null;

  for (const raw of body.split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    const h = line.match(/^##\s+(.+)$/);
    if (h) {
      const label = h[1].trim();
      current = {
        id: label.toLowerCase().replace(/[^\w]+/g, "-").replace(/^-|-$/g, ""),
        label,
        body: "",
      };
      tabs.push(current);
      continue;
    }
    if (current) {
      current.body = current.body ? `${current.body} ${line}` : line;
    }
  }

  return tabs.filter((tab) => tab.label && tab.body);
}
