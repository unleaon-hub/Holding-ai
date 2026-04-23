/**
 * Сессия «сгенерированный сайт + владелец».
 * TODO: заменить localStorage на ответы API (GET/PATCH /projects, POST /auth/claim).
 */

/** Порядок секций на странице (детерминированно от seed). */
export type SoloLayoutId = "A" | "B" | "C";

export type SoloSectionKind =
  | "benefits"
  | "services"
  | "how"
  | "reviews"
  | "trust"
  | "final_cta";

/** Визуальный формат секции в превью (rule-based). */
export type SoloSectionVariant = "cards" | "list" | "steps" | "accent";

export type SoloSection = {
  kind: SoloSectionKind;
  variant: SoloSectionVariant;
};

/**
 * Секции тела SOLO-лендинга (rule-based). Необязательно: старые сессии / флаг off → fallback в превью.
 * `layoutId` + `sections` — новая схема; поля why/services/trust сохраняют совместимость с редактором.
 */
export type SoloBodyBlocks = {
  /** Сценарий порядка секций (A/B/C). Старые сессии без поля — превью в legacy-порядке. */
  layoutId?: SoloLayoutId;
  /** Упорядоченный список секций с вариантом отображения. */
  sections?: SoloSection[];
  /** «Как работаем» — три коротких шага. */
  howTitle?: string;
  howItems?: string[];
  /** Короткие отзывы (без перегруза). */
  reviewsTitle?: string;
  reviewItems?: string[];

  whyTitle: string;
  whyItems: string[];
  servicesTitle: string;
  serviceItems: string[];
  trustTitle: string;
  trustItems: string[];
  finalCtaTitle: string;
  finalCtaMicro: string;
  finalCtaButton: string;
  footerKicker: string;
};

export type EditableContent = {
  headline: string;
  subheadline: string;
  offer: string;
  contacts: string;
  /** Текст формы (точка захвата) */
  formTitle: string;
  /** Подпись под формой / срок ответа */
  formCaption: string;
  /** Мини-CTA рядом с формой */
  formMicroCta: string;
  /** Блоки нижней части лендинга (преимущества, услуги, доверие, финальный CTA) */
  soloBlocks?: SoloBodyBlocks;
};

export type ProjectOwner = {
  name: string;
  email: string;
};

export type GeneratedProject = {
  id: string;
  slug: string;
  niche: string;
  city: string;
  contact: string;
  createdAt: string;
  registered: boolean;
  content: EditableContent;
  ownerName?: string;
  ownerEmail?: string;
};

export type SiteSessionV1 = {
  version: 1;
  project: GeneratedProject | null;
  owner: ProjectOwner | null;
};
