interface ConfigKeyLabelProps {
  configKey: string;
  usedOn?: string[];
}

export function ConfigKeyLabel({ configKey, usedOn }: ConfigKeyLabelProps) {
  return (
    <div className="mt-4 space-y-2 rounded-md border border-border bg-surface p-4">
      <p className="text-small font-mono text-text-secondary">
        Config key:{" "}
        <span className="font-semibold text-text-primary">{configKey}</span>
      </p>
      {usedOn && usedOn.length > 0 && (
        <p className="text-small font-medium text-text-secondary">
          Used on: {usedOn.join(", ")}
        </p>
      )}
    </div>
  );
}
