import { getContactActionHref } from "@/components/cabinet/contact-href";
import { StatusBadge } from "@/components/cabinet/status-badge";
import { leadStatusLabel, leadStatusOrder, type LeadRow } from "@/data/cabinet";
import type { LeadStatus } from "@/data/cabinet/types";
import { Reveal } from "@/components/reveal";
import { MessageCircle, Phone, SlidersHorizontal } from "lucide-react";
import Link from "next/link";

type LeadCardProps = {
  lead: LeadRow;
  live?: boolean;
  isNew?: boolean;
  contactsLocked?: boolean;
  statusLocked?: boolean;
  onStatusChange?: (leadId: string, next: LeadStatus) => void;
};

export function LeadCard({
  lead,
  live,
  isNew = false,
  contactsLocked = false,
  statusLocked = false,
  onStatusChange,
}: LeadCardProps) {
  const href = contactsLocked ? null : getContactActionHref(lead.phone);
  return (
    <Reveal>
      <article className={`surface-card p-4 ${isNew ? "border-emerald-400/20 bg-emerald-500/[0.03]" : ""}`}>
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-white">{lead.name}</p>
              {isNew ? (
                <span className="rounded-full border border-emerald-400/25 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-200">
                  Новая заявка
                </span>
              ) : null}
            </div>
            <p className="mt-1 text-sm text-zinc-500">
              {contactsLocked ? (
                <Link href="/upgrade" className="text-zinc-300 underline decoration-white/20 underline-offset-2">
                  🔒 Контакт скрыт • Откройте доступ
                </Link>
              ) : href ? (
                <a
                  href={href}
                  className="text-zinc-300 underline decoration-white/20 underline-offset-2"
                >
                  {lead.phone}
                </a>
              ) : (
                lead.phone
              )}
            </p>
          </div>
          <StatusBadge kind="lead" status={lead.status} className="shrink-0" />
        </div>
        <div className="mt-3 space-y-1 text-sm text-zinc-500">
          <p>
            <span className="text-zinc-600">Источник</span> · {lead.source}
          </p>
          <p className="font-mono text-xs text-zinc-500">{lead.page}</p>
          <p>
            {lead.timeLabel} · {lead.id}
          </p>
        </div>
        {live && onStatusChange ? (
          <div className="mt-4 space-y-2">
            <div className="flex flex-wrap gap-2">
              {href?.startsWith("tel:") ? (
                <Link
                  href={href}
                  className="inline-flex flex-1 min-w-[40%] items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] py-2.5 text-sm text-zinc-200"
                >
                  <Phone size={16} />
                  Позвонить
                </Link>
              ) : (
                <span className="inline-flex flex-1 min-w-[40%] items-center justify-center gap-2 rounded-full border border-white/8 py-2.5 text-sm text-zinc-600">
                  <Phone size={16} />
                  Позвонить
                </span>
              )}
              {href?.startsWith("mailto:") ? (
                <Link
                  href={href}
                  className="inline-flex flex-1 min-w-[40%] items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] py-2.5 text-sm text-zinc-200"
                >
                  <MessageCircle size={16} />
                  Написать
                </Link>
              ) : (
                <span className="inline-flex flex-1 min-w-[40%] items-center justify-center gap-2 rounded-full border border-white/8 py-2.5 text-sm text-zinc-600">
                  <MessageCircle size={16} />
                  Написать
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={16} className="shrink-0 text-zinc-500" />
              <label className="sr-only" htmlFor={`mst-${lead.id}`}>
                Статус
              </label>
              <select
                id={`mst-${lead.id}`}
                className="h-10 w-full min-w-0 flex-1 rounded-lg border border-white/10 bg-[#0d0d0d] px-2 text-sm text-zinc-200 disabled:cursor-not-allowed disabled:text-zinc-500"
                value={lead.status}
                onChange={(e) => {
                  if (statusLocked) {
                    return;
                  }
                  onStatusChange(lead.id, e.target.value as LeadStatus);
                }}
                disabled={statusLocked}
              >
                {leadStatusOrder.map((s) => (
                  <option key={s} value={s}>
                    {leadStatusLabel[s]}
                  </option>
                ))}
              </select>
            </div>
            {statusLocked ? (
              <p className="text-xs text-zinc-600">Смена статуса доступна после разблокировки.</p>
            ) : null}
          </div>
        ) : (
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              className="inline-flex flex-1 min-w-[40%] items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] py-2.5 text-sm text-zinc-200"
            >
              <Phone size={16} />
              Позвонить
            </button>
            <button
              type="button"
              className="inline-flex flex-1 min-w-[40%] items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] py-2.5 text-sm text-zinc-200"
            >
              <MessageCircle size={16} />
              Написать
            </button>
            <button
              type="button"
              className="inline-flex w-full min-w-0 items-center justify-center gap-2 rounded-full border border-white/8 py-2.5 text-sm text-zinc-400"
            >
              <SlidersHorizontal size={16} />
              Статус
            </button>
          </div>
        )}
      </article>
    </Reveal>
  );
}
