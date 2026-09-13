"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PHRASES = [
  "People who",
  "read the whole file",
  "say the hard thing early",
  "answer the phone",
  "and don't oversell",
];

// Each photo gets a different scrubbed x/y velocity (0.3x–1.4x of scroll)
// and a different drift direction, so they visibly separate as you scroll
// instead of reading as one layer sliding together.
const PHOTOS = [
  { src: "/images/team/drift-1.png", top: "8%", left: "6%", rotate: -9, velocity: 0.4, dx: -1, dy: 1 },
  { src: "/images/team/drift-2.avif", top: "14%", left: "68%", rotate: 11, velocity: 1.3, dx: 1, dy: -1 },
  { src: "/images/team/drift-3.avif", top: "58%", left: "12%", rotate: 8, velocity: 0.9, dx: -1, dy: -1 },
  { src: "/images/team/drift-4.webp", top: "64%", left: "72%", rotate: -13, velocity: 0.55, dx: 1, dy: 1 },
  { src: "/images/team/drift-5.png", top: "6%", left: "38%", rotate: 6, velocity: 1.1, dx: -1, dy: 1 },
  { src: "/images/team/drift-6.avif", top: "62%", left: "42%", rotate: -7, velocity: 0.7, dx: 1, dy: -1 },
];

export function TeamReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const phraseRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const photoRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const phrases = phraseRefs.current.filter(Boolean) as HTMLElement[];
    const photos = photoRefs.current.filter(Boolean) as HTMLElement[];
    if (phrases.length === 0) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=250%",
        scrub: 1,
        pin: true,
      },
    });

    // Phrase crossfade — one visible at a time.
    phrases.forEach((el, i) => {
      if (i === 0) {
        tl.set(el, { opacity: 1, y: 0 }, 0);
        return;
      }
      // Outgoing fully fades out before the incoming line starts fading
      // in — a brief simultaneous overlap read as illegible double-exposed
      // text rather than "one at a time."
      const at = i - 0.3;
      tl.to(phrases[i - 1], { opacity: 0, y: -24, duration: 0.15, ease: "none" }, at);
      tl.fromTo(
        el,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.15, ease: "none" },
        at + 0.15
      );
    });

    const totalDuration = phrases.length - 1;

    // Photo drift — same 0–totalDuration span as the phrases, but each
    // photo travels a different absolute distance (its velocity factor)
    // in a different direction, so they separate rather than move as one.
    photos.forEach((el, i) => {
      const { velocity, dx, dy } = PHOTOS[i];
      tl.to(
        el,
        {
          x: dx * 260 * velocity,
          y: dy * 200 * velocity,
          ease: "none",
          duration: totalDuration,
        },
        0
      );
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden">
      {PHOTOS.map((photo, i) => (
        <div
          key={photo.src}
          ref={(el) => {
            photoRefs.current[i] = el;
          }}
          className="absolute aspect-4/3 w-32 overflow-hidden shadow-[0_16px_32px_-16px_rgba(16,16,18,0.35)] sm:w-44 md:w-56"
          style={{ top: photo.top, left: photo.left, rotate: `${photo.rotate}deg` }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- placeholder art, swapped for real candid photos later */}
          <img
            src={photo.src}
            alt=""
            className="h-full w-full object-cover grayscale"
          />
        </div>
      ))}

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <div className="relative h-24 w-full max-w-2xl md:h-16">
          {PHRASES.map((phrase, i) => (
            <span
              key={phrase}
              ref={(el) => {
                phraseRefs.current[i] = el;
              }}
              className="text-display-lg absolute inset-0 flex items-center justify-center opacity-0"
            >
              {phrase}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
