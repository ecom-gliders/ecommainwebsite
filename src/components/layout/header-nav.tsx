"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { HeaderNavItem, NavigationConfig } from "@/domain/content/schemas";
import { MegaMenuPanel } from "@/components/layout/mega-menu-panel";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

interface HeaderNavProps {
  items: HeaderNavItem[];
  megaMenus: NavigationConfig["megaMenus"];
  /** Light surfaces (default) or navy floating chrome */
  tone?: "default" | "onDark";
}

function HeaderNavLink({
  item,
  tone = "default",
}: {
  item: Extract<HeaderNavItem, { type: "link" }>;
  tone?: "default" | "onDark";
}) {
  const onDark =
    tone === "onDark"
      ? "text-text-on-dark/80 hover:text-text-on-dark data-[state=open]:text-text-on-dark after:bg-accent focus-visible:ring-offset-primary"
      : undefined;

  if (item.external) {
    return (
      <NavigationMenuItem>
        <NavigationMenuLink
          href={item.href}
          className={cn(navigationMenuTriggerStyle(), onDark)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {item.label}
        </NavigationMenuLink>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link
          href={item.href}
          className={cn(navigationMenuTriggerStyle(), onDark)}
        >
          {item.label}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}

/** Nav list only — parent wraps with full-width NavigationMenu so megas align to the page. */
export function HeaderNav({
  items,
  megaMenus,
  tone = "default",
}: HeaderNavProps) {
  const router = useRouter();
  const onDark =
    tone === "onDark"
      ? "text-text-on-dark/80 hover:text-text-on-dark data-[state=open]:text-text-on-dark after:bg-accent focus-visible:ring-offset-primary"
      : undefined;

  return (
    <NavigationMenuList className="hidden gap-0.5 lg:flex">
      {items.map((item) => {
        if (item.type === "link") {
          return <HeaderNavLink key={item.id} item={item} tone={tone} />;
        }

        const panel = megaMenus[item.id];
        if (!panel) {
          return null;
        }

        return (
          <NavigationMenuItem key={item.id} value={item.id}>
            <NavigationMenuTrigger
              aria-label={item.label}
              className={onDark}
              onClick={(event) => {
                if (!item.href) return;
                // One control: hover opens mega menu; click goes to hub page.
                event.preventDefault();
                router.push(item.href);
              }}
            >
              {item.label}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="left-0 top-0 w-full max-w-none rounded-none border-x-0 p-0 md:w-full data-[motion]:!transform-none">
              <MegaMenuPanel megaMenu={panel} />
            </NavigationMenuContent>
          </NavigationMenuItem>
        );
      })}
    </NavigationMenuList>
  );
}
