import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaButton } from "@/components/cta-button";
import { getLandingPackage, packageSlugs } from "@/lib/landing-packages";

type PackagePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return packageSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PackagePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const item = getLandingPackage(resolvedParams.slug);

  if (!item) {
    return {
      title: "Пакет не найден",
    };
  }

  return {
    title: `${item.name} - пакет`,
    description: item.subheadline,
    keywords: item.seoKeywords,
    openGraph: {
      title: `${item.name} | Holding AI`,
      description: item.subheadline,
      type: "website",
      url: `/packages/${item.slug}`,
    },
  };
}

export default async function PackagePage({ params }: PackagePageProps) {
  const resolvedParams = await params;
  const item = getLandingPackage(resolvedParams.slug);

  if (!item) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${item.name} пакет`,
    description: item.subheadline,
    areaServed: "Россия и СНГ",
    provider: {
      "@type": "Organization",
      name: "Holding AI",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: item.priceFrom.replace(/[^0-9]/g, ""),
      availability: "https://schema.org/LimitedAvailability",
    },
  };

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16 md:px-12 md:py-24">
      <section className="glass-card rounded-3xl p-8 md:p-12">
        <p className="text-xs uppercase tracking-[0.24em] text-zinc-300">
          Карточка пакета
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-950 md:text-5xl">
          {item.headline}
        </h1>
        <p className="mt-4 max-w-3xl text-slate-600">{item.subheadline}</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <article className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
              Пакет
            </p>
            <p className="mt-1 text-lg font-semibold text-slate-900">{item.name}</p>
          </article>
          <article className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
              Стоимость
            </p>
            <p className="mt-1 text-lg font-semibold text-slate-900">
              {item.priceFrom}
            </p>
          </article>
          <article className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
              Срок
            </p>
            <p className="mt-1 text-lg font-semibold text-slate-900">
              {item.delivery}
            </p>
          </article>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <article className="glass-card rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-slate-950">Проблема</h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
            {item.painPoints.map((point) => (
              <li key={point} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-zinc-200" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </article>
        <article className="glass-card rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-slate-950">
            Решение + Выгода
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
            {item.outcomes.map((outcome) => (
              <li key={outcome} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-zinc-200" />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {item.socialProof.map((proof) => (
          <article key={proof.metric} className="glass-card rounded-2xl p-6">
            <p className="text-4xl font-semibold text-zinc-100">{proof.metric}</p>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              {proof.description}
            </p>
          </article>
        ))}
      </section>

      <section className="glass-card rounded-2xl p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-zinc-300">
          Ограничение набора
        </p>
        <p className="mt-3 text-base text-slate-700">{item.scarcityNote}</p>
        <div className="mt-6">
          <CtaButton
            eventName="package_book_call_click"
            eventContext={item.slug}
            className="w-full md:w-auto"
          >
            Забронировать стратегический звонок
          </CtaButton>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
