import type { Metadata } from "next";
import { TeamDirectory } from "@/components/team-directory";
import { TeamPageReveal } from "@/components/team-page-reveal";
import { TEAM } from "@/lib/team-data";

export const metadata: Metadata = {
  title: "Team | Fulcrum, NYC",
  description:
    "Fourteen lawyers in one Manhattan office who have never once represented an employer.",
};

export default function TeamPage() {
  return (
    <main className="bg-paper px-6 py-24 text-ink md:px-16">
      <TeamPageReveal />
      <div className="mb-10 flex items-center justify-between">
        <p className="text-label text-brass-dk">Team</p>
        <a
          href="/"
          className="text-label group flex items-center gap-2 text-ink transition-colors duration-300 hover:text-brass-dk focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass"
        >
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-300 group-hover:-translate-x-1"
          >
            ←
          </span>
          Back
        </a>
      </div>
      <TeamDirectory members={TEAM} />
    </main>
  );
}
