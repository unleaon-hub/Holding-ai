import type { SoloFormInput } from "./types";

/**
 * Стоп-темы: если фрагмент встречается в нормализованной строке — нейтральные подписи и default-пресет.
 * Минимальный список для MVP; расширение — через бэкенд-списки.
 * TODO: приёмы обхода (leetspeak) — вне scope MVP
 */
const STOP_SUBSTRINGS = [
  "оружи",
  "наркот",
  "порн",
  "секс-",
  "казин",
  "ставки",
  "extremi",
  "terro",
] as const;

const NEUTRAL_NICHE = "Профессиональные услуги";

function norm(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

/**
 * @returns useNeutral — принудительно нейтральные тексты (пресет default, без привязки к нише-риск)
 */
export function applySafety(
  input: SoloFormInput,
): {
  niche: string;
  city: string;
  contact: string;
  useNeutral: boolean;
} {
  const city = input.city.trim() || "Город";
  const rawNiche = input.niche.trim() || "Ниша";
  const contact = input.contact.trim();

  const bundle = norm(`${rawNiche} ${city} ${contact}`);
  for (const bad of STOP_SUBSTRINGS) {
    if (bundle.includes(bad)) {
      return {
        niche: NEUTRAL_NICHE,
        city,
        contact: contact ? "—" : contact,
        useNeutral: true,
      };
    }
  }

  return { niche: rawNiche, city, contact, useNeutral: false };
}
