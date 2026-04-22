import type { EditableContent } from "@/lib/site-session/types";

/**
 * Вход из /start. Поля маппятся на `EditableContent` (опционально `soloBlocks` у SOLO-генератора).
 * TODO: при API — DTO = этот shape.
 */
export type SoloFormInput = {
  niche: string;
  city: string;
  contact: string;
};

/**
 * Нормализованный результат подстановки (детерминировано от входа + safety + preset).
 */
export type SoloResolvedFields = {
  niche: string;
  city: string;
  contact: string;
  content: EditableContent;
};

export type { EditableContent };
