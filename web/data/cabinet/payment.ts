export type PaymentHistoryRow = {
  id: string;
  date: string;
  amount: string;
  status: "paid" | "pending" | "failed";
};

/** Заменить: GET /api/billing/invoice, /api/billing/history */
export const currentSubscription = {
  plan: "SOLO",
  priceMonthly: "9 900 ₽ / мес",
  priceYearlyHint: "при годовом списании — 2 месяца в подарок",
  statusLabel: "подписка активна",
  daysLeft: 5,
  nextChargeDate: "27.04.2026",
  nextAmount: "9 900 ₽",
  progressPercent: 64,
} as const;

export const paymentHistory: PaymentHistoryRow[] = [
  { id: "p-1", date: "27.03.2026", amount: "9 900 ₽", status: "paid" },
  { id: "p-2", date: "27.02.2026", amount: "9 900 ₽", status: "paid" },
  { id: "p-3", date: "27.01.2026", amount: "9 900 ₽", status: "paid" },
  { id: "p-4", date: "27.12.2025", amount: "9 900 ₽", status: "failed" },
];

export const paymentActions = [
  { id: "month" as const, label: "Продлить на месяц" },
  { id: "year" as const, label: "Продлить на год" },
  { id: "change" as const, label: "Сменить тариф" },
] as const;

type PaymentStatus = PaymentHistoryRow["status"];

export const paymentHistoryStatusPresentation: Record<
  PaymentStatus,
  { label: string; badgeClassName: string }
> = {
  paid: {
    label: "Оплачено",
    badgeClassName: "border-emerald-500/20 text-emerald-200",
  },
  pending: {
    label: "В обработке",
    badgeClassName: "border-amber-500/20 text-amber-200",
  },
  failed: {
    label: "Ошибка",
    badgeClassName: "border-rose-500/20 text-rose-200",
  },
};
