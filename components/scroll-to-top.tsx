"use client";

import { useEffect, useState } from "react";
import { getLenisInstance } from "@/lib/lenis-instance";

const SCROLL_THRESHOLD = 400;

export function ScrollToTop() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    const lenis = getLenisInstance();
    if (lenis) {
      lenis.scrollTo(0, { duration: 0.9 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={scrolled ? "Back to top" : "Scroll down"}
      className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border-2 border-brass bg-ink text-paper shadow-[0_12px_24px_-12px_rgba(16,16,18,0.5)] transition-transform hover:scale-105 focus-visible:outline-offset-4 md:bottom-8 md:right-8"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
        className={`transition-transform duration-300 ${scrolled ? "rotate-180" : ""}`}
      >
        <path
          d="M8 2v10M8 12l4-4M8 12l-4-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
