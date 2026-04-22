"use client";

import { useCallback, useState } from "react";
import { createLead, type LeadFormSection } from "@/lib/lead-storage";
import { cn } from "@/lib/utils";

type PreviewCaptureFormProps = {
  projectSlug: string;
  section: LeadFormSection;
  formTitle: string;
  formMicroCta: string;
  formCaption: string;
  /** Подпись кнопки; для блока final — из `finalCtaButton`. */
  submitLabel?: string;
  /** false — только поля (заголовок выше в родителе). */
  showHeader?: boolean;
  className?: string;
  buttonClassName?: string;
};

export function PreviewCaptureForm({
  projectSlug,
  section,
  formTitle,
  formMicroCta,
  formCaption,
  submitLabel = "Оставить заявку",
  showHeader = true,
  className,
  buttonClassName,
}: PreviewCaptureFormProps) {
  const [name, setName] = useState("");
  const [phoneOrContact, setPhoneOrContact] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      const r = createLead(projectSlug, {
        name,
        phoneOrContact,
        message: message.trim() || undefined,
        source: "Website",
        section,
      });
      if (!r.ok) {
        setError(r.error);
        return;
      }
      setDone(true);
      setName("");
      setPhoneOrContact("");
      setMessage("");
    },
    [name, phoneOrContact, message, projectSlug, section],
  );

  if (done) {
    return (
      <div className={cn("space-y-2", className)} data-lead-success>
        <p className="text-sm text-zinc-300">Заявка отправлена. Мы свяжемся по указанным контактам.</p>
        <button
          type="button"
          className="text-xs text-zinc-500 underline underline-offset-2 hover:text-zinc-400"
          onClick={() => setDone(false)}
        >
          Оставить ещё одну
        </button>
      </div>
    );
  }

  return (
    <form className={cn("space-y-3", className)} onSubmit={onSubmit} noValidate>
      {showHeader ? (
        <>
          <p className="text-sm font-medium text-zinc-200">{formTitle}</p>
          {formMicroCta ? <p className="text-sm text-zinc-400">{formMicroCta}</p> : null}
        </>
      ) : null}
      <div className="mt-1 space-y-2">
        <label className="block text-left">
          <span className="sr-only">Имя</span>
          <input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            placeholder="Имя"
            className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 text-sm text-white placeholder:text-zinc-500 focus:border-white/25 focus:outline-none"
            required
          />
        </label>
        <label className="block text-left">
          <span className="sr-only">Телефон или контакт</span>
          <input
            name="contact"
            value={phoneOrContact}
            onChange={(e) => setPhoneOrContact(e.target.value)}
            autoComplete="tel"
            placeholder="Телефон, Telegram, email"
            className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 text-sm text-white placeholder:text-zinc-500 focus:border-white/25 focus:outline-none"
            required
            minLength={4}
          />
        </label>
        <label className="block text-left">
          <span className="sr-only">Сообщение</span>
          <textarea
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Сообщение (необязательно)"
            rows={2}
            className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:border-white/25 focus:outline-none"
          />
        </label>
      </div>
      {error ? <p className="text-xs text-rose-400/90">{error}</p> : null}
      <button
        type="submit"
        className={cn(
          "cta-pulse w-full rounded-full border border-white/18 bg-white/8 py-3.5 font-medium text-white transition hover:bg-white/14 md:w-auto md:px-8",
          showHeader ? "mt-4" : "mt-2",
          buttonClassName,
        )}
      >
        {submitLabel}
      </button>
      {formCaption ? <p className="text-xs text-zinc-600">{formCaption}</p> : null}
    </form>
  );
}
