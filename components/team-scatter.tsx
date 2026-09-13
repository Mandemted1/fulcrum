import { FadeUp } from "@/components/fade-up";
import { getSeededRotation } from "@/lib/seeded-rotation";

const THUMBNAILS = [
  "/images/portraits/danielle-osei-bonsu.png",
  "/images/team/scatter/member-1.png",
  "/images/team/scatter/member-2.png",
  "/images/portraits/marcus-reyes.png",
  "/images/team/scatter/member-3.png",
  "/images/team/scatter/member-4.png",
  "/images/team/scatter/member-5.png",
  "/images/portraits/hannah-lieberman.png",
  "/images/team/scatter/member-6.png",
  "/images/team/scatter/member-7.png",
  "/images/portraits/aisha-rahman.png",
  "/images/team/scatter/member-8.png",
  "/images/team/scatter/member-9.png",
  "/images/team/scatter/member-10.png",
];

export function TeamScatter() {
  return (
    <FadeUp className="px-6 py-20 md:px-16">
      <div className="grid grid-cols-4 gap-4 sm:grid-cols-5 md:grid-cols-7 md:gap-6">
        {THUMBNAILS.map((src, i) => (
          <div
            key={src + i}
            className="aspect-square overflow-hidden shadow-[0_12px_24px_-16px_rgba(16,16,18,0.4)]"
            style={{ rotate: `${getSeededRotation(i) * 0.6}deg` }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- placeholder art, swapped for real headshots later */}
            <img
              src={src}
              alt=""
              className="h-full w-full object-cover grayscale"
            />
          </div>
        ))}
      </div>
    </FadeUp>
  );
}
