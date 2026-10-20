import { ConfigKeyLabel } from "./config-key-label";

interface DesignSystemSectionProps {
  id: string;
  number: number;
  title: string;
  configKey: string;
  usedOn?: string[];
  children: React.ReactNode;
}

export function DesignSystemSection({
  id,
  number,
  title,
  configKey,
  usedOn,
  children,
}: DesignSystemSectionProps) {
  return (
    <section id={id} className="scroll-mt-20 border-b border-border py-8 sm:scroll-mt-24 sm:py-12">
      <div className="mb-6">
        <p className="text-small font-medium text-accent">
          Section {number}
        </p>
        <h2 className="text-h2 mt-1">{title}</h2>
      </div>
      <div>{children}</div>
      <ConfigKeyLabel configKey={configKey} usedOn={usedOn} />
    </section>
  );
}
