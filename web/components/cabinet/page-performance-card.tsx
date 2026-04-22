import { StatusBadge } from "@/components/cabinet/status-badge";
import type { PagePerformanceRow } from "@/data/cabinet";
import { Reveal } from "@/components/reveal";

type PagePerformanceCardProps = {
  row: PagePerformanceRow;
};

export function PagePerformanceCard({ row }: PagePerformanceCardProps) {
  return (
    <Reveal>
      <article className="surface-card p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-sm font-medium text-white">{row.slug}</p>
            <p className="font-mono text-xs text-zinc-500">{row.path}</p>
          </div>
          <StatusBadge kind="page" status={row.status} className="shrink-0" />
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
          <div>
            <p className="text-zinc-500">Лиды</p>
            <p className="text-zinc-200">{row.leads}</p>
          </div>
          <div>
            <p className="text-zinc-500">CTR</p>
            <p className="text-zinc-200">{row.ctr}</p>
          </div>
          <div>
            <p className="text-zinc-500">Конв.</p>
            <p className="text-zinc-200">{row.conv}</p>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
