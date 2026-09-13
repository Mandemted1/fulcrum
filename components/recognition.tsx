"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const ROWS = [
  { year: "2026", text: "Best Lawyers in America — Employment Law, Individuals" },
  { year: "2026", text: "New York Super Lawyers — 6 attorneys listed" },
  { year: "2025", text: "Law360 Employment Practice Group of the Year, finalist" },
  {
    year: "2025",
    text: "National Employment Lawyers Association — Advocate of the Year, D. Osei-Bonsu",
  },
  { year: "2025", text: "New York Law Journal — Distinguished Leader" },
  { year: "2024", text: "Best Lawyers in America — Employment Law, Individuals" },
  { year: "2024", text: "NYC Bar Association — Pro Bono Service Award" },
  { year: "2023", text: "New York Super Lawyers Rising Stars — 4 attorneys" },
  { year: "2023", text: "Chambers USA — Band 3, Labor & Employment, New York" },
  { year: "2022", text: "Law360 Rising Star, M. Reyes" },
];

export function Recognition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const rows = rowRefs.current.filter(Boolean) as HTMLElement[];
    if (rows.length === 0) return;

    rows.forEach((row, i) => {
      row.style.color = i === 0 ? "var(--color-ink)" : "var(--color-fog)";
    });

    // Continuous, never snapping — the active row is a function of scroll
    // progress alone, not a stepped/snapped index.
    //
    // start is a function (not a fixed string) because the sticky header's
    // height changes across breakpoints (the utility bar wraps to two lines
    // on mobile) — pinning at a hardcoded offset would overlap the header
    // at some widths. A function gets re-evaluated on ScrollTrigger.refresh
    // (e.g. on resize), so it stays correct.
    const getHeaderHeight = () =>
      document.querySelector("header")?.getBoundingClientRect().height ?? 0;

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: () => `top ${getHeaderHeight()}px`,
      end: "+=200%",
      pin: true,
      onUpdate: (self) => {
        const idx = Math.min(
          rows.length - 1,
          Math.floor(self.progress * rows.length)
        );
        rows.forEach((row, i) => {
          row.style.color = i === idx ? "var(--color-ink)" : "var(--color-fog)";
        });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <section
      id="recognition"
      ref={containerRef}
      className="relative flex h-screen flex-col justify-center gap-6 overflow-hidden bg-paper px-6 py-20 md:gap-10 md:px-16"
    >
      <p className="text-label text-brass-dk">Recognition</p>

      <div className="flex flex-col gap-1.5 md:gap-3">
        {ROWS.map((row, i) => (
          <div
            key={i}
            ref={(el) => {
              rowRefs.current[i] = el;
            }}
            className="flex items-baseline gap-2 transition-colors duration-300 ease-out md:gap-5"
          >
            <span className="w-14 shrink-0 text-lg tabular-nums sm:text-xl md:w-28 md:text-3xl">
              {row.year}
            </span>
            <span aria-hidden="true" className="text-lg sm:text-xl md:text-3xl">
              +
            </span>
            <span className="text-sm sm:text-base md:text-lg lg:text-xl">
              {row.text}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
