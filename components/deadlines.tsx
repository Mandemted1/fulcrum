import { FadeUp } from "@/components/fade-up";

const ROWS: { label: string; value: React.ReactNode }[] = [
  {
    label: "Federal discrimination charge (EEOC)",
    value: (
      <>
        <strong className="font-medium">300 days</strong> in New York
      </>
    ),
  },
  {
    label: "New York State Human Rights Law",
    value: (
      <>
        <strong className="font-medium">3 years</strong> for most claims
      </>
    ),
  },
  {
    label: "New York City Human Rights Law",
    value: <strong className="font-medium">3 years</strong>,
  },
  {
    label: "Unpaid wages and overtime (NY Labor Law)",
    value: <strong className="font-medium">6 years</strong>,
  },
  {
    label: "Federal wage claims (FLSA)",
    value: (
      <>
        <strong className="font-medium">2 years</strong>, 3 if wilful
      </>
    ),
  },
  {
    label: "Severance agreement, age 40+, group layoff",
    value: (
      <>
        <strong className="font-medium">21 days</strong> to consider,{" "}
        <strong className="font-medium">7 days</strong> to revoke after
        signing
      </>
    ),
  },
];

export function Deadlines() {
  return (
    <section id="deadlines" className="bg-ink px-6 py-24 text-paper md:px-16">
      <div className="mx-auto max-w-3xl">
        <FadeUp>
          <p className="text-label mb-6 text-brass">Time limits</p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h2 className="text-display-lg mb-10 max-w-2xl">
            Most rights expire.
          </h2>
        </FadeUp>

        <FadeUp delay={0.15}>
          <p className="text-body-lg mb-14 max-w-2xl text-paper/60">
            These are the deadlines that catch people out. They start
            running from the thing that happened, not from the day you
            decided to do something about it.
          </p>
        </FadeUp>

        <FadeUp delay={0.2}>
          <dl className="flex flex-col">
            {ROWS.map((row) => (
              <div
                key={row.label}
                className="flex flex-col gap-1 border-t border-rule py-5 md:flex-row md:items-baseline md:justify-between md:gap-6"
              >
                <dt className="text-body max-w-md text-paper/60">
                  {row.label}
                </dt>
                <dd className="text-body-lg text-right md:text-right">
                  {row.value}
                </dd>
              </div>
            ))}
            <div className="border-t border-rule" />
          </dl>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p className="text-body mt-14 max-w-2xl text-paper/60">
            If you&apos;re inside sixty days of any of these, call rather
            than email. These rules have exceptions and the exceptions have
            exceptions, so treat this as a prompt to ask, not as advice.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
