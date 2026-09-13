import { Marquee } from "@/components/marquee";
import { PortraitCard } from "@/components/portrait-card";

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
  return (
    <section className="relative bg-ink text-paper">
      <div className="z-10 ml-auto w-fit bg-ink px-6 pb-6 pt-10 md:sticky md:top-28 md:px-16">
        <p className="text-body-lg max-w-xs text-right md:max-w-sm">
          We act for the person, not the company. Fourteen lawyers in one
          Manhattan office who have never once represented an employer.
        </p>
      </div>

      <div className="flex min-h-[60vh] items-center md:min-h-[70vh]">
        <Marquee word="FULCRUM" start="top top" />
      </div>

      <p className="text-label px-6 pb-16 text-paper/60 md:px-16">Details</p>

      <div className="grid grid-cols-2 gap-6 px-6 pb-24 md:grid-cols-4 md:gap-8 md:px-16">
        {PORTRAITS.map((portrait) => (
          <PortraitCard key={portrait.name} {...portrait} />
        ))}
      </div>
    </section>
  );
}
