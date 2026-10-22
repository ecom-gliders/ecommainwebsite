"use client";

import {
  Check,
  Link2,
  Mail,
  MessageCircle,
  MoreHorizontal,
  Printer,
  Share2,
  X,
} from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState } from "react";

interface BlogShareRailProps {
  url: string;
  title: string;
  orientation?: "vertical" | "horizontal";
}

function IconSvg({
  className,
  path,
}: {
  className?: string;
  path: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d={path} />
    </svg>
  );
}

const ICONS = {
  linkedin:
    "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  x: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.259 5.686L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z",
  facebook:
    "M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z",
  reddit:
    "M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.769-3.209 5.002-7.14 5.002-3.931 0-7.14-2.233-7.14-5.002 0-.175.014-.348.042-.52-.575-.281-1.01-.898-1.01-1.614 0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.561-1.249-1.249-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z",
  telegram:
    "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z",
  pinterest:
    "M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.378l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z",
  threads:
    "M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.659 1.5 12.115 1.5 5.73 5.657.5 12.001.5h.014C18.342.5 22.5 5.73 22.5 12.115c0 3.544-.85 6.325-2.495 8.376-1.85 2.304-4.603 3.485-8.184 3.509h-.007zM12.01 2.3c-5.132 0-8.2 3.84-8.2 9.815 0 2.955.68 5.24 2.023 6.79 1.37 1.581 3.49 2.41 6.17 2.426h.006c2.68-.016 4.8-.845 6.17-2.426 1.343-1.55 2.023-3.835 2.023-6.79 0-5.975-3.068-9.815-8.192-9.815zm.086 14.886c-1.99 0-3.51-.52-4.52-1.545-.99-1.007-1.492-2.45-1.492-4.29 0-1.78.486-3.18 1.444-4.16.96-.98 2.35-1.477 4.13-1.477.78 0 1.52.1 2.2.297v1.65a5.53 5.53 0 0 0-1.95-.34c-1.13 0-1.99.3-2.55.89-.56.59-.84 1.47-.84 2.61 0 1.2.3 2.1.89 2.68.59.58 1.46.87 2.59.87.9 0 1.68-.2 2.32-.6.64-.4 1.08-.97 1.32-1.71.13-.4.2-.85.2-1.34V9.52h1.78v1.55c0 .9-.12 1.7-.37 2.4-.4 1.13-1.1 2.01-2.08 2.64-.98.63-2.18.95-3.57.95z",
} as const;

type ShareItem =
  | { kind: "link"; label: string; href: string; path: string }
  | { kind: "lucide-link"; label: string; href: string; Lucide: typeof Mail }
  | { kind: "copy"; label: string }
  | { kind: "native"; label: string }
  | { kind: "print"; label: string };

/** 7 icons + “…” = two full rows of 4 in the rail grid. */
const ROW_VISIBLE = 7;

const iconBtnClass =
  "inline-flex h-9 w-full items-center justify-center border-2 border-primary bg-background text-primary shadow-[2px_2px_0_0_#131311] transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2";

const railShellClass =
  "grid w-full grid-cols-4 gap-1.5 border-2 border-primary bg-background p-2 shadow-[3px_3px_0_0_#131311]";

const menuCardClass =
  "flex w-full flex-col items-center justify-center gap-1.5 border-2 border-primary bg-background px-2 py-3 text-center text-[11px] font-semibold text-primary shadow-[2px_2px_0_0_#131311] hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

