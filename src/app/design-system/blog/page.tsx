import type { Metadata } from "next";
import { BlogDesignSystemPage } from "@/components/design-system/blog-design-system-page";

export const metadata: Metadata = {
  title: "Blog Design System — eCom Gliders",
  description:
    "Internal catalog of blog blocks, charts, rails, and editorial patterns. Not indexed.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <BlogDesignSystemPage />;
}
