"use client";

import * as React from "react";
import { designSystem } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";

interface ElegantCardProps {
  className?: string;
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

const cardMotion = designSystem.motion.card as {
  lift: number;
  duration: number;
};

/**
 * Minimal card hover — CSS lift/shadow respects prefers-reduced-motion
 * without motion/react console warnings.
 */
export function ElegantCard({
  className,
  title,
  description,
  children,
}: ElegantCardProps) {
  const durationMs = cardMotion.duration;

  return (
    <div
      className={cn(
        "rounded-[10px] border-2 border-primary transition-[transform,box-shadow,border-color] bg-background",
        "motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[6px_6px_0_0_#131311]",
        className,
      )}
      style={{ transitionDuration: `${durationMs}ms` }}
    >
      <Card className="border-0 shadow-none">
        {(title || description) && (
          <CardHeader>
            {title && <CardTitle>{title}</CardTitle>}
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
        )}
        {children && <CardContent>{children}</CardContent>}
      </Card>
    </div>
  );
}
