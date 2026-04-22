import { systemWorkingForYou } from "@/data/cabinet";
import { Reveal } from "@/components/reveal";

type DashboardSystemBlockProps = {
  className?: string;
};

export function DashboardSystemBlock({ className }: DashboardSystemBlockProps) {
  const d = systemWorkingForYou;

  return (
    <Reveal className={className}>
      <section className="surface-card p-5 md:p-6">
        <p className="eyebrow">система</p>
        <h2 className="mt-2 text-xl font-light text-white md:text-2xl">{d.title}</h2>
        <ul className="mt-4 space-y-2.5 text-left text-sm leading-relaxed text-zinc-400">
          {d.items.map((line) => (
            <li key={line} className="flex gap-2.5">
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-500/90"
                aria-hidden
              />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </section>
    </Reveal>
  );
}
