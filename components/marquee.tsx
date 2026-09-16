"use client";

import { useEffect, useRef, type RefObject } from "react";
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
  /**
   * Ties the scroll range to a different element than the marquee's own
   * (small, word-height) wrapper — e.g. the whole surrounding section, so
   * "end" can mean "the bottom of that section" rather than the bottom of
   * the marquee's own tight box. Defaults to the marquee's own wrapper.
   */
  triggerRef?: RefObject<HTMLElement | null>;
  /** Overrides the word's own type-scale class (default "text-marquee"). */
  wordClassName?: string;
  /** Ending xPercent the word transits to as the scroll range completes. */
  toXPercent?: number;
}

export function Marquee({
  word,
  className = "",
  start = "top bottom",
  end = "bottom top",
  triggerRef,
  wordClassName = "text-marquee",
  toXPercent = -60,
}: MarqueeProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = triggerRef?.current ?? sectionRef.current;
    const wordEl = wordRef.current;
    if (!section || !wordEl) return;

    // Not pinned — the section scrolls normally, only the word translates.
    const tween = gsap.to(wordEl, {
      xPercent: toXPercent,
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
  }, [start, end, triggerRef, toXPercent]);

  return (
    <div
      ref={sectionRef}
      className={`w-full overflow-hidden whitespace-nowrap ${className}`}
    >
      <span ref={wordRef} className={`${wordClassName} inline-block`}>
        {word}
      </span>
    </div>
  );
}
