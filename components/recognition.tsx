"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const ROWS = [
  { year: "2026", text: "Best Lawyers in America: Employment Law, Individuals" },
  { year: "2026", text: "New York Super Lawyers: 6 attorneys listed" },
  { year: "2025", text: "Law360 Employment Practice Group of the Year, finalist" },
  {
    year: "2025",
    text: "National Employment Lawyers Association: Advocate of the Year, D. Osei-Bonsu",
  },
  { year: "2025", text: "New York Law Journal: Distinguished Leader" },
  { year: "2024", text: "Best Lawyers in America: Employment Law, Individuals" },
  { year: "2024", text: "NYC Bar Association: Pro Bono Service Award" },
  { year: "2023", text: "New York Super Lawyers Rising Stars: 4 attorneys" },
  { year: "2023", text: "Chambers USA: Band 3, Labor & Employment, New York" },
  { year: "2022", text: "Law360 Rising Star, M. Reyes" },
];

// Vertical spacing between row centers, and how much each step of distance
// tilts a row away on the X axis — together these are what make the stack
// read as a slowly rotating drum rather than a flat scrolling list.
const ROW_SPACING = 190;
const DEGREES_PER_STEP = 34;
const MAX_TILT = 72;
const FADE_DISTANCE = 1.7;

export function Recognition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const rows = rowRefs.current.filter(Boolean) as HTMLElement[];
    if (rows.length === 0) return;

    const clamp = gsap.utils.clamp;

    function render(progress: number) {
      // Continuous float, not floored — the active position (and every
      // row's tilt/scale/fade derived from it) moves smoothly with scroll.
      // Nothing here ever snaps to a discrete step.
      const activePosition = progress * (rows.length - 1);

      // Rows stack (year above headline) below md, wrapping to more lines
      // in less width — they need more vertical room than the single-line
      // desktop layout to avoid neighbors overlapping.
      const rowSpacing = window.innerWidth < 768 ? ROW_SPACING * 1.7 : ROW_SPACING;

      rows.forEach((row, i) => {
        const distance = i - activePosition;
        const absDistance = Math.abs(distance);
        const rotateX = clamp(-MAX_TILT, MAX_TILT, distance * DEGREES_PER_STEP);
        const translateY = distance * rowSpacing;
        const opacity = clamp(0, 1, 1 - Math.pow(absDistance / FADE_DISTANCE, 1.6));
        const scale = clamp(0.7, 1, 1 - absDistance * 0.12);
        const isActive = absDistance < 0.5;

        row.style.transform = `translateY(calc(-50% + ${translateY}px)) rotateX(${rotateX}deg) scale(${scale})`;
        row.style.opacity = String(opacity);
        row.style.color = isActive ? "var(--color-ink)" : "var(--color-fog)";
        row.style.fontWeight = isActive ? "700" : "500";
        row.style.zIndex = String(Math.round(100 - absDistance));
      });
    }

    render(0);

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
      end: "+=250%",
      pin: true,
      onUpdate: (self) => render(self.progress),
    });

    return () => trigger.kill();
  }, []);

  return (
    <section
      id="recognition"
      ref={containerRef}
      className="relative flex h-screen flex-col justify-center overflow-hidden bg-paper px-6 md:px-16"
      style={{ perspective: "1200px" }}
    >
      <p className="text-label absolute left-6 top-24 z-10 text-brass-dk md:left-16">
        Recognition
      </p>

      {/* Fixed focus marker — the drum turns past this single point, rather
          than each row carrying its own marker. */}
      <span
        aria-hidden="true"
        className="text-display-lg absolute right-6 top-1/2 z-10 -translate-y-1/2 text-ink md:right-16"
      >
        +
      </span>

      <div className="relative h-0 w-full" style={{ transformStyle: "preserve-3d" }}>
        {ROWS.map((row, i) => (
          <div
            key={i}
            ref={(el) => {
              rowRefs.current[i] = el;
            }}
            className="absolute left-6 right-20 top-1/2 flex origin-center flex-col justify-start gap-1 will-change-transform md:left-16 md:right-28 md:flex-row md:items-baseline md:gap-10"
          >
            <span className="text-display-md shrink-0 tabular-nums md:w-32">
              {row.year}
            </span>
            <span className="text-display-md flex-1">{row.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
