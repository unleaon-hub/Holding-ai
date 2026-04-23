import type { Notification, NotificationsStateV1 } from "./types";

const STORAGE_KEY = "holding:notifications_v1";
export const NOTIFICATIONS_CHANGED_EVENT = "holding-notifications-changed";

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function emptyState(): NotificationsStateV1 {
  return { version: 1, notifications: [] };
}

export function readNotificationsState(): NotificationsStateV1 {
  if (!isBrowser()) {
    return emptyState();
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return emptyState();
    }
    const data = JSON.parse(raw) as NotificationsStateV1;
    if (data?.version === 1 && Array.isArray(data.notifications)) {
      return { version: 1, notifications: data.notifications };
    }
  } catch {
    // ignore parse/storage errors
  }
  return emptyState();
}

function writeNotificationsState(next: NotificationsStateV1): void {
  if (!isBrowser()) {
    return;
  }
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore quota errors
  }
  window.dispatchEvent(new Event(NOTIFICATIONS_CHANGED_EVENT));
}

export function persistNotifications(notifications: Notification[]): void {
  writeNotificationsState({ version: 1, notifications });
}

export function subscribeNotificationsChanged(cb: () => void): () => void {
  if (!isBrowser()) {
    return () => undefined;
  }
  const h = () => {
    cb();
  };
  window.addEventListener("storage", h);
  window.addEventListener(NOTIFICATIONS_CHANGED_EVENT, h);
  return () => {
    window.removeEventListener("storage", h);
    window.removeEventListener(NOTIFICATIONS_CHANGED_EVENT, h);
  };
}
