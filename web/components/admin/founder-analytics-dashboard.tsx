"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { subscribeBillingChanged } from "@/lib/billing";
import { aggregateFounderSnapshot, type FounderAnalyticsSnapshot } from "@/lib/founder-analytics";
import { subscribeLeadsChanged } from "@/lib/lead-storage";
import { subscribePaymentIntentsChanged } from "@/lib/payment-intent";
import { subscribeSession } from "@/lib/site-session";
import { subscribeUpgradeAnalyticsChanged } from "@/lib/upgrade-analytics";

function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="surface-card min-w-[140px] flex-1 p-4 md:p-5">
      <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold tabular-nums text-white md:text-3xl">{value}</p>
      {hint ? <p className="mt-2 text-xs text-zinc-500">{hint}</p> : null}
    </div>
  );
}

function formatConversionRate(rate: number | null): string {
  if (rate == null) {
    return "—";
  }
  return `${Math.round(rate * 100)}%`;
}

function ConversionRow({ label, rate, hint }: { label: string; rate: number | null; hint: string }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 py-2.5 last:border-b-0">
      <div>
        <p className="text-sm text-zinc-200">{label}</p>
        <p className="text-xs text-zinc-500">{hint}</p>
      </div>
      <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-sm font-semibold tabular-nums text-white">
        {formatConversionRate(rate)}
      </span>
    </div>
  );
}

function FunnelRow({
  label,
  value,
  note,
}: {
  label: string;
  value: string | number;
  note?: string;
}) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/5 py-3 last:border-b-0">
      <span className="text-sm text-zinc-300">{label}</span>
      <div className="text-right">
        <span className="font-semibold tabular-nums text-white">{value}</span>
        {note ? <p className="text-xs text-zinc-500">{note}</p> : null}
      </div>
    </div>
  );
}

export function FounderAnalyticsDashboard() {
  const [snap, setSnap] = useState<FounderAnalyticsSnapshot | null>(null);

  const refresh = useCallback(() => {
    setSnap(aggregateFounderSnapshot());
  }, []);

  useEffect(() => {
    refresh();
    const unsubs = [
      subscribeSession(refresh),
      subscribeLeadsChanged(refresh),
      subscribePaymentIntentsChanged(refresh),
      subscribeBillingChanged(refresh),
      subscribeUpgradeAnalyticsChanged(refresh),
    ];
    return () => {
      for (const u of unsubs) {
        u();
      }
    };
  }, [refresh]);

  if (!snap) {
    return <p className="text-sm text-zinc-500">Загрузка…</p>;
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap gap-3">
        <StatCard
          label="Проекты (уник. slug)"
          value={snap.uniqueProjectSlugs}
          hint="Текущий проект + лиды + intent"
        />
        <StatCard label="Проекты с лидами" value={snap.projectsWithLeads} />
        <StatCard label="Лидов всего" value={snap.totalLeads} />
        <StatCard label="Ср. лидов / проект" value={snap.avgLeadsPerProjectWithLeads} hint="Среди проектов с лидами" />
        <StatCard label="Trial истёк" value={snap.trialExpired} hint="Один trial на этот браузер" />
        <StatCard label="/upgrade views" value={snap.upgradeViews} hint="Локально, за сессию вкладки — 1 view/slug" />
        <StatCard label="/upgrade CTA" value={snap.upgradeCtaClicks} />
        <StatCard label="Intent confirmed (UI)" value={snap.upgradeIntentConfirmed} />
        <StatCard label="Payment intents" value={snap.paymentIntentsTotal} />
        <StatCard label="Проектов с intent" value={snap.paymentIntentUniqueProjects} />
      </div>

      <div className="surface-card p-4 md:p-6">
        <p className="eyebrow">Конверсии</p>
        <p className="mt-1 text-xs text-zinc-500">
          Доли по локальным данным; при делении на 0 показывается «—».
        </p>
        <div className="mt-3">
          <ConversionRow
            label="Проекты с лидами"
            rate={snap.leadsRate}
            hint="проекты с ≥1 лидом / уник. slug (sites)"
          />
          <ConversionRow
            label="/upgrade views"
            rate={snap.upgradeViewRate}
            hint="уник. slug с view / trial истёк (1 на браузер)"
          />
          <ConversionRow
            label="CTA clicked"
            rate={snap.upgradeClickRate}
            hint="уник. slug с кликом / уник. slug с view"
          />
          <ConversionRow
            label="Intent confirmed"
            rate={snap.upgradeIntentRate}
            hint="уник. slug с intent / уник. slug с кликом"
          />
        </div>
      </div>

      <div className="surface-card p-4 md:p-6">
        <p className="eyebrow">Воронка</p>
        <p className="mt-1 text-sm text-zinc-500">
          Sites → Leads → Trial expired → Upgrade → Intent (числа из локального хранилища)
        </p>
        <div className="mt-4">
          <FunnelRow label="Sites (уник. slug в данных)" value={snap.uniqueProjectSlugs} />
          <FunnelRow label="Проекты с ≥1 лидом" value={snap.projectsWithLeads} />
          <FunnelRow label="Trial истёк (продукт)" value={snap.trialExpired} />
          <FunnelRow label="/upgrade views (события)" value={snap.upgradeViews} />
          <FunnelRow label="/upgrade CTA clicks" value={snap.upgradeCtaClicks} />
          <FunnelRow label="Intent confirmed (событие)" value={snap.upgradeIntentConfirmed} />
          <FunnelRow label="Payment intents создано" value={snap.paymentIntentsTotal} />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="surface-card p-4 md:p-5">
          <p className="eyebrow">Последние лиды</p>
          <ul className="mt-3 space-y-3 text-sm">
            {snap.recentLeads.length === 0 ? (
              <li className="text-zinc-500">Пока нет</li>
            ) : (
              snap.recentLeads.map((l) => (
                <li key={l.id} className="border-b border-white/5 pb-3 last:border-b-0 last:pb-0">
                  <span className="font-medium text-zinc-200">{l.name}</span>
                  <span className="text-zinc-500"> · {l.projectSlug}</span>
                  <p className="text-xs text-zinc-500">{l.createdAt}</p>
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="surface-card p-4 md:p-5">
          <p className="eyebrow">Последние intent</p>
          <ul className="mt-3 space-y-3 text-sm">
            {snap.recentIntents.length === 0 ? (
              <li className="text-zinc-500">Пока нет</li>
            ) : (
              snap.recentIntents.map((i) => (
                <li key={i.id} className="border-b border-white/5 pb-3 last:border-b-0 last:pb-0">
                  <span className="font-medium text-zinc-200">{i.email}</span>
                  <span className="text-zinc-500"> · {i.projectSlug}</span>
                  <p className="text-xs text-zinc-500">{i.createdAt}</p>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

      <p className="text-xs text-zinc-600">
        <Link href="/cabinet" className="underline decoration-white/20 underline-offset-2 hover:decoration-white/40">
          В кабинет
        </Link>
        {" · "}
        <Link href="/upgrade" className="underline decoration-white/20 underline-offset-2 hover:decoration-white/40">
          /upgrade
        </Link>
      </p>
    </div>
  );
}
