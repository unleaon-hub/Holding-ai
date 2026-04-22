import type { LeadStatus } from "./types";

export const leadStatusOrder: LeadStatus[] = [
  "new",
  "contacted",
  "negotiation",
  "deal",
  "closed",
];

export const leadStatusLabel: Record<LeadStatus, string> = {
  new: "Новый",
  contacted: "Связались",
  negotiation: "Переговоры",
  deal: "Сделка",
  closed: "Закрыто",
};

/** Статические заголовки страницы лидов (см. `/cabinet/leads`) */
export const leadsPageHeader = {
  title: "Ваши заявки",
  subtitle: "Здесь появляются все клиенты с вашего сайта",
};

/** Счётчики по стадиям (заменить API). */
export const leadsFunnelSummary: Record<LeadStatus, number> = {
  new: 14,
  contacted: 9,
  negotiation: 5,
  deal: 3,
  closed: 18,
};

export type LeadRow = {
  id: string;
  name: string;
  phone: string;
  source: "SEO" | "Ads" | "Organic" | "Direct" | "Referral" | "Website";
  page: string;
  timeLabel: string;
  status: LeadStatus;
};

/** Заменить: GET /api/leads */
export const leadsMock: LeadRow[] = [
  {
    id: "L-1204",
    name: "Айдар Н.",
    phone: "+7 700 201‑44‑82",
    source: "SEO",
    page: "/konsalting-almaty",
    timeLabel: "12:04",
    status: "new",
  },
  {
    id: "L-1203",
    name: "TOO KZ Steel",
    phone: "+7 777 110‑00‑19",
    source: "Ads",
    page: "/dlya-ooo",
    timeLabel: "11:18",
    status: "contacted",
  },
  {
    id: "L-1192",
    name: "Dana T.",
    phone: "+7 701 002‑11‑00",
    source: "Organic",
    page: "/srochno-yurist",
    timeLabel: "09:41",
    status: "negotiation",
  },
  {
    id: "L-1180",
    name: "BauTech LLP",
    phone: "+7 700 500‑20‑00",
    source: "Direct",
    page: "/m-a-sdelki",
    timeLabel: "вчера",
    status: "deal",
  },
  {
    id: "L-1103",
    name: "Aima Group",
    phone: "+7 747 000‑00‑00",
    source: "Referral",
    page: "/trudovye-spory",
    timeLabel: "12 мар",
    status: "closed",
  },
  {
    id: "L-1205",
    name: "Ersultan K.",
    phone: "+7 700 300‑20‑20",
    source: "SEO",
    page: "/nalogoviy-yurist",
    timeLabel: "12:20",
    status: "new",
  },
  {
    id: "L-1201",
    name: "MediCare KZ",
    phone: "+7 705 000‑00‑00",
    source: "Ads",
    page: "/dlya-medicziny",
    timeLabel: "10:12",
    status: "new",
  },
  {
    id: "L-1190",
    name: "Ivan P.",
    phone: "+7 700 000‑00‑00",
    source: "SEO",
    page: "/kriminal",
    timeLabel: "08:55",
    status: "contacted",
  },
  {
    id: "L-1185",
    name: "Nur A.",
    phone: "+7 747 100‑00‑00",
    source: "Organic",
    page: "/konsalting-astana",
    timeLabel: "2 дн.",
    status: "negotiation",
  },
  {
    id: "L-1100",
    name: "Kcell Legal",
    phone: "+7 700 200‑00‑00",
    source: "Direct",
    page: "/b2b-legal",
    timeLabel: "10 мар",
    status: "closed",
  },
];

const funnelTotal = leadStatusOrder.reduce(
  (acc, k) => acc + leadsFunnelSummary[k],
  0,
);

const inWork = leadsFunnelSummary.contacted
  + leadsFunnelSummary.negotiation
  + leadsFunnelSummary.deal;

export const leadsPageSummary = {
  new: leadsFunnelSummary.new,
  inWork,
  closed: leadsFunnelSummary.closed,
  total: funnelTotal,
} as const;

/** Карточки сводки на странице «Лиды» */
export const leadsKpiItems = [
  { key: "new" as const, label: "Новые" },
  { key: "inWork" as const, label: "В работе" },
  { key: "closed" as const, label: "Закрыто" },
  { key: "total" as const, label: "Всего" },
] as const;

export const leadsListSection = {
  title: "Список лидов",
  layoutHint: "На мобиле — карточки, на десктопе — таблица.",
} as const;
