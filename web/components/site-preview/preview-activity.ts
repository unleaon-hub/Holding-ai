/**
 * Демо-события на превью. TODO: WebSocket / аналитика
 */
export type PreviewActivityKind = "lead" | "pageview" | "interest";

export type PreviewActivityItem = {
  kind: PreviewActivityKind;
  /** Подпись в «шапке» тоста */
  label: string;
  text: string;
};

export const previewActivityRotation: PreviewActivityItem[] = [
  {
    kind: "lead",
    label: "Новая заявка",
    text: "Сколько стоит ремонт квартиры?",
  },
  {
    kind: "pageview",
    label: "Просмотр",
    text: "Посетитель смотрит страницу: Ремонт кухни",
  },
  {
    kind: "interest",
    label: "Интерес",
    text: "Пользователь изучает цены",
  },
  {
    kind: "lead",
    label: "Новая заявка",
    text: "Нужна консультация по смете на завтра",
  },
  {
    kind: "pageview",
    label: "Просмотр",
    text: "Переход в раздел: услуги",
  },
  {
    kind: "interest",
    label: "Интерес",
    text: "Сравнивает варианты пакетов",
  },
];

/** Показ тоста, мс */
export const PREVIEW_TOAST_VISIBLE_MS = 5000;
/** Пауза скрыт, мс (между циклами) */
export const PREVIEW_TOAST_HIDDEN_MS = 7000;
/** Первый показ через, мс */
export const PREVIEW_TOAST_FIRST_DELAY_MS = 3500;
