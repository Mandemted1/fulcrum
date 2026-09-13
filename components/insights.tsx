import { PaperCard } from "@/components/paper-card";
import { FadeUp } from "@/components/fade-up";

const INSIGHTS = [
  {
    title:
      "You've been handed a severance agreement. Read this before you sign anything.",
    description:
      "What the 21-day clock actually means, which clauses are negotiable, and the three provisions we ask to have removed almost every time.",
  },
  {
    title: "What “at-will employment” really means in New York",
    description:
      "The most misunderstood phrase in American working life, and the narrow set of exceptions that are the whole of employment law.",
  },
  {
    title: "Your employer says you're exempt from overtime. They're often wrong.",
    description:
      "Salary alone doesn't make you exempt. The duties test does, and a lot of job titles don't survive it.",
  },
  {
    title: "Documenting a hostile work environment without making it worse",
    description:
      "What to keep, where to keep it, what not to put in writing, and the mistake that costs people their cases.",
  },
  {
    title: "How much is my case worth?",
    description:
      "An honest answer to the question everyone asks first, including why nobody can give you a number in the first conversation.",
  },
];

export function Insights() {
  return (
    <section id="insights" className="bg-brass px-6 py-24 text-ink md:px-16">
      <FadeUp>
        <h2 className="text-display-lg mb-14">Insights</h2>
      </FadeUp>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {INSIGHTS.map((insight, i) => (
          <PaperCard
            key={insight.title}
            index={i}
            corner={i % 2 === 0 ? "top-right" : "bottom-left"}
            className="flex min-h-72 flex-col justify-between p-8"
          >
            <h3 className="text-display-md">{insight.title}</h3>
            <p className="text-body mt-6 text-ink/70">{insight.description}</p>
          </PaperCard>
        ))}
      </div>
    </section>
  );
}
