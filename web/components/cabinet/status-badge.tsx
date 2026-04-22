import type { BusinessGrowthStatus, LeadStatus, PageRowStatus } from "@/data/cabinet";
import { leadStatusLabel, pageStatusLabel } from "@/data/cabinet";
import { cn } from "@/lib/utils";

const businessConfig: Record<
  BusinessGrowthStatus,
  { label: string; className: string }
> = {
  accelerated: {
    label: "Ускоренный рост",
    className: "border-emerald-500/30 bg-emerald-500/10 text-emerald-200",
  },
  stable: {
    label: "Стабильный рост",
    className: "border-white/15 bg-white/[0.06] text-zinc-100",
  },
  limited: {
    label: "Рост ограничен",
    className: "border-amber-500/35 bg-amber-500/10 text-amber-100",
  },
};

const leadTone: Record<LeadStatus, string> = {
  new: "border-white/22 bg-white/[0.1] text-zinc-100",
  contacted: "border-zinc-500/25 bg-zinc-500/10 text-zinc-200",
  negotiation: "border-amber-500/25 bg-amber-500/10 text-amber-100",
  deal: "border-white/20 bg-white/[0.12] text-white",
  closed: "border-white/8 bg-white/[0.04] text-zinc-500",
};

const pageTone: Record<PageRowStatus, string> = {
  excellent: "border-white/20 bg-white/[0.1] text-white",
  growing: "border-zinc-500/25 bg-zinc-500/8 text-zinc-200",
  agent_working: "border-amber-500/30 bg-amber-500/8 text-amber-100",
};

export type StatusBadgeProps =
  | {
      className?: string;
      kind: "business";
      status: BusinessGrowthStatus;
      labelOverride?: string;
    }
  | { className?: string; kind: "lead"; status: LeadStatus }
  | { className?: string; kind: "page"; status: PageRowStatus };

export function StatusBadge(props: StatusBadgeProps) {
  if (props.kind === "business") {
    const cfg = businessConfig[props.status];
    return (
      <span
        className={cn(
          "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium tracking-wide",
          cfg.className,
          props.className,
        )}
      >
        {props.labelOverride ?? cfg.label}
      </span>
    );
  }
  if (props.kind === "lead") {
    return (
      <span
        className={cn(
          "inline-flex max-w-full items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
          leadTone[props.status],
          props.className,
        )}
      >
        {leadStatusLabel[props.status]}
      </span>
    );
  }
  return (
    <span
      className={cn(
        "inline-flex max-w-full items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        pageTone[props.status],
        props.className,
      )}
    >
      {pageStatusLabel[props.status]}
    </span>
  );
}
