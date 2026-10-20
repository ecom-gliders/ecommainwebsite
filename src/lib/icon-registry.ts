import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Mail,
  Menu,
  Phone,
  Search,
  Shield,
  Star,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

export const iconRegistry = {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Mail,
  Menu,
  Phone,
  Search,
  Shield,
  Star,
  TrendingUp,
} as const satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof iconRegistry;

export function getIcon(name: string): LucideIcon | undefined {
  return iconRegistry[name as IconName];
}
