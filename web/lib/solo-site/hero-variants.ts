import type { EditableContent } from "@/lib/site-session/types";
import type { PresetId } from "./presets";
import { deterministicallyShuffled, pickIndex } from "./seed";

/** Буллеты под hero: без «воды», детерминированный набор (см. formatBullets). */
const BULLET_POOL = [
  "Слот по времени, без очереди у кресла/на объекте",
  "Смета и объём до старта — отдельно обсуждаем допы",
  "Один канал переписки — контекст не теряется",
  "Перенос по правилам, без «пропали на сутки»",
  "По запросу: фото, вводные, маршрут — в одном сообщении",
  "Если задача не наша — скажем сразу",
  "Формат и следующий шаг — до оплаты основного объёма",
  "Запись и напоминание в привычном мессенджере",
] as const;

const CTA_PHRASES = [
  "Забронировать слот",
  "Получить план и вилку",
  "Отправить вводные",
  "Согласовать время визита",
  "Написать в мессенджер",
  "Заказать оценку по фото",
  "Оставить заявку",
  "Записаться на разбор",
] as const;

/**
 * Два буллета: порядок и набор детерминированы (mixKey).
 * Не используем Math.random — всё от seedHash(mixKey).
 */
function formatBullets(mixKey: string): string {
  const count = 2;
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
    formTitle: "Заявка на слот — подберём мастера под задачу",
    formCaption: "Ответим в рабочие часы в тот же день",
    formMicroCta: "Согласовать время визита",
  },
  {
    formTitle: "Напишите, что хотите по рукам — предложим окна",
    formCaption: "В мессенджере уточним детали до визита",
    formMicroCta: "Получить план визита",
  },
  {
    formTitle: "Оставьте контакт — зафиксируем время",
    formCaption: "Дублируем подтверждение в чат, если удобно",
    formMicroCta: "Забронировать слот",
  },
];

const repairCapture: CaptureBlock[] = [
  {
    formTitle: "Опишите задачу — согласуем выезд и смету",
    formCaption: "Свяжемся в ближайшее рабочее время",
    formMicroCta: "Заказать оценку по фото",
  },
  {
    formTitle: "Фото и комнаты — соберём вилку по объёму",
    formCaption: "Инженер уточнит детали в переписке",
    formMicroCta: "Получить план и вилку",
  },
  {
    formTitle: "Заявка на осмотр и план работ",
    formCaption: "Согласуем визит и следующий шаг без навязанных пакетов",
    formMicroCta: "Отправить вводные",
  },
];

const legalCapture: CaptureBlock[] = [
  {
    formTitle: "Кратко опишите ситуацию — предложим формат разбора",
    formCaption: "Свяжемся в согласованные дежурные окна",
    formMicroCta: "Записаться на разбор",
  },
  {
    formTitle: "Заявка: стратегия и следующий шаг по делу",
    formCaption: "Документы удобно передать в мессенджер или почту",
    formMicroCta: "Получить план действий",
  },
  {
    formTitle: "Оставьте вводные — ответ с ориентиром",
    formCaption: "Без давления: сначала ясность, потом решение о сопровождении",
    formMicroCta: "Оставить заявку",
  },
];

const medicalCapture: CaptureBlock[] = [
  {
    formTitle: "Запись на приём — выберем окно",
    formCaption: "Координатор ответит в ближайшее рабочее время",
    formMicroCta: "Согласовать время визита",
  },
  {
    formTitle: "Нужен визит? Укажите удобный канал связи",
    formCaption: "Подтвердим адрес, этаж и что взять с собой",
    formMicroCta: "Написать в мессенджер",
  },
  {
    formTitle: "Заявка в клинику — без лишних звонков",
    formCaption: "Напоминание и маршрут — одним сообщением",
    formMicroCta: "Забронировать слот",
  },
];

const defaultCapture: CaptureBlock[] = [
  {
    formTitle: "Опишите задачу — вернёмся с планом",
    formCaption: "Ответ в ближайшее рабочее время",
    formMicroCta: "Получить план и вилку",
  },
  {
    formTitle: "Заявка: следующий шаг без лишних кругов",
    formCaption: "Согласуем формат и срок ответа заранее",
    formMicroCta: "Отправить вводные",
  },
  {
    formTitle: "Свяжитесь — закрепим контакт и задачу",
    formCaption: "Один тред, один ответственный по переписке",
    formMicroCta: "Оставить заявку",
  },
];

