"use client";

import { useEffect, useState } from "react";
import { Mic, ArrowRight, AudioLines } from "lucide-react";
import { useRouter } from "next/navigation";

const rotatingExamples = [
  "Сделай сайт для юриста в Москве",
  "Нужен сайт для мастера татуажа в Уфе",
  "Создай сайт для стоматологии в Астане",
  "Сайт для доставки цветов в Алматы",
  "Лендинг для ремонта квартир в Казани",
  "Нужен сайт для автосервиса в Самаре",
  "Сделай сайт для косметологии в Краснодаре",
  "Сайт для клининговой компании в Минске",
  "Создай сайт для стоматолога в Ташкенте",
  "Нужен сайт для барбершопа в Санкт-Петербурге",
  "Сделай сайт для школы английского в Бишкеке",
  "Сайт для грузоперевозок в Екатеринбурге",
  "Лендинг для визового центра в Новосибирске",
  "Нужен сайт для ремонта техники в Омске",
  "Сайт для агентства недвижимости в Дубае",
  "Создай сайт для фитнес-клуба в Челябинске",
  "Нужен сайт для нотариуса в Ростове-на-Дону",
  "Сайт для бухгалтерских услуг в Перми",
  "Лендинг для частной клиники в Воронеже",
  "Сделай сайт для детского центра в Нижнем Новгороде",
];

export function GlobalInputBar() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [exampleIndex, setExampleIndex] = useState(0);
  const [typedHint, setTypedHint] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (value.trim().length > 0) {
      return;
    }

    const currentText = rotatingExamples[exampleIndex];
    let timer: number | undefined;

    if (!isDeleting && typedHint.length < currentText.length) {
      timer = window.setTimeout(() => {
        setTypedHint(currentText.slice(0, typedHint.length + 1));
      }, 42);
    } else if (!isDeleting && typedHint.length === currentText.length) {
      timer = window.setTimeout(() => {
        setIsDeleting(true);
      }, 1200);
    } else if (isDeleting && typedHint.length > 0) {
      timer = window.setTimeout(() => {
        setTypedHint(currentText.slice(0, typedHint.length - 1));
      }, 22);
    } else if (isDeleting && typedHint.length === 0) {
      timer = window.setTimeout(() => {
        setIsDeleting(false);
        setExampleIndex((prev) => (prev + 1) % rotatingExamples.length);
      }, 0);
    }

    return () => {
      if (timer) {
        window.clearTimeout(timer);
      }
    };
  }, [typedHint, isDeleting, exampleIndex, value]);

  const goStart = () => {
    const query = value.trim();
    if (!query) {
      router.push("/start");
      return;
    }
    router.push(`/start?business=${encodeURIComponent(query)}`);
  };

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 bottom-5 z-50 flex justify-center px-4">
        <div className="pointer-events-auto flex w-full max-w-2xl items-center gap-2 rounded-2xl border border-white/12 bg-[#151515]/96 p-2 shadow-[0_20px_46px_rgba(0,0,0,0.46)]">
          <button
            type="button"
            aria-label="Голосовой ввод"
            className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 text-zinc-400 transition hover:border-white/22 hover:text-zinc-100"
          >
            <Mic size={18} />
          </button>
          <input
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                goStart();
              }
            }}
          placeholder={typedHint || " "}
            className="h-11 flex-1 rounded-xl bg-transparent px-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={goStart}
            aria-label="Перейти к запуску"
            className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-[#171717] text-zinc-300 transition hover:border-white/22 hover:text-zinc-100"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
      <button
        type="button"
        aria-label="Голосовой помощник"
        className="pointer-events-auto cta-pulse fixed bottom-6 right-5 z-[60] grid h-14 w-14 place-items-center rounded-full border border-white/18 bg-white/8 text-zinc-100 shadow-[0_10px_28px_rgba(0,0,0,0.44)] transition hover:-translate-y-0.5 hover:bg-white/14 hover:shadow-[0_14px_34px_rgba(0,0,0,0.52)] md:bottom-7 md:right-7"
      >
        <AudioLines size={19} strokeWidth={2.1} />
      </button>
    </>
  );
}
