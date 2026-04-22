/**
 * Ключи пресетов (детерминированный выбор: первый матч в порядке перечня).
 * Без динамики и LLM.
 */
export const PRESET_IDS = [
  "legal",
  "medical",
  "repair",
  "beauty",
  "default",
] as const;

export type PresetId = (typeof PRESET_IDS)[number];

type KeywordRule = { id: PresetId; keys: string[] };

/** Порядок важен: первое совпадение wins */
const KEYWORD_RULES: KeywordRule[] = [
  { id: "legal", keys: ["юрист", "юрид", "адвок", "нотариус", "нотар", "право", "jurist"] },
  { id: "medical", keys: ["врач", "стомат", "клиник", "мед", "доктор", "больниц", "здоров"] },
  { id: "repair", keys: ["ремонт", "сантех", "электр", "строит", "отделк", "квартир"] },
  { id: "beauty", keys: ["салон", "красот", "космет", "массаж", "стрижк", "соляри"] },
];

export function selectPresetId(nicheForMatch: string, forceDefault: boolean): "default" | PresetId {
  if (forceDefault) {
    return "default";
  }
  const n = nicheForMatch.toLowerCase();
  for (const rule of KEYWORD_RULES) {
    for (const k of rule.keys) {
      if (n.includes(k)) {
        return rule.id;
      }
    }
  }
  return "default";
}
