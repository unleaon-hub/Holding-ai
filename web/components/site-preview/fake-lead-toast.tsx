"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  type PreviewActivityItem,
  previewActivityRotation,
  PREVIEW_TOAST_FIRST_DELAY_MS,
  PREVIEW_TOAST_HIDDEN_MS,
  PREVIEW_TOAST_VISIBLE_MS,
} from "./preview-activity";

type FakeLeadToastProps = {
  className?: string;
  /** Опционально: свой набор событий (тесты) */
  events?: PreviewActivityItem[];
};

/**
 * Периодические демо-события (заявка / просмотр / интерес). TODO: вебсоки / пуш
 */
export function FakeLeadToast({ className, events = previewActivityRotation }: FakeLeadToastProps) {
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const ids: number[] = [];
    const t = (ms: number, fn: () => void) => {
      ids.push(window.setTimeout(fn, ms));
    };
    const list = events;
    let idx = 0;
    const step = () => {
      setIndex(idx % list.length);
      setVisible(true);
      t(PREVIEW_TOAST_VISIBLE_MS, () => {
        setVisible(false);
        t(PREVIEW_TOAST_HIDDEN_MS, () => {
          idx += 1;
          step();
        });
      });
    };
    t(PREVIEW_TOAST_FIRST_DELAY_MS, step);
    return () => {
      ids.forEach((id) => window.clearTimeout(id));
    };
  }, [events]);

  const current = events[index] ?? events[0];

  return (
    <div
      className={cn(
        "pointer-events-none fixed left-4 right-4 top-4 z-[100] flex justify-end md:left-auto md:right-6 md:top-6",
        className,
      )}
      role="status"
    >
      <div
        className={cn(
          "max-w-sm rounded-xl border border-white/12 bg-[#1a1a1a]/95 px-4 py-3 text-sm text-zinc-200 shadow-lg backdrop-blur-md transition",
          "duration-500",
          visible ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0",
        )}
      >
        <p className="text-xs font-medium tracking-[0.12em] text-zinc-500">{current.label}</p>
        <p className="mt-1.5 text-zinc-200">{current.text}</p>
      </div>
    </div>
  );
}
