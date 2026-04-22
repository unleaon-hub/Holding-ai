import type { EditableContent } from "./types";

/** Детерминированные тексты по умолчанию (для флага отката и fallback). */
export function buildDefaultContent(niche: string, city: string): EditableContent {
  const n = niche.trim() || "ваш бизнес";
  const c = city.trim() || "ваш город";
  return {
    headline: `${n} — заявка за пару кликов`,
    subheadline: `Работаем в ${c}. Быстрый отклик, понятные условия и сопровождение сделки.`,
    offer:
      "Оставьте заявку — перезвоним в ближайшее время и подберём решение под ваш запрос.",
    contacts: "WhatsApp · Telegram · Телефон (уточните в кабинете)",
    formTitle: "Оставьте заявку и получите консультацию",
    formCaption: "Мы свяжемся с вами в течение 10 минут",
    formMicroCta: "Получите расчёт бесплатно",
  };
}

/** Старые сессии без полей формы — подставляем дефолты. */
export function ensureEditableContent(c: EditableContent): EditableContent {
  const f = buildDefaultContent("Ниша", "Город");
  return {
    headline: c.headline ?? f.headline,
    subheadline: c.subheadline ?? f.subheadline,
    offer: c.offer ?? f.offer,
    contacts: c.contacts ?? f.contacts,
    formTitle: c.formTitle ?? f.formTitle,
    formCaption: c.formCaption ?? f.formCaption,
    formMicroCta: c.formMicroCta ?? f.formMicroCta,
    soloBlocks: c.soloBlocks,
  };
}
