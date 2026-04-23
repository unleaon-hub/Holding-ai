import type {
  UpgradeAnalyticsEvent,
  UpgradeAnalyticsEventType,
  UpgradeAnalyticsStateV1,
  UpgradeAnalyticsStats,
} from "./types";

const STORAGE_KEY = "holding:upgrade_analytics_v1";
const SESSION_VIEW_KEY_PREFIX = "holding:upgrade_view_session:";
const CHANGED_EVENT = "holding-upgrade-analytics";

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function newId(): string {
  if (typeof globalThis !== "undefined" && "crypto" in globalThis && "randomUUID" in globalThis.crypto) {
    return globalThis.crypto.randomUUID();
  }
  return `ua-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function isValidEventType(t: unknown): t is UpgradeAnalyticsEventType {
  return (
    t === "upgrade_view" || t === "upgrade_cta_click" || t === "upgrade_intent_confirmed"
  );
}

function isValidEvent(row: unknown): row is UpgradeAnalyticsEvent {
  if (!row || typeof row !== "object") {
    return false;
  }
  const e = row as Partial<UpgradeAnalyticsEvent>;
  return (
    typeof e.id === "string" &&
    isValidEventType(e.type) &&
    typeof e.projectSlug === "string" &&
    typeof e.createdAt === "string" &&
    Number.isFinite(Date.parse(e.createdAt))
  );
}

function readState(): UpgradeAnalyticsStateV1 {
  if (!isBrowser()) {
    return { version: 1, events: [] };
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { version: 1, events: [] };
    }
    const parsed = JSON.parse(raw) as Partial<UpgradeAnalyticsStateV1>;
    if (parsed.version !== 1 || !Array.isArray(parsed.events)) {
      return { version: 1, events: [] };
    }
    const events = parsed.events.filter(isValidEvent);
    return { version: 1, events };
  } catch {
    return { version: 1, events: [] };
  }
}

function writeState(next: UpgradeAnalyticsStateV1): void {
  if (!isBrowser()) {
    return;
  }
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // quota / private mode
  }
  window.dispatchEvent(new Event(CHANGED_EVENT));
}

export function trackUpgradeEvent(type: UpgradeAnalyticsEventType, projectSlug: string): void {
  const slug = projectSlug.trim();
  if (!slug) {
    return;
  }
  const event: UpgradeAnalyticsEvent = {
    id: newId(),
    type,
    projectSlug: slug,
    createdAt: new Date().toISOString(),
  };
  const current = readState();
  writeState({
    version: 1,
    events: [event, ...current.events],
  });
}

/**
 * Один upgrade_view за сессию вкладки на slug (sessionStorage), плюс защита от повторной записи при remount.
 */
export function trackUpgradeViewOncePerSession(projectSlug: string): void {
  const slug = projectSlug.trim();
  if (!slug || typeof window === "undefined" || typeof window.sessionStorage === "undefined") {
    return;
  }
  const key = `${SESSION_VIEW_KEY_PREFIX}${slug}`;
  try {
    if (window.sessionStorage.getItem(key) === "1") {
      return;
    }
    window.sessionStorage.setItem(key, "1");
  } catch {
    // sessionStorage blocked
  }
  trackUpgradeEvent("upgrade_view", slug);
}

export function getUpgradeEvents(): UpgradeAnalyticsEvent[] {
  return [...readState().events];
}

export function getUpgradeStats(): UpgradeAnalyticsStats {
  const events = readState().events;
  const stats: UpgradeAnalyticsStats = {
    upgrade_view: 0,
    upgrade_cta_click: 0,
    upgrade_intent_confirmed: 0,
  };
  for (const e of events) {
    if (e.type === "upgrade_view") {
      stats.upgrade_view += 1;
    } else if (e.type === "upgrade_cta_click") {
      stats.upgrade_cta_click += 1;
    } else if (e.type === "upgrade_intent_confirmed") {
      stats.upgrade_intent_confirmed += 1;
    }
  }
  return stats;
}

export function subscribeUpgradeAnalyticsChanged(cb: () => void): () => void {
  if (!isBrowser()) {
    return () => undefined;
  }
  const handler = () => {
    cb();
  };
  window.addEventListener("storage", handler);
  window.addEventListener(CHANGED_EVENT, handler as EventListener);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener(CHANGED_EVENT, handler as EventListener);
  };
}
