"use client";

import { cn } from "@/lib/utils";

type PreviewActiveIndicatorProps = {
  className?: string;
};

/**
 * Постоянный мягкий индикатор «сайт в строю».
 */
export function PreviewActiveIndicator({ className }: PreviewActiveIndicatorProps) {
  return (
    <div
      className={cn(
        "pointer-events-none fixed left-4 top-4 z-[90] max-w-[min(18rem,calc(100%-2rem))] md:left-6 md:top-6",
        className,
      )}
      role="status"
    >
      <div
        className={cn(
          "flex items-center gap-2 rounded-full border border-white/10 bg-[#0d0d0d]/78 px-3 py-1.5 shadow-sm backdrop-blur-md",
        )}
      >
        <span
          className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500/85 shadow-[0_0_8px_rgba(52,211,153,0.45)]"
          aria-hidden
        />
        <p className="text-[0.7rem] font-medium leading-tight text-zinc-300 sm:text-xs">
          Сайт готов к приёму заявок
        </p>
        <span className="text-[0.65rem] text-zinc-600" aria-hidden>
          ·
        </span>
        <p className="text-[0.65rem] leading-tight text-zinc-500 sm:text-[0.7rem]">Сайт активен</p>
      </div>
    </div>
  );
}
