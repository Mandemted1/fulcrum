# Fulcrum — build rules

## Content
All copy from /content/copy.md. Never invent or paraphrase — this is legal
content and the wording is deliberate. If a section needs text that isn't
there, stop and ask.

## Compliance — do not alter these
"ATTORNEY ADVERTISING" appears in the header utility bar and the footer.
"Prior results do not guarantee a similar outcome" appears immediately
BEFORE any figure in the results section, not at the bottom of the page.
Never use the word "specialist". Never phrase anything as a guarantee
of outcome.

## Design
Tokens in globals.css @theme. Never hardcode a hex.
Space Grotesk (500/700) display only. Inter (400/500) for all body and UI.
Three fields: ink, paper, brass. Sections butt with no gaps.

## Motion
Seven mechanics from the build brief. Nothing else.
Marquee words translate on scrub — never pinned.
Card rotations come from a SEEDED array, never Math.random().
Recognition list never snaps.
Section 05 (deadlines) gets a plain fade-up only.
Phone numbers and the header render at final state, never animated.

## Never
- No preloader of any kind
- No scroll snapping or hijacking
- No localStorage or sessionStorage
- No gradients except the brass CTA and footer panels

## Custom cursor
Overrides the earlier "no custom cursor" rule — approved for this project.
A brass, clip-corner dot (echoes the PaperCard cut-corner motif) that lerps
toward the real pointer position rather than snapping to it, and scales up
over interactive elements. Fine-pointer devices only: detect via
`matchMedia("(pointer: fine)")` and leave the native cursor alone otherwise
(touch, trackpad-as-touch, reduced motion). Never hides the native cursor
until the custom one has actually rendered a frame, so there's no dead gap
before JS runs.

## Quality floor
Fully usable with JavaScript disabled.
Mobile first from 375px. Visible focus rings. Overlay menu traps focus,
closes on Escape, returns focus to its trigger.
Contrast: check ink on brass — it is the riskiest pair on the site.
Run `npm run build` and fix all errors before calling a task done.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