const NEUTRAL_CAPTURE: CaptureBlock[] = [
  {
    formTitle: "Опишите нишу и задачу — предложим формат",
    formCaption: "Ответим в ближайшее рабочее время",
    formMicroCta: "Получить план и вилку",
  },
  {
    formTitle: "Заявка: разберём запрос и следующий шаг",
    formCaption: "Согласуем канал и ожидания по сроку ответа",
    formMicroCta: "Оставить заявку",
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
    headline: `Ровное покрытие и аккуратная форма — ${c}`,
    subIntro: `${n} в ${c}: слот по времени, мастер под вашу задачу, без ожидания у кресла.`,
    offerCore:
      "Первый ответ — с вариантами времени и вопросами по покрытию. Ограничение: ближайшие слоты уходят вечером — зафиксируйте день в переписке.",
    contacts: "Телефон, Telegram, адрес и карта — в подвале страницы. Напоминание в мессенджере после записи.",
  }),
  (n, c) => ({
    headline: `Запись без суеты: ${n} в ${c}`,
    subIntro: `${c} · ${n}. Согласуем длину, форму и покрытие до визита — на месте меньше «угадайки» и правок вслепую.`,
    offerCore:
      "Бонус к первому визиту: разбор ухода дома под ваш тип ногтя — в рамках слота, если успеваем по времени.",
    contacts: "WhatsApp для фото, телефон студии, перенос по правилам — всё в одном треде.",
  }),
  (n, c) => ({
    headline: `Визуально чистый результат за один визит — где уместно`,
    subIntro: `Студия ${n}, ${c}. Покажем палитру и варианты носки до старта работы — без сюрпризов в чеке в момент записи.`,
    offerCore:
      "Ограничение по слотам на выходные: после заявки держим окно сутки — успейте подтвердить время в ответе.",
    contacts: "Форма на сайте, обратный звонок по желанию, соцсети студии — как удобнее закрепить время.",
  }),
];

const repairVariants: VarBuild[] = [
  (n, c) => ({
    headline: `Смета и этапы до старта бригады — ${c}`,
    subIntro: `${n} в ${c}: фото и описание → вилка и план → старт после явного «да». Без навязанных пакетов «всё подряд».`,
    offerCore:
      "Допработы — только отдельным согласованием до продолжения. Бонус: разбор сметы строка за строкой в ответе на заявку.",
    contacts: "Мессенджер с фото, телефон, выезд по согласованию — контакты внизу страницы.",
  }),
  (n, c) => ({
    headline: `Ремонт под ваш сценарий — ориентир ${c}`,
    subIntro: `В ${c} ведём объект по этапам: контрольные точки, акты, один диспетчер на связи. ${n} — ядро запроса.`,
    offerCore:
      "Ограничение по выезду: ближайшие окна на осмотр закрываются при полной загрузке — заявка сегодня даёт приоритет в очереди.",
    contacts: "Канал для сметы: WhatsApp или email — как привыкли. Слот на осмотр — после короткого брифа.",
  }),
  (n, c) => ({
    headline: `Прозрачный объём работ — без «потом договоримся»`,
    subIntro: `${n}, ${c}. Сначала вводные и сроки желаемого результата, потом цифры и календарь — без растягивания переписки.`,
    offerCore:
      "Фиксация в договоре: этапы и контрольные дни до подписания. Один конкретный паттерн срока — в ответе на заявку, без размытия.",
    contacts: "Заявка на сайте — следующий шаг и вилка в рабочий день. Телефон и мессенджер — в подвале.",
  }),
];

const legalVariants: VarBuild[] = [
  (n, c) => ({
    headline: `Разбор ситуации и план — ${c}`,
    subIntro: `${n} в ${c} и дистанционно: документы, стратегия, следующий шаг — без лишней канцеляриты в переписке.`,
    offerCore:
      "Первичный контур: что сделать в ближайшие шаги, где риск, какие варианты сценария. Оплата основного объёма — после явной договорённости о формате.",
    contacts: "Telegram для PDF, телефон для срочных узлов, очный приём в ${c} — по записи.",
  }),
  (n, c) => ({
    headline: `Документы и позиция — с опорой на норму`,
    subIntro: `Специализация: ${n}. ${c} — сопровождение переговоров, претензий, сделки: в рамках компетенции и сроков дела.`,
    offerCore:
      "Ограничение: без обещаний исхода «под ключ» — зато честная вилка по шагам и стоимости до старта сопровождения.",
    contacts: "Форма на сайте, email для пакетов, дежурный канал — в подвале страницы.",
  }),
  (n, c) => ({
    headline: `Юридический ориентир по делу — ${c}`,
    subIntro: `${n}: соберём факты, хронологию и цель. ${c} — очно или онлайн, как удобнее по типу вопроса.`,
    offerCore:
      "Бонус к первому обращению: короткий чек-лист документов, который снижает число итераций до сути.",
    contacts: "Оставьте ТЗ в форме — ответ с предложением по формату и сроку ответа. Мессенджер — по согласованию.",
  }),
];