export function BlogShareRail({
  url,
  title,
  orientation = "vertical",
}: BlogShareRailProps) {
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedBody = encodeURIComponent(`${title}\n\n${url}`);

  useEffect(() => {
    setCanNativeShare(typeof navigator.share === "function");
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (menuOpen && !dialog.open) dialog.showModal();
    if (!menuOpen && dialog.open) dialog.close();
  }, [menuOpen]);

  const items: ShareItem[] = useMemo(() => {
    const list: ShareItem[] = [
      {
        kind: "link",
        label: "LinkedIn",
        href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        path: ICONS.linkedin,
      },
      {
        kind: "link",
        label: "X",
        href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
        path: ICONS.x,
      },
      {
        kind: "link",
        label: "Facebook",
        href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        path: ICONS.facebook,
      },
      {
        kind: "lucide-link",
        label: "WhatsApp",
        href: `https://api.whatsapp.com/send?text=${encodedBody}`,
        Lucide: MessageCircle,
      },
      {
        kind: "link",
        label: "Telegram",
        href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
        path: ICONS.telegram,
      },
      {
        kind: "link",
        label: "Reddit",
        href: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
        path: ICONS.reddit,
      },
      {
        kind: "link",
        label: "Pinterest",
        href: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`,
        path: ICONS.pinterest,
      },
      {
        kind: "link",
        label: "Threads",
        href: `https://www.threads.net/intent/post?text=${encodedBody}`,
        path: ICONS.threads,
      },
      {
        kind: "lucide-link",
        label: "Email",
        href: `mailto:?subject=${encodedTitle}&body=${encodedBody}`,
        Lucide: Mail,
      },
      { kind: "print", label: "Print" },
      { kind: "copy", label: "Copy link" },
    ];
    if (canNativeShare) {
      list.unshift({ kind: "native", label: "Share" });
    }
    return list;
  }, [canNativeShare, encodedBody, encodedTitle, encodedUrl]);

  const rowItems = items.slice(0, ROW_VISIBLE);
  const hasMore = items.length > ROW_VISIBLE;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link", url);
    }
  }

  async function nativeShare() {
    try {
      await navigator.share({ title, url, text: title });
    } catch {
      // cancelled
    }
  }

  function printArticle() {
    window.print();
  }

  function renderIcon(item: ShareItem) {
    if (item.kind === "native") {
      return (
        <button
          type="button"
          key={item.label}
          onClick={() => void nativeShare()}
          aria-label="Share via device"
          title="Share"
          className={iconBtnClass}
        >
          <Share2 className="h-4 w-4" aria-hidden="true" />
        </button>
      );
    }
    if (item.kind === "print") {
      return (
        <button
          type="button"
          key={item.label}
          onClick={printArticle}
          aria-label="Print article"
          title="Print"
          className={iconBtnClass}
        >
          <Printer className="h-4 w-4" aria-hidden="true" />
        </button>
      );
    }
    if (item.kind === "copy") {
      return (
        <button
          type="button"
          key={item.label}
          onClick={() => void copyLink()}
          aria-label={copied ? "Link copied" : "Copy link"}
          title={copied ? "Copied" : "Copy link"}
          className={iconBtnClass}
        >
          {copied ? (
            <Check className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Link2 className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      );
    }
    if (item.kind === "lucide-link") {
      const Lucide = item.Lucide;
      return (
        <a
          key={item.label}
          href={item.href}
          target={item.href.startsWith("mailto:") ? undefined : "_blank"}
          rel={
            item.href.startsWith("mailto:") ? undefined : "noopener noreferrer"
          }
          aria-label={`Share via ${item.label}`}
          title={item.label}
          className={iconBtnClass}
        >
          <Lucide className="h-4 w-4" aria-hidden="true" />
        </a>
      );
    }
    return (
      <a
        key={item.label}
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Share on ${item.label}`}
        title={item.label}
        className={iconBtnClass}
      >
        <IconSvg className="h-4 w-4" path={item.path} />
      </a>
    );
  }

  function renderMenuCard(item: ShareItem) {
    if (item.kind === "native") {
      return (
        <button
          type="button"
          key={item.label}
          className={menuCardClass}
          onClick={() => {
            void nativeShare();
            setMenuOpen(false);
          }}
        >
          <Share2 className="h-5 w-5" aria-hidden="true" />
          Share
        </button>
      );
    }
    if (item.kind === "print") {
      return (
        <button
          type="button"
          key={item.label}
          className={menuCardClass}
          onClick={() => {
            setMenuOpen(false);
            window.setTimeout(() => window.print(), 150);
          }}
        >
          <Printer className="h-5 w-5" aria-hidden="true" />
          Print
        </button>
      );
    }
    if (item.kind === "copy") {
      return (
        <button
          type="button"
          key={item.label}
          className={menuCardClass}
          onClick={() => {
            void copyLink();
            setMenuOpen(false);
          }}
        >
          <Link2 className="h-5 w-5" aria-hidden="true" />
          {copied ? "Copied" : "Copy"}
        </button>
      );
    }
    if (item.kind === "lucide-link") {
      const Lucide = item.Lucide;
      return (
        <a
          key={item.label}
          href={item.href}
          target={item.href.startsWith("mailto:") ? undefined : "_blank"}
          rel={
            item.href.startsWith("mailto:") ? undefined : "noopener noreferrer"
          }
          className={menuCardClass}
          onClick={() => setMenuOpen(false)}
        >
          <Lucide className="h-5 w-5" aria-hidden="true" />
          {item.label}
        </a>
      );
    }
    return (
      <a
        key={item.label}
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={menuCardClass}
        onClick={() => setMenuOpen(false)}
      >
        <IconSvg className="h-5 w-5" path={item.path} />
        {item.label}
      </a>
    );
  }

  return (
    <div
      className={
        orientation === "horizontal"
          ? "w-full border-b border-border pb-4"
          : "w-full"
      }
    >
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-text-secondary">
        Share
      </p>
      <div className={railShellClass}>
        {rowItems.map(renderIcon)}
        {hasMore ? (
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="More share options"
            title="More"
            className={iconBtnClass}
          >
            <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
          </button>
        ) : null}
      </div>

      <dialog
        ref={dialogRef}
        className="m-0 w-[min(100vw-1.5rem,32rem)] max-h-[min(90dvh,40rem)] border-2 border-primary bg-surface p-0 text-text-primary shadow-[6px_6px_0_0_#131311] open:fixed open:left-1/2 open:top-1/2 open:flex open:-translate-x-1/2 open:-translate-y-1/2 open:flex-col backdrop:bg-primary/40"
        onClose={() => setMenuOpen(false)}
        aria-labelledby={titleId}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-border px-4 py-3">
          <p
            id={titleId}
            className="text-small font-bold uppercase tracking-[0.12em]"
          >
            Share article
          </p>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Close"
            className="inline-flex h-8 w-8 items-center justify-center border border-border hover:bg-accent"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-3 sm:p-4">
          <ul className="m-0 grid list-none grid-cols-2 gap-2 p-0 sm:grid-cols-3">
            {items.map((item) => (
              <li key={item.label} className="min-w-0">
                {renderMenuCard(item)}
              </li>
            ))}
          </ul>
        </div>
      </dialog>
    </div>
  );
}
