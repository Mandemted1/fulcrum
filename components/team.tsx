import { Marquee } from "@/components/marquee";
import { FadeUp } from "@/components/fade-up";
import { TeamReveal } from "@/components/team-reveal";
import { TeamScatter } from "@/components/team-scatter";

const PARTNERS = [
  {
    name: "Danielle Osei-Bonsu",
    title: "Founding Partner",
    bio: "Columbia Law. Eleven years at a defence-side firm before opening Fulcrum in 2015, which is where she learned exactly how the other side prices a case. Discrimination and harassment.",
  },
  {
    name: "Marcus Reyes",
    title: "Partner",
    bio: "Fordham Law. Former EEOC investigator, so he knows what a charge looks like from the inside and what makes one get taken seriously. Retaliation and wrongful termination.",
  },
  {
    name: "Hannah Lieberman",
    title: "Partner",
    bio: "NYU Law. Twelve years in executive compensation before switching sides. Reads a severance agreement the way the company that wrote it hoped you wouldn't. Severance and exits.",
  },
  {
    name: "Aisha Rahman",
    title: "Partner",
    bio: "CUNY Law. Started in a wage-and-hour clinic in the Bronx and never really left the work. Class and collective actions, misclassification, unpaid overtime.",
  },
];

export function Team() {
  return (
    <>
      <section id="team" className="bg-ink px-6 pb-24 pt-24 text-paper md:px-16">
        <FadeUp>
          <p className="text-label mb-10 text-brass">
            Before anything else, Fulcrum is a
          </p>
        </FadeUp>
        <Marquee word="TEAM" />
      </section>

      <section className="bg-paper text-ink">
        <TeamReveal />
        <TeamScatter />

        <div className="px-6 pb-24 md:px-16">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {PARTNERS.map((partner, i) => (
              <FadeUp key={partner.name} delay={i * 0.08}>
                <h3 className="text-display-md mb-2">{partner.name}</h3>
                <p className="text-label mb-4 text-ink/65">{partner.title}</p>
                <p className="text-body">{partner.bio}</p>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.2}>
            <a
              href="#"
              className="text-label mt-16 inline-block border-b border-ink pb-1"
            >
              All 14 →
            </a>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
