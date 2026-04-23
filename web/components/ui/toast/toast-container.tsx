"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getNotifications, markAsRead, subscribeNotifications, type Notification } from "@/lib/notifications";
import { cn } from "@/lib/utils";
import { ToastItem } from "./toast-item";

const TOAST_DURATION_MS = 4000;
const MAX_VISIBLE_TOASTS = 3;

export function ToastContainer({ className }: { className?: string }) {
  const [activeToasts, setActiveToasts] = useState<Notification[]>([]);
  const seenIdsRef = useRef<Set<string>>(new Set());
  const timersRef = useRef<Map<string, number>>(new Map());

  const removeToast = useCallback((id: string) => {
    setActiveToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timersRef.current.get(id);
    if (typeof timer === "number") {
      window.clearTimeout(timer);
      timersRef.current.delete(id);
    }
    markAsRead(id);
  }, []);

  const scheduleDismiss = useCallback(
    (id: string) => {
      const existing = timersRef.current.get(id);
      if (typeof existing === "number") {
        window.clearTimeout(existing);
      }
      const timer = window.setTimeout(() => {
        removeToast(id);
      }, TOAST_DURATION_MS);
      timersRef.current.set(id, timer);
    },
    [removeToast],
  );

  useEffect(() => {
    const timers = timersRef.current;
    const initial = getNotifications();
    seenIdsRef.current = new Set(initial.map((n) => n.id));

    const syncToasts = () => {
      const all = getNotifications();
      const fresh = all.filter((n) => !seenIdsRef.current.has(n.id));
      if (fresh.length === 0) {
        return;
      }

      for (const n of fresh) {
        seenIdsRef.current.add(n.id);
        scheduleDismiss(n.id);
      }

      setActiveToasts((prev) => {
        const prevWithoutFresh = prev.filter((p) => !fresh.some((f) => f.id === p.id));
        return [...fresh, ...prevWithoutFresh].slice(0, MAX_VISIBLE_TOASTS);
      });
    };

    const unsubscribe = subscribeNotifications(syncToasts);
    return () => {
      unsubscribe();
      for (const timer of timers.values()) {
        window.clearTimeout(timer);
      }
      timers.clear();
    };
  }, [scheduleDismiss]);

  if (activeToasts.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "pointer-events-none fixed left-4 right-4 top-4 z-[110] flex flex-col items-end gap-2 md:left-auto md:right-6 md:top-6",
        className,
      )}
    >
      {activeToasts.map((notification) => (
        <ToastItem key={notification.id} notification={notification} onClose={removeToast} />
      ))}
    </div>
  );
}
