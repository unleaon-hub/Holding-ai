/** Детерминированный hash для rule-based вариаций (без Math.random). */
export function seedHash(seed: string): number {
  let h = 5381;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 33) ^ seed.charCodeAt(i);
  }
  return Math.abs(h) >>> 0;
}

export function pickIndex(seed: string, mod: number): number {
  if (mod <= 0) {
    return 0;
  }
  return seedHash(seed) % mod;
}

/** Детерминированное Fisher–Yates по строке-ключу. */
export function deterministicallyShuffled<T>(items: readonly T[], mixKey: string, salt: string): T[] {
  const out: T[] = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = pickIndex(`${mixKey}|sh|${salt}|${i}`, i + 1);
    const t = out[i]!;
    out[i] = out[j]!;
    out[j] = t;
  }
  return out;
}

/** Первые `count` уникальных строк после дет. перемешивания. */
export function takeFromShuffledPool(
  mixKey: string,
  salt: string,
  pool: readonly string[],
  count: number,
): string[] {
  if (count <= 0) {
    return [];
  }
  const sh = deterministicallyShuffled(pool, mixKey, salt);
  return sh.slice(0, Math.min(count, sh.length));
}
