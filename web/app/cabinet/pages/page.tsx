import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { PagePerformanceCard } from "@/components/cabinet/page-performance-card";
import { PagesDistribution } from "@/components/cabinet/pages-distribution";
import { PagesTable } from "@/components/cabinet/pages-table";
import { cabinetPageIntros, pagesPerformance, pagesPotentialBlock } from "@/data/cabinet";

export const metadata: Metadata = { title: "Страницы" };

export default function CabinetPagesIndexPage() {
  return (
    <main className="w-full max-w-6xl min-w-0">
      <Reveal>
        <p className="eyebrow">эффективность</p>
        <h1 className="section-title mt-2 text-3xl md:text-5xl">Ваши страницы</h1>
        <p className="section-lead mt-2 text-sm text-zinc-500 md:text-base">
          {cabinetPageIntros.pages}
        </p>
      </Reveal>

      <section className="mt-8">
        <h2 className="text-lg font-light text-white">Сводка</h2>
        <PagesTable rows={pagesPerformance} />
        <div className="mt-3 space-y-3 md:hidden">
          {pagesPerformance.map((row) => (
            <PagePerformanceCard key={row.path} row={row} />
          ))}
        </div>
      </section>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <PagesDistribution />
        <Reveal>
          <div className="surface-card h-full border border-white/8 p-5">
            <p className="eyebrow">потенциал</p>
            <h2 className="mt-2 text-lg font-light text-white">Рост за счёт страниц</h2>
            <p className="mt-2 text-sm text-zinc-500">{pagesPotentialBlock.copy}</p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-400">
              {pagesPotentialBlock.tiers.map((t) => (
                <li key={t.pages}>
                  <span className="text-white">+{t.pages} стр.</span> — {t.effect}
                </li>
              ))}
            </ul>
            <Link
              href={pagesPotentialBlock.ctaHref}
              className="cta-pulse mt-5 inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/8 px-4 py-2 text-sm text-white"
            >
              {pagesPotentialBlock.cta}
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
