import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Qualifier } from "@/components/qualifier";
import { Deadlines } from "@/components/deadlines";
import { Practices } from "@/components/practices";
import { Team } from "@/components/team";
import { Fees } from "@/components/fees";
import { Recognition } from "@/components/recognition";
import { Results } from "@/components/results";
import { Insights } from "@/components/insights";
import { Contact } from "@/components/contact";
import { qualifierFaqSchema } from "@/lib/structured-data";

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(qualifierFaqSchema) }}
      />
      <Hero />
      <About />
      <Qualifier />
      <Deadlines />
      <Practices />
      <Team />
      <Fees />
      <Recognition />
      <Results />
      <Insights />
      <Contact />
    </main>
  );
}
