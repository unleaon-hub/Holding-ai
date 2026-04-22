import { currentSubscription, subscriptionProgressLine } from "@/data/cabinet";
import { cn } from "@/lib/utils";

type SubscriptionTimerProps = {
  className?: string;
};

export function SubscriptionTimer({ className }: SubscriptionTimerProps) {
  const s = currentSubscription;

  return (
    <div className={cn("surface-subtle p-4 md:p-5", className)}>
      <p className="eyebrow">подписка</p>
      <p className="mt-2 text-2xl font-light text-white md:text-3xl">
        Осталось {s.daysLeft} дн. до списания
      </p>
      <p className="mt-1 text-sm text-zinc-500">
        Следующий платёж: {s.nextAmount} · {s.nextChargeDate}
      </p>
      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full rounded-full bg-gradient-to-r from-zinc-100/30 to-zinc-100/10"
          style={{ width: `${s.progressPercent}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-zinc-500">{subscriptionProgressLine(s.progressPercent)}</p>
    </div>
  );
}
