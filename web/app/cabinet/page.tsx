import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { StatusBadge } from "@/components/cabinet/status-badge";
import { MissedOpportunityCard } from "@/components/cabinet/missed-opportunity-card";
import { AiActionsList } from "@/components/cabinet/ai-actions-list";
import { LiveActivityFeed } from "@/components/cabinet/live-activity-feed";
import { QuickActions } from "@/components/cabinet/quick-actions";
import { DashboardKpiSection } from "@/components/cabinet/dashboard-kpi-section";
import { CabinetSiteReadyBlock } from "@/components/cabinet/cabinet-site-ready-block";
import { DashboardPotentialClients } from "@/components/cabinet/dashboard-potential-clients";
import { DashboardSystemBlock } from "@/components/cabinet/dashboard-system-block";
import { businessStatus, dashboardHeadline } from "@/data/cabinet";

export const metadata: Metadata = {
  title: "Дашборд",
};

export default function CabinetDashboardPage() {
  return (
    <main className="w-full max-w-6xl min-w-0">
      <Reveal>
        <p className="eyebrow">Система</p>
        <h1 className="section-title mt-2 text-3xl md:text-5xl">
          {dashboardHeadline.title}
        </h1>
        <p className="section-lead mt-3 text-base md:text-lg">
          {dashboardHeadline.subtitle}
        </p>
      </Reveal>

      <CabinetSiteReadyBlock className="mt-8" />

      <Reveal className="mt-8">
        <div className="surface-card p-4 md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="eyebrow">статус бизнеса</p>
            <StatusBadge
              kind="business"
              status={businessStatus.state}
              labelOverride={businessStatus.label}
            />
          </div>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-400">
            {businessStatus.description}
          </p>
        </div>
      </Reveal>

      <DashboardPotentialClients className="mt-8" />

      <DashboardSystemBlock className="mt-8" />

      <DashboardKpiSection className="mt-8" />

      <MissedOpportunityCard className="mt-8" />

      <div className="mt-10 grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <AiActionsList />
        <LiveActivityFeed className="xl:pl-2" />
      </div>

      <QuickActions className="mt-10" />
    </main>
  );
}
