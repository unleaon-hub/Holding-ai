export type LandingPackage = {
  slug: string;
  name: string;
  priceFrom: string;
  delivery: string;
  bestFor: string;
  headline: string;
  subheadline: string;
  painPoints: string[];
  outcomes: string[];
  socialProof: {
    metric: string;
    description: string;
  }[];
  scarcityNote: string;
  seoKeywords: string[];
};

export const landingPackages: LandingPackage[] = [
  {
    slug: "starter-seo",
    name: "Starter SEO",
    priceFrom: "от 59 000 ₽",
    delivery: "3 рабочих дня",
    bestFor: "Локальные услуги и быстрый запуск рекламы",
    headline: "Один сильный лендинг для быстрой проверки спроса",
    subheadline:
      "Собираем страницу под один оффер и один сегмент: фокус на конверсии, доверии и техничном SEO-базисе.",
    painPoints: [
      "Реклама уже идет, но заявок мало и CPL растет.",
      "На странице нет понятной структуры оффера и блока доверия.",
      "Нельзя понять, какие CTA реально приносят лиды.",
    ],
    outcomes: [
      "Лендинг с логикой Problem-Solution-Profit под горячий интент.",
      "События аналитики для GA и Amplitude подключены из коробки.",
      "SEO-основа: metadata, OpenGraph, robots, sitemap, JSON-LD.",
    ],
    socialProof: [
      {
        metric: "2.1x",
        description:
          "Медианный рост конверсии в лид после замены шаблонных страниц.",
      },
      {
        metric: "35%",
        description: "Среднее снижение CPL после выравнивания оффера и смысла.",
      },
    ],
    scarcityNote:
      "Каждую неделю берем только 4 запуска, чтобы держать качество и скорость.",
    seoKeywords: [
      "seo лендинг",
      "лендинг под рекламу",
      "конверсионная страница услуги",
    ],
  },
  {
    slug: "growth-cluster",
    name: "Growth Cluster",
    priceFrom: "от 149 000 ₽",
    delivery: "7 рабочих дней",
    bestFor: "Команды, которые масштабируют несколько каналов",
    headline: "Кластер лендингов под разные интенты и пакеты трафика",
    subheadline:
      "Пакет из нескольких страниц с единой дизайн-системой, общей схемой аналитики и масштабируемой SEO-структурой.",
    painPoints: [
      "Одна страница пытается закрыть все сегменты и проигрывает в релевантности.",
      "Нет пакетной структуры под разный чек и уровень сервиса.",
      "Каждый новый лендинг делается с нуля и тормозит запуск кампаний.",
    ],
    outcomes: [
      "3-5 страниц под отдельные кластеры спроса и тарифные уровни.",
      "Переиспользуемые блоки и премиальные интеракции без потери консистентности.",
      "Единая таксономия событий для точной атрибуции по каналам.",
    ],
    socialProof: [
      {
        metric: "58%",
        description: "Рост доли квалифицированных лидов после разделения интентов.",
      },
      {
        metric: "4.3x",
        description:
          "Ускорение темпа запуска посадочных страниц по сравнению с ad-hoc сборкой.",
      },
    ],
    scarcityNote:
      "Набор в пакет Growth закрывается за 48 часов до старта спринта.",
    seoKeywords: [
      "пакеты лендингов",
      "кластер seo страниц",
      "система конверсионных страниц",
    ],
  },
  {
    slug: "investor-overdrive",
    name: "Investor Overdrive",
    priceFrom: "от 290 000 ₽",
    delivery: "14 рабочих дней",
    bestFor: "Портфельный rollout с жестким QA и глубокой аналитикой",
    headline: "Лендинг-машина, которая выпускает страницы как бизнес-актив",
    subheadline:
      "Полная операционная модель для пакетных SEO-лендингов: релизная дисциплина, архитектура трекинга и управленческая отчетность.",
    painPoints: [
      "Нет предсказуемого процесса релизов по нескольким нишам.",
      "Визуальное качество лендингов неравномерно от проекта к проекту.",
      "Нет executive-отчетности, привязанной к конверсионным результатам.",
    ],
    outcomes: [
      "Production-ready шаблонная система для серийных запусков пакетов.",
      "Премиальный dark-first интерфейс с безопасными motion-паттернами.",
      "Executive Summary отчеты с акцентом на влияние на выручку и CPL.",
    ],
    socialProof: [
      {
        metric: "90+",
        description: "Целевой Lighthouse 90+ зашит в релизный чеклист.",
      },
      {
        metric: "3x",
        description: "Ускорение rollout кампаний после стандартизации шаблонов.",
      },
    ],
    scarcityNote:
      "Investor Overdrive открывает только 2 слота в месяц по архитектурной емкости.",
    seoKeywords: [
      "фабрика лендингов",
      "seo движок пакетов",
      "инвесторский режим сайта",
    ],
  },
];

export const packageSlugs = landingPackages.map((item) => item.slug);

export function getLandingPackage(slug: string): LandingPackage | undefined {
  return landingPackages.find((item) => item.slug === slug);
}
