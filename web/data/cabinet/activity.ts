import type { LiveActivityType } from "./types";

export type LiveActivityItem = {
  id: string;
  type: LiveActivityType;
  timeLabel: string;
  title: string;
  description: string;
  highlight?: string;
};

/** Заменить: GET /api/activity/feed?limit=12 */
export const liveActivityFeed: LiveActivityItem[] = [
  {
    id: "a-1",
    type: "new_lead",
    timeLabel: "1 мин",
    title: "Новая заявка",
    description: "С формы на странице «Юридическое сопровождение ТОО — Алматы»",
    highlight: "ТОО KZ Logistics",
  },
  {
    id: "a-2",
    type: "page_update",
    timeLabel: "8 мин",
    title: "Страница обновлена",
    description: "Агент вынес блок сроков в первый экран, конверсия +6%",
  },
  {
    id: "a-3",
    type: "query_found",
    timeLabel: "19 мин",
    title: "Новый кластер запросов",
    description: "«юрист по визовым вопросам срочно» — 320 показов/нед, покрытие 12%",
  },
  {
    id: "a-4",
    type: "agent_done",
    timeLabel: "32 мин",
    title: "Агент завершил анализ",
    description: "Синхронизирована структура офферов с топ-2 конкурентами",
  },
  {
    id: "a-5",
    type: "offer_update",
    timeLabel: "46 мин",
    title: "Обновлён оффер",
    description: "На странице «Договоры M&A» добавлена социальная верификация",
  },
  {
    id: "a-6",
    type: "new_lead",
    timeLabel: "1 ч",
    title: "Новая заявка",
    description: "С мобильной версии страницы «Судебные споры»",
    highlight: "ИП Seisenbay",
  },
];
