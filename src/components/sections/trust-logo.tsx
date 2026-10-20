"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type TrustLogoVariant = "cert" | "client" | "badge";

interface TrustLogoProps {
  label: string;
  image: string;
  alt: string;
  href?: string;
  variant?: TrustLogoVariant;
  className?: string;
}

/**
 * Quiet trust mark — Project One sparse proof language.
 * Client marks are frameless; cert/badge use a single thin soft-rect.
 */
export function TrustLogo({
  label,
  image,
  alt,
  href,
  variant = "cert",
  className,
}: TrustLogoProps) {
  const [imageFailed, setImageFailed] = useState(false);

  const frameClass =
    variant === "client"
      ? "h-10 w-[120px] border-0 bg-transparent"
      : variant === "badge"
        ? "h-10 w-[128px] border border-primary/15 bg-background"
        : "h-12 w-[140px] border border-primary/15 bg-background";

  const content = (
    <div
      className={cn(
        "trust-logo-tile relative overflow-hidden rounded-[10px]",
        frameClass,
        className,
      )}
    >
      {!imageFailed && image ? (
        <Image
          src={image}
          alt={alt || label}
          fill
          className={cn(
            "object-contain",
            variant === "client" ? "p-1.5 opacity-80" : "p-2.5",
          )}
          sizes="140px"
          quality={80}
          loading="lazy"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <div className="flex h-full items-center justify-center px-2">
          <Badge variant="outline" className="whitespace-nowrap text-xs">
            {label}
          </Badge>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="inline-flex transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </Link>
    );
  }

  return content;
}
