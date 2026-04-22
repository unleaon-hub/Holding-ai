import type { EditableContent } from "@/lib/site-session/types";
import type { PresetId } from "./presets";
import { deterministicallyShuffled, pickIndex } from "./seed";

/** Пул для детерминированного отбора и перестановок (см. formatBullets). */
const BULLET_POOL = [
  "Бесплатная консультация",
  "Работаем без предоплаты",
  "Гарантия прозрачного результата",
  "Сопровождение с первого касания",
  "Сроки без «растянуто потом»",
  "Условия без сюрпризов в мелких строках",
  "Гибко бюджет: обсудим вилку",
  "Онлайн-запись и ориентир в переписке",
  "Согласуем формат, потом — работа",
] as const;

const CTA_PHRASES = [
  "Оставить заявку",
  "Получить консультацию",
  "Рассчитать стоимость",
  "Получить оценку",
  "Заказать обратный звонок",
  "Написать в мессенджер",
  "Уточнить сроки и вилку",
  "Забронировать слот",
] as const;

/**
 * 2–3 буллета: порядок и набор детерминированы (mixKey = niche+city+пресет+индекс варианта).
 * Не используем Math.random — всё от seedHash(mixKey).
 */
function formatBullets(mixKey: string): string {
  const count = 2 + pickIndex(`${mixKey}|bcount`, 2);
  const shuffled = deterministicallyShuffled(BULLET_POOL, mixKey, "bul");
  const lines: string[] = [];
  for (let i = 0; i < count && i < shuffled.length; i++) {
    const line = shuffled[i]!;
    lines.push(`• ${line}`);
  }
  return lines.join("\n");
}

function pickCta(mixKey: string): string {
  const i = pickIndex(`${mixKey}|cta`, CTA_PHRASES.length);
  return CTA_PHRASES[i] ?? CTA_PHRASES[0];
}

type VarBuild = (n: string, c: string) => { headline: string; subIntro: string; offerCore: string; contacts: string };

/**
 * mixKey: `niche\\0city\\0(пресет|neutral)\\0v{idx}` — вариации от hash(niche+city)
 * плюс смещение от выбранного шаблонного варианта (разный порядок фрагментов, CTA, буллеты).
 */
function layerHero(
  mixKey: string,
  slice: { headline: string; subIntro: string; offerCore: string; contacts: string },
): Pick<EditableContent, "headline" | "subheadline" | "offer" | "contacts"> {
  const cta = pickCta(mixKey);
  const ctaLine = `Кнопка на сайте: «${cta}».`;
  const subIntro = slice.subIntro.trim();
  const offerCore = slice.offerCore.trim();
  const bullets = formatBullets(mixKey);

  const subOrder = pickIndex(`${mixKey}|ord|sub`, 2);
  const subheadline =
    subOrder === 0
      ? [subIntro, "", bullets].join("\n")
      : [bullets, "", subIntro].join("\n");

  const offerOrder = pickIndex(`${mixKey}|ord|off`, 2);
  const offer =
    offerOrder === 0
      ? [offerCore, "", ctaLine].join("\n")
      : [ctaLine, "", offerCore].join("\n");

  return {
    headline: slice.headline.trim(),
    subheadline,
    offer,
    contacts: slice.contacts.trim(),
  };
}

type CaptureBlock = Pick<EditableContent, "formTitle" | "formCaption" | "formMicroCta">;

const beautyCapture: CaptureBlock[] = [
  {
    formTitle: "Оставьте заявку — подберём мастера и удобный слот",
    formCaption: "Перезвоним в течение 10 минут в рабочие часы",
    formMicroCta: "Получить консультацию по записи",
  },
  {
    formTitle: "Запишитесь: подбор покрытия и палитра",
    formCaption: "Обычно отвечаем в течение 10–15 минут",
    formMicroCta: "Получите расчёт визита бесплатно",
  },
  {
    formTitle: "Хотите визит? Оставьте контакт",
    formCaption: "Напишем в мессенджер и при необходимости дублируем звонком",
    formMicroCta: "Узнать свободные окна",
  },
];

const repairCapture: CaptureBlock[] = [
  {
    formTitle: "Оставьте заявку — согласуем выезд и смету",
    formCaption: "Свяжемся в течение 10 минут, уточним объём",
    formMicroCta: "Получите смету бесплатно по фото",
  },
  {
    formTitle: "Нужен ремонт? Опишите задачу",
    formCaption: "Инженер на связи: ответ в течение 10–15 минут",
    formMicroCta: "Расчёт и вилка сроков — без обязательств",
  },
  {
    formTitle: "Заявка на осмотр и план-график",
    formCaption: "Перезвоним, согласуем визит и следующий шаг",
    formMicroCta: "Получите консультацию по смете",
  },
];

