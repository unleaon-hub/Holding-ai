import { getContactActionHref } from "@/components/cabinet/contact-href";
import { StatusBadge } from "@/components/cabinet/status-badge";
import { leadStatusLabel, leadStatusOrder, type LeadRow } from "@/data/cabinet";
import type { LeadStatus } from "@/data/cabinet/types";
import { MoreHorizontal, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";

type LeadsTableProps = {
  rows: LeadRow[];
  live?: boolean;
  onStatusChange?: (leadId: string, next: LeadStatus) => void;
};

export function LeadsTable({ rows, live, onStatusChange }: LeadsTableProps) {
  return (
    <div className="hidden md:block">
      <div className="overflow-x-auto rounded-xl border border-white/8">
        <table className="w-full min-w-[800px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-white/8 text-zinc-500">
              <th className="px-4 py-3 font-medium">Имя</th>
              <th className="px-4 py-3 font-medium">Телефон</th>
              <th className="px-4 py-3 font-medium">Источник</th>
              <th className="px-4 py-3 font-medium">Страница</th>
              <th className="px-4 py-3 font-medium">Время</th>
              <th className="px-4 py-3 font-medium">Статус</th>
              <th className="px-4 py-3 font-medium">Действия</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const href = getContactActionHref(row.phone);
              return (
                <tr
                  key={row.id}
                  className="border-b border-white/5 transition hover:bg-white/[0.02]"
                >
                  <td className="px-4 py-3 text-zinc-200">{row.name}</td>
                  <td className="px-4 py-3 text-zinc-400">
                    {href ? (
                      <a href={href} className="text-zinc-300 underline decoration-white/20 underline-offset-2 hover:decoration-white/40">
                        {row.phone}
                      </a>
                    ) : (
                      row.phone
                    )}
                  </td>
                  <td className="px-4 py-3 text-zinc-400">{row.source}</td>
                  <td className="px-4 py-3 font-mono text-xs text-zinc-500">{row.page}</td>
                  <td className="px-4 py-3 text-zinc-500">{row.timeLabel}</td>
                  <td className="px-4 py-3">
                    <StatusBadge kind="lead" status={row.status} />
                  </td>
                  <td className="px-4 py-3">
                    {live && onStatusChange ? (
                      <div className="flex flex-wrap items-center gap-1.5">
                        {href?.startsWith("tel:") ? (
                          <Link
                            href={href}
                            className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-zinc-400 transition hover:border-white/20 hover:text-zinc-200"
                            aria-label="Позвонить"
                          >
                            <Phone size={15} />
                          </Link>
                        ) : (
                          <span
                            className="grid h-8 w-8 place-items-center rounded-lg border border-white/5 text-zinc-600"
                            title="Нет tel-ссылки"
                          >
                            <Phone size={15} />
                          </span>
                        )}
                        {href?.startsWith("mailto:") ? (
                          <Link
                            href={href}
                            className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-zinc-400 transition hover:border-white/20 hover:text-zinc-200"
                            aria-label="Написать"
                          >
                            <MessageCircle size={15} />
                          </Link>
                        ) : (
                          <span
                            className="grid h-8 w-8 place-items-center rounded-lg border border-white/5 text-zinc-600"
                            title="Нет mailto"
                          >
                            <MessageCircle size={15} />
                          </span>
                        )}
                        <div className="inline-flex h-8 min-w-0 max-w-[11rem] items-center rounded-lg border border-white/10 pl-1 pr-0.5 text-zinc-200">
                          <span className="px-0.5 text-zinc-600" aria-hidden>
                            <MoreHorizontal size={12} className="inline" />
                          </span>
                          <label className="sr-only" htmlFor={`st-${row.id}`}>
                            Статус
                          </label>
                          <select
                            id={`st-${row.id}`}
                            className="h-7 w-full min-w-0 max-w-[9.5rem] flex-1 cursor-pointer bg-transparent text-left text-xs text-zinc-200"
                            value={row.status}
                            onChange={(e) => onStatusChange(row.id, e.target.value as LeadStatus)}
                          >
                            {leadStatusOrder.map((s) => (
                              <option key={s} value={s} className="bg-[#141414] text-zinc-200">
                                {leadStatusLabel[s]}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-zinc-400 transition hover:border-white/20 hover:text-zinc-200"
                          aria-label="Позвонить"
                        >
                          <Phone size={15} />
                        </button>
                        <button
                          type="button"
                          className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-zinc-400 transition hover:border-white/20 hover:text-zinc-200"
                          aria-label="Написать"
                        >
                          <MessageCircle size={15} />
                        </button>
                        <button
                          type="button"
                          className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-zinc-500 transition hover:border-white/20 hover:text-zinc-200"
                          aria-label="Изменить статус"
                        >
                          <MoreHorizontal size={15} />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
