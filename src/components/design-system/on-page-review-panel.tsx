"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { designSystemReviewConfig } from "@/lib/content-config";

export function OnPageReviewPanel() {
  const { eyebrow, title, description, storageKey, items } =
    designSystemReviewConfig.reviewChecklist;
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey);
    if (stored) {
      try {
        setChecked(JSON.parse(stored) as Record<string, boolean>);
      } catch {
        setChecked({});
      }
    }
  }, [storageKey]);

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      window.localStorage.setItem(storageKey, JSON.stringify(next));
      return next;
    });
  };

  const doneCount = items.filter((item) => checked[item.id]).length;

  return (
    <section
      aria-labelledby="on-page-review-heading"
      className="mb-8 rounded-lg border border-accent/20 bg-surface p-5 sm:p-6"
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-small font-medium text-accent">{eyebrow}</p>
          <h2 id="on-page-review-heading" className="text-h4 mt-1">
            {title}
          </h2>
          <p className="text-small mt-1 text-text-secondary">{description}</p>
        </div>
        <p className="text-small shrink-0 font-medium text-text-primary">
          {doneCount}/{items.length} done
        </p>
      </div>

      <ul className="space-y-3">
        {items.map((item) => {
          const isChecked = Boolean(checked[item.id]);
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => toggle(item.id)}
                className="flex w-full items-start gap-3 rounded-md border border-border bg-background p-3 text-left transition-colors hover:border-accent/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-pressed={isChecked}
              >
                {isChecked ? (
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" aria-hidden="true" />
                ) : (
                  <Circle className="mt-0.5 h-5 w-5 shrink-0 text-border-strong" aria-hidden="true" />
                )}
                <span>
                  <span className="text-small block font-medium text-text-primary">
                    {item.label}
                  </span>
                  <span className="text-small mt-0.5 block text-text-secondary">
                    {item.hint}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
