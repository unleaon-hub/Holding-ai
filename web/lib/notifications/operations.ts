import { persistNotifications, readNotificationsState, subscribeNotificationsChanged } from "./store";
import type { Notification, PushNotificationInput } from "./types";

const MAX_NOTIFICATIONS = 20;

function newId(): string {
  if (typeof globalThis !== "undefined" && "crypto" in globalThis && "randomUUID" in globalThis.crypto) {
    return globalThis.crypto.randomUUID();
  }
  return `notification-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function getNotifications(): Notification[] {
  return readNotificationsState().notifications;
}

export function pushNotification(input: PushNotificationInput): Notification {
  const notification: Notification = {
    id: newId(),
    type: input.type,
    title: input.title.trim() || "Уведомление",
    message: input.message.trim(),
    createdAt: new Date().toISOString(),
    read: false,
    projectSlug: input.projectSlug?.trim() || undefined,
  };

  const current = getNotifications();
  const next = [notification, ...current].slice(0, MAX_NOTIFICATIONS);
  persistNotifications(next);

  return notification;
}

export function markAsRead(id: string): void {
  const current = getNotifications();
  const idx = current.findIndex((n) => n.id === id);
  if (idx < 0) {
    return;
  }
  if (current[idx]?.read) {
    return;
  }
  const next = [...current];
  const target = next[idx];
  if (!target) {
    return;
  }
  next[idx] = { ...target, read: true };
  persistNotifications(next);
}

export function clearNotifications(): void {
  persistNotifications([]);
}

export function subscribeNotifications(cb: () => void): () => void {
  return subscribeNotificationsChanged(cb);
}
