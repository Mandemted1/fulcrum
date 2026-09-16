"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Marquee } from "@/components/marquee";
import { PortraitCard } from "@/components/portrait-card";

gsap.registerPlugin(ScrollTrigger);

const PORTRAITS = [
  {
    name: "Danielle Osei-Bonsu",
    title: "Founding Partner",
    image: "/images/portraits/danielle-osei-bonsu.png",
  },
  {
    name: "Marcus Reyes",
    title: "Partner",
    image: "/images/portraits/marcus-reyes.png",
  },
  {
    name: "Hannah Lieberman",
    title: "Partner",
    image: "/images/portraits/hannah-lieberman.png",
  },
  {
    name: "Aisha Rahman",
    title: "Partner",
    image: "/images/portraits/aisha-rahman.png",
  },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const portraitsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const intro = introRef.current;
    const portraits = portraitsRef.current;
    if (!intro || !portraits) return;

    // The intro line is sticky so it stays readable while FULCRUM transits —
    // but it should give way once the founder portraits actually arrive,
    // rather than sitting sticky on top of the Details section underneath it.
    const tween = gsap.to(intro, {
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: portraits,
        start: "top 85%",
        end: "top 40%",
        scrub: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-ink text-paper">
      <div
        ref={introRef}
        className="z-10 ml-auto w-fit px-6 pb-6 pt-10 md:sticky md:top-28 md:px-16"
      >
        <p className="text-body-lg max-w-xs text-right md:max-w-sm">
          We act for the person, not the company. Fourteen lawyers in one
          Manhattan office who have never once represented an employer.
        </p>
      </div>

      {/* items-end, not items-center — the sticky intro paragraph occupies
          the top band of the viewport for a while as this block scrolls
          past, and a vertically-centered word would spend that whole time
          overlapping it. Bottom-aligning keeps the word clear of that band. */}
      <div className="flex min-h-[60vh] items-end pb-10 md:min-h-[70vh] md:pb-16">
        <Marquee
          word="FULCRUM"
          start="top top"
          end="bottom bottom"
          triggerRef={sectionRef}
          toXPercent={-120}
        />
      </div>

      <p className="text-label px-6 pb-16 pt-16 text-paper/60 md:px-16 md:pt-24">
        Details
      </p>

      <div
        ref={portraitsRef}
        className="grid grid-cols-2 gap-6 px-6 pb-24 md:grid-cols-4 md:gap-8 md:px-16"
      >
        {PORTRAITS.map((portrait) => (
          <PortraitCard key={portrait.name} {...portrait} />
        ))}
      </div>
    </section>
  );
}
