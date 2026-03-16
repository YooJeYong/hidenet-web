export function randomize(base: number): number {
  return Math.min(99, Math.max(5, base + Math.floor(Math.random() * 10 - 5)));
}
