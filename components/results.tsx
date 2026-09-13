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
      <div className="mx-auto max-w-3xl">
        <FadeUp>
          <h2 className="text-display-lg mb-6">Some numbers.</h2>
        </FadeUp>

        {/* Compliance: this disclaimer must sit immediately before the
            first figure, not at the bottom of the page. Never move it. */}
        <FadeUp delay={0.1}>
          <p className="text-body-lg mb-14 max-w-2xl text-paper/60">
            Prior results do not guarantee a similar outcome. Every case
            turns on its own facts. These are selected matters and are not a
            representative sample.
          </p>
        </FadeUp>

        <FadeUp delay={0.15}>
          <dl className="flex flex-col">
            {RESULTS.map((result) => (
              <div
                key={result.figure}
                className="flex flex-col gap-1 border-t border-rule py-6 md:flex-row md:items-baseline md:justify-between md:gap-6"
              >
                <dt className="text-display-md">{result.figure}</dt>
                <dd className="text-body-lg text-paper/60 md:text-right">
                  {result.description}
                </dd>
              </div>
            ))}
            <div className="border-t border-rule" />
          </dl>
        </FadeUp>
      </div>
    </section>
  );
}
