import { currentSubscription } from "@/data/cabinet";
import { cn } from "@/lib/utils";

type PaymentSummaryProps = {
  className?: string;
};

export function PaymentSummary({ className }: PaymentSummaryProps) {
  const s = currentSubscription;

  return (
    <section className={cn("surface-card p-5 md:p-6", className)}>
      <p className="eyebrow">текущий тариф</p>
      <h2 className="mt-2 text-2xl font-light text-white md:text-3xl">
        {s.plan} · {s.priceMonthly}
      </h2>
      <p className="mt-2 text-sm text-zinc-500">{s.priceYearlyHint}</p>
      <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-100">
        {s.statusLabel}
      </p>
    </section>
  );
}
