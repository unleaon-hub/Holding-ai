import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { PaymentSummary } from "@/components/cabinet/payment-summary";
import { SubscriptionTimer } from "@/components/cabinet/subscription-timer";
import {
  cabinetApi,
  cabinetPageIntros,
  paymentActions,
  paymentHistory,
  paymentHistoryStatusPresentation,
} from "@/data/cabinet";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Оплата" };

export default function CabinetPaymentPage() {
  return (
    <main className="w-full max-w-4xl min-w-0">
      <Reveal>
        <p className="eyebrow">биллинг</p>
        <h1 className="section-title mt-2 text-3xl md:text-5xl">Оплата</h1>
        <p className="section-lead mt-2 text-sm text-zinc-500 md:text-base">
          {cabinetPageIntros.payment}
        </p>
      </Reveal>

      <div className="mt-8 space-y-4">
        <PaymentSummary />
        <SubscriptionTimer />
      </div>

      <Reveal className="mt-6">
        <p className="eyebrow">действия</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {paymentActions.map((a) => (
            <button
              key={a.id}
              type="button"
              className="rounded-full border border-white/12 bg-white/[0.05] px-4 py-2 text-sm text-zinc-100"
            >
              {a.label}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-zinc-600">{cabinetApi.billingRenew}</p>
      </Reveal>

      <section className="mt-10">
        <h2 className="text-lg font-light text-white">История</h2>
        <div className="mt-3 overflow-x-auto rounded-xl border border-white/8">
          <table className="w-full min-w-[20rem] border-collapse text-left text-sm sm:min-w-[28rem]">
            <thead>
              <tr className="border-b border-white/8 text-zinc-500">
                <th className="px-4 py-3">Дата</th>
                <th className="px-4 py-3">Сумма</th>
                <th className="px-4 py-3">Статус</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((row) => {
                const ui = paymentHistoryStatusPresentation[row.status];
                return (
                  <tr key={row.id} className="border-b border-white/5">
                    <td className="px-4 py-3 text-zinc-300">{row.date}</td>
                    <td className="px-4 py-3 text-zinc-200">{row.amount}</td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "inline-flex rounded-full border px-2.5 py-0.5 text-xs",
                          ui.badgeClassName,
                        )}
                      >
                        {ui.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
