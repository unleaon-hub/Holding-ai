"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FunnelOverview } from "@/components/cabinet/funnel-overview";
import { LeadCard } from "@/components/cabinet/lead-card";
import { LeadsTable } from "@/components/cabinet/leads-table";
import { useCabinetProject } from "@/components/cabinet/cabinet-project-provider";
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
    return subscribeLeadsChanged(refresh);
  }, [refresh]);

  const stored = useMemo(() => (slug ? getLeads(slug) : []), [slug, bump]);
  const useLive = stored.length > 0;
  const rows = useLive ? storedLeadsToRows(stored) : [];
  const summary = slug ? getLeadSummary(slug) : null;

  const kpi = summary
    ? ({ new: summary.new, inWork: summary.inWork, closed: summary.closed, total: summary.total } as const)
    : { new: 0, inWork: 0, closed: 0, total: 0 };

  const onStatusChange = useCallback(
    (leadId: string, next: LeadStatus) => {
      if (!slug) {
        return;
      }
      updateLeadStatus(slug, leadId, next);
      refresh();
    },
    [slug, refresh],
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
                <LeadCard key={lead.id} lead={lead} live onStatusChange={onStatusChange} />
              ))}
            </div>
            <div className="mt-4 min-w-0">
              <LeadsTable rows={rows} live onStatusChange={onStatusChange} />
            </div>
          </>
        )}
      </section>
    </>
  );
}
