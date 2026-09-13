"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface PortraitCardProps {
  name: string;
  title: string;
  image: string;
}

export function PortraitCard({ name, title, image }: PortraitCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const plate = plateRef.current;
    if (!card || !plate) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: "top bottom",
        end: "top center",
        scrub: true,
      },
    });

    tl.fromTo(
      card,
      { scale: 0.35, y: 60 },
      { scale: 1, y: 0, ease: "none", duration: 1 },
      0
    );
    tl.fromTo(
      plate,
      { opacity: 0 },
      { opacity: 1, ease: "none", duration: 0.4 },
      0.6
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <div ref={cardRef} className="origin-bottom">
      <div className="relative aspect-3/4 w-full overflow-hidden bg-rule">
        {/* eslint-disable-next-line @next/next/no-img-element -- local SVG placeholder, swapped for a real photo + next/image later */}
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover grayscale"
        />
      </div>
      <div ref={plateRef} className="mt-4">
        <p className="text-body">{name}</p>
        <p className="text-label text-paper/60">{title}</p>
      </div>
    </div>
  );
}
