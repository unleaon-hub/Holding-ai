/**
 * Статичные подписи кабинета: демо-источник, будущие API, подсказки.
 * Вынесено из JSX, чтобы не дублировать.
 */

export const cabinetApi = {
  leads: "GET /api/leads",
  pages: "GET /api/pages/performance",
  growth: "оформление пакетов и оплата",
  billing: "GET /api/billing; интеграция оплаты",
  billingRenew: "POST /api/billing/renew",
  projectSettings: "PUT /api/projects/settings",
} as const;

export const cabinetPageIntros = {
  growth: `Апселл внутри кабинета. Данные пакетов — демо, затем ${cabinetApi.growth} и API.`,
  pages: `Лиды, CTR и статусы. Демо, затем ${cabinetApi.pages}.`,
  payment: `Тариф, продления и история. Демо, затем ${cabinetApi.billing}.`,
  settings: "Данные и уведомления. Сохранение — через API.",
} as const;

export function buildLeadsHeadlineLine(statusChain: string): {
  line: string;
  apiRef: string;
} {
  return {
    line: `Статусы: ${statusChain}.`,
    apiRef: `Данные — демо, до ${cabinetApi.leads}.`,
  };
}

export const funnelCopy = (total: number) =>
  `Всего в воронке: ${total}. Демо, до ${cabinetApi.leads}.`;

export const subscriptionProgressLine = (percent: number) =>
  `Период: ${percent}% (демо)`;

export const settingsFormHints = {
  save: `Сохранение: ${cabinetApi.projectSettings}`,
  dangerFreeze: "Публичные страницы останутся, автоматизация остановится (только UI).",
  dangerDelete: "Данные будут запланированы к удалению (только UI).",
} as const;
