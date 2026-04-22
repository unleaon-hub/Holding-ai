"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Stage = "form" | "loading" | "success";

const loadingSteps = [
  "Анализ конкурентов",
  "Сбор текстов",
  "Подготовка дизайна",
  "Подключение CRM",
];

export default function StartPage() {
  return (
    <Suspense fallback={<StartPageSkeleton />}>
      <StartPageInner />
    </Suspense>
  );
}

function StartPageInner() {
  const searchParams = useSearchParams();
  const presetBusiness = searchParams.get("business") ?? "";
  const [stage, setStage] = useState<Stage>("form");
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [activeStep, setActiveStep] = useState(0);
  const [niche, setNiche] = useState(presetBusiness);
  const [geo, setGeo] = useState("");
  const [contact, setContact] = useState("");

  const siteUrl = useMemo(() => {
    const slug = niche ? niche.toLowerCase().replace(/\s+/g, "-") : "demo-site";
    return `https://demo.ai-site-engine.app/${slug}`;
  }, [niche]);

  const startGeneration = () => {
    setStage("loading");
    setSecondsLeft(60);
    setActiveStep(0);

    const timer = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer);
          setStage("success");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const stepTimer = window.setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= loadingSteps.length - 1) {
          window.clearInterval(stepTimer);
          return prev;
        }
        return prev + 1;
      });
    }, 15000);
  };

  return (
    <main className="section-shell py-16 md:py-24">
      {stage === "form" && (
        <section className="surface-card mx-auto max-w-2xl p-8 md:p-10">
          <p className="eyebrow">/start</p>
          <h1 className="mt-4 text-4xl font-light text-white md:text-5xl">
            Запуск AI Site Engine
          </h1>
          <form
            className="mt-8 space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              startGeneration();
            }}
          >
            <label className="block">
              <span className="text-sm text-zinc-300">Ниша</span>
              <input
                value={niche}
                onChange={(event) => setNiche(event.target.value)}
                required
                className="mt-2 h-11 w-full rounded-xl border border-white/10 bg-[#101010] px-3 text-white focus:border-white/35 focus:outline-none"
              />
            </label>
            <label className="block">
              <span className="text-sm text-zinc-300">Гео</span>
              <input
                value={geo}
                onChange={(event) => setGeo(event.target.value)}
                required
                className="mt-2 h-11 w-full rounded-xl border border-white/10 bg-[#101010] px-3 text-white focus:border-white/35 focus:outline-none"
              />
            </label>
            <label className="block">
              <span className="text-sm text-zinc-300">Контакт</span>
              <input
                value={contact}
                onChange={(event) => setContact(event.target.value)}
                required
                className="mt-2 h-11 w-full rounded-xl border border-white/10 bg-[#101010] px-3 text-white focus:border-white/35 focus:outline-none"
              />
            </label>
            <button
              type="submit"
              className="cta-pulse mt-2 w-full rounded-full border border-white/18 bg-white/8 py-3 font-medium text-white transition hover:bg-white/14"
            >
              Запустить генерацию
            </button>
          </form>
        </section>
      )}

      {stage === "loading" && (
        <section className="surface-card mx-auto max-w-2xl p-8 md:p-10">
          <p className="eyebrow">Генерация</p>
          <h2 className="mt-4 text-4xl font-light text-white">{secondsLeft} сек</h2>
          <p className="mt-2 text-zinc-300">
            Подождите, система подготавливает ваш сайт и CRM.
          </p>
          <div className="mt-7 space-y-3">
            {loadingSteps.map((step, index) => (
              <div
                key={step}
                className={`rounded-xl border px-4 py-3 text-sm ${
                  index <= activeStep
                    ? "border-white/24 bg-[#191919] text-zinc-100"
                    : "border-white/10 bg-[#101010] text-zinc-500"
                }`}
              >
                {step}
              </div>
            ))}
          </div>
        </section>
      )}

      {stage === "success" && (
        <section className="surface-card mx-auto max-w-2xl p-8 md:p-10">
          <p className="eyebrow">Готово</p>
          <h2 className="mt-4 text-4xl font-light text-white">Сайт создан</h2>
          <p className="mt-3 text-zinc-300">Ваш демо-адрес:</p>
          <p className="mt-2 rounded-lg border border-white/10 bg-[#101010] px-4 py-3 text-sm text-zinc-200">
            {siteUrl}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={siteUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/18 bg-white/8 px-5 py-3 font-medium text-white transition hover:bg-white/14"
            >
              Открыть сайт
            </a>
            <Link
              href="/dashboard"
              className="rounded-xl border border-white/15 px-5 py-3 text-zinc-200"
            >
              Открыть dashboard
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}

function StartPageSkeleton() {
  return (
    <main className="section-shell py-16 md:py-24">
      <section className="surface-card mx-auto max-w-2xl p-8 md:p-10">
        <p className="eyebrow">/start</p>
        <h1 className="mt-4 text-4xl font-light text-white md:text-5xl">
          Подготавливаем запуск...
        </h1>
      </section>
    </main>
  );
}
