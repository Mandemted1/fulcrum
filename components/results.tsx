import { PaperCard } from "@/components/paper-card";
import { FadeUp } from "@/components/fade-up";

const RESULTS = [
  {
    figure: "$4.2m",
    description:
      "Jury verdict, race discrimination and retaliation, financial services",
  },
  {
    figure: "$2.85m",
    description:
      "Settlement, collective action for unpaid overtime, 140 delivery drivers",
  },
  {
    figure: "$1.9m",
    description: "Settlement, pregnancy discrimination and constructive discharge",
  },
  {
    figure: "$960k",
    description:
      "Settlement, disability discrimination and failure to accommodate",
  },
  {
    figure: "$740k",
    description:
      "Negotiated severance increase, from an initial offer of $180k",
  },
  {
    figure: "$610k",
    description: "Settlement, unpaid commissions and retaliation",
  },
];

export function Results() {
  return (
    <section id="results" className="bg-ink px-6 py-24 text-paper md:px-16">
      <FadeUp>
        <h2 className="text-display-lg mb-6 max-w-2xl">Some numbers.</h2>
      </FadeUp>

      {/* Compliance: this disclaimer must sit immediately before the
          first figure, not at the bottom of the page. Never move it. */}
      <FadeUp delay={0.1}>
        <p className="text-body-lg mb-14 max-w-2xl text-paper/60">
          Prior results do not guarantee a similar outcome. Every case turns
          on its own facts. These are selected matters and are not a
          representative sample.
        </p>
      </FadeUp>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8">
        {RESULTS.map((result, i) => (
          <PaperCard
            key={result.figure}
            index={i}
            corner="none"
            scrub
            className="flex min-h-64 flex-col justify-between p-8 text-ink md:min-h-80 md:p-10"
          >
            <span className="text-display-lg">{result.figure}</span>
            <span className="text-body text-ink/65">{result.description}</span>
          </PaperCard>
        ))}
      </div>
    </section>
  );
}