const legalCapture: CaptureBlock[] = [
  {
    formTitle: "Оставьте заявку — первичный разбор ситуации",
    formCaption: "Свяжемся в течение 10 минут в дежурные часы",
    formMicroCta: "Получить консультацию бесплатно",
  },
  {
    formTitle: "Запишитесь: стратегия и следующий шаг",
    formCaption: "Обычно отвечаем в течение 10–15 минут",
    formMicroCta: "Оценим перспективу дела в ответе",
  },
  {
    formTitle: "Кратко опишите вопрос — ответ с ориентиром",
    formCaption: "Свяжемся в удобный канал в согласованные окна",
    formMicroCta: "Получите план действий в переписке",
  },
];

const medicalCapture: CaptureBlock[] = [
  {
    formTitle: "Запишитесь на приём — согласуем окно",
    formCaption: "Координатор ответит в течение 10 минут",
    formMicroCta: "Узнать стоимость и подготовку",
  },
  {
    formTitle: "Нужен визит? Оставьте удобный способ связи",
    formCaption: "Свяжемся, подтвердим адрес и время",
    formMicroCta: "Получите напоминание в мессенджер",
  },
  {
    formTitle: "Заявка на приём: приём врача по записи",
    formCaption: "Обычно отвечаем в течение 10–15 минут",
    formMicroCta: "Бесплатная запись в удобный день",
  },
];

const defaultCapture: CaptureBlock[] = [
  {
    formTitle: "Оставьте заявку и получите консультацию",
    formCaption: "Мы свяжемся с вами в течение 10 минут",
    formMicroCta: "Получите расчёт бесплатно",
  },
  {
    formTitle: "Опишите запрос — предложим следующий шаг",
    formCaption: "Обычно отвечаем в течение 10–15 минут",
    formMicroCta: "Получить ответ и вилку по сроку",
  },
  {
    formTitle: "Напишите, что нужно — согласуем формат",
    formCaption: "Свяжемся в удобный канал в рабочее время",
    formMicroCta: "Получить план и оценку бесплатно",
  },
];

const NEUTRAL_CAPTURE: CaptureBlock[] = [
  {
    formTitle: "Оставьте заявку и получите консультацию",
    formCaption: "Мы свяжемся с вами в течение 10 минут",
    formMicroCta: "Получите расчёт бесплатно",
  },
  {
    formTitle: "Свяжитесь с нами — кратко опишем формат работы",
    formCaption: "Обычно отвечаем в течение 10–15 минут",
    formMicroCta: "Узнать условия и сроки",
  },
];

const CAPTURES: Record<PresetId, readonly CaptureBlock[]> = {
  beauty: beautyCapture,
  repair: repairCapture,
  legal: legalCapture,
  medical: medicalCapture,
  default: defaultCapture,
};

const beautyVariants: VarBuild[] = [
  (n, c) => ({
    headline: `Идеальный маникюр в ${c} за 60 минут`,
    subIntro: `Студия: ${n}. ${c} — запись в удобный слот, мастер под стиль и форму ногтей.`,
    offerCore: "Подберём покрытие, покажем палитру и варианты срока ношения. Без сюрпризов в цене в момент записи.",
    contacts: "Свяжитесь: телефон, Telegram, адрес в подвале сайта. Напоминание в мессенджере после записи.",
  }),
  (n, c) => ({
    headline: `Студия ${n} в ${c} с гарантией качества`,
    subIntro: `Работа в ${c}: гигиена, стерилизация, бренд-лаки. ${n} — в фокусе, время не растягиваем зря.`,
    offerCore: "Согласуем пожелания до визита, предложим уход, если ногтевое полотно сухое или ломается.",
    contacts: "WhatsApp для фото рук, телефон клинки, ссылка на маршрут. Перенос по правилам студии.",
  }),
  (n, c) => ({
    headline: `${n} в ${c}: визуально ровно и в срок`,
    subIntro: `Сервис в ${c} без очереди у кресла — бронь онлайн. ${n}, подготовим референс по форме. `,
    offerCore: "Старт с диагностики, потом план. Если нужен повтор в гарантийные — разберём без дискомфорта в переписке.",
    contacts: "Форма на лендинге, обратный звонок, соцсети студии. Чек по услугам в ответе.",
  }),
];

