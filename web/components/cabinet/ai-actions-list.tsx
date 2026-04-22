import { CheckCircle2 } from "lucide-react";
import { aiActionsToday } from "@/data/cabinet";
import { Reveal } from "@/components/reveal";

type AiActionsListProps = {
  className?: string;
};

export function AiActionsList({ className }: AiActionsListProps) {
  return (
    <section className={className}>
      <p className="eyebrow">сегодня</p>
      <h2 className="mt-2 text-lg font-light text-white md:text-xl">Что система сделала сегодня</h2>
      <p className="mt-1 text-sm text-zinc-500">Коротко по шагам</p>
      <ul className="mt-4 grid gap-3 md:grid-cols-2">
        {aiActionsToday.map((action) => (
          <li key={action.title}>
            <Reveal>
              <div className="surface-card flex h-full flex-col gap-1 p-4">
                <div className="flex items-center gap-2 text-sm text-white">
                  <CheckCircle2 className="shrink-0 text-emerald-400/80" size={16} />
                  {action.title}
                </div>
                <p className="pl-6 text-sm leading-relaxed text-zinc-500">{action.result}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
