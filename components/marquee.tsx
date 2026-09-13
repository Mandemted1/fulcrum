"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface MarqueeProps {
  word: string;
  className?: string;
  /**
   * ScrollTrigger start/end. Defaults match the build brief's spec — the
   * word transits the full viewport height, entering at the bottom and
   * exiting at the top. For a marquee with no scroll room above it (the
   * hero, page position zero), that "top bottom" start has already elapsed
   * at scroll=0, so the word renders pre-shifted instead of at rest. Pass
   * start="top top" there so progress 0 lines up with scroll 0 instead.
   */
  start?: string;
  end?: string;
}

export function Marquee({
  word,
  className = "",
  start = "top bottom",
  end = "bottom top",
}: MarqueeProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const wordEl = wordRef.current;
    if (!section || !wordEl) return;

    // Not pinned — the section scrolls normally, only the word translates.
    const tween = gsap.to(wordEl, {
      xPercent: -60,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start,
        end,
        scrub: 0.5,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [start, end]);

  return (
    <div
      ref={sectionRef}
      className={`w-full overflow-hidden whitespace-nowrap ${className}`}
    >
      <span ref={wordRef} className="text-marquee inline-block">
        {word}
      </span>
    </div>
  );
}