const repairVariants: VarBuild[] = [
  (n, c) => ({
    headline: `Ремонт квартир под ключ в ${c}`,
    subIntro: `${n}. ${c} — смета и сроки до бригады, без пакетов «всё подряд» без вас.`,
    offerCore: "Сроки фиксированы. Цена прозрачная: этапность в договоре, согласуем смету после брифа и фото.",
    contacts: "Пишите в мессенджер с фото, наберите — выезд инженера по ${c} по заявке.",
  }),
  (n, c) => ({
    headline: `Сроки фиксированы, цена прозрачная — ${c}`,
    subIntro: `Ремонт и ${n} в ${c}: план-график, контроль объёма работ, смета по пунктам, не «с потолка».`,
    offerCore: "Сначала осмотр или пакет фото, потом цифры. Допработы — отдельным соглашением, согласуем до старта.",
    contacts: "Канал для сметы: WhatsApp, email, при необходимости визит — по слоту.",
  }),
  (n, c) => ({
    headline: `Ремонт в ${c} под ваш сценарий и бюджет`,
    subIntro: `${n}. В ${c} ведём объект по этапам, без простоя из-за материалов, если поставки вовремя.`,
    offerCore: "Сопроводим поставками, подскажем, где сэкономить без потери срока и норм.",
    contacts: "Заявка на сайте — ответ с вилкой и следующим шагом в день обращения в рабочие часы.",
  }),
];

const legalVariants: VarBuild[] = [
  (n, c) => ({
    headline: `Юридическая помощь в ${c}`,
    subIntro: `Решим вопрос без лишних затрат. ${n} в ${c} — разбор, стратегия, понятные шаги, без сухой канцеляриты.`,
    offerCore: "Оценим перспективу до оплаты, предложим фикс или сопровождение по договору, как удобно по делу.",
    contacts: "Контакты для записи, Telegram для документов, очный приём по записи в ${c}.",
  }),
  (n, c) => ({
    headline: `Защита интересов в ${c} — с опорой на норму`,
    subIntro: `${n}. Работа в ${c} и дистанционно: письма, досудебка, сопровождение сделки, если в теме. `,
    offerCore: "Сжатый первичный разбор: что требуется, какой горизонт срока и рисков, без витиеватых оценок «когда-нибудь».",
    contacts: "Телефон дежурной линии, форма на сайте, email для пакетов PDF.",
  }),
  (n, c) => ({
    headline: `${n}: консультация и план в ${c}`,
    subIntro: `Специализация ${n} — ${c}. Сразу поймём, достаточно разового совета или нужен полноценный контур.`,
    offerCore: "Смета за услугу до старта: консультация, пакет подачи, представительство — в зависимости от кейса.",
    contacts: "Оставьте краткое ТЗ в форме — ответ с предложением по сроку ответа и стоимости вилки.",
  }),
];

const medicalVariants: VarBuild[] = [
  (n, c) => ({
    headline: `Приём ${n} в ${c} — в удобное окно`,
    subIntro: `Согласуем визит в ${c}, ${n} без длинного ожидания в чате. Гео, время, подготовка с вашей стороны. `,
    offerCore: "Запишем на ближайшую смену, дадим список вопросов заранее, чтобы на приёме сэкономить время.",
    contacts: "Телеграм, телефон, форма. Напоминания и ссылка на кабинет, если клиника даёт. ",
  }),
  (n, c) => ({
    headline: `${n} в ${c}: врач, расписание, честно по ожиданиям`,
    subIntro: `Клиника/кабинет в ${c}. ${n} — план, показания, дальше по протоколу, без тумана в цифрах, где уместно раскрыто. `,
    offerCore: "Онлайн-ориентир: что взять с собой, как сдать анализы до визита, чтобы не дублировать шаги.",
    contacts: "Свяжитесь, как удобно: мессенджер клиники, call-центр, форма с подбором врача.",
  }),
  (n, c) => ({
    headline: `Забота о здоровье в ${c} — с понятной записью`,
    subIntro: `${n}. ${c} — сопроводим в первом контакте: срок, адрес, что ожидать в день визита.`,
    offerCore: "Если нужен повтор или уточнение плана — в одном треде, не теряем контекст из бумажек.",
    contacts: "Пишите в чат, звоните, оставьте email — дублируем подтверждение, чтобы не пропал слот. ",
  }),
];

