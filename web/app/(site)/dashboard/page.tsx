import { Reveal } from "@/components/reveal";

const leads = [
  { id: "L-1293", channel: "SEO", name: "ТОО Astana Legal", status: "Новый" },
  { id: "L-1294", channel: "Ads", name: "iDent Clinic", status: "В работе" },
  { id: "L-1295", channel: "Organic", name: "FinTax Group", status: "Новый" },
];

export default function DashboardPage() {
  return (
    <main className="section-shell py-16 md:py-24">
      <Reveal>
        <p className="eyebrow">Dashboard demo</p>
        <h1 className="mt-4 text-4xl font-light text-white md:text-6xl">
          Контур заявок и роста
        </h1>
      </Reveal>

      <Reveal className="mt-8 grid gap-4 md:grid-cols-5">
        {[
          ["Лиды", "68"],
          ["Стоимость лида", "720 ₽"],
          ["Рост", "+27%"],
          ["Страницы", "146"],
          ["Упущенная выгода", "184 000 ₽"],
        ].map(([title, value]) => (
          <article key={title} className="surface-card p-5">
            <p className="text-sm text-zinc-400">{title}</p>
            <p className="mt-2 text-2xl font-light text-white">{value}</p>
          </article>
        ))}
      </Reveal>

      <Reveal className="mt-8 surface-card p-6">
        <div className="mb-4 flex items-center gap-3">
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white lead-ping" />
          <p className="text-sm text-zinc-300">
            Новая заявка появилась 14 секунд назад
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <thead>
              <tr className="text-left text-zinc-400">
                <th className="border-b border-white/10 pb-3">ID</th>
                <th className="border-b border-white/10 pb-3">Канал</th>
                <th className="border-b border-white/10 pb-3">Клиент</th>
                <th className="border-b border-white/10 pb-3">Статус</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="text-zinc-200">
                  <td className="border-b border-white/5 py-3">{lead.id}</td>
                  <td className="border-b border-white/5 py-3">{lead.channel}</td>
                  <td className="border-b border-white/5 py-3">{lead.name}</td>
                  <td className="border-b border-white/5 py-3">{lead.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </main>
  );
}
