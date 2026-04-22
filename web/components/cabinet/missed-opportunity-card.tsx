import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { missedOpportunity } from "@/data/cabinet";
import { cn } from "@/lib/utils";

type MissedOpportunityCardProps = {
  className?: string;
};

export function MissedOpportunityCard({ className }: MissedOpportunityCardProps) {
  const m = missedOpportunity;

  return (
    <section
      className={cn(
        "surface-card border border-amber-500/20 bg-gradient-to-b from-amber-500/10 to-[#121212] p-5 md:p-6",
        className,
      )}
    >
      <p className="eyebrow text-amber-200/90">упущенная выгода</p>
      <h2 className="mt-3 text-xl font-light text-white md:text-2xl">
        До {m.extraLeadsEstimate} лидов в неделю, если развернуть охват
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-400">
        {m.reason}. {m.secondary}
      </p>
      <Link
        href={m.ctaHref}
        className="cta-pulse mt-6 inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/8 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/14"
      >
        {m.cta}
        <ArrowUpRight size={16} />
      </Link>
    </section>
  );
}
