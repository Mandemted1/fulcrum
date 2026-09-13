// Deterministic tilt values for PaperCard entrances. A fixed lookup table,
// not Math.random() — the rotation must be identical on the server and the
// client render, or React throws a hydration mismatch.
const ROTATION_SEEDS = [4.2, 6.8, 5.1, 6.4, 4.7, 5.9, 6.6, 4.4, 5.6, 6.1, 4.9, 5.3];

export function getSeededRotation(index: number): number {
  const magnitude = ROTATION_SEEDS[index % ROTATION_SEEDS.length];
  const sign = index % 2 === 0 ? 1 : -1;
  return sign * magnitude;
}
