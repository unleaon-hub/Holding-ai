"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Bell } from "lucide-react";
import { getTrialDaysLeft, isTrialActive } from "@/lib/billing";
import { getLeads, subscribeLeadsChanged } from "@/lib/lead-storage";
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
  const [, bump] = useState(0);
  const refresh = useCallback(() => {
    bump((x) => x + 1);
  }, []);
  useEffect(() => {
    return subscribeLeadsChanged(refresh);
  }, [refresh]);

  const leadCount = useMemo(
    () => (project ? getLeads(project.slug).length : 0),
    [project, bump],
  );
  const trialActive = isTrialActive();
  const trialDaysLeft = getTrialDaysLeft();
  const projectName =
    project != null
      ? `${project.niche} — ${project.city}`
      : "Проект";
  const trialLabel = trialActive
    ? `Пробный период: ${trialDaysLeft} дн. осталось`
    : leadCount > 0
      ? `Пробный период закончился • ${leadCount} заявок`
      : "Пробный период закончился";

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
            aria-label="Статус пробного периода и доступ к тарифу"
          >
            <span className="font-medium text-white">{trialLabel}</span>
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
