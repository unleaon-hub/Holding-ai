import { buildDefaultContent } from "@/lib/site-session/default-content";
import { composeSoloContent } from "./compose";
import { selectPresetId } from "./presets";
import { applySafety } from "./safety";
import type { SoloFormInput, SoloResolvedFields } from "./types";

/**
 * Включение rule-based SOLO-генератора. Отключить = прежняя `buildDefaultContent` (детерм., без пресетов).
 * .env: NEXT_PUBLIC_SOLO_SITE_GENERATOR=true
 */
export const SOLO_SITE_GENERATOR_ENABLED: boolean =
  process.env.NEXT_PUBLIC_SOLO_SITE_GENERATOR === "1" ||
  process.env.NEXT_PUBLIC_SOLO_SITE_GENERATOR === "true";

/**
 * Каноничный путь: одна функция, совместимая с `createProjectFromForm` — возвращает niche, city, content.
 */
export function resolveSoloFormToProjectFields(
  input: SoloFormInput,
): SoloResolvedFields {
  if (!SOLO_SITE_GENERATOR_ENABLED) {
    const niche = input.niche.trim() || "Ниша";
    const city = input.city.trim() || "Город";
    return {
      niche,
      city,
      contact: input.contact.trim(),
      content: buildDefaultContent(niche, city),
    };
  }

  const s = applySafety(input);
  const pid = selectPresetId(s.niche, s.useNeutral);
  return {
    niche: s.niche,
    city: s.city,
    contact: s.contact,
    content: composeSoloContent({
      niche: s.niche,
      city: s.city,
      useNeutral: s.useNeutral,
      presetId: pid,
    }),
  };
}

export type { SoloFormInput, SoloResolvedFields } from "./types";
export { applySafety } from "./safety";
export { selectPresetId, PRESET_IDS, type PresetId } from "./presets";
export { composeSoloContent } from "./compose";
export { buildSoloBodyBlocks, getLegacyFallbackSoloBodyBlocks } from "./body-variants";
