"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { getLenisInstance } from "@/lib/lenis-instance";

const NAV_ITEMS = [
  { number: "01", label: "About", href: "#about" },
  { number: "02", label: "Practices", href: "#practices" },
  { number: "03", label: "Team", href: "#team" },
  { number: "04", label: "Insights", href: "#insights" },
  { number: "05", label: "Contact", href: "#contact" },
];

const CLIP_CLOSED = "inset(0% 0% 0% 100%)";
const CLIP_OPEN = "inset(0% 0% 0% 0%)";

export function Header() {
  const [open, setOpen] = useState(false);
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const summaryRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<HTMLAnchorElement[]>([]);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const enhancedRef = useRef(false);

  // Progressive enhancement only: without this, the <details> element
  // still opens/closes natively with the browser's default instant toggle.
  useEffect(() => {
    if (panelRef.current) {
      gsap.set(panelRef.current, { clipPath: CLIP_CLOSED });
      enhancedRef.current = true;
    }
  }, []);

  const openMenu = () => {
    const details = detailsRef.current;
    if (!details) return;
    details.open = true;
    setOpen(true);
    document.body.style.overflow = "hidden";
    getLenisInstance()?.stop();

    timelineRef.current?.kill();
    const tl = gsap.timeline();
    timelineRef.current = tl;
    tl.set([closeButtonRef.current, ...itemRefs.current], { opacity: 0, y: 24 });
    tl.to(panelRef.current, {
      clipPath: CLIP_OPEN,
      duration: 0.6,
      ease: "power3.inOut",
    });
    tl.to(
      [closeButtonRef.current, ...itemRefs.current],
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.06 },
      "-=0.3"
    );

    requestAnimationFrame(() => itemRefs.current[0]?.focus());
  };

  const closeMenu = () => {
    const details = detailsRef.current;
    if (!enhancedRef.current || !details?.open) return;

    timelineRef.current?.kill();
    const tl = gsap.timeline({
      onComplete: () => {
        details.open = false;
        setOpen(false);
        document.body.style.overflow = "";
        getLenisInstance()?.start();
        summaryRef.current?.focus();
      },
    });
    timelineRef.current = tl;
    tl.to([closeButtonRef.current, ...itemRefs.current], {
      opacity: 0,
      y: -12,
      duration: 0.25,
      ease: "power2.in",
      stagger: 0.03,
    });
    tl.to(
      panelRef.current,
      { clipPath: CLIP_CLOSED, duration: 0.5, ease: "power3.inOut" },
      "-=0.1"
    );
  };

  const handleSummaryClick = (e: React.MouseEvent) => {
    if (!enhancedRef.current) return; // let native <details> handle it
    e.preventDefault();
    if (open) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMenu();
        return;
      }
      if (e.key === "Tab") {
        const focusables = [
          closeButtonRef.current,
          ...itemRefs.current,
        ].filter(Boolean) as HTMLElement[];
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <header className="sticky top-0 z-[70] bg-ink text-paper">
      <div className="flex flex-col gap-1 border-b border-rule px-6 py-2 sm:flex-row sm:items-center sm:justify-between md:px-16">
        <p className="text-label text-brass">Attorney advertising</p>
        <div className="flex items-center gap-4 md:gap-6">
          <a href="tel:+12125550164" className="text-label">
            (212) 555-0164
          </a>
          <p className="text-label hidden text-paper/60 sm:block">EN / ES</p>
        </div>
      </div>

      <div className="flex items-center justify-between px-6 py-4 md:px-16">
        <a href="#" className="font-display text-xl font-bold tracking-tight">
          FULCRUM
        </a>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-8 md:flex"
        >
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href} className="text-label">
              {item.label}
            </a>
          ))}
        </nav>

        <details ref={detailsRef} className="relative">
          <summary
            ref={summaryRef}
            onClick={handleSummaryClick}
            className="text-label cursor-pointer list-none rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass [&::-webkit-details-marker]:hidden"
          >
            {open ? "Close" : "Menu"}
          </summary>

          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink"
          >
            {/*
              The header itself sits at z-[70] but the <details>/<summary>
              trigger is a static, non-positioned descendant of it — this
              positioned, z-indexed panel (z-[60]) stacks above it within
              the header's own stacking context regardless of the header's
              higher z-index relative to the REST of the page. That hid the
              "Close" trigger completely once the menu opened. This button
              is the fix: a close affordance that lives inside the panel
              itself, so it can never be covered by it.
            */}
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeMenu}
              aria-label="Close menu"
              className="text-label absolute right-6 top-6 cursor-pointer text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass md:right-16 md:top-8"
            >
              Close
            </button>

            <ol className="flex flex-col items-start gap-4 px-6 md:px-16">
              {NAV_ITEMS.map((item, i) => (
                <li key={item.href}>
                  <a
                    ref={(el) => {
                      itemRefs.current[i] = el as HTMLAnchorElement;
                    }}
                    href={item.href}
                    onClick={closeMenu}
                    className="group flex items-baseline gap-6 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass"
                  >
                    <span className="text-label text-brass">
                      {item.number}
                    </span>
                    <span className="text-display-lg text-paper transition-colors group-hover:text-brass">
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </details>
      </div>
    </header>
  );
}
