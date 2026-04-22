import type { EditableContent, SoloBodyBlocks } from "@/lib/site-session";
import { getLegacyFallbackSoloBodyBlocks, SOLO_SITE_GENERATOR_ENABLED } from "@/lib/solo-site";
import { cn } from "@/lib/utils";
import { PreviewCaptureForm } from "./preview-capture-form";
import type { LeadFormSection } from "@/lib/lead-storage";

type FullSiteTemplateProps = {
  niche: string;
  city: string;
  content: EditableContent;
  /** Для превью: slug проекта — оживление формы и лиды в кабинет. */
  projectSlug?: string;
  className?: string;
};

function ItemGrid({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="border-t border-white/6 py-12 md:py-16">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <h2 className="text-lg font-medium tracking-tight text-white md:text-xl">{title}</h2>
        <div
          className={cn("mt-6 grid gap-4", items.length <= 2 ? "md:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3")}
        >
          {items.map((text, i) => (
            <div key={`${i}-${text.slice(0, 32)}`} className="surface-subtle rounded-2xl p-5">
              <p className="text-sm leading-relaxed text-zinc-500">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const LEGACY_CARDS: { t: string; d: (city: string) => string }[] = [
  { t: "Быстрый отклик", d: () => "Заявка уходит в CRM и в мессенджер." },
  { t: "Прозрачно", d: () => "Фиксируем запрос и договорённости." },
  { t: "Под ваше гео", d: (c) => `Ориентир: ${c}.` },
];

/**
 * Полноэкранный «сайт» в стиле проекта: те же токены, не отдельный дизайн-язык.
 * При `soloBlocks` или с включённым SOLO+fallback — полный конверсионный каркас;
 * иначе — прежняя компактная схема (hero+форма+3 карточки).
 */
function staticCapturePlaceholder(c: EditableContent, cta: string) {
  return (
    <>
      <p className="text-sm font-medium text-zinc-200">{c.formTitle}</p>
      {c.formMicroCta ? <p className="mt-2 text-sm text-zinc-400">{c.formMicroCta}</p> : null}
      <button
        type="button"
        className="cta-pulse mt-4 w-full rounded-full border border-white/18 bg-white/8 py-3.5 font-medium text-white transition hover:bg-white/14 md:w-auto md:px-8"
      >
        {cta}
      </button>
      {c.formCaption ? <p className="mt-2 text-xs text-zinc-600">{c.formCaption}</p> : null}
    </>
  );
}

export function FullSiteTemplate({ niche, city, content, projectSlug, className }: FullSiteTemplateProps) {
  const blocks: SoloBodyBlocks | null =
    content.soloBlocks ?? (SOLO_SITE_GENERATOR_ENABLED ? getLegacyFallbackSoloBodyBlocks(niche, city) : null);
  const fullLayout = blocks != null;

  const captureForm = (section: LeadFormSection, opts?: { showHeader?: boolean; submitLabel?: string; formCaption?: string }) => {
    if (!projectSlug) {
      if (opts?.showHeader === false) {
        return (
          <button
            type="button"
            className="cta-pulse w-full rounded-full border border-white/18 bg-white/8 py-3.5 font-medium text-white transition hover:bg-white/14 md:w-auto md:px-8"
          >
            {opts?.submitLabel ?? "Оставить заявку"}
          </button>
        );
      }
      return staticCapturePlaceholder(content, opts?.submitLabel ?? "Оставить заявку");
    }
    return (
      <PreviewCaptureForm
        projectSlug={projectSlug}
        section={section}
        formTitle={content.formTitle}
        formMicroCta={content.formMicroCta}
        formCaption={opts?.formCaption ?? content.formCaption}
        showHeader={opts?.showHeader !== false}
        submitLabel={opts?.submitLabel}
      />
    );
  };

  return (
    <div
      className={cn(
        "min-h-dvh w-full bg-[#0a0a0a] text-zinc-100",
        "bg-[radial-gradient(800px_400px_at_50%_-20%,rgba(255,255,255,0.08),transparent)]",
        className,
      )}
    >
      <header className="border-b border-white/8 bg-[#0d0d0d]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 md:px-8">
          <div>
            <p className="text-xs font-medium tracking-[0.2em] text-zinc-500">САЙТ</p>
            <p className="mt-1 text-sm text-white">
              {niche} · {city}
            </p>
          </div>
          <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-400">
            на базе AI Site Engine
          </span>
        </div>
      </header>

      <main>
        <section className="section-shell py-16 md:py-24">
          <div className="surface-card mx-auto max-w-3xl p-8 md:p-12">
            <h1 className="text-3xl font-light leading-tight text-white md:text-5xl">{content.headline}</h1>
            <p className="mt-5 text-base leading-relaxed text-zinc-400 md:text-lg">{content.subheadline}</p>
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-5 md:p-6">
              <p className="text-sm font-medium text-zinc-200">Оффер</p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400 md:text-base">{content.offer}</p>
            </div>
            {!fullLayout ? <div className="mt-8">{captureForm("hero")}</div> : null}
          </div>
        </section>

        {fullLayout && blocks ? (
          <>
            <ItemGrid title={blocks.whyTitle} items={blocks.whyItems} />
            <ItemGrid title={blocks.servicesTitle} items={blocks.serviceItems} />
            <ItemGrid title={blocks.trustTitle} items={blocks.trustItems} />

            <section className="section-shell border-t border-white/6 py-12 md:py-16">
              <div className="surface-card mx-auto max-w-3xl p-8 md:p-10">
                <p className="text-xs font-medium tracking-[0.2em] text-zinc-500">ЗАЯВКА</p>
                {captureForm("capture")}
              </div>
            </section>

            <section className="section-shell border-t border-white/6 py-12 md:py-16">
              <div className="surface-card mx-auto max-w-3xl p-8 md:p-10">
                <h2 className="text-lg font-medium text-white md:text-xl">{blocks.finalCtaTitle}</h2>
                {blocks.finalCtaMicro ? (
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">{blocks.finalCtaMicro}</p>
                ) : null}
                <div className="mt-6">
                  {captureForm("final_cta", {
                    showHeader: false,
                    submitLabel: blocks.finalCtaButton,
                    formCaption: "",
                  })}
                </div>
              </div>
            </section>
          </>
        ) : (
          <section className="section-shell border-t border-white/6 py-12 md:py-16">
            <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
              {LEGACY_CARDS.map((b) => (
                <div key={b.t} className="surface-subtle rounded-2xl p-5">
                  <p className="text-sm font-medium text-zinc-200">{b.t}</p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-500">{b.d(city)}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <footer className="border-t border-white/8 py-10">
          <div className="section-shell text-center text-sm text-zinc-500">
            <p>{content.contacts}</p>
            {fullLayout && blocks ? <p className="mt-2 text-xs text-zinc-600">{blocks.footerKicker}</p> : null}
            <p className="mt-2 text-xs text-zinc-600">Демо-превью · сгенерировано автоматически</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
