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
    "We represent employees only: discrimination, retaliation, severance and unpaid wages.",
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
