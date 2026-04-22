import Link from "next/link";
import { ArrowUpRight, Clock3, DollarSign } from "lucide-react";
import type { LandingPackage } from "@/lib/landing-packages";
import { CtaButton } from "@/components/cta-button";

type PackageCardProps = {
  item: LandingPackage;
};

export function PackageCard({ item }: PackageCardProps) {
  return (
    <article className="glass-card flex h-full flex-col gap-5 rounded-2xl p-7">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.22em] text-zinc-300">
          {item.bestFor}
        </p>
        <h3 className="text-2xl font-semibold text-slate-900">{item.name}</h3>
        <p className="text-sm leading-6 text-slate-600">{item.subheadline}</p>
      </div>

      <dl className="grid grid-cols-1 gap-3 text-sm text-slate-700">
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-zinc-200" />
          <dt className="text-slate-500">от</dt>
          <dd className="font-medium text-slate-900">{item.priceFrom}</dd>
        </div>
        <div className="flex items-center gap-2">
          <Clock3 className="h-4 w-4 text-zinc-200" />
          <dt className="text-slate-500">срок</dt>
          <dd className="font-medium text-slate-900">{item.delivery}</dd>
        </div>
      </dl>

      <ul className="space-y-2 text-sm leading-6 text-slate-700">
        {item.outcomes.slice(0, 2).map((point) => (
          <li key={point} className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-zinc-200" />
            <span>{point}</span>
          </li>
        ))}
      </ul>

      <CtaButton
        asChild
        eventName="select_package_click"
        eventContext={item.slug}
        className="mt-auto w-full justify-center"
      >
        <Link href={`/packages/${item.slug}`} className="gap-2">
          Открыть пакет
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </CtaButton>
    </article>
  );
}
