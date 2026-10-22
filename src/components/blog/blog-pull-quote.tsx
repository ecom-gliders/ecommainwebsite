interface BlogPullQuoteProps {
  quote: string;
  attribution?: string;
}

export function BlogPullQuote({ quote, attribution }: BlogPullQuoteProps) {
  if (!quote) return null;

  return (
    <figure className="my-10 border-y-2 border-primary bg-accent/20 px-6 py-8 text-center">
      <blockquote className="text-xl font-semibold leading-snug tracking-tight text-text-primary md:text-2xl">
        {quote}
      </blockquote>
      {attribution ? (
        <figcaption className="mt-4 text-small font-medium text-text-secondary">
          {attribution}
        </figcaption>
      ) : null}
    </figure>
  );
}

/** Body: quote line, optional second line `— Name` */
export function parsePullQuoteBody(body: string): {
  quote: string;
  attribution?: string;
} {
  const lines = body.split("\n").map((l) => l.trim()).filter(Boolean);
  if (lines.length === 0) return { quote: "" };
  const attr = lines.find((l) => /^[—–-]\s*/.test(l));
  const quote = lines.filter((l) => l !== attr).join(" ").replace(/^["“]|["”]$/g, "");
  return {
    quote,
    attribution: attr?.replace(/^[—–-]\s*/, ""),
  };
}
