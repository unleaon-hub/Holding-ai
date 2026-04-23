"use client";

import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { getTrialDaysLeft, isTrialActive } from "@/lib/billing";
import { getLeads, subscribeLeadsChanged } from "@/lib/lead-storage";
import { createPaymentIntent, getPaymentIntent, subscribePaymentIntentsChanged } from "@/lib/payment-intent";
import { getProject, subscribeSession } from "@/lib/site-session";
import { trackUpgradeEvent, trackUpgradeViewOncePerSession } from "@/lib/upgrade-analytics";

type UpgradeSnapshot = {
  projectSlug: string;
  projectName: string;
  email: string;
  contact: string;
  leadCount: number;
  trialActive: boolean;
  trialDaysLeft: number;
  intentExists: boolean;
};

function readSnapshot(): UpgradeSnapshot {
  const project = getProject();
  const projectSlug = project?.slug ?? "";
  const leadCount = project ? getLeads(project.slug).length : 0;
  const intent = projectSlug ? getPaymentIntent(projectSlug) : null;
  return {
    projectSlug,
    projectName: project ? `${project.niche} — ${project.city}` : "Ваш проект",
    email: project?.ownerEmail?.trim() || "",
    contact: project?.contact?.trim() || "",
    leadCount,
    trialActive: isTrialActive(),
    trialDaysLeft: getTrialDaysLeft(),
    intentExists: intent != null,
  };
}

