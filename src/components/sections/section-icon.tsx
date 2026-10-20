import {
  Briefcase,
  Compass,
  FileText,
  Gauge,
  Image as ImageIcon,
  Layers,
  Rocket,
  Search,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, LucideIcon> = {
  briefcase: Briefcase,
  target: Target,
  search: Search,
  "file-text": FileText,
  image: ImageIcon,
  layers: Layers,
  compass: Compass,
  users: Users,
  gauge: Gauge,
  "shield-check": ShieldCheck,
  rocket: Rocket,
  "trending-up": TrendingUp,
};

type SectionIconTone = "accent" | "primary";

interface SectionIconProps {
  name: string;
  className?: string;
  /** Larger tinted tile for service / values cards */
  framed?: boolean;
  /** Framed / icon color. Defaults to accent (existing sections unchanged). */
  tone?: SectionIconTone;
}

const framedToneClass: Record<SectionIconTone, string> = {
  accent: "border-accent/20 bg-accent/10",
  primary: "border-primary/15 bg-primary/5",
};

const iconToneClass: Record<SectionIconTone, string> = {
  accent: "text-accent",
  primary: "text-primary",
};

export function SectionIcon({
  name,
  className,
  framed = false,
  tone = "accent",
}: SectionIconProps) {
  const Icon = ICON_MAP[name] ?? Briefcase;

  if (framed) {
    return (
      <span
        className={cn(
          "mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md border",
          framedToneClass[tone],
          className,
        )}
        aria-hidden="true"
      >
        <Icon className={cn("h-6 w-6", iconToneClass[tone])} />
      </span>
    );
  }

  return (
    <Icon
      className={cn("h-5 w-5", iconToneClass[tone], className)}
      aria-hidden="true"
    />
  );
}
