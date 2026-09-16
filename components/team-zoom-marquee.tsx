"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LETTERS = ["T", "E", "A", "M"];
// Index of the letter the zoom dives into — "A" specifically asked for,
// and conveniently the one with a genuine solid stroke to land inside.
const HERO_LETTER_INDEX = 2;
// Where inside that letter's own box the dive lands — inside its solid
// left leg, not the hollow triangular counter. Zooming around the counter
// would fill the screen with the ink background showing through, the
// opposite of what "the A gives birth to the next section" needs.
const HERO_POINT = { x: 0.22, y: 0.82 };

export function TeamZoomMarquee() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leadInRef = useRef<HTMLParagraphElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const paperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const word = wordRef.current;
    const heroLetter = letterRefs.current[HERO_LETTER_INDEX];
    const paper = paperRef.current;
    const leadIn = leadInRef.current;
    if (!section || !word || !heroLetter || !paper || !leadIn) return;

    // Measured relative to the whole word, not the letter alone — the
    // word (not an isolated letter) is what scales, so every other
    // letter rides along and simply gets pushed off past the viewport
    // edges as the "A" 's stroke grows to fill the frame.
    const wordRect = word.getBoundingClientRect();
    const heroRect = heroLetter.getBoundingClientRect();
    const originX =
      ((heroRect.left - wordRect.left + heroRect.width * HERO_POINT.x) /
        wordRect.width) *
      100;
    const originY =
      ((heroRect.top - wordRect.top + heroRect.height * HERO_POINT.y) /
        wordRect.height) *
      100;
    gsap.set(word, { transformOrigin: `${originX}% ${originY}%` });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=280%",
        scrub: 0.6,
        pin: true,
      },
    });

    // One continuous scale on the whole word — no separate fade-out phase
    // for the other letters, which read as a jump cut rather than a zoom.
    // They stay put and simply get carried outside the frame as the "A"'s
    // stroke grows to dominate it.
    tl.to(leadIn, { opacity: 0, duration: 0.1 }, 0)
      .to(word, { scale: 70, ease: "power1.in", duration: 1 }, 0)
      // Safety net: guarantees a clean, total paper field the instant the
      // pin releases, regardless of exactly how the zoomed glyph lines up —
      // the next section is bg-paper, so this is the seam that sells it.
      .to(paper, { opacity: 1, duration: 0.18 }, 0.85);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative h-screen overflow-hidden bg-ink">
      <p
        ref={leadInRef}
        className="text-label absolute left-6 top-24 text-brass md:left-16 md:top-28"
      >
        Before anything else, Fulcrum is a
      </p>

      <div ref={wordRef} className="flex h-full items-center justify-center">
        {LETTERS.map((letter, i) => (
          <span
            key={letter + i}
            ref={(el) => {
              letterRefs.current[i] = el;
            }}
            className="text-marquee-team inline-block text-paper"
          >
            {letter}
          </span>
        ))}
      </div>

      <div
        ref={paperRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-paper opacity-0"
      />
    </div>
  );
}