export function UpgradePageContent() {
  const [snapshot, setSnapshot] = useState<UpgradeSnapshot | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [contactInput, setContactInput] = useState("");
  const refresh = useCallback(() => {
    setSnapshot(readSnapshot());
  }, []);

  useLayoutEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    const unsubLeads = subscribeLeadsChanged(refresh);
    const unsubSession = subscribeSession(refresh);
    const unsubIntents = subscribePaymentIntentsChanged(refresh);
    return () => {
      unsubLeads();
      unsubSession();
      unsubIntents();
    };
  }, [refresh]);

  useEffect(() => {
    if (!snapshot) {
      return;
    }
    const slug = snapshot.projectSlug.trim();
    if (!slug) {
      return;
    }
    trackUpgradeViewOncePerSession(slug);
  }, [snapshot]);

  useEffect(() => {
    if (!snapshot) {
      return;
    }
    setEmailInput(snapshot.email);
    setContactInput(snapshot.contact);
  }, [snapshot]);

  if (snapshot === null) {
    return (
      <main className="section-shell flex min-h-[40vh] items-center justify-center py-12 md:py-20">
        <p className="text-sm text-zinc-500">Загрузка…</p>
      </main>
    );
  }

  if (!snapshot.projectSlug.trim()) {
    return (
      <main className="section-shell py-12 md:py-20">
        <section className="surface-card mx-auto max-w-md p-8 text-center">
          <p className="eyebrow">/upgrade</p>
          <h1 className="mt-2 text-2xl font-light text-white">Проект не найден</h1>
          <p className="mt-3 text-sm text-zinc-500">
            Сначала сгенерируйте сайт в этом браузере — тогда здесь появятся данные для продления.
          </p>
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

  const hasLeads = snapshot.leadCount > 0;
  const headline = hasLeads
    ? `У вас уже есть ${snapshot.leadCount} заявок от клиентов`
    : "Продлите доступ к сайту и CRM";
  const subheadline = hasLeads
    ? "Откройте доступ за 990₽/мес, чтобы увидеть контакты клиентов и начать работу"
    : "Ваш сайт продолжает работать. Продлите доступ, чтобы не потерять новые обращения и продолжить работу с клиентами";
  const trialBadge = useMemo(() => {
    if (snapshot.trialActive) {
      return `Пробный период активен: ${snapshot.trialDaysLeft} дн.`;
    }
    return "Пробный период закончился";
  }, [snapshot.trialActive, snapshot.trialDaysLeft]);
  const hasEmail = emailInput.trim().length > 0;
  const hasContact = contactInput.trim().length > 0;
  const canConfirm = snapshot.projectSlug.length > 0 && hasEmail && hasContact;
  const needsFallback = !snapshot.email || !snapshot.contact;

  const onOpenConfirm = useCallback(() => {
    if (snapshot.intentExists) {
      return;
    }
    const slug = snapshot.projectSlug.trim();
    if (slug) {
      trackUpgradeEvent("upgrade_cta_click", slug);
    }
    setConfirmOpen(true);
  }, [snapshot.intentExists, snapshot.projectSlug]);

  const onConfirm = useCallback(() => {
    if (!canConfirm) {
      return;
    }
    const hadIntent = snapshot.intentExists;
    const slug = snapshot.projectSlug.trim();
    const created = createPaymentIntent({
      projectSlug: snapshot.projectSlug,
      email: emailInput,
      contact: contactInput,
    });
    if (!hadIntent && created && slug) {
      trackUpgradeEvent("upgrade_intent_confirmed", slug);
    }
    setConfirmOpen(false);
    refresh();
  }, [canConfirm, emailInput, contactInput, snapshot.projectSlug, snapshot.intentExists, refresh]);

  return (
    <main className="section-shell py-12 md:py-20">
      <section className="surface-card mx-auto max-w-4xl p-6 md:p-10">
        <p className="eyebrow">/upgrade</p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-zinc-500">{snapshot.projectName}</p>
          <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-300">
            {trialBadge}
          </span>
        </div>

        <h1 className="mt-4 text-3xl font-light text-white md:text-5xl">{headline}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-400 md:text-base">{subheadline}</p>

        <div className="mt-8 grid gap-3 md:grid-cols-2">
          <div className="surface-subtle rounded-2xl border border-white/8 p-4">
            <p className="text-sm font-medium text-white">Что уже работает</p>
            <ul className="mt-3 space-y-2 text-sm text-zinc-400">
              <li>Сайт активен</li>
              <li>Новые заявки продолжают поступать</li>
              <li>Уведомления продолжают приходить</li>
            </ul>
          </div>
          <div className="surface-subtle rounded-2xl border border-white/8 p-4">
            <p className="text-sm font-medium text-white">Что сейчас заблокировано</p>
            <ul className="mt-3 space-y-2 text-sm text-zinc-400">
              <li>Контакты клиентов скрыты</li>
              <li>Работа со статусами недоступна</li>
              <li>CRM доступна только для просмотра</li>
            </ul>
          </div>
        </div>

        <div id="payment" className="mt-8 rounded-2xl border border-white/12 bg-white/[0.02] p-5 md:p-6">
          <p className="text-xs tracking-[0.14em] text-zinc-500">СТОИМОСТЬ ДОСТУПА</p>
          <p className="mt-2 text-3xl font-light text-white md:text-4xl">990₽ / месяц</p>
          <p className="mt-2 text-sm text-zinc-500">Доступ откроется сразу после оплаты</p>
          {snapshot.intentExists ? (
            <div className="mt-4 rounded-xl border border-emerald-400/20 bg-emerald-500/[0.06] p-3">
              <p className="text-sm font-medium text-emerald-200">
                Мы уже открыли доступ на 30 дней, пока финализируем оплату
              </p>
            </div>
          ) : null}
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onOpenConfirm}
              disabled={snapshot.intentExists}
              className="inline-flex items-center justify-center rounded-full border border-white/16 bg-white/8 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/12"
            >
              {snapshot.intentExists ? "Запрос уже отправлен" : "Открыть доступ за 990₽/мес"}
            </button>
            <Link
              href="/cabinet"
              className="inline-flex items-center justify-center rounded-full border border-white/12 px-5 py-2.5 text-sm text-zinc-300 transition hover:border-white/18 hover:text-white"
            >
              Вернуться в кабинет
            </Link>
          </div>
          {confirmOpen && !snapshot.intentExists ? (
            <div className="mt-5 rounded-xl border border-white/10 bg-[#101010] p-4">
              <p className="text-sm font-medium text-white">Подтвердите подключение</p>
              <p className="mt-1 text-sm text-zinc-400">
                Мы откроем доступ к заявкам для вашего проекта.
              </p>
              <div className="mt-4 space-y-2 text-sm">
                <p className="text-zinc-400">
                  Email: <span className="text-zinc-200">{hasEmail ? emailInput : "не указан"}</span>
                </p>
                <p className="text-zinc-400">
                  Контакт: <span className="text-zinc-200">{hasContact ? contactInput : "не указан"}</span>
                </p>
              </div>
              {needsFallback ? (
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {!snapshot.email ? (
                    <label className="block text-left">
                      <span className="text-xs text-zinc-400">Email</span>
                      <input
                        type="email"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        className="mt-1 h-10 w-full rounded-lg border border-white/10 bg-[#0d0d0d] px-3 text-sm text-white focus:border-white/30 focus:outline-none"
                        placeholder="you@example.com"
                      />
                    </label>
                  ) : null}
                  {!snapshot.contact ? (
                    <label className="block text-left">
                      <span className="text-xs text-zinc-400">Контакт</span>
                      <input
                        value={contactInput}
                        onChange={(e) => setContactInput(e.target.value)}
                        className="mt-1 h-10 w-full rounded-lg border border-white/10 bg-[#0d0d0d] px-3 text-sm text-white focus:border-white/30 focus:outline-none"
                        placeholder="+7..."
                      />
                    </label>
                  ) : null}
                </div>
              ) : null}
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={onConfirm}
                  disabled={!canConfirm}
                  className="inline-flex items-center justify-center rounded-full border border-white/16 bg-white/8 px-4 py-2 text-sm text-white transition hover:bg-white/12 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Подтвердить и получить доступ
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmOpen(false)}
                  className="inline-flex items-center justify-center rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-300 transition hover:border-white/16 hover:text-white"
                >
                  Отмена
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}

