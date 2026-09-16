"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { registerTransition } from "@/lib/page-transition";

// Lives once in the root layout so it survives the route change it's
// covering. Collapsed to zero height at rest (inset bottom 100%); a
// covered navigation sweeps it up from the bottom edge, then sweeps it
// away off the top once the destination page has mounted.
export function PageTransitionOverlay() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { clipPath: "inset(0% 0% 100% 0%)" });

    const cover = () =>
      new Promise<void>((resolve) => {
        gsap.to(el, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.65,
          ease: "power3.inOut",
          onComplete: resolve,
        });
      });

    const reveal = () => {
      gsap.to(el, {
        clipPath: "inset(100% 0% 0% 0%)",
        duration: 0.65,
        delay: 0.1,
        ease: "power3.inOut",
        onComplete: () => {
          gsap.set(el, { clipPath: "inset(0% 0% 100% 0%)" });
        },
      });
    };

    registerTransition(cover, reveal);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[80] flex items-center justify-center bg-ink"
    >
      <span className="text-display-md text-brass">FULCRUM</span>
    </div>
  );
}
