"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// The clipped corner echoes the PaperCard motif (see paper-card.tsx) so the
// cursor reads as this site's own rather than a generic circle-follow —
// proportional (%) rather than PaperCard's fixed 22px, since at ~30px this
// shape needs a much larger notch relative to its size to read at all.
const NOTCH_CLIP = "polygon(0 0, 62% 0, 100% 38%, 100% 100%, 0 100%)";

const INTERACTIVE_SELECTOR =
  "a, button, input, textarea, select, summary, [role='button'], [tabindex]";

type Field = "ink" | "paper" | "brass";

// Every section is one of these three exact utility classes (the site's
// whole design system is built on it) — walking up to the nearest one
// tells us what's under the cursor without ever reading a computed color.
const FIELD_COLOR: Record<Field, string> = {
  ink: "var(--color-brass)",
  paper: "var(--color-ink)",
  // Brass-on-brass is invisible — swap to ink so it stays readable there.
  brass: "var(--color-ink)",
};

function getField(el: Element | null): Field {
  let node = el;
  while (node) {
    if (node.classList.contains("bg-ink")) return "ink";
    if (node.classList.contains("bg-brass")) return "brass";
    if (node.classList.contains("bg-paper")) return "paper";
    node = node.parentElement;
  }
  return "paper";
}

export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Reduced-motion visitors get the native cursor — the whole point of a
    // trailing, scaling follower is motion, and they've asked for less of it.
    const update = () => setEnabled(finePointer.matches && !reducedMotion.matches);
    update();
    finePointer.addEventListener("change", update);
    reducedMotion.addEventListener("change", update);
    return () => {
      finePointer.removeEventListener("change", update);
      reducedMotion.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    // Native cursor stays visible right up until this line runs, so there's
    // never a dead gap where no cursor renders at all.
    document.body.style.cursor = "none";

    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" });
    const dotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3" });
    gsap.set([ring, dot], { opacity: 1 });
    gsap.set(ring, { borderColor: FIELD_COLOR.ink });
    gsap.set(dot, { backgroundColor: FIELD_COLOR.ink });

    let hovering = false;
    let field: Field = "ink";
    let lastTarget: EventTarget | null = null;

    const onMove = (e: MouseEvent) => {
      ringX(e.clientX);
      ringY(e.clientY);
      dotX(e.clientX);
      dotY(e.clientY);

      const target = e.target as Element | null;

      if (target !== lastTarget) {
        lastTarget = target;

        const isInteractive = !!target?.closest?.(INTERACTIVE_SELECTOR);
        if (isInteractive !== hovering) {
          hovering = isInteractive;
          gsap.to(ring, {
            scale: hovering ? 1.7 : 1,
            duration: 0.3,
            ease: "power2.out",
          });
        }

        const nextField = getField(target);
        if (nextField !== field) {
          field = nextField;
          const color = FIELD_COLOR[field];
          gsap.to(ring, { borderColor: color, duration: 0.25, ease: "power1.out" });
          gsap.to(dot, { backgroundColor: color, duration: 0.25, ease: "power1.out" });
        }
      }
    };

    const onLeave = () => gsap.to([ring, dot], { opacity: 0, duration: 0.2 });
    const onEnter = () => gsap.to([ring, dot], { opacity: 1, duration: 0.2 });

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] h-8 w-8 -translate-x-1/2 -translate-y-1/2 border-[1.5px] opacity-0"
        style={{ clipPath: NOTCH_CLIP }}
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0"
      />
    </>
  );
}
