// Prefixed with "/" so these still resolve correctly from other routes
// (e.g. /team), not just when already on the homepage.
const NAV_LINKS = [
  { label: "About", href: "/#about" },
  { label: "Practices", href: "/#practices" },
  { label: "Team", href: "/#team" },
  { label: "Insights", href: "/#insights" },
  { label: "Contact", href: "/#contact" },
];

const PRACTICE_LINKS = [
  { label: "Discrimination", href: "/#practices" },
  { label: "Retaliation", href: "/#practices" },
  { label: "Severance", href: "/#practices" },
  { label: "Wage and hour", href: "/#practices" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-brass text-ink">
      {/* Low opacity so the solid brass underneath — and the ink-on-brass
          contrast we verified at 6.34:1 — stays effectively unchanged. */}
      {/* eslint-disable-next-line @next/next/no-img-element -- placeholder art, swapped for a real photo later */}
      <img
        src="/images/footer/footer-background.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-10"
      />

      <div className="relative grid grid-cols-1 gap-12 px-6 py-20 sm:grid-cols-2 md:px-16 lg:grid-cols-4">
        <div>
          <p className="text-label mb-6 text-ink">Navigation</p>
          <ul className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-body">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-label mb-6 text-ink">Practices</p>
          <ul className="flex flex-col gap-3">
            {PRACTICE_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-body">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-label mb-6 text-ink">Contact</p>
          <address className="text-body flex flex-col gap-1 not-italic">
            <span>1120 Sixth Avenue, 14th Floor</span>
            <span>New York, NY 10036</span>
            <a href="tel:+12125550164">(212) 555-0164</a>
            <a href="mailto:hello@fulcrumemployment.com">
              hello@fulcrumemployment.com
            </a>
            <span>Mon–Fri, 9am–7pm</span>
          </address>
        </div>

        <div>
          <p className="text-label mb-6 text-ink">Follow</p>
          <ul className="flex flex-col gap-3">
            <li>
              <a href="#" className="text-body">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="#" className="text-body">
                Instagram
              </a>
            </li>
          </ul>

          <p className="text-body mt-10 max-w-xs text-ink">
            One email a month. What changed in employment law and whether it
            affects you.
          </p>
        </div>
      </div>

      <div
        className="relative overflow-hidden bg-linear-to-br from-brass to-brass-dk"
        style={{ height: "calc(var(--marquee-size) * 0.65)" }}
      >
        <span className="text-marquee block leading-[0.8]">FULCRUM</span>
      </div>

      <div className="relative border-t border-ink/15 px-6 py-6 md:px-16">
        <p className="text-label flex flex-wrap gap-x-2 gap-y-1 text-ink">
          <span>ATTORNEY ADVERTISING</span>
          <span aria-hidden="true">·</span>
          <span>© 2026 Fulcrum Employment Law PLLC</span>
          <span aria-hidden="true">·</span>
          <span>Prior results do not guarantee a similar outcome</span>
          <span aria-hidden="true">·</span>
          <span>The information on this site is general and is not legal advice</span>
          <span aria-hidden="true">·</span>
          <span>Privacy</span>
          <span aria-hidden="true">·</span>
          <span>Terms</span>
          <span aria-hidden="true">·</span>
          <span>Accessibility</span>
        </p>
      </div>
    </footer>
  );
}
