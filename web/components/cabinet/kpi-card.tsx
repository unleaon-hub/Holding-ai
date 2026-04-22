import type { KpiValue } from "@/data/cabinet";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";
import Link from "next/link";

type KpiCardProps = {
  data: KpiValue;
  className?: string;
  /** Ссылка на раздел кабинета, к которому относится показатель. */
  href?: string;
};

export function KpiCard({ data, className, href }: KpiCardProps) {
  const body = (
    <>
      <p className="text-sm text-zinc-500">{data.label}</p>
      <p className="mt-2 text-2xl font-light tracking-tight text-white md:text-3xl">
        {data.value}
      </p>
      <div className="mt-2 flex items-center gap-1.5 text-sm">
        {data.deltaUp ? (
          <TrendingUp className="text-emerald-400/90" size={16} />
        ) : (
          <TrendingDown className="text-rose-400/90" size={16} />
        )}
        <span className="text-zinc-400">
          {data.deltaLabel}
          {data.hint ? ` · ${data.hint}` : null}
        </span>
      </div>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          "surface-card interactive-card block p-4 no-underline transition md:p-5",
          "hover:border-white/16 hover:bg-white/[0.04]",
          className,
        )}
      >
        {body}
      </Link>
    );
  }

  return <article className={cn("surface-card interactive-card p-4 md:p-5", className)}>{body}</article>;
}
