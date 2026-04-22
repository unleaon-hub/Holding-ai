import Link from "next/link";
import { Reveal } from "@/components/reveal";

const posts = [
  {
    slug: "why-site-without-crm-fails",
    title: "Почему сайт без CRM не дает предсказуемый рост",
    excerpt: "Где теряются лиды и как закрыть разрыв между маркетингом и продажами.",
  },
  {
    slug: "seo-pages-vs-single-landing",
    title: "Один лендинг против кластера страниц",
    excerpt: "Когда масштаб через страницы дает кратный рост входящего потока.",
  },
  {
    slug: "cpl-control-system",
    title: "Как контролировать CPL через продуктовую структуру",
    excerpt: "Система метрик для owner и маркетолога без ручного хаоса.",
  },
];

export default function BlogPage() {
  return (
    <main className="section-shell py-16 md:py-24">
      <Reveal>
        <p className="eyebrow">Blog</p>
        <h1 className="mt-4 text-4xl font-light text-white md:text-6xl">
          База знаний AI Site Engine
        </h1>
      </Reveal>

      <Reveal className="mt-8 space-y-4">
        {posts.map((post) => (
          <article key={post.slug} className="surface-card p-6">
            <h2 className="text-2xl font-light text-white">{post.title}</h2>
            <p className="mt-3 text-zinc-300">{post.excerpt}</p>
            <Link href="/start" className="mt-4 inline-block text-sm text-zinc-200">
              Применить в проекте →
            </Link>
          </article>
        ))}
      </Reveal>
    </main>
  );
}
