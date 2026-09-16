import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Deadlines } from "@/components/deadlines";
import { Practices } from "@/components/practices";
import { Team } from "@/components/team";
import { Fees } from "@/components/fees";
import { Recognition } from "@/components/recognition";
import { Results } from "@/components/results";
import { Insights } from "@/components/insights";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
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
