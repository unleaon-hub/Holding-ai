/**
 * Сессия «сгенерированный сайт + владелец».
 * TODO: заменить localStorage на ответы API (GET/PATCH /projects, POST /auth/claim).
 */

/**
 * Секции тела SOLO-лендинга (rule-based). Необязательно: старые сессии / флаг off → fallback в превью.
 */
export type SoloBodyBlocks = {
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
