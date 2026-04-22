import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { GrowthPlan } from "@/data/cabinet";
import { cn } from "@/lib/utils";

type GrowthPlanCardProps = {
  plan: GrowthPlan;
  className?: string;
};

export function GrowthPlanCard({ plan, className }: GrowthPlanCardProps) {
  return (
    <article
      className={cn(
        "surface-card flex h-full flex-col p-5 transition hover:-translate-y-0.5",
        className,
      )}
    >
      <p className="eyebrow">{plan.name}</p>
      <p className="mt-3 text-base font-light text-white">{plan.oneLiner}</p>
      <p className="mt-2 text-sm text-zinc-500">{plan.differentiator}</p>
      <p className="mt-3 text-sm text-zinc-400">{plan.coverage}</p>
      <div className="mt-6">
        <Link
          href={plan.href}
          className="inline-flex items-center gap-2 text-sm font-medium text-white"
        >
          {plan.cta}
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </article>
  );
}
