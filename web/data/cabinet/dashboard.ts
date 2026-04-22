import type { BusinessGrowthStatus, KpiKey, KpiValue } from "./types";

export const dashboardHeadline = {
  title: "Ваш бизнес сейчас",
  subtitle:
    "Добро пожаловать в систему. Здесь видно, как AI приводит заявки и что стоит усилить.",
};

export const businessStatus: {
  state: BusinessGrowthStatus;
  label: string;
  description: string;
} = {
  state: "limited",
  label: "Рост ограничен",
  description:
    "Часть поисковых запросов в нише ещё не покрыта страницами. Система стабильно приводит контакты, но потолок по охвату не исчерпан.",
};

const kpiBase: Record<KpiKey, KpiValue> = {
  leads: {
    value: "38",
    label: "Лиды",
    deltaLabel: "нед.",
    deltaUp: true,
    timeframe: "week",
    hint: "Новых за 7 дней",
  },
  visitors: {
    value: "2 430",
    label: "Посетители",
    deltaLabel: "12%",
    deltaUp: true,
    timeframe: "week",
    hint: "Уникальные визиты",
  },
  cpl: {
    value: "718 ₽",
    label: "Стоимость лида",
    deltaLabel: "3%",
    deltaUp: true,
    timeframe: "week",
    hint: "Среднее за период",
  },
  growth: {
    value: "+19%",
    label: "Рост",
    deltaLabel: "нед. к прошлой",
    deltaUp: true,
    timeframe: "week",
    hint: "Конверсия в заявку",
  },
};

export const dashboardKpis: { key: KpiKey; today: KpiValue; week: KpiValue }[] = [
  {
    key: "leads",
    today: { ...kpiBase.leads, value: "6", timeframe: "today", hint: "Сегодня" },
    week: { ...kpiBase.leads },
  },
  {
    key: "visitors",
    today: {
      ...kpiBase.visitors,
      value: "214",
      deltaLabel: "4%",
      deltaUp: true,
      timeframe: "today",
    },
    week: { ...kpiBase.visitors },
  },
  {
    key: "cpl",
    today: { ...kpiBase.cpl, value: "712 ₽", deltaLabel: "0%", deltaUp: true, timeframe: "today" },
    week: { ...kpiBase.cpl },
  },
  {
    key: "growth",
    today: { ...kpiBase.growth, value: "+2%", deltaLabel: "нед.", deltaUp: true, timeframe: "today" },
    week: { ...kpiBase.growth },
  },
];

/**
 * Блок дашборда «потенциал клиентов».
 * TODO: GET /api/dashboard/potential-clients
 */
export const potentialClientsInsight = {
  title: "Вы могли получить больше клиентов",
  /** Строки аналитического блока (мок) */
  lines: [
    "Сегодня вы могли получить +6 заявок",
    "Часть запросов не охвачена",
    "Недостаточно страниц для роста",
  ],
  cta: "Увеличить поток заявок",
  ctaHref: "/cabinet/growth" as const,
};

/** Мини-блок «система за вас» на дашборде. TODO: API */
export const systemWorkingForYou = {
  title: "Система работает за вас",
  items: [
    "найдены новые запросы",
    "улучшены страницы",
    "повышена конверсия",
  ],
} as const;

export const missedOpportunity = {
  extraLeadsEstimate: 12,
  reason:
    "в нише остаётся 40% запросов вне оптимизированных кластеров; для них ещё нет посадочных",
  cta: "Увеличить поток",
  ctaHref: "/cabinet/growth" as const,
  secondary:
    "Система может сгенерировать +18 страниц под сегменты «юрист / Алматы / срочно / цена».",
};

export const aiActionsToday: { title: string; result: string }[] = [
  {
    title: "Скан кластеров",
    result: "Найдено 6 новых запросов, под которые стоит добавить страницы",
  },
  {
    title: "Оптимизация слабых мест",
    result: "Усилен оффер на 3 страницах с падением вовлечения",
  },
  {
    title: "Стабилизация конверсии",
    result: "Средний CTR в блоке формы +4,2% после микротекста",
  },
  {
    title: "Сравнение с конкурентами",
    result: "Обновлены 4 акцента, по которым конкуренты перегоняли в выдаче",
  },
];

export const quickActions: { label: string; href: string; variant: "primary" | "secondary" }[] = [
  { label: "Открыть лиды", href: "/cabinet/leads", variant: "primary" },
  { label: "Посмотреть страницы", href: "/cabinet/pages", variant: "primary" },
  { label: "Перейти в Growth", href: "/cabinet/growth", variant: "secondary" },
  { label: "Оплата и подписка", href: "/cabinet/payment", variant: "secondary" },
  { label: "Настройки", href: "/cabinet/settings", variant: "secondary" },
];
