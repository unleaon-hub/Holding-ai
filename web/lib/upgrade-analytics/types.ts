export type UpgradeAnalyticsEventType =
  | "upgrade_view"
  | "upgrade_cta_click"
  | "upgrade_intent_confirmed";

export type UpgradeAnalyticsEvent = {
  id: string;
  type: UpgradeAnalyticsEventType;
  projectSlug: string;
  createdAt: string;
};

export type UpgradeAnalyticsStateV1 = {
  version: 1;
  events: UpgradeAnalyticsEvent[];
};

export type UpgradeAnalyticsStats = {
  upgrade_view: number;
  upgrade_cta_click: number;
  upgrade_intent_confirmed: number;
};
