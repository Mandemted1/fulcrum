import { PaperCard } from "@/components/paper-card";
import { FadeUp } from "@/components/fade-up";

const STATS = [
  { value: "11", label: "Years in practice" },
  { value: "14", label: "Lawyers" },
  { value: "2,400", label: "People advised" },
  { value: "$61m", label: "Recovered for clients" },
];

export function About() {
  return (
    <section id="about" className="bg-ink px-6 py-24 text-paper md:px-16">
      <FadeUp>
        <p className="text-label mb-6 text-brass">About us</p>
      </FadeUp>

      <FadeUp delay={0.1}>
        <h2 className="text-display-lg mb-14 max-w-2xl">
          A small force,
          <br />
          correctly placed.
        </h2>
      </FadeUp>

      <div className="mb-6 grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
        {STATS.map((stat, i) => (
          <PaperCard
            key={stat.label}
            index={i}
            className="flex min-h-52 flex-col justify-between p-6 text-ink md:min-h-60 md:p-8"
          >
            <span className="text-display-lg">{stat.value}</span>
            <span className="text-label text-ink/65">{stat.label}</span>
          </PaperCard>
        ))}
      </div>

      <p className="text-body mb-14 text-paper/60">
        Prior results do not guarantee a similar outcome.
      </p>

      <FadeUp>
        <div className="text-body flex max-w-2xl flex-col gap-6">
          <p>
            Most people who call us are one person with a story and a folder
            of emails, up against a company with a general counsel and an
            outside firm on retainer. The imbalance is the entire problem,
            and it is the only thing we work on.
          </p>
          <p>
            We have never represented an employer. Not once, not as a
            favour, not on the side. That means no conflicts, no divided
            loyalty, and no partner down the hall whose biggest client is
            the company that just fired you.
          </p>
        </div>
      </FadeUp>
    </section>
  );
}
