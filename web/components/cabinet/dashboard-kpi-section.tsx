"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useCabinetProject } from "@/components/cabinet/cabinet-project-provider";
import { getLeads, subscribeLeadsChanged } from "@/lib/lead-storage";
import { dashboardKpis, type KpiKey, type KpiTimeframe } from "@/data/cabinet";
import { KpiCard } from "@/components/cabinet/kpi-card";
import { cn } from "@/lib/utils";

const kpiSectionHref: Record<KpiKey, string> = {
  leads: "/cabinet/leads",
  visitors: "/cabinet/pages",
  cpl: "/cabinet/payment",
  growth: "/cabinet/growth",
};

type DashboardKpiSectionProps = {
  className?: string;
};

export function DashboardKpiSection({ className }: DashboardKpiSectionProps) {
  const [tf, setTf] = useState<KpiTimeframe>("week");
  const { project } = useCabinetProject();
  const [, bump] = useState(0);
  const refresh = useCallback(() => bump((x) => x + 1), []);

  useEffect(() => {
    return subscribeLeadsChanged(refresh);
  }, [refresh]);

  const leadCount = useMemo(
    () => (project ? getLeads(project.slug).length : 0),
    [project, bump],
  );

  return (
    <div className={className}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow">Показатели</p>
          <h2 className="mt-1 text-lg font-light text-white md:text-xl">KPI</h2>
        </div>
        <div className="inline-flex rounded-full border border-white/10 p-0.5 text-sm">
          {(
            [
              ["today", "Сегодня"] as const,
              ["week", "Неделя"] as const,
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setTf(key)}
              className={cn(
                "rounded-full px-3 py-1.5 font-medium transition",
                tf === key
                  ? "bg-white/10 text-white"
                  : "text-zinc-500 hover:text-zinc-200",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {dashboardKpis.map((row) => {
          const base = tf === "today" ? row.today : row.week;
          if (row.key === "leads" && leadCount > 0) {
            return (
              <KpiCard
                key={row.key}
                data={{
                  ...base,
                  value: String(leadCount),
                  hint: "С сайта (браузер)",
                }}
                href={kpiSectionHref[row.key]}
              />
            );
          }
          return (
            <KpiCard
              key={row.key}
              data={base}
              href={kpiSectionHref[row.key]}
            />
          );
        })}
      </div>
    </div>
  );
}
