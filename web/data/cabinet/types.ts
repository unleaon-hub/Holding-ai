export type BusinessGrowthStatus = "accelerated" | "stable" | "limited";

/** 5 этапов воронки (отображаемые подписи — в `leadStatusLabel`). */
export type LeadStatus =
  | "new"
  | "contacted"
  | "negotiation"
  | "deal"
  | "closed";

export type KpiKey = "leads" | "visitors" | "cpl" | "growth";

export type KpiTimeframe = "today" | "week";

export type KpiValue = {
  value: string;
  label: string;
  deltaLabel: string;
  deltaUp: boolean;
  timeframe: KpiTimeframe;
  hint?: string;
};

export type LiveActivityType =
  | "new_lead"
  | "page_update"
  | "query_found"
  | "agent_done"
  | "offer_update";

export type PageRowStatus = "excellent" | "growing" | "agent_working";

export type ProjectSettings = {
  projectName: string;
  niche: string;
  city: string;
  emailNotify: string;
  telegramUser: string;
};
