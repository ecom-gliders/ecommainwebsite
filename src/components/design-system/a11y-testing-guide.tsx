import {
  designSystemReviewConfig,
  getColorTokensForCopy,
  interpolateTokens,
} from "@/lib/content-config";

export function A11yTestingGuide() {
  const { title, subtitle, steps } = designSystemReviewConfig.a11yGuide;
  const colorTokens = getColorTokensForCopy();

  return (
    <div className="mt-6 rounded-lg border border-border bg-surface p-6">
      <p className="text-h4 mb-2">{title}</p>
      <p className="text-small mb-4 text-text-secondary">{subtitle}</p>
      <ol className="space-y-4">
        {steps.map((step, index) => (
          <li key={step.title} className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-text-on-dark">
              {index + 1}
            </span>
            <div>
              <p className="text-small font-medium text-text-primary">{step.title}</p>
              <p className="text-small mt-0.5 text-text-secondary">
                {interpolateTokens(step.detail, colorTokens)}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
