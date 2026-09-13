import { FadeUp } from "@/components/fade-up";

const CALL_US_IF = [
  <>
    You were fired, demoted or passed over and you can connect it to your
    race, sex, age, disability, pregnancy, religion, national origin, sexual
    orientation or gender identity
  </>,
  <>
    Something bad happened <strong className="font-medium">after</strong>{" "}
    you complained about discrimination, reported a safety issue, filed for
    workers&apos; comp, or took protected leave
  </>,
  <>You&apos;re being harassed and HR has known about it for a while</>,
  <>You&apos;ve been handed a severance agreement and you haven&apos;t signed it yet</>,
  <>You&apos;re classified as exempt or as a contractor and you think that&apos;s wrong</>,
  <>You&apos;re owed overtime, commissions, or wages somebody has stopped paying</>,
];

const DONT_CALL_US_IF = [
  <>
    <strong className="font-medium">Your manager is simply a bad manager.</strong>{" "}
    Rudeness, favouritism, impossible targets and public criticism are all
    legal. We know it doesn&apos;t feel that way.
  </>,
  <>
    <strong className="font-medium">
      You want to appeal an unemployment decision.
    </strong>{" "}
    The Department of Labor has a free process and a lawyer usually isn&apos;t
    worth the cost.
  </>,
  <>
    <strong className="font-medium">You&apos;re in a union.</strong> Your CBA
    and your shop steward come first, and going around them can cost you
    rights. Talk to them, then call us if it stalls.
  </>,
  <>
    <strong className="font-medium">
      The likely value is under about $40,000.
    </strong>{" "}
    Below that the economics don&apos;t work for you or for us, and we&apos;ll
    tell you where to go instead.
  </>,
  <>
    <strong className="font-medium">
      It&apos;s criminal, family, immigration or injury law.
    </strong>{" "}
    We&apos;ll give you a name. We give a lot of names.
  </>,
];

export function Qualifier() {
  return (
    <section id="qualifier" className="bg-brass px-6 py-24 text-ink md:px-16">
      <div className="mx-auto max-w-3xl">
        <FadeUp>
          <p className="text-label mb-6 text-ink">Before you call</p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h2 className="text-display-lg mb-10 max-w-2xl">
            Unfair isn&apos;t the same as illegal.
          </h2>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div className="text-body-lg mb-16 flex max-w-2xl flex-col gap-6">
            <p>
              Most people who contact an employment lawyer have been treated
              badly and have no legal claim. That&apos;s not a comment on
              you — it&apos;s what at-will employment means. In New York, an
              employer can fire you for a bad reason, a stupid reason, or no
              reason at all. They just can&apos;t fire you for a{" "}
              <em>protected</em> reason.
            </p>
            <p>
              Nobody in this industry says that up front, because every call
              is a potential fee. We&apos;d rather you knew in ninety seconds
              than after three weeks of hoping.
            </p>
          </div>
        </FadeUp>

        <div className="grid gap-14 md:grid-cols-2 md:gap-10">
          <FadeUp delay={0.1}>
            <h3 className="text-display-md mb-6">Call us if</h3>
            <ul className="text-body flex flex-col gap-4">
              {CALL_US_IF.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink/70"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </FadeUp>

          <FadeUp delay={0.2}>
            <h3 className="text-display-md mb-6">Don&apos;t call us if</h3>
            <ul className="text-body flex flex-col gap-4">
              {DONT_CALL_US_IF.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink/70"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </FadeUp>
        </div>

        <FadeUp delay={0.1}>
          <p className="text-body-lg mt-16 max-w-2xl border-t border-ink/15 pt-10">
            If you&apos;re not sure which list you&apos;re on, that&apos;s
            exactly what the first call is for. It&apos;s twenty minutes,
            it&apos;s free, and about a third of them end with us telling
            someone they don&apos;t need a lawyer.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
