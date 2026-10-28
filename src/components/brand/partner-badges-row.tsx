import Image from "next/image";
import { cn } from "@/lib/utils";

export type PartnerBadgeItem = {
  label: string;
  image: string;
  href?: string;
};

interface PartnerBadgesRowProps {
  badges: PartnerBadgeItem[];
  /** light = page background; dark = footer / dark bands */
  surface?: "light" | "dark";
  align?: "start" | "center" | "between";
  className?: string;
  size?: "sm" | "md" | "lg" | "footer";
}

const sizeClass = {
  sm: "h-10 sm:h-11",
  md: "h-12 sm:h-14 lg:h-16",
  lg: "h-14 sm:h-16 lg:h-[4.5rem]",
  /** Footer: taller seals so circular marks stay readable */
  footer: "h-[3.25rem] sm:h-14",
} as const;

const sealSizeClass = {
  sm: "h-11 w-11 sm:h-12 sm:w-12",
  md: "h-14 w-14 sm:h-16 sm:w-16",
  lg: "h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem]",
  footer: "h-14 w-14 sm:h-16 sm:w-16",
} as const;

function isAmazonVerified(image: string): boolean {
  return image.includes("amazon-verified");
}

/**
 * Frameless partner proof row — no border/shadow cards behind badges.
 * Amazon plate uses multiply on light surfaces so the white card disappears.
 * Circular seals use their original assets as provided.
 */
export function PartnerBadgesRow({
  badges,
  surface = "light",
  align = "center",
  className,
  size = "md",
}: PartnerBadgesRowProps) {
  const visible = badges.filter((badge) => Boolean(badge.image));
  if (visible.length === 0) return null;

  const distribute = align === "between";

  return (
    <ul
      className={cn(
        "flex flex-wrap items-center",
        distribute
          ? "w-full justify-between gap-y-3"
          : cn(
              "gap-x-4 gap-y-3 sm:gap-x-6",
              align === "center" ? "justify-center" : "justify-start",
            ),
        className,
      )}
    >
      {visible.map((badge) => {
        const amazon = isAmazonVerified(badge.image);
        const image = (
          <Image
            src={badge.image}
            alt={badge.label}
            width={amazon ? 220 : 128}
            height={amazon ? 80 : 128}
            className={cn(
              "object-contain",
              amazon
                ? cn("w-auto max-w-[7.5rem] sm:max-w-[8.5rem]", sizeClass[size])
                : cn("shrink-0", sealSizeClass[size]),
              amazon && surface === "light" && "mix-blend-multiply",
            )}
            sizes={amazon ? "140px" : "128px"}
            quality={85}
          />
        );

        return (
          <li
            key={`${badge.label}-${badge.image}`}
            className={cn(
              "list-none",
              distribute &&
                "flex min-w-0 flex-1 justify-center first:justify-start last:justify-end",
            )}
          >
            {badge.href ? (
              <a
                href={badge.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                {image}
              </a>
            ) : (
              <span className="inline-flex">{image}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
