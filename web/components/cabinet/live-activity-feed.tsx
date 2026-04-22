"use client";

import type { ElementType } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useCabinetProject } from "@/components/cabinet/cabinet-project-provider";
import { formatLeadTimeLabel, getLeads, subscribeLeadsChanged } from "@/lib/lead-storage";
import type { LeadFormSection } from "@/lib/lead-storage";
import { liveActivityFeed, type LiveActivityItem, type LiveActivityType } from "@/data/cabinet";
import { Reveal } from "@/components/reveal";
import { Activity, FileText, LineChart, Search, Sparkles } from "lucide-react";

const sectionCopy: Record<LeadFormSection, string> = {
  hero: "первый экран",
  capture: "блок заявки",
  final_cta: "финальный CTA",
};

const iconByType: Record<LiveActivityType, ElementType<{ size?: number; className?: string }>> = {
  new_lead: Activity,
  page_update: FileText,
  query_found: Search,
  agent_done: Sparkles,
  offer_update: LineChart,
};

type LiveActivityFeedProps = {
  className?: string;
};

function lastLeadToItem(lead: {
  id: string;
  name: string;
  createdAt: string;
  section: LeadFormSection;
}): LiveActivityItem {
  return {
    id: `live-${lead.id}`,
    type: "new_lead",
    timeLabel: formatLeadTimeLabel(lead.createdAt),
    title: "Новая заявка",
    description: `С превью сайта · ${sectionCopy[lead.section]}`,
    highlight: lead.name,
  };
}

export function LiveActivityFeed({ className }: LiveActivityFeedProps) {
  const { project } = useCabinetProject();
  const [, bump] = useState(0);
  const refresh = useCallback(() => bump((x) => x + 1), []);

  useEffect(() => {
    return subscribeLeadsChanged(refresh);
  }, [refresh]);

  const items = useMemo((): LiveActivityItem[] => {
    if (!project) {
      return liveActivityFeed;
    }
    const list = getLeads(project.slug);
    if (list.length === 0) {
      return liveActivityFeed;
    }
    const latest = [...list].sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0]!;
    return [lastLeadToItem(latest), ...liveActivityFeed];
  }, [project, bump]);

  return (
    <section className={className}>
      <p className="eyebrow">Что происходит сейчас</p>
      <h2 className="mt-2 text-lg font-light text-white md:text-xl">Лента событий</h2>
      <ul className="mt-4 max-h-[420px] space-y-2 overflow-y-auto pr-1">
        {items.map((item) => {
          const Icon = iconByType[item.type];
          return (
            <li key={item.id}>
              <Reveal>
                <div className="surface-subtle flex gap-3 p-3">
                  <div className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/8 bg-white/[0.04] text-zinc-300">
                    <Icon size={16} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-2">
                      <p className="text-sm font-medium text-zinc-100">{item.title}</p>
                      <span className="text-xs text-zinc-500">{item.timeLabel}</span>
                    </div>
                    <p className="mt-0.5 text-sm text-zinc-500">{item.description}</p>
                    {item.highlight ? <p className="mt-1 text-sm text-zinc-300">{item.highlight}</p> : null}
                  </div>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
