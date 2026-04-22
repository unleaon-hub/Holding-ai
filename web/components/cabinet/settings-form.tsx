"use client";

import { useState } from "react";
import Link from "next/link";
import { settingsFormHints, settingsMock, type ProjectSettings } from "@/data/cabinet";
import { cn } from "@/lib/utils";

type SettingsFormProps = {
  className?: string;
};

/** Клиентская форма; сохранение — позже через server action / API. */
export function SettingsForm({ className }: SettingsFormProps) {
  const [form, setForm] = useState<ProjectSettings>({ ...settingsMock });
  const [danger, setDanger] = useState<"freeze" | "delete" | null>(null);

  return (
    <div className={cn("space-y-8", className)}>
      <section className="surface-card p-5 md:p-6">
        <p className="eyebrow">проект</p>
        <h2 className="mt-2 text-lg font-light text-white">Данные</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {(
            [
              ["projectName", "Название проекта"] as const,
              ["niche", "Ниша"] as const,
              ["city", "Регион / город"] as const,
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="block text-sm">
              <span className="text-zinc-500">{label}</span>
              <input
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white"
                value={form[key]}
                onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
              />
            </label>
          ))}
        </div>
        <p className="mt-3 text-xs text-zinc-600">{settingsFormHints.save}</p>
      </section>

      <section className="surface-card p-5 md:p-6">
        <p className="eyebrow">уведомления</p>
        <h2 className="mt-2 text-lg font-light text-white">Каналы</h2>
        <div className="mt-4 space-y-4">
          <label className="block text-sm">
            <span className="text-zinc-500">Email</span>
            <input
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white"
              value={form.emailNotify}
              onChange={(e) => setForm((f) => ({ ...f, emailNotify: e.target.value }))}
            />
          </label>
          <label className="block text-sm">
            <span className="text-zinc-500">Telegram</span>
            <input
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white"
              value={form.telegramUser}
              onChange={(e) => setForm((f) => ({ ...f, telegramUser: e.target.value }))}
            />
          </label>
        </div>
      </section>

      <section className="surface-card p-5 md:p-6">
        <p className="eyebrow">тариф</p>
        <h2 className="mt-2 text-lg font-light text-white">Рост</h2>
        <p className="mt-2 text-sm text-zinc-500">
          Смена пакета — в разделе Growth. Оплата — отдельно.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href="/cabinet/growth"
            className="rounded-full border border-white/18 bg-white/8 px-4 py-2 text-sm text-white"
          >
            Подобрать пакет
          </Link>
          <Link
            href="/cabinet/payment"
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-300"
          >
            Оплата
          </Link>
        </div>
      </section>

      <section className="surface-card border border-rose-500/15 bg-rose-500/[0.04] p-5 md:p-6">
        <p className="eyebrow text-rose-200/80">опасная зона</p>
        <h2 className="mt-2 text-lg font-light text-white">Проект</h2>
        <p className="mt-2 text-sm text-zinc-500">Только UI. Реальные операции не выполняются.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setDanger("freeze")}
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-amber-100"
          >
            Заморозить проект
          </button>
          <button
            type="button"
            onClick={() => setDanger("delete")}
            className="rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-2 text-sm text-rose-100"
          >
            Удалить проект
          </button>
        </div>
      </section>

      {danger ? (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 p-4 sm:items-center"
          role="dialog"
          aria-modal
        >
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#141414] p-5 shadow-2xl">
            <h3 className="text-lg font-medium text-white">
              {danger === "freeze" ? "Заморозить проект?" : "Удалить проект?"}
            </h3>
            <p className="mt-2 text-sm text-zinc-500">
              {danger === "freeze"
                ? settingsFormHints.dangerFreeze
                : settingsFormHints.dangerDelete}
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setDanger(null)}
                className="rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-300"
              >
                Отмена
              </button>
              <button
                type="button"
                onClick={() => setDanger(null)}
                className="rounded-full border border-rose-500/40 bg-rose-500/20 px-4 py-2 text-sm text-rose-50"
              >
                Подтвердить
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
