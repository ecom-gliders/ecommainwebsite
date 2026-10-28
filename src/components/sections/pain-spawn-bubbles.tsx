"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface SpawnedBubble {
  id: number;
  text: string;
  left: number;
  top: number;
  rotate: number;
  /** 0–1 opacity driven by rAF (works even when OS kills CSS animations) */
  opacity: number;
  scale: number;
}

interface PainSpawnBubblesProps {
  quotes: string[];
  className?: string;
}

const SLOT_PRESETS: Array<{ left: number; top: number; rotate: number }> = [
  { left: 6, top: 8, rotate: -6 },
  { left: 52, top: 4, rotate: 4 },
  { left: 28, top: 22, rotate: -3 },
  { left: 62, top: 28, rotate: 5 },
  { left: 12, top: 48, rotate: 3 },
  { left: 48, top: 52, rotate: -5 },
  { left: 70, top: 62, rotate: 2 },
  { left: 18, top: 68, rotate: -4 },
];

const LIFE_MS = 3400;

/**
 * Project One speech-bubble spawns — JS opacity/scale timeline
 * (not CSS keyframes), so Windows “reduce motion” cannot kill them.
 */
export function PainSpawnBubbles({ quotes, className }: PainSpawnBubblesProps) {
  const [bubbles, setBubbles] = useState<SpawnedBubble[]>([]);
  /** Survives Strict Mode effect re-runs so spawn ids stay unique. */
  const seqRef = useRef(0);

  useEffect(() => {
    if (quotes.length === 0) return;

    let quoteCursor = 0;
    let slotCursor = Math.floor(Math.random() * SLOT_PRESETS.length);
    let raf = 0;
    const bornAt = new Map<number, number>();
    const timers: number[] = [];

    const tick = (now: number) => {
      setBubbles((prev) => {
        if (prev.length === 0) return prev;
        let changed = false;
        const next = prev.map((bubble) => {
          const start = bornAt.get(bubble.id) ?? now;
          const t = Math.min(1, (now - start) / LIFE_MS);
          let opacity = 1;
          let scale = 1;
          if (t < 0.12) {
            const u = t / 0.12;
            opacity = u;
            scale = 0.72 + 0.28 * u;
          } else if (t > 0.78) {
            const u = (t - 0.78) / 0.22;
            opacity = 1 - u;
            scale = 1 - 0.08 * u;
          }
          if (
            Math.abs(opacity - bubble.opacity) > 0.02 ||
            Math.abs(scale - bubble.scale) > 0.02
          ) {
            changed = true;
            return { ...bubble, opacity, scale };
          }
          return bubble;
        });
        return changed ? next : prev;
      });
      raf = window.requestAnimationFrame(tick);
    };

    raf = window.requestAnimationFrame(tick);

    const spawn = () => {
      const text = quotes[quoteCursor % quotes.length];
      quoteCursor += 1;
      const slot = SLOT_PRESETS[slotCursor % SLOT_PRESETS.length];
      slotCursor += 1 + Math.floor(Math.random() * 2);
      const id = ++seqRef.current;
      const now = performance.now();
      bornAt.set(id, now);

      setBubbles((prev) => {
        const next = [
          ...prev,
          {
            id,
            text,
            left: Math.min(78, Math.max(2, slot.left + (Math.random() * 6 - 3))),
            top: Math.min(78, Math.max(2, slot.top + (Math.random() * 6 - 3))),
            rotate: slot.rotate + (Math.random() * 4 - 2),
            opacity: 0,
            scale: 0.72,
          },
        ];
        return next.slice(-5);
      });

      timers.push(
        window.setTimeout(() => {
          bornAt.delete(id);
          setBubbles((prev) => prev.filter((b) => b.id !== id));
        }, LIFE_MS + 80),
      );
    };

    spawn();
    const interval = window.setInterval(spawn, 1100);

    return () => {
      window.clearInterval(interval);
      window.cancelAnimationFrame(raf);
      timers.forEach((t) => window.clearTimeout(t));
      bornAt.clear();
      setBubbles([]);
    };
  }, [quotes]);

  if (quotes.length === 0) return null;

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-20 overflow-hidden",
        className,
      )}
      aria-hidden="true"
    >
      {bubbles.map((bubble) => (
        <span
          key={bubble.id}
          className="absolute max-w-[11.5rem] rounded-[20px] bg-accent px-3.5 py-2.5 text-left text-xs font-medium leading-snug text-primary sm:max-w-[13.5rem] sm:px-4 sm:py-2.5"
          style={{
            left: `${bubble.left}%`,
            top: `${bubble.top}%`,
            opacity: bubble.opacity,
            transform: `rotate(${bubble.rotate}deg) scale(${bubble.scale})`,
            transformOrigin: "20% 100%",
          }}
        >
          {bubble.text}
          <span
            className="absolute -bottom-1.5 left-5 h-3 w-3 rotate-45 bg-accent"
            aria-hidden="true"
          />
        </span>
      ))}
    </div>
  );
}
