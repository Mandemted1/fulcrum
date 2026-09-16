import { PaperCard } from "@/components/paper-card";
import { FadeUp } from "@/components/fade-up";

const PRACTICES = [
  {
    number: "01",
    title: "Discrimination and Harassment",
    lead: "Danielle Osei-Bonsu",
    team: "6 lawyers",
    body: "Race, sex, age, disability, pregnancy, religion, national origin, sexual orientation, gender identity. We file under the New York City Human Rights Law wherever we can. It's the broadest anti-discrimination statute in the country, and a claim that fails federally often survives under it.",
    image: "/images/practices/discrimination.avif",
  },
  {
    number: "02",
    title: "Retaliation and Wrongful Termination",
    lead: "Marcus Reyes",
    team: "4 lawyers",
    body: "The most winnable employment cases in America are retaliation cases. You complained, and something happened afterwards. Juries understand that sequence without needing it explained, and employers know it.",
    image: "/images/practices/retaliation.avif",
  },
  {
    number: "03",
    title: "Severance and Executive Exits",
    lead: "Hannah Lieberman",
    team: "3 lawyers",
    body: "Do not sign it yet. Severance is almost always negotiable, and the first offer is a first offer. We review, we counter, and most of this work resolves quietly in two to four weeks without anybody filing anything.",
    image: "/images/practices/severance.webp",
  },
  {
    number: "04",
    title: "Wage and Hour",
    lead: "Aisha Rahman",
    team: "4 lawyers",
    body: "Unpaid overtime, misclassification as exempt or as a contractor, stolen tips, unpaid commissions, off-the-clock work. New York's wage laws are unusually strong. Liquidated damages can double what you're owed, and the lookback runs six years.",
    image: "/images/practices/wage-and-hour.avif",
  },
];

export function Practices() {
  return (
    <section id="practices" className="bg-brass px-6 py-24 text-ink md:px-16">
      <FadeUp>
        <p className="text-label mb-6 text-ink">Practices</p>
      </FadeUp>

      <FadeUp delay={0.1}>
        <h2 className="text-display-lg mb-8 max-w-2xl">
          Four things,
          <br />
          done properly.
        </h2>
      </FadeUp>

      <FadeUp delay={0.15}>
        <p className="text-body-lg mb-16 max-w-2xl">
          We turn down more work than we take. These are the areas where
          we&apos;re genuinely better than the firm down the street, and
          outside them we&apos;ll refer you to someone who is.
        </p>
      </FadeUp>

      <div className="flex flex-col gap-16">
        {PRACTICES.map((practice, i) => (
          <div
            key={practice.number}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12"
          >
            <PaperCard
              index={i}
              corner={i % 2 === 0 ? "top-right" : "bottom-left"}
              className="flex min-h-[420px] flex-col justify-between p-8 md:p-10"
            >
              <div>
                <span className="text-label text-brass-dk">
                  {practice.number}
                </span>
                <h3 className="text-display-md mt-4">{practice.title}</h3>
              </div>

              <div className="mt-8">
                <p className="text-body mb-6">{practice.body}</p>
                <div className="flex flex-col gap-2 border-t border-fog pt-4">
                  <div className="flex justify-between">
                    <span className="text-label text-ink/65">
                      Head of practice
                    </span>
                    <span className="text-body">{practice.lead}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-label text-ink/65">Team</span>
                    <span className="text-body">{practice.team}</span>
                  </div>
                </div>
              </div>
            </PaperCard>

            <FadeUp
              delay={0.1}
              className="min-h-[280px] overflow-hidden md:min-h-[420px]"
            >
              <img
                src={practice.image}
                alt=""
                className="h-full w-full object-cover grayscale"
              />
            </FadeUp>
          </div>
        ))}
      </div>
    </section>
  );
}
