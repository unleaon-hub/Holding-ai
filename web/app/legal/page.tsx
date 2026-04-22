import { Reveal } from "@/components/reveal";

export default function LegalPage() {
  return (
    <main className="section-shell py-16 md:py-24">
      <Reveal>
        <p className="eyebrow">Legal</p>
        <h1 className="mt-4 text-4xl font-light text-white md:text-6xl">
          Юридические документы
        </h1>
      </Reveal>

      <Reveal className="mt-8 grid gap-4 md:grid-cols-2">
        <article className="surface-card p-6">
          <h2 className="text-xl text-white">Пользовательское соглашение</h2>
          <p className="mt-3 text-zinc-300">
            Публичная оферта, порядок доступа к сервису и ограничение ответственности.
          </p>
        </article>
        <article className="surface-card p-6">
          <h2 className="text-xl text-white">Политика конфиденциальности</h2>
          <p className="mt-3 text-zinc-300">
            Обработка персональных данных, хранение событий и уведомления.
          </p>
        </article>
        <article className="surface-card p-6">
          <h2 className="text-xl text-white">DPA / безопасность данных</h2>
          <p className="mt-3 text-zinc-300">
            Режим доступа к CRM-данным и операционные меры защиты.
          </p>
        </article>
        <article className="surface-card p-6">
          <h2 className="text-xl text-white">Политика возвратов</h2>
          <p className="mt-3 text-zinc-300">
            Условия trial, отмены подписки и возврата оплаты по тарифам.
          </p>
        </article>
      </Reveal>
    </main>
  );
}
