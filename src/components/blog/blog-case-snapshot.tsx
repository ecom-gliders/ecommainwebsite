interface BlogCaseSnapshotProps {
  niche: string;
  metric: string;
  detail: string;
}

export function BlogCaseSnapshot({
  niche,
  metric,
  detail,
}: BlogCaseSnapshotProps) {
  return (
    <aside className="my-8 grid gap-4 border-2 border-primary bg-surface p-5 shadow-[3px_3px_0_0_#131311] sm:grid-cols-[1fr_auto]">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-text-secondary">
          Case snapshot
        </p>
        <p className="mt-1 text-h4 text-text-primary">{niche}</p>
        <p className="mt-2 text-small font-medium text-text-secondary">{detail}</p>
      </div>
      <div className="flex items-center justify-center border-2 border-primary bg-accent px-5 py-3 text-center">
        <p className="text-xl font-black tracking-tight text-primary">{metric}</p>
      </div>
    </aside>
  );
}

/** Body: `niche | metric | detail` */
export function parseCaseSnapshotBody(body: string): BlogCaseSnapshotProps | null {
  const line = body.split("\n").map((l) => l.trim()).find(Boolean);
  if (!line) return null;
  const parts = line.split("|").map((p) => p.trim());
  if (parts.length < 3) return null;
  return { niche: parts[0], metric: parts[1], detail: parts[2] };
}
