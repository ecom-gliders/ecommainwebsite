interface BlogMarketplaceChipsProps {
  markets: string[];
}

export function BlogMarketplaceChips({ markets }: BlogMarketplaceChipsProps) {
  if (markets.length === 0) return null;

  return (
    <ul className="my-6 flex list-none flex-wrap gap-2 p-0">
      {markets.map((market) => (
        <li
          key={market}
          className="border-2 border-primary bg-accent px-3 py-1.5 text-small font-bold uppercase tracking-[0.08em] text-primary shadow-[2px_2px_0_0_#131311]"
        >
          {market}
        </li>
      ))}
    </ul>
  );
}

/** Body: comma or newline separated market codes/names */
export function parseMarketplaceChipsBody(body: string): string[] {
  return body
    .split(/[\n,]/)
    .map((part) => part.trim())
    .filter(Boolean);
}
