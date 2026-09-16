import { FadeUp } from "@/components/fade-up";

const FEE_ITEMS = [
  {
    title: "The first call: free, twenty minutes.",
    body: "You describe what happened, we tell you whether there's something there. No form, no intake questionnaire, no “case evaluation specialist.” You speak to a lawyer.",
  },
  {
    title: "Contingency: 33⅓% before filing, 40% after.",
    body: "For discrimination, retaliation and wage claims. You pay nothing unless we recover something. Case costs (filing fees, depositions, experts) come out of the recovery and we itemise every one. If we recover nothing, you owe nothing, including costs.",
  },
  {
    title: "Severance review: flat fee, $1,800 to $3,500.",
    body: "Depends on the length and complexity of the agreement. You know the number before we start. For packages above roughly $150,000 we'll often do this on a percentage of the increase instead, which usually costs you less.",
  },
  {
    title: "Hourly: $625 to $875.",
    body: "Only where contingency doesn't fit: negotiations, advisory work, some executive matters. Billed in tenths, itemised, and we'll estimate the range before you commit.",
  },
];

export function Fees() {
  return (
    <section className="bg-ink px-6 py-24 text-paper md:px-16">
      <div className="mx-auto max-w-3xl">
        <FadeUp>
          <p className="text-label mb-6 text-brass">Fees</p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h2 className="text-display-lg mb-6">
            Nobody pays us to be told no.
          </h2>
        </FadeUp>

        <FadeUp delay={0.15}>
          <p className="text-body-lg mb-16 max-w-2xl text-paper/60">
            Employment lawyers are notoriously vague about money.
            Here&apos;s ours.
          </p>
        </FadeUp>

        <div className="flex flex-col gap-12">
          {FEE_ITEMS.map((item, i) => (
            <FadeUp key={item.title} delay={i * 0.06}>
              <h3 className="text-display-md mb-3">{item.title}</h3>
              <p className="text-body max-w-2xl">{item.body}</p>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.1}>
          <div className="mt-16 border-t border-rule pt-10">
            <h3 className="text-display-md mb-3">What we never do.</h3>
            <p className="text-body max-w-2xl">
              Charge for the first call. Take a case we don&apos;t believe in
              because the fee is attractive. Or let a case sit because
              settling it is more profitable than trying it.
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
