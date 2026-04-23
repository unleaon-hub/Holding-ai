import type { Metadata } from "next";
import { FounderAnalyticsDashboard } from "@/components/admin/founder-analytics-dashboard";

export const metadata: Metadata = {
  title: "Founder analytics",
};

export default function AdminFounderAnalyticsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl min-w-0 px-4 py-10 md:px-6 md:py-14">
      <p className="eyebrow">Admin</p>
      <h1 className="section-title mt-2 text-3xl md:text-4xl">Аналитика продукта</h1>
      <p className="section-lead mt-3 max-w-2xl text-base text-zinc-400">
        Воронка по данным в этом браузере: site-session, лиды, billing, payment intent. Без backend и внешних сервисов.
      </p>
      <div className="mt-10">
        <FounderAnalyticsDashboard />
      </div>
    </main>
  );
}
