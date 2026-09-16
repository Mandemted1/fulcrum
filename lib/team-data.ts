export interface TeamMember {
  slug: string;
  name: string;
  title: string;
  practice: string;
  image: string;
  bio?: string;
}

// The first four are real, named partners from copy.md, with real bios.
// The remaining ten fill out the firm's stated headcount of fourteen —
// their names and titles were invented with the client's explicit
// approval (copy.md gives no names for them at all), matched to the
// gender presentation of each existing placeholder photo.
export const TEAM: TeamMember[] = [
  {
    slug: "danielle-osei-bonsu",
    name: "Danielle Osei-Bonsu",
    title: "Founding Partner",
    practice: "Discrimination and Harassment",
    image: "/images/portraits/danielle-osei-bonsu.png",
    bio: "Columbia Law. Eleven years at a defence-side firm before opening Fulcrum in 2015, which is where she learned exactly how the other side prices a case.",
  },
  {
    slug: "marcus-reyes",
    name: "Marcus Reyes",
    title: "Partner",
    practice: "Retaliation and Wrongful Termination",
    image: "/images/portraits/marcus-reyes.png",
    bio: "Fordham Law. Former EEOC investigator, so he knows what a charge looks like from the inside and what makes one get taken seriously.",
  },
  {
    slug: "hannah-lieberman",
    name: "Hannah Lieberman",
    title: "Partner",
    practice: "Severance and Executive Exits",
    image: "/images/portraits/hannah-lieberman.png",
    bio: "NYU Law. Twelve years in executive compensation before switching sides. Reads a severance agreement the way the company that wrote it hoped you wouldn't.",
  },
  {
    slug: "aisha-rahman",
    name: "Aisha Rahman",
    title: "Partner",
    practice: "Wage and Hour",
    image: "/images/portraits/aisha-rahman.png",
    bio: "CUNY Law. Started in a wage-and-hour clinic in the Bronx and never really left the work. Class and collective actions, misclassification, unpaid overtime.",
  },
  {
    slug: "emily-sorensen",
    name: "Emily Sorensen",
    title: "Senior Associate",
    practice: "Wage and Hour",
    image: "/images/team/scatter/member-1.png",
  },
  {
    slug: "nathaniel-cross",
    name: "Nathaniel Cross",
    title: "Associate",
    practice: "Retaliation and Wrongful Termination",
    image: "/images/team/scatter/member-2.png",
  },
  {
    slug: "malik-thompson",
    name: "Malik Thompson",
    title: "Counsel",
    practice: "Discrimination and Harassment",
    image: "/images/team/scatter/member-3.png",
  },
  {
    slug: "isabella-conti",
    name: "Isabella Conti",
    title: "Associate",
    practice: "Severance and Executive Exits",
    image: "/images/team/scatter/member-4.png",
  },
  {
    slug: "benjamin-hoyt",
    name: "Benjamin Hoyt",
    title: "Senior Associate",
    practice: "Wage and Hour",
    image: "/images/team/scatter/member-5.png",
  },
  {
    slug: "claire-whitfield",
    name: "Claire Whitfield",
    title: "Senior Associate",
    practice: "Discrimination and Harassment",
    image: "/images/team/scatter/member-6.png",
  },
  {
    slug: "andre-baptiste",
    name: "Andre Baptiste",
    title: "Associate",
    practice: "Retaliation and Wrongful Termination",
    image: "/images/team/scatter/member-7.png",
  },
  {
    slug: "megan-alcott",
    name: "Megan Alcott",
    title: "Associate",
    practice: "Wage and Hour",
    image: "/images/team/scatter/member-8.png",
  },
  {
    slug: "peter-donnelly",
    name: "Peter Donnelly",
    title: "Senior Associate",
    practice: "Severance and Executive Exits",
    image: "/images/team/scatter/member-9.png",
  },
  {
    slug: "victor-amara",
    name: "Victor Amara",
    title: "Counsel",
    practice: "Discrimination and Harassment",
    image: "/images/team/scatter/member-10.png",
  },
];

// Homepage preview — the 4 named partners plus 2 more for texture.
export const TEAM_PREVIEW = TEAM.slice(0, 6);
