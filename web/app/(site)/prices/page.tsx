import Link from "next/link";
import { Reveal } from "@/components/reveal";

const plans = [
  {
    name: "SOLO",
    title: "Старт",
    price: "7 дней бесплатно → 990 ₽",
    points: ["1 ниша", "базовая CRM", "email/telegram уведомления"],
  },
  {
    name: "GROWTH",
    title: "100 страниц",
    price: "18 900 ₽",
    points: ["до 100 страниц", "автогенерация", "оптимизация конверсии"],
  },
  {
    name: "SCALE",
    title: "500 страниц",
    price: "79 900 ₽",
    points: ["до 500 страниц", "глубокая аналитика", "приоритетный rollout"],
  },
];

export default function PricesPage() {
  return (
    <main className="section-shell py-16 md:py-24">
      <Reveal>
        <p className="eyebrow">Тарифы</p>
        <h1 className="mt-4 text-4xl font-light text-white md:text-6xl">
          Модель роста по пакетам
        </h1>
      </Reveal>
      <Reveal className="mt-8 grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <article key={plan.name} className="surface-card p-7">
            <p className="text-sm tracking-[0.2em] text-zinc-300">{plan.name}</p>
            <h2 className="mt-3 text-2xl font-light text-white">{plan.title}</h2>
            <p className="mt-4 text-zinc-200">{plan.price}</p>
            <ul className="mt-5 space-y-2 text-sm text-zinc-300">
              {plan.points.map((point) => (
                <li key={point}>— {point}</li>
              ))}
            </ul>
          </article>
        ))}
      </Reveal>
      <Reveal className="mt-8">
        <Link
          href="/start"
          className="inline-flex rounded-full border border-white/18 bg-white/8 px-5 py-3 font-medium text-white transition hover:bg-white/14"
        >
          Выбрать тариф и запустить
        </Link>
      </Reveal>
    </main>
  );
}