const medicalVariants: VarBuild[] = [
  (n, c) => ({
    headline: `Запись на приём ${n} — ${c}`,
    subIntro: `Согласуем врача, время и адрес в ${c}. ${n} — без длинного ожидания ответа в чате координатора.`,
    offerCore:
      "Чек-лист подготовки до визита — в ответе на заявку, чтобы в кабинете не тратить время на базовые вопросы.",
    contacts: "Телеграм клиники, телефон, форма — что удобнее. Напоминание и маршрут одним сообщением.",
  }),
  (n, c) => ({
    headline: `Приём по записи — понятно, что будет в кабинете`,
    subIntro: `${n} в ${c}: срок визита, этаж, что взять с собой — до выхода из дома, без путаницы у входа.`,
    offerCore:
      "Ограничение: срочные случаи — только по правилам клиники, не через демо-форму на лендинге.",
    contacts: "Мессенджер, call-центр, форма — контакты внизу страницы. Подтверждение слота дублируем в чат.",
  }),
  (n, c) => ({
    headline: `Спокойная запись и ясный план визита`,
    subIntro: `${n}, ${c}. Координатор ведёт тред: повтор, анализы, уточнения — без потери контекста между сменами.`,
    offerCore:
      "Если запрос вне профиля клиники — честно направим, без затягивания. Один конкретный следующий шаг — в первом ответе.",
    contacts: "Чат, звонок, email — выберите основной канал в заявке. Адрес и время — после подтверждения.",
  }),
];

const defaultVariants: VarBuild[] = [
  (n, c) => ({
    headline: `Закроем запрос по ${n} — ориентир ${c}`,
    subIntro: `Работаем в ${c}. ${n}: один ответственный контакт, фиксация срока ответа и шагов — без пинга «ну как там».`,
    offerCore:
      "Сначала бриф и вилка, потом старт. Ограничение: не берём задачи вне зоны — скажем сразу, чтобы не съедать ваши сутки.",
    contacts: "Форма, мессенджер, телефон — закрепите один основной канал в заявке.",
  }),
  (n, c) => ({
    headline: `Сервис под задачу — без сюрпризов в переписке`,
    subIntro: `${n} в ${c}: что на входе, что на выходе, что по срокам — до старта, письменно или в чате, как договоримся.`,
    offerCore:
      "Два-три сценария шагов на выбор — потом одно подтверждение. Один числовой ориентир по сроку — в первом ответе, без размытия «потом уточним».",
    contacts: "Окно для связи и мессенджер — в форме. Ответ в согласованные часы.",
  }),
  (n, c) => ({
    headline: `Из точки А в понятный результат`,
    subIntro: `${c} · ${n}. Снимаем неопределённость: формат работы, границы ответственности, следующий шаг — в одном сообщении.`,
    offerCore:
      "Бонус: короткий чек-лист вводных — меньше возвратов «а пришлите ещё вот это» до старта.",
    contacts: "Контакты ниже, обратный звонок — если оставили телефон и отметили удобное время.",
  }),
];

const NEUTRAL_VARIANTS: VarBuild[] = [
  (n, c) => ({
    headline: `${n} в ${c} — с понятным следующим шагом`,
    subIntro: `Соберём вводные по нише ${n}, зафиксируем ожидания по сроку и формату. ${c} — географический ориентир, не «для галочки».`,
    offerCore:
      "Старт после короткого брифа: что нужно от вас, что сделаем мы, как поймём, что задача закрыта. Без скрытых условий в мелком тексте.",
    contacts: "Форма и мессенджер не конкурируют — выберите удобное, ответ придёт туда.",
  }),
  (_n, c) => ({
    headline: `Лендинг под запуск рекламы — сервис в ${c}`,
    subIntro: `Один оффер, один маршрут заявки, понятные контакты. Работаем по вводным, без смены правил задним числом.`,
    offerCore:
      "Если запрос не наш — скажем прямо. Если наш — разложим этапы и срок ответа до начала работ.",
    contacts: "Телефон, email, мессенджер — в подвале; в заявке можно указать приоритетный канал.",
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
