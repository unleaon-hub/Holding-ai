"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { getProject, isRegistered, setUser } from "@/lib/site-session";

function safeNext(raw: string | null): string {
  if (raw && raw.startsWith("/") && !raw.startsWith("//") && !raw.includes(":")) {
    return raw;
  }
  return "/cabinet";
}

// TODO: POST /api/claim, редирект с токеном
export function ClaimPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = safeNext(searchParams.get("next"));
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [noProject, setNoProject] = useState(false);

  const afterSaveBullets = [
    "доступ к CRM с заявками",
    "возможность редактировать сайт",
    "контроль над потоком клиентов",
  ];

  useLayoutEffect(() => {
    if (!getProject()) {
      setNoProject(true);
    }
  }, []);

  useEffect(() => {
    if (isRegistered() && getProject()) {
      router.replace(next);
    }
  }, [router, next]);

  if (noProject) {
    return (
      <main className="section-shell py-16 md:py-24">
        <section className="surface-card mx-auto max-w-md p-8 text-center">
          <p className="eyebrow">сайт</p>
          <h1 className="mt-2 text-2xl font-light text-white">Сначала создайте сайт</h1>
          <p className="mt-2 text-sm text-zinc-500">Без проекта нечего сохранять в кабинете.</p>
          <Link
            href="/start"
            className="cta-pulse mt-6 inline-flex w-full items-center justify-center rounded-full border border-white/18 bg-white/8 py-3 text-sm font-medium text-white"
          >
            Создать сайт
          </Link>
        </section>
      </main>
    );
  }

  if (isRegistered() && getProject()) {
    return (
      <main className="section-shell flex min-h-[50vh] items-center justify-center py-16">
        <p className="text-sm text-zinc-500">Перенаправляем…</p>
      </main>
    );
  }

  return (
    <main className="section-shell py-16 md:py-24">
      <section className="surface-card mx-auto max-w-md p-8 md:p-10">
        <p className="eyebrow">/claim</p>
        <h1 className="mt-3 text-3xl font-light text-white md:text-4xl">Сохраните ваш сайт</h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-500">
          Ваш сайт уже готов. Сохраните его, чтобы не потерять и начать получать заявки
        </p>
        <p className="mt-6 text-left text-sm text-zinc-400">После сохранения вы получите:</p>
        <ul className="mt-2 space-y-2.5 text-left text-sm leading-relaxed text-zinc-400">
          {afterSaveBullets.map((line) => (
            <li key={line} className="flex gap-2.5">
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-500/90"
                aria-hidden
              />
              <span>{line}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs leading-relaxed text-zinc-600">
          Без сохранения сайт не будет доступен позже
        </p>
        <p className="mt-2 text-sm leading-relaxed text-zinc-500">
          Данные в этом браузере до подключения сервера; после — синхронизация с API.
        </p>
        <form
          className="mt-8 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (!getProject() || !name.trim() || !email.trim()) {
              return;
            }
            setUser(name.trim(), email.trim());
            router.replace(next);
          }}
        >
          <label className="block text-left">
            <span className="text-sm text-zinc-300">Имя</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
              className="mt-2 h-11 w-full rounded-xl border border-white/10 bg-[#101010] px-3 text-white focus:border-white/35 focus:outline-none"
            />
          </label>
          <label className="block text-left">
            <span className="text-sm text-zinc-300">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="mt-2 h-11 w-full rounded-xl border border-white/10 bg-[#101010] px-3 text-white focus:border-white/35 focus:outline-none"
            />
          </label>
          <button
            type="submit"
            className="cta-pulse w-full rounded-full border border-white/18 bg-white/8 py-3 text-sm font-medium text-white transition hover:bg-white/14"
          >
            Сохранить и открыть кабинет
          </button>
          <p className="text-center text-xs leading-relaxed text-zinc-600">Без оплаты. Просто закрепляем сайт за вами</p>
        </form>
      </section>
    </main>
  );
}
