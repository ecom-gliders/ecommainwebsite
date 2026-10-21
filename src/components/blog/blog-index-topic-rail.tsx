import type { BlogIndexTopicStack } from "@/lib/blog/build-blog-index-model";

interface BlogIndexTopicRailProps {
  topics: BlogIndexTopicStack[];
}

export function BlogIndexTopicRail({ topics }: BlogIndexTopicRailProps) {
  if (topics.length === 0) {
    return null;
  }

  return (
    <nav
      className="border-y border-border bg-background"
      aria-label="Blog topics"
    >
      <div className="container-page">
        <ul className="-mx-1 flex gap-2 overflow-x-auto py-3 scrollbar-thin">
          {topics.map((topic) => (
            <li key={topic.id} className="shrink-0">
              <a
                href={`#topic-${topic.id}`}
                className="inline-flex min-h-10 items-center rounded-[8px] border-2 border-primary bg-background px-4 text-small font-semibold text-primary transition-colors hover:border-accent hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                {topic.label}
              </a>
            </li>
          ))}
          <li className="shrink-0">
            <a
              href="#latest"
              className="inline-flex min-h-10 items-center rounded-[8px] border-2 border-transparent px-4 text-small font-semibold text-primary underline-offset-4 decoration-accent decoration-2 hover:border-accent hover:bg-accent hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              Latest articles
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
