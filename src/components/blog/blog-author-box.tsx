import type { BlogAuthorProfile } from "@/lib/blog/get-blog-author";

interface BlogAuthorBoxProps {
  author: BlogAuthorProfile;
}

export function BlogAuthorBox({ author }: BlogAuthorBoxProps) {
  const initials = author.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <section
      aria-labelledby="blog-author-heading"
      className="mt-12 rounded-lg border border-border bg-surface p-6"
    >
      <h2 id="blog-author-heading" className="sr-only">
        About the author
      </h2>
      <div className="flex items-start gap-4">
        <div
          aria-hidden="true"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-small font-semibold text-text-on-dark"
        >
          {initials}
        </div>
        <div>
          <p className="text-body font-semibold text-text-primary">{author.name}</p>
          <p className="text-small font-medium text-text-secondary">{author.title}</p>
          <p className="mt-2 text-body font-medium text-text-secondary">{author.bio}</p>
        </div>
      </div>
    </section>
  );
}
