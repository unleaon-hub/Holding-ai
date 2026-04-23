import { getBillingState, isTrialActive } from "@/lib/billing";
import { readLeadsState } from "@/lib/lead-storage/storage";
import type { StoredLead } from "@/lib/lead-storage/types";
import { listPaymentIntents } from "@/lib/payment-intent";
import type { PaymentIntent } from "@/lib/payment-intent";
import { getProject } from "@/lib/site-session";
import {
  getUpgradeEvents,
  getUpgradeStats,
  type UpgradeAnalyticsEvent,
} from "@/lib/upgrade-analytics";

export type FounderAnalyticsSnapshot = {
  /** Уникальные slug из текущего проекта, лидов и intent (site-session хранит только один активный проект). */
  uniqueProjectSlugs: number;
  projectsWithLeads: number;
  /** Один trial на браузер: 1 если trial был и истёк, иначе 0. */
  trialExpired: number;
  /** Уникальные projectSlug с ≥1 событием upgrade_view. */
  uniqueUpgradeViewProjects: number;
  /** Уникальные projectSlug с ≥1 событием upgrade_cta_click. */
  uniqueUpgradeClickProjects: number;
  /** Уникальные projectSlug с ≥1 событием upgrade_intent_confirmed. */
  uniqueUpgradeIntentProjects: number;
  upgradeViews: number;
  upgradeCtaClicks: number;
  upgradeIntentConfirmed: number;
  paymentIntentsTotal: number;
  paymentIntentUniqueProjects: number;
  totalLeads: number;
  avgLeadsPerProjectWithLeads: number;
  recentLeads: StoredLead[];
  recentIntents: PaymentIntent[];
  /** projectsWithLeads / uniqueProjectSlugs */
  leadsRate: number | null;
  /** uniqueUpgradeViewProjects / trialExpired; null если trial не истёк */
  upgradeViewRate: number | null;
  /** uniqueUpgradeClickProjects / uniqueUpgradeViewProjects */
  upgradeClickRate: number | null;
  /** uniqueUpgradeIntentProjects / uniqueUpgradeClickProjects */
  upgradeIntentRate: number | null;
};

function collectSlugs(leads: StoredLead[], intents: PaymentIntent[], currentSlug: string | null): Set<string> {
  const s = new Set<string>();
  if (currentSlug?.trim()) {
    s.add(currentSlug.trim());
  }
  for (const l of leads) {
    if (l.projectSlug.trim()) {
      s.add(l.projectSlug.trim());
    }
  }
  for (const i of intents) {
    if (i.projectSlug.trim()) {
      s.add(i.projectSlug.trim());
    }
  }
  return s;
}

function countProjectsWithLeads(leads: StoredLead[]): number {
  const counts = new Map<string, number>();
  for (const l of leads) {
    const slug = l.projectSlug.trim();
    if (!slug) {
      continue;
    }
    counts.set(slug, (counts.get(slug) ?? 0) + 1);
  }
  let n = 0;
  for (const c of counts.values()) {
    if (c > 0) {
      n += 1;
    }
  }
  return n;
}

function avgLeadsPerProject(withLeads: number, totalLeads: number): number {
  if (withLeads <= 0) {
    return 0;
  }
  return Math.round((totalLeads / withLeads) * 10) / 10;
}

function byCreatedAtDesc<T extends { createdAt: string }>(rows: T[]): T[] {
  return [...rows].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
}

function conversionRatio(numerator: number, denominator: number): number | null {
  if (denominator <= 0) {
    return null;
  }
  return numerator / denominator;
}

/** Доля воронки; при num > den (шум в данных или trial=1 при нескольких slug) ограничиваем 100% для UI. */
function upgradeFunnelRate(numerator: number, denominator: number): number | null {
  const r = conversionRatio(numerator, denominator);
  if (r == null) {
    return null;
  }
  return Math.min(1, r);
}

function collectUniqueUpgradeProjectSlugs(events: UpgradeAnalyticsEvent[]): {
  uniqueUpgradeViewProjects: Set<string>;
  uniqueUpgradeClickProjects: Set<string>;
  uniqueUpgradeIntentProjects: Set<string>;
} {
  const uniqueUpgradeViewProjects = new Set<string>();
  const uniqueUpgradeClickProjects = new Set<string>();
  const uniqueUpgradeIntentProjects = new Set<string>();
  for (const e of events) {
    const slug = e.projectSlug.trim();
    if (!slug) {
      continue;
    }
    if (e.type === "upgrade_view") {
      uniqueUpgradeViewProjects.add(slug);
    } else if (e.type === "upgrade_cta_click") {
      uniqueUpgradeClickProjects.add(slug);
    } else if (e.type === "upgrade_intent_confirmed") {
      uniqueUpgradeIntentProjects.add(slug);
    }
  }
  return { uniqueUpgradeViewProjects, uniqueUpgradeClickProjects, uniqueUpgradeIntentProjects };
}

export function aggregateFounderSnapshot(): FounderAnalyticsSnapshot {
  const project = getProject();
  const currentSlug = project?.slug ?? null;
  const leads = readLeadsState().leads;
  const intents = listPaymentIntents();
  const slugSet = collectSlugs(leads, intents, currentSlug);
  const projectsWithLeads = countProjectsWithLeads(leads);
  const billing = getBillingState();
  const trialExpired = billing != null && !isTrialActive() ? 1 : 0;
  const trialExpiredProjects = trialExpired;
  const intentSlugs = new Set(intents.map((i) => i.projectSlug.trim()).filter(Boolean));
  const upgradeStats = getUpgradeStats();
  const upgradeSets = collectUniqueUpgradeProjectSlugs(getUpgradeEvents());
  const uniqueUpgradeViewProjects = upgradeSets.uniqueUpgradeViewProjects.size;
  const uniqueUpgradeClickProjects = upgradeSets.uniqueUpgradeClickProjects.size;
  const uniqueUpgradeIntentProjects = upgradeSets.uniqueUpgradeIntentProjects.size;
  const sitesCreated = slugSet.size;

  return {
    uniqueProjectSlugs: sitesCreated,
    projectsWithLeads,
    trialExpired,
    uniqueUpgradeViewProjects,
    uniqueUpgradeClickProjects,
    uniqueUpgradeIntentProjects,
    upgradeViews: upgradeStats.upgrade_view,
    upgradeCtaClicks: upgradeStats.upgrade_cta_click,
    upgradeIntentConfirmed: upgradeStats.upgrade_intent_confirmed,
    paymentIntentsTotal: intents.length,
    paymentIntentUniqueProjects: intentSlugs.size,
    totalLeads: leads.length,
    avgLeadsPerProjectWithLeads: avgLeadsPerProject(projectsWithLeads, leads.length),
    recentLeads: byCreatedAtDesc(leads).slice(0, 5),
    recentIntents: byCreatedAtDesc(intents).slice(0, 5),
    leadsRate: conversionRatio(projectsWithLeads, sitesCreated),
    upgradeViewRate: upgradeFunnelRate(uniqueUpgradeViewProjects, trialExpiredProjects),
    upgradeClickRate: upgradeFunnelRate(uniqueUpgradeClickProjects, uniqueUpgradeViewProjects),
    upgradeIntentRate: upgradeFunnelRate(uniqueUpgradeIntentProjects, uniqueUpgradeClickProjects),
  };
}
