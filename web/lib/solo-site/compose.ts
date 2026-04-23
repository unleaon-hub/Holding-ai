import type { EditableContent } from "@/lib/site-session/types";
import type { PresetId } from "./presets";
import { buildSoloBodyBlocks } from "./body-variants";
import {
  buildHeroEditableContent,
  buildNeutralHeroEditable,
  getMixKeyForNeutral,
  getMixKeyForSolo,
} from "./hero-variants";

/**
 * Сборка `EditableContent` (опционально `soloBlocks`). Hero — `hero-variants`;
 * тело лендинга (порядок секций `layoutId` + `sections`, тексты блоков) — `body-variants`.
 */
export function composeSoloContent(args: {
  niche: string;
  city: string;
  useNeutral: boolean;
  presetId: PresetId;
}): EditableContent {
  if (args.useNeutral) {
    const { mixKey } = getMixKeyForNeutral(args.niche, args.city);
    return {
      ...buildNeutralHeroEditable(args.niche, args.city),
      soloBlocks: buildSoloBodyBlocks({
        city: args.city,
        mixKey,
        bodyPreset: "default",
      }),
    };
  }
  const { mixKey } = getMixKeyForSolo(args.niche, args.city, args.presetId);
  return {
    ...buildHeroEditableContent({
      niche: args.niche,
      city: args.city,
      presetId: args.presetId,
    }),
    soloBlocks: buildSoloBodyBlocks({
      city: args.city,
      mixKey,
      bodyPreset: args.presetId,
    }),
  };
}
