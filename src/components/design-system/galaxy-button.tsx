"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: "accent" | "cyan" | "white";
}

interface GalaxyButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  label: string;
}

/**
 * From-scratch recreation of the Framer “Crazy Galaxy” hover idea
 * (Alex Barashkov / Framer University): layered colored glows + particles
 * that drift toward the button on hover.
 *
 * Design-system preview only — not wired as sitewide PrimaryButton yet.
 * Respects prefers-reduced-motion (static glow, no particles).
 */
export function GalaxyButton({
  label,
  className,
  disabled,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ...props
}: GalaxyButtonProps) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number | null>(null);
  const hoveringRef = useRef(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const stopLoop = useCallback(() => {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const spawnParticle = useCallback((width: number, height: number) => {
    const side = Math.random();
    let x: number;
    let y: number;
    if (side < 0.45) {
      x = Math.random() * width;
      y = -8 - Math.random() * 28;
    } else if (side < 0.7) {
      x = -10 - Math.random() * 20;
      y = Math.random() * height * 0.7;
    } else {
      x = width + 10 + Math.random() * 20;
      y = Math.random() * height * 0.7;
    }

    const targetX = width * 0.5 + (Math.random() - 0.5) * width * 0.25;
    const targetY = height * 0.72;
    const dx = targetX - x;
    const dy = targetY - y;
    const dist = Math.hypot(dx, dy) || 1;
    const speed = 0.55 + Math.random() * 0.9;

    const roll = Math.random();
    const hue: Particle["hue"] =
      roll < 0.45 ? "accent" : roll < 0.8 ? "cyan" : "white";

    particlesRef.current.push({
      x,
      y,
      vx: (dx / dist) * speed + (Math.random() - 0.5) * 0.35,
      vy: (dy / dist) * speed + Math.random() * 0.2,
      life: 0,
      maxLife: 45 + Math.random() * 50,
      size: 1.2 + Math.random() * 2.4,
      hue,
    });
  }, []);

  const paint = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const rect = wrap.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = rect.width;
    const height = rect.height;
    const pad = 48;
    const cw = width + pad * 2;
    const ch = height + pad * 2;

    if (
      canvas.width !== Math.floor(cw * dpr) ||
      canvas.height !== Math.floor(ch * dpr)
    ) {
      canvas.width = Math.floor(cw * dpr);
      canvas.height = Math.floor(ch * dpr);
      canvas.style.width = `${cw}px`;
      canvas.style.height = `${ch}px`;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cw, ch);

    const styles = getComputedStyle(document.documentElement);
    const accent = styles.getPropertyValue("--color-accent").trim() || "#C6FD50";
    const cyan = styles.getPropertyValue("--color-brand-cyan").trim() || "#48cae4";
    const colorFor = (hue: Particle["hue"]) => {
      if (hue === "accent") return accent;
      if (hue === "cyan") return cyan;
      return "#FFFFFF";
    };

    if (hoveringRef.current && particlesRef.current.length < 70) {
      if (Math.random() < 0.55) spawnParticle(width, height);
      if (Math.random() < 0.25) spawnParticle(width, height);
    }

    const next: Particle[] = [];
    for (const p of particlesRef.current) {
      p.life += 1;
      p.x += p.vx;
      p.y += p.vy;
      p.vx += (width * 0.5 - (p.x)) * 0.0008;
      p.vy += 0.012;

      if (p.life >= p.maxLife) continue;

      const t = p.life / p.maxLife;
      const alpha = t < 0.15 ? t / 0.15 : 1 - (t - 0.15) / 0.85;
      const px = p.x + pad;
      const py = p.y + pad;

      ctx.beginPath();
      ctx.fillStyle = colorFor(p.hue);
      ctx.globalAlpha = Math.max(0, alpha) * 0.9;
      ctx.shadowBlur = 8;
      ctx.shadowColor = colorFor(p.hue);
      ctx.arc(px, py, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      next.push(p);
    }
    particlesRef.current = next;

    if (hoveringRef.current || next.length > 0) {
      rafRef.current = requestAnimationFrame(paint);
    } else {
      rafRef.current = null;
      ctx.clearRect(0, 0, cw, ch);
    }
  }, [spawnParticle]);

  const startLoop = useCallback(() => {
    if (reducedMotion || rafRef.current != null) return;
    rafRef.current = requestAnimationFrame(paint);
  }, [paint, reducedMotion]);

  useEffect(() => () => stopLoop(), [stopLoop]);

  function setHover(next: boolean) {
    hoveringRef.current = next;
    setActive(next);
    if (next && !reducedMotion) {
      startLoop();
    }
  }

  return (
    <span
      ref={wrapRef}
      className={cn(
        "btn-galaxy-wrap relative inline-flex",
        active && "is-active",
        className,
      )}
    >
      {!reducedMotion ? (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2"
        />
      ) : null}

      <button
        type="button"
        disabled={disabled}
        className={cn(
          "btn-galaxy relative z-[1] inline-flex h-12 min-w-[10.5rem] items-center justify-center gap-2 rounded-full px-8",
          "text-sm font-semibold tracking-wide text-white",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
        )}
        onMouseEnter={(event) => {
          setHover(true);
          onMouseEnter?.(event);
        }}
        onMouseLeave={(event) => {
          setHover(false);
          onMouseLeave?.(event);
        }}
        onFocus={(event) => {
          setHover(true);
          onFocus?.(event);
        }}
        onBlur={(event) => {
          setHover(false);
          onBlur?.(event);
        }}
        {...props}
      >
        <span className="btn-galaxy-sheen pointer-events-none absolute inset-0 rounded-full" />
        <span className="relative z-[1]">{label}</span>
      </button>
    </span>
  );
}
