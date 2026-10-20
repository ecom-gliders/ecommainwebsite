import { designSystemReviewConfig } from "@/lib/content-config";

export function SkipLink() {
  const { label, target } = designSystemReviewConfig.skipLink;

  return (
    <a
      href={target}
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-sm focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-text-on-dark focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
    >
      {label}
    </a>
  );
}
