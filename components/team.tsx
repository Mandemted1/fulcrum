import { FadeUp } from "@/components/fade-up";
import { TeamZoomMarquee } from "@/components/team-zoom-marquee";
import { TeamReveal } from "@/components/team-reveal";
import { TeamDirectory } from "@/components/team-directory";
import { TEAM_PREVIEW } from "@/lib/team-data";

export function Team() {
  return (
    <>
      <section id="team">
        <TeamZoomMarquee />
      </section>

      <section className="bg-paper text-ink">
        <TeamReveal />
      </section>

      <section className="bg-paper px-6 py-24 text-ink md:px-16">
        <FadeUp>
          <TeamDirectory members={TEAM_PREVIEW} linkToFullTeam />
        </FadeUp>
      </section>
    </>
  );
}
