"use client";

import { useEffect, useState } from "react";
import { useCabinetProject } from "./cabinet-project-provider";
import { updateProject } from "@/lib/site-session";
import { cn } from "@/lib/utils";

type SiteEditFormProps = { className?: string };

// TODO: PATCH /api/projects/:id/content
export function SiteEditForm({ className }: SiteEditFormProps) {
  const { project, refresh } = useCabinetProject();
  const [headline, setHeadline] = useState("");
  const [subheadline, setSubheadline] = useState("");
  const [offer, setOffer] = useState("");
  const [contacts, setContacts] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const [formCaption, setFormCaption] = useState("");
  const [formMicroCta, setFormMicroCta] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (project) {
      setHeadline(project.content.headline);
      setSubheadline(project.content.subheadline);
      setOffer(project.content.offer);
      setContacts(project.content.contacts);
      setFormTitle(project.content.formTitle);
      setFormCaption(project.content.formCaption);
      setFormMicroCta(project.content.formMicroCta);
    }
  }, [project]);

  if (!project) {
    return null;
  }

  return (
    <form
      className={cn("space-y-4", className)}
      onSubmit={(e) => {
        e.preventDefault();
        updateProject({
          content: {
            headline: headline.trim(),
            subheadline: subheadline.trim(),
            offer: offer.trim(),
            contacts: contacts.trim(),
            formTitle: formTitle.trim(),
            formCaption: formCaption.trim(),
            formMicroCta: formMicroCta.trim(),
          },
        });
        refresh();
        setSaved(true);
        window.setTimeout(() => {
          setSaved(false);
        }, 2400);
      }}
    >
      <div className="space-y-4">
        <label className="block">
          <span className="text-sm text-zinc-400">Заголовок</span>
          <input
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            required
            className="mt-2 h-11 w-full rounded-xl border border-white/10 bg-[#101010] px-3 text-white focus:border-white/35 focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="text-sm text-zinc-400">Подзаголовок</span>
          <textarea
            value={subheadline}
            onChange={(e) => setSubheadline(e.target.value)}
            required
            rows={3}
            className="mt-2 w-full rounded-xl border border-white/10 bg-[#101010] px-3 py-2 text-sm text-white focus:border-white/35 focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="text-sm text-zinc-400">Оффер</span>
          <textarea
            value={offer}
            onChange={(e) => setOffer(e.target.value)}
            required
            rows={3}
            className="mt-2 w-full rounded-xl border border-white/10 bg-[#101010] px-3 py-2 text-sm text-white focus:border-white/35 focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="text-sm text-zinc-400">Контакты</span>
          <input
            value={contacts}
            onChange={(e) => setContacts(e.target.value)}
            required
            className="mt-2 h-11 w-full rounded-xl border border-white/10 bg-[#101010] px-3 text-white focus:border-white/35 focus:outline-none"
          />
        </label>
        <p className="pt-1 text-xs font-medium uppercase tracking-wide text-zinc-500">Точка захвата</p>
        <label className="block">
          <span className="text-sm text-zinc-400">Текст формы</span>
          <input
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            required
            className="mt-2 h-11 w-full rounded-xl border border-white/10 bg-[#101010] px-3 text-white focus:border-white/35 focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="text-sm text-zinc-400">Подпись (срок ответа и т.п.)</span>
          <input
            value={formCaption}
            onChange={(e) => setFormCaption(e.target.value)}
            required
            className="mt-2 h-11 w-full rounded-xl border border-white/10 bg-[#101010] px-3 text-white focus:border-white/35 focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="text-sm text-zinc-400">Мини-CTA в тексте</span>
          <input
            value={formMicroCta}
            onChange={(e) => setFormMicroCta(e.target.value)}
            required
            className="mt-2 h-11 w-full rounded-xl border border-white/10 bg-[#101010] px-3 text-white focus:border-white/35 focus:outline-none"
          />
        </label>
      </div>
      <div className="space-y-2 pt-2">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full border border-white/18 bg-white/8 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/14"
          >
            Сохранить
          </button>
          {saved ? <span className="text-sm text-zinc-500">Сохранено в этом браузере</span> : null}
        </div>
        <p className="text-xs text-zinc-600">Изменения применяются в течение нескольких минут</p>
      </div>
    </form>
  );
}
