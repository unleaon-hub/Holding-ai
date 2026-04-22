/**
 * Моки биллинга и fallback подписи (если нет проекта в localStorage).
 * Название/ниша в шапке: из `useCabinetProject` + `lib/site-session`.
 * TODO: GET /api/projects/current, GET /api/billing
 */
export const cabinetProjectContext = {
  projectName: "Astana Legal Hub",
  planCode: "SOLO",
  planLabel: "SOLO",
  /** дней до следующего списания */
  daysUntilCharge: 5,
  /** дата следующего платежа ISO */
  nextChargeDate: "2026-04-27",
  subscriptionStatus: "active" as const,
};
