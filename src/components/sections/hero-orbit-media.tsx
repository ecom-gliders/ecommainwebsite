import Image from "next/image";
import { cn } from "@/lib/utils";

export interface HeroOrbitItem {
  src: string;
  alt: string;
  label: string;
  /** Tailwind position + size classes for lg+ absolute placement */
  place: string;
  rotate: string;
}

/** Default eCom orbit media — creative + case atmospheres (not Project One assets). */
export const DEFAULT_HERO_ORBIT_ITEMS: HeroOrbitItem[] = [
  {
    src: "/images/creative/creative-hero-product-v2.png",
    alt: "Amazon product listing hero creative",
    label: "Listing creative",
    place: "left-[14%] top-[6%] w-[108px] xl:w-[120px]",
    rotate: "rotate-[-7deg]",
  },
  {
    src: "/images/cases/gosports-atmosphere.jpg",
    alt: "GoSports outdoor lifestyle case study",
    label: "GoSports",
    place: "left-[3%] top-[36%] w-[112px] xl:w-[124px]",
    rotate: "rotate-[11deg]",
  },
  {
    src: "/images/creative/creative-lifestyle-v2.png",
    alt: "Amazon lifestyle listing imagery",
    label: "Lifestyle shot",
    place: "left-[16%] top-[62%] w-[128px] xl:w-[140px]",
    rotate: "rotate-[-28deg]",
  },
  {
    src: "/images/cases/kitchen-atmosphere.jpg",
    alt: "Kitchen brand Amazon growth case study",
    label: "Kitchen brand",
    place: "right-[8%] top-[10%] w-[118px] xl:w-[132px]",
    rotate: "rotate-[34deg]",
  },
  {
    src: "/images/creative/creative-aplus-v2.png",
    alt: "Amazon A-plus content creative",
    label: "A+ content",
    place: "right-[5%] top-[48%] w-[114px] xl:w-[128px]",
    rotate: "rotate-[-12deg]",
  },
];

interface HeroOrbitMediaProps {
  items?: HeroOrbitItem[];
  className?: string;
}

/**
 * Project One–style orbit Polaroids around a centered hero.
 * Decorative only (aria-hidden); content stays eCom assets/labels.
 */
export function HeroOrbitMedia({
  items = DEFAULT_HERO_ORBIT_ITEMS,
  className,
}: HeroOrbitMediaProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 hidden lg:block",
        className,
      )}
      aria-hidden="true"
    >
      {items.map((item, index) => (
        <figure
          key={`${item.label}-${index}`}
          className={cn(
            "absolute z-[1] overflow-hidden rounded-[10px] border-2 border-primary bg-[#F2F2F2] p-1.5 shadow-[4px_4px_0_0_#131311]",
            "motion-safe:animate-[hero-orbit-float_7s_ease-in-out_infinite]",
            item.place,
            item.rotate,
          )}
          style={{ animationDelay: `${index * 0.55}s` }}
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[6px] bg-surface">
            <Image
              src={item.src}
              alt=""
              fill
              className="object-cover"
              sizes="140px"
              quality={70}
            />
          </div>
          <figcaption className="mt-1 px-0.5 text-[10px] font-semibold leading-tight text-text-primary">
            {item.label}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
