const PHONE = "+1-212-555-0164";

const ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "1120 Sixth Avenue, 14th Floor",
  addressLocality: "New York",
  addressRegion: "NY",
  postalCode: "10036",
  addressCountry: "US",
};

export const legalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: "Fulcrum Employment Law",
  description:
    "We represent employees only — discrimination, retaliation, severance and unpaid wages.",
  telephone: PHONE,
  email: "hello@fulcrumemployment.com",
  address: ADDRESS,
  areaServed: {
    "@type": "State",
    name: "New York",
  },
  priceRange: "$$",
};

const PARTNERS = [
  { name: "Danielle Osei-Bonsu", jobTitle: "Founding Partner" },
  { name: "Marcus Reyes", jobTitle: "Partner" },
  { name: "Hannah Lieberman", jobTitle: "Partner" },
  { name: "Aisha Rahman", jobTitle: "Partner" },
];

export const attorneySchemas = PARTNERS.map((partner) => ({
  "@context": "https://schema.org",
  "@type": "Attorney",
  name: partner.name,
  jobTitle: partner.jobTitle,
  worksFor: {
    "@type": "LegalService",
    name: "Fulcrum Employment Law",
  },
}));

// FAQPage requires a question ("name") per entry, which copy.md doesn't
// literally supply for the qualifier section — the question text below is
// the minimal, obvious framing of the section's own "Call us if" / "Don't
// call us if" headers. The answer text is copy.md's list items verbatim,
// only joined into paragraph form.
export const qualifierFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "When should I call an employment lawyer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You were fired, demoted or passed over and you can connect it to your race, sex, age, disability, pregnancy, religion, national origin, sexual orientation or gender identity. Something bad happened after you complained about discrimination, reported a safety issue, filed for workers' comp, or took protected leave. You're being harassed and HR has known about it for a while. You've been handed a severance agreement and you haven't signed it yet. You're classified as exempt or as a contractor and you think that's wrong. You're owed overtime, commissions, or wages somebody has stopped paying.",
      },
    },
    {
      "@type": "Question",
      name: "When should I not call an employment lawyer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Your manager is simply a bad manager. Rudeness, favouritism, impossible targets and public criticism are all legal. You want to appeal an unemployment decision — the Department of Labor has a free process and a lawyer usually isn't worth the cost. You're in a union — your CBA and your shop steward come first, and going around them can cost you rights. The likely value is under about $40,000 — below that the economics don't work for you or for us. It's criminal, family, immigration or injury law — we'll give you a name.",
      },
    },
  ],
};
