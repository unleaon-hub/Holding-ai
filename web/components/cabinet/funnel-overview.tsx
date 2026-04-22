import {
  funnelCopy,
  leadStatusLabel,
  leadStatusOrder,
  leadsFunnelSummary,
} from "@/data/cabinet";
import type { LeadStatus } from "@/data/cabinet/types";
import { Reveal } from "@/components/reveal";

type FunnelOverviewProps = {
  className?: string;
  /** Счётчики по стадиям; `undefined` — демо `leadsFunnelSummary`. */
  countsByStatus?: Record<LeadStatus, number> | null;
};

export function FunnelOverview({ className, countsByStatus }: FunnelOverviewProps) {
  const by =
    countsByStatus != null
      ? countsByStatus
      : (leadsFunnelSummary as Record<LeadStatus, number>);
  const totalFunnel = leadStatusOrder.reduce((acc, s) => acc + (by[s] ?? 0), 0);
  const barWeight = (status: LeadStatus) => {
    const c = by[status] ?? 0;
    if (totalFunnel > 0) {
      return c;
    }
    return 1;
  };

  return (
    <section className={className}>
      <p className="eyebrow">Воронка</p>
      <h2 className="mt-2 text-lg font-light text-white md:text-xl">5 стадий</h2>
      <div className="mt-4 space-y-3">
        <div className="hidden overflow-hidden rounded-xl border border-white/8 md:block">
          <div className="grid grid-cols-5 gap-px bg-white/5">
            {leadStatusOrder.map((status) => {
              const count = by[status] ?? 0;
              return (
                <div key={status} className="bg-[#0d0d0d] p-3 text-center">
                  <p className="text-xs leading-tight text-zinc-500">
                    {leadStatusLabel[status]}
                  </p>
                  <p className="mt-2 text-2xl font-light text-white">{count}</p>
                </div>
              );
            })}
          </div>
          <div className="h-2 w-full overflow-hidden bg-[#0a0a0a]">
            <div className="flex h-full w-full">
              {leadStatusOrder.map((status) => (
                <div
                  key={status}
                  className="h-full min-w-[2px] border-r border-[#0d0d0d] bg-gradient-to-b from-zinc-100/15 to-zinc-100/5"
                  style={{ flex: barWeight(status) }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="grid gap-2 md:hidden">
          {leadStatusOrder.map((status) => {
            const count = by[status] ?? 0;
            return (
              <Reveal key={status}>
                <div className="surface-subtle flex items-center justify-between p-3">
                  <p className="text-sm text-zinc-200">{leadStatusLabel[status]}</p>
                  <p className="text-lg font-light text-white">{count}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
        <p className="text-xs text-zinc-500">{funnelCopy(totalFunnel)}</p>
      </div>
    </section>
  );
}
