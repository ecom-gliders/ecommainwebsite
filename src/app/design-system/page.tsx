import type { Metadata } from "next";
import { DesignSystemPage } from "@/components/design-system/design-system-page";

export const metadata: Metadata = {
  title: "Design System — eCom Gliders",
  description: "Live design system review page for token and component approval.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <DesignSystemPage />;
}
