# Fulcrum — Build Brief

Seven motion mechanics taken from the Ario recording, plus the compliance layer. The mechanics are more distinctive than anything we've built so far, and three of them are genuinely tricky.

---

## 1. Stack

```bash
npx create-next-app@latest fulcrum --typescript --tailwind --app
cd fulcrum
npm i lenis gsap
```

Next.js 15 · Tailwind v4 · Lenis · GSAP + ScrollTrigger · next/font.

Everything here is 2D transforms and opacity. No 3D library, no canvas. The "paper" effect is CSS `clip-path` and `rotate`.

---

## 2. Tokens

```css
@theme {
  --color-ink:      #101012;  /* black field — hero, team, deadlines */
  --color-paper:    #F3F1EC;  /* bone — content sections, cards */
  --color-brass:    #C08B3E;  /* accent, CTA panels, footer */
  --color-brass-dk: #8E6425;  /* gradient far stop */
  --color-stone:    #7C7A74;  /* muted, inactive list items */
  --color-fog:      #D8D5CE;  /* the pale grey for unfocused recognition rows */
  --color-rule:     #2A2A2C;  /* hairlines on ink */
}
```

**Why brass rather than navy.** Every law firm is navy. This firm's clients are people who've just been fired, harassed or cheated out of overtime, reading the site at 11pm after a bad day. Corporate blue is the wrong temperature for that. Brass reads as weight and craft without being cold, and it makes the whole piece instantly distinguishable in a grid of legal sites.

**Three fields only:** ink, paper, brass. Sections butt with no gaps.

**Type.**

- **Display: Space Grotesk**, 500 and 700. Slightly technical, holds up at marquee scale, has real character.
- **Body: Inter**, 400 and 500. Legal content is long and text-heavy; Inter is the right tool and Space Grotesk isn't.

```
marquee     clamp(6rem, 22vw, 20rem)     Space Grotesk 700  tracking -0.04em  leading 0.8
display-lg  clamp(2.25rem, 5vw, 4rem)    Space Grotesk 500  tracking -0.03em  leading 1.05
display-md  clamp(1.5rem, 2.5vw, 2.25rem) Space Grotesk 500 tracking -0.02em  leading 1.2
body        1.0625rem                     Inter 400  leading 1.65
body-lg     1.25rem                       Inter 400  leading 1.55
label       0.6875rem                     Inter 500  tracking 0.14em  uppercase
```

---

## 3. The seven mechanics

### 3.1 Horizontal marquee on vertical scroll

The signature move. `FULCRUM` in the hero and `TEAM` in the team section both slide sideways as you scroll down.

```js
gsap.to(word, {
  xPercent: -60,
  ease: 'none',
  scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 0.5 }
})
```

Set the word in a `overflow: hidden` full-bleed wrapper with `white-space: nowrap`. The letterforms should exceed the viewport so a letter fills the screen at one point — that's the moment that makes it.

Not pinned. The section scrolls normally; only the word translates. Pinning this would double your page height for no gain.

### 3.2 Paper cards that arrive tilted

The second signature. Stats, practice cards and insight cards fly in rotated and settle.

```
from: { rotate: ±4–7deg (alternating), y: 120, opacity: 0, scale: 0.92 }
to:   { rotate: 0, y: 0, opacity: 1, scale: 1 }
duration: 1.0, ease: 'power3.out', stagger: 0.12
```

Two details make it read as paper rather than as a generic card:

**The crease.** A 1px horizontal rule at 50% height, `--color-fog`, inset 8% from each side. Subtle. It's what makes the eye read "folded document."

**The cut corner.** `clip-path: polygon(0 0, calc(100% - 22px) 0, 100% 22px, 100% 100%, 0 100%)` — clips the top-right. Vary the corner per card group so it doesn't look mechanical.

Randomise the initial rotation from a **seeded** array, not `Math.random()` — it must be stable across re-renders and between server and client or you'll get hydration mismatches.

### 3.3 Portraits scale up

Lawyer stills start as small cards and grow as you scroll.

```
scale: 0.35 → 1, y: 60 → 0
scrub: true, over the portrait's own scroll range
```

Name plate fades in at 60% progress. Use stills, not video — same effect, a fraction of the weight.

