"use client";

import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import type { TeamMember } from "@/lib/team-data";
import { coverScreen } from "@/lib/page-transition";

interface TeamDirectoryProps {
  members: TeamMember[];
  /** Homepage preview links "ALL PARTNERS" to the full roster page. */
  linkToFullTeam?: boolean;
}

// A small curated set of vertical offsets, applied by column (i % 4) —
// not per-item rotation. Applied via transform, which is purely visual
// and doesn't affect the grid's own row-track sizing.
const COLUMN_OFFSETS = [0, 24, 10, 32];

// Paired with the offsets above so the thumbnails read as genuinely
// scattered — different sizes, not just a jittered grid of equal tiles.
const COLUMN_SIZES = [
  "w-24 sm:w-28",
  "w-16 sm:w-20",
  "w-20 sm:w-24",
  "w-28 sm:w-32",
];

export function TeamDirectory({
  members,
  linkToFullTeam = false,
}: TeamDirectoryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = members[activeIndex];
  const router = useRouter();

  // Progressive enhancement: href="/team" still works with JS disabled.
  // With JS, we intercept, play the covered-navigation wipe, then push.
  const handleAllPartnersClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    coverScreen().then(() => router.push("/team"));
  };

  const label = (
    <div className="group flex flex-col items-center gap-6 text-center">
      <span className="text-display-md text-fog transition-colors duration-300 group-hover:text-brass-dk">
        ALL +
      </span>
      <span className="text-display-md relative">
        PARTNERS
        <span className="absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 bg-brass-dk transition-transform duration-300 group-hover:scale-x-100" />
      </span>
    </div>
  );

  return (
    <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
      {/* Thumbnails + "ALL PARTNERS" — mirrored to the left per direction.
          The label reserves a real col-start-3 row-span-2 area (roughly
          two photo-rows tall) rather than floating absolutely over
          everything — an absolute overlay looked fine for a short 6-item
          grid but landed directly on top of photos once the grid grew
          taller (the full 14-person roster). grid-flow-dense lets the
          photos pack in around the reserved area instead of leaving gaps. */}
      <div className="grid grid-flow-row-dense grid-cols-4 gap-x-3 gap-y-6 sm:gap-x-4">
        {members.map((member, i) => {
          const button = (
            <div
              key={member.slug}
              className="justify-self-center"
              style={{
                transform: `translateY(${COLUMN_OFFSETS[i % COLUMN_OFFSETS.length]}px)`,
              }}
            >
              <button
                type="button"
                onMouseEnter={() => setActiveIndex(i)}
                onFocus={() => setActiveIndex(i)}
                onClick={() => setActiveIndex(i)}
                aria-label={member.name}
                aria-pressed={i === activeIndex}
                className={`group aspect-3/4 overflow-hidden shadow-[0_12px_24px_-16px_rgba(16,16,18,0.4)] transition-[transform,box-shadow,opacity] duration-300 hover:z-10 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_20px_32px_-16px_rgba(16,16,18,0.55)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass ${COLUMN_SIZES[i % COLUMN_SIZES.length]} ${
                  i === activeIndex ? "opacity-100" : "opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover grayscale transition-[filter] duration-300 group-hover:grayscale-0"
                />
              </button>
            </div>
          );

          // Inserted after the first photo (not appended at the end, and
          // not forced to a specific row) — combined with the explicit
          // col-start-2 below and grid-flow-dense, this reliably lands
          // the label spanning the true center columns (2–3 of 4), with
          // photos backfilling column 4 and continuing below it.
          if (i !== 1) return button;

          const labelKey = "all-partners";
          const labelClasses =
            "col-span-2 col-start-2 row-span-2 flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass";

          return (
            <Fragment key={member.slug}>
              {linkToFullTeam ? (
                <a
                  key={labelKey}
                  href="/team"
                  onClick={handleAllPartnersClick}
                  className={labelClasses}
                >
                  {label}
                </a>
              ) : (
                <div key={labelKey} className={labelClasses}>
                  {label}
                </div>
              )}
              {button}
            </Fragment>
          );
        })}
      </div>

      {/* Big photo + name/title — mirrored to the right per direction,
          deliberately not full-width so it doesn't dominate the section.
          ml-auto pushes it to the column's right edge, matching the
          site's established right-content-edge alignment. */}
      <div className="ml-auto max-w-[15rem] sm:max-w-sm md:max-w-md">
        <div className="aspect-3/4 w-full overflow-hidden">
          <img
            src={active.image}
            alt={active.name}
            className="h-full w-full object-cover grayscale"
          />
        </div>
        <h3 className="text-display-md mt-6 uppercase">{active.name}</h3>
        <div className="text-body mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-fog pt-4">
          <span className="whitespace-nowrap">{active.title}</span>
          <span aria-hidden="true" className="text-ink/30">
            |
          </span>
          <span>{active.practice}</span>
        </div>
        {active.bio && (
          <p className="text-body mt-4 text-ink/70">{active.bio}</p>
        )}
      </div>
    </div>
  );
}
