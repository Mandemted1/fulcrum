"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getSeededRotation } from "@/lib/seeded-rotation";

gsap.registerPlugin(ScrollTrigger);

export type PaperCardCorner =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left"
  | "none";

const CLIP_PATHS: Record<Exclude<PaperCardCorner, "none">, string> = {
  "top-right":
    "polygon(0 0, calc(100% - 22px) 0, 100% 22px, 100% 100%, 0 100%)",
  "top-left": "polygon(22px 0, 100% 0, 100% 100%, 0 100%, 0 22px)",
  "bottom-right":
    "polygon(0 0, 100% 0, 100% calc(100% - 22px), calc(100% - 22px) 100%, 0 100%)",
  "bottom-left":
    "polygon(0 0, 100% 0, 100% 100%, 22px 100%, 0 calc(100% - 22px))",
};

interface PaperCardProps {
  /** Position within its entrance group — seeds the tilt direction/magnitude and the stagger delay. */
  index: number;
  corner?: PaperCardCorner;
  /**
   * When true, the settle from tilted to flat is scrubbed directly to
   * scroll position over a generous range, rather than firing as a fixed
   * ~1s tween the instant the card crosses the trigger point. Use where
   * the entrance should read as something the user's own scroll is
   * driving, not a fire-and-forget animation.
   */
  scrub?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function PaperCard({
  index,
  corner = "top-right",
  scrub = false,
  className = "",
  children,
}: PaperCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const rotation = getSeededRotation(index);

    if (scrub) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "top 35%",
          scrub: 0.6,
        },
      });
      tl.fromTo(
        el,
        { rotate: rotation, y: 120, opacity: 0, scale: 0.92 },
        { rotate: 0, y: 0, opacity: 1, scale: 1, ease: "none" }
      );

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    }

    gsap.set(el, { rotate: rotation, y: 120, opacity: 0, scale: 0.92 });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(el, {
          rotate: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          delay: (index % 4) * 0.12,
        });
      },
    });

    return () => {
      trigger.kill();
      gsap.killTweensOf(el);
    };
  }, [index, scrub]);

  return (
    <div
      ref={ref}
      className={`relative bg-paper shadow-[0_24px_48px_-28px_rgba(16,16,18,0.45)] ${className}`}
      style={corner === "none" ? undefined : { clipPath: CLIP_PATHS[corner] }}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-[8%] right-[8%] top-1/2 h-px bg-fog"
      />
      {children}
    </div>
  );
}
