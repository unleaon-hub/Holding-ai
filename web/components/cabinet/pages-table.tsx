import { StatusBadge } from "@/components/cabinet/status-badge";
import type { PagePerformanceRow } from "@/data/cabinet";

type PagesTableProps = {
  rows: PagePerformanceRow[];
};

export function PagesTable({ rows }: PagesTableProps) {
  return (
    <div className="hidden md:block">
      <div className="overflow-x-auto rounded-xl border border-white/8">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-white/8 text-zinc-500">
              <th className="px-4 py-3 font-medium">Страница</th>
              <th className="px-4 py-3 font-medium">Лиды</th>
              <th className="px-4 py-3 font-medium">CTR</th>
              <th className="px-4 py-3 font-medium">Конверсия</th>
              <th className="px-4 py-3 font-medium">Статус</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.path}
                className="border-b border-white/5 transition hover:bg-white/[0.02]"
              >
                <td className="px-4 py-3">
                  <p className="text-zinc-200">{row.slug}</p>
                  <p className="font-mono text-xs text-zinc-500">{row.path}</p>
                </td>
                <td className="px-4 py-3 text-zinc-200">{row.leads}</td>
                <td className="px-4 py-3 text-zinc-400">{row.ctr}</td>
                <td className="px-4 py-3 text-zinc-400">{row.conv}</td>
                <td className="px-4 py-3">
                  <StatusBadge kind="page" status={row.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
