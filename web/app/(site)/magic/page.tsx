import Link from "next/link";
import { Reveal } from "@/components/reveal";

export default function MagicPage() {
  return (
    <main className="section-shell py-16 md:py-24">
      <Reveal className="surface-card p-8 md:p-12">
        <p className="eyebrow">Magic</p>
        <h1 className="mt-4 text-4xl font-light text-white md:text-6xl">
          Смотрите, как AI Site Engine собирает систему за 60 секунд
        </h1>
        <p className="mt-5 max-w-3xl text-zinc-300">
          Это не просто генерация страницы. Вы получаете связку: сайт, CRM,
          трекинг заявок и контур роста.
        </p>
      </Reveal>

      <Reveal className="mt-8 grid gap-6 md:grid-cols-3">
        <article className="surface-subtle p-6">
          <p className="text-sm text-zinc-400">Шаг 1</p>
          <h2 className="mt-2 text-xl text-white">Ввод ниши и гео</h2>
          <p className="mt-3 text-zinc-300">Например: «стоматолог, Астана».</p>
        </article>
        <article className="surface-subtle p-6">
          <p className="text-sm text-zinc-400">Шаг 2</p>
          <h2 className="mt-2 text-xl text-white">Анализ конкурентов</h2>
          <p className="mt-3 text-zinc-300">Структура, оффер, точки роста.</p>
        </article>
        <article className="surface-subtle p-6">
          <p className="text-sm text-zinc-400">Шаг 3</p>
          <h2 className="mt-2 text-xl text-white">Сайт + CRM</h2>
          <p className="mt-3 text-zinc-300">Запуск, лиды, метрики и масштаб.</p>
        </article>
      </Reveal>

      <Reveal className="mt-8">
        <Link
          href="/start"
          className="cta-pulse inline-flex rounded-full border border-white/18 bg-white/8 px-5 py-3 font-medium text-white transition hover:bg-white/14"
        >
          Запустить демо
        </Link>
      </Reveal>
    </main>
  );
}
