"use client";

import { X } from "lucide-react";
import type { Notification } from "@/lib/notifications";
import { cn } from "@/lib/utils";

type ToastItemProps = {
  notification: Notification;
  onClose: (id: string) => void;
  className?: string;
};

function getTypeLabel(type: Notification["type"]): string {
  if (type === "new_lead") {
    return "НОВАЯ ЗАЯВКА";
  }
  return "ИНФО";
}

export function ToastItem({ notification, onClose, className }: ToastItemProps) {
  return (
    <div
      className={cn(
        "pointer-events-auto w-full max-w-sm rounded-xl border border-white/12 bg-[#1a1a1a]/95 px-4 py-3 text-sm text-zinc-200 shadow-lg backdrop-blur-md",
        className,
      )}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-medium tracking-[0.12em] text-zinc-500">{getTypeLabel(notification.type)}</p>
          <p className="mt-1 text-sm font-medium text-zinc-100">{notification.title}</p>
          <p className="mt-1 text-sm text-zinc-300">{notification.message}</p>
        </div>
        <button
          type="button"
          onClick={() => onClose(notification.id)}
          className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-white/10 text-zinc-400 transition hover:border-white/20 hover:text-zinc-200"
          aria-label="Закрыть уведомление"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
