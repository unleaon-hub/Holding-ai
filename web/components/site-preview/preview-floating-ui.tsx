"use client";

import Link from "next/link";
import { isRegistered } from "@/lib/site-session";
import { cn } from "@/lib/utils";

type PreviewFloatingUIProps = {
  claimNextEdit: string;
  claimNextCabinet: string;
  className?: string;
};

/**
 * Минимальный UI платформы поверх превью. Не трогает публичные лендинги.
 */
export function PreviewFloatingUI({
  claimNextEdit,
  claimNextCabinet,
  className,
}: PreviewFloatingUIProps) {
  const reg = isRegistered();
  const editHref = reg ? "/cabinet/edit" : claimNextEdit;
  const crmHref = reg ? "/cabinet" : claimNextCabinet;

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-0 z-[100] flex flex-col items-center justify-end px-4 pb-5 pt-8",
        "bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/85 to-transparent",
        className,
      )}
    >
      <div className="pointer-events-auto w-full max-w-lg rounded-2xl border border-white/12 bg-[#151515]/95 p-4 shadow-[0_20px_46px_rgba(0,0,0,0.5)] backdrop-blur-xl md:p-5">
        <p className="text-center text-sm font-medium leading-snug text-white">
          Ваш сайт уже готов и может принимать заявки
        </p>
        <p className="mt-2 text-center text-xs text-zinc-500">
          Вы можете доработать его и начать получать клиентов
        </p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Link
            href={editHref}
            className="inline-flex w-full items-center justify-center rounded-full border border-white/18 bg-white/8 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/14 sm:w-auto"
          >
            Доработать сайт
          </Link>
          <Link
            href={crmHref}
            className="inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-transparent px-4 py-2.5 text-sm font-medium text-zinc-200 transition hover:border-white/20 hover:text-white sm:w-auto"
          >
            Открыть CRM
          </Link>
        </div>
      </div>
      <p className="pointer-events-none mt-3 max-w-lg px-1 text-center text-xs leading-relaxed text-zinc-500">
        Этот сайт уже может приносить заявки
      </p>
    </div>
  );
}
