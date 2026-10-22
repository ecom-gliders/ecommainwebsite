import {
  BarChart3,
  LayoutGrid,
  Megaphone,
  Rocket,
  Shield,
  Target,
  type LucideIcon,
} from "lucide-react";

export interface FeatureGridCard {
  title: string;
  description: string;
}

interface BlogFeatureGridProps {
  cards: FeatureGridCard[];
}

const CARD_ICONS: LucideIcon[] = [
  Target,
  Rocket,
  Shield,
  BarChart3,
  Megaphone,
  LayoutGrid,
];

export function BlogFeatureGrid({ cards }: BlogFeatureGridProps) {
  if (cards.length === 0) return null;

  return (
    <ul className="my-8 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2">
      {cards.map((card, index) => {
        const Icon = CARD_ICONS[index % CARD_ICONS.length];
        return (
          <li
            key={card.title}
            className="border-2 border-primary bg-background p-5 shadow-[3px_3px_0_0_#131311]"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center bg-accent text-primary">
              <Icon className="h-5 w-5" aria-hidden="true" strokeWidth={2} />
            </div>
            <h3 className="text-h4 mb-2 text-text-primary">{card.title}</h3>
            <p className="text-body text-text-secondary">{card.description}</p>
          </li>
        );
      })}
    </ul>
  );
}

/** Parse `title | description` lines from a feature-grid fence body. */
export function parseFeatureGridBody(body: string): FeatureGridCard[] {
  return body
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const sep = line.indexOf("|");
      if (sep < 0) {
        return { title: line, description: "" };
      }
      return {
        title: line.slice(0, sep).trim(),
        description: line.slice(sep + 1).trim(),
      };
    })
    .filter((card) => card.title && card.description);
}
