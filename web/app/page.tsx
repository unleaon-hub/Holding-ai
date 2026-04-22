import Link from "next/link";
import {
  ArrowRight,
  ChartNoAxesCombined,
  CircleDollarSign,
  Layers3,
  TrendingUp,
  Users,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { HoverCard } from "@/components/hover-card";

const faqItems = [
  {
    q: "Это конструктор сайтов?",
    a: "Нет. Это система генерации заявок: сайт + CRM + механика роста.",
  },
  {
    q: "Нужен ли программист для запуска?",
    a: "Нет, базовый запуск делается через input и форму старта.",
  },
  {
    q: "Сколько времени до первого сайта?",
    a: "Первый вариант создается за 60 секунд в режиме демо-пайплайна.",
  },
  {
    q: "Куда приходят заявки?",
    a: "В CRM, а также в Telegram и email по выбранной схеме уведомлений.",
  },
  {
    q: "Можно ли работать без рекламы?",
    a: "Да. Система поддерживает стратегию органического притока через страницы.",
  },
  {
    q: "Если у меня уже есть сайт, это подойдет?",
    a: "Да, можно подключить CRM-слой и запускать новые страницы поверх текущей структуры.",
  },
  {
    q: "Какая логика продаж внутри?",
    a: "Структура Problem-Solution-Profit и итерации по конверсионным метрикам.",
  },
  {
    q: "Есть ли бесплатный период?",
    a: "Да, 7 дней бесплатного доступа без привязки карты.",
  },
  {
    q: "Можно ли масштабировать до сотен страниц?",
    a: "Да, для этого есть тарифы Growth и Scale.",
  },
  {
    q: "Что показывается в дашборде?",
    a: "Лиды, стоимость лида, рост, страницы и оценка упущенной выгоды.",
  },
];

const SHOW_PREVIEW_BLOCK = false;

export default function HomePage() {
  return (
    <main>
      {SHOW_PREVIEW_BLOCK && (
        <section className="section-shell py-24 md:py-32">
          <Reveal className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="eyebrow">Смотрите, как это работает</p>
              <h1 className="section-title mt-4 max-w-5xl">
                <span className="title-dim">Этот сайт был</span> создан за 60 секунд
              </h1>
              <p className="section-lead max-w-2xl">
                Сайт, всплывающая заявка и CRM собираются в единую систему
                генерации клиентов и управляемого роста.
              </p>
              <Link
                href="/start"
                className="cta-pulse mt-8 inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/8 px-5 py-3 font-medium text-white transition hover:bg-white/14"
              >
                Создать такой же
                <ArrowRight size={17} />
              </Link>
            </div>
            <div className="md:col-span-5 md:pt-6">
              <div className="surface-subtle relative overflow-hidden rounded-xl p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                  Product preview
                </p>
                <div className="mt-4 space-y-3 text-sm">
                  <div className="rounded-lg border border-white/10 bg-[#0d0d0d] p-3 text-zinc-200">
                    Сайт: юрист Алматы
                  </div>
                  <div className="rounded-lg border border-white/20 bg-[#1a1a1a] p-3 text-zinc-200">
                    Новая заявка: «Нужна консультация сегодня»
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="rounded-lg border border-white/10 bg-[#101010] p-3 text-zinc-300">
                      Лиды: 18
                    </div>
                    <div className="rounded-lg border border-white/10 bg-[#101010] p-3 text-zinc-300">
                      CPL: 740 ₽
                    </div>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-[#0d0d0d] p-3 text-zinc-300">
                    CRM: рост +22% за 2 недели
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      <section className="section-shell py-14 md:py-20">
        <Reveal className="max-w-6xl">
          <p className="eyebrow">Hero</p>
          <h2 className="section-title mt-4 max-w-5xl">
            <span className="title-dim">Напишите пару слов</span> о вашем бизнесе.
            {" "}Получите сайт + CRM <span className="title-soft">за 60 секунд.</span>
          </h2>
          <p className="section-lead text-lg">
            Система анализирует конкурентов, создает структуру и запускает сайт,
            который приносит заявки.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Link
              href="/start"
              className="cta-pulse inline-flex rounded-full border border-white/18 bg-white/8 px-5 py-3 font-medium text-white transition hover:bg-white/14"
            >
              Создать сайт бесплатно
            </Link>
            <p className="text-sm text-zinc-400">
              7 дней бесплатно · без карты · запуск за 1 минуту
            </p>
          </div>
        </Reveal>
        <Reveal className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            ["5-10 сек", "чтобы понять ценность продукта"],
            ["60 сек", "до первого готового результата"],
            ["24/7", "контур роста и обработки лидов"],
          ].map(([k, v]) => (
            <HoverCard key={k} className="surface-subtle p-5">
              <p className="text-3xl font-light text-white">{k}</p>
              <p className="mt-2 text-sm text-zinc-400">{v}</p>
            </HoverCard>
          ))}
        </Reveal>
      </section>

      <section className="section-shell py-12">
        <Reveal className="surface-card p-7 md:p-10">
          <p className="eyebrow">Что вы получаете</p>
          <h3 className="section-title mt-4">
            Готовый инструмент для получения заявок
          </h3>
          <div className="mt-7 grid gap-3 md:grid-cols-2">
            {[
              {
                icon: ChartNoAxesCombined,
                text: "сайт с высокой конверсией",
              },
              { icon: Users, text: "встроенная CRM" },
              { icon: CircleDollarSign, text: "заявки в Telegram / email" },
              { icon: Layers3, text: "готовая логика продаж" },
              { icon: TrendingUp, text: "система роста клиентов" },
            ].map((line) => (
              <HoverCard
                key={line.text}
                className="surface-subtle flex items-center gap-3 px-4 py-3"
              >
                <line.icon size={18} className="text-zinc-200" />
                <span className="text-zinc-200">{line.text}</span>
              </HoverCard>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="section-shell py-12">
        <Reveal className="grid gap-6 md:grid-cols-2">
          <HoverCard className="surface-card p-7">
            <p className="eyebrow">Боль</p>
            <h3 className="section-title mt-4 !text-[2rem]">
              Почему сайты не приносят клиентов
            </h3>
            <ul className="mt-5 space-y-3 text-zinc-300">
              <li>— делают «красиво», а не эффективно</li>
              <li>— не учитывают конкурентов</li>
              <li>— требуют доработок</li>
              <li>— зависят от дорогой рекламы</li>
            </ul>
            <p className="mt-6 text-white">В итоге сайт есть — заявок нет.</p>
          </HoverCard>
          <HoverCard className="surface-card p-7">
            <p className="eyebrow">Решение</p>
            <h3 className="section-title mt-4 !text-[2rem]">
              Система делает это за вас
            </h3>
            <ol className="mt-5 space-y-3 text-zinc-300">
              <li>1. Вы пишете нишу</li>
              <li>2. Система анализирует рынок</li>
              <li>3. Вы получаете сайт + CRM</li>
            </ol>
          </HoverCard>
        </Reveal>
      </section>

      <section className="section-shell py-12">
        <Reveal className="surface-card p-7 md:p-10">
          <p className="eyebrow">Ключевой блок</p>
          <h3 className="section-title mt-4">
            Как вы получаете клиентов
          </h3>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <HoverCard className="surface-subtle p-5">
              <p className="text-white">Вариант 1</p>
              <p className="mt-2 text-zinc-300">
                Вы приводите трафик → сайт конвертит.
              </p>
            </HoverCard>
            <HoverCard className="surface-subtle p-5">
              <p className="text-white">Вариант 2</p>
              <p className="mt-2 text-zinc-300">
                Система создает страницы → клиенты приходят сами.
              </p>
            </HoverCard>
          </div>
          <p className="mt-6 text-zinc-200">
            Можно начать с простого и перейти к автоматическому потоку.
          </p>
        </Reveal>
      </section>

      <section className="section-shell py-12">
        <Reveal className="grid gap-6 md:grid-cols-2">
          <HoverCard className="surface-card p-7">
            <p className="eyebrow">Что делает система</p>
            <ul className="mt-5 space-y-3 text-zinc-300">
              <li>— анализирует конкурентов</li>
              <li>— создает страницы</li>
              <li>— усиливает слабые</li>
              <li>— увеличивает поток заявок</li>
            </ul>
          </HoverCard>
          <HoverCard className="surface-card p-7">
            <p className="eyebrow">Масштаб</p>
            <h3 className="section-title mt-4 !text-[2rem]">
              Почему одного сайта недостаточно
            </h3>
            <p className="mt-5 text-zinc-300">
              Больше страниц = больше точек входа для клиентов и выше объем
              прогнозируемого потока.
            </p>
          </HoverCard>
        </Reveal>
      </section>

      <section className="section-shell py-12" id="prices">
        <Reveal>
          <p className="eyebrow">Тарифы</p>
          <div className="mt-4 grid gap-5 md:grid-cols-3">
            {[
              { n: "SOLO", t: "Старт", p: "7 дней бесплатно → 990 ₽" },
              { n: "GROWTH", t: "100 страниц", p: "18 900 ₽" },
              { n: "SCALE", t: "500 страниц", p: "79 900 ₽" },
            ].map((item) => (
              <HoverCard key={item.n} className="surface-card p-7">
                <p className="text-sm tracking-[0.2em] text-zinc-300">{item.n}</p>
                <h3 className="mt-3 text-2xl font-light text-white">{item.t}</h3>
                <p className="mt-4 text-zinc-300">{item.p}</p>
              </HoverCard>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="section-shell py-12">
        <Reveal className="surface-card p-7 md:p-10">
          <p className="eyebrow">CRM Preview</p>
          <h3 className="section-title mt-4">
            Вы могли получить больше клиентов
          </h3>
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {[
              ["Заявки", "87"],
              ["Стоимость лида", "112 ₽"],
              ["Рост", "+64%"],
              ["Страницы", "100"],
            ].map(([k, v]) => (
              <HoverCard key={k} className="surface-subtle p-5">
                <p className="text-sm text-zinc-400">{k}</p>
                <p className="mt-2 text-2xl font-light text-white">{v}</p>
              </HoverCard>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="section-shell py-12">
        <Reveal className="surface-card p-7">
          <p className="eyebrow">Упущенная выгода</p>
          <h3 className="section-title mt-4 !text-[2.2rem]">
            Вы теряете клиентов прямо сейчас
          </h3>
          <p className="section-lead">
            Пока поток не управляется системой, каждый день теряются обращения,
            которые могли стать оплаченной выручкой.
          </p>
        </Reveal>
      </section>

      <section className="section-shell py-12">
        <Reveal className="surface-card p-7">
          <p className="eyebrow">Автопилот</p>
          <p className="section-title mt-3 !text-[2rem]">Система работает без вас:</p>
          <ul className="mt-4 space-y-2 text-zinc-300">
            <li>— улучшает</li>
            <li>— ищет</li>
            <li>— увеличивает заявки</li>
          </ul>
        </Reveal>
      </section>

      <section className="section-shell py-12">
        <Reveal className="surface-card p-7 md:p-10">
          <p className="eyebrow">FAQ</p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {faqItems.map((faq) => (
              <details key={faq.q} className="faq-item surface-subtle interactive-card p-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-white">
                  <span>{faq.q}</span>
                  <span className="faq-toggle text-zinc-400" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-4xl text-zinc-300">{faq.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="section-shell py-20 pb-28">
        <Reveal className="mx-auto max-w-5xl text-center">
          <p className="eyebrow">Финальный CTA</p>
          <h3 className="section-title mt-4">
            Создать сайт бесплатно
          </h3>
          <Link
            href="/start"
            className="cta-pulse mt-8 inline-flex rounded-full border border-white/16 bg-white/8 px-7 py-3.5 text-base font-medium text-white transition hover:bg-white/14"
          >
            Перейти к запуску
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
