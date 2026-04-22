import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { potentialClientsInsight } from "@/data/cabinet";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

type DashboardPotentialClientsProps = {
  className?: string;
};

export function DashboardPotentialClients({ className }: DashboardPotentialClientsProps) {
  const d = potentialClientsInsight;

  return (
    <Reveal className={className}>
      <section className="surface-card p-5 md:p-6">
        <p className="eyebrow">потенциал</p>
        <h2 className="mt-2 text-xl font-light text-white md:text-2xl">{d.title}</h2>
        <ul className="mt-4 max-w-2xl space-y-2 text-left text-sm leading-relaxed text-zinc-500">
          {d.lines.map((line) => (
            <li key={line} className="flex gap-2.5">
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-500/90"
                aria-hidden
              />
              <span>{line}</span>
            </li>
          ))}
        </ul>
        <Link
          href={d.ctaHref}
          className={cn(
            "cta-pulse mt-6 inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/8",
            "px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/14",
          )}
        >
          {d.cta}
          <ArrowUpRight size={16} />
        </Link>
      </section>
    </Reveal>
  );
}
