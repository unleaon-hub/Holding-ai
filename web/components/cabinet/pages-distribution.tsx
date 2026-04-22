import { Reveal } from "@/components/reveal";
import { topPagesByLeads, weekLeadVolume } from "@/data/cabinet";

type PagesDistributionProps = {
  className?: string;
};

export function PagesDistribution({ className }: PagesDistributionProps) {
  return (
    <div className={className}>
      <p className="eyebrow">Распределение</p>
      <h2 className="mt-2 text-lg font-light text-white md:text-xl">Топ страниц по лидам</h2>
      <div className="mt-4 space-y-3">
        {topPagesByLeads.map((row) => (
          <Reveal key={row.path}>
            <div>
              <div className="mb-1 flex justify-between text-sm">
                <span className="text-zinc-300">{row.path}</span>
                <span className="text-zinc-500">{row.sharePercent}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-zinc-200/25 to-zinc-100/10"
                  style={{ width: `${row.sharePercent}%` }}
                />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="mt-4 text-sm text-zinc-500">
        Неделя: {weekLeadVolume.thisWeek} лидов ({weekLeadVolume.label})
      </p>
    </div>
  );
}
