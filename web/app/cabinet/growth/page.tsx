import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { GrowthPlanCard } from "@/components/cabinet/growth-plan-card";
import { cabinetPageIntros, growthContext, growthForecast, growthPlans } from "@/data/cabinet";

export const metadata: Metadata = { title: "Рост" };

export default function CabinetGrowthPage() {
  return (
    <main className="w-full max-w-6xl min-w-0">
      <Reveal>
        <p className="eyebrow">масштаб</p>
        <h1 className="section-title mt-2 text-3xl md:text-5xl">Рост</h1>
        <p className="section-lead mt-2 text-sm text-zinc-500 md:text-base">
          {cabinetPageIntros.growth}
        </p>
      </Reveal>

      <Reveal className="mt-8">
        <div className="surface-card p-5 md:p-6">
          <p className="eyebrow">сейчас</p>
          <h2 className="mt-2 text-2xl font-light text-white">
            Пакет {growthContext.currentPackage.name}
          </h2>
          <p className="mt-1 text-sm text-zinc-500">{growthContext.currentPackage.tagline}</p>
        </div>
      </Reveal>

      <section className="mt-8">
        <h2 className="text-lg font-light text-white">Ограничения</h2>
        <ul className="mt-3 space-y-2 text-sm text-zinc-400">
          {growthContext.limitations.map((line) => (
            <li key={line} className="flex gap-2">
              <span className="text-zinc-600">—</span> {line}
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {growthPlans.map((plan) => (
          <GrowthPlanCard key={plan.id} plan={plan} />
        ))}
      </div>

      <Reveal className="mt-10">
        <div className="surface-subtle p-5 md:p-6">
          <p className="eyebrow">модель</p>
          <h2 className="mt-2 text-lg font-light text-white">Как может измениться результат</h2>
          <p className="mt-1 text-sm text-amber-200/80">{growthForecast.disclaimer}</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {growthForecast.items.map((row) => (
              <div key={row.label} className="surface-card p-3">
                <p className="text-xs text-zinc-500">{row.label}</p>
                <p className="mt-1 text-sm text-zinc-200">
                  {row.before} → {row.after}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="mt-8 flex flex-wrap gap-2">
        {growthPlans.map((p) => (
          <Link
            key={p.id}
            href={p.href}
            className="rounded-full border border-white/18 bg-white/8 px-4 py-2 text-sm text-white"
          >
            {p.cta}
          </Link>
        ))}
      </div>
    </main>
  );
}
