"use client";

import { useParams } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import Link from "next/link";
import { getProjectBySlug, getProject, subscribeSession } from "@/lib/site-session";
import { ToastContainer } from "@/components/ui/toast/toast-container";
import { FullSiteTemplate } from "./full-site-template";
import { PreviewFloatingUI } from "./preview-floating-ui";
import { PreviewActiveIndicator } from "./preview-active-indicator";

type PreviewState = { kind: "ok"; slug: string } | { kind: "mismatch" } | { kind: "empty" };

type PreviewViewState = PreviewState | { kind: "init" };

function normalizeRouteSlug(raw: string): string {
  const t = raw.trim();
  if (!t) {
    return "";
  }
  try {
    return decodeURIComponent(t);
  } catch {
    return t;
  }
}

function resolveState(slug: string): PreviewState {
  const routeSlug = normalizeRouteSlug(slug);
  if (!routeSlug) {
    return { kind: "empty" };
  }
  const p = getProject();
  if (!p) {
    return { kind: "empty" };
  }
  if (p.slug !== routeSlug) {
    return { kind: "mismatch" };
  }
  return { kind: "ok", slug: p.slug };
}

export function PreviewPageClient() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const [state, setState] = useState<PreviewViewState>({ kind: "init" });

  const refresh = useCallback(() => {
    setState(resolveState(slug));
  }, [slug]);

  useLayoutEffect(() => {
    setState(resolveState(slug));
  }, [slug]);

  useEffect(() => {
    return subscribeSession(refresh);
  }, [refresh]);

  if (state.kind === "init") {
    return <div className="min-h-dvh w-full bg-[#0a0a0a] text-zinc-500" aria-hidden />;
  }

  if (state.kind === "mismatch" || state.kind === "empty") {
    return (
      <div className="min-h-dvh w-full bg-[#0a0a0a] text-zinc-200">
        <div className="section-shell flex min-h-dvh flex-col items-center justify-center py-16 text-center">
          <div className="surface-card max-w-md p-8">
            {state.kind === "mismatch" && (
              <>
                <p className="eyebrow">превью</p>
                <h1 className="mt-2 text-2xl font-light text-white">Ссылка не совпадает с проектом</h1>
                <p className="mt-3 text-sm text-zinc-500">
                  Откройте актуальное превью из кабинета или создайте новый сайт.
                </p>
                <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
                  <Link
                    href="/cabinet"
                    className="inline-flex items-center justify-center rounded-full border border-white/16 bg-white/8 px-4 py-2.5 text-sm text-white"
                  >
                    Кабинет
                  </Link>
                  <Link
                    href="/start"
                    className="inline-flex items-center justify-center rounded-full border border-white/10 px-4 py-2.5 text-sm text-zinc-300"
                  >
                    Создать сайт
                  </Link>
                </div>
              </>
            )}
            {state.kind === "empty" && (
              <>
                <p className="eyebrow">превью</p>
                <h1 className="mt-2 text-2xl font-light text-white">Сайт ещё не создан</h1>
                <p className="mt-3 text-sm text-zinc-500">Запустите генерацию — мы сохраним проект и откроем превью.</p>
                <Link
                  href="/start"
                  className="cta-pulse mt-6 inline-flex items-center justify-center rounded-full border border-white/18 bg-white/8 px-5 py-2.5 text-sm font-medium text-white"
                >
                  Создать сайт
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  const p = getProjectBySlug(state.slug);
  if (!p) {
    console.warn("[preview] state ok but project missing — showing recovery UI");
    return (
      <div className="min-h-dvh w-full bg-[#0a0a0a] text-zinc-200">
        <div className="section-shell flex min-h-dvh flex-col items-center justify-center py-16 text-center">
          <div className="surface-card max-w-md p-8">
            <p className="eyebrow">превью</p>
            <h1 className="mt-2 text-2xl font-light text-white">Данные сайта недоступны</h1>
            <p className="mt-3 text-sm text-zinc-500">
              Проект в этом браузере не найден или устарел. Создайте сайт заново или откройте кабинет.
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
              <Link
                href="/cabinet"
                className="inline-flex items-center justify-center rounded-full border border-white/16 bg-white/8 px-4 py-2.5 text-sm text-white"
              >
                Кабинет
              </Link>
              <Link
                href="/start"
                className="inline-flex items-center justify-center rounded-full border border-white/10 px-4 py-2.5 text-sm text-zinc-300"
              >
                Создать сайт
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const enc = (s: string) => encodeURIComponent(s);

  return (
    <div className="relative min-h-dvh w-full pb-[min(12rem,22vh)]">
      <FullSiteTemplate niche={p.niche} city={p.city} content={p.content} projectSlug={p.slug} />
      <PreviewActiveIndicator />
      <ToastContainer />
      <PreviewFloatingUI
        claimNextEdit={`/claim?next=${enc("/cabinet/edit")}`}
        claimNextCabinet={`/claim?next=${enc("/cabinet")}`}
      />
    </div>
  );
}
