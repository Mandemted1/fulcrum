// Shared bridge between the persistent root-layout overlay (which survives
// route changes) and whichever page wants to trigger a covered navigation.
let coverFn: (() => Promise<void>) | null = null;
let revealFn: (() => void) | null = null;
let isCovered = false;

export function registerTransition(
  cover: () => Promise<void>,
  reveal: () => void
) {
  coverFn = cover;
  revealFn = reveal;
}

export async function coverScreen() {
  if (!coverFn) return;
  await coverFn();
  isCovered = true;
}

// Only animates if a cover() actually happened first — otherwise a direct
// visit to a page that calls this on mount (e.g. a fresh load of /team,
// not arrived at via the animated link) would play a pointless reveal
// sweep over content that was never hidden.
export function revealScreen() {
  if (isCovered && revealFn) {
    revealFn();
    isCovered = false;
  }
}
