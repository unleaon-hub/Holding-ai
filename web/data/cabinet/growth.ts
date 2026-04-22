/**
 * Заменить: GET /api/billing/plans, /api/subscription
 */
export const growthContext = {
  currentPackage: {
    name: "SOLO",
    tagline: "Старт для одного проекта и демо-пайплайна",
  },
  limitations: [
    "ограниченный охват по кластерам: до ~40 страниц в зоне полного контроля",
    "часть витков поиска ещё не разложена в отдельные посадочные",
    "рост сдерживается, когда в нише плотная конкуренция при базовом пакете",
  ],
} as const;

export type GrowthPlan = {
  id: "growth" | "scale";
  name: string;
  oneLiner: string;
  differentiator: string;
  coverage: string;
  cta: string;
  href: string;
};

export const growthPlans: GrowthPlan[] = [
  {
    id: "growth",
    name: "Growth",
    oneLiner: "Сильнее охват за счёт кластерных страниц и публичного контура",
    differentiator: "масштабирование посадок под новые витки, без смены домена",
    coverage: "до 120+ страниц в итерациях, приоритизация слабых сегментов",
    cta: "Подключить Growth",
    href: "/cabinet/payment",
  },
  {
    id: "scale",
    name: "Scale",
    oneLiner: "Сочетает покрытие, скорость выпуска и сопровождение роста",
    differentiator: "регулярные прогонки конкурентов и A/B-наслоения",
    coverage: "сотни страниц и расширение в смежные города и темы",
    cta: "Перейти на Scale",
    href: "/cabinet/payment",
  },
];

export const growthForecast = {
  disclaimer:
    "Прогноз не гарантирует результат — сценарий, если закрываются слабые сегменты",
  items: [
    { label: "Точки входа", before: "42", after: "100+" },
    { label: "Органика", before: "модератно", after: "расширенный контур" },
    { label: "Лиды / нед", before: "38", after: "75+ при полном плане" },
  ],
} as const;