### 3.4 Photos drifting past cycling text

The best moment on the reference. In the team section, phrases cycle while tilted snapshots sail diagonally across.

Phrases: pinned container, each line fading and translating up as scroll advances, one at a time.

Photos: 5 or 6 images, each rotated 6–14°, positioned across the width, each with a **different** scrubbed `x` and `y` velocity so they separate as you scroll. Vary the speeds meaningfully — 0.3x to 1.4x of scroll. If they all move together it looks like a single layer sliding, which kills it.

### 3.5 Recognition focus list

Scroll-driven. Every row is rendered; one is `--color-ink` at full opacity, the rest are `--color-fog`. Focus advances as you scroll. The year sits left with a `+` marker and updates with the active row.

Implement as a pinned section with `snapTo` **disabled** — the highlight moves continuously with scroll, it does not snap. Snapping here is the difference between elegant and infuriating.

Compute the active index from scroll progress: `Math.floor(progress * rows.length)`, clamped. Transition each row's colour over 0.3s so the handoff is soft.

### 3.6 Hard field flips

ink → paper → brass → ink → paper → brass. No gradients between sections, no gaps, no rounded section corners. The abruptness is the rhythm.

### 3.7 Numbered overlay menu

Full-screen ink panel. Items `01`–`05`, number in `--color-brass` and small, label large. Panel wipes in from the right via `clip-path: inset(0 0 0 100%)` → `inset(0)`, 0.6s, `power3.inOut`. Items stagger in at 0.06s. Escape closes it, focus traps inside it while open, focus returns to the trigger on close.

**Lenis:** `{ lerp: 0.085, smoothWheel: true }`. Drive from `gsap.ticker`, `ScrollTrigger.update()` on its scroll event, `ScrollTrigger.refresh()` after fonts load.

---

## 4. Discipline

**No preloader.** Ario has one. Cut it. Someone landing here may be in the worst week of their working life and there's a real chance they're near a filing deadline. A loading animation is the wrong first impression and, in this category, a slightly cruel one.

**The phone number never animates.** Header, footer and the deadline section — all render at final state immediately.

**The qualifier section stays quiet.** Sections 04 and 05 get a plain fade-up and nothing else. They're the sections someone is actually reading to work out whether they have a case. Motion there is noise.

The ambitious mechanics live in the hero, team, recognition and insights — the browsing parts.

---

## 7. Images

Fewer than the venue build but harder to get right.

**What you need:** 4 partner portraits · 10–14 team thumbnails for the scatter · 5–6 drifting photos for the team section · 4 photographic panels for the practice cards · 1 footer background.

**The register.** Ario's photography is black and white, grainy, documentary — closer to reportage than corporate headshots. Copy that. It's what stops a law firm site looking like a stock-photo brochure, and it's forgiving of imperfect source material.

**Partner portraits** should be shot-style consistent: same background, same lighting, waist up, no crossed arms, no gavels, no bookshelves of unread statute books.

**The drifting team photos** should look like real office snapshots — people mid-conversation, a whiteboard, someone laughing at a desk. Candid beats posed by a wide margin, and these are small and moving so quality matters less than feel.

**Practice panels:** abstract and architectural rather than literal. A stairwell, a facade, a corridor. Do not illustrate "discrimination" with a picture of a sad person at a desk.

**Grade to black and white in one pass**, with grain, slightly lifted blacks. Do it before you build.

---

## 8. Before you record

- [ ] ATTORNEY ADVERTISING visible in header and footer
- [ ] Prior-results disclaimer sits BEFORE the first figure, not at page bottom
- [ ] No preloader exists in the codebase
- [ ] Phone number rendered and tappable immediately, never animated
- [ ] Qualifier and deadlines sections have fade-up only
- [ ] Marquee letters exceed viewport so one fills the screen
- [ ] Card rotations are seeded — no hydration mismatch in console
- [ ] Recognition list moves continuously, never snaps
- [ ] Overlay menu traps focus and closes on Escape
- [ ] Ink-on-brass contrast verified at 4.5:1
- [ ] Site usable with JS disabled
- [ ] All phone numbers 555-01XX
- [ ] Name checked against real NY firms
- [ ] Caption says concept build, not a real client
