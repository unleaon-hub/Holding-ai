import type { PageRowStatus } from "./types";

export type PagePerformanceRow = {
  slug: string;
  path: string;
  leads: number;
  ctr: string;
  conv: string;
  status: PageRowStatus;
};

/** Заменить: GET /api/pages/performance */
export const pagesPerformance: PagePerformanceRow[] = [
  {
    slug: "Главный юр. пакет",
    path: "/b2b-legal",
    leads: 24,
    ctr: "2,8%",
    conv: "4,1%",
    status: "excellent",
  },
  {
    slug: "Срочно юрист",
    path: "/srochno-yurist",
    leads: 9,
    ctr: "1,4%",
    conv: "1,2%",
    status: "growing",
  },
  {
    slug: "Договоры M&A",
    path: "/m-a-sdelki",
    leads: 7,
    ctr: "0,9%",
    conv: "0,5%",
    status: "agent_working",
  },
  {
    slug: "Суд / апелляции",
    path: "/sud",
    leads: 4,
    ctr: "0,5%",
    conv: "0,2%",
    status: "growing",
  },
];

export const pageStatusLabel: Record<PageRowStatus, string> = {
  excellent: "Отлично",
  growing: "Растёт",
  agent_working: "Агент работает",
};

export const pagesPotentialBlock = {
  copy: "Дополнительные страницы = новые точки входа и кластеры, которые сейчас не закрываются полностью.",
  tiers: [
    { pages: 20, effect: "Умеренное расширение — новые витки внутри ниши" },
    { pages: 100, effect: "Сильное покрытие: регион, смежные запросы, длинные хвосты" },
  ],
  cta: "Подключить Growth",
  ctaHref: "/cabinet/growth" as const,
};

export const topPagesByLeads: { path: string; sharePercent: number }[] = [
  { path: "/b2b-legal", sharePercent: 40 },
  { path: "/srochno-yurist", sharePercent: 19 },
  { path: "/m-a-sdelki", sharePercent: 15 },
  { path: "/sud", sharePercent: 10 },
  { path: "Остальные", sharePercent: 16 },
];

export const weekLeadVolume = {
  thisWeek: 38,
  prevWeek: 32,
  label: "к прошлой неделе +19%",
};
