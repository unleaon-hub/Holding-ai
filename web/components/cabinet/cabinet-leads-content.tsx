"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FunnelOverview } from "@/components/cabinet/funnel-overview";
import { LeadCard } from "@/components/cabinet/lead-card";
import { LeadsTable } from "@/components/cabinet/leads-table";
import { useCabinetProject } from "@/components/cabinet/cabinet-project-provider";
import { isTrialActive, subscribeBillingChanged } from "@/lib/billing";
import {
  getLeadSummary,
  getLeads,
  storedLeadsToRows,
  subscribeLeadsChanged,
  updateLeadStatus,
} from "@/lib/lead-storage";
import { leadsKpiItems, leadsListSection } from "@/data/cabinet";
import type { LeadStatus } from "@/data/cabinet/types";

export function CabinetLeadsContent() {
  const { project } = useCabinetProject();
  const slug = project?.slug ?? "";
  const [, bump] = useState(0);
  const refresh = useCallback(() => {
    bump((x) => x + 1);
  }, []);

  useEffect(() => {
    const unsubLeads = subscribeLeadsChanged(refresh);
    const unsubBilling = subscribeBillingChanged(refresh);
    return () => {
      unsubLeads();
      unsubBilling();
    };
  }, [refresh]);

  const stored = useMemo(() => (slug ? getLeads(slug) : []), [slug, bump]);
  const useLive = stored.length > 0;
  const rows = useLive ? storedLeadsToRows(stored) : [];
  const newestLeadIds = useMemo(() => {
    if (stored.length === 0) {
      return new Set<string>();
    }
    const ids = [...stored]
      .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
      .slice(0, 2)
      .map((lead) => lead.id);
    return new Set(ids);
  }, [stored]);
  const summary = slug ? getLeadSummary(slug) : null;
  const trialActive = isTrialActive();
  const trialLocked = !trialActive;

  const kpi = summary
    ? ({ new: summary.new, inWork: summary.inWork, closed: summary.closed, total: summary.total } as const)
    : { new: 0, inWork: 0, closed: 0, total: 0 };
  const hasLeads = kpi.total > 0;

  const onStatusChange = useCallback(
    (leadId: string, next: LeadStatus) => {
      if (!slug || trialLocked) {
        return;
      }
      updateLeadStatus(slug, leadId, next);
      refresh();
    },
    [slug, refresh, trialLocked],
  );

  if (!project) {
    return null;
  }

  return (
    <>
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {leadsKpiItems.map(({ key, label }) => (
          <div key={key} className="surface-subtle p-4">
            <p className="text-xs text-zinc-500">{label}</p>
            <p className="mt-1 text-2xl font-light text-white">{kpi[key]}</p>
          </div>
        ))}
      </div>

      <FunnelOverview className="mt-10" countsByStatus={summary ? summary.byStatus : undefined} />

      <section className="mt-10">
        <h2 className="text-lg font-light text-white">{leadsListSection.title}</h2>
        <p className="mt-1 text-sm text-zinc-500">{leadsListSection.layoutHint}</p>
        {trialLocked ? (
          <div className="mt-4 rounded-2xl border border-white/12 bg-white/[0.02] p-4 md:p-5">
            {hasLeads ? (
              <>
                <p className="text-sm font-medium text-white">У вас уже есть {kpi.total} заявок от клиентов</p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  Разблокируйте доступ за 990₽/мес, чтобы увидеть контакты и начать работу.
                </p>
                <p className="mt-2 text-xs text-zinc-500">Новые заявки продолжают поступать</p>
              </>
            ) : (
              <>
                <p className="text-sm font-medium text-white">Пробный период закончился</p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  Ваш сайт продолжает работать и принимать заявки. Продлите доступ за 990₽/мес, чтобы не потерять новые обращения и работать с клиентами в CRM.
                </p>
                <p className="mt-2 text-xs text-zinc-500">
                  Как только появятся заявки, они будут ждать вас в кабинете.
                </p>
              </>
            )}
            <Link
              href="/upgrade"
              className="mt-4 inline-flex items-center justify-center rounded-full border border-white/16 bg-white/8 px-4 py-2.5 text-sm text-white transition hover:bg-white/12"
            >
              {hasLeads ? "Открыть заявки — 990₽/мес" : "Продлить доступ — 990₽/мес"}
            </Link>
          </div>
        ) : null}

        {!useLive ? (
          <div className="mt-8 surface-subtle rounded-2xl p-8 text-center">
            <p className="text-sm text-zinc-400">Здесь появятся заявки с вашего сайта</p>
            <p className="mt-2 text-xs text-zinc-600">
              Откройте превью и отправьте тестовую заявку с формы — она сохранится в этом браузере.
            </p>
            <Link
              href={`/preview/${encodeURIComponent(project.slug)}`}
              className="mt-5 inline-flex items-center justify-center rounded-full border border-white/16 bg-white/8 px-4 py-2.5 text-sm text-white transition hover:bg-white/12"
            >
              Открыть сайт и проверить форму
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-4 space-y-3 md:hidden">
              {rows.map((lead) => (
                <LeadCard
                  key={lead.id}
                  lead={lead}
                  live
                  isNew={newestLeadIds.has(lead.id)}
                  contactsLocked={trialLocked}
                  statusLocked={trialLocked}
                  onStatusChange={onStatusChange}
                />
              ))}
            </div>
            <div className="mt-4 min-w-0 rounded-xl border border-transparent bg-transparent">
              <LeadsTable
                rows={rows}
                live
                newestLeadIds={newestLeadIds}
                contactsLocked={trialLocked}
                statusLocked={trialLocked}
                onStatusChange={onStatusChange}
              />
            </div>
          </>
        )}
      </section>
    </>
  );
}