const defaultVariants: VarBuild[] = [
  (n, c) => ({
    headline: `Ваш запрос: ${n} в ${c}`,
    subIntro: `Работаем в ${c}. Сфера: ${n} — вводим в курс, подтверждаем сроки, держим один канал ответа по делу. `,
    offerCore: "Коротко опишите задачу, мы вернёмся с предложением, что нужно на входе, и горизонт срока без размытого «когда-нибудь».",
    contacts: "Форма, мессенджер, телефон — дублируйте, где отвечаете быстрее. ",
  }),
  (n, c) => ({
    headline: `${n} в ${c} — сценарий без сюрпризов в переписке`,
    subIntro: `${c} — ориентир, ${n} — смысл. Считаем, что важно на выходе, согласуем цену и сроки до чувств «это слишком дёшево, значит, подвох». `,
    offerCore: "Дадим 2–3 варианта шагов, вы выберите комфортный, потом — подтверждение в одном письме.",
    contacts: "Оставьте удобный мессенджер и удобное окно — перезвон/ответ в заявленный день. ",
  }),
  (n, c) => ({
    headline: `Сервис ${n} — ориентир ${c}`,
    subIntro: `Сопроводим: что нужно, когда ждать ответ, что будет после первой заявки. ${n} без лишнего пинга. `,
    offerCore: "Если тема не в нашу зону, скажем прямо, чтобы не тянуть. Если в зону — развернём чек-лист.",
    contacts: "Контакты ниже, обратный звонок, если в форме оставлен телефон. ",
  }),
];

const NEUTRAL_VARIANTS: VarBuild[] = [
  (n, c) => ({
    headline: `Профессиональные услуги в ${c}`,
    subIntro: `Ниша: ${n}. ${c} — соберём вводные, опишем план, без догмана «заплатили и ждите чуда» без обратной связи. `,
    offerCore: "Стартуем с короткого брифа, согласуем формат оплаты и срок, потом — работа в рамках договорённостей. ",
    contacts: "Свяжитесь, как удобно, форма не отменяет мессенджер и наоборот. ",
  }),
  (_n, c) => ({
    headline: `Сервис в ${c} — с понятной коммуникацией`,
    subIntro: `Опишем шаги и ответственность, чтобы не путать сроки и ожидания. Работаем прозрачно по вводным, без смены норм задним числом. `,
    offerCore: "Если вопрос вне зоны, перенаправим честно. Если в зоне — разложим, что сделаем, что нужно с вашей стороны.",
    contacts: "Телефон, email, мессенджер — в ответе выберем один основной, чтобы не терять нить. ",
  }),
];

const VARIANTS: Record<PresetId, readonly VarBuild[]> = {
  beauty: beautyVariants,
  repair: repairVariants,
  legal: legalVariants,
  medical: medicalVariants,
  default: defaultVariants,
};

/** Тот же mixKey, что в layerHero, для согласованного body-контента. */
export function getMixKeyForSolo(
  niche: string,
  city: string,
  presetId: PresetId,
): { mixKey: string; idx: number } {
  const seed = `${niche}\0${city}\0${presetId}`;
  const list = VARIANTS[presetId] ?? defaultVariants;
  const idx = pickIndex(`${seed}|var`, list.length);
  const mixKey = `${niche}\0${city}\0${String(presetId)}\0v${idx}`;
  return { mixKey, idx };
}

export function getMixKeyForNeutral(niche: string, city: string): { mixKey: string; idx: number } {
  const seed = `${niche}\0${city}\0neutral`;
  const idx = pickIndex(`${seed}|nv`, NEUTRAL_VARIANTS.length);
  const mixKey = `${niche}\0${city}\0neutral\0v${idx}`;
  return { mixKey, idx };
}

export function buildHeroEditableContent(args: {
  niche: string;
  city: string;
  presetId: PresetId;
}): EditableContent {
  const { niche, city, presetId } = args;
  const { mixKey, idx } = getMixKeyForSolo(niche, city, presetId);
  const list = VARIANTS[presetId] ?? defaultVariants;
  const build = list[idx] ?? list[0]!;
  const raw = build(niche, city);
  const captureList = CAPTURES[presetId] ?? defaultCapture;
  const capture = captureList[idx % captureList.length] ?? captureList[0]!;
  return { ...layerHero(mixKey, raw), ...capture };
}

export function buildNeutralHeroEditable(niche: string, city: string): EditableContent {
  const { mixKey, idx } = getMixKeyForNeutral(niche, city);
  const build = NEUTRAL_VARIANTS[idx] ?? NEUTRAL_VARIANTS[0]!;
  const raw = build(niche, city);
  const capture = NEUTRAL_CAPTURE[idx] ?? NEUTRAL_CAPTURE[0]!;
  return { ...layerHero(mixKey, raw), ...capture };
}
