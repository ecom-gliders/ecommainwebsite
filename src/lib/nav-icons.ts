import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Briefcase,
  Building2,
  ClipboardList,
  FileText,
  Image,
  Layers,
  Mail,
  PackageSearch,
  ShoppingBag,
  Store,
  Target,
  Video,
  ShieldCheck,
} from "lucide-react";

const navIconMap: Record<string, LucideIcon> = {
  briefcase: Briefcase,
  target: Target,
  layers: Layers,
  "bar-chart": BarChart3,
  "file-text": FileText,
  image: Image,
  video: Video,
  "clipboard-list": ClipboardList,
  "shield-check": ShieldCheck,
  building: Building2,
  "package-search": PackageSearch,
  store: Store,
  "shopping-bag": ShoppingBag,
  mail: Mail,
};

export function getNavIcon(iconKey: string | undefined): LucideIcon | null {
  if (!iconKey) {
    return null;
  }

  return navIconMap[iconKey] ?? null;
}
