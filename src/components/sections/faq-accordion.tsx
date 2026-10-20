"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface FaqAccordionProps {
  items: Array<{ question: string; answer: string }>;
  variant?: "default" | "lime";
}

export function FaqAccordion({
  items,
  variant = "default",
}: FaqAccordionProps) {
  const isLime = variant === "lime";

  return (
    <Accordion type="single" collapsible className="w-full max-w-none">
      {items.map((item, index) => {
        const itemValue = `faq-${index}`;
        const isLast = index === items.length - 1;

        return (
          <AccordionItem
            key={itemValue}
            value={itemValue}
            className={cn(
              isLime
                ? cn(
                    "border-primary/25 px-0",
                    !isLast && "border-b",
                    isLast && "border-b-0",
                  )
                : cn(
                    "border-primary/15 px-4 sm:px-6",
                    !isLast && "border-b-2",
                    isLast && "border-b-0",
                  ),
            )}
          >
            <AccordionTrigger
              className={cn(
                "py-5 text-left tracking-tight hover:no-underline sm:py-6",
                isLime
                  ? "text-base font-bold text-primary sm:text-lg [&[data-state=open]]:text-primary [&>svg]:h-7 [&>svg]:w-7 [&>svg]:rounded-full [&>svg]:bg-primary [&>svg]:p-1.5 [&>svg]:text-accent"
                  : "text-base font-bold text-primary sm:text-lg",
              )}
            >
              {item.question}
            </AccordionTrigger>
            <AccordionContent>
              <p
                className={cn(
                  "pb-2 text-sm font-medium leading-relaxed sm:text-base",
                  isLime ? "text-primary/75" : "text-text-secondary",
                )}
              >
                {item.answer}
              </p>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
