"use client";

import Link from "next/link";
import { Bell } from "lucide-react";
import { cabinetProjectContext } from "@/data/cabinet";
import { useCabinetProject } from "./cabinet-project-provider";
import { cn } from "@/lib/utils";

type CabinetHeaderProps = {
  className?: string;
};

/**
 * TODO: `cabinetProjectContext` для биллинга — заменить на GET /api/billing; название/нишу — из `project` в localStorage
 */
export function CabinetHeader({ className }: CabinetHeaderProps) {
  const { project } = useCabinetProject();
  const { planLabel, daysUntilCharge, nextChargeDate } = cabinetProjectContext;
  const projectName =
    project != null
      ? `${project.niche} — ${project.city}`
      : cabinetProjectContext.projectName;

  return (
    <header
      className={cn(
        "border-b border-white/8 bg-[#0d0d0d]/90 backdrop-blur-xl",
        className,
      )}
    >
      <div className="section-shell flex flex-col gap-3 py-3 md:flex-row md:items-center md:justify-between md:py-4">
        <div>
          <p className="text-xs font-medium tracking-[0.2em] text-zinc-500">ПРОЕКТ</p>
          <p className="mt-1 text-base font-medium text-white md:text-lg">{projectName}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          <Link
            href="/cabinet/payment"
            className="surface-subtle flex max-w-full flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-white/10 px-3 py-1.5 text-sm text-zinc-200 transition hover:border-white/20 hover:bg-white/[0.04]"
            aria-label="Оплата и подписка: тариф и дата списания"
          >
            <span className="text-zinc-500">Тариф</span>
            <span className="font-medium text-white">{planLabel}</span>
            <span className="text-zinc-500">·</span>
            <span className="text-zinc-500">списание</span>
            <span className="font-medium text-white">через {daysUntilCharge} дн.</span>
            <span className="text-zinc-500">{nextChargeDate}</span>
          </Link>
          <button
            type="button"
            className="ml-auto grid h-10 w-10 place-items-center rounded-full border border-white/10 text-zinc-400 transition hover:border-white/20 hover:text-zinc-200 md:ml-0"
            aria-label="Уведомления"
          >
            <Bell size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
